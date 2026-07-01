# Candidate: ICE_CAND_0018

```yaml
candidate_id: ICE_CAND_0018
prototype: ice_slide_escape
experiment_id: ICE_EXP_003_2026_06_30_round11_static_dual_stopper_structural_redesign_needed
status: structural_redesign_needed
llm_candidate_strength: evidence_supported_but_critic_rejected
human_final_status: pending
archive_eligibility: human_pending
review_integrity: independent_review
motifs:
  - short_stop_d1_d2
  - d5_pass_through
  - d6_destroy_group
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - walled_edge_goal
  - all_mechanic_endgame
archive_use:
  - negative_example
  - critic_calibration
  - designer_calibration
strengths:
  - coupled_state_change
failure_modes:
  - forced_linearity
  - claim_underfit
human_comment_ids: []
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_30_round11_static_dual_stopper_structural_redesign_needed.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/trace_replay_ICE_CAND_0018_v3_static_c_dual_stopper.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0018_v3_static_c_dual_stopper.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0018_v3_precise_required_probe.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0018_v3_all_edge_starts.md
```

## Layout

Solve instance:

```yaml
player_start: [0, 9]
player_goal: [15, 2]
win_condition: ice_slide_escape_explicit_goal
```

```text
################
#.GG.##I.....I.#
#.#..#.*.......#
#..###...#######
#..###..########
#..###.I########
#..###..########
#..###.#########
#.I....#########
...#############
################
```

## Core Logic

```text
B 从 [2,8] 上推，经 d5/restart 落到 [2,1]，补第一个 target 并成为最终 A 的 stopper。
E 从 [7,5] 先借 D at [7,2] 作 stopper 停到 [7,3]。
D 右推 d6+ 牺牲并打开 [15,2] edge goal，同时清空 [7,2] target。
E 再借静态 C at [7,1] 作 stopper 落到 [7,2] target。
A 从 [13,1] 左推，经 C + 两个 wall 的 d5:len3/restart 后被 B 停在 [3,1] target。
```

## Review Loop

```yaml
review_1:
  target: ICE_CAND_0018_v3_static_c_dual_stopper
  evidence_reviewer:
    verdict: caveated_pass
    review_loop_state: proposal_ready_with_caveats
    required_action: preserve_event_family_caveat
    summary: >
      Evidence supports the declared [0,9]->[15,2] instance, 34-input 5-push
      returned trace, complete graph at 6962 states, 1 winning state, no
      winning path missing the declared required event families, and only
      [0,9] in the all-edge-start report. Caveat: object labels A/B/C/D/E are
      trace-level explanations; the tools prove event-family necessity, not
      object-level all-path uniqueness.
  design_critic:
    verdict: structural_redesign_needed
    review_loop_state: structural_redesign_needed
    required_action: change_structure_family
    summary: >
      The static C dual use and D's stopper-before-sacrifice timing are real
      improvements over 0017, and edge discipline is clean. Still, the puzzle
      reads as a short linear chain B -> E -> D -> E -> A. C is mostly a
      passive fixed structure, D/E remains local, and the final A push is a
      closure check rather than a nonlocal reinterpretation.
  loop_result: structural_redesign_needed
```

## Human Verdict

```yaml
human_comments: []
status: pending
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/reports/trace_replay_ICE_CAND_0018_v3_static_c_dual_stopper.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0018_v3_static_c_dual_stopper.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0018_v3_static_c_dual_stopper.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0018_v3_precise_required_probe.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0018_v3_precise_required_probe.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0018_v3_all_edge_starts.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0018_v3_all_edge_starts.json
```

## Retrieval Summary

```text
Independent-review structural-redesign-needed follow-up to ICE_CAND_0017.
Machine evidence is strong and compact: 34-input, 5-push trace; complete graph
at 6962 states; 1 winning state; no required-event-missing win; only [0,9] as
edge start. The useful design idea is static C dual use plus D serving E before
opening the goal. Critic rejects it because the player-facing structure still
reads as B -> E -> D -> E -> A, with C mostly passive and D/E still local.
```