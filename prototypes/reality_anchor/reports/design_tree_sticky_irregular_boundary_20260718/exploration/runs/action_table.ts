import fs from "node:fs";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const root = process.cwd();
const protoRoot = path.join(root, "prototypes", "reality_anchor");
const baseLayoutsDir = path.join(protoRoot, "reports", "design_tree_sticky_irregular_boundary_20260718", "exploration", "runs", "b00_layouts");
const batchId = process.argv[2] ?? "b01";
const outDir = path.join(protoRoot, "reports", "design_tree_sticky_irregular_boundary_20260718", "exploration", "runs", batchId);
fs.mkdirSync(outDir, { recursive: true });

const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const inputs = runtime.actions();

type CaseSpec = { id: string; layoutFile: string };

const cases: CaseSpec[] = [
  { id: "w1_l_corridor", layoutFile: "w1_l_corridor.txt" },
  { id: "w2_notooth_l_corridor", layoutFile: "w2_notooth_l_corridor.txt" },
  { id: "w3_bar_corridor", layoutFile: "w3_bar_corridor.txt" },
  { id: "w5_l_straddle", layoutFile: "w5_l_straddle.txt" },
  { id: "w30_l_push_across", layoutFile: "w30_l_push_across.txt" },
  { id: "w31_l_pull_across", layoutFile: "w31_l_pull_across.txt" },
  { id: "w16_tooth_push", layoutFile: "w16_tooth_push.txt" },
  { id: "w17_tooth_pull", layoutFile: "w17_tooth_pull.txt" },
  { id: "w19_l_push_adjacent", layoutFile: "w19_l_push_adjacent.txt" },
  { id: "w21_squeeze_sealed", layoutFile: "w21_squeeze_sealed.txt" },
  { id: "w23_handle_cage", layoutFile: "w23_handle_cage.txt" },
  { id: "w25_squeeze_open", layoutFile: "w25_squeeze_open.txt" },
  { id: "w26_l_straddle_leftside", layoutFile: "w26_l_straddle_leftside.txt" },
  { id: "w27_bar_leftside", layoutFile: "w27_bar_leftside.txt" },
  { id: "w28_pocket_fat", layoutFile: "w28_pocket_fat.txt" },
  { id: "w29_pocket_inside", layoutFile: "w29_pocket_inside.txt" },
  { id: "w32_l_push_stagger", layoutFile: "w32_l_push_stagger.txt" },
  { id: "w33_bar_push_across", layoutFile: "w33_bar_push_across.txt" },
];

const summaryLines: string[] = [];
summaryLines.push(`# Action table batch ${batchId}`);
summaryLines.push("");
summaryLines.push(`- inputs probed from initial state: ${inputs.join(", ")}`);
summaryLines.push("");

for (const spec of cases) {
  const layout = fs.readFileSync(path.join(baseLayoutsDir, spec.layoutFile), "utf8");
  const level = { id: spec.id, title: spec.id, layout };
  const initial = adapter.parseLevel(level);
  const rows: string[] = [];
  for (const input of inputs) {
    const result = runtime.step(initial, input);
    const events = result.events.join(",") || "-";
    rows.push(`| ${input} | ${result.legal ? "legal" : "illegal"} | ${result.legal ? events : result.reason ?? ""} |`);
  }
  const md = [
    `# ${spec.id}`,
    "",
    "```text",
    adapter.renderState(initial),
    "```",
    "",
    "| input | status | events / reason |",
    "| --- | --- | --- |",
    ...rows,
    "",
  ].join("\n");
  fs.writeFileSync(path.join(outDir, `${spec.id}.actions.md`), md);
  summaryLines.push(`## ${spec.id}`);
  summaryLines.push("");
  summaryLines.push("| input | status | events / reason |");
  summaryLines.push("| --- | --- | --- |");
  summaryLines.push(...rows);
  summaryLines.push("");
}

fs.writeFileSync(path.join(outDir, "SUMMARY.md"), summaryLines.join("\n"));
console.log(`wrote ${cases.length} action tables to ${outDir}`);
