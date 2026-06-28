import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { build } from "esbuild";
import { loadPrototypePackage } from "../io.js";

const packagePath = process.argv[2] ?? "prototypes/pull_portal_fallback";
const pkg = await loadPrototypePackage(packagePath);
const outDir = path.join(pkg.root, "playable");
const evaluation = await readEvaluation(pkg.root);
const assetVersion = Date.now().toString(36);

await mkdir(outDir, { recursive: true });

await writeFile(
  path.join(outDir, "data.json"),
  `${JSON.stringify(
    {
      mechanic: pkg.mechanic,
      knowledge: pkg.knowledge,
      levels: pkg.levels,
      evaluation,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

await build({
  entryPoints: [path.resolve("src/web/app.ts")],
  bundle: true,
  outfile: path.join(outDir, "app.js"),
  format: "esm",
  target: "es2022",
  sourcemap: true,
  define: {
    __BUILD_ID__: JSON.stringify(assetVersion),
  },
});

await writeFile(
  path.join(outDir, "index.html"),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${pkg.mechanic.title}</title>
    <link rel="stylesheet" href="./style.css?v=${assetVersion}">
  </head>
  <body>
    <main id="app"></main>
    <script type="module" src="./app.js?v=${assetVersion}"></script>
  </body>
</html>
`,
  "utf8",
);

await writeFile(path.join(outDir, "style.css"), playableCss(), "utf8");

console.log(`Wrote playable prototype to ${outDir}`);

async function readEvaluation(root: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(path.join(root, "reports", "evaluation.json"), "utf8"));
  } catch {
    return undefined;
  }
}

function playableCss(): string {
  return `:root {
  color-scheme: light;
  --ink: #172026;
  --muted: #5b6870;
  --line: #b8c6cc;
  --wall: #26313b;
  --floor: #e8efeb;
  --goal: #f2c14e;
  --crate: #b86b3d;
  --player: #2f80ed;
  --portal-a: #8f5cff;
  --portal-b: #24a67a;
  --surface: #fbfcfd;
  --danger: #b42318;
  --ok: #166534;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  overflow: hidden;
  color: var(--ink);
  background: #e9eef2;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

button,
select {
  font: inherit;
}

.shell {
  height: 100vh;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(320px, 1fr) minmax(260px, 340px);
  gap: 1px;
  background: var(--line);
}

.sidebar,
.stage,
.inspector {
  background: var(--surface);
  min-height: 0;
  min-width: 0;
}

.sidebar,
.inspector {
  padding: 16px;
  overflow: auto;
}

.stage {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 16px;
  overflow: auto;
  padding: 16px;
  align-items: center;
  justify-items: center;
}

.brand {
  display: grid;
  gap: 4px;
  margin-bottom: 16px;
}

.brand h1 {
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
}

.brand p,
.meta,
.log,
.knowledge {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.4;
}

.level-list {
  display: grid;
  gap: 6px;
}

.level-button,
.tool-button,
.arrow-button {
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  cursor: pointer;
  border-radius: 6px;
}

.level-button {
  width: 100%;
  min-height: 42px;
  display: grid;
  align-content: center;
  justify-items: start;
  gap: 2px;
  padding: 8px 10px;
  text-align: left;
}

.level-button[aria-current="true"] {
  border-color: var(--player);
  background: #edf6ff;
}

.level-button strong {
  font-size: 13px;
}

.level-button span {
  color: var(--muted);
  font-size: 11px;
  text-transform: uppercase;
}

.toolbar {
  width: min(100%, 760px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.tool-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tool-button {
  min-height: 36px;
  padding: 0 12px;
}

.status {
  min-height: 36px;
  display: flex;
  align-items: center;
  color: var(--muted);
  font-size: 13px;
}

.status.win {
  color: var(--ok);
}

.board-wrap {
  width: min(100%, 760px);
  max-height: 100%;
  display: grid;
  place-items: center;
  overflow: auto;
}

.board {
  display: grid;
  gap: 2px;
  padding: 8px;
  border: 1px solid var(--line);
  background: #aebcc3;
  border-radius: 8px;
}

.tile {
  width: clamp(34px, 7vw, 58px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 5px;
  border: 1px solid rgba(23, 32, 38, 0.18);
  background: var(--floor);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
  color: var(--ink);
  font-weight: 800;
  font-size: clamp(16px, 3vw, 24px);
}

.tile.wall {
  background: var(--wall);
  border-color: var(--wall);
  color: #f7fafc;
  box-shadow: none;
}

.tile.goal {
  background: color-mix(in srgb, var(--goal) 36%, var(--floor));
  box-shadow: inset 0 0 0 3px var(--goal);
}

.tile.crate {
  color: #fff;
  background: var(--crate);
}

.tile.player {
  color: #fff;
  background: var(--player);
}

.tile.portalA {
  color: #fff;
  background: var(--portal-a);
}

.tile.portalB {
  color: #fff;
  background: var(--portal-b);
}

.controls {
  display: grid;
  grid-template-columns: repeat(3, 52px);
  grid-template-rows: repeat(3, 44px);
  gap: 6px;
  justify-content: center;
}

.arrow-button {
  min-width: 52px;
  min-height: 44px;
}

.arrow-button[data-dir="up"] {
  grid-column: 2;
}

.arrow-button[data-dir="left"] {
  grid-column: 1;
  grid-row: 2;
}

.arrow-button[data-dir="right"] {
  grid-column: 3;
  grid-row: 2;
}

.arrow-button[data-dir="down"] {
  grid-column: 2;
  grid-row: 3;
}

.inspector h2,
.inspector h3 {
  margin: 0 0 10px;
  font-size: 14px;
}

.section {
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}

.section:first-child {
  padding-top: 0;
}

.event-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.event {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 4px 8px;
  background: #fff;
  font-size: 12px;
}

.event.hit {
  border-color: #67b99a;
  background: #eaf7f0;
}

.layout-view {
  margin: 0;
  max-height: 220px;
  overflow: auto;
  padding: 10px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: #172026;
  color: #e8f0f2;
  font: 12px/1.35 ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
  white-space: pre;
}

.log {
  min-height: 120px;
  max-height: 260px;
  overflow: auto;
  white-space: pre-wrap;
}

@media (max-width: 920px) {
  body {
    overflow: auto;
  }

  .shell {
    height: auto;
    min-height: 100vh;
    grid-template-columns: 1fr;
  }

  .sidebar,
  .inspector {
    max-height: none;
  }
}
`;
}
