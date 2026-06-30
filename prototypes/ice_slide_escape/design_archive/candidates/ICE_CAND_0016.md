# Candidate: ICE_CAND_0016

```yaml
candidate_id: ICE_CAND_0016
prototype: ice_slide_escape
experiment_id: ICE_EXP_003_2026_06_30_round9_b_gate_target_refill_structural_redesign_needed
status: structural_redesign_needed
llm_candidate_strength: evidence_supported_but_critic_rejected
human_final_status: pending
archive_eligibility: human_pending
review_integrity: independent_review
motifs:
  - short_stop_d1_d2
  - d5_pass_through
  - d6_destroy_group
  - destroy_moving_ice_d3
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - walled_edge_goal
  - all_knowledge_endgame
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
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_30_round9_b_gate_target_refill_structural_redesign_needed.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/trace_replay_ICE_CAND_0016_v8_b_gate_fixed.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0016_v8_b_gate_fixed.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0016_v8_precise_required_probe.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0016_v8_all_edge_starts.md
```

## Layout

Solve instance:

```yaml
player_start: [0, 9]
player_goal: [14, 2]
win_condition: ice_slide_escape_explicit_goal
```

```text
###############
#.*GG#.I...I..#
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

## Core Logic

```text
初始 target 冰从 [2,1] 右推到 [4,1]，成为最终 A 左推 d5 的保留障碍组成员。
B 从 [2,8] 上推，经 d5/restart 落到 [2,1]，补回目标并成为最终 A 的 stopper。
D 初始在 [7,2] target 上，右推 d6 牺牲自己并打开 [14,2] edge goal，同时清空目标。
E 从 [7,4] 上推，借 C 作 stopper 补回 [7,2]；之后 C 右推 d3 消失，保留 A 并打开 A 的右侧站位。
A 从 [11,1] 左推 d5 穿过墙和旧 target 冰，restart 后被 B 停在 [3,1]，完成四目标覆盖。
```

## Review Loop

```yaml
review_1:
  target: ICE_CAND_0016_v8_b_gate_fixed
  evidence_reviewer:
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    summary: >
      Evidence supports the 55-input returned solution, 6-push event chain, and
      required event-family necessity. The default layout graph is exhausted,
      but the required probe reran with 300000-state budgets and completed:
      112043 reachable states, 1 winning state, and no winning path missing the
      declared required events. Caveat: the evidence supports event-family
      necessity, not object-level all-winning-path uniqueness.
  design_critic:
    verdict: not_proposal_ready_as_high_difficulty_candidate
    review_loop_state: structural_redesign_needed
    required_action: major_structural_redesign_and_rerun_evidence
    summary: >
      Stronger than ICE_CAND_0015, with real C/E/A, B/A, and old-target/A
      couplings. Still not high-difficulty proposal-ready because the player
      structure reads as a longer linear key chain: target -> B -> D -> E ->
      C -> A. D/E remains a right-side local subproblem weakly bridged by C,
      and the opening target push still looks naturally triggered rather than
      a required conceptual reversal.
  loop_result: structural_redesign_needed
```

## Human Verdict

```yaml
human_comments: []
status: pending
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/reports/trace_replay_ICE_CAND_0016_v8_b_gate_fixed.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0016_v8_b_gate_fixed.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0016_v8_b_gate_fixed.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0016_v8_precise_required_probe.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0016_v8_precise_required_probe.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0016_v8_all_edge_starts.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0016_v8_all_edge_starts.json
```

## Retrieval Summary

```text
Independent-review structural-redesign-needed example after the human rejected
ICE_CAND_0015 for forced-linearity and nonexistent target-eject insight. This
version has strong machine evidence: a 55-input, 6-push trace, complete
required-event probe at 112043 states, 1 winning state, and only the declared
edge start passing. Critic still rejects it as a longer linear key chain:
target -> B -> D -> E -> C -> A. Useful calibration: strong required-event
evidence and several consumed state changes do not by themselves create a
high-difficulty player-facing insight.
```
