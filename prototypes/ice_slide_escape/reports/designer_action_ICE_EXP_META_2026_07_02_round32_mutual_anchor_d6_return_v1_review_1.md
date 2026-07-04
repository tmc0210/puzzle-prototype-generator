# Designer Action: ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1 Review 1

```yaml
candidate: ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1
prototype: ice_slide_escape
review_iteration: 1
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
controller_decision: submit_qualified_candidate
final_review_loop_state: proposal_ready_with_caveats
proposal_ready: true
```

## 提交候选

```text
###############.##
###############.##
#...###########.##
..#.*....*....*.##
####I....I....####
##################
##################
##################
```

```yaml
A: [0, 3]
B: [15, 0]
C: [15, 0]
D: [0, 3]
base: { start: [0, 3], goal: [15, 0], cost: 44 }
meta: { start: [15, 0], goal: [0, 3], cost: 42 }
targets_initially_with_ice:
  - [4, 3]
  - [9, 3]
  - [14, 3]
extra_off_target_ice:
  - [4, 4]
  - [9, 4]
```

## 接受事实

- 每个 target 初始都有冰；两个非 target 冰块已明确声明为规则允许的支撑材料。
- 静态封锁成立：初始 A->B / B->A 纯走路均不可达；只移除额外冰仍不可达；移除 target 冰会打开 20 步走廊。
- 边缘接口干净：可站立边缘格只有 `[0,3]` 和 `[15,0]`。
- base A->B 可解，cost 44，完整图 `10315` states / `1` win。
- meta C->D 可解，cost 42，完整图 `10296` states / `1` win。
- base 与 meta 的所有胜解都必须使用 `ice_rebound_d4` 和 `ice_destroy_group_d6_plus`；单项与组合 required 探针均为完整搜索未找到 bypass。
- base 本轮不 claim pre-d5；它允许到 d6，并把 d6 作为最新可达知识的必经责任。

## 质量判定

最终按 `proposal_ready_with_caveats` 提交。critic 支持稳定 4，但不支持 5。

本候选跨过 round29 review_4 的原因是：回程不再依赖分离 lower lane 或单纯端点复用，而是在同一条三 target 走廊里反向借债、偿还、移动支撑冰，并用 d6 开边。base 和 meta 共用三枚 target 锚点；左右外锚 active/passive 互换，中间 target 是共同债务锚。

保留 caveat：

- 不要把它描述为 5 分候选。非 target 支撑冰和 reset-pair 接口使它低于强 5 分 return transformation。
- 不要把 `A=D` / `B=C` 记号本身当作价值来源。价值来自同一三锚点走廊的反向债务与 d6 回返开路。
- base 应描述为 `>=3`，不要夸成稳定 4；meta 承担至少一条 `>=4` 的难度责任。
- 提交文案必须明确：target ice 封路，row-4 extra ice 只是辅助 d6 材料。

## 权威材料

```yaml
candidate_packet_zh: prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1.zh.md
interface_static_seal_zh: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_interface_edges.zh.md
layout_file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_layout.txt
base_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base.md
meta_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta.md
base_required_latest: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base_required_latest.md
meta_required_latest: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta_required_latest.md
evidence_review: prototypes/ice_slide_escape/reports/evidence_review_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_review_1.md
puzzle_critic: prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_review_1.md
```
