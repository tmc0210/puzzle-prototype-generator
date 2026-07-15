import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

const prototypeRoot = "prototypes/reality_anchor";
const layoutPath = process.argv[2] ??
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/" +
  "candidates/challenge/RA_FRESH_2026_07_15_CATHEDRAL_E_DOCK_SYNC_v3.txt";
const maxStates = Number(process.argv[3] ?? 150_000);

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const initial = adapter.parseLevel({ id: "CATHEDRAL_V3_AUDIT", title: "CATHEDRAL_V3_AUDIT", layout });
const winCondition = pkg.mechanic.win;

type Node = {
  state: RealityAnchorState;
  parent?: number;
  action?: string;
  events: string[];
  depth: number;
  firstMerge: string;
};

const nodes: Node[] = [{ state: initial, events: [], depth: 0, firstMerge: "none" }];
const visited = new Map<string, number>([[runtime.key(initial), 0]]);
const familyWitness = new Map<string, number>();
const winningFirstMerge = new Map<string, number>();
let cursor = 0;
let transitions = 0;

while (cursor < nodes.length && nodes.length <= maxStates) {
  const node = nodes[cursor]!;
  if (!runtime.isWin(node.state, winCondition)) {
    for (const action of runtime.actions(node.state, { winCondition })) {
      const transition = runtime.step(node.state, action, { winCondition });
      if (!transition.legal) continue;
      transitions += 1;
      const key = runtime.key(transition.state);
      if (visited.has(key)) continue;
      const index = nodes.length;
      const merged = transition.events.some((event) => event.startsWith("sticky_merge:"));
      const firstMerge = node.firstMerge === "none" && merged ? action : node.firstMerge;
      visited.set(key, index);
      nodes.push({
        state: transition.state,
        parent: cursor,
        action,
        events: transition.events,
        depth: node.depth + 1,
        firstMerge,
      });
      if (runtime.isWin(transition.state, winCondition)) {
        const signature = objectSignature(transition.state);
        if (!familyWitness.has(signature)) familyWitness.set(signature, index);
        if (!winningFirstMerge.has(firstMerge)) winningFirstMerge.set(firstMerge, index);
      }
      if (nodes.length > maxStates) break;
    }
  }
  cursor += 1;
}

const summarizeWitness = (index: number) => {
  const path: Node[] = [];
  let current: number | undefined = index;
  while (current !== undefined) {
    path.push(nodes[current]!);
    current = nodes[current]!.parent;
  }
  path.reverse();
  return {
    depth: nodes[index]!.depth,
    firstMerge: nodes[index]!.firstMerge,
    inputs: path.slice(1).map((node) => node.action),
    objectEvents: path
      .slice(1)
      .filter((node) => node.events.some((event) => event !== "walk"))
      .map((node) => ({ action: node.action, events: node.events })),
  };
};

console.log(JSON.stringify({
  status: cursor < nodes.length ? "exhausted" : "complete",
  layoutPath,
  maxStates,
  reachableStates: nodes.length,
  transitions,
  winningObjectFamilies: familyWitness.size,
  families: [...familyWitness.entries()].map(([signature, index]) => ({
    signature,
    ...summarizeWitness(index),
  })),
  winningFirstMergeCategories: [...winningFirstMerge.entries()].map(([category, index]) => ({
    category,
    ...summarizeWitness(index),
  })),
}, null, 2));

function objectSignature(state: RealityAnchorState): string {
  const crates = state.crates.map(pointKey).sort().join(";");
  const groups = state.stickyGroups
    .map((group) => group.map(pointKey).sort().join(";"))
    .sort()
    .join("|");
  return `C:${crates}|M:${groups}`;
}

function pointKey(point: { x: number; y: number }): string {
  return `${point.x},${point.y}`;
}
