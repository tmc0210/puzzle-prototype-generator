import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

const prototypeRoot = "prototypes/reality_anchor";
const layoutPath = process.argv[2] ??
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/" +
  "exploration/piston_contradiction/trident_primer_v1.txt";
const maxStates = Number(process.argv[3] ?? 30_000);

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const initial = adapter.parseLevel({ id: "TRIDENT_PRIMER_AUDIT", title: "TRIDENT_PRIMER_AUDIT", layout });
const winCondition = pkg.mechanic.win;

type Node = {
  state: RealityAnchorState;
  parent?: number;
  action?: string;
  events: string[];
  depth: number;
};

const nodes: Node[] = [{ state: initial, events: [], depth: 0 }];
const visited = new Map<string, number>([[runtime.key(initial), 0]]);
const familyWitness = new Map<string, number>();
const winningPlanCounts = new Map<string, number>();
let cursor = 0;
let transitions = 0;
let rawWins = 0;

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
      visited.set(key, index);
      nodes.push({
        state: transition.state,
        parent: cursor,
        action,
        events: transition.events,
        depth: node.depth + 1,
      });
      if (runtime.isWin(transition.state, winCondition)) {
        rawWins += 1;
        const signature = objectSignature(transition.state);
        if (!familyWitness.has(signature)) familyWitness.set(signature, index);
        const plan = objectPlanSignature(nodes, index);
        winningPlanCounts.set(plan, (winningPlanCounts.get(plan) ?? 0) + 1);
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
  rawWins,
  winningObjectFamilies: familyWitness.size,
  winningPlanCategories: [...winningPlanCounts.entries()].map(([plan, count]) => ({ plan, count })),
  families: [...familyWitness.entries()].map(([signature, index]) => ({
    signature,
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

function objectPlanSignature(nodes: Node[], index: number): string {
  const path: Node[] = [];
  let current: number | undefined = index;
  while (current !== undefined) {
    path.push(nodes[current]!);
    current = nodes[current]!.parent;
  }
  return path
    .reverse()
    .slice(1)
    .filter((node) => node.events.some((event) => event !== "walk"))
    .map((node) => `${node.action}:${node.events.join("+")}`)
    .join(" -> ");
}
