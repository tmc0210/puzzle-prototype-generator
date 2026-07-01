# ICE_CAND_0025_v4 edge pair scan: ABCD with D walled

Layout source: `D:/Developer/sokoban/prototypes/ice_slide_escape/reports/ICE_CAND_0025_v4_gated_role_flip_layout.txt`

```text
#################
#################
........I.......#
#.......#########
#.......#########
.....IG#......I..
#################
```

Interfaces:

- A = [0,5]
- B = [0,2]
- C = [16,5]
- D = [16,2]; D is initially a wall. It is included as an explicit edge goal and intentionally invalid as player_start.

Scan scope:

- Perimeter goals checked: 44; this includes initially open edge cells, selected wall-goal D, and every other perimeter wall cell as an explicit goal.
- Start/goal pairs checked: 176
- Max states per pair: 200000
- Max depth per pair: 180

Solved perimeter goals by selected start:

- A [0,5]: [0,2] (B), cost 13; [16,2] (D) [initial wall goal], cost 19; [0,5] (A), cost 10
- B [0,2]: [0,2] (B), cost 16; [16,2] (D) [initial wall goal], cost 22; [0,5] (A), cost 13
- C [16,5]: [0,2] (B), cost 19; [16,2] (D) [initial wall goal], cost 21; [0,5] (A), cost 18; [16,5] (C), cost 4
- D [16,2]: no solvable perimeter goals

Hard routing gates:

- selected_to_nonselected_solved: 0
- early_to_late_solved: 2
- early_to_C_or_D_solved: 2
- ABC_to_nonselected_solved: 0
- D_as_start_illegal_records: 44

D-wall note:

- D as start is illegal for every checked goal because the initial cell is a wall: `Level ICE_CAND_0025_v4_perimeter_16_2_to_0_0 player_start must initially be standable`. This is an intentional interface variant, not a legal start interface.

Graph diagnostic reading:

- graph_fact: A/B/C selected starts were scanned against all 44 perimeter coordinates, and D was also attempted as an explicit start. A solves only A/B, B solves no perimeter goal, C solves only C/D, D is illegal as start.
- neutral_meaning: the selected edge interfaces are separated into early-side A/B and late-side C/D access regions under this D-walled variant; no selected start reaches a non-selected perimeter coordinate, and no A/B start reaches C/D.
- player_facing_interpretation: a first-visit player entering from A/B cannot accidentally route into hidden right-side or stray boundary exits, while a revisit player from C can complete the hidden D-wall exit.
- verdict_effect: hard route isolation passes for A/B/C; D is explicitly treated as a wall-goal interface rather than a legal start interface.

Full machine-readable rows: `D:/Developer/sokoban/prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0025_v4_ABCD_D_walled.json`.
