# Experiment: ICE_EXP_META_2026_07_01_round14_row4_d6

```yaml
experiment_id: ICE_EXP_META_2026_07_01_round14_row4_d6_structural_redesign_needed
prototype: ice_slide_escape
terminal_state: structural_redesign_needed
candidate_id: none
review_integrity: missing
archive_eligibility: raw_run_only
human_final_status: pending
required_action: change_or_deepen_family
```

## Goal

Continue after `ICE_CAND_0030`. The previous proposal is evidence-clean but
caveated because its meta route uses `d5(len2)`, not d6. This round tried to
recover a stronger d6 meta route without returning to the old right-side graph
explosion.

## Taste Context

Same calibration as round13:

```yaml
used:
  ICE_CAND_0020: "functional connector only; not an acceptance floor"
  ICE_CAND_0022: "solid ecology case; not a high-taste lower bound"
  ICE_CAND_0024: "target strong cross-time space/element reuse"
  ICE_CAND_0029: "negative example for overaccepting weak meta"
not_reused:
  - layout
  - geometry
  - causal_chain
  - routes
  - object_placement
  - entrance_exit_relation
```

## Best Seed: v27

```text
##################
.......#########..
#.*...I.#..G.##..#
#....#.##..*...#.#
#....#G##......*.#
##*.I.#####I###..#
#.....#####.###I.#
.....######.......
##################
```

Interfaces:

```yaml
A: [0, 7]
B: [0, 1]
C: [17, 7]
D: [17, 1]
base_instance: A -> B
meta_instance: C -> D
```

## Design Idea

Unlike round13 / `ICE_CAND_0030`, the meta route does not first use the upper
right stopper target. It begins by using `[15,4]*` as a d6 projectile:

```yaml
intended_upgrade:
  - "base first fills [6,4] locally by pushing [6,2] down two cells"
  - "meta first pushes [15,4]* left with d6, destroying the row4 wall group and filling [6,4]"
  - "the d6 action opens the row4 corridor, allowing access to [11,4] only after the revisit move"
  - "meta then fills [11,2], uses [11,2] as stopper for [11,5] -> [11,3], and refills [15,4]"
```

This is aesthetically more aggressive than v22 because the first meta action is
the spatial unlock, not merely a different projectile length on the existing
upper row.

## Evidence

Base report:

```yaml
report:
  md: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round14_v27_base.md
  json: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round14_v27_base.json
solver:
  found: true
  cost: 42
  pushes: 4
push_events:
  - "step 13 down: push_ice, ice_stop_short:d2"
  - "step 21 right: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_rebound_d4"
  - "step 28 up: push_ice, ice_rebound_d4"
  - "step 34 left: push_ice, ice_stop_short:d2"
graph:
  status: complete
  reachable_states: 334283
  winning_states: 1
scc:
  winSubgraphShape: branching_win_dag
  irreversible_steps: 4
  forcedWinPrefix: "0/4"
```

Meta report:

```yaml
report:
  md: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round14_v27_meta.md
  json: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round14_v27_meta.json
solver:
  found: true
  cost: 40
  pushes: 4
push_events:
  - "step 5 left: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_stop_short:d1"
  - "step 10 up: push_ice, ice_stop_short:d1"
  - "step 26 up: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2"
  - "step 33 up: push_ice, ice_stop_short:d2"
graph:
  status: exhausted
  reachable_states_checked: 1000001
  winning_states_seen: 1
  reason: state budget exceeded
```

Routing probe:

```yaml
method: "custom per-start reachable graph; collect edge cells after all targets occupied"
A_start_[0,7]:
  status: complete
  states: 334283
  selected_hits: [[0,1], [0,7]]
  non_selected_hits: []
  AB_to_CD_bad: []
B_start_[0,1]:
  status: complete
  states: 334283
  selected_hits: [[0,1], [0,7]]
  non_selected_hits: []
  AB_to_CD_bad: []
C_start_[17,7]:
  status: exhausted
  states_checked: 500001
  selected_hits_seen: [[17,1], [17,7]]
  non_selected_hits_seen: []
D_start_[17,1]:
  status: exhausted
  states_checked: 500002
  selected_hits_seen: [[17,1], [17,7]]
  non_selected_hits_seen: []
```

Graph readings:

```yaml
meta_graph:
  graph_fact: "meta solver found a 4-push d6 route, but full graph exhausted at 1,000,001 states"
  neutral_meaning: "existence is proven, but bypass, complete routing, and SCC quality are unproven"
  player_facing_interpretation: "the first d6 action is promising as a revisit unlock, but the opened row4 corridor creates too many unresolved reachable states"
  verdict_effect: "blocks proposal_ready; keep as structural seed only"
routing:
  graph_fact: "A/B routing complete and clean; C/D routing exhausted at 500k while only selected C/D hits were observed"
  neutral_meaning: "no bad edge win was observed, but the required hard routing gate is not fully proved"
  player_facing_interpretation: "the map likely preserves interface separation, but this cannot be claimed as evidence-complete"
  verdict_effect: "do not submit to human as proposal"
```

## Exploration Log

```yaml
v23:
  layout_family: "v22 widened by one column"
  result: "base complete, meta d6 solved, meta graph exhausted at 800001"
  issue: "d6 regained but right-side state space still too large"
v24:
  change: "single-wall d6 instead of two-wall d6"
  result: "base complete, meta solved, graph still exhausted"
  issue: "state explosion was not caused only by group length"
v25:
  change: "move shared d6 to row4; base first target moved to [6,4]"
  result: "base complete unsolved"
  issue: "wall at [5,4] isolated the base refill stand [5,5]"
v26:
  change: "opened left lower access to [5,5]"
  result: "base solved, meta hand structure existed but source target [15,4] was not refilled"
  issue: "[15,6] up d4 rebounded to row3, missing the row4 target"
v27:
  change: "made row3 x15 a wall so [15,6] up stops by d2 at [15,4]"
  result: "base complete, meta solved, routing partially clean, meta graph exhausted"
  issue: "not evidence-complete; d6-opened corridor remains too branchy"
```

## Verdict

`v27` is a stronger structural seed than round13 in one respect: the meta route
starts with a d6 spatial unlock and then uses the newly opened corridor. However,
it fails the serious-candidate evidence bar because meta graph and C/D routing
do not close. No new proposal is submitted from round14.

Next attempt should either:

```yaml
preferred_next_directions:
  - "keep the row4 d6 unlock idea but remove one of the later right-side movable debts"
  - "find a way for d6 to unlock access without exposing a long pushable corridor"
  - "or change family rather than continuing to add constraints around the same row4 corridor"
```
