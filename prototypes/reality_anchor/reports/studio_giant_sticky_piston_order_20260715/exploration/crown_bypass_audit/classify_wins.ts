import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

const prototypeRoot = "prototypes/reality_anchor";
const layoutPath =
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/" +
  "candidates/challenge/RA_FRESH_2026_07_15_TRIDENT_CROWN_LOCK_SYNC_v2.txt";
const maxStates = Number(process.argv[2] ?? 10_000);

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const initial = adapter.parseLevel({ id: "CROWN_AUDIT", title: "CROWN_AUDIT", layout });
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
      visited.set(key, index);
      nodes.push({
        state: transition.state,
        parent: cursor,
        action,
        events: transition.events,
        depth: node.depth + 1,
      });
      if (runtime.isWin(transition.state, winCondition)) {
        const signature = objectSignature(transition.state);
        if (!familyWitness.has(signature)) familyWitness.set(signature, index);
      }
      if (nodes.length > maxStates) break;
    }
  }
  cursor += 1;
}

const families = [...familyWitness.entries()].map(([signature, index]) => {
  const path: Node[] = [];
  let current: number | undefined = index;
  while (current !== undefined) {
    path.push(nodes[current]!);
    current = nodes[current]!.parent;
  }
  path.reverse();
  return {
    signature,
    depth: nodes[index]!.depth,
    inputs: path.slice(1).map((node) => node.action),
    objectEvents: path
      .slice(1)
      .filter((node) => node.events.some((event) => event !== "walk"))
      .map((node) => ({ action: node.action, events: node.events })),
  };
});

console.log(JSON.stringify({
  status: cursor < nodes.length ? "exhausted" : "complete",
  maxStates,
  reachableStates: nodes.length,
  transitions,
  winningObjectFamilies: families.length,
  families,
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
