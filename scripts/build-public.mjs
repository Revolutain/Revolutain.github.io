import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "versions.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const idPattern = /^[a-z0-9](?:[a-z0-9-]{0,19})$/;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(typeof manifest.workerName === "string" && manifest.workerName.length > 0, "workerName is required");
assert(typeof manifest.zone === "string" && manifest.zone.length > 0, "zone is required");
assert(typeof manifest.apexHost === "string" && manifest.apexHost.length > 0, "apexHost is required");
assert(typeof manifest.hostPrefix === "string" && manifest.hostPrefix.length > 0, "hostPrefix is required");
assert(Array.isArray(manifest.versions) && manifest.versions.length > 0, "versions must be a non-empty array");

const seen = new Set();
for (const version of manifest.versions) {
  assert(version && typeof version.id === "string", "each version needs an id");
  assert(idPattern.test(version.id), `invalid version id: ${version.id}`);
  assert(!seen.has(version.id), `duplicate version id: ${version.id}`);
  seen.add(version.id);
  assert(typeof version.title === "string" && version.title.length > 0, `missing title for ${version.id}`);
  assert(typeof version.desc === "string", `missing desc for ${version.id}`);
  assert(typeof version.dir === "string" && version.dir.length > 0, `missing dir for ${version.id}`);
  const source = path.resolve(root, version.dir);
  assert(source.startsWith(root + path.sep), `version dir escapes the repo: ${version.dir}`);
  assert(fs.existsSync(source) && fs.statSync(source).isDirectory(), `missing version dir: ${version.dir}`);
}

function hostFor(id) {
  return `${manifest.hostPrefix}${id}.${manifest.zone}`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const publicDir = path.join(root, "public");
fs.rmSync(publicDir, { recursive: true, force: true });
fs.mkdirSync(publicDir, { recursive: true });

for (const version of manifest.versions) {
  const source = path.resolve(root, version.dir);
  const dest = path.join(publicDir, version.id);
  fs.cpSync(source, dest, { recursive: true });
}

const items = manifest.versions
  .map((version) => {
    const href = `https://${hostFor(version.id)}`;
    return `    <li><a href="${escapeHtml(href)}">${escapeHtml(version.title)}</a> - ${escapeHtml(version.desc)}</li>`;
  })
  .join("\n");

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Alluvium design previews</title>
</head>
<body>
  <h1>Alluvium design previews</h1>
  <ul>
${items}
  </ul>
</body>
</html>
`;

fs.writeFileSync(path.join(publicDir, "index.html"), indexHtml, "utf8");

const routes = [
  { pattern: manifest.apexHost, custom_domain: true },
  ...manifest.versions.map((version) => ({ pattern: hostFor(version.id), custom_domain: true })),
];

const wrangler = {
  name: manifest.workerName,
  main: "src/index.js",
  compatibility_date: "2026-10-19",
  workers_dev: false,
  assets: {
    directory: "./public",
    binding: "ASSETS",
    run_worker_first: true,
    // none: auto-trailing-slash redirects /<id>/index.html to /<id>/, which leaks the internal prefix onto the public host.
    html_handling: "none",
    not_found_handling: "none",
  },
  routes,
};

fs.writeFileSync(path.join(root, "wrangler.jsonc"), JSON.stringify(wrangler, null, 2) + "\n", "utf8");
console.log(`built ${manifest.versions.length} version(s) into public/`);
