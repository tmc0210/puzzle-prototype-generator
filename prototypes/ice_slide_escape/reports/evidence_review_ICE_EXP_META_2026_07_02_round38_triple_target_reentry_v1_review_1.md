```yaml
review_iteration: 1
candidate_version_reviewed: ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1
review_input_type: candidate_version
verdict: does_not_support_claim
review_loop_state: revise_required
required_action: evidence_disagreement_for_next_review
review_scope: hard_evidence_only
```

## supported

- 布局、A/B/C/D 接口、`B=D=[26,5]`、目标 pair `A->B` 与 `C->D`：被 `D:\Developer\sokoban\prototypes\ice_slide_escape\reports\ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_interface_edges.zh.md` 支持。
- 初始 target/ice：`target_ice_cells=[[4,4],[12,4],[20,4]]`、`ice_count=3`、`target_count=3`、`extra_off_target_ice_count=0`：被接口静态扫描支持。
- 无额外外部边缘出口：`edge_floor_cells=[[11,0],[0,3],[26,5]]` 且 `external_edge_floor_cells_outside_declared_interfaces=[]`：被接口摘要支持。
- 静态封锁：`A->B`、`C->B/D`、`A->C` 在初始冰作为 blocker 时均 `found:false`：被接口摘要支持。
- base 返回解：`found yes`、`cost=44`、事件计数 `walk=38,push_ice=6,ice_rebound_d4=6`、图 `complete, states=25016, transitions=59155, wins=1`：被 `D:\Developer\sokoban\prototypes\ice_slide_escape\reports\layout_analysis_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_base.md` 支持。
- meta 返回解：`found yes`、`cost=30`、事件计数 `walk=26,push_ice=4,ice_rebound_d4=4`、图 `complete, states=4763, transitions=11465, wins=1`：被 `D:\Developer\sokoban\prototypes\ice_slide_escape\reports\layout_analysis_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_meta.md` 支持。
- base `ice_rebound_d4` winning-path 必经：缺少 required event 的胜利路径未找到，完整搜索 `explored=25015`；base forbidden reachable hits 为 `none`，扫描 complete。证据来自 `D:\Developer\sokoban\prototypes\ice_slide_escape\reports\start_comparison_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_base_required_latest.md`。
- meta `ice_rebound_d4` winning-path 必经：缺少 required event 的胜利路径未找到，完整搜索 `explored=4762`。证据来自 `D:\Developer\sokoban\prototypes\ice_slide_escape\reports\start_comparison_ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_meta_required_d4.md`。
- exposure 顺序：`ice_stop_short`、`ice_destroyed_d3` 在 `ice_rebound_d4` 前，`ice_boundary_disappear`、`ice_pass_through_d5`、`slide_restart_after_group`、`ice_destroy_group_d6_plus` 在 d4 后；base 完整可达扫描未命中这些 later forbidden events。证据来自 `D:\Developer\sokoban\prototypes\ice_slide_escape\docs\mechanic_exposure_sequence.yml` 与 base required report。
- 接口 pair 诊断：`A->B cost 44`、`C->D cost 30`、`B/D->B/D cost 0`；`A->C cost 20` 已作为 internal non-target risk 披露，`B->C` 不可解。被两份 interface goal report 与接口摘要支持。

## unsupported

- packet 的 causal-chain / player-insight 文本把返回解对象序列提升为更强的必然性：例如 `A->B 依次处理三枚 target 冰`、`上廊断点保证不能跳过中间 target 直奔右侧`、meta `复用后两枚 target 冰`、以及“玩家必须”按指定 target debt 序列操作。现有证据支持“返回解快照中发生了这些步骤”，但不支持“所有胜解中每个指定 target 冰都必经处理 / 中间 target 不可跳过”的 per-object necessity。
- 原因：base/meta layout analysis 均写明 `No instance-level object participation was reported on the returned solution`；required winning-path probes 只检查 `ice_rebound_d4` 是否必经，没有检查具体对象、具体 target、精确 d4 次数、或 no-skip counterfactual。

## evidence_limits

- graph complete 可支持完整 reachable scan、required-event gate 与 forbidden reachable gate；不能单独证明玩家理解、审美价值、难度目标或 meta 重解释价值。
- 返回解成本与事件计数是 shortest returned solution 事实，不等于所有胜解的精确事件计数。
- 若候选将 causal-chain 文本改写为“返回解展示的序列”，当前证据可支持；若保留“必须处理每个指定 target / 不能跳过中间 target”的硬声明，需要补 object-aware all-solution 证据或相应 counterfactual probe。
