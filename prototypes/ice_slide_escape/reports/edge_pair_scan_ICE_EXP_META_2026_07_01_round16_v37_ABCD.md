# Edge Pair Scan: ICE_EXP_META_2026_07_01_round16_v37_ABCD

- Layout: ICE_EXP_META_2026_07_01_round16_v37
- Method: per-start complete reachable-graph enumeration; records edge player cells after all targets are occupied.
- Starts: A=[0,7], B=[0,1], C=[17,7], D=[17,1]
- Edge goals checked per start: 50
- ABCD -> non-ABCD solved: none
- A/B -> C/D solved: none
- C/D -> A/B solved: none

| Start | Reachable states | Target-complete edge hits | Non-ABCD hits | A/B -> C/D | C/D -> A/B |
| --- | ---: | --- | --- | --- | --- |
| A [0,7] | 214594 | [0,1], [0,7] | none | none | n/a |
| B [0,1] | 214594 | [0,1], [0,7] | none | none | n/a |
| C [17,7] | 15515 | [17,1], [17,7] | none | n/a | none |
| D [17,1] | 15515 | [17,1], [17,7] | none | n/a | none |

Hard routing gates:

```yaml
all_graphs_complete: true
ABCD_to_non_ABCD_solved: []
AB_to_CD_solved: []
CD_to_AB_solved_report_only: []
```

Graph reading:

```yaml
routing:
  graph_fact: "all four ABCD start graphs complete; target-complete edge hits are restricted to the corresponding side pair"
  neutral_meaning: "after all targets are occupied, no selected start can realize an unintended edge-goal cell"
  player_facing_interpretation: "base and meta remain separated as interface instances; solving A/B cannot leak into C/D, and no arbitrary edge acts as a hidden exit"
  verdict_effect: "hard routing gate passes"
```
