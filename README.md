# Alluvium design previews

Preview copies of the Revolutain site, hosted on johnwardsinternet.lol. Production stays on `main`.

## Live URLs

- Index: https://alluvium.johnwardsinternet.lol
- Baseline: https://alluvium-01.johnwardsinternet.lol
- Editorial (long-scroll): https://alluvium-02.johnwardsinternet.lol
- Slate (dark, multi-page): https://alluvium-03.johnwardsinternet.lol
- Grid (typographic, multi-page): https://alluvium-04.johnwardsinternet.lol
- Bento (light cards, multi-page): https://alluvium-05.johnwardsinternet.lol

Versions 02 to 05 share one information architecture and one copy source, `versions/CONTENT.md`. Change a string there first, then in each version.

Share those custom hostnames. There is no `workers.dev` URL.

## What to edit

Edit only files under `versions/`. Each directory is one complete site, served from the root of its own hostname.

Root `index.html` and `CNAME` stay as they are on `main`. GitHub Pages publishes `main` to https://revolutain.com. Leaving those two files in place means an accidental merge of `je-dev` into `main` still serves the current production page.

Never push or merge this work to `main`.

## Add a version

Stop at five versions unless asked for more. Use ids `01` through `05`.

1. `git checkout je-dev`
2. `git pull`
3. `git checkout -b version/<id>-<slug>`
4. Copy `versions/01-baseline` to `versions/<id>-<slug>` and edit only that directory.
5. Append an object to `versions.json`:

```json
{ "id": "02", "title": "Short title", "dir": "versions/02-short-name", "desc": "What this version tries" }
```

`id` is 1 to 20 characters: lowercase letters, digits, and hyphens, starting with a letter or digit. The public host becomes `https://alluvium-<id>.johnwardsinternet.lol`.

6. `npm run deploy`
7. Open the new hostname.
8. Commit, then `git push origin je-dev` after the branch is merged back to `je-dev`.

Short-lived branch names are `version/<id>-<slug>`, cut from `je-dev`.

## Deploy

From this directory, with `CLOUDFLARE_API_TOKEN` set in the user environment:

```powershell
npm run deploy
```

That rebuilds `public/` and `wrangler.jsonc` (both gitignored) and publishes the Worker `alluvium-design-previews`.
