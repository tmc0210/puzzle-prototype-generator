# Final Submission: ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1

```yaml
candidate: ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1
prototype: ice_slide_escape
controller_decision: submit_qualified_candidate
final_review_loop_state: proposal_ready_with_caveats
proposal_ready: true
required_action: none
review_integrity: independent_review
pre_human_polish_pass:
  status: deferred_to_human
  layout_changed: false
  evidence_rerun_required: false
```

## 交付入口

```yaml
designer_action: prototypes/ice_slide_escape/reports/designer_action_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_review_1.md
candidate_packet_zh: prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1.zh.md
interface_static_seal_zh: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_edges.zh.md
pre_human_polish_pass: prototypes/ice_slide_escape/reports/pre_human_polish_pass_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1.md
```

## 独立评审

```yaml
evidence_review:
  file: prototypes/ice_slide_escape/reports/evidence_review_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_review_1.md
  verdict: supports_claim
  review_loop_state: proposal_ready
  required_action: none
puzzle_critic:
  file: prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_review_1.md
  verdict: supports_with_noncore_caveats
  review_loop_state: proposal_ready_with_caveats
  required_action: none
```

## 核心事实

```yaml
layout_file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_layout.txt
A: [0, 3]
B: [15, 0]
C: [15, 0]
D: [0, 3]
base: { start: [0, 3], goal: [15, 0], cost: 44 }
meta: { start: [15, 0], goal: [0, 3], cost: 42 }
targets_initially_with_ice: [[4, 3], [9, 3], [14, 3]]
extra_off_target_ice: [[4, 4], [9, 4]]
edge_floor_cells: [[15, 0], [0, 3]]
```

## 证据摘要

- base 与 meta 均有完整图证据，且各自只有 1 个 winning state。
- base 与 meta 的所有胜解均必经 `ice_rebound_d4` 和 `ice_destroy_group_d6_plus`。
- 静态封锁证明：只移除 extra ice 不打开通路；移除 target ice 会打开 20 步走廊。
- 本候选不 claim pre-d5；base 允许到 d6，并把 d6 作为最新可达知识的所有胜解必经责任。
- critic 支持稳定 4，不支持 5；caveat 是 extra support ice 与 `A=D` / `B=C` reset 接口。

## 提交口径

这是合格候选，可以提交给人类查看。描述时应写成“稳定 4、带 caveat”，不要写成 5 分候选；价值来自同一三 target 走廊的反向 target 债务与 d6 回返开路，而不是接口重合记号本身。
