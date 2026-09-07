# Kemal Ozturk | Portfolio

The source for [kozturk.com](https://kozturk.com), a lean Svelte 5 single-page
portfolio built around an “Ink & Signal” visual direction.

## Local development

```bash
npm install
npm run dev
```

Run `npm run check` for Svelte and TypeScript validation. `npm run build`
refreshes GitHub projects and writes the production site to `dist/`.

## Content

- `src/lib/data/content.ts` contains biography, experience, skills, featured
  project context, experience images, manual photo-wall entries, and links.
- `src/lib/data/projects.generated.json` is the last successful GitHub snapshot.
- `public/art/` contains Kemal's artwork.
- `public/images/experience/` contains app and company product images.
- `public/Kemal-Ozturk-Resume-2026.pdf` is the downloadable resume.
- `.old/` preserves the previous static site.

The canonical career source is
`../resume/resume.html`. LinkedIn remains a public profile link rather than a
live data dependency because its API does not expose complete work history to a
normal personal-site integration.

After editing the resume, copy the regenerated PDF into `public/` and update
`src/lib/data/content.ts` when the public career details changed.

The homepage photo wall automatically includes GitHub README images. Add
non-GitHub frames to `photoWallItems` with a public image path, accessible alt
text, caption, and destination anchor. Add one or more product screenshots to an
experience entry's `images` array; its gallery appears automatically.

## GitHub projects

```bash
npm run projects
```

The build script fetches every public repository, excludes archived repositories
and forks, then reads the first useful non-badge image from each README. Missing descriptions and images use honest
visual fallbacks in the UI. If GitHub is temporarily unavailable, an existing
non-empty snapshot is retained.

Featured projects can set an eyebrow label (and optional live URL) in
`src/lib/data/content.ts`; descriptions and other details remain GitHub-owned.

## Deployment

Pushes to `master` run `.github/workflows/deploy.yml`, refresh project data, run
checks, build the app, and deploy `dist/` to GitHub Pages. The repository's Pages
source must be set to **GitHub Actions**. `public/CNAME` preserves the
`kozturk.com` custom domain.
