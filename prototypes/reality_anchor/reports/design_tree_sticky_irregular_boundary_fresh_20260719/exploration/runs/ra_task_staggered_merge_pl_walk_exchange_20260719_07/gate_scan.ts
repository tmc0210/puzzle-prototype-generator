import { writeFileSync } from "node:fs";
import { step, type RealityAnchorState } from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

type Dir = "up" | "down" | "left" | "right";
type Point = { x: number; y: number };

const mechanic = {
  inputs: {
    up: { intent: "move", dir: "up" },
    down: { intent: "move", dir: "down" },
    left: { intent: "move", dir: "left" },
    right: { intent: "move", dir: "right" },
  },
} as any;

const vectors: Record<Dir, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const shapes: Record<string, Point[]> = {
  stagger_s: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
  stagger_z: [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
  square_2x2: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
};

const key = (p: Point) => `${p.x},${p.y}`;
const add = (a: Point, b: Point) => ({ x: a.x + b.x, y: a.y + b.y });
const eq = (a: Point, b: Point) => a.x === b.x && a.y === b.y;
const dirs = Object.keys(vectors) as Dir[];

const aWitnesses: any[] = [];
const abWitnesses: any[] = [];
const vacatedWitnesses: any[] = [];
const nonWalkOldHalfEntries: any[] = [];
let statesTested = 0;
let forceStepsTested = 0;
let gateATotal = 0;
let aWithVacatedOldHalf = 0;
let aWithAdjacentVacatedOldHalf = 0;
let legalOldHalfEntries = 0;

for (const [shapeId, localCells] of Object.entries(shapes)) {
  const sticky = localCells.map((p) => ({ x: p.x + 6, y: p.y + 6 }));
  const stickySet = new Set(sticky.map(key));
  for (const orientation of ["horizontal", "vertical"] as const) {
    for (let ax = 3; ax <= 11; ax += 1) {
      for (let ay = 3; ay <= 11; ay += 1) {
        const raw = orientation === "horizontal"
          ? [{ x: ax, y: ay }, { x: ax + 1, y: ay }]
          : [{ x: ax, y: ay }, { x: ax, y: ay + 1 }];
        if (raw.some((p) => stickySet.has(key(p)))) continue;
        for (const swap of [false, true]) {
          const push = swap ? raw[1]! : raw[0]!;
          const pull = swap ? raw[0]! : raw[1]!;
          for (let px = 3; px <= 11; px += 1) {
            for (let py = 3; py <= 11; py += 1) {
              const player = { x: px, y: py };
              if (stickySet.has(key(player)) || raw.some((p) => eq(p, player))) continue;
              const initial: RealityAnchorState = {
                width: 16,
                height: 16,
                walls: new Set(),
                goals: new Set(["14,14"]),
                player,
                crates: [],
                stickyGroups: [sticky],
                pushPullAnchor: { push, pull },
                boxStickyAnchor: { box: { x: 0, y: 0 }, sticky: { x: 1, y: 0 } },
              };
              statesTested += 1;
              for (const dir of dirs) {
                forceStepsTested += 1;
                const first = step(mechanic, initial, dir);
                if (!first.legal) continue;
                if (!first.events.includes("anchor_boundary_shift:push_pull")) continue;
                if (!first.events.includes("move_sticky_rigid")) continue;
                if (!first.events.some((event) => event.startsWith("force_chain:"))) continue;
                if (!/^(push|pull)_object:sticky#/.test(first.events[0] ?? "")) continue;
                const oldAnchor = raw.map(key);
                const occupiedAfter = new Set([
                  ...first.state.stickyGroups.flat().map(key),
                  ...(first.state.pushPullAnchor ? [key(first.state.pushPullAnchor.push), key(first.state.pushPullAnchor.pull)] : []),
                  ...(first.state.boxStickyAnchor ? [key(first.state.boxStickyAnchor.box), key(first.state.boxStickyAnchor.sticky)] : []),
                ]);
                const vacated = oldAnchor.filter((cell) => !occupiedAfter.has(cell));
                const aWitness = {
                  shapeId,
                  sticky,
                  playerBefore: player,
                  input: dir,
                  anchorBefore: { push, pull },
                  events: first.events,
                  playerAfter: first.state.player,
                  stickyAfter: first.state.stickyGroups[0],
                  anchorAfter: first.state.pushPullAnchor,
                  vacatedOldHalves: vacated,
                };
                gateATotal += 1;
                if (vacated.length > 0) {
                  aWithVacatedOldHalf += 1;
                  if (vacatedWitnesses.length < 20) vacatedWitnesses.push(aWitness);
                }
                if (vacated.some((cell) => {
                  const [x, y] = cell.split(",").map(Number);
                  return Math.abs(first.state.player.x - x!) + Math.abs(first.state.player.y - y!) === 1;
                })) {
                  aWithAdjacentVacatedOldHalf += 1;
                }
                if (aWitnesses.length < 20) aWitnesses.push(aWitness);
                for (const nextDir of dirs) {
                  const second = step(mechanic, first.state, nextDir);
                  if (!second.legal || !vacated.includes(key(second.state.player))) continue;
                  legalOldHalfEntries += 1;
                  if (second.events[0] !== "walk") {
                    if (nonWalkOldHalfEntries.length < 20) nonWalkOldHalfEntries.push({
                      ...aWitness,
                      nextInput: nextDir,
                      nextEvents: second.events,
                      playerAfterEntry: second.state.player,
                    });
                    continue;
                  }
                  abWitnesses.push({
                    ...aWitness,
                    nextInput: nextDir,
                    nextEvents: second.events,
                    playerAfterWalk: second.state.player,
                  });
                  if (abWitnesses.length >= 20) break;
                }
              }
            }
          }
        }
      }
    }
  }
}

const result = {
  gateA: { status: aWitnesses.length > 0 ? "witness_found" : "no_witness", retainedWitnesses: aWitnesses.length },
  gateB: { status: abWitnesses.length > 0 ? "witness_found" : "no_witness", retainedWitnesses: abWitnesses.length },
  scope: {
    shapes: Object.keys(shapes),
    anchorOrientations: ["horizontal", "vertical"],
    forceDirections: dirs,
    nextDirections: dirs,
    labelOrders: ["as_listed", "swapped"],
    walls: "none",
    statesTested,
    forceStepsTested,
    requirement: "first step directly pushes/pulls the merged sticky and moves P/L in the same force chain; second input must emit walk and land on a vacated old P/L half",
  },
  conflictCounts: {
    gateATotal,
    aWithVacatedOldHalf,
    aWithAdjacentVacatedOldHalf,
    legalOldHalfEntries,
    walkOldHalfEntries: abWitnesses.length,
    nonWalkOldHalfEntries: nonWalkOldHalfEntries.length,
  },
  aWitnesses,
  vacatedWitnesses,
  nonWalkOldHalfEntries,
  abWitnesses,
};

writeFileSync(new URL("./gate_scan.json", import.meta.url), JSON.stringify(result, null, 2));
console.log(JSON.stringify({ gateA: result.gateA, gateB: result.gateB, scope: result.scope, conflictCounts: result.conflictCounts }, null, 2));
