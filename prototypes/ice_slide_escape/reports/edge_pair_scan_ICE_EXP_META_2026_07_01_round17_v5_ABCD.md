# Edge Pair Scan: ICE_EXP_META_2026_07_01_round17_v5_ABCD

- Layout: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_01_round17_scratch_v5_layout.txt
- Method: per-start complete reachable-graph enumeration; records edge player cells after all targets are occupied.
- Starts: A=[0,2], B=[0,7], C=[16,7], D=[16,2]

| Start | Status | Reachable states | Target-complete edge hits | Non-ABCD hits | A/B -> C/D | C/D -> A/B |
| --- | --- | ---: | --- | --- | --- | --- |
| A [0,2] | complete | 571 | [0,2], [0,7] | none | none | none |
| B [0,7] | complete | 571 | [0,2], [0,7] | none | none | none |
| C [16,7] | complete | 7792 | [0,2], [0,7], [16,2], [16,7] | none | none | [0,2], [0,7] |
| D [16,2] | complete | 7792 | [0,2], [0,7], [16,2], [16,7] | none | none | [0,2], [0,7] |

```yaml
all_graphs_complete: true
ABCD_to_non_ABCD_solved: []
AB_to_CD_solved: []
CD_to_AB_solved_report_only:
  - "C->[0,2]"
  - "C->[0,7]"
  - "D->[0,2]"
  - "D->[0,7]"
```

Selected-pair shortest costs from the same runtime probe:

| Pair | Solved | Cost | Pushes | Notes |
| --- | --- | ---: | ---: | --- |
| C->A | yes | 47 | 6 | Same core event chain as C->D, shorter left-side exit after target completion. |
| C->B | yes | 52 | 6 | Same core event chain as C->D. |
| C->C | yes | 70 | 6 | Right-side self/return variant. |
| C->D | yes | 65 | 6 | Intended meta pair. |
| D->A | yes | 52 | 6 | Same core event chain as D->D, shorter left-side exit after target completion. |
| D->B | yes | 57 | 6 | Same core event chain as D->D. |
| D->C | yes | 75 | 6 | Right-side return variant. |
| D->D | yes | 70 | 6 | Intended D self-goal variant. |

Risk note: A/B do not leak to C/D and no non-ABCD edge is solved. C/D can reach A/B after target completion, and C->A/C->B are shorter than C->D. This is a report-only interface risk unless the current brief treats the right-side D exit as mandatory player-facing routing rather than a future-map preference.
