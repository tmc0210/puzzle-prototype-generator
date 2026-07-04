# 提交：ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2

```yaml
prototype: ice_slide_escape
candidate_id: ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2
status: proposal_ready_with_caveats
review_integrity: independent_review
latest_evidence_review: { iteration: 1, verdict: supports_with_caveats, required_action: none }
latest_puzzle_critic: { iteration: 1, verdict: supports_with_caveats, required_action: none }
base_instance: { start: [0, 6], goal: [23, 6] }
meta_instance: { start: [23, 6], goal: [0, 6] }
aesthetic_claim: "low but defensible 4; not 5"
difficulty_claim:
  base: ">=2; 2+ to low 3"
  meta: "around 3"
  combined: "both >=2 and meta satisfies >=3"
knowledge_claim:
  base: "d6-before window; complete reachable scan has no d5/restart/d6 hits"
  meta: "full-knowledge allowance; returned solution uses d3/d4"
```

## 布局

```text
########################
########################
########################
########################
#######..########..#####
######...I...###.......#
....#.*....#..#.*....#..
###....######....#######
#####..########..#######
#####..########..#######
#####..########..#######
#####.#########.########
#####..########..#######
########################
```

## 核心 Claim

同一两处锁位 `[6,6]`、`[16,6]` 在两个 solve instance 中被改读：base 从左到右以水平借还处理，meta 从右到左以竖向借还处理。v2 的关键修补是普通冰 `[9,5]`：它在两条流程中作为连接段牺牲物被 d3 清理，把两个锁之间的通行变成状态转折，而不是连续执行两个同构 d4 门。

审美按低位 4 提交：强于 `ICE_CAND_0037` 式重复 target-door 串接，但弱于 `ICE_CAND_0035` 式标杆级回访角色反转。

## 证据

- Candidate packet: `prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2.zh.md`
- Layout: `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_layout.txt`
- Interface edge scan: `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_interface_edges.md`
- Base analysis: `prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_base.md`
- Meta analysis: `prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_meta.md`
- Base no-late scan: `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_base_no_late.md`
- Meta required d4 scan: `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_meta_required.md`
- Interface goal A scan: `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_interface_goal_A.md`
- Interface goal B scan: `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_interface_goal_B.md`
- Evidence review: `prototypes/ice_slide_escape/reports/evidence_review_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_review_1.md`
- Puzzle critic: `prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_review_1.md`

## 审查门

- Evidence review 1: `supports_with_caveats`, `proposal_ready_with_caveats`, `required_action: none`.
- Puzzle critic 1: `supports_with_caveats`, `proposal_ready_with_caveats`, `required_action: none`.

## 机器事实摘要

```yaml
base:
  cost: 39
  returned_events: { walk: 34, push_ice: 5, ice_rebound_d4: 4, ice_destroyed_d3: 1 }
  graph: { status: complete, reachable_states: 5111, winning_states: 1 }
  required_d4: true
  forbidden_reachable_d5_restart_d6: none
meta:
  cost: 47
  returned_events: { walk: 42, push_ice: 5, ice_rebound_d4: 4, ice_destroyed_d3: 1 }
  graph: { status: complete, reachable_states: 7119, winning_states: 2 }
  required_d4: true
interface:
  edge_floor_cells: [[0, 6], [23, 6]]
  unexpected_edge_floor_cells: []
  target_pairs:
    - "A->B cost 39"
    - "C->D cost 47"
  ignored_self_pairs:
    - "[0,6]->[0,6] cost 0"
    - "[23,6]->[23,6] cost 0"
```

## 保留 Caveats

- `[9,5]` 的 d3 连接牺牲由返回解与图上下文支撑；当前没有 all-solution coordinate/object detector 证明所有胜解都以同坐标、同顺序执行它。
- 同锁位角色变化是返回解坐标和 key snapshot 事实，不是逐对象身份证明。
- target-door 亲缘关系仍明显；v2 依靠轴向改读、顺序反转和连接 d3 状态转折守住低位 4，不上探 5。
- base 不应描述为强 3；保守表述为 `>=2`、`2+ 到低 3`。meta 更稳约 3。
