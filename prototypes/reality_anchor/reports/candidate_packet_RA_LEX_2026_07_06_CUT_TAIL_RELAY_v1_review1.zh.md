# Candidate Packet: RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1 / review_1

```yaml
candidate_version: RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1
review_iteration: review_1
prototype: reality_anchor
controller_note: >
  本候选为 fresh design。设计前读取了 mechanism_lab/lexicon.md 与 clean human-reviewed
  archive 校准；未读取 mechanism_lab/runs。本 packet 用于 independent evidence reviewer
  与 puzzle critic，不是归档通过结论。
```

## prototype_context

```yaml
confirmed_rules:
  - "Reality Anchor 是网格 Sokoban-like 原型，胜利条件为 all_targets_covered_by_objects。"
  - "B/S 是 box/sticky material boundary；本候选中 B/S 为固定墙袋边界，不声明可移动锚点。"
  - "普通箱进入 sticky side 会触发 box_to_sticky；sticky 跨回 box side 会触发 sticky_to_box。"
  - "相邻 sticky 会合并；连通 sticky 作为刚体移动时产生 move_sticky_rigid。"
win_condition: "all_targets_covered_by_objects"
object_and_event_semantics:
  - "C/crate 可被推动并覆盖目标。"
  - "M/sticky 可形成刚体；sticky 刚体可覆盖目标。"
  - "目标 overlay 不改变碰撞；删除目标只改变胜利约束。"
tool_boundary:
  - "solver / analyzer / graph / probes 只提供事实，不授予质量结论。"
  - "完整图 complete 时可用于 all-winning-path 事件必要性；超预算时必须标 unknown。"
  - "本轮未使用 mechanism_lab/runs 作为设计或证据来源。"
```

## slot_brief

```yaml
intended_role: "Reality Anchor 后段挑战候选"
known_before:
  - K_runtime_smoke
target:
  - "至少 difficulty 4，追求更高。"
  - "整体审美 4 分保底，追求 4~5 分。"
difficulty_or_support_expectation: "challenge；不使用提示目标作为通过借口。"
```

## mechanic_exposure_context

```yaml
mechanic_window:
  - "fixed B/S material boundary"
  - "box_to_sticky"
  - "sticky_to_box"
  - "sticky rigid movement"
  - "post-cut crate push"
allowed_exposure_through:
  - "all_current_reality_anchor_runtime_rules"
claimed_core_events:
  - box_to_sticky
  - move_sticky_rigid
  - sticky_to_box
  - "push_object:crate#1|push_object:crate#2|push_object:crate#3"
not_claimed:
  - "不声明 sticky_merge 为所有胜路必经；它只出现在 returned trace 与部分路线中。"
  - "不声明首次 sticky_to_box 必须晚于首次 box_to_sticky；order probe 已找到反例胜路。"
  - "不声明唯一解、唯一对象身份、固定输入序列或固定终局。"
```

## design_target

```yaml
aesthetic_score_target: "4+，目标是强机制链与可读玩家矛盾，不靠路程硬堆。"
difficulty_score_target: "4+，追求后段资源转换/切割/回收组合推理。"
target_role_notes:
  - "玩家侧洞见应是：先把普通箱转成 sticky 尾债，再切回普通箱资源。"
  - "两个下层目标应强迫保留 sticky 尾巴；上目标应强迫切出的 crate 继续被消费。"
```

## solve_instance

```yaml
layout_file: "prototypes/reality_anchor/reports/RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_layout.txt"
player_start: [3, 6]
player_goal: null
win_condition: all_targets_covered_by_objects
objects:
  fixed_boundary:
    B: [1, 2]
    S: [1, 3]
  crates:
    - [3, 2]
  sticky:
    - [3, 4]
    - [3, 5]
  goals:
    top_crate_goal: [7, 2]
    mid_tail_goal: [5, 3]
    low_tail_goal: [5, 4]
```

```text
#########
#.......#
#B#C...G#
#S#..G.##
##.M.G.##
##.M...##
#..@...##
#########
```

## mechanism_scope

```yaml
central:
  - "初始两格 sticky 先作为竖向尾债移动，给下层两个目标和 B/S 切割列建立形状约束。"
  - "普通箱必须被推入 sticky side，触发 box_to_sticky，成为 sticky 系统的一部分。"
  - "sticky 刚体随后被推到切割位置；sticky_to_box 回收出可单独推动的 crate。"
  - "回收 crate 之后仍必须继续推箱，最终覆盖上方远目标。"
allowed_support:
  - "玩家走位与少量 reposition。"
  - "returned trace 中出现 sticky_merge 作为局部 payoff。"
incidental_allowed:
  - "存在不同胜路的事件顺序差异。"
required_winning_path_events:
  - "box_to_sticky"
  - "move_sticky_rigid"
  - "sticky_to_box"
  - "至少一次 push_object:crate#1/#2/#3"
forbidden_winning_path_events:
  - "winning path 缺少任一 required group。"
  - "发生 sticky_to_box 后不再有 crate push 的 winning path。"
forbidden_if_seen_anywhere: []
```

## design_claim

```yaml
player_insight:
  - "玩家不能把 crate 当作一次性上目标资源；它必须先进入 sticky 材料债，再被切回普通箱。"
  - "下层两个目标让 sticky 尾巴有保留价值：只追求切箱会破坏尾部覆盖。"
  - "sticky_to_box 不是终局动画，而是把资源释放出来给最后的 crate push。"
causal_chain:
  - "前段：移动竖向 sticky 尾债，建立下层覆盖与切割形状。"
  - "中段：推动 crate 进入 sticky side，触发 box_to_sticky。"
  - "后段：把 sticky 刚体推回 B/S 切割边界，触发 sticky_to_box。"
  - "终段：切出的 crate 在 box side 继续右推，覆盖上目标。"
why_not_execution:
  - "all-solution core probe 证明 box_to_sticky、move_sticky_rigid、sticky_to_box 和 crate_push 都无 winning bypass。"
  - "post-cut probe 证明不存在 sticky_to_box 后不再 push crate 的胜路。"
  - "目标删除反事实显示三个目标分别阻断了不同弱化：上目标阻断无转换短解；两个尾部目标阻断不把 crate 纳入 sticky 的路线。"
falsification:
  - "若 reviewer 找到缺少任一 required group 的胜路，核心 claim 失败。"
  - "若 reviewer 找到 sticky_to_box 后无后续 crate push 的胜路，回收资源 claim 失败。"
  - "若 critic 判断主要难度来自开放空间长走位，而非切割尾债/资源回收，应降级或重做。"
  - "若目标删除后成本不降且核心事件仍全胜路必经，应删除该目标后重审。"
```

## evidence

```yaml
commands_run:
  - "npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_layout.txt --id RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1 --targets K_runtime_smoke --max-states 500000 --graph-max-states 500000 --write"
  - "npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_layout.txt RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_core_anycrate 500000 140 \"box_to_sticky=box_to_sticky\" \"sticky_rigid_move=move_sticky_rigid\" \"sticky_to_box=sticky_to_box\" \"crate_push=push_object:crate#1|push_object:crate#2|push_object:crate#3\""
  - "npx tsx prototypes/reality_anchor/reports/probe_event_order.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_layout.txt RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_cut_before_box_to_sticky sticky_to_box box_to_sticky 500000 140"
  - "npx tsx prototypes/reality_anchor/reports/probe_post_cut_crate_push.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_layout.txt RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_post_cut_crate_push 500000 140"
  - "对 no_top_goal / no_mid_tail_goal / no_low_tail_goal 分别运行 explain-layout、core_anycrate event probe 与原 trace replay。"
solver_result:
  found: true
  cost: 25
  depth: 25
  explored_states: 37585
  inputs: "up left up right up right up up left down down down left down right right down right up left up up up right right"
trace_summary:
  returned_solution_event_counts:
    push_object_sticky_1: 8
    move_sticky_rigid: 8
    walk: 14
    push_object_crate_1: 3
    box_to_sticky_n1: 1
    sticky_merge_n1: 1
    sticky_to_box_n1: 1
  key_consumption:
    - "returned trace 中 crate push 触发 box_to_sticky。"
    - "returned trace 中 sticky 刚体多次移动并出现一次 sticky_merge。"
    - "returned trace 中 sticky_to_box 后还有两次 push_object:crate#1，完成上目标。"
target_events:
  - "K_runtime_smoke 通过；该 target 不包含质量 verdict。"
object_or_instance_evidence:
  - "layout analyzer 未报告 instance-level object participation；packet 不声明对象身份级唯一必要性。"
winning_path_event_checks:
  core_anycrate:
    artifact: "prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_core_anycrate.md"
    combined: "Found bypass=false, status=complete, exploredStates=176540"
    individual:
      box_to_sticky: "Found bypass=false, status=complete, exploredStates=169163"
      sticky_rigid_move: "Found bypass=false, status=complete, exploredStates=141793"
      sticky_to_box: "Found bypass=false, status=complete, exploredStates=149027"
      crate_push: "Found bypass=false, status=complete, exploredStates=143493"
  post_cut_crate_push:
    artifact: "prototypes/reality_anchor/reports/post_cut_crate_push_probe_RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_post_cut_crate_push.md"
    result: "Found bypass=false, status=complete, exploredStates=170856"
  order_probe_limit:
    artifact: "prototypes/reality_anchor/reports/order_probe_RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_cut_before_box_to_sticky.md"
    result: "Found violation win=true, status=found, depth=27"
    consequence: "不得声明首次 sticky_to_box 必须晚于首次 box_to_sticky。"
reachable_event_exposure:
  - "未做单独 reachable scan；本 packet 只依赖 winning-path probes 与 analyzer snapshots。"
graph_or_counterfactual_evidence:
  main_graph:
    artifact: "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1.md"
    status: complete
    reachable_states: 141651
    legal_transitions: 426226
    winning_states: 29
  agency:
    compressed_regions: 4961
    initial_commitments: 6
    viable_commitments: 4
    dead_commitments: 2
    progress_commitments: 1
    optimal_commitments: 1
  scc:
    shape: "sccs=610, edges=2268, winReachable=2, winning=1, winSubgraph=one_win_continuation_per_scc"
    solution_irreversible_path: "steps=1, forcedWinPrefix=1/1"
    handoff_scriptiness: "scripted=0/1"
  goal_prune_check:
    status: clean
    removed_targets: []
    retained_targets:
      - [7, 2]
      - [5, 3]
      - [5, 4]
    targets_checked:
      - target: [7, 2]
        action: keep
        reason: "删除上目标后最短解 25->5，且出现缺少 box_to_sticky、sticky_to_box、crate_push 的 winning bypass。"
        graph_status: complete
        expected_trace_win: true
        evidence_refs:
          - "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_top_goal.md"
          - "prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_top_goal_core_anycrate.md"
          - "prototypes/reality_anchor/reports/trace_RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_top_goal_replay_original.md"
      - target: [5, 3]
        action: keep
        reason: "删除 mid_tail 目标后最短解 25->15，且出现缺少 box_to_sticky 的 winning bypass。"
        graph_status: complete
        expected_trace_win: true
        evidence_refs:
          - "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_mid_tail_goal.md"
          - "prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_mid_tail_goal_core_anycrate.md"
          - "prototypes/reality_anchor/reports/trace_RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_mid_tail_goal_replay_original.md"
      - target: [5, 4]
        action: keep
        reason: "删除 low_tail 目标后最短解 25->13，且出现缺少 box_to_sticky 的 winning bypass。"
        graph_status: complete
        expected_trace_win: true
        evidence_refs:
          - "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_low_tail_goal.md"
          - "prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_low_tail_goal_core_anycrate.md"
          - "prototypes/reality_anchor/reports/trace_RA_LEX_2026_07_06_CUT_TAIL_RELAY_v1_no_low_tail_goal_replay_original.md"
evidence_limits:
  - "不声明 sticky_merge all-solution 必经。"
  - "不声明固定顺序；order probe 找到 sticky_to_box 先于 box_to_sticky 的胜路。"
  - "不声明唯一解、唯一终局或对象身份级必要性。"
  - "difficulty / aesthetic 仍需 puzzle critic 按 human archive anchors 攻击。"
```

## diagnostic_routing

```yaml
hard_evidence:
  - "请 evidence reviewer 严格检查 event probe 参数与完整性，特别是 crate_push group 使用 #1/#2/#3 备选。"
  - "请确认 order_probe_violation 已被降为 evidence_limit，而不是仍在 claim 中偷偷保留。"
  - "请检查 invalid_goal_prune 三个目标的删除反事实是否满足 Reality Anchor 专属流程。"
mechanism_scope:
  - "中心 claim 是 box_to_sticky + sticky rigid + sticky_to_box + post-cut crate push 的尾债接力。"
  - "sticky_merge 只能作为 returned trace 局部 payoff；若 packet 其他处把它写成 required，请判 revise_claim。"
claim_hygiene:
  - "禁止把 graph / SCC facts 解释为质量 pass。"
  - "禁止根据 ID-specific crate object identity 推出对象身份 claim。"
taste_probes:
  - "请 puzzle critic 主攻：是否只是 RA_CAND_0013 的切割 witness 拉长版？"
  - "请主攻：是否接近 RA_CAND_0006 的路线/目标硬化增难，而不是 RA_CAND_0005 的机制密度？"
  - "请主攻：开放空间和多次 sticky 推动是否削弱审美 4 的紧凑性。"
scc_graph:
  - "Graph complete；SCC facts 可用于分支/不可逆证据，但不作为审美分数。"
variant_family:
  - "fresh_required；不得视为 archive variant。"
start_position:
  - "未做 start sweep；不声明 start-robust。"
prototype_specific_work:
  invalid_goal_prune: "已运行三目标单删反事实；没有目标可删。"
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
why_not_archive_variant:
  - "本轮从 lexicon 语料组合建立新 claim；没有复用 archive layout、对象角色、接口骨架或路线。"
  - "archive entries 只用于 taste calibration 和失败模式校准。"
```

## source_design_lexicon

```yaml
lexicon_file: "prototypes/reality_anchor/mechanism_lab/lexicon.md"
runs_directory_read: false
selected_lexicon_materials:
  - name: "B/S 解绑定债：用边界切割回收箱子资源"
    use_in_candidate: "sticky_to_box 释放 crate，并要求释放后继续推送到上目标。"
  - name: "刚体黏块推进后的回返谱系"
    use_in_candidate: "竖向 sticky 尾债先作为刚体移动，再回到 B/S 切割边界。"
  - name: "B/S 绑定债：从可分配箱子到形状化黏块"
    use_in_candidate: "crate 先 box_to_sticky，成为 sticky 材料债；但不声明 sticky_merge all-solution。"
designer_added_bridge_logic:
  - "两个下层目标把 sticky 尾债的保留变成约束。"
  - "上目标把 cut 后 crate 的继续消费变成约束。"
```

## attempt_log

```yaml
serious_structural_attempts:
  - "先尝试 BIND_SPLIT_RETURN family，目标是同时强制 box_to_sticky、sticky_merge、move_sticky_rigid、sticky_to_box。"
  - "多版固定 B/S 与多目标结构都发现 sticky_merge 可被绕过；因此放弃 all-solution sticky_merge claim。"
  - "改为 CUT_TAIL_RELAY family，把 claim 缩窄到 box_to_sticky、move_sticky_rigid、sticky_to_box 与 post-cut crate push。"
local_repairs:
  - "补齐三目标 invalid_goal_prune：top/mid/low 单删均导致成本下降或 missing-core-event bypass。"
abandoned_families:
  - name: "BIND_SPLIT_RETURN_v1"
    reason: "sticky_merge all-solution 必经无法稳定成立，继续包装会污染 claim。"
```

## archive_taste_context

```yaml
examples:
  - id: RA_CAND_0002
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 4
    role: "positive_reference"
    calibration_use: "高分正例：机制要素充分利用，拉动黏块打破 P/L 单向移动假设，洞见强。"
    relevant_warning: "不声明唯一对象身份；工具证据只支持事件组必要性。"
  - id: RA_CAND_0005
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 4
    role: "positive_reference"
    calibration_use: "高分正例：玩家需构造黏块+B/S 三格长链去触及远目标，机制利用率高。"
    relevant_warning: "目标反事实曾删除重复目标；本候选也必须通过 invalid_goal_prune。"
  - id: RA_CAND_0006
    human_reviewed: true
    aesthetic_score: 2
    difficulty_score: 5
    role: "negative_example"
    calibration_use: "负例：小目标改动弱化机制美感，靠腾挪复杂度增难。"
    relevant_warning: "若本候选只是多目标/长路线硬化，应降级。"
  - id: RA_CAND_0013
    human_reviewed: true
    aesthetic_score: 2
    difficulty_score: 1
    role: "lower_bound_reference"
    calibration_use: "固定 B/S sticky cut 教学 witness；简单切割+后续推箱不能单独包装成高分。"
    relevant_warning: "本候选必须证明自己比基础 cut witness 多出有效资源链。"
none_found_reason: null
```

## claim_last_review

```yaml
mode: not_used
facts_packet: null
claim_packet: null
read_order: not_applicable
```
