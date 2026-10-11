<script module lang="ts">
  const failedImageUrls = $state<string[]>([]);

  function recordFailedImage(url: string) {
    if (!failedImageUrls.includes(url)) {
      failedImageUrls.push(url);
    }
  }
</script>

<script lang="ts">
  import type { Attachment } from "svelte/attachments";
  import type { PhotoWallItem } from "../data/content";

  let {
    items,
    label,
    ariaLabel,
    layout = "fill",
    collapsed = false,
    onselect,
  }: {
    items: PhotoWallItem[];
    label?: string;
    ariaLabel?: string;
    layout?: "fill" | "stack";
    collapsed?: boolean;
    onselect?: (event: MouseEvent, href: string) => void;
  } = $props();

  const uid = $props.id();
  let visible = $derived(
    items.filter((item) => !failedImageUrls.includes(item.src)),
  );

  // Runs client-side only so every visit gets a fresh scatter without a hydration mismatch; each value is in [-1, 1].
  const scatter: Attachment<HTMLElement> = (item) => {
    for (const name of ["angle", "x", "y", "size"]) {
      item.style.setProperty(
        `--scatter-${name}`,
        (Math.random() * 2 - 1).toFixed(3),
      );
    }
  };

  const fitPhoto: Attachment<HTMLImageElement> = (img) => {
    let active = true;
    let revealFrame = 0;

    const reveal = async () => {
      await img.decode().catch(() => undefined);
      if (!active || img.naturalWidth === 0) return;

      const ratio = img.naturalWidth / img.naturalHeight;
      img
        .closest<HTMLElement>(".photo-wall-item")
        ?.style.setProperty("--natural-ratio", `${ratio}`);

      revealFrame = requestAnimationFrame(() => {
        img.closest(".photo-wall-item")?.classList.add("is-ready");
      });
    };

    if (img.complete) void reveal();
    else img.addEventListener("load", reveal, { once: true });

    return () => {
      active = false;
      cancelAnimationFrame(revealFrame);
      img.removeEventListener("load", reveal);
    };
  };
</script>

{#if visible.length > 0}
  <section
    class="photo-wall"
    data-layout={layout}
    data-collapsed={collapsed}
    aria-hidden={collapsed ? "true" : undefined}
    aria-labelledby={label ? `${uid}-title` : undefined}
    aria-label={label ? undefined : ariaLabel}
  >
    {#if label}
      <header class="photo-wall-heading">
        <small id={`${uid}-title`}>{label}</small>
        <small
          >{visible.length} {visible.length === 1 ? "frame" : "frames"}</small
        >
      </header>
    {/if}
    <div class="photo-wall-stage">
      <ul class="photo-wall-grid" style:--count={visible.length}>
        {#each visible as item (item.src)}
          {#snippet frame()}
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              {@attach fitPhoto}
              onerror={() => recordFailedImage(item.src)}
            />
            <span class="photo-wall-caption">{item.caption}</span>
          {/snippet}
          <li class="photo-wall-item" {@attach scatter}>
            {#if item.href}
              {@const inPage = item.href.startsWith("#")}
              <a
                href={item.href}
                tabindex={collapsed ? -1 : undefined}
                target={inPage ? undefined : "_blank"}
                rel={inPage ? undefined : "noreferrer"}
                aria-label={inPage
                  ? `Jump to ${item.caption}`
                  : `Open ${item.caption}`}
                onclick={(event) => {
                  if (collapsed) {
                    event.preventDefault();
                    return;
                  }
                  if (item.href) onselect?.(event, item.href);
                }}
              >
                {@render frame()}
              </a>
            {:else}
              <div>
                {@render frame()}
              </div>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </section>
{/if}

<style>
  .photo-wall {
    --min-photo-ratio: calc(3 / 4);
    --max-photo-ratio: calc(5 / 3);
    --fill-cell-height: 0.85;
    --fill-frame-pad: 0.025;
    --fill-caption-font: 0.04;
    --scatter-max-angle: 5deg;
    --scatter-max-offset: 0.04;
    --scatter-max-size: 0.1;
    display: grid;
    min-width: 0;
    row-gap: var(--space-kicker);
  }

  .photo-wall-heading {
    position: relative;
    z-index: 2;
    display: flex;
    align-self: start;
    justify-content: space-between;
    gap: 1rem;
    padding-inline: var(--space-kicker);
    color: var(--signal);
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.09em;
    line-height: 1.2;
    text-transform: uppercase;
  }

  .photo-wall-heading small {
    font: inherit;
  }

  .photo-wall-heading small:last-child {
    color: var(--paper-muted);
  }

  .photo-wall-grid {
    min-height: 0;
    isolation: isolate;
  }

  .photo-wall-stage {
    display: contents;
  }

  [data-layout="fill"] .photo-wall-stage {
    display: grid;
    container-type: inline-size;
    place-items: center;
  }

  /* Fixed cells sized off one --unit, so the collage scales with its container instead of reflowing. */
  [data-layout="fill"] .photo-wall-grid {
    /* Closest to a square grid for the item count, capped at 2 below desktop. */
    --square-cols: round(up, sqrt(var(--count)), 1);
    --cols: min(2, var(--square-cols));
    --unit: calc(100cqw / var(--cols));
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: calc(var(--cols) * var(--unit));
    padding: 0;
    gap: 0;
  }

  .photo-wall-item {
    --photo-ratio: clamp(
      var(--min-photo-ratio),
      var(--natural-ratio, 4 / 3),
      var(--max-photo-ratio)
    );
    --hover-scale: 1.09;
    position: relative;
    z-index: 1;
    transition: z-index 0s;
  }

  [data-layout="fill"] .photo-wall-item {
    display: grid;
    /* Slightly under --unit so subpixel rounding can't wrap a row early. */
    width: calc(var(--unit) - 0.5px);
    height: calc(var(--unit) * var(--fill-cell-height));
    place-items: center;
    --angle: calc(var(--scatter-angle) * var(--scatter-max-angle));
    --nudge: calc(var(--scatter-x) * var(--unit) * var(--scatter-max-offset));
    --shift: calc(var(--scatter-y) * var(--unit) * var(--scatter-max-offset));
    --size: calc(1 + var(--scatter-size) * var(--scatter-max-size));
    --frame-pad: calc(var(--unit) * var(--fill-frame-pad));
    --caption-font: max(0.5rem, var(--unit) * var(--fill-caption-font));
    --caption-height: calc(var(--unit) * 0.06 + var(--caption-font) * 1.2);
    --photo-width: calc(
      var(--size) *
        min(
          var(--unit) - 2 * var(--frame-pad),
          (
              var(--unit) * var(--fill-cell-height) - var(--frame-pad) -
                var(--caption-height)
            ) * var(--photo-ratio)
        )
    );
  }

  [data-layout="fill"] .photo-wall-item a,
  [data-layout="fill"] .photo-wall-item div {
    width: calc(var(--photo-width) + 2 * var(--frame-pad));
    padding: var(--frame-pad) var(--frame-pad) 0;
    box-shadow: 0 0 0.8rem rgb(0 0 0 / 24%);
  }

  [data-layout="fill"] .photo-wall-caption {
    padding: calc(var(--unit) * 0.03) calc(var(--unit) * 0.015);
    font-size: var(--caption-font);
    line-height: 1.2;
  }

  .photo-wall-item > a,
  .photo-wall-item > div {
    opacity: 0;
    transform: rotate(var(--angle)) translate(var(--nudge), var(--shift))
      scale(0.8);
    transition:
      opacity 100ms ease-out,
      transform 450ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .photo-wall-item:global(.is-ready) > a,
  .photo-wall-item:global(.is-ready) > div {
    opacity: 1;
    transform: rotate(var(--angle)) translate(var(--nudge), var(--shift))
      scale(1);
  }

  @media (min-width: 1121px) {
    .photo-wall[data-layout="fill"] {
      display: flex;
      height: 100%;
      min-height: 0;
      flex-direction: column;
    }

    [data-layout="fill"] .photo-wall-stage {
      flex: 1;
      min-height: 0;
      container-type: size;
    }

    /* The wall has a fixed height on desktop, so fit the unit to both axes. */
    [data-layout="fill"] .photo-wall-grid {
      --cols: var(--square-cols);
      --rows: round(up, var(--count) / var(--cols), 1);
      --unit: min(
        100cqw / var(--cols),
        100cqh / (var(--rows) * var(--fill-cell-height))
      );
    }
  }

  [data-layout="stack"] .photo-wall-grid {
    display: flex;
    padding: 0.15rem 0.55rem 0.35rem;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    gap: 1.85rem;
  }

  [data-layout="stack"] .photo-wall-item {
    width: min(100%, 19rem);
    flex-shrink: 0;
    --angle: -1.7deg;
    --shift: 0;
    --nudge: 0;
    --hover-scale: 1.05;
  }

  [data-layout="stack"] .photo-wall-item:nth-child(even) {
    --angle: 1.8deg;
  }

  [data-layout="stack"] .photo-wall-item:nth-child(3n) {
    --angle: -0.9deg;
  }

  [data-layout="stack"] .photo-wall-item a,
  [data-layout="stack"] .photo-wall-item div {
    padding: 0.4rem 0.4rem 0.55rem;
    box-shadow: 0.45rem 0.5rem 0 rgb(0 0 0 / 28%);
  }

  .photo-wall-item:hover,
  .photo-wall-item:focus-within {
    z-index: 5;
  }

  .photo-wall-item:hover > a,
  .photo-wall-item:hover > div,
  .photo-wall-item:focus-within > a,
  .photo-wall-item:focus-within > div {
    transform: rotate(0) translate(0) scale(var(--hover-scale));
  }

  .photo-wall-item a,
  .photo-wall-item div {
    display: block;
    padding: 0.45rem 0.45rem 0.65rem;
    color: var(--ink);
    background: var(--paper-bright);
    box-shadow: 0.7rem 0.8rem 0 rgb(0 0 0 / 30%);
    text-decoration: none;
  }

  .photo-wall-item img {
    width: 100%;
    height: auto;
    aspect-ratio: var(--photo-ratio);
    object-fit: contain;
    background: var(--paper);
  }

  .photo-wall-caption {
    display: block;
    overflow: hidden;
    padding: 0.5rem 0.25rem 0;
    font-family: var(--mono);
    font-size: 0.55rem;
    letter-spacing: 0.06em;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .photo-wall[data-collapsed="true"] {
    display: block;
    height: 100%;
    pointer-events: none;
  }

  .photo-wall[data-collapsed="true"] .photo-wall-grid {
    position: relative;
    display: grid;
    height: 100%;
    padding: 0;
    grid-template: minmax(0, 1fr) / minmax(0, 1fr);
    place-items: center;
  }

  .photo-wall[data-collapsed="true"] .photo-wall-item {
    width: min(92%, 12.5rem);
    grid-area: 1 / 1;
    --angle: -5deg;
    --nudge: -4%;
    --shift: 0;
    --hover-scale: 1;
  }

  .photo-wall[data-collapsed="true"] .photo-wall-item:nth-child(2) {
    --angle: 4deg;
    --nudge: 3%;
    --shift: 2%;
  }

  .photo-wall[data-collapsed="true"] .photo-wall-item:nth-child(3) {
    --angle: -1deg;
    --nudge: 0;
    --shift: -3%;
  }

  .photo-wall[data-collapsed="true"] .photo-wall-item a,
  .photo-wall[data-collapsed="true"] .photo-wall-item div {
    padding: 0.3rem;
    box-shadow: 0.4rem 0.45rem 0 rgb(0 0 0 / 25%);
  }

  .photo-wall[data-collapsed="true"] .photo-wall-item img {
    height: 7rem;
    aspect-ratio: auto;
  }

  .photo-wall[data-collapsed="true"] .photo-wall-caption {
    display: none;
  }

  @media (max-width: 1120px) {
    .photo-wall-heading {
      padding-inline: 0;
    }
  }

  @media (max-width: 860px) {
    .photo-wall[data-collapsed="true"] .photo-wall-item {
      width: min(88%, 18rem);
    }

    .photo-wall[data-collapsed="true"] .photo-wall-item img {
      height: 9rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .photo-wall-item > a,
    .photo-wall-item > div {
      transition: none;
    }
  }
</style>
