# Candidate Packet: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2 / review_1

```yaml
candidate_version: RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2
review_iteration: review_1
prototype: reality_anchor
controller_note: >
  本候选为 fresh design。本轮使用 mechanism_lab/lexicon.md 选取设计语料；
  未读取 mechanism_lab/runs。v1 的第三目标经 invalid_goal_prune 判定冗余，
  v2 已删除后重跑证据。
```

## prototype_context

```yaml
confirmed_rules:
  - "胜利条件为 all_targets_covered_by_objects；目标可由 crate、sticky 或 anchor 覆盖。"
  - "P/L anchor 决定 push/pull 区域，锚点本身可移动。"
  - "B/S anchor 决定 box/sticky material boundary，锚点本身可移动。"
  - "crate 进入 sticky side 会 box_to_sticky；sticky 正交相邻会 sticky_merge；sticky 连通块作为刚体移动。"
win_condition: all_targets_covered_by_objects
object_and_event_semantics:
  - "P/L shift: anchor_boundary_shift:push_pull"
  - "B/S shift: anchor_boundary_shift:box_sticky"
  - "material binding: box_to_sticky"
  - "shape debt: sticky_merge + move_sticky_rigid"
tool_boundary:
  - "solver/analyzer/probes 只提供事实，不授予审美或难度通过。"
  - "complete graph / complete event probe 才能支撑 all-winning-path claim。"
```

## slot_brief

```yaml
intended_role: "Reality Anchor 后段紧凑挑战候选"
known_before:
  - K_runtime_smoke
target:
  - "至少 difficulty 4，追求更高。"
  - "整体审美 4 分保底，追求 4~5。"
difficulty_or_support_expectation: "challenge；目标是紧凑强逻辑而非长路线硬化。"
```

## mechanic_exposure_context

```yaml
mechanic_window:
  - "movable P/L wallgate"
  - "movable B/S material boundary"
  - "box_to_sticky binding"
  - "sticky rigid movement"
  - "sticky_merge"
allowed_exposure_through:
  - "all_current_reality_anchor_runtime_rules"
claimed_core_events:
  - "anchor_boundary_shift:push_pull"
  - "anchor_boundary_shift:box_sticky"
  - "pull_object"
  - "box_to_sticky"
  - "move_sticky_rigid"
  - "sticky_merge"
not_claimed:
  - "不声明 sticky_to_box/release。"
  - "不声明唯一输入序列或对象身份级必要性。"
  - "不把 SCC forced/scripted facts 当作质量背书。"
```

## design_target

```yaml
aesthetic_score_target: "4+；目标是小空间中双 anchor 与材料绑定共享一条因果链。"
difficulty_score_target: "4+；目标是 compact challenge，而不是路线长度。"
target_role_notes:
  - "对标 RA_CAND_0011 的紧凑强逻辑与 RA_CAND_0002/0005 的双 anchor 机制利用率。"
  - "必须避开 RA_CAND_0006 式目标硬化/腾挪增难。"
```

## solve_instance

```yaml
layout_file: "prototypes/reality_anchor/reports/RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_layout.txt"
player_start: [1, 2]
player_goal: null
win_condition: all_targets_covered_by_objects
objects:
  push_pull_anchor:
    P: [1, 1]
    L: [2, 1]
  box_sticky_anchor:
    B: [3, 1]
    S: [3, 2]
  crates:
    - [5, 1]
  sticky:
    - [2, 2]
    - [1, 4]
  goals:
    right_goal: [6, 2]
    mid_goal: [2, 3]
```

```text
########
#PLB.C.#
#@MS..G#
#.G..#.#
#M....##
########
```

## mechanism_scope

```yaml
central:
  - "开局右推让 sticky/B/S/crate 一起进入新关系：B/S shift 与 sticky rigid 同步出现。"
  - "P/L 之后被 pull/push 重排，作为小空间站位门。"
  - "中段必须拉动 sticky 刚体并触发 sticky_merge，承担 mid_goal。"
  - "末端必须移动 B/S，把 crate 拉入 sticky side，以 box_to_sticky 完成 right_goal。"
allowed_support:
  - "少量走位与等价 reposition。"
incidental_allowed:
  - "不同胜路可以有等价步序差异；packet 不声明唯一输入序列。"
required_winning_path_events:
  - "anchor_boundary_shift:push_pull"
  - "anchor_boundary_shift:box_sticky"
  - "pull_object"
  - "box_to_sticky"
  - "move_sticky_rigid"
  - "sticky_merge"
forbidden_winning_path_events:
  - "winning path 缺少任一 required group。"
  - "winning path 中 box_to_sticky 早于 sticky_merge。"
forbidden_if_seen_anywhere: []
```

## design_claim

```yaml
player_insight:
  - "玩家需要把 P/L 当成站位门来重排入口，而不是只把它看作规则标签。"
  - "sticky_merge 先把下方目标链收束；之后 crate 才能作为最后资源被绑定到 sticky side。"
  - "两个目标分别阻止两个简化路线：右目标阻止短 sticky 覆盖，mid_goal 阻止只做末端 B/S+crate。"
causal_chain:
  - "开局：推动 sticky/B/S 链，触发 B/S 位移与 sticky rigid move。"
  - "门控：P/L 被 pull/push，改变可达站位与后续操作侧。"
  - "收束：sticky 刚体被拉动并 sticky_merge，承担 mid_goal。"
  - "绑定：B/S 末端右移后，crate 被 pull 下，box_to_sticky 完成 right_goal。"
why_not_execution:
  - "core6 probe 完整证明六个核心事件组全胜路必经。"
  - "order probe 完整证明 box_to_sticky 不会早于 sticky_merge。"
  - "目标删除反事实显示两个保留目标各自阻断不同 missing-core-event shortcut。"
falsification:
  - "若 reviewer 找到缺少任一 core6 group 的胜路，核心 claim 失败。"
  - "若 reviewer 找到 box_to_sticky 早于 sticky_merge 的胜路，'先收束再绑定' claim 失败。"
  - "若 critic 判断主要体验是 forced-script execution，而不是紧凑状态消费，应降级或重做。"
```

## evidence

```yaml
commands_run:
  - "npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_layout.txt --id RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2 --targets K_runtime_smoke --max-states 500000 --graph-max-states 500000 --write"
  - "npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_layout.txt RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_core6_merge 500000 120 \"push_pull_shift=anchor_boundary_shift:push_pull\" \"box_sticky_shift=anchor_boundary_shift:box_sticky\" \"pull_event=pull_object\" \"box_to_sticky=box_to_sticky\" \"sticky_rigid=move_sticky_rigid\" \"sticky_merge=sticky_merge\""
  - "npx tsx prototypes/reality_anchor/reports/probe_event_order.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_layout.txt RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_bind_before_merge box_to_sticky sticky_merge 500000 120"
  - "对 v1 no_low、v2 no_right、v2 no_mid 分别运行 explain-layout；对 v2 no_right/no_mid 运行 core6 event probe 与原 trace replay。"
solver_result:
  found: true
  cost: 22
  depth: 22
  explored_states: 426
  inputs: "right down left up down right right down left up up right left down down right right up up right right down"
trace_summary:
  returned_solution_event_counts:
    anchor_boundary_shift_box_sticky: 4
    anchor_boundary_shift_push_pull: 4
    move_sticky_rigid: 4
    pull_object_push_pull_anchor: 3
    pull_object_box_sticky_anchor: 3
    sticky_merge_n1: 1
    box_to_sticky_n1: 1
    walk: 10
  key_snapshots:
    - "step 1: right，B/S shift + sticky rigid。"
    - "steps 2/4/14/15: P/L shift 作为站位门重排。"
    - "step 17: sticky_merge 覆盖/收束 mid_goal 侧。"
    - "step 22: pull crate 后 box_to_sticky 完成 right_goal。"
target_events:
  - "K_runtime_smoke 通过；该 target 不含质量 verdict。"
object_or_instance_evidence:
  - "analyzer 未提供 instance-level object participation；不声明对象身份级必要性。"
winning_path_event_checks:
  core6_merge:
    artifact: "prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_core6_merge.md"
    combined: "Found bypass=false, status=complete, exploredStates=670"
    individual:
      push_pull_shift: "Found bypass=false, complete, exploredStates=601"
      box_sticky_shift: "Found bypass=false, complete, exploredStates=499"
      pull_event: "Found bypass=false, complete, exploredStates=483"
      box_to_sticky: "Found bypass=false, complete, exploredStates=528"
      sticky_rigid: "Found bypass=false, complete, exploredStates=489"
      sticky_merge: "Found bypass=false, complete, exploredStates=482"
  order_probe:
    artifact: "prototypes/reality_anchor/reports/order_probe_RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_bind_before_merge.md"
    result: "Found violation win=false, status=complete, exploredStates=528"
    meaning: "box_to_sticky 在所有胜路中不会早于 sticky_merge。"
reachable_event_exposure:
  - "未做 forbidden reachable scan；packet 不声明 later-event 排除。"
graph_or_counterfactual_evidence:
  main_graph:
    artifact: "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2.md"
    status: complete
    reachable_states: 482
    legal_transitions: 866
    winning_states: 1
  agency:
    compressed_regions: 207
    initial_commitments: 5
    viable_commitments: 2
    dead_commitments: 3
    progress_commitments: 1
    optimal_commitments: 1
  scc:
    shape: "sccs=172, edges=226, winReachable=14, winning=1, winSubgraph=branching_win_dag"
    solution_irreversible_path: "steps=11, forcedWinPrefix=1/11"
    handoff_scriptiness: "scripted=7/11, trivial=5, forcedScripted=7"
  goal_prune_check:
    status: pruned
    current_candidate_clean: true
    removed_targets:
      - [3, 4]
    retained_targets:
      - [6, 2]
      - [2, 3]
    targets_checked:
      - target: [3, 4]
        action: remove
        reason: "v1 删除 low goal 后成本 22->22，graph complete，原 trace 仍通关；该目标为顺手覆盖。v2 已删除。"
        evidence_refs:
          - "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v1_no_low_goal.md"
      - target: [6, 2]
        action: keep
        reason: "v2 删除 right_goal 后成本 22->3，并出现缺少 push_pull_shift、box_sticky_shift、box_to_sticky、sticky_merge 的 winning bypass。"
        graph_status: complete
        expected_trace_win: true
        evidence_refs:
          - "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_right_goal.md"
          - "prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_right_goal_core6_merge.md"
          - "prototypes/reality_anchor/reports/trace_RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_right_goal_replay_original.md"
      - target: [2, 3]
        action: keep
        reason: "v2 删除 mid_goal 后成本 22->8，并出现缺少 push_pull_shift、sticky_rigid、sticky_merge 的 winning bypass。"
        graph_status: complete
        expected_trace_win: true
        evidence_refs:
          - "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_mid_goal.md"
          - "prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_mid_goal_core6_merge.md"
          - "prototypes/reality_anchor/reports/trace_RA_LEX_2026_07_06_WALLGATE_BIND_LOCK_v2_no_mid_goal_replay_original.md"
evidence_limits:
  - "不声明 sticky_to_box/release。"
  - "不声明唯一输入序列、对象身份级必要性或 start-robust。"
  - "SCC/scriptiness facts 是 critic 风险，不是质量 pass。"
```

## diagnostic_routing

```yaml
hard_evidence:
  - "请 evidence reviewer 检查 core6 probe、order probe、v2 目标删除反事实是否足以支持 claim。"
  - "请特别确认 v1 被删目标没有进入 v2 solve_instance。"
mechanism_scope:
  - "核心是 P/L wallgate + B/S binding lock；不是 sticky_to_box release。"
claim_hygiene:
  - "不要把 winning_states=1 写成唯一解质量结论。"
  - "不要把 scripted SCC 当作质量背书。"
taste_probes:
  - "请 critic 主攻：是否过于 forced/scripted，像执行序列而非 4+ challenge。"
  - "请 critic 主攻：是否只是 RA_CAND_0002/0005 的双 anchor 清单，没有新的玩家侧洞见。"
  - "请 critic 主攻：删除冗余目标后，两个目标是否仍读得自然。"
scc_graph:
  - "Graph complete；SCC scriptiness 显著，必须给玩家侧解释。"
variant_family:
  - "fresh_required；archive 只用于 taste calibration，不作为布局起点。"
start_position:
  - "未做 start sweep；不声明 start-robust。"
prototype_specific_work:
  invalid_goal_prune: "已运行；v1 删 1 个目标，v2 两个目标均保留。"
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
  - "本候选从 lexicon 语料组合和本轮搜索/修剪得到；未复用 archive layout、对象角色或路线。"
```

## source_design_lexicon

```yaml
lexicon_file: "prototypes/reality_anchor/mechanism_lab/lexicon.md"
runs_directory_read: false
selected_lexicon_materials:
  - name: "P/L 横向把手的墙格门"
    use_in_candidate: "P/L 多次被 pull/push，改变玩家站位门和后续操作侧。"
  - name: "B/S 绑定债：从可分配箱子到形状化黏块"
    use_in_candidate: "末端 crate 被拉入 sticky side，以 box_to_sticky 完成 right_goal。"
  - name: "刚体黏块推进后的回返谱系"
    use_in_candidate: "sticky 刚体移动与 sticky_merge 形成中段承诺，mid_goal 防止绕过。"
designer_added_bridge_logic:
  - "用两个目标分别约束末端 binding 与中段 merge，而不是保留顺手覆盖的第三目标。"
```

## attempt_log

```yaml
serious_structural_attempts:
  - "CUT_TAIL_RELAY_v1: core evidence clean，但 critic 要求 structural_revision，认为是固定 B/S cut witness 拉长版；放弃。"
  - "WALLGATE_BIND_RELEASE_v1: 尝试强制 box_to_sticky + sticky_to_box release；主胚子图 exhausted 且存在无 sticky_to_box 胜路；放弃。"
  - "WALLGATE_BIND_LOCK_v1: 双 anchor binding lock 成立，但 invalid_goal_prune 判定第三目标冗余。"
  - "WALLGATE_BIND_LOCK_v2: 删除冗余目标后重跑主分析、core6、order probe 与剩余目标删除反事实。"
local_repairs:
  - "删除 [3,4] 目标。"
  - "用 order probe 收窄为 sticky_merge 先于 box_to_sticky 的证据化 claim。"
abandoned_families:
  - name: "CUT_TAIL_RELAY"
    reason: "critic 判定设计强度不足。"
  - name: "WALLGATE_BIND_RELEASE"
    reason: "sticky_to_box 不是所有胜路必经，且图空间过松。"
```

## archive_taste_context

```yaml
examples:
  - id: RA_CAND_0002
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 4
    role: "positive_reference"
    calibration_use: "双 anchor 正例：P/L 与 B/S 材料换相、sticky_merge 共同收束，人评认为要素利用充分、洞见较强。"
  - id: RA_CAND_0005
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 4
    role: "positive_reference"
    calibration_use: "高密度正例：玩家侧矛盾明显，需要构造黏块+B/S 三格长链触及远目标。"
  - id: RA_CAND_0011
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 4
    role: "compact_positive_reference"
    calibration_use: "紧凑强逻辑正例：小空间内箱子先上目标、再拉出、再回填，反直觉洞见强。"
  - id: RA_CAND_0006
    human_reviewed: true
    aesthetic_score: 2
    difficulty_score: 5
    role: "negative_example"
    calibration_use: "负例：目标位置硬化削弱机制美感，主要通过腾挪复杂度增难。"
none_found_reason: null
```

## claim_last_review

```yaml
mode: not_used
facts_packet: null
claim_packet: null
read_order: not_applicable
```
