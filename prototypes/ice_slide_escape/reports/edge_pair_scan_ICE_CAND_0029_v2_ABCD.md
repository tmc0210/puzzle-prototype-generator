# ICE_CAND_0029_v2 edge pair scan: ABCD

Layout source: `prototypes/ice_slide_escape/reports/ICE_CAND_0029_v2_coupled_vertical_debt_layout.txt`

```text
#################
......###########
#...#.###########
#..#G.*.....*.###
#...*.######*.###
#.....######..###
#...I.######I....
......######.....
#################
```

Interfaces:

- A = [0,7]
- B = [0,1]
- C = [16,7]
- D = [16,6]

Scan scope:

- Perimeter goals checked: 48
- Selected starts checked: 4
- Max states per selected-start graph: 1,000,000
- Max depth: 200

Solved perimeter goals by selected start:

- A [0,7]: [0,1] (B), cost 22; [0,7] (A), cost 18
- B [0,1]: [0,1] (B), cost 24; [0,7] (A), cost 20
- C [16,7]: [16,6] (D), cost 23; [16,7] (C), cost 24
- D [16,6]: [16,6] (D), cost 22; [16,7] (C), cost 23

Hard routing gates:

- selected_to_nonselected_solved: 0
- early_to_late_solved: 0
- ABCD_to_nonselected_solved: 0

Graph diagnostic reading:

- graph_fact: A/B/C/D selected starts were each enumerated once against all 48 perimeter coordinates; A and B solve only A/B, while C and D solve only C/D.
- neutral_meaning: the selected interfaces are separated into early-side and late-side perimeter solve regions, with no selected start reaching a non-selected perimeter goal.
- player_facing_interpretation: first-visit A/B cannot complete targets and leak into the revisit side; revisit C/D remains a right-side interface.
- verdict_effect: hard route isolation passes.

