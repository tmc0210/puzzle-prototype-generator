# Meta Probe: ICE_CAND_0012_deeper_redesign_attempts

## Context

Human review accepted `ICE_CAND_0012` as a flawed positive example and noted
that the level likely has meta creative space. The first follow-up only opened
one top cell and was judged too light. This report records a heavier meta pass:
multiple structural hypotheses plus a bounded interface-neighborhood scan.

Accepted base reference:

```yaml
base_start: [0, 7]
base_goal: [14, 1]
```

```text
####..#########
####.I.I......#
####..#######.#
####..#######.#
####..#######.#
####..#######.#
#.....#######.#
..I..G.######.#
#.....#######.#
####GG.....I..#
###############
```

## Attempt A: Right-Lower E-First Interface

Hypothesis:

```text
Open the lower-right edge so the meta instance can start near E. In the base,
E is the final d5 target-covering ice; in meta, try to make E an early d6
route-opening resource instead.
```

Variant:

```text
####..#########
####.I.I......#
####..#######.#
####..#######.#
####..#######.#
####..#######.#
#.....#######.#
..I..G.######.#
#.....#######.#
####GG.....I...
###############
```

Reports:

```text
prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_meta_E_first_right_entry_base.md
prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_meta_E_first_right_entry_meta.md
```

Result:

```yaml
base_pair:
  pair: "[0,7] -> [14,1]"
  result: pass
  graph: "complete, states=11845, wins=1"
  solution_scc: "one_win_continuation_per_scc, forced=4/4"
meta_pair:
  pair: "[14,9] -> [0,7]"
  result: fail_unsolved
  graph: "complete, states=7223, wins=0"
classification: failed_role_reassignment
```

Reading:

```text
graph_fact -> opening the lower-right interface preserves the base but the
right-lower meta pair is unsolved.
neutral_meaning -> E cannot simply be reassigned from final d5 cover to early
d6 opener without adding a replacement way to cover the lower-left target.
player_facing_interpretation -> this is a real role-reassignment idea, but it
breaks the target resource economy.
verdict_effect -> useful negative direction; future E-first meta needs a new
late T3 cover resource or a different lower target contract.
```

## Attempt B: Split Top Pocket With Shifted Base Chain

Hypothesis:

```text
Move the base B/T chain left by one column and put a wall between the base top
route and a new top meta pocket. The base should still do a double-d5 chain,
while top start [6,0] can reach C first for d6-first meta ordering.
```

Variant:

```text
####.#.########
####I#.I......#
####.########.#
####.########.#
####.########.#
####.########.#
#....########.#
.I..G.#######.#
#....########.#
###GG.....I...#
###############
```

Reports:

```text
prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_meta_split_top_pocket_base.md
prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_meta_split_top_pocket_meta.md
```

Result:

```yaml
base_pair:
  pair: "[0,7] -> [14,1]"
  result: fail_unsolved
  graph: "complete, states=959, wins=0"
meta_pair:
  pair: "[6,0] -> [0,7]"
  result: fail_unsolved
  graph: "complete, states=412, wins=0"
classification: over_separated_structure
```

Reading:

```text
graph_fact -> the split-pocket redesign makes both the base pair and meta pair
unsolved in complete search.
neutral_meaning -> static separation can prevent base pollution, but it also
cuts the base off from the C d6 push and cuts meta off from the target-cover
resources.
player_facing_interpretation -> the idea is structurally meaningful, but it
needs a later reconnection gate; a plain wall split is too blunt.
verdict_effect -> use this as a serious failed meta redesign attempt, not as a
candidate variant.
```

## Attempt C: Interface-Neighborhood Scan

Purpose:

```text
Check whether a light-to-medium edge/interface edit can create a clean
d6-before-d4 meta reading while preserving the accepted base and not giving the
base its own d6-before-d4 win.
```

Search scope:

```yaml
base_layout: ICE_CAND_0012_v4_base
mutations_checked: 55
mutation_size: 1_or_2_cell_toggles
toggle_cells:
  - [6,0]
  - [7,0]
  - [8,0]
  - [14,1]
  - [14,9]
  - [0,8]
  - [6,2]
  - [6,6]
  - [6,8]
  - [12,9]
meta_pairs_checked:
  - "[6,0] -> [0,7]"
  - "[14,1] -> [0,7]"
  - "[14,9] -> [0,7]"
  - "[0,8] -> [14,1]"
filters:
  - base "[0,7] -> [14,1]" solvable
  - base covers d4/d5/restart/d6 event families
  - meta pair solvable and covers d4/d5/restart/d6 event families
  - meta has a d6-before-d4 winning path
  - preferred clean hit: base has no d6-before-d4 winning path
```

Summary:

```json
{
  "checked": 55,
  "baseKept": 36,
  "metaD6FirstHits": 8,
  "cleanHits": 0
}
```

Hit digest:

```yaml
hits:
  - cells: [[6,0]]
    pair: top6_to_left
    baseCost: 42
    metaCost: 71
    metaD6FirstDepth: 75
    baseD6First: true
  - cells: [[6,0],[7,0]]
    pair: top6_to_left
    baseD6First: true
  - cells: [[6,0],[8,0]]
    pair: top6_to_left
    baseD6First: true
  - cells: [[6,0],[14,9]]
    pair: top6_to_left
    baseD6First: true
  - cells: [[6,0],[0,8]]
    pair: top6_to_left
    baseD6First: true
  - cells: [[6,0],[0,8]]
    pair: left8_to_right
    baseD6First: true
  - cells: [[6,0],[6,2]]
    pair: top6_to_left
    baseD6First: true
  - cells: [[0,8],[6,2]]
    pair: left8_to_right
    baseD6First: true
```

Reading:

```text
graph_fact -> within the checked interface-neighborhood, every d6-before-d4
meta hit also gives the base a d6-before-d4 winning path.
neutral_meaning -> the C-side early access needed for meta is not naturally
separated from the base route by small edge/interface edits.
player_facing_interpretation -> the accepted base and the desired d6-first meta
reading compete for the same C access, so a clean meta will need a stronger
structural gate or a relocated responsibility chain.
verdict_effect -> confirms that the first light probe was insufficient and that
future meta work should be a dedicated redesign, not another edge-opening pass.
```

## Overall Conclusion

```yaml
meta_status: deeper_attempt_recorded
current_candidate_replacement: none
best_signal: >
  D6-first meta ordering exists as soon as C-side access is opened, and it is a
  genuinely different ordering idea.
main_blocker: >
  Cleanly separating that C-side access from the accepted base is nontrivial.
  Small edge/interface edits either replay the same chain, fail to solve, or
  give the base a d6-first branch.
recommended_next_meta_direction: >
  Treat meta as a separate redesign pass. Use either a dynamic reconnection
  gate after the base's first d5, or relocate the base B/T chain so the base
  can still reach C later while the meta can reach C first. Do not expect a
  clean result from one-cell interface openings.
```
