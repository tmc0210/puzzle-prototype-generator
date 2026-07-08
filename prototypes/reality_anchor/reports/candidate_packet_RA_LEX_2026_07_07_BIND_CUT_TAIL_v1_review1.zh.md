# Candidate Packet: RA_LEX_2026_07_07_BIND_CUT_TAIL_v1 / review_1

```yaml
candidate_version: RA_LEX_2026_07_07_BIND_CUT_TAIL_v1
review_iteration: review_1
prototype: reality_anchor
controller_note: >
  Fresh design. 本轮按用户要求使用 mechanism_lab/lexicon.md 的结构语料，
  未读取 mechanism_lab/runs。候选没有从 archive candidate 的布局、路线或因果链派生。
```

## prototype_context

```yaml
confirmed_rules:
  - "胜利条件是 all_targets_covered_by_objects；目标可由 crate、sticky 或 anchor 覆盖，玩家不算覆盖。"
  - "B/S anchor 划分 box side 与 sticky side；crate 到 sticky side 会 box_to_sticky，sticky 到 box side 会 sticky_to_box。"
  - "相邻 sticky 会 sticky_merge；sticky 连通块作为刚体移动。"
  - "任一刚体格被墙、边界或不可移动结构挡住时，整次动作失败。"
win_condition: all_targets_covered_by_objects
object_and_event_semantics:
  - "force_chain 表示同向推动多物体。"
  - "box_to_sticky / sticky_to_box 表示材料边界归一化。"
  - "sticky_merge 表示多个 sticky 来源合为刚体。"
  - "move_sticky_rigid 表示 sticky 刚体移动。"
tool_boundary:
  - "solver / analyzer / probe 只提供事实，不授予审美或难度通过。"
  - "完整图和 complete event probe 支撑 all-winning-path 事件 claim。"
```

## source_lexicon_combo

```yaml
lexicon_file: "prototypes/reality_anchor/mechanism_lab/lexicon.md"
selected_materials:
  - "B/S 绑定债：箱资源生成刚体 footprint"
  - "固定 B/S 切割：C+M 尾巴与单格目标袋"
  - "刚体黏块 + 墙口：反向施力格谱系 / 目标口消费"
how_used:
  - "先把两个普通箱沿 B/S 边界推进：第一步得到 C+M，第三次推进才生成 MM，并触发 sticky_merge。"
  - "下方绕行门只在生成 MM 后开放；玩家必须从右侧反推 MM，让固定材料边界切出 C+M。"
  - "单格上目标袋消费 C；右侧目标继续消费尾部 M 的刚体推进责任。"
not_used_as:
  - "没有复刻 lexicon witness 布局。"
  - "没有把 mechanism_lab/runs 作为设计输入。"
```

## slot_brief

```yaml
intended_role: "Reality Anchor 中后段 B/S application / compact challenge candidate"
known_before:
  - K_runtime_smoke
target:
  - "difficulty 至少 3，追求 4。"
  - "整体审美强 3 保底，追求 4。"
difficulty_or_support_expectation: "紧凑材料责任链；避免靠长腾挪或目标硬化增难。"
```

## mechanic_exposure_context

```yaml
mechanic_window: "Reality Anchor v0 current runtime rules"
allowed_exposure_through: "box_to_sticky, sticky_merge, sticky_to_box, sticky rigid movement, force_chain"
claimed_core_events:
  - force_chain
  - box_to_sticky
  - sticky_merge
  - sticky_to_box
  - move_sticky_rigid
score_claim_allowed: true
```

## solve_instance

```yaml
layout_file: "prototypes/reality_anchor/reports/RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_layout.txt"
player_start: [1, 1]
win_condition: all_targets_covered_by_objects
box_sticky_anchor:
  B: [4, 4]
  S: [5, 4]
goals:
  top_goal: [4, 1]
  tail_goal: [8, 2]
```

```text
##########
#@.#G#...#
#.CC....G#
####....##
#...BS...#
##########
```

Returned shortest solution:

```text
down right right right down right right right up left down left left up right right right
```

## mechanism_scope

```yaml
central:
  - "两个箱子必须先被推成 sticky 横条；只得到 C+M 时不能完成双目标。"
  - "sticky 横条必须从右侧反推回 B/S 边界，切成 C+M。"
  - "切出的 C 覆盖 top_goal，尾部 M 继续作为刚体推进覆盖 tail_goal。"
allowed_support:
  - "少量走位和同一 SCC 内 reposition。"
  - "B/S anchor 在可达图中可能被触碰；本候选不声明 anchor shift 不可达或所有胜路禁用 anchor shift。"
incidental_allowed:
  - "不声明唯一输入序列。"
  - "不声明对象实例级身份必要性；只声明事件组和状态责任。"
required_winning_path_events:
  - "force_chain"
  - "box_to_sticky"
  - "sticky_merge"
  - "sticky_to_box"
  - "move_sticky_rigid"
required_winning_path_counts:
  - "box_to_sticky >= 2"
required_order:
  - "sticky_merge must occur before any winning sticky_to_box route"
forbidden_winning_path_events: []
forbidden_if_seen_anywhere: []
```

## design_claim

```yaml
player_insight: >
  玩家不能满足于第一阶段的 C+M；必须继续把两个箱子过绑定阈值压成 MM，
  让 sticky_merge 产生可被右侧反推的横条。随后同一横条被切回 C+M：
  C 负责单格上目标，M 尾巴负责右侧目标。
causal_chain:
  - "初始只有左侧入口；前三次右推把 CC 依次变成 CC -> C+M -> MM。"
  - "只有 MM 生成后，玩家才能从下方通路绕到右侧反推。"
  - "反推 MM 触发 sticky_to_box，输出 C+M。"
  - "C 进入 top_goal 的单格袋；如果删除 top_goal，解法可直接把 MM 推到右目标，跳过切割。"
  - "M 尾巴继续推进到 tail_goal；如果删除 tail_goal，候选停在 top_goal 后即可胜利。"
why_not_execution: >
  难点不是长路线，而是同一材料横条的两次角色反转：先把两个可分配箱子牺牲成刚体，
  再把刚体切回可分配 C + 刚体 M，并且两个目标分别消费这两个输出。
falsification:
  - "若存在胜路缺少 sticky_merge、sticky_to_box、box_to_sticky 或 sticky rigid movement，则 claim 失败。"
  - "若存在 sticky_to_box 早于 sticky_merge 的胜路，则 claim 失败。"
  - "若任一目标删除后不降成本且不产生核心绕过，则目标责任不足。"
```

## evidence

```yaml
commands_run:
  - "npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_layout.txt --id RA_LEX_2026_07_07_BIND_CUT_TAIL_v1 --targets K_runtime_smoke --max-states 800000 --graph-max-states 800000 --write"
  - "npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_layout.txt RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_core5 800000 80 force_chain=force_chain box_to_sticky=box_to_sticky sticky_merge=sticky_merge sticky_to_box=sticky_to_box sticky_rigid=move_sticky_rigid"
  - "npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_layout.txt RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_box_to_sticky_min2 box_to_sticky 2 800000 80"
  - "npx tsx prototypes/reality_anchor/reports/probe_event_order.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_layout.txt RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_cut_before_merge sticky_to_box sticky_merge 800000 80"
  - "npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_layout.txt RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_bs_reachable_shift_scan box_sticky 800000 80 default"
  - "goal deletion counterfactuals via explain-layout + core5 probes for no_top_goal and no_tail_goal"
solver_result:
  shortest_cost: 17
  graph_status: complete
  reachable_states: 2654
  legal_transitions: 7018
  winning_states: 4
trace_summary:
  - "steps 2-4: CC -> C+M -> MM; step 4 includes box_to_sticky + sticky_merge."
  - "step 10: MM反推为 C+M，触发 sticky_to_box。"
  - "step 14: C 覆盖 top_goal。"
  - "steps 15-17: M 尾巴刚体推进覆盖 tail_goal。"
target_events:
  returned_events:
    - "force_chain:n2 x3"
    - "box_to_sticky:n1 x2"
    - "sticky_merge:n1 x1"
    - "sticky_to_box:n1 x1"
    - "move_sticky_rigid x5"
winning_path_event_checks:
  core5_probe:
    ref: "prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_core5.md"
    result: "combined complete; no winning bypass missing force_chain, box_to_sticky, sticky_merge, sticky_to_box, or sticky_rigid."
  box_to_sticky_count:
    ref: "prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_box_to_sticky_min2_box_to_sticky_min2.md"
    result: "complete; no win below two box_to_sticky events."
  order_probe:
    ref: "prototypes/reality_anchor/reports/order_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_cut_before_merge.md"
    result: "complete; no winning route with sticky_to_box before sticky_merge."
reachable_event_exposure:
  status: "not used for an exposure exclusion claim"
graph_or_counterfactual_evidence:
  full_analysis_ref: "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1.md"
  no_top_goal:
    layout_ref: "prototypes/reality_anchor/reports/RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_top_goal_layout.txt"
    analysis_ref: "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_top_goal.md"
    cost_delta: "17 -> 6"
    core_probe_ref: "prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_top_goal_core5.md"
    result: "缺 top_goal 后出现 6 步胜路，missing sticky_to_box；top_goal 保留切割责任。"
  no_tail_goal:
    layout_ref: "prototypes/reality_anchor/reports/RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_tail_goal_layout.txt"
    analysis_ref: "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_tail_goal.md"
    cost_delta: "17 -> 14"
    core_probe_ref: "prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_no_tail_goal_core5.md"
    result: "核心事件仍必经，但省掉尾部 M 最后三步刚体回填；tail_goal 保留尾部消费责任。"
evidence_limits:
  - "不声明唯一解。"
  - "不声明 B/S anchor shift 不可达；fixed-anchor scan `prototypes/reality_anchor/reports/fixed_anchor_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v1_bs_reachable_shift_scan.md` 显示 B/S shift 在可达图中存在。"
  - "不声明对象实例级身份必要性。"
  - "SCC 显示 opening 前三次推进较强收束；这是 critic 应攻击的玩家侧 caveat。"
```

## diagnostic_routing

```yaml
hard_evidence:
  ask_evidence_reviewer:
    - "核心事件组与 box_to_sticky>=2 是否由 complete probes 支持。"
    - "order claim 是否由 order probe 支持。"
    - "删目标反事实是否足以支持两个目标都有结构责任。"
mechanism_scope:
  ask_evidence_reviewer:
    - "是否存在 central claim 超出事件证据，例如 fixed-anchor 或对象身份过度声明。"
claim_hygiene:
  ask_both:
    - "不要把 solver pass 写成质量优点。"
taste_probes:
  ask_puzzle_critic:
    - "前三次推进是否过脚本化，导致难度只像执行教程。"
    - "右目标尾部推进是否只是 padding，还是有效消费 M 尾巴。"
scc_graph:
  graph_facts_to_route:
    - "graph complete; 2654 states / 7018 transitions."
    - "forced commitment prefix length 3; forced viable prefix length 3; forced optimal prefix length 8."
    - "initial SCC states=3, one viable progress commitment."
variant_family:
  status: "fresh; no archive variant authorization used."
start_position:
  status: "opening comfort caveat routed to critic; start has one walk before first irreversible push but initial SCC remains small."
prototype_specific_work:
  goal_prune_check:
    status: "kept"
    targets_checked:
      - target: [4, 1]
        action: keep
        reason: "deletion drops cost 17->6 and creates a win missing sticky_to_box."
      - target: [8, 2]
        action: keep
        reason: "deletion drops cost 17->14 by removing tail M consumer."
```

## prototype_specific_contracts

```yaml
interface_pair_policy:
  declared_interface_points: []
  target_pairs: []
  ignored_pair_classes: []
  risky_pair_classes: []
pair_diagnostics:
  ignored_pairs: []
  risky_pairs: []
```

## archive_lineage_policy

```yaml
default: fresh_required
authorized_archive_variant_work:
  enabled: false
  authorized_by: null
  candidate_ids: []
  allowed_operations: []
candidate_relation: fresh
why_not_archive_variant: >
  设计输入来自 lexicon 的结构接口：绑定债、固定边界切割、墙口/目标口消费。
  没有使用 clean archive 的布局、对象角色、解法路线或因果链作为起点。
```

## attempt_log

```yaml
serious_structural_attempts:
  - "single split-tail local witness: 可解但只有 5-7 步，像规则展示。"
  - "early C+M gate: solver 可在未 sticky_merge 前直接利用 C，绑定债未被消费。"
  - "final merge-gated version: 关闭上排提前通道，使 sticky_merge -> sticky_to_box 顺序成为全胜路必要。"
local_repairs:
  - "将 tail_goal 从上排移到同排右端，减少尾部路线税，cost 22 -> 17。"
abandoned_families:
  - "P/L + B/S 双锚组合暂未接入；本候选聚焦 B/S material responsibility。"
```

## archive_taste_context

```yaml
examples:
  - candidate_id: RA_CAND_0016
    source_candidate_version: RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3
    human_reviewed: true
    aesthetic_score: 3
    difficulty_score: 2
    human_comment: "强引导的黏块合并再切割教学"
    relevance: "B/S 合并再切割的可用下界；提醒本候选若过强引导，应谨慎标 3 而非 4。"
  - candidate_id: RA_CAND_0011
    source_candidate_version: RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 4
    human_comment: "箱子需要被推进目标再拉出需要较强反直觉洞见，在较小空间做出了紧凑的强逻辑关卡"
    relevance: "紧凑空间中的状态责任反转 4/4 正例；本候选目标是接近这种责任反转，但机制族不同。"
  - candidate_id: RA_CAND_0005
    source_candidate_version: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 4
    human_comment: "玩家侧矛盾明显，需要在推世界触及在拉世界的远目标，从而想到构造黏块+锚点的三格长链。结构有趣，机制利用率高，整体较好的挑战关。"
    relevance: "高分挑战正例强调清楚玩家侧矛盾与机制利用率；本候选不能仅用事件密度冒充这种矛盾。"
  - candidate_id: RA_CAND_0006
    source_candidate_version: RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1
    human_reviewed: true
    aesthetic_score: 2
    difficulty_score: 5
    human_comment: "已有 关卡的一个强复杂度的变体，用较小的目标位置改动极大地弱化机制美感并增加了腾挪难度，这种增加难度的方式实为较差的反例，仅做归档。"
    relevance: "负例：不能用目标位置和路线长度硬化来冒充机制美感。"
none_found_reason: null
```

## claim_last_review

```yaml
mode: not_used
facts_packet: null
claim_packet: null
read_order: not_applicable
```
