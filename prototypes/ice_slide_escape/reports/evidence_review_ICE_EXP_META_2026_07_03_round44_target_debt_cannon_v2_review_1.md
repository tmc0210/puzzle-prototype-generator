# Evidence Review: ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2

```yaml
review_iteration: review_1
candidate_version_reviewed: ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2
review_input_type: candidate_packet
verdict: not_fully_supported
review_loop_state: needs_revision_or_clarification
required_action: fix_or_clarify_base_exposure_window
```

## 审查范围

本审查只判断当前工作区文件中，候选包及其机器证据是否支持 packet 的 cost、events、required、forbidden、graph、interface 等硬事实声明。不评价隐藏需求，不评价审美、好玩程度、难度分或目标初始状态带来的观感加分。

已读取并核对的主要材料：

- `prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2.zh.md`
- `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_layout.txt`
- `prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_base.md`
- `prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_meta.md`
- `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_base_required_core.md`
- `prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_meta_required_core.md`
- `prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_interface_edges.md`
- 同名前缀辅助探针：`base_no_late`、`meta_required_d6` 的 md/json 文件
- `prototypes/ice_slide_escape/docs/mechanic_exposure_sequence.yml`，仅用于解释机制暴露窗口顺序

## 文件存在性

```yaml
evidence_files_exist:
  layout_file: yes
  base_analysis: yes
  meta_analysis: yes
  base_required_core: yes
  meta_required_core: yes
  interface_scan: yes
  auxiliary_base_no_late: yes
  auxiliary_meta_required_d6: yes
missing_files: []
```

## 受支持的硬事实

```yaml
supported_claims:
  layout_and_interfaces:
    status: supported
    evidence:
      - layout 文件内容与 packet 中的 Layout 文本一致。
      - A=[0,5]、C=[22,5] 均是第 5 行的边缘可进入地面格。
      - B=[10,10] 与 D=[10,10] 是同一个底边出口；packet 已明确声明二者是同一物理出口。

  base_solution_cost_events_graph:
    status: supported
    evidence:
      - base analysis 报告 Found yes、Cost 29、Depth 29。
      - base returned event counts 为 walk=25、push_ice=4、ice_blocks_ice_no_chain_push=1、ice_destroyed_d3=2、ice_rebound_d4=2。
      - packet 列出的核心事件计数 push_ice=4、ice_destroyed_d3=2、ice_rebound_d4=2 与 analysis 一致。
      - base graph status complete，reachable_states=922，winning_states=1。
      - base SCC irreversible path steps=4，forcedWinPrefix=2/4，与 packet 的 irreversible_steps=4、forced_win_prefix=2 一致。

  meta_solution_cost_events_graph:
    status: supported
    evidence:
      - meta analysis 报告 Found yes、Cost 23、Depth 23。
      - meta returned event counts 为 push_ice=3、ice_destroy_group_d6_plus:len2=1、slide_restart_after_group=1、ice_blocks_ice_no_chain_push=2、ice_destroyed_d3=2、walk=20、ice_rebound_d4=1。
      - packet 列出的核心事件计数 push_ice=3、ice_destroy_group_d6_plus=1、slide_restart_after_group=1、ice_destroyed_d3=2、ice_rebound_d4=1 与 analysis 一致。
      - meta graph status complete，reachable_states=1725，winning_states=3。
      - meta SCC irreversible path steps=3，forcedWinPrefix=2/3，与 packet 的 irreversible_steps=3、forced_win_prefix=2 一致。

  base_required_core:
    status: supported_at_event_type_level
    evidence:
      - base_required_core 声明 Required winning-path events: ice_destroyed_d3, ice_rebound_d4。
      - 缺少 required winning events 的胜利路径未找到；搜索状态 complete，explored=952。
      - 返回解确实包含 ice_destroyed_d3 与 ice_rebound_d4。
    limit:
      - 该证据证明事件类别必经，不证明所有胜利路径都使用返回解中的同一对象、同一坐标、同一步序或同样精确次数。

  meta_required_core_and_d6:
    status: supported
    evidence:
      - meta_required_core 声明 Required winning-path events: ice_destroy_group_d6_plus, ice_destroyed_d3, ice_rebound_d4。
      - 缺少 required winning events 的胜利路径未找到；搜索状态 complete，explored=2087。
      - meta_required_d6 辅助探针单独要求 ice_destroy_group_d6_plus，也报告缺少该事件的胜利路径未找到；搜索状态 complete，explored=1722。
      - meta returned solution 第一步包含 ice_destroy_group_d6_plus:len2 与 slide_restart_after_group。
    conclusion:
      - meta required d6 成立，且比仅返回解事件更强：当前证据覆盖所有胜利路径的事件类别需求。

  interface_scan:
    status: supported
    evidence:
      - interface_edges 报告 solved_edge_pairs 为 2。
      - 两个解出实例分别是 [22,5]->[10,10] cost 23 与 [0,5]->[10,10] cost 29。
      - interface_edges 明确写明 No additional solved edge-goal pairs were found by this scan。
    limit:
      - 因 B 和 D 是同一物理出口，该证据只支持两个 solved edge instances，不支持四接口拓扑。

  returned_route_snapshots:
    status: supported_as_returned_route_facts
    evidence:
      - base step 5 右推左 target 冰，触发 push_ice、ice_blocks_ice_no_chain_push、ice_destroyed_d3，快照显示左 target 进入 debt。
      - base step 9 右推右 target 冰，触发 push_ice、ice_destroyed_d3，快照显示右 target 进入 debt。
      - base step 16 与 step 22 分别触发 ice_rebound_d4，快照显示右、左 target 被回填。
      - meta step 1 左推右侧冰，触发 ice_destroy_group_d6_plus:len2、slide_restart_after_group 与 ice_destroyed_d3，快照显示右侧墙对被移除。
      - meta step 13 左推右 target 冰，触发 ice_destroyed_d3，快照显示右 target 进入 debt。
      - meta step 20 触发 ice_rebound_d4，快照显示右 target 被回填。
```

## 主要问题：base 暴露窗口未被严格支持

```yaml
issue:
  severity: blocking_for_packet_as_written
  claim:
    - packet 写明 allowed_exposure.base: through_ice_rebound_d4。
    - 用户要求重点检查 base 是否满足 d6 前或更早知识窗口，尤其无 d5/restart/d6 可达。
  evidence:
    - mechanic_exposure_sequence.yml 中，ice_boundary_disappear 位于 ice_rebound_d4 之后、ice_pass_through_d5 之前。
    - base_required_core 与 base_no_late 的 forbidden reachable events 只配置了 ice_pass_through_d5、slide_restart_after_group、ice_destroy_group_d6_plus。
    - base_required_core/base_no_late 的完整可达事件计数均报告 ice_boundary_disappear:d5=5 与 ice_boundary_disappear:d1=2。
    - 同时，这些扫描确实报告 ice_pass_through_d5、slide_restart_after_group、ice_destroy_group_d6_plus 的 Forbidden reachable hits: none。
  review_conclusion:
    - 窄口径 claim “base 无 ice_pass_through_d5、restart、d6+ 可达”受支持。
    - 严格 claim “base 暴露只到 ice_rebound_d4 / through_ice_rebound_d4”不受支持，因为 d4 之后的 boundary_disappear 分支在完整可达扫描中出现。
    - 如果把“无 d5 可达”理解为任何带 d5 标签的可达事件，ice_boundary_disappear:d5=5 也是直接矛盾；如果只理解为 ice_pass_through_d5，则该窄项通过，但 packet 的 through_d4 标签仍然过强。
  required_action:
    - 要么将 packet 的 base allowed_exposure 降格为明确允许 boundary_disappear、但禁止 pass-through d5/restart/d6+；
    - 要么重新生成包含 ice_boundary_disappear / ice_boundary_disappear_after_group forbidden reachable 的 base 证据，并证明没有命中。
```

## 未声明或需降格的证据边界

```yaml
claim_hygiene:
  omitted_noncore_events:
    status: caveat
    detail:
      - base returned solution 还含 ice_blocks_ice_no_chain_push=1。
      - meta returned solution 还含 ice_blocks_ice_no_chain_push=2。
      - packet 的 events 列表若只作为核心事件摘要则可接受；若作为完整事件计数则不完整。

  object_participation:
    status: not_proven
    detail:
      - base/meta analysis 均写明 No instance-level object participation was reported。
      - 因此 target-debt、墙对重写、共享 refill room 等说法可作为返回解快照解读，但不能升级为逐对象 all-solution necessity 证明。

  exact_all_solution_counts:
    status: not_proven
    detail:
      - required probes 证明事件类别必经，不证明所有胜利路径的 push 数、d3 数、d4 数或具体坐标与返回解完全一致。

  meta_first_step_wording:
    status: supported_with_wording_caveat
    detail:
      - meta 第一步同一输入内同时触发 d6+、restart、ice_blocks_ice_no_chain_push、ice_destroyed_d3。
      - packet 中“after the restart it dies against the right target ice”可按同一步事件序列阅读；不应理解为单独的后续玩家动作。
```

## 结论

```yaml
final_verdict: not_fully_supported
summary:
  - cost、returned events、complete graph、SCC 摘要、base/meta required event-type gates、meta required d6、interface solved_pairs=2 均有当前证据支持。
  - B/D 同一物理出口的 caveat 被 packet 正确披露；接口证据不支持四接口拓扑，也没有声称应给四接口加分。
  - 当前最大问题是 base allowed_exposure 写成 through_ice_rebound_d4，但完整可达扫描报告 ice_boundary_disappear:d5 与 ice_boundary_disappear:d1。该证据与严格 d4 知识窗口不一致。
  - 因此，按当前 packet 原文不能给出完整 evidence pass；需要修正 base 暴露声明或补充更严格的 forbidden reachable 证据。
```
