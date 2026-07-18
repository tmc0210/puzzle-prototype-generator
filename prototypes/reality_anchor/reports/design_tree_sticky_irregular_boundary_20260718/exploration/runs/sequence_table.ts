import fs from "node:fs";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const root = process.cwd();
const protoRoot = path.join(root, "prototypes", "reality_anchor");
const layoutsDir = path.join(protoRoot, "reports", "design_tree_sticky_irregular_boundary_20260718", "exploration", "runs", "b00_layouts");
const outDir = path.join(protoRoot, "reports", "design_tree_sticky_irregular_boundary_20260718", "exploration", "runs", "b02");
fs.mkdirSync(outDir, { recursive: true });

const pkg = await loadPrototypePackage(protoRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

type StepRow = {
  input: string;
  legal: boolean;
  reason?: string;
  events: string[];
  player: string;
  crates: string[];
  stickyGroups: string[][];
  boxSide: string[];
  stickySide: string[];
  winAfter: boolean;
};

type SeqSpec = { id: string; layoutFile: string; inputs: string[]; note: string };

const specs: SeqSpec[] = [
  { id: "w41_l_slot_pocket", layoutFile: "w41_pocket_l.txt", inputs: ["left", "left", "left"], note: "L in sealed 1-row corridor, player hugs foot" },
  { id: "w42_bar_slot_pocket", layoutFile: "w42_pocket_bar.txt", inputs: ["left", "left", "left"], note: "bar in sealed corridor, no hug" },
  { id: "w44_vbar_slot", layoutFile: "w44_vbar_slot.txt", inputs: ["left", "left"], note: "vertical bar hugged in slot corridor" },
  { id: "w45_l_slot_goal", layoutFile: "w45_pocket_slot_goal.txt", inputs: ["left", "left", "left"], note: "L slot corridor with goal behind player" },
  { id: "w46_c_slot_goal", layoutFile: "w46_cshape_slot.txt", inputs: ["left", "left"], note: "C/U shape in slot corridor" },
  { id: "w47_t_slot_goal", layoutFile: "w47_tshape_slot.txt", inputs: ["left", "left"], note: "T (3 bar + stem) in slot corridor" },
  { id: "w49_S_open_bs", layoutFile: "w49_tetromino_S_bs.txt", inputs: ["left", "left", "left"], note: "S tetromino open field over B/S boundary" },
  { id: "w50_T_open_bs", layoutFile: "w50_tetromino_T_bs.txt", inputs: ["left", "left", "left"], note: "T tetromino open field over B/S boundary" },
];

function sideCells(state: any): { boxSide: string[]; stickySide: string[] } {
  const boxSide: string[] = [];
  const stickySide: string[] = [];
  const cells: any[] = [
    ...state.crates.map((p: any) => ({ p })),
    ...state.stickyGroups.flatMap((g: any[]) => g.map((p: any) => ({ p }))),
  ];
  for (const { p } of cells) {
    const side = state.boxStickyAnchor
      ? (state.boxStickyAnchor.box.x !== state.boxStickyAnchor.sticky.x
          ? (state.boxStickyAnchor.box.x < state.boxStickyAnchor.sticky.x ? p.x <= state.boxStickyAnchor.box.x : p.x >= state.boxStickyAnchor.box.x)
          : (state.boxStickyAnchor.box.y < state.boxStickyAnchor.sticky.y ? p.y <= state.boxStickyAnchor.box.y : p.y >= state.boxStickyAnchor.box.y))
        : true;
    (side ? boxSide : stickySide).push(`${p.x},${p.y}`);
  }
  return { boxSide, stickySide };
}

const summary: string[] = [`# Sequence table batch b02`, ""];
const jsonAll: any[] = [];

for (const spec of specs) {
  const layout = fs.readFileSync(path.join(layoutsDir, spec.layoutFile), "utf8");
  const level = { id: spec.id, title: spec.id, layout };
  let state = adapter.parseLevel(level);
  const rows: StepRow[] = [];
  for (const input of spec.inputs) {
    const result = runtime.step(state, input);
    const after = result.legal ? result.state : state;
    const { boxSide, stickySide } = sideCells(after);
    rows.push({
      input,
      legal: result.legal,
      ...(result.legal ? {} : { reason: result.reason }),
      events: result.events,
      player: `${after.player.x},${after.player.y}`,
      crates: after.crates.map((p: any) => `${p.x},${p.y}`),
      stickyGroups: after.stickyGroups.map((g: any[]) => g.map((p: any) => `${p.x},${p.y}`)),
      boxSide,
      stickySide,
      winAfter: runtime.isWin(after),
    });
    if (result.legal) state = result.state;
  }
  jsonAll.push({ id: spec.id, note: spec.note, layoutFile: spec.layoutFile, inputs: spec.inputs, initial: adapter.renderState(adapter.parseLevel(level)), rows });

  const md: string[] = [`# ${spec.id}`, "", `- note: ${spec.note}`, `- layout: runs/b00_layouts/${spec.layoutFile}`, `- inputs: ${spec.inputs.join(",")}`, "", "```text", adapter.renderState(adapter.parseLevel(level)), "```", "",
    "| step | input | status | events | player | sticky groups | crates | box-side | sticky-side | win |",
    "| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- |"];
  rows.forEach((r, i) => {
    md.push(`| ${i + 1} | ${r.input} | ${r.legal ? "legal" : `illegal:${r.reason}`} | ${r.events.join(",") || "-"} | ${r.player} | ${r.stickyGroups.map((g) => `[${g.join(" ")}]`).join(" ")} | ${r.crates.join(" ") || "-"} | ${r.boxSide.join(" ") || "-"} | ${r.stickySide.join(" ") || "-"} | ${r.winAfter ? "yes" : "no"} |`);
  });
  md.push("");
  md.push("Final:");
  md.push("");
  md.push("```text");
  md.push(adapter.renderState(state));
  md.push("```");
  fs.writeFileSync(path.join(outDir, `${spec.id}.seq.md`), md.join("\n"));
  summary.push(`## ${spec.id} — ${spec.note}`, "");
  summary.push(...md.slice(9));
  summary.push("");
}

fs.writeFileSync(path.join(outDir, "SUMMARY.md"), summary.join("\n"));
fs.writeFileSync(path.join(outDir, "results.json"), `${JSON.stringify(jsonAll, null, 2)}\n`);
console.log(`wrote ${specs.length} sequence tables to ${outDir}`);
