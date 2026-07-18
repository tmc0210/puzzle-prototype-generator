import fs from "node:fs";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const root = process.cwd();
const protoRoot = path.join(root, "prototypes", "reality_anchor");
const layoutsDir = path.join(protoRoot, "reports", "design_tree_sticky_irregular_boundary_20260718", "exploration", "runs", "b03_layouts");
const outDir = path.join(protoRoot, "reports", "design_tree_sticky_irregular_boundary_20260718", "exploration", "runs", process.argv[2] ?? "b03");
fs.mkdirSync(outDir, { recursive: true });

const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const inputs = runtime.actions();

const files = fs.readdirSync(layoutsDir).filter((f) => f.endsWith(".txt")).sort();
const summary: string[] = [`# Action table batch ${process.argv[2] ?? "b03"}`, ""];
for (const file of files) {
  const id = file.replace(/\.txt$/, "");
  const layout = fs.readFileSync(path.join(layoutsDir, file), "utf8");
  let initial;
  try {
    initial = adapter.parseLevel({ id, title: id, layout });
  } catch (err) {
    summary.push(`## ${id}`, "", `PARSE ERROR: ${String(err)}`, "");
    continue;
  }
  const rows: string[] = [];
  for (const input of inputs) {
    const result = runtime.step(initial, input);
    rows.push(`| ${input} | ${result.legal ? "legal" : "illegal"} | ${result.legal ? result.events.join(",") || "-" : result.reason ?? ""} |`);
  }
  const md = [`# ${id}`, "", "```text", adapter.renderState(initial), "```", "", "| input | status | events / reason |", "| --- | --- | --- |", ...rows, ""].join("\n");
  fs.writeFileSync(path.join(outDir, `${id}.actions.md`), md);
  summary.push(`## ${id}`, "", "| input | status | events / reason |", "| --- | --- | --- |", ...rows, "");
}
fs.writeFileSync(path.join(outDir, "SUMMARY.md"), summary.join("\n"));
console.log(`wrote ${files.length} action tables to ${outDir}`);
