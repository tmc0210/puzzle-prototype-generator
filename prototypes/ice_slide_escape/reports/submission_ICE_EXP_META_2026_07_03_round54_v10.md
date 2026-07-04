# 提交：ICE_EXP_META_2026_07_03_round54_v10

```yaml
prototype: ice_slide_escape
candidate_id: ICE_EXP_META_2026_07_03_round54_v10_two_target_late_reseal
status: proposal_ready_with_caveats
review_integrity: independent_review
archive_eligibility: human_pending
latest_evidence_review: { iteration: 2, verdict: supports_claim, required_action: none }
latest_puzzle_critic: { iteration: 1, verdict: supports_with_noncore_caveats, required_action: none, claim_last_review: true }
base_instance: { start: [0, 6], goal: [7, 0] }
meta_instance: { start: [10, 0], goal: [0, 10] }
aesthetic_claim: "meets 4 floor; not claimed as 5"
difficulty_claim:
  base: "around 2"
  meta: ">=3"
  combined: "both >=2 and meta satisfies >=3"
knowledge_claim:
  base: "d6-before window; no late reachable / no forbidden winning evidence"
  meta: "full knowledge; requires d5/restart/d6/d4 event pattern"
```

## 布局

```text
#######.##.##
#######.##I##
#######.##.##
#######.##.##
#######.##.##
#...#....#.##
..#.*....*.##
#...#.....###
######.##.###
######.##...#
.#..........#
#############
#############
```

接口：

- A = `[0,6]`
- B = `[7,0]`
- C = `[10,0]`
- D = `[0,10]`

## 核心 Claim

base A->B 是紧凑的 d4 借还流程：左目标冰先借右目标冰作阻挡向右移出，再被推回目标位后从 B 离开。它是 d6 前窗口内可用的低中难度流程，不依赖 d5 / restart / d6。

meta C->D 不是同构重复补位。右目标冰先被移开，打开通向下层资源的通道；上方普通冰通过 d5 / restart 形成下层产物；随后该产物经由已打开的通道触发 d6，破坏 D 门；最后右目标冰必须回封目标位。T2 因此同时承担目标门、通道许可和终局债务三重角色。

## 证据

- Candidate packet: `prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_03_round54_v10_review_2.zh.md`
- Facts packet: `prototypes/ice_slide_escape/reports/facts_packet_ICE_EXP_META_2026_07_03_round54_v10.zh.md`
- Claim packet: `prototypes/ice_slide_escape/reports/claim_packet_ICE_EXP_META_2026_07_03_round54_v10_review_2.zh.md`
- Layout: `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round54_v10_two_target_late_reseal_layout.txt`
- Base analysis: `prototypes/ice_slide_escape/reports/layout_analysis_round54_v10_base_explain.md`
- Base no-late scan: `prototypes/ice_slide_escape/reports/start_comparison_round54_v10_base_no_late.md`
- Base forbidden-winning scan: `prototypes/ice_slide_escape/reports/start_comparison_round54_v10_base_forbidden_winning.md`
- Meta analysis: `prototypes/ice_slide_escape/reports/layout_analysis_round54_v10_meta_explain.md`
- Meta required scan: `prototypes/ice_slide_escape/reports/start_comparison_round54_v10_meta_required_d5_d6_d4.md`
- Interface edge scan: `prototypes/ice_slide_escape/reports/round54_v10_edge_goal_scan.md`
- Evidence review 2: `prototypes/ice_slide_escape/reports/evidence_review_ICE_EXP_META_2026_07_03_round54_v10_review_2.md`
- Puzzle critic 1: `prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_03_round54_v10_review_1.md`

## 审查门

- Evidence review 2: `supports_claim`, `proposal_ready`, `required_action: none`。
- Puzzle critic 1: `supports_with_noncore_caveats`, `proposal_ready_with_caveats`, `required_action: none`。
- critic 的 `claim_last_review` 为 true：先独立读 facts / evidence / archive taste context，再读 claim packet；claim 加强但不改变最终 verdict。

## 机器事实摘要

```yaml
base:
  path: "A [0,6] -> B [7,0]"
  cost: 19
  graph: { status: complete, reachable_states: 847, winning_states: 1 }
  required_winning_events: [ice_rebound_d4]
  forbidden_late_reachable: none
  forbidden_late_winning: none
meta:
  path: "C [10,0] -> D [0,10]"
  cost: 34
  graph: { status: complete, reachable_states: 3040, winning_states: 1 }
  required_winning_events: [ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus, ice_rebound_d4]
interface:
  scanned_edge_goals: 48
  target_pairs: ["A->B", "C->D"]
  risky_pairs: 0
  ignored_internal_reverse: ["C->B cost 21; verdict_effect none"]
```

## 保留 Caveats

- 这版支持 4 分保底，但不应自评为 5。
- base 不应上读到 3；难度主张应主要由 meta 承担。
- hard evidence 不证明玩家实际 insight，也不证明所有胜解中的逐对象身份；这些只作为设计解释和 critic-facing hypothesis。
