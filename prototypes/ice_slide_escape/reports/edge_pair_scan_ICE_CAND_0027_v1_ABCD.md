# ICE_CAND_0027_v1 edge pair scan: ABCD

Layout source: `D:/Developer/sokoban/prototypes/ice_slide_escape/reports/ICE_CAND_0027_v1_cross_wall_dual_fill_layout.txt`

```text
##############
#.....##.....#
......##......
#...IG#.....I.
.I.....#GI...#
#.....##.....#
##############
```

Interfaces:

- A = [0,4]
- B = [0,2]
- C = [13,3]
- D = [13,2]

Scan scope:

- Perimeter goals checked: 38
- Start/goal pairs checked: 152
- Max states per pair: 200000
- Max depth per pair: 140

Solved perimeter goals by selected start:

- A [0,4]: [0,2] (B), cost 10; [0,4] (A), cost 10
- B [0,2]: no solvable perimeter goals
- C [13,3]: [13,2] (D), cost 11; [13,3] (C), cost 10
- D [13,2]: [13,2] (D), cost 12; [13,3] (C), cost 11

Hard routing gates:

- selected_to_nonselected_solved: 0
- early_to_late_solved: 0
- ABCD_to_nonselected_solved: 0

Graph diagnostic reading:

- graph_fact: A/B/C/D selected starts were scanned against all 38 perimeter coordinates. A solves only A/B, B solves no perimeter goal, C solves only C/D, and D solves only C/D.
- neutral_meaning: the selected interfaces are separated into left-side A/B and right-side C/D regions; no selected start reaches non-selected perimeter goals, and no early A/B start reaches C/D.
- player_facing_interpretation: first-visit players cannot leak into the meta side, while revisit players can solve the right-side instance without the map reading as a walk-connected second exit.
- verdict_effect: hard route isolation passes.

Full machine-readable rows: `D:/Developer/sokoban/prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0027_v1_ABCD.json`.
