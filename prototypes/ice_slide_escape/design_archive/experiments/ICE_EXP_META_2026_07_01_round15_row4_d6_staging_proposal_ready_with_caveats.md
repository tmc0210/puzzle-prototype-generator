# Experiment: ICE_EXP_META_2026_07_01_round15_row4_d6_staging

```yaml
experiment_id: ICE_EXP_META_2026_07_01_round15_row4_d6_staging_proposal_ready_with_caveats
prototype: ice_slide_escape
terminal_state: proposal_ready_with_caveats
candidate_id: ICE_CAND_0031
review_integrity: independent_review
archive_eligibility: human_pending
human_final_status: pending
required_action: none
```

## Goal

Continue after `ICE_CAND_0030`: recover a stronger d6-first meta route while
keeping the complete graph / routing evidence that round14 failed to close.

## Taste Context

Only human-comment-supported or human-corrected archive entries were used for
taste calibration:

```yaml
used:
  ICE_CAND_0020: "functional connector; not an acceptance floor"
  ICE_CAND_0022: "solid ecology case; useful but not the high-taste lower bound"
  ICE_CAND_0024: "target strong shared-space / shared-element meta reuse"
  ICE_CAND_0029: "negative calibration against accepting weak compact meta"
not_reused:
  - layout
  - geometry
  - causal_chain
  - routes
  - object_placement
  - entrance_exit_relation
```

## Proposal: ICE_CAND_0031

```text
##################
.......#########..
#.*...I.#..G.##..#
#....#.##..*...#.#
#....#G##......I.#
##*.I.#####..I...#
#.....#####.###..#
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

## Design Claim

```yaml
terminal_claim: >
  proposal_ready_with_caveats. v30 is a compact but evidence-complete d6-first
  meta candidate. It should be shown before ICE_CAND_0030 because it restores
  d6 as the first meta spatial unlock while preserving complete graph, routing,
  and required-event evidence.
player_insight: >
  Base reads the center as a d5(len1)+d4 left-to-right application. Meta rereads
  the same middle space from the right: a d6 push fills [6,4] and opens row4,
  then the returned solution stages a right-side ice horizontally before using
  [11,2] as a stopper to fill [11,3].
why_not_execution: >
  It is not just execution because the same targets change role across visits:
  [6,4] is filled locally in base but remotely by d6 in meta; [11,2] is a base
  d5+d4 landing target but becomes a meta landing target and returned-solution
  stopper. However, each individual flow is still a compact four-push chain, so
  this must remain caveated rather than claimed as a top-tier endgame capstone.
falsification:
  - "Downgrade if human review finds the meta too compact despite d6-first staging."
  - "Downgrade if the row4 d6 unlock feels like visible mechanism display rather than revisit insight."
  - "Do not claim exact returned push order or object identity as globally forced."
```

## Causal Chain

Base A -> B:

```yaml
claim_scope: "middle-late d5+d4 application / challenge"
returned_solution:
  - "[6,2] down -> [6,4] by d2, filling the central-left target."
  - "[2,2]* right -> d5(len1) through the middle wall, restart, d4 rebound to [11,2]."
  - "[2,5]* up -> d4 rebound refills [2,2]."
  - "[4,5] left -> returned-solution refill of [2,5]."
required_core:
  - ice_pass_through_d5
  - ice_rebound_d4
caveat: "Do not claim every base short-stop/refill detail is globally forced."
```

Meta C -> D:

```yaml
claim_scope: "4-push d6+staging+stopper later meta challenge"
returned_solution:
  - "[15,4] left -> d6(len2) destroys row4 wall group, restarts, and fills [6,4]."
  - "[13,5] left -> [11,5], staging the later filler."
  - "[11,3]* up -> [11,2], filling the target and creating a stopper."
  - "[11,5] up -> blocked by the [11,2] ice, stops at [11,3]."
required_core:
  - ice_destroy_group_d6_plus
  - ice_blocks_ice_no_chain_push
caveat: >
  The horizontal-then-vertical use of [13,5]/[11,5] is supported by returned
  solution snapshots as coordinate continuity. Because ice is indistinguishable,
  it is not an instance-ID proof and is not claimed as an all-winning-path order.
```

## Mechanism Scope

```yaml
central:
  - "[6,4]: base local vertical fill; meta remote d6 fill."
  - "[11,2]: base d5+d4 landing target; meta vertical landing target and returned-solution stopper."
  - "[11,3]: meta source target becomes a debt refilled by staged ice."
  - "[13,5]/[11,5]: returned-solution staging ice moves horizontally, then vertically."
support:
  - "row4 d6 unlock gives meta a different first read from base"
  - "right-side compaction closes the meta graph after round14's explosion"
  - "explicit A/B/C/D edge goals separate base and meta solve instances"
incidental:
  - "SCC remains branching_win_dag, not a forced linear script"
  - "graph size is evidence of enumeration completeness, not quality by itself"
```

## Evidence

Base:

```yaml
layout_analysis:
  md: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round15_v30_base.md
  json: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round15_v30_base.json
required_events:
  md: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round15_v30_base_required_core.md
  json: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round15_v30_base_required_core.json
solver:
  found: true
  cost: 42
  pushes: 4
graph:
  status: complete
  reachable_states: 334283
  winning_states: 1
scc:
  winSubgraphShape: branching_win_dag
  irreversible_steps: 4
  forcedWinPrefix: "0/4"
required_event_probe:
  required: [ice_pass_through_d5, ice_rebound_d4]
  missing_required_win_path: none
  search: complete
  explored: 473104
```

Meta:

```yaml
layout_analysis:
  md: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round15_v30_meta.md
  json: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round15_v30_meta.json
required_events:
  md: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round15_v30_meta_required_core.md
  json: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round15_v30_meta_required_core.json
solver:
  found: true
  cost: 36
  pushes: 4
graph:
  status: complete
  reachable_states: 15515
  winning_states: 1
scc:
  winSubgraphShape: branching_win_dag
  irreversible_steps: 4
  forcedWinPrefix: "0/4"
required_event_probe:
  required: [ice_destroy_group_d6_plus, ice_blocks_ice_no_chain_push]
  missing_required_win_path: none
  search: complete
  explored: 17546
```

Routing:

```yaml
method: "per-start complete reachable graph; collect edge cells where all targets are occupied"
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
  status: complete
  states: 15515
  selected_hits: [[17,1], [17,7]]
  non_selected_hits: []
D_start_[17,1]:
  status: complete
  states: 15515
  selected_hits: [[17,1], [17,7]]
  non_selected_hits: []
verdict: "passes hard routing gate; no ABCD -> non-ABCD edge win, no A/B -> C/D win"
```

Graph readings:

```yaml
base_scc:
  graph_fact: "complete graph; winSubgraphShape=branching_win_dag, irreversible steps=4, forcedWinPrefix=0/4"
  neutral_meaning: "base has win-reaching branches and merges; the returned solution is not a forced linear script"
  player_facing_interpretation: "the base should be judged as a d5+d4 application, not as a single-line execution lock"
  verdict_effect: "supports proposal with caveat; blocks overclaiming base depth"
meta_scc:
  graph_fact: "complete graph; winSubgraphShape=branching_win_dag, irreversible steps=4, forcedWinPrefix=0/4"
  neutral_meaning: "meta required events are unavoidable, but exact returned order / local staging is not globally proved"
  player_facing_interpretation: "the player must use d6 and an ice-stopper relation, but still has some win-reaching freedom"
  verdict_effect: "supports compact later-challenge status; blocks top-tier / forced-linearity claims"
routing:
  graph_fact: "all four ABCD start graphs complete and only reach their side's selected edge pair after target completion"
  neutral_meaning: "edge-goal routing is separated"
  player_facing_interpretation: "base and meta remain distinct interfaces without arbitrary edge leakage"
  verdict_effect: "passes the user-specified hard reachability gate"
```

## Exploration Log Summary

```yaml
v28:
  change: "removed the [15,4] source target debt / final refiller from round14"
  result: "meta graph complete at 3363 states but only 3 pushes"
  lesson: "round14 explosion was caused by the added right-side refiller, not the d6 corridor alone"
v29:
  change: "moved the refiller to [15,5] as a narrow vertical one-cell push"
  result: "meta solved with 4 pushes but graph still exhausted at 500001"
  lesson: "a separate source-debt refiller remains too branchy"
v30:
  change: "replace separate refiller with staged reuse: [13,5] left -> [11,5], then [11,5] up -> [11,3]"
  result: "base graph complete, meta graph complete, routing complete, required-event probes pass"
  lesson: "same-object coordinate staging can recover 4-push depth without graph explosion"
```

## Review Loop

```yaml
review_1:
  reviewer: Ptolemy
  review_integrity: independent_review
  recommendation: proposal_ready_with_caveats
  required_action: downgrade_claims
  major_attacks:
    - "Base is middle-late d5+d4 application/challenge, not deep base."
    - "Meta is a 4-push d6+staging+stopper later challenge, not top-tier endgame."
    - "Required probes prove event categories, not exact order, object identity, or all short-stop endpoints."
    - "Cross-time reuse is aesthetic value, not single-flow difficulty."
designer_action_1:
  closes_review_loop: false
  action: "downgraded base/meta claims and limited returned-solution staging to trace evidence"
review_2:
  reviewer: Ptolemy
  review_integrity: independent_review
  recommendation: proposal_ready_with_caveats
  required_action: none
  finding: "revised wording satisfies review_1 required_action"
```

## Verdict

`ICE_CAND_0031` should supersede `ICE_CAND_0030` as the proposal to show first.
It has the same clean evidence style, restores d6 as the first meta move, and
keeps stronger target / stopper role reassignment. It remains caveated because
both flows are compact four-push chains and SCC does not show forced linearity.
