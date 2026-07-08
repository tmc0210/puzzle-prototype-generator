# Explorer Notes: pl_boundary_multi_box_force_chain

## 读取与执行范围

- 已读取：本 topic brief、round_manifest、Reality Anchor README、mechanic.yml、mechanics.ts、runtime.ts、localExperimentRunner.ts、机制实验流程文档。
- 未读取：design_archive、候选关卡、人类评价、sampler profile。
- 只写入本 topic 目录下的 `cases.yml`、runner 产物、`explorer_notes.md`、`proposed_families.md`。

## 本轮假设

P/L anchor 被封在壁龛里，只提供全局 P/L 分界，避免锚点移动污染状态图。有效比较放在 x=4/x=5 的边界邻域：玩家先在 P 侧推 2/3 箱同轴链，再经侧路实际跨到 L 侧，最后用 L 侧 pull 的前格门和身后一格抽取规则消费同一组箱子。

关键观察点不是“普通多箱可以推”，而是：

- P 侧 `push_object` 会通过 `force_chain:n*` 同时搬动整条箱链。
- 玩家跨到 L 侧后，`pull_object` 只抽身后一格近端箱，不会把同轴远端箱链一起带走。
- L 侧如果前格被占，即使身后一格有箱，也会被 `pull_world_front_blocked` 明确门控。

## 逐 case 判定

| case | true boundary gate | 事件支撑 | 普通推链重复风险 |
| --- | --- | --- | --- |
| `pl_chain2_pull_extract_near_end` | 通过。第 1 步在 P 侧右推二箱链；第 4 步从 x=4 跨到 x=5 进入 L 侧；第 7 步在 L 侧抽身后近端箱。 | 第 1 步 `push_object:crate#1, force_chain:n2`；第 7 步 `pull_object:crate#2`。最终为 `C:4,4;6,4`，说明近端箱被抽到 x=6，远端箱留在 x=4。 | 中等。若只看第 1 步会退化为普通二箱推链；有效性来自跨界后的 L 侧单箱抽取和残余资源分配。 |
| `pl_chain3_pull_extract_near_end` | 通过。第 1 步在 P 侧右推三箱链；第 5 步跨到 L 侧；第 8 步在 L 侧抽三箱链近端。 | 第 1 步 `push_object:crate#1, force_chain:n3`；第 8 步 `pull_object:crate#3`。最终为 `C:3,4;4,4;6,4`，比二箱 case 多留下一个连续残余箱。 | 低到中等。链长旋钮有明确资源差异，但解释必须绑定 L 侧只抽近端，否则会被误写成“更长推链”。 |
| `pl_chain2_pull_front_gate_blocked` | 通过，作为反例/门控 case。第 1 步 P 侧二箱推链；第 4 步跨入 L 侧；第 7 步尝试 L 侧抽取时，前格有第三个箱，动作被拒绝。 | 第 1 步 `push_object:crate#1, force_chain:n2`；第 7 步 illegal，reason=`pull_world_front_blocked`。最终动作表中左右都被 `pull_world_front_blocked` 拒绝。 | 低。这个 case 的价值主要是前格门，不是推链成功；不能当作“不可回返”或“链无法处理”的证明。 |
| `pl_chain2_pull_opens_lower_pocket` | 通过，且是 consumption probe。第 1 步 P 侧二箱推链；第 4 步跨入 L 侧；第 7 步 L 侧抽近端箱；第 11-12 步使用被抽空的 x=5 口进入下方口袋。 | 第 1 步 `push_object:crate#1, force_chain:n2`；第 7 步 `pull_object:crate#2`；后续 walk 到 `+`，说明被近端箱让出的口可被移动 consumer 使用。回返搜索 complete no。 | 低。这里的差异被下方单格口袋消费；不是单纯证明 push chain 或 pull event 出现。 |

## 结论范围校准

- 已支撑：同轴 2/3 箱链在 P 侧作为整体推链移动，跨到 L 侧后只抽近端，链长会改变残余资源数量与位置。
- 已支撑：L 侧前格门优先于身后抽取；前格被箱占用时，即使身后一格有箱，也不会发生 pull。
- 已支撑：近端抽取可以打开一个单格口，作为 shortcut/口袋 consumer。
- 未支撑：P/L anchor 自身参与力链移动、箱 + anchor 混合资源差异、垂直链/并排箱谱、目标覆盖胜利逻辑。
- 回返性：`pl_chain2_pull_extract_near_end` 和 `pl_chain3_pull_extract_near_end` 的 `returnToInitial.status=exhausted` 只能写未知；`pl_chain2_pull_opens_lower_pocket` 是 complete no；前格门 case 因 illegal replay 不适用回返搜索。

## 机制角色

- `active_rule`: P/L push-chain vs pull-extract semantics；具体包括 P 侧 `force_chain:n*`、L 侧 `pull_object`、L 侧 `pull_world_front_blocked`。
- `material_source`: 两个或三个普通 crate；封闭 P/L anchor 只提供 P/L 分界。
- `consumer`: 侧向跨界通路、前格阻挡箱、下方单格口袋。
- `incidental`: 目标格只用于满足 level 解析或显示口袋终点；没有把胜利条件作为关键观察点。
