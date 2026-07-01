# Serious Candidate Packet：ICE_EXP_META_2026_07_02_round19_v7

> 本文件是送 evidence reviewer / puzzle critic / 人工复审的候选包，不是控制器通过结论。

```yaml
packet_status: ready_for_review_input
candidate_id: ICE_EXP_META_2026_07_02_round19_v7
review_loop_state_before_review: held_proposal
review_integrity_before_review: self_review_only
archive_eligibility_before_review: raw_run_only
```

## prototype_context

```yaml
prototype: ice_slide_escape
confirmed_rules:
  - 玩家四向移动，推冰后冰自动滑行并按距离分支结算。
  - 胜利要求所有 target 被冰占据，且玩家到达显式指定的 edge goal。
  - 每个 player_start / player_goal pair 是独立 solve instance，不能合并成 any-edge。
  - 冰实例在 runtime 状态键中不可区分；本候选另用身份保持回放探针证明返回解 trace 的冰块身份。
win_condition: ice_slide_escape_explicit_goal
object_and_event_semantics:
  target: overlay，不阻挡移动或滑冰
  ice_rebound_d4: 冰滑行 4 格撞障碍后回弹一格
  ice_destroyed_d3: 冰滑行 3 格撞障碍后移动冰消失
  ice_stop_short_d1_d2: 冰滑行 1/2 格后停在障碍前
tool_boundary:
  - solver/analyzer 提供事实，不给审美 verdict。
  - 当前证据是单关多 start/goal instance，不证明未来大地图 runtime。
  - 当前未调用独立 reviewer / critic；本 packet 只能作为送审输入。
```

## slot_brief

```yaml
intended_role: meta_first_design candidate
known_before:
  base: "不超过 d5，建议 d4"
  meta: "默认全部知识可用"
target:
  base_instance: A->B
  meta_instance: C->D
difficulty_or_support_expectation:
  base: "2 或 2+"
  meta: "4 或 4+"
  aesthetic: "整体审美 4，追求 5"
human_positioning_update:
  - "base/meta 没有知识差不是当前打回点，而是定位差异。"
  - "当前趣味点是：base 看似简单一推 d4；回访时必须为了回 D 重读同一结构，形成三次 d4 回访链。"
  - "C->A/B 比 C->D 短按本轮人工修正视为文档错误类，暂不作为风险或 caveat。"
```

## mechanic_exposure_context

```yaml
mechanic_window:
  base_allowed_exposure_through: pass_through_d5
  base_preferred_core: rebound_d4
  meta_allowed_exposure_through: ice_destroy_group_d6_plus
claimed_core_events:
  base:
    - ice_rebound_d4
  meta:
    - ice_destroyed_d3
    - ice_rebound_d4
    - ice_stop_short:d1
```

## design_target

```yaml
aesthetic_score_target: 4
aesthetic_score_aspiration: 5
difficulty_score_target:
  base: "2 / 2+"
  meta: "4 / 4+"
target_role_notes: >
  候选不追求 base 与 meta 的知识差；它追求同一已见结构在回访目标改变后，
  从“一推 d4 即可”变成“必须重新组织三次 d4 与最终 D 路由”的玩家侧转折。
score_claim_allowed_by_archive_context: true
controller_score_claim: none
```

## solve_instances

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round19_fresh_v7_layout.txt
layout: |
  #.#######
  #.....I.#
  ..I..G.##
  #####.###
  ##....#.#
  ##.#..#I.
  ##...I..#
  #######.#
interfaces:
  A: [1, 0]
  B: [0, 2]
  C: [7, 7]
  D: [8, 5]
base_instance:
  player_start: [1, 0]
  player_goal: [0, 2]
  win_condition: ice_slide_escape_explicit_goal
meta_instance:
  player_start: [7, 7]
  player_goal: [8, 5]
  win_condition: ice_slide_escape_explicit_goal
```

## mechanism_scope

```yaml
central:
  base:
    - "从 A 进入后用一推 d4 rebound 把中心目标覆盖，再走回 B。"
  meta:
    - "从 C 回访时，先处理底部路线/资源，再多次重读中心目标和右侧冰路由，最后用短停收束到 D。"
allowed_support:
  - walk reposition
  - d3 清理
  - d1 短停收束
incidental_allowed:
  - base 可达扫描中允许 d5 以内事件暴露；不声明 strict d4 clean。
required_winning_path_events:
  base:
    - ice_rebound_d4
  meta:
    - ice_destroyed_d3
    - ice_rebound_d4
forbidden_winning_path_events:
  base: []
  meta: []
forbidden_if_seen_anywhere:
  base:
    - ice_destroy_group_d6_plus
```

## design_claim

```yaml
player_insight:
  base: >
    玩家先学到这张图从 A->B 的目标债很轻：只要找到横向 d4 rebound，就能覆盖
    target 并回到 B。
  meta: >
    回访时旧的“一推 d4 即可”判断会失败，因为目标仍要被冰占据，同时玩家还要
    抵达右侧 D。玩家需要把同一中部 target / 冰路由重读成多次 d4 与最终出口
    收束的组合，而不是只重复 base 的局部答案。
causal_chain:
  base:
    - "从 A 走到左侧冰后方。"
    - "右推冰，触发 ice_rebound_d4，冰回弹后占据 target。"
    - "目标已满足，玩家回到 B。"
  meta:
    - "从 C 进入后先用 d3 清掉底部冰，释放后续走位/回访空间。"
    - "回到左中部，执行与 base 可识别的横向 d4，覆盖中心 target。"
    - "继续从上方/右侧调整两个右侧冰，用两次 d4 维持/重建 target 与路线状态。"
    - "最后用 d1 短停把右侧出口侧路线收束到 D。"
chain_delta_from_base: >
  Base 只要求识别一次 d4 rebound 与返回 B；meta 要把同一目标区域放进“目标满足
  + D 出口可达”的双目标约束中，三次 d4 不再是平铺重复，而是回访目标改变后的
  路线/状态协调。
why_not_execution: >
  证据支持 C->D 不是从右边直接走通，也不是单次后期机制应用；它有 5 次推冰、
  5 个不可逆 solution commitments，且 required-core 检查没有找到缺少 d3+d4 的
  胜利路径。玩家侧仍需 critic 判断这些 commitments 是否足够形成难度目标。
falsification:
  - "若 A->C、A->D、B->C 或 B->D 可解，则违反本轮 hard pair policy。"
  - "若 base 存在不触发 ice_rebound_d4 的胜利路径，则 base claim 失败。"
  - "若 base 可达扫描命中 ice_destroy_group_d6_plus，则 base 暴露窗口失败。"
  - "若 meta 存在不触发 ice_destroyed_d3 或 ice_rebound_d4 的胜利路径，则 meta required-core claim 失败。"
  - "若 critic 判断三次 d4 只是 ICE_CAND_0004 式平铺教学重复，则审美目标失败。"
```

## evidence

```yaml
commands_run:
  - "npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round19_fresh_v7_layout.txt --id ICE_EXP_META_2026_07_02_round19_v7_base --player-start 1,0 --player-goal 0,2 --max-states 30000 --max-depth 140 --graph-max-states 30000 --write"
  - "npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round19_fresh_v7_layout.txt --id ICE_EXP_META_2026_07_02_round19_v7_meta --player-start 7,7 --player-goal 8,5 --max-states 30000 --max-depth 140 --graph-max-states 30000 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round19_fresh_v7_layout.txt --id ICE_EXP_META_2026_07_02_round19_v7_base_d5_cap --player-goal 0,2 --starts 1,0 0,2 --required-winning-events ice_rebound_d4 --forbidden-reachable-events ice_destroy_group_d6_plus --max-states 30000 --max-depth 140 --graph-max-states 30000 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round19_fresh_v7_layout.txt --id ICE_EXP_META_2026_07_02_round19_v7_meta_required_core --player-goal 8,5 --starts 7,7 --required-winning-events ice_destroyed_d3,ice_rebound_d4 --max-states 30000 --max-depth 140 --graph-max-states 30000 --write"
  - "custom ABCD edge-pair scan using the same runtime, maxStates=30000, maxDepth=140"
  - "custom all-edge-goal scan over 30 perimeter cells, including wall / ice / floor goals"
  - "custom identity-preserving replay of returned base/meta traces, checked against analyzer JSON events"
  - "custom identity-preserving product search for winning-path counterexamples to core_rebound_ice coverage"
  - "custom evidence integrity check reading current v7 JSON / Markdown / layout files"
solver_result:
  base:
    found: true
    cost: 5
    pushes: 1
    graph: "complete, reachable states=651, legal transitions=1618, winning states=4"
  meta:
    found: true
    cost: 31
    pushes: 5
    graph: "complete, reachable states=1070, legal transitions=2620, winning states=2"
trace_summary:
  base_events:
    walk: 4
    push_ice: 1
    ice_rebound_d4: 1
  meta_events:
    walk: 26
    push_ice: 5
    ice_destroyed_d3: 1
    ice_rebound_d4: 3
    ice_stop_short:d1: 1
target_events:
  base_required_winning_events_covered: true
  meta_required_winning_events_covered: true
object_or_instance_evidence:
  status: identity_coverage_supported
  returned_trace_identity_probe: prototypes/ice_slide_escape/reports/ice_identity_trace_probe_ICE_EXP_META_2026_07_02_round19_v7.md
  identity_coverage_probe: prototypes/ice_slide_escape/reports/identity_coverage_probe_ICE_EXP_META_2026_07_02_round19_v7.md
  base_d4_ice_ids:
    - core_rebound_ice
  meta_d4_ice_ids:
    - core_rebound_ice
    - core_rebound_ice
    - core_rebound_ice
  meta_three_d4_same_ice: true
  base_and_meta_core_d4_same_initial_ice: true
  winning_path_counterexample_search:
    base_status: complete
    base_product_states_visited: 780
    base_winning_paths_observed: 4
    meta_status: complete
    meta_product_states_visited: 1480
    meta_winning_paths_observed: 2
    meta_counterexample_missing_core_three_d4_plus_d3: not_found
  limit: "identity coverage proof uses a custom identity-preserving simulator; rerun if runtime rules change"
winning_path_event_checks:
  base_missing_ice_rebound_d4_winning_path: "not found; complete search"
  meta_missing_d3_or_d4_winning_path: "not found; complete search"
reachable_event_exposure:
  base_forbidden_reachable_ice_destroy_group_d6_plus: none
  base_graph_status: complete
graph_or_counterfactual_evidence:
  base_scc: "branching_win_dag, solution irreversible steps=1"
  meta_scc: "branching_win_dag, solution irreversible steps=5"
  counterfactuals: not_run
evidence_limits:
  - "工具未证明玩家心理，只证明 solve / event / graph 事实。"
  - "身份覆盖探针未找到缺少同一核心冰三次 d4 的 meta 胜利路径反例；该探针是自写身份保持模拟器，runtime 规则变化时需重跑。"
  - "没有独立 evidence reviewer，本 packet 不能自行升级 proposal_ready。"
```

证据引用：

```text
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_base.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_meta.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_meta.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round19_v7_base_d5_cap.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round19_v7_base_d5_cap.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round19_v7_meta_required_core.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round19_v7_meta_required_core.json
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_EXP_META_2026_07_02_round19_v7_ABCD.md
- prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round19_v7_ABCD.md
- prototypes/ice_slide_escape/reports/ice_identity_trace_probe_ICE_EXP_META_2026_07_02_round19_v7.md
- prototypes/ice_slide_escape/reports/identity_coverage_probe_ICE_EXP_META_2026_07_02_round19_v7.md
- prototypes/ice_slide_escape/reports/evidence_integrity_check_ICE_EXP_META_2026_07_02_round19_v7.md
```

## diagnostic_routing

```yaml
hard_evidence:
  - base/meta solve traces
  - required winning-event probes
  - forbidden reachable-event probe for base d6 exposure
  - ABCD edge pair scan
  - all-edge-goal scan including wall goals
mechanism_scope:
  - base d5 cap but not strict d4 clean
  - meta required d3+d4 core
claim_hygiene:
  - do not claim accepted / reference / proposal_ready before review
  - do not treat the identity coverage probe as a critic verdict or player-psychology proof
taste_probes:
  - compare against ICE_CAND_0024 as strong cross-visit reuse target
  - compare against ICE_CAND_0022 as acceptable lower-bound meta reference
  - compare against ICE_CAND_0004 as repeated-d4 negative reference
scc_graph:
  requested: true
  reading_rule: "SCC facts require player-facing interpretation before verdict effect"
variant_family:
  archive_lineage: fresh_required
  authorized_archive_variant_work: false
start_position:
  explicit_start_goal_pairs:
    - A->B
    - C->D
prototype_specific_work:
  meta_first_design: enabled_by_human_brief
  interface_pair_policy: enabled_by_handoff_docs
  pre_human_polish_pass: not_run_as_gate
```

## prototype_specific_contracts

```yaml
interface_pair_policy:
  declared_interface_points:
    A: [1, 0]
    B: [0, 2]
    C: [7, 7]
    D: [8, 5]
  target_pairs:
    - A->B
    - C->D
  ignored_pair_classes:
    - C/D->A/B
  risky_pair_classes:
    - A/B/C/D -> edge goals outside A/B/C/D
    - internal non-target pairs not listed under ignored pair classes
pair_diagnostics:
  ignored_pairs:
    - pair: C->A
      solved: true
      verdict_effect: none
      reason: "本轮人工修正明确忽略 C->A/B 反向文档错误类。"
    - pair: C->B
      solved: true
      verdict_effect: none
      reason: "本轮人工修正明确忽略 C->A/B 反向文档错误类。"
  disclosed_selected_interface_returns:
    - pair: B->A
      solved: true
      verdict_effect: none
      reason: "同 base 组选定接口返回；不是 A/B->C/D 类 hard blocker。"
  risky_pairs:
    - scope: A/B->C/D
      solved_pairs: []
      status: clear
    - scope: non_interface_edge_completion
      solved_goals: []
      status: clear
      evidence_scope: all_edge_goals_including_walls
    - scope: wall_edge_goal_completion
      solved_goals: []
      status: clear
```

## scc_graph_interpretations

```yaml
- graph_fact: "base solution irreversible path steps=1; initial SCC out=4, winOut=3, deadOut=1"
  neutral_meaning: "base 只有一次核心不可逆提交，存在少量可逆走位与一个死提交。"
  player_facing_interpretation: "符合轻 base 定位；它不是 meta 难度来源。"
  verdict_effect: merit
- graph_fact: "meta solution irreversible path steps=5; forcedWinPrefix=0/5; final short-stop handoff forced"
  neutral_meaning: "meta 有五次不可逆推进，前段存在可行分支/顺序自由，尾部收束较固定。"
  player_facing_interpretation: "支持 meta 不是单次执行 witness，但是否达到目标难度仍需 critic 判断这些推进是否有玩家侧读法。"
  verdict_effect: merit
- graph_fact: "C->A and C->B are solved, shorter than C->D"
  neutral_meaning: "工具能从 C 到 base 侧接口。"
  player_facing_interpretation: ""
  verdict_effect: none
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
  v7 是本轮 fresh layout 的连续微调；它不从 clean archive 的布局、入口出口关系、
  主因果链或对象角色派生。archive 条目只用于 taste calibration。
```

## attempt_log

```yaml
serious_structural_attempts:
  - id: round18_v4
    outcome: revise_required
    reason: "A/B->C/D 可解，违反未忽略内部非目标 pair 策略。"
  - id: round19_v6
    outcome: held_proposal
    reason: "修复 A/B->C/D，但 A/B 入口相邻，等待人工微调意见。"
  - id: round19_v7
    outcome: current_packet
    reason: "小幅左边缘扩展，A/B 不相邻，同时保留 base/meta 结构。"
local_repairs:
  - "将 A 从 [0,1] 改为 [1,0]，B 保持 [0,2]。"
  - "布局宽度从 8 扩到 9，核心 target / 冰互动保持。"
abandoned_families:
  - "round18_v4 的 A/B->C/D 可达版本"
```

## archive_taste_context

```yaml
examples:
  - candidate_id: ICE_CAND_0024
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 4
    use: positive_high_taste_meta_anchor
    human_comment_summary: >
      人类接受其为强复用 meta 标杆：base/meta 共享中间空间和大量元素，
      不是两个独立子关；base 时间遮蔽 meta 读法，并用物理可达但 target
      状态不兼容的诱惑制造回访价值。人类也指出 AB/CD 相邻是需要主动微调的瑕疵。
  - candidate_id: ICE_CAND_0022
    human_reviewed: true
    aesthetic_score: 3
    difficulty_score: 3
    use: lower_bound_accepted_meta_anchor
    human_comment_summary: >
      人类认为它是扎实可接受的 meta 下界：base 轻、meta 稳，但缺少洞见和空间/
      要素交融复用；不要把它当作审美追求目标。
  - candidate_id: ICE_CAND_0004
    human_reviewed: true
    aesthetic_score: 1
    difficulty_score: 2
    use: negative_repeated_d4_anchor
    human_comment_summary: >
      人类拒绝“三次 d4 堆叠”作为简单教学重复；这要求 critic 专门检查 v7 的
      三次 d4 是否真的由回访目标和路线状态重读支撑，而不是平铺重复。
none_found_reason: null
```

## reviewer_questions

```yaml
evidence_reviewer:
  - "base d5 cap 与 meta required-core 的机器证据是否足以支持当前 design_claim？"
  - "packet 是否仍有任何把 C->A/B 当 caveat 的漂移？"
  - "是否存在没有证据支持的 all-solution 或 object-instance claim？"
puzzle_critic:
  - "v7 的三次 d4 是否区别于 ICE_CAND_0004 的平铺重复？"
  - "A/B 不相邻后，入口观感是否足够自然，还是仍有边缘压缩感？"
  - "与 0024 的强复用锚点相比，v7 是否只有单局部回访而缺少空间/要素交融？"
  - "按用户当前定位，不要求知识差时，meta 是否仍能达到目标难度和审美目标？"
```
