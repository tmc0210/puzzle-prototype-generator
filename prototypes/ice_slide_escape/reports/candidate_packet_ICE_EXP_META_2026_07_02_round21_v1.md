# Serious Candidate Packet: ICE_EXP_META_2026_07_02_round21_v1

本文件是送 evidence reviewer / puzzle critic / 人工复审的候选包，不是通过结论。

```yaml
packet_status: ready_for_review_input
candidate_id: ICE_EXP_META_2026_07_02_round21_v1
prototype: ice_slide_escape
review_loop_state_before_review: held_proposal
review_integrity_before_review: self_review_only
archive_eligibility_before_review: raw_run_only
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
```

## prototype_context

```yaml
confirmed_rules:
  - 玩家四向移动，推冰后冰自动滑行并按距离分支结算。
  - 胜利要求所有 target 被冰占据，且玩家到达显式指定的 edge goal。
  - 每个 player_start / player_goal pair 是独立 solve instance，不能合并成 any-edge。
win_condition: ice_slide_escape_explicit_goal
tool_boundary:
  - solver/analyzer 提供事实，不给审美 verdict。
  - 当前证据是单关多 start/goal instance，不证明未来大地图 runtime。
  - 当前未调用独立 reviewer / critic；本 packet 只能作为送审输入。
prototype_specific_workflows:
  meta_first_design: enabled_by_human_brief
  interface_pair_policy: enabled
```

## slot_brief

```yaml
intended_role: meta_first_design candidate
known_before:
  base: all_known
  base_reason: >
    base 返回解核心为 d4，但完整可达扫描会命中 boundary / d5 / d6 等晚期事件；
    因此本候选不声称 early d4 clean，只声明 base 在全知识或后期复习阶段可用。
  meta: all_known
target:
  base_instance: A->B
  meta_instance: C->D
difficulty_or_support_expectation:
  base: "2"
  meta: "3- working target"
  aesthetic: "4 lower-bound target; pursue 5 only if critic accepts compact B=C re-entry as elegant"
```

## solve_instance

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round21_v1_layout.txt
layout: |
  ##########
  ######.###
  ######.###
  ##.....###
  ..I###.###
  #.I..G.#.#
  #......#.#
  #.....I..#
  ######.###
interfaces:
  A: [0, 4]
  B: [6, 8]
  C: [6, 8]
  D: [6, 0]
interface_note: >
  B and C intentionally coincide: the first visit exits through the bottom cell,
  and the meta visit re-enters from that same reset edge cell. This should be
  reviewed as a compact chain/re-entry interface, not as four distinct doors.
base_instance:
  player_start: [0, 4]
  player_goal: [6, 8]
meta_instance:
  player_start: [6, 8]
  player_goal: [6, 0]
```

## mechanism_scope

```yaml
central:
  base:
    - "用左下横向冰的 d4 rebound 覆盖唯一 target。"
    - "随后清理底部竖向冰，离开到 B/C。"
  meta:
    - "从 B/C 回访时，第一步将底部竖向冰向上 d6，打开顶部 D 列。"
    - "再回到左下，复用 base 的横向 d4 target 填充结构。"
allowed_support:
  - walk reposition
  - bottom exit cleanup may be d2 short-stop or boundary disappearance on equivalent winning paths
required_winning_path_events:
  base:
    - ice_rebound_d4
  meta:
    - ice_destroy_group_d6_plus
    - ice_rebound_d4
forbidden_winning_path_events:
  base: []
  meta: []
forbidden_if_seen_anywhere:
  base: []
  meta: []
```

## design_claim

```yaml
player_insight:
  base: >
    A->B 是轻量 base：玩家要发现左下横向冰并不是普通推到 target，
    而是通过 d4 rebound 落到 target；底部出口清理只是收束。
  meta: >
    C->D 从同一个底部格重入，旧的 base 目标填充仍然必要，但入口目标反转：
    先用竖向 d6 打开顶部通道，再回收 base 的 d4 目标结构，形成同布局的
    后期重读。
causal_chain:
  base:
    - "A 进入左下区域。"
    - "右推 [2,5] 的冰，触发 ice_rebound_d4，冰回弹到 [5,5] target。"
    - "清理 [6,7] 竖向冰并走到 B/C。"
  meta:
    - "C/B 处重入，立即上推 [6,7] 的冰，触发 d6 group destruction，打开 [6,0]。"
    - "回到左下区域，执行同一个 d4 rebound 填 target。"
    - "沿已打开的竖向通道到达 D。"
chain_delta_from_base: >
  Base 把 [6,7] 冰当作底部出口收束；meta 把同一冰改读为第一步开顶层 D 的
  后期钥匙。横向 d4 target 填充是共享结构，入口/出口目标改变后获得不同角色。
why_not_execution: >
  工具证据支持 meta 所有胜利路径都需要 d6+d4，且 A->D 不可解；不过 meta 只有
  两次核心 push，是否足以达到 3 分难度需要 critic 攻击。controller 不把它自评为 5。
falsification:
  - "若 A->D 可解，则 meta-first pair policy 失败。"
  - "若 A->B 存在不触发 ice_rebound_d4 的胜利路径，则 base claim 失败。"
  - "若 C->D 存在不触发 ice_destroy_group_d6_plus 或 ice_rebound_d4 的胜利路径，则 meta claim 失败。"
  - "若 critic 认为 B=C re-entry 过窄或像顺序门，本候选应 downgrade_or_hold。"
```

## evidence

```yaml
commands_run:
  - "npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape - --id ICE_EXP_META_2026_07_02_round21_v1_base --player-start 0,4 --player-goal 6,8 --max-states 120000 --graph-max-states 120000 --max-depth 120 --write"
  - "npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape - --id ICE_EXP_META_2026_07_02_round21_v1_meta --player-start 6,8 --player-goal 6,0 --max-states 120000 --graph-max-states 120000 --max-depth 120 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape - --id ICE_EXP_META_2026_07_02_round21_v1_base_required_d4 --player-goal 6,8 --starts 0,4 --required-winning-events ice_rebound_d4 --max-states 120000 --graph-max-states 120000 --max-depth 120 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape - --id ICE_EXP_META_2026_07_02_round21_v1_meta_required --player-goal 6,0 --starts 6,8 --required-winning-events ice_destroy_group_d6_plus,ice_rebound_d4 --max-states 120000 --graph-max-states 120000 --max-depth 120 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape - --id ICE_EXP_META_2026_07_02_round21_v1_pair_goal_B --player-goal 6,8 --starts 0,4 6,8 --max-states 120000 --graph-max-states 120000 --max-depth 120 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape - --id ICE_EXP_META_2026_07_02_round21_v1_pair_goal_D --player-goal 6,0 --starts 0,4 6,8 --max-states 120000 --graph-max-states 120000 --max-depth 120 --write"
  - "controller script scan summarized in prototypes/ice_slide_escape/reports/edge_goal_scan_ICE_EXP_META_2026_07_02_round21_v1.md"
base:
  result: solved
  cost: 10
  pushes: 2
  returned_events:
    - ice_rebound_d4
    - ice_stop_short:d2
  graph: "complete, states=2529, transitions=6780, wins=6"
  required_core_gate:
    ice_rebound_d4: pass
    missing_required_path: not_found_complete_search
meta:
  result: solved
  cost: 20
  pushes: 2
  returned_events:
    - ice_destroy_group_d6_plus:len1
    - ice_boundary_disappear_after_group
    - ice_rebound_d4
  graph: "complete, states=820, transitions=2121, wins=3"
  required_core_gate:
    ice_destroy_group_d6_plus: pass
    ice_rebound_d4: pass
    missing_required_path: not_found_complete_search
pair_policy:
  standable_edge_starts:
    - [0, 4]
    - [6, 8]
  target_pairs:
    A_to_B: solved
    C_to_D: solved
  non_target_pairs:
    A_to_D: unsolved
    C_to_A: solved_ignored_reverse_pair
    C_to_B: solved_same_cell_return_after_target
  external_edge_escape: none_found_in_controller_scan
evidence_limits:
  - "B=C re-entry is a design choice and needs critic approval."
  - "base all-known stage is required; this is not an early d4-clean candidate."
  - "meta difficulty target is controller working read only; independent critic or human review must judge."
  - "No independent reviewer/critic artifact has been produced in this turn."
```

## diagnostic_routing

```yaml
hard_evidence:
  - base/meta solve traces
  - required winning-event probes
  - pair goal B/D scans
mechanism_scope:
  - base all-known, core d4
  - meta all-known, required d6+d4
claim_hygiene:
  - do not claim accepted / reference / proposal_ready before review
  - do not overclaim base early-stage cleanliness
  - do not overclaim meta difficulty above 3 without critic/human support
taste_probes:
  - "Check against ICE_CAND_0024: strong reference has more shared-space interweaving."
  - "Check against ICE_CAND_0034: low-difficulty accepted meta where meta disrupts/reuses base structure."
  - "Check against ICE_CAND_0004: avoid calling a simple repeated witness a challenge."
scc_graph:
  - "base branching_win_dag, not forced; supports light base."
  - "meta one_win_continuation_per_scc, forced early d6; potential scriptiness caveat."
prototype_specific_work:
  meta_first_design: enabled
  interface_pair_policy: enabled
  pre_human_polish_pass: not_run
```

## archive_taste_context

```yaml
examples:
  - candidate_id: ICE_CAND_0024
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 3
    use: positive_high_taste_meta_anchor
    note: "强空间/要素复用；本候选明显更小，应被当作 compact lower-bound 而非标杆。"
  - candidate_id: ICE_CAND_0034
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 2
    use: accepted_low_difficulty_meta_anchor
    note: "base 轻，meta 约 3；用于校准低难但有回访改读的下界。"
  - candidate_id: ICE_CAND_0004
    human_reviewed: true
    aesthetic_score: 1
    difficulty_score: 1
    use: negative_repeated_witness_anchor
    note: "警惕把简单 witness 堆叠包装成高难或高审美。"
none_found_reason: null
score_claim_allowed: true
```

## reviewer_questions

```yaml
evidence_reviewer:
  - "required d4 / d6+d4 gates 是否支持当前收窄后的 claim？"
  - "B=C re-entry 是否需要额外 edge-pair 分类，还是可作为声明的 shared interface 处理？"
  - "pair_goal_B / pair_goal_D / edge_goal_scan 是否足以支持 A->D clear、C->A ignored、C->B same-cell return 的接口事实？"
puzzle_critic:
  - "B=C 的链式重入是优雅压缩，还是过窄导致 meta 感不足？"
  - "meta 只有两次 push，是否仍可作为难度 3-，还是应降为 2？"
  - "整体审美是否达到 4 下界，或只是功能性 meta connector？"
```
