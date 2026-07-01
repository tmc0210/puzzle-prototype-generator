# Candidate: ICE_CAND_0014

```yaml
candidate_id: ICE_CAND_0014
prototype: ice_slide_escape
experiment_id: ICE_EXP_003_2026_06_30_round7_aggressive_8_push_trace_supported
status: held_proposal
llm_candidate_strength: held_proposal
human_final_status: pending
archive_eligibility: human_pending
review_integrity: independent_review
motifs:
  - d4_rebound
  - d5_pass_through
  - d6_destroy_group
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - walled_edge_goal
  - all_mechanic_endgame
archive_use:
  - critic_calibration
  - designer_calibration
human_comment_ids: []
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_30_round7_aggressive_8_push_trace_supported.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/trace_replay_ICE_CAND_0014_v7_temp_stopper_open_k.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0014_v7_temp_stopper_open_k.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0014_v7_required_probe.md
```

## Layout

Solve instance:

```yaml
player_start: [0, 9]
player_goal: [14, 3]
win_condition: ice_slide_escape_explicit_goal
```

```text
###############
#.GGG#......I.#
###GG.#.....I.#
##....I.......#
##.I.########.#
##.G..........#
##...########.#
##...########.#
##III########.#
@.............#
###############
```

## Core Logic

```text
这是一次按人类新指令转向的激进高难候选：不再优化可读性、误触或路线长度，
只追求关键逻辑链强度。

核心链有 8 次 push。B d5 先覆盖 [2,1] 并成为 C 的 stopper；C d6 破 [5,1]
后用 B 停在 [3,1]；D 用 C 停在 [3,2]；E d5 穿 [6,2] 后用 D 停在 [4,2]；
F d5 使用 E 作为 obstacle group 并停在 [4,1]。随后 H 被反直觉地先向左推，
d4 反弹到 [3,3] 成为临时 stopper；K 再用 H d4 反弹到 [3,5] 覆盖新增
target；最后 H 被从临时位置向右牺牲，d6 破坏 [14,3] 显式边缘终点墙。

该候选的正向价值是长程状态复用和临时资源牺牲。证据边界也很硬：runtime
replay 证明存在 124 输入、8 push 的胜利 trace；标准完整图和 required-event
探针都超预算，因此不能声称无 bypass 或所有胜利路径都覆盖该链。
```

## Human Verdict

```yaml
human_comments: []
status: pending
```

## Review Loop

```yaml
review_1:
  target: ICE_CAND_0014_v7_temp_stopper_open_k
  evidence_reviewer:
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: keep_limited_trace_supported_claim
    summary: >
      Evidence supports the limited claim: a runtime-validated 124-input,
      8-push winning trace exists; the trace contains the stated cascade and
      temporary-stopper chain. Exhausted analyzer/probe results must not be
      described as no-bypass or all-winning-path proof.
  design_critic:
    verdict: held_proposal
    review_loop_state: held_proposal
    required_action: strengthen_machine_evidence
    summary: >
      The 8-push structure and H-left/K-up/H-right temporary-stopper sequence
      are real strengths, but current evidence only proves existence of this
      trace. It does not prove that the 8-push chain is forced, that no lower
      push bypass exists, or that the H/K/H segment is mandatory.
  loop_result: held_proposal
```
## Evidence Refs

```text
- prototypes/ice_slide_escape/reports/trace_replay_ICE_CAND_0014_v7_temp_stopper_open_k.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0014_v7_temp_stopper_open_k.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0014_v7_temp_stopper_open_k.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0014_v7_required_probe.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0014_v7_required_probe.json
```

## Retrieval Summary

```text
Human-pending held proposal created after the human explicitly rejected
low-difficulty three-step chains and allowed unlimited difficulty, misdirection,
counterintuitive actions, and walking. ICE_CAND_0014 v7 has an 8-push
trace-supported chain: B->C->D->E->F target/stopper cascade, then H-left creates
a temporary stopper, K uses it by d4 rebound, and H-right sacrifices it to open
the explicit edge goal. Initial standable edge cells are limited to [0,9].
Not proposal-ready because complete graph and required-event probes exhausted,
so bypass exclusion is unknown. Independent critic review holds it rather than passing it until no-low-push-bypass or all-winning-path evidence is stronger.
```
