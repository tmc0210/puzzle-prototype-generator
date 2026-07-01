# Edge Pair Scan: ICE_EXP_META_2026_07_01_round17_v7_ABCD

- Layout: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_01_round17_scratch_v7_layout.txt
- Method: per-start complete reachable-graph enumeration; records edge player cells after all targets are occupied.
- Interfaces: A/D=[0,2] (shared return/start), B=[0,7], C=[16,7]. The former right-top D=[16,2] from v5 is sealed as wall in v7.

| Start | Status | Reachable states | Target-complete edge hits | Non-interface hits | Cross-family hits |
| --- | --- | ---: | --- | --- | --- |
| A/D [0,2] | complete | 571 | [0,2], [0,7] | none | none |
| B [0,7] | complete | 571 | [0,2], [0,7] | none | none |
| C [16,7] | complete | 10985 | [0,2], [0,7], [16,7] | none | [0,2], [0,7] |

```yaml
all_graphs_complete: true
interface_points:
  A: [0, 2]
  B: [0, 7]
  C: [16, 7]
  D: [0, 2]  # shared with A in v7
interface_to_non_interface_solved: []
left_family_to_C_solved: []
C_to_left_family_solved_report_only: ["C->[0,2]", "C->[0,7]"]
```

Selected-pair shortest costs from the same runtime probe:

| Pair | Solved | Cost | Pushes | Notes |
| --- | --- | ---: | ---: | --- |
| A/D->B | yes | 23 | 2 | Base-family route. |
| A/D->C | no | n/a | n/a | search complete |
| B->A/D | yes | 17 | 2 | Reachability variant; not an intended player-facing pair. |
| B->C | no | n/a | n/a | search complete |
| C->A/D | yes | 47 | 6 | Full meta chain; exits into left return family. |
| C->B | yes | 52 | 6 | Full meta chain; exits into left return family. |

Risk note: v7 has no non-interface edge completion and no left-family completion into C. C can intentionally return to both left exits after completing targets; the claimed meta route uses C->A/D as the shortest/natural return, so this is no longer an unintended shorter bypass, but D=A is a visible interface-design caveat.
