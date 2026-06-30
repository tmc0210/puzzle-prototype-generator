# Candidate: ICE_CAND_0017

```yaml
candidate_id: ICE_CAND_0017
prototype: ice_slide_escape
experiment_id: ICE_EXP_003_2026_06_30_round10_c_dual_role_structural_redesign_needed
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
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_30_round10_c_dual_role_structural_redesign_needed.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/trace_replay_ICE_CAND_0017_v2_c_into_final_d5_group.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0017_v2_c_into_final_d5_group.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0017_v2_precise_required_probe.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0017_v2_all_edge_starts.md
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

## Core Logic

```text
初始 target 冰从 [2,1] 右推到 [4,1]，成为最终 A 左推 d5:len3 障碍组的一员。
B 从 [2,8] 上推，经 d5/restart 落到 [2,1]，补回目标并成为最终 A 的 stopper。
D 初始在 [7,2] target 上，右推 d6 牺牲自己并打开 [14,2] edge goal，同时清空目标。
E 从 [7,4] 上推，借 C 作 stopper 补回 [7,2]。
C 从 [7,1] 左推到 [6,1]，成为最终 A 的 d5:len3 障碍组材料。
A 从 [12,1] 左推穿过 C + wall + old target ice，restart 后被 B 停在 [3,1]，完成四目标覆盖。
```

## Review Loop

```yaml
review_1:
  target: ICE_CAND_0017_v2_c_into_final_d5_group
  evidence_reviewer:
    verdict: pass_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    summary: >
      Evidence supports the declared [0,9]->[14,2] instance, 55-input 6-push
      returned trace, complete high-budget graph at 227821 states, 1 winning
      state, and no winning path missing the declared required event families.
      Caveat: this proves event-family necessity plus returned trace, not
      object-level all-winning-path uniqueness.
  design_critic:
    verdict: not_proposal_ready_as_high_difficulty_candidate
    review_loop_state: structural_redesign_needed
    required_action: major_structural_redesign_and_rerun_evidence
    summary: >
      The C dual role is a real improvement over ICE_CAND_0016: C first serves
      E as stopper, then becomes final A's d5:len3 group material. Still, D/E
      mostly remains a right-side module that outputs one material token; the
      solve reads as initial target -> B -> D -> E -> C -> A. The opening target
      push is still naturally triggered, and the structure lacks a strong
      wrong-but-plausible local plan that must be overturned.
  loop_result: structural_redesign_needed
```

## Human Verdict

```yaml
human_comments: []
status: pending
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/reports/trace_replay_ICE_CAND_0017_v2_c_into_final_d5_group.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0017_v2_c_into_final_d5_group.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0017_v2_c_into_final_d5_group.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0017_v2_precise_required_probe.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0017_v2_precise_required_probe.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0017_v2_all_edge_starts.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0017_v2_all_edge_starts.json
```

## Retrieval Summary

```text
Independent-review structural-redesign-needed follow-up to ICE_CAND_0016.
Machine evidence is strong: 55-input, 6-push returned trace; complete required
probe at 227821 states; 1 winning state; only [0,9] as initial standable edge
start. The key improvement is C's dual role: it stops E, then becomes final A's
d5:len3 group material. Critic still rejects it as a linear chain where D/E
mostly outputs one material token and the opening target push remains naturally
triggered rather than a real player-facing reversal.
```
