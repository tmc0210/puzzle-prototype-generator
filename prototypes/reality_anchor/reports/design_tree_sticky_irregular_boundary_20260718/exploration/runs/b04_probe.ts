import fs from "node:fs";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const root = process.cwd();
const protoRoot = path.join(root, "prototypes", "reality_anchor");
const explorationRoot = path.join(
  protoRoot,
  "reports",
  "design_tree_sticky_irregular_boundary_20260718",
  "exploration",
  "runs",
);
const layoutsDir = path.join(explorationRoot, "b04_layouts");
const outDir = path.join(explorationRoot, "b04");
fs.mkdirSync(outDir, { recursive: true });

const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

type Spec = {
  id: string;
  layoutFile: string;
  inputs: string[];
  note: string;
};

const specs: Spec[] = [
  { id: "pull_L_cut", layoutFile: "far_L.txt", inputs: ["left", "left", "left", "left", "left"], note: "L 三连块；L 侧前沿拉，首列切成 C 后脱钩" },
  { id: "pull_T_cut", layoutFile: "far_T.txt", inputs: ["left", "left", "left", "left", "left"], note: "T 四连块；L 侧前沿拉，首列切成 C 后脱钩" },
  { id: "pull_S_cut", layoutFile: "far_S.txt", inputs: ["left", "left", "left", "left", "left"], note: "S 四连块；L 侧前沿拉，首列切成 C 后脱钩" },
  { id: "pull_Z_cut", layoutFile: "far_Z.txt", inputs: ["left", "left", "left", "left", "left"], note: "Z 四连块；L 侧前沿拉，首列切成 C 后脱钩" },
  { id: "push_L_cut", layoutFile: "push_L.txt", inputs: ["left", "left", "left", "left", "left"], note: "L 三连块；P 侧后沿推，按列连续切完" },
  { id: "push_T_cut", layoutFile: "push_T.txt", inputs: ["left", "left", "left", "left", "left", "left"], note: "T 四连块；P 侧后沿推，按 1/2/1 列宽连续切完" },
  { id: "push_S_cut", layoutFile: "push_S.txt", inputs: ["left", "left", "left", "left", "left", "left"], note: "S 四连块；P 侧后沿推到第三片时脱离施力行，留下单格 sticky" },
  { id: "push_Z_cut", layoutFile: "push_Z.txt", inputs: ["left", "left", "left", "left", "left", "left"], note: "Z 四连块；P 侧后沿推，按 1/2/1 列宽连续切完" },
  { id: "push_L_immediate_inverse", layoutFile: "push_L.txt", inputs: ["left", "left", "left", "left", "left", "right"], note: "L 完全切成箱后立即反向；right 只是 walk，不能复原" },
  { id: "pull_L_far_inverse", layoutFile: "far_L.txt", inputs: ["left", "left", "left", "left", "right"], note: "P/L 远离 B/S；首片切下后玩家仍在 L 侧，right 被前方箱占据而不能复原" },
  { id: "push_S_reposition_finish", layoutFile: "push_S.txt", inputs: ["left", "left", "left", "left", "left", "left", "down", "right", "right", "up", "up", "left"], note: "S 遗留单格需绕到上行右侧再推一次，才能完成最后切割" },
  { id: "near_L_reversible", layoutFile: "near_L_reversible.txt", inputs: ["left", "left", "left", "left", "right", "left", "left"], note: "P/L 紧邻 B/S；首片切下后落入 P 侧，可右推重黏，再次左拉重切" },
  { id: "no_cross_L", layoutFile: "no_cross_L.txt", inputs: ["left", "left", "left", "left", "left"], note: "同 L 与同动作，B/S 线移到更左侧而未跨越；只整块平移" },
];

function point(p: any): string {
  return `${p.x},${p.y}`;
}

function sideOf(state: any, p: any): "B" | "S" {
  const anchor = state.boxStickyAnchor;
  if (!anchor) return "B";
  if (anchor.box.x !== anchor.sticky.x) {
    const isBox = anchor.box.x < anchor.sticky.x ? p.x <= anchor.box.x : p.x >= anchor.box.x;
    return isBox ? "B" : "S";
  }
  const isBox = anchor.box.y < anchor.sticky.y ? p.y <= anchor.box.y : p.y >= anchor.box.y;
  return isBox ? "B" : "S";
}

function snapshot(state: any) {
  const crates = state.crates.map((p: any) => point(p)).sort();
  const stickyGroups = state.stickyGroups.map((g: any[]) => g.map(point).sort());
  const typedCells = [
    ...state.crates.map((p: any) => `C@${point(p)}:${sideOf(state, p)}`),
    ...state.stickyGroups.flatMap((g: any[], groupIndex: number) =>
      g.map((p: any) => `M${groupIndex + 1}@${point(p)}:${sideOf(state, p)}`),
    ),
  ].sort();
  return {
    player: point(state.player),
    playerMode:
      state.pushPullAnchor &&
      (state.pushPullAnchor.push.x !== state.pushPullAnchor.pull.x
        ? (state.pushPullAnchor.push.x < state.pushPullAnchor.pull.x
            ? state.player.x <= state.pushPullAnchor.push.x
            : state.player.x >= state.pushPullAnchor.push.x)
        : (state.pushPullAnchor.push.y < state.pushPullAnchor.pull.y
            ? state.player.y <= state.pushPullAnchor.push.y
            : state.player.y >= state.pushPullAnchor.push.y))
        ? "P"
        : "L",
    crates,
    stickyGroups,
    typedCells,
    rendered: adapter.renderState(state),
  };
}

const all: any[] = [];
const summary: string[] = ["# b04：B/S 远列化异形逐格切割谱", ""];

for (const spec of specs) {
  const layout = fs.readFileSync(path.join(layoutsDir, spec.layoutFile), "utf8");
  const level = { id: spec.id, title: spec.id, layout };
  let state = adapter.parseLevel(level);
  const initial = snapshot(state);
  const rows: any[] = [];

  for (const input of spec.inputs) {
    const before = snapshot(state);
    const result = runtime.step(state, input);
    const afterState = result.legal ? result.state : state;
    const after = snapshot(afterState);
    rows.push({
      input,
      legal: result.legal,
      reason: result.legal ? null : result.reason,
      events: result.events,
      before,
      after,
      winAfter: runtime.isWin(afterState),
    });
    if (result.legal) state = result.state;
  }

  const record = {
    ...spec,
    layoutRef: `runs/b04_layouts/${spec.layoutFile}`,
    initial,
    rows,
    final: snapshot(state),
  };
  all.push(record);

  const md: string[] = [
    `# ${spec.id}`,
    "",
    `- note: ${spec.note}`,
    `- layout_ref: \`runs/b04_layouts/${spec.layoutFile}\``,
    `- exact_inputs: \`${spec.inputs.join(",")}\``,
    "",
    "## Before",
    "",
    "```text",
    initial.rendered,
    "```",
    "",
    "| step | input | status | events / reason | player(mode) | crates | sticky groups | typed cells |",
    "| ---: | --- | --- | --- | --- | --- | --- | --- |",
  ];
  rows.forEach((row, index) => {
    md.push(
      `| ${index + 1} | ${row.input} | ${row.legal ? "legal" : "illegal"} | ${row.legal ? row.events.join(",") || "walk" : row.reason} | ${row.after.player}(${row.after.playerMode}) | ${row.after.crates.join(" ") || "-"} | ${row.after.stickyGroups.map((g: string[]) => `[${g.join(" ")}]`).join(" ") || "-"} | ${row.after.typedCells.join(" ") || "-"} |`,
    );
  });
  md.push("", "## After", "", "```text", record.final.rendered, "```", "", "## Step renders", "");
  rows.forEach((row, index) => {
    md.push(`### ${index + 1}. ${row.input} — ${row.legal ? "legal" : `illegal:${row.reason}`}`, "", "```text", row.after.rendered, "```", "");
  });
  fs.writeFileSync(path.join(outDir, `${spec.id}.md`), `${md.join("\n")}\n`);
  summary.push(...md, "");
}

fs.writeFileSync(path.join(outDir, "results.json"), `${JSON.stringify(all, null, 2)}\n`);
fs.writeFileSync(path.join(outDir, "SUMMARY.md"), `${summary.join("\n")}\n`);
console.log(`wrote ${specs.length} probes to ${outDir}`);
