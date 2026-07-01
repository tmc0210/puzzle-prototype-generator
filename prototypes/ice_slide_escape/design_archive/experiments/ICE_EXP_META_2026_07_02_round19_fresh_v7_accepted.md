# Experiment: ICE_EXP_META_2026_07_02_round19_fresh_v7

```yaml
experiment_id: ICE_EXP_META_2026_07_02_round19_fresh_v7_accepted
prototype: ice_slide_escape
terminal_state: accepted
candidate_id: ICE_CAND_0033
review_integrity: human_review
archive_eligibility: clean_archive
human_final_status: accepted
required_action: none
```

## 目标

本轮目标是制作 `meta_first_design` 候选：base 流程为 2 或 2+，可用知识不超过
d5 且建议 d4；meta 流程默认可用全部知识，目标 4 或 4+；整体审美目标 4，
追求 5。后续人类定位修正为：不强求 base/meta 之间存在新增知识差，核心趣味
可以来自同一结构在回访目标改变后的重读。

## 候选

```text
#.#######
#.....I.#
..I..G.##
#####.###
##....#.#
##.#..#I.
##...I..#
#######.#
```

Interfaces:

```yaml
A: [1, 0]
B: [0, 2]
C: [7, 7]
D: [8, 5]
base_instance: A -> B
meta_instance: C -> D
```

## 设计结论

```yaml
terminal_claim: >
  accepted. v7 保留了 round19_v6 的核心趣味，并通过小幅扩边将 A/B 入口改为
  不相邻。base 是一次简单 d4 rebound；meta 在同一核心冰上形成三次 d4 回访，
  让玩家从“刚做过的一推 d4”转为“还要到 D，旧答案不够”的重新组织。
player_insight: >
  价值不在知识升级，而在目标改变后的轻误导和轻反转。玩家最初把局部读成一推
  d4 即可，回访时发现通往 D 的路线和 target 状态需要继续处理同一冰。
why_accepted: >
  人类 review 明确给出允许归档、审美 5、难度 2，并指出这种没有新增知识差的
  小误导结构值得借鉴。
```

## 证据摘要

```yaml
base:
  report: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_base.md
  result: solved
  cost: 5
  pushes: 1
  required_core: ice_rebound_d4
  graph: "complete, states=651, transitions=1618, wins=4"
  d5_cap_gate: pass
  forbidden_reachable_d6: none
meta:
  report: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_meta.md
  result: solved
  cost: 31
  pushes: 5
  events:
    ice_destroyed_d3: 1
    ice_rebound_d4: 3
    ice_stop_short_d1: 1
  graph: "complete, states=1070, transitions=2620, wins=2"
identity_coverage:
  report: prototypes/ice_slide_escape/reports/identity_coverage_probe_ICE_EXP_META_2026_07_02_round19_v7.md
  base_all_winning_paths_use_core_rebound_ice_d4: true
  meta_all_winning_paths_use_core_rebound_ice_three_d4_plus_d3: true
  search_status: complete
routing:
  all_edge_goal_scan: prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round19_v7_ABCD.md
  AB_to_CD_solved: []
  non_interface_edge_completion: none
  wall_edge_goals_solved: none
  ignored_reverse_pairs:
    - C->A
    - C->B
```

## 人类复审

```yaml
human_review_ref: prototypes/ice_slide_escape/reports/human_review_ICE_EXP_META_2026_07_02_round19_v7.md
human_comments:
  - id: HC_ICE_CAND_0033_001
    author: human_designer
    status: accepted
    aesthetic_score: 5
    difficulty_score: 2
    text: >
      这关的结构非常有趣：初见只需一次简单d4 用于打开通路，回访时则有一个
      有趣的心路历程 “这关我刚做过，只用一次d4->不对，我是要去D，怎么路
      被堵了？-> 哦还能继续做”。在 meta 流程没有比base新增知识的前提下，
      这一关做出了非常有趣的小误导、小反转，值得借鉴。
```

## 流程状态

```yaml
process_integrity:
  design_packet: present
  tool_evidence: present
  evidence_reviewer_artifact: not_applicable
  puzzle_critic_artifact: not_applicable
  designer_actions_after_review: not_needed
  post_revision_evidence_rerun: present
  latest_review_iteration: human_review_1
  latest_candidate_version_reviewed: ICE_EXP_META_2026_07_02_round19_v7
  open_required_action_after_latest_review: none
  designer_action_after_latest_review: not_needed
  review_after_designer_action: not_needed
  review_integrity: human_review
  review_loop_state: accepted
  unresolved_core_attacks: []
  archive_eligibility: clean_archive
```

## 归档备注

本候选与 `ICE_CAND_0004` 的差异不是 d4 次数本身，而是人类认可的回访心路：
base 的一次 d4 先建立“这关很简单”的旧读法，meta 再用目标 D 和路线堵塞把同一
结构翻成三次 d4 的小反转。它是低难度高审美参考，不应被误检索为高难 meta。

