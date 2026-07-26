import assert from "node:assert/strict";

import { discoverCandleRedundancyCandidates } from "./redundancyCandidates.js";

const v2 = `
################
#######O..44R.o#
#####.L111.#####
####O......#####
####.OOO...#####
####..o....#####
###OL3333#@#####
################
####....########
################
`;

const report = discoverCandleRedundancyCandidates(v2, "fixture-v2");
assert.equal(report.counts.whole_candle, 3);
assert.equal(report.counts.single_brazier, 8);

const candles = report.candidates.filter((candidate) => candidate.kind === "whole_candle");
assert.deepEqual(candles.map((candidate) => candidate.cells.length), [3, 4, 5]);
assert.ok(candles.every((candidate) => candidate.operations.join(",") === "remove"));

const outline = report.candidates.filter((candidate) => candidate.kind === "outer_outline_band");
assert.equal(outline.length, 2);
assert.ok(outline.some((candidate) => candidate.cells.length === 32));
assert.ok(outline.some((candidate) => candidate.cells.length === 20));

const v3 = `
##############
#####O..44R.o#
###.L111.#####
##O......#####
##.OOO...#####
##..o....#####
#OL3333#@#####
##############
`;
const compact = discoverCandleRedundancyCandidates(v3, "fixture-v3");
assert.equal(compact.counts.outer_outline_band, 0);
assert.ok(compact.candidates.some((candidate) =>
  candidate.kind === "detached_empty_region"
  && JSON.stringify(candidate.cells) === JSON.stringify([
    { x: 2, y: 4 },
    { x: 2, y: 5 },
    { x: 3, y: 5 },
  ]),
));

const staged = discoverCandleRedundancyCandidates(v3, "fixture-v3-staged", {
  vacatedObjectRegions: [{ id: "removed-candle", cells: [{ x: 2, y: 4 }] }],
});
assert.equal(staged.counts.vacated_object_floor_region, 1);
assert.deepEqual(
  staged.candidates.find((candidate) => candidate.kind === "vacated_object_floor_region"),
  {
    id: "vacated_object_floor_region:removed-candle:2,4:1",
    kind: "vacated_object_floor_region",
    cells: [{ x: 2, y: 4 }],
    operations: ["wallify"],
  },
);

const afterVacatedObjectWallify = `
##############
#####O..44R.o#
###.L111.#####
##O......#####
##..#O...#####
##..o....#####
#.L3333#@#####
##############
`;
const leafPocket = discoverCandleRedundancyCandidates(
  afterVacatedObjectWallify,
  "fixture-v3-after-vacated-object-wallify",
);
assert.ok(leafPocket.candidates.some((candidate) =>
  candidate.kind === "single_entry_floor_region"
  && JSON.stringify(candidate.cells) === JSON.stringify([
    { x: 2, y: 4 },
    { x: 3, y: 4 },
    { x: 2, y: 5 },
    { x: 3, y: 5 },
  ]),
));
assert.ok(!leafPocket.candidates.some((candidate) =>
  candidate.kind === "single_entry_floor_region" && candidate.cells.length === 19,
));

console.log("candle redundancy candidate tests passed");
