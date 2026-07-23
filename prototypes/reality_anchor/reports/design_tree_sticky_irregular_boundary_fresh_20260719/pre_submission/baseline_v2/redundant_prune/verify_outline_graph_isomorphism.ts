import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../../src/prototypes/runtimeAdapter.js";

const [originalPath, trimmedPath] = process.argv.slice(2);
if (!originalPath || !trimmedPath) {
  throw new Error("usage: verify_outline_graph_isomorphism.ts <original-layout> <trimmed-layout>");
}

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

async function parse(path: string, id: string) {
  const layout = (await readFile(path, "utf8")).replace(/\r/g, "").trimEnd();
  return adapter.parseLevel({
    id,
    title: id,
    role: "challenge",
    status: "candidate",
    targets: ["K_runtime_smoke"],
    known_before: ["K_runtime_smoke"],
    target_learning: ["K_runtime_smoke"],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout,
  } as any);
}

function graph(initial: any) {
  const result: any = enumerateRuntimeGraph(
    runtime as any,
    initial,
    pkg.mechanic.win,
    { winCondition: pkg.mechanic.win },
    { maxStates: 300_000 },
  );
  if (result.status !== "complete") throw new Error(`graph incomplete: ${result.reason ?? "unknown"}`);
  return result;
}

// 组合裁剪删除原 x=0 与 x=10..12，因此所有动态坐标只需统一 x-1。
function translateOriginalKey(key: string) {
  return key.replace(/(^|[:;])(\d+),(\d+)/g, (_match, prefix: string, x: string, y: string) => {
    return `${prefix}${Number(x) - 1},${y}`;
  });
}

function edgeSignatures(g: any, translate: (key: string) => string) {
  return g.edges.map((edge: any) => [
    translate(g.keys[edge.from]),
    edge.action,
    edge.events.join("+"),
    translate(g.keys[edge.to]),
  ].join(" -> ")).sort();
}

const original = graph(await parse(originalPath, "RA_BASELINE_V2_ORIGINAL"));
const trimmed = graph(await parse(trimmedPath, "RA_BASELINE_V3_TRIMMED"));
const originalKeys = original.keys.map(translateOriginalKey).sort();
const trimmedKeys = [...trimmed.keys].sort();
const originalEdges = edgeSignatures(original, translateOriginalKey);
const trimmedEdges = edgeSignatures(trimmed, (key) => key);
const originalWins = [...original.winStateIndexes].map((index: number) => translateOriginalKey(original.keys[index])).sort();
const trimmedWins = [...trimmed.winStateIndexes].map((index: number) => trimmed.keys[index]).sort();

const report = {
  status: "complete",
  mapping: "original dynamic coordinates (x,y) -> (x-1,y)",
  original: { states: original.keys.length, edges: original.edges.length, wins: originalWins.length },
  trimmed: { states: trimmed.keys.length, edges: trimmed.edges.length, wins: trimmedWins.length },
  state_keys_equal_after_translation: JSON.stringify(originalKeys) === JSON.stringify(trimmedKeys),
  labeled_edges_equal_after_translation: JSON.stringify(originalEdges) === JSON.stringify(trimmedEdges),
  winning_state_keys_equal_after_translation: JSON.stringify(originalWins) === JSON.stringify(trimmedWins),
};

if (!report.state_keys_equal_after_translation ||
    !report.labeled_edges_equal_after_translation ||
    !report.winning_state_keys_equal_after_translation) {
  throw new Error(JSON.stringify(report));
}

console.log(JSON.stringify(report, null, 2));
