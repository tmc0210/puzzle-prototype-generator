# 候选包：ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1

```yaml
review_iteration: review_1
candidate_version: ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1
prototype: ice_slide_escape
meta_design_mode: meta_first_design
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
    authorized_by: null
    candidate_ids: []
    allowed_operations: []
  candidate_relation: fresh
  why_not_archive_variant: >
    本布局从规则原语重新组装。archive 条目和已否决的 round26 只用于审美/失败校准；
    不使用它们的布局骨架、接口关系、对象角色或主要因果链作为设计起点。
```

## 原型上下文

```yaml
confirmed_rules:
  - 矩形网格；`#` 是墙，`.` 是地面，`I` 是冰，`*` 是带冰的目标。
  - 目标是 overlay，不影响移动或滑行。
  - 胜利条件：所有目标被冰占据，且玩家站在本次 solve 请求指定的显式 edge goal。
  - 非目标格允许存在额外冰。
  - 玩家 start 必须是初始可站的边缘格。
  - 玩家 goal 是显式边缘格，可以初始为墙。
object_and_event_semantics:
  - d1/d2: 冰在障碍前短停。
  - d3: 移动冰被销毁。
  - d4: 移动冰回弹一格。
  - boundary: 移动冰消失。
  - d5: 穿过连续障碍组并 restart。
  - d6_plus: 摧毁连续障碍组；若后方有空间则 restart。
tool_boundary:
  - solver/analyzer/graph 只证明可解性、事件 gate 和图完整性。
  - 工具证据不证明审美价值或难度评分。
```

## 本轮 Brief 对齐

```yaml
intended_role: meta-first paired challenge candidate
known_before:
  base: 可用知识阶段随意；本候选使用 d6_plus/restart，未满足“优先 d5 前”的偏好，但不违反硬约束。
  meta: 默认可用全部 ice_slide_escape 知识。
target:
  - 所有目标初始都有冰：本候选所有目标都是 `*`，无裸 `G`。
  - 允许额外 `I`：用户已放宽为“所有目标上初始都有箱子”即可。
  - 初始 target ice 封死 start 到 goal 的直观路径，制造“目标已满但路被目标冰堵住”的矛盾。
  - base 中所有可达知识里最后期的知识必须在所有胜利路径中用到。
  - base/meta 难度都不低于 3，且至少一条达到 4。
  - 整体审美目标不低于 4，追求 5。
difficulty_or_support_expectation: challenge / late application，不是教学 witness。
```

## 求解实例

```yaml
interfaces:
  A: [0, 8]
  B: [20, 11]
  C: [10, 0]
  D: [3, 16]
base_instance:
  start: [0, 8]
  goal: [20, 11]
  role: base A->B
meta_instance:
  start: [10, 0]
  goal: [3, 16]
  role: meta C->D
win_condition: ice_slide_escape_explicit_goal
targets_initially_covered:
  count_star: 2
  count_g: 0
  coords: [[6, 8], [10, 8]]
extra_ice:
  count_i: 4
```

```text
##########.##########
###...I....##########
###I######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
###.######.##########
......*...*##########
#####.###############
###.#.###############
###.#II......#......#
###.#.###############
###.#.###############
###.#################
###.#################
#####################
```

## 机制范围

```yaml
central:
  - ice_destroy_group_d6_plus
  - slide_restart_after_group
allowed_support:
  - ice_stop_short
  - ice_destroyed_d3
  - ice_boundary_disappear_after_group
incidental_allowed:
  - push_ice_failed
  - ice_blocks_ice_no_chain_push
required_winning_path_events:
  base:
    - ice_destroy_group_d6_plus
    - slide_restart_after_group
  meta:
    - ice_destroy_group_d6_plus
    - slide_restart_after_group
forbidden_winning_path_events: []
forbidden_if_seen_anywhere: []
latest_reachable_knowledge_claim:
  base: d6_plus/restart 可达，且在完整搜索中所有胜利路径都必须使用。
  meta: d6_plus/restart 可达，且在完整搜索中所有胜利路径都必须使用。
```

## Design Claim

```yaml
player_insight:
  base: >
    A 入口看到目标已经满足，但目标冰同时封住直接横路。真正任务不是填目标，
    而是在不破坏目标覆盖的前提下，用额外冰通过 d6_plus/restart 打开远端 B 墙。
  meta: >
    C 入口从上方重读同一条 target-blocked spine。玩家先用 d3 牺牲清掉上方通路，
    再用竖向 d6_plus/restart 打开下方 D 墙，同时保持目标覆盖。
causal_chain:
  base: >
    从 A 走到下方冰组。第一推形成 d2 短停的 staging 状态；第二推让冰进入
    d6_plus 摧毁、restart、再摧毁 B 边缘墙。目标始终被 `*` 覆盖，随后玩家走到 B。
  meta: >
    从 C 先左推上方冰触发 d3 牺牲，清出进入竖井的路线。之后向下推动左上冰，
    通过 d6_plus/restart 摧毁 D 边缘墙。目标仍被覆盖，随后玩家走到 D。
why_not_execution:
  - 返回 trace 的 push 数很少；预期难度来自长距离分支识别和“目标冰是不可动封条”的读法，而不是长执行。
  - 错误不可逆推会消耗错误开口，留下没有 target-valid 路径的状态。
  - 如果 critic 判断两推核心太薄，则本候选应被打回或换家族。
falsification:
  - 若静态目标封条不足以支撑“所有目标初始覆盖”的矛盾美感，应 reject/revise。
  - 若 base/meta 像两个 d6 witness 小关硬拼，应 reject/revise。
  - 若 2 个不可逆 commitment 无法支撑 >=3 难度，或没有一侧达到 4，应 reject/revise。
```

## Meta Reinterpretation

```yaml
meta_reinterpretation:
  meta_design_mode: meta_first_design
  base_instance:
    start: [0, 8]
    goal: [20, 11]
    allowed_exposure_through: ice_destroy_group_d6_plus
    claimed_core_events:
      - ice_destroy_group_d6_plus
      - slide_restart_after_group
    intended_difficulty_score: 3
  meta_instance:
    start: [10, 0]
    goal: [3, 16]
    allowed_exposure_through: ice_destroy_group_d6_plus
    claimed_core_events:
      - ice_destroyed_d3
      - ice_destroy_group_d6_plus
      - slide_restart_after_group
    intended_difficulty_score: 4
  shared_structure:
    - 两个 `*` target blocker 同时构成 A->B 和 C->D 的可见封锁脊柱。
    - 两条解都用额外冰打开初始为墙的 edge goal，同时保留目标覆盖。
  chain_delta_from_base: >
    Base 是 d2 staging 后的下方横向 d6_plus/restart；meta 是 d3 牺牲后的上方竖向
    d6_plus/restart。目标封锁行的角色共享，但主动冰路线和前置分支不同。
  cross_visit_payoff: >
    同一个“目标已经满，但路线仍被目标冰封住”的矛盾，从另一个轴向被重读。
  base_time_masking: >
    C 的上方 d3/d6 路线不能从 A 形成目标 pair；A->D 与 A->C 完整搜索不可解。
    C->A 与 C->B 可解，但按原型接口政策属于 ignored reverse/internal pair。
  latent_or_lure_elements:
    - element: [6,1] 上方冰
      base_reading: A->B 返回解不使用的可见潜伏元素
      meta_payoff: C->D 中用 d3 牺牲来清出竖向 d6 路线
    - element: [6,8]/[10,8] target-covered row
      base_reading: 封住 A 横向直路，同时保持目标完成
      meta_payoff: 封住 C 竖向直路，同时保持目标完成
  classification_claim: meaningful_reinterpretation_with_caveats
```

## 证据摘要

```yaml
commands_run:
  - npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_layout.txt --id ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_base --player-start 0,8 --player-goal 20,11 --max-states 120000 --max-depth 170 --graph-max-states 120000 --write
  - npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_layout.txt --id ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_meta --player-start 10,0 --player-goal 3,16 --max-states 120000 --max-depth 170 --graph-max-states 120000 --write
  - npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_layout.txt --id ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_base_required_latest --player-goal 20,11 --starts 0,8 --required-winning-events ice_destroy_group_d6_plus,slide_restart_after_group --max-states 120000 --max-depth 170 --graph-max-states 120000 --write
  - npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_layout.txt --id ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_meta_required_latest --player-goal 3,16 --starts 10,0 --required-winning-events ice_destroy_group_d6_plus,slide_restart_after_group --max-states 120000 --max-depth 170 --graph-max-states 120000 --write
  - custom in-memory edge-goal scan using solver/runtime API over A and C starts x 72 edge goals, maxStates=120000, maxDepth=170.
solver_result:
  base:
    found: true
    cost: 23
    explored_states_returned_solution: 183
    graph_status: complete
    reachable_states: 262
    legal_transitions: 520
    win_states: 2
  meta:
    found: true
    cost: 23
    explored_states_returned_solution: 83
    graph_status: complete
    reachable_states: 298
    legal_transitions: 589
    win_states: 3
trace_summary:
  base:
    pushes: 2
    events:
      walk: 21
      push_ice: 2
      ice_stop_short:d2: 1
      ice_destroy_group_d6_plus:len1: 2
      slide_restart_after_group: 1
      ice_boundary_disappear_after_group: 1
  meta:
    pushes: 2
    events:
      walk: 21
      push_ice: 2
      ice_destroyed_d3: 1
      ice_destroy_group_d6_plus:len1: 2
      slide_restart_after_group: 1
      ice_boundary_disappear_after_group: 1
winning_path_event_checks:
  base:
    required: [ice_destroy_group_d6_plus, slide_restart_after_group]
    missing_required_winning_path: not_found_complete
    explored_states: 260
  meta:
    required: [ice_destroy_group_d6_plus, slide_restart_after_group]
    missing_required_winning_path: not_found_complete
    explored_states: 295
reachable_event_exposure:
  base:
    status: complete
    latest_reachable_event_family: ice_destroy_group_d6_plus
    event_counts_include:
      ice_destroyed_d3: 6
      ice_stop_short:d2: 4
      ice_stop_short:d1: 6
      ice_destroy_group_d6_plus:len1: 8
      slide_restart_after_group: 4
      ice_boundary_disappear_after_group: 4
  meta:
    status: complete
    latest_reachable_event_family: ice_destroy_group_d6_plus
    event_counts_include:
      ice_destroyed_d3: 4
      ice_stop_short:d2: 2
      ice_destroy_group_d6_plus:len1: 6
      slide_restart_after_group: 3
      ice_boundary_disappear_after_group: 3
graph_or_counterfactual_evidence:
  base:
    graph_status: complete
    scc_shape: branching_win_dag
    irreversible_steps: 2
    forced_win_prefix: 0
    initial_scc: { states: 13, out: 3, winOut: 2, deadOut: 1, dist: 2 }
  meta:
    graph_status: complete
    scc_shape: one_win_continuation_per_scc
    irreversible_steps: 2
    forced_win_prefix: 2
    initial_scc: { states: 11, out: 1, winOut: 1, deadOut: 0, dist: 2 }
interface_and_static_evidence:
  static_direct_seals:
    A_row_to_B_region: [[6,8], [10,8]]
    C_col_to_D_region: [[10,8]]
  full_edge_scan:
    edge_goals_checked_per_start: 72
    A:
      found: [A->A self, A->B target]
      complete_unsolved: 70
      external_edge_goal_escape_solved: []
      internal_non_target_risks_solved: []
    C:
      found: [C->C self, C->D target, C->A ignored_reverse, C->B ignored_reverse]
      complete_unsolved: 68
      external_edge_goal_escape_solved: []
      internal_non_target_risks_solved: []
evidence_limits:
  - 返回的 base/meta trace 都没有移动 target-covered ice；`*` 的主要作用是静态封条。
  - 冰身份不可区分，本包不声明 per-object necessity。
  - graph 事实只支持拓扑/覆盖，不支持审美分。
  - 每个目标 solve 只有 2 个不可逆 push commitment，这是设计质量风险。
```

## 证据引用

```yaml
layout: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_layout.txt
base_analysis:
  md: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_base.md
  json: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_base.json
meta_analysis:
  md: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_meta.md
  json: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_meta.json
required_latest_base:
  md: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_base_required_latest.md
  json: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_base_required_latest.json
required_latest_meta:
  md: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_meta_required_latest.md
  json: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_meta_required_latest.json
interface_probe:
  md: prototypes/ice_slide_escape/reports/interface_probe_ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_v2.md
```

## Diagnostic Routing

```yaml
hard_evidence:
  status: required_done
mechanism_scope:
  status: required_done
claim_hygiene:
  status: required_done
taste_probes:
  selected:
    - player_insight
    - why_not_execution
    - state_consumption
    - meta_reinterpretation
    - salient_element_use
scc_graph:
  status: triggered_done
  reason: challenge/meta-first 候选，且存在 commitment 深度偏薄的风险。
variant_family:
  status: light_done
  reason: fresh_required；没有 archive variant 授权。
start_position:
  status: triggered_done
  reason: 显式 A/B/C/D 接口与 edge-goal 风险。
prototype_specific_work:
  status: triggered_done
  workflows:
    - meta_first_design
```

## 原型专属接口合约

```yaml
interface_pair_policy:
  declared_interface_points: [A, B, C, D]
  target_pairs: [A->B, C->D]
  ignored_internal_reverse_pairs: [C->A, C->B, D->A, D->B]
  risky_non_target_pair_scope:
    - A/B/C/D -> edge goals outside A/B/C/D
    - internal non-target pairs not listed under ignored_internal_reverse_pairs
pair_diagnostics:
  ignored_pairs:
    - pair: C->A
      evidence: full-edge scan 中可解，cost 18
      verdict_effect: none
    - pair: C->B
      evidence: full-edge scan 中可解，cost 35
      verdict_effect: none
  risky_pairs: []
  external_edge_escape_checks:
    result: none_found
    evidence: A/C 两个起点各自扫描全部 72 个 edge goal；所有不可解目标均完整搜索结束，无 exhaustion。
```

## Archive Taste Context

以下条目只用于有人类评语支持的审美校准；不授权复用布局、几何结构、因果链、求解路线、对象摆放或入口出口关系。

```yaml
score_claim_allowed: true
examples:
  - candidate_id: ICE_CAND_0024
    file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0024.md
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score:
      record_top: 3
      meta_packet_target: 4
    calibration_use: positive high-meta reference
    human_comment_excerpt: >
      人类接受为“极佳的强复用 meta 案例”：强空间/要素复用、base-time masking、
      target 状态不兼容诱惑都成立。
    relevance: >
      作为共享空间/共享要素和有意义诱惑的高标杆；不得复制它的 target-debt 链、
      A/B/C/D 关系或几何。
  - candidate_id: ICE_CAND_0035
    file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0035.md
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 4
    calibration_use: positive exception / difficulty-4 reference
    human_comment_excerpt: >
      人类 5/4 来自 return pressure 下“旧出口变回访入口”的意义重写，
      不是来自 B=C 或 D-wall 这些表面形式。
    relevance: >
      提醒 critic：表面接口技巧不加分，只有共享结构意义改变才加分。
  - candidate_id: ICE_CAND_0034
    file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0034.md
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 2
    calibration_use: lower-bound reminder
    human_comment_excerpt: >
      人类接受为审美 4，但指出实际难度是 base 2-、meta 约 3。
    relevance: >
      如果本候选只是干净但 commitment 太薄，应按这个下界经验攻击。
```

## Attempt Log

```yaml
serious_structural_attempts:
  - id: round26_fresh_star_y_gate_v1
    outcome: rejected_candidate
    reason: >
      独立 critic 因审美未达标、六连 d4 重复、B=D 同出口削弱、没有一侧达到难度 4 而否决。
      该候选不作为本候选起点。
  - id: round27_fresh_restart_chain_v1
    outcome: enter_review_loop
    reason: >
      全新 d6_plus/restart 家族；所有目标初始覆盖；target blocker 封死直接路径；
      B/D 分离且初始为墙；latest-event gate 与外部 edge scan 干净。
local_repairs: []
abandoned_families:
  - static all-target d4 corridor with B=D，已被独立 critic 否决。
```
