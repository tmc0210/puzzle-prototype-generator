import fs from "node:fs";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const root = process.cwd();
const protoRoot = path.join(root, "prototypes", "reality_anchor");
const layoutsDir = path.join(protoRoot, "reports", "design_tree_sticky_irregular_boundary_20260718", "exploration", "runs", "b03_layouts");
const outDir = path.join(protoRoot, "reports", "design_tree_sticky_irregular_boundary_20260718", "exploration", "runs", "b03");
fs.mkdirSync(outDir, { recursive: true });

const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

type P = { x: number; y: number };
const key = (p: P) => `${p.x},${p.y}`;

function cellsOf(state: any): { sticky: P[]; crates: P[] } {
  const sticky: P[] = (state.stickyGroups ?? []).flat();
  const crates: P[] = state.crates ?? [];
  return { sticky, crates };
}

function run(id: string, inputs: string[], checks: { sticky?: string[][]; crates?: string[][] }) {
  const layout = fs.readFileSync(path.join(layoutsDir, `${id}.txt`), "utf8");
  let state = adapter.parseLevel({ id, title: id, layout });
  const log: string[] = [`# ${id} end-state check`, "", `inputs: ${inputs.join(",")}`, ""];
  for (const input of inputs) {
    const r = runtime.step(state, input);
    log.push(`- ${input}: ${r.legal ? "legal" : `illegal (${r.reason})`} ${r.events.join(",")}`);
    if (r.legal) state = r.state;
  }
  const { sticky, crates } = cellsOf(state);
  log.push("", `final sticky cells: ${sticky.map(key).join(" ; ") || "-"}`);
  log.push(`final crate cells: ${crates.map(key).join(" ; ") || "-"}`);
  let pass = true;
  if (checks.sticky) {
    for (const group of checks.sticky) {
      const ok = group.every((g) => sticky.some((c) => key(c) === g));
      if (!ok) pass = false;
      log.push(`check sticky covers {${group.join(" ")}}: ${ok ? "PASS" : "FAIL"}`);
    }
  }
  if (checks.crates) {
    for (const group of checks.crates) {
      const ok = group.every((g) => crates.some((c) => key(c) === g));
      if (!ok) pass = false;
      log.push(`check crate covers {${group.join(" ")}}: ${ok ? "PASS" : "FAIL"}`);
    }
  }
  log.push("", pass ? "VERDICT: PASS" : "VERDICT: FAIL");
  fs.writeFileSync(path.join(outDir, `${id}.endstate.md`), log.join("\n"));
  console.log(log.slice(-8).join("\n"));
}

run("c45_pullgate_L20", ["right", "right", "down", "down", "left", "left"], {
  sticky: [["9,5", "9,6", "9,7"]],
  crates: [["10,5"]],
});

run("c74_L_widegate3", ["right", "right", "down", "down"], {
  sticky: [["9,7", "10,7", "9,8"]],
});
run("c72_L_widegate", ["right", "right", "down", "down"], {
  sticky: [["9,7", "10,7", "9,8"]],
});
