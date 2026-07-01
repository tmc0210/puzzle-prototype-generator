# ICE_CAND_0028_v1 edge pair scan: ABCD

Layout source: `prototypes/ice_slide_escape/reports/ICE_CAND_0028_v1_d5_target_projectile_debt_layout.txt`

```text
##############
......#......#
#...#.#.....##
#..#G.*.....*.
#...*.#......#
#.....#.....I#
#...I.#......#
......#.......
##############
```

Interfaces:

- A = [0,7]
- B = [0,1]
- C = [13,3]
- D = [13,7]

Scan scope:

- Perimeter goals checked: 42
- Start/goal pairs checked: 168
- Max states per pair: 120000
- Max depth per pair: 140

Solved perimeter goals by selected start:

- A [0,7]: [0,1] (B), cost 22; [0,7] (A), cost 18
- B [0,1]: [0,1] (B), cost 24; [0,7] (A), cost 20
- C [13,3]: [13,7] (D), cost 10
- D [13,7]: no solvable perimeter goals

Hard routing gates:

- selected_to_nonselected_solved: 0
- early_to_late_solved: 0
- ABCD_to_nonselected_solved: 0

Graph diagnostic reading:

- graph_fact: A/B/C/D selected starts were scanned against all 42 perimeter coordinates. A solves only A/B, B solves only B/A, C solves only D, and D solves no perimeter goal.
- neutral_meaning: the selected interfaces are separated into early-side A/B and late-side C/D solve regions; no selected start reaches non-selected perimeter goals, and no early A/B start reaches C/D.
- player_facing_interpretation: first-visit A/B cannot complete targets and exit into the meta side, while C can perform the right-side revisit route to D.
- verdict_effect: hard route isolation passes.

Full machine-readable rows: `D:/Developer/sokoban/prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0028_v1_ABCD.json`.
