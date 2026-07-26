import { readFile, writeFile } from "node:fs/promises";

const taskRoot = "prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726";
const baselineRef = `${taskRoot}/candidate/versions/CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_002/evidence/complete_graph.json`;
const trimmedRef = `${taskRoot}/pre_submission/redundancy_checks/outer_outline_band_left_0_0_9/analysis/complete_graph.json`;
const outRef = `${taskRoot}/pre_submission/redundancy_checks/outer_outline_band_left_0_0_9/graph_isomorphism.json`;
const baseline = JSON.parse(await readFile(baselineRef, "utf8"));
const trimmed = JSON.parse(await readFile(trimmedRef, "utf8"));

const shiftTrimmedKey = (key) => key.replace(/(\d+),(\d+)/g, (_, x, y) => `${Number(x) + 1},${y}`);
const shiftTrimmedEvent = (event) => event.replace(/(\d+),(\d+)/g, (_, x, y) => `${Number(x) + 1},${y}`);
const baselineKeys = new Map(baseline.nodes.map((node) => [node.id, node.key]));
const trimmedKeys = new Map(trimmed.nodes.map((node) => [node.id, shiftTrimmedKey(node.key)]));
const nodeRows = (graph, keys) => graph.nodes.map((node) => `${keys.get(node.id)}|D=${node.depth}|W=${node.winning}`).sort();
const edgeRows = (graph, keys, normalizeEvents) => graph.edges.map((edge) => `${keys.get(edge.from)}|${edge.input}|${JSON.stringify(edge.events.map(normalizeEvents))}|${keys.get(edge.to)}`).sort();
const baselineNodeRows = nodeRows(baseline, baselineKeys);
const trimmedNodeRows = nodeRows(trimmed, trimmedKeys);
const baselineEdgeRows = edgeRows(baseline, baselineKeys, (event) => event);
const trimmedEdgeRows = edgeRows(trimmed, trimmedKeys, shiftTrimmedEvent);
const nodesEqual = JSON.stringify(baselineNodeRows) === JSON.stringify(trimmedNodeRows);
const edgesEqual = JSON.stringify(baselineEdgeRows) === JSON.stringify(trimmedEdgeRows);
const result = {
  schema_version: "candle_trim_graph_isomorphism.v1",
  reviewed_graph_ref: baselineRef,
  trimmed_graph_ref: trimmedRef,
  coordinate_projection: "trimmed x + 1 = reviewed x; y unchanged",
  reviewed_counts: { nodes: baseline.nodes.length, edges: baseline.edges.length, wins: baseline.winning_state_count },
  trimmed_counts: { nodes: trimmed.nodes.length, edges: trimmed.edges.length, wins: trimmed.winning_state_count },
  node_rows_equal: nodesEqual,
  edge_rows_with_events_equal: edgesEqual,
  graph_isomorphic_with_events: nodesEqual && edgesEqual,
};
await writeFile(outRef, `${JSON.stringify(result, null, 2)}\n`, "utf8");
