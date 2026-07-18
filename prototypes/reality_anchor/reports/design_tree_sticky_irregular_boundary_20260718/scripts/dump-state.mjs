// Dump internal parse results + force-mode grid for a layout.
import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../src/core/io.ts";
import { getRuntimeAdapter } from "../../../../../src/prototypes/runtimeAdapter.ts";
import { forceModeAt } from "../../../../../src/prototypes/reality_anchor/mechanics.ts";

const [protoRoot, layoutPath] = process.argv.slice(2);
const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level = { id: "probe", title: "probe", layout, win: pkg.mechanic.win };
const s = adapter.parseLevel(level);
console.log("pushPullAnchor:", JSON.stringify(s.pushPullAnchor));
console.log("boxStickyAnchor:", JSON.stringify(s.boxStickyAnchor));
console.log("stickyGroups:", JSON.stringify(s.stickyGroups));
console.log("crates:", JSON.stringify(s.crates));
console.log("player:", JSON.stringify(s.player));
console.log("goals:", JSON.stringify([...s.goals].sort()));
for (let y = 0; y < s.height; y++) {
  let row = "";
  for (let x = 0; x < s.width; x++) row += forceModeAt(s, { x, y }) === "push" ? "P" : "L";
  console.log("mode " + row + `  y=${y}`);
}
