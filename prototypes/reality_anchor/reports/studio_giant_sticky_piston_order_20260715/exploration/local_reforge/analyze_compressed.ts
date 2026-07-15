import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

const layoutPath = process.argv[2] ?? fileURLToPath(new URL("./shield_reforge_v2.txt", import.meta.url));
const maxStates = Number(process.argv[3] ?? 100_000);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel({
  id: "SHIELD_REFORGE_COMPRESSED_AUDIT",
  title: "SHIELD_REFORGE_COMPRESSED_AUDIT",
  layout: readFileSync(layoutPath, "utf8"),
  win: pkg.mechanic.win,
});
const options = { winCondition: pkg.mechanic.win } as never;

type State = RealityAnchorState;
type WalkEntry = { state: State; path: string[] };
type Node = {
  state: State;
  parent?: number;
  segment: string[];
  objectAction?: string;
  events: string[];
  depth: number;
};

const canonicalCache = new Map<string, string>();
const initialCanonical = canonicalKey(initial);
const nodes: Node[] = [{ state: initial, segment: [], events: [], depth: 0 }];
const visited = new Map<string, number>([[initialCanonical, 0]]);
const winningFamilies = new Map<string, number>();
let cursor = 0;
let objectTransitions = 0;
let generatedAttempts = 0;

while (cursor < nodes.length && nodes.length < maxStates) {
  const node = nodes[cursor]!;
  if (!runtime.isWin(node.state, pkg.mechanic.win, options)) {
    const localSuccessors = new Set<string>();
    for (const walk of walkRegion(node.state, true)) {
      for (const action of runtime.actions(walk.state as never, options)) {
        const transition = runtime.step(walk.state as never, action as never, options);
        generatedAttempts += 1;
        if (!transition.legal || transition.events.every(event => event === "walk")) continue;
        objectTransitions += 1;
        const next = transition.state as State;
        const key = canonicalKey(next);
        if (localSuccessors.has(key)) continue;
        localSuccessors.add(key);
        if (visited.has(key)) continue;
        const index = nodes.length;
        visited.set(key, index);
        nodes.push({
          state: next,
          parent: cursor,
          segment: [...walk.path, action],
          objectAction: action,
          events: transition.events,
          depth: node.depth + walk.path.length + 1,
        });
        if (runtime.isWin(next, pkg.mechanic.win, options)) {
          const signature = objectSignature(next);
          if (!winningFamilies.has(signature)) winningFamilies.set(signature, index);
        }
        if (nodes.length >= maxStates) break;
      }
      if (nodes.length >= maxStates) break;
    }
  }
  cursor += 1;
}

const status = cursor >= nodes.length ? "complete" : "budget_exhausted";
const witnesses = [...winningFamilies.entries()].map(([signature, index]) => ({
  signature,
  ...summarizeWitness(index),
}));

console.log(JSON.stringify({
  status,
  layoutPath,
  maxStates,
  compressedStates: nodes.length,
  expandedStates: cursor,
  objectTransitions,
  generatedAttempts,
  winningObjectFamilies: winningFamilies.size,
  witnesses,
}, null, 2));

function walkRegion(start: State, keepPaths: boolean): WalkEntry[] {
  const queue: WalkEntry[] = [{ state: start, path: [] }];
  const seen = new Set<string>([runtime.key(start)]);
  for (let head = 0; head < queue.length; head += 1) {
    const current = queue[head]!;
    for (const action of runtime.actions(current.state as never, options)) {
      const transition = runtime.step(current.state as never, action as never, options);
      if (!transition.legal || transition.events.some(event => event !== "walk")) continue;
      const state = transition.state as State;
      const key = runtime.key(state);
      if (seen.has(key)) continue;
      seen.add(key);
      queue.push({ state, path: keepPaths ? [...current.path, action] : [] });
    }
  }
  return queue;
}

function canonicalKey(state: State): string {
  const fullKey = runtime.key(state);
  const cached = canonicalCache.get(fullKey);
  if (cached) return cached;
  const region = walkRegion(state, false);
  const keys = region.map(entry => runtime.key(entry.state)).sort();
  const canonical = keys[0]!;
  for (const key of keys) canonicalCache.set(key, canonical);
  return canonical;
}

function summarizeWitness(index: number) {
  const chain: Node[] = [];
  let current: number | undefined = index;
  while (current !== undefined) {
    chain.push(nodes[current]!);
    current = nodes[current]!.parent;
  }
  chain.reverse();
  return {
    inputDepth: chain.slice(1).reduce((sum, node) => sum + node.segment.length, 0),
    inputs: chain.slice(1).flatMap(node => node.segment),
    objectPlan: chain.slice(1).map(node => ({
      action: node.objectAction,
      events: node.events,
    })),
  };
}

function objectSignature(state: State): string {
  return runtime.key(state).replace(/^Ply:[^|]+\|/, "");
}
