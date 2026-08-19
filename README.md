# Athlete Calculator — Eleventy Migration

## What this fixes
1. Every internal link, canonical tag, and JSON-LD `url` field is now extensionless (matches your existing convention).
2. About/Contact/Privacy are now linked in the footer of **every single page** — previously zero article or calculator pages linked to them, which is very likely why AdSense's "Low value content" flag hasn't cleared.
3. sitemap.xml is now auto-generated from the actual pages on every build — it can't drift out of sync with content again.
4. The MailerLite script was appearing on 42 of 64 pages (causing sitewide CLS); it's now correctly scoped to only the 5 calculator pages.

## Structure
- `src/_includes/base.njk` — shared `<head>`, nav include, footer include (this is the "shared template" — edit this once, it applies everywhere)
- `src/_includes/nav.njk` / `footer.njk` — the actual nav/footer markup
- `src/*.njk` — one file per page, each with frontmatter (title, description, canonical path, disclaimer text, etc.) plus that page's own `<style>` and body content, preserved as-is from your live site
- `src/sitemap.njk` — auto-generates sitemap.xml from every page's `canonicalPath`
- `.eleventy.js` — build config
- `netlify.toml` — tells Netlify how to build this (`npm install && npx @11ty/eleventy`, publish `_site`)

## Verified before delivery
- All 62 pages built with zero errors
- Full word-level content diff against your live site: 0 pages with missing content (an earlier pass had a bug that silently dropped the 4 calculator pages' entire interactive body — caught and fixed before this delivery)
- Zero `.html` links remain anywhere in the built output
- MailerLite confirmed present on exactly the 5 calculator pages, nowhere else
- About/Contact/Privacy confirmed linked from sampled article pages

## Two duplicate-named files
Your upload included `average-40-yard-dash-times (1).html` and `vertical-jump-needed-to-dunk (1).html` — each a superset of the non-`(1)` version (extra callout + sidebar link about Eli Stowers). I used the `(1)` version as canonical. Flag me if that's backwards.

## Next steps (GitHub + Netlify)
1. Create a new empty GitHub repo (no README/gitignore).
2. From this folder:
   ```
   git init
   git add .
   git commit -m "Migrate to Eleventy"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. In Netlify: **Add new site → Import an existing project → GitHub** → pick the repo. Netlify will read `netlify.toml` automatically (build command + publish dir already set). Deploy.
4. Point your domain (athletecalculator.com) at the new Netlify site the same way it's pointed at the current one.
5. From then on: edit files, `git push`, Netlify auto-builds and deploys. No more manual uploads.
