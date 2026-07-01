# Edge Pair Scan: ICE_EXP_META_2026_07_01_round18_v4_ABCD

- Layout: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_01_round18_fresh_v4_layout.txt
- Method: per-start complete reachable-graph enumeration; records edge player cells after all targets are occupied.
- Interfaces: A=[0,1], B=[0,2], C=[7,5], D=[0,5].

| Start | Status | Reachable states | Target-complete edge hits | Non-interface hits | Cross-family hits |
| --- | --- | ---: | --- | --- | --- |
| A [0,1] | complete | 5051 | [0,1], [0,2], [0,5], [7,5] | none | [0,5], [7,5] |
| B [0,2] | complete | 5051 | [0,1], [0,2], [0,5], [7,5] | none | [0,5], [7,5] |
| C [7,5] | complete | 1711 | [0,1], [0,2], [0,5], [7,5] | none | [0,1], [0,2] |
| D [0,5] | complete | 5051 | [0,1], [0,2], [0,5], [7,5] | none | [0,1], [0,2] |

```yaml
all_graphs_complete: true
interface_points:
  A: [0, 1]
  B: [0, 2]
  C: [7, 5]
  D: [0, 5]
interface_to_non_interface_solved: []
AB_to_CD_solved: ["A->[0,5]", "A->[7,5]", "B->[0,5]", "B->[7,5]"]
CD_to_AB_solved_report_only: ["C->[0,1]", "C->[0,2]", "D->[0,1]", "D->[0,2]"]
```

Selected-pair shortest costs from the same runtime probe:

| Pair | Solved | Cost | Pushes | Event summary |
| --- | --- | ---: | ---: | --- |
| A->B | yes | 3 | 1 | walk, push_ice, ice_rebound_d4 |
| A->C | yes | 37 | 5 | walk, push_ice, ice_stop_short, ice_rebound_d4, ice_boundary_disappear |
| A->D | yes | 40 | 4 | walk, push_ice, ice_stop_short, ice_rebound_d4 |
| B->A | yes | 3 | 1 | push_ice, ice_rebound_d4, walk |
| B->C | yes | 38 | 5 | walk, push_ice, ice_stop_short, ice_rebound_d4, ice_boundary_disappear |
| B->D | yes | 41 | 4 | walk, push_ice, ice_stop_short, ice_rebound_d4 |
| C->A | yes | 15 | 2 | push_ice, ice_destroyed_d3, walk, ice_rebound_d4 |
| C->B | yes | 14 | 2 | push_ice, ice_destroyed_d3, walk, ice_rebound_d4 |
| C->D | yes | 33 | 5 | push_ice, ice_destroyed_d3, walk, ice_rebound_d4 |
| D->A | yes | 16 | 1 | walk, push_ice, ice_rebound_d4 |
| D->B | yes | 15 | 1 | walk, push_ice, ice_rebound_d4 |
| D->C | yes | 31 | 5 | walk, push_ice, ice_stop_short, ice_rebound_d4, ice_boundary_disappear |

Risk note: v4 has no non-interface edge completion. A/B can complete to D/C and C/D can complete to A/B; these are internal interface pairs and should be reviewed for reading salience rather than treated as external leaks.
