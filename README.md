# Alluvium design previews

Preview copies of the RevolutAIn site, hosted on johnwardsinternet.lol. Production stays on `main`.

## Live URLs

- Index: https://alluvium.johnwardsinternet.lol
- Baseline: https://alluvium-01.johnwardsinternet.lol
- Cream (bento, full-screen hero intro): https://alluvium-02.johnwardsinternet.lol
- Editorial Bento (serif, numbered, grain): https://alluvium-03.johnwardsinternet.lol
- Ink (dark hero and footer, rings intro): https://alluvium-04.johnwardsinternet.lol
- Quiet (light type, flat cards, no intro): https://alluvium-05.johnwardsinternet.lol

Share those custom hostnames. There is no `workers.dev` URL.

## How versions 02 to 05 are built

Versions 02 to 05 are generated. The source is `versions/_src/`:

| Path | Contents |
|---|---|
| `_src/pages/*.html` | The five pages (`index`, `services`, `training`, `about`, `contact`), one copy shared by every version |
| `_src/partials/*.html` | Head, header, tab bar, footer, brand mark, CTA card, intro overlay |
| `_src/assets/` | `base.css`, `site.js`, `favicon.svg`, `team/*.jpg` |
| `_src/themes/<id>-<slug>/theme.json` | `id`, `slug`, `title`, `desc`, `intro` (`takeover`, `rings`, or `none`), `themeColor`, `fonts` |
| `_src/themes/<id>-<slug>/theme.css` | Tokens and overrides layered on `base.css` |

`node scripts/build-versions.mjs` renders each theme into `versions/<id>-<slug>/`. The generated directories are committed so the CI deploy can publish them, but they are never edited by hand: every generated file starts with a comment saying so. `npm run build`, `npm run deploy`, and `npm run dev` all run the generator first.

Copy rules and the rationale for the round-3 revisions are in `versions/CONTENT.md`. The copy itself lives in `_src/pages`.

### Change copy or layout

1. Edit the file under `versions/_src/`.
2. `node scripts/build-versions.mjs`
3. Serve one version locally to check it, for example `python -m http.server 8002 --directory versions\02-cream`, then open `http://localhost:8002/`. Add `?intro=1` to force the hero intro or `?intro=0` to skip it.
4. Commit the source and the regenerated output together.

### Add a theme

1. Copy an existing directory under `versions/_src/themes/` to `<id>-<slug>/` and edit `theme.json` and `theme.css`.
2. Add the matching entry to `versions.json` (`dir` must be `versions/<id>-<slug>`).
3. `node scripts/build-versions.mjs`, then follow the steps above.

Stop at five versions unless asked for more. `id` is 1 to 20 characters: lowercase letters, digits, and hyphens, starting with a letter or digit. The public host becomes `https://alluvium-<id>.johnwardsinternet.lol`.

## What not to edit

Root `index.html` and `CNAME` stay as they are on `main`. GitHub Pages publishes `main` to https://revolutain.com. Leaving those two files in place means an accidental merge of `je-dev` into `main` still serves the current production page.

`versions/01-baseline` is the untouched copy of production and is not generated.

Never push or merge this work to `main`.

## Deploy

Pushing to `je-dev` runs `.github/workflows/preview.yml`, which builds and publishes the Worker `alluvium-design-previews`. To deploy by hand from this directory, with `CLOUDFLARE_API_TOKEN` set in the user environment:

```powershell
npm run deploy
```

That regenerates versions 02 to 05, rebuilds `public/` and `wrangler.jsonc` (both gitignored), and publishes the Worker.
