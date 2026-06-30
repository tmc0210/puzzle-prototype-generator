# Experiment Run: ICE_EXP_003 round10 C dual role

```yaml
run_id: ICE_EXP_003_2026_06_30_round10_c_dual_role_structural_redesign_needed
experiment_id: ICE_EXP_003_all_knowledge_endgame_capstone
prototype: ice_slide_escape
terminal_state: structural_redesign_needed
structural_redesign_needed_candidates:
  - ICE_CAND_0017
review_integrity: independent_review
human_review: pending
```

## Context

本轮在 `ICE_CAND_0016` 的 critic 打回后继续：0016 的 D/E 仍像右侧局部子题。
新假设是让 C 不只服务 E 后被清掉，而是先作为 E 的 stopper，再被保留进最终 A
的 d5 障碍组，从而把右侧 D/E 和最终 A 直接耦合。

## Submitted Version

```yaml
candidate_version: ICE_CAND_0017_v2_c_into_final_d5_group
player_start: [0, 9]
player_goal: [14, 2]
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0017_scratch_v2_c_into_final_d5_group.txt
trace_ref: prototypes/ice_slide_escape/reports/trace_replay_ICE_CAND_0017_v2_c_into_final_d5_group.md
```

```text
###############
#.*GG#.I....I.#
#.#..#.*......#
#..###...######
#..###.I#######
#..###..#######
#..###.########
#..###.########
#.I....########
...############
###############
```

## Evidence

```yaml
layout_analysis:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0017_v2_c_into_final_d5_group.md
  result: default_graph_exhausted
  note: >
    Default 100000-state layout analysis did not find the solution; complete
    graph evidence comes from the high-budget start comparison probes.
required_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0017_v2_precise_required_probe.md
  result: pass
  graph_status: complete
  reachable_states: 227821
  winning_states: 1
  missing_required_win: not_found_complete_search
all_edge_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0017_v2_all_edge_starts.md
  result: pass
  checked_edge_starts:
    - [0, 9]
```

## Review Loop

```yaml
review_1:
  candidate_version_reviewed: ICE_CAND_0017_v2_c_into_final_d5_group
  evidence_reviewer:
    verdict: pass_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    summary: >
      Evidence supports the declared [0,9]->[14,2] instance, returned 55-input
      6-push trace, complete high-budget graph, 1 winning state, and no winning
      path missing the declared required event families. Caveat: evidence
      supports event-family necessity plus returned trace, not object-level
      all-winning-path uniqueness.
  design_critic:
    verdict: not_proposal_ready_as_high_difficulty_candidate
    review_loop_state: structural_redesign_needed
    required_action: major_structural_redesign_and_rerun_evidence
    summary: >
      0017 improves 0016 because C is preserved into final A's d5:len3 obstacle
      group after serving E. However D/E remains mostly a right-side module
      that outputs a material token. The solve still reads as a linear chain:
      initial target -> B -> D -> E -> C -> A. C's dual role is mechanically
      real but not enough to create a nonlocal player insight or a strong
      wrong-but-plausible plan that must be overturned.
  loop_result: structural_redesign_needed
```

## Terminal Notes

Do not continue this family by merely adding another mechanism or target. The
next design should require bidirectional constraints: the later A/B/old-target
state must constrain D/E timing or C preservation, and D/E should not merely
produce one material token for final A.
