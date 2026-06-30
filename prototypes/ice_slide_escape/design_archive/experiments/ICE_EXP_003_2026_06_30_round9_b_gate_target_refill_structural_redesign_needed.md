# Experiment Run: ICE_EXP_003 round9 B-gated target refill

```yaml
run_id: ICE_EXP_003_2026_06_30_round9_b_gate_target_refill_structural_redesign_needed
experiment_id: ICE_EXP_003_all_knowledge_endgame_capstone
prototype: ice_slide_escape
terminal_state: structural_redesign_needed
structural_redesign_needed_candidates:
  - ICE_CAND_0016
review_integrity: independent_review
human_review: pending
```

## Context

本轮回应 `ICE_CAND_0015` 的人类评语：不要把“唯一通路自然触发”误称为洞见，
不要用更长钥匙串替代真正的非局部逻辑。目标是让 target 破坏/补位、d5 保留、
d6 开口、C 的双重角色和最终 target 覆盖形成更强耦合。

## Attempt Summary

```yaml
attempts:
  - id: ICE_CAND_0016_v1_choice_target_eject
    result: abandoned
    reason: >
      开放观察区后 solver 找到 2-push bypass，跳过 target-eject/B/C。
  - id: ICE_CAND_0016_v2_d5_preserved_target_group
    result: component_validated
    reason: >
      初始 target 冰被推出后保留为最终 d5 障碍组成员；完整图和 required probe
      通过，但仍只有 4 push，更像结构部件而非高难候选。
  - id: ICE_CAND_0016_v3_goal_wall_d6_gate
    result: component_validated
    reason: >
      加入 D 的 d6 开 explicit goal，形成 5 push 链；required / edge 证据通过，
      但 D 仍像局部开门钥匙。
  - id: ICE_CAND_0016_v4_to_v7_d6_target_refill
    result: repaired_until_v8
    reason: >
      尝试让 D 作为 target ice 牺牲、E 借 C 补位。v4-v6 可手工 replay 或有结构
      价值，但开放推点导致图爆；v7 封闭过度造成无解。
  - id: ICE_CAND_0016_v8_b_gate_fixed
    result: reviewed_structural_redesign_needed
    reason: >
      B gate 修复后完整 required probe 通过，6 push 链成立；independent critic
      仍判为更长的线性钥匙串，D/E 与左侧主谜耦合不足。
```

## Submitted Version

```yaml
candidate_version: ICE_CAND_0016_v8_b_gate_fixed
player_start: [0, 9]
player_goal: [14, 2]
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0016_scratch_v8_b_gate_fixed.txt
trace_ref: prototypes/ice_slide_escape/reports/trace_replay_ICE_CAND_0016_v8_b_gate_fixed.md
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

## Evidence

```yaml
layout_analysis:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0016_v8_b_gate_fixed.md
  result: found_solution_but_default_graph_exhausted
  cost: 55
  push_count: 6
  default_graph_status: exhausted
required_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0016_v8_precise_required_probe.md
  result: pass
  graph_status: complete
  reachable_states: 112043
  winning_states: 1
  missing_required_win: not_found_complete_search
all_edge_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0016_v8_all_edge_starts.md
  result: pass
  checked_passing_edge_starts:
    - [0, 9]
```

## Review Loop

```yaml
review_1:
  candidate_version_reviewed: ICE_CAND_0016_v8_b_gate_fixed
  evidence_reviewer:
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: none
    summary: >
      Evidence supports the 55-input returned solution, 6-push event chain, and
      required event-family necessity. The default layout graph is exhausted,
      but the required probe reran with 300000-state budgets and completed.
      Caveat: evidence proves event-family necessity, not object-level
      all-winning-path uniqueness.
  design_critic:
    verdict: not_proposal_ready_as_high_difficulty_candidate
    review_loop_state: structural_redesign_needed
    required_action: major_structural_redesign_and_rerun_evidence
    summary: >
      The version is stronger than ICE_CAND_0015 and contains real couplings:
      old target ice is consumed by final A, B is both target refill and final
      stopper, D clears a target and opens the goal, E uses C as stopper, and C
      later clears for A. However the player-facing structure still reads as a
      longer linear key chain: target -> B -> D -> E -> C -> A. D/E remains a
      right-side local subproblem weakly bridged by C, and the initial target
      push still looks naturally triggered rather than a required conceptual
      reversal.
  loop_result: structural_redesign_needed
```

## Terminal Notes

本轮不提交 proposal-ready。`ICE_CAND_0016` 应作为 machine-evidence-strong but
critic-rejected calibration：required 证据能证明没有明显 bypass，却不能证明玩家
洞见真实；下一轮应让 D/E 直接改变最终 A 的 d5 group、B 的可用性或 stopper 结构，
而不是只负责开出口和补局部 target。
