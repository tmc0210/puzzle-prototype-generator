# Edge Pair Scan: ICE_EXP_META_2026_07_02_round19_v6_ABCD

- Layout: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round19_fresh_v6_layout.txt
- Method: selected pair solves plus per-start edge-goal enumeration.
- Interfaces: A=[0,1], B=[0,2], C=[6,7], D=[7,5].

| Start | Solved edge goals | Non-interface hits | Cross-family hits |
| --- | --- | --- | --- |
| A [0,1] | [0,1], [0,2] | none | none |
| B [0,2] | [0,1], [0,2] | none | none |
| C [6,7] | [0,1], [0,2], [7,5], [6,7] | none | [0,1], [0,2] |
| D [7,5] | none | none | none |

```yaml
all_pair_solves_complete_under_budget: true
interface_points:
  A: [0, 1]
  B: [0, 2]
  C: [6, 7]
  D: [7, 5]
interface_to_non_interface_solved: []
AB_to_CD_solved: []
ignored_internal_reverse_pairs:
  - C->A
  - C->B
selected_interface_return_pairs_disclosed:
  - B->A
risky_internal_non_target_pairs_requiring_revision: []
```

Selected-pair shortest costs from the same runtime probe:

| Pair | Solved | Cost | Pushes | Event summary |
| --- | --- | ---: | ---: | --- |
| A->B | yes | 3 | 1 | push_ice, ice_rebound_d4 |
| A->C | no | n/a | n/a | none |
| A->D | no | n/a | n/a | none |
| B->A | yes | 3 | 1 | push_ice, ice_rebound_d4 |
| B->C | no | n/a | n/a | none |
| B->D | no | n/a | n/a | none |
| C->A | yes | 16 | 2 | push_ice, ice_destroyed_d3, ice_rebound_d4 |
| C->B | yes | 15 | 2 | push_ice, ice_destroyed_d3, ice_rebound_d4 |
| C->D | yes | 31 | 5 | push_ice, ice_destroyed_d3, ice_rebound_d4, ice_stop_short:d1 |
| D->A | no | n/a | n/a | none |
| D->B | no | n/a | n/a | none |
| D->C | no | n/a | n/a | none |

Risk note:

```text
v6 clears the blocking A/B->C/D internal non-target pairs and has no
non-interface edge completion. C->A/B remains solvable and is recorded under
the human correction / ignored reverse-pair policy with verdict_effect none.
B->A is disclosed as a same-base selected-interface return pair, following the
existing ICE_CAND_0022 / ICE_CAND_0024 archive scan convention; it is not the
blocking A/B->C/D class.
```
