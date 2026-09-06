import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig, type Plugin } from 'vite';
import { links, profile, site } from './src/lib/data/content';

function escapeAttr(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function injectSiteMeta(): Plugin {
  return {
    name: 'inject-site-meta',
    transformIndexHtml(html) {
      const canonical = `${site.url}/`;
      const image = new URL(site.imagePath, canonical).href;
      const jsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        url: site.url,
        email: `mailto:${profile.email}`,
        jobTitle: profile.role,
        sameAs: links
          .filter((link) => link.title === 'GitHub' || link.title === 'LinkedIn')
          .map((link) => link.url)
      });

      return html
        .replaceAll('__SITE_TITLE__', escapeAttr(site.title))
        .replaceAll('__SITE_DESCRIPTION__', escapeAttr(site.description))
        .replaceAll('__SITE_SHARE_DESCRIPTION__', escapeAttr(site.shareDescription))
        .replaceAll('__SITE_CANONICAL__', escapeAttr(canonical))
        .replaceAll('__SITE_IMAGE__', escapeAttr(image))
        .replaceAll('__SITE_THEME_COLOR__', escapeAttr(site.themeColor))
        .replaceAll('__SITE_JSON_LD__', jsonLd);
    }
  };
}

export default defineConfig({
  plugins: [svelte(), injectSiteMeta()]
});
