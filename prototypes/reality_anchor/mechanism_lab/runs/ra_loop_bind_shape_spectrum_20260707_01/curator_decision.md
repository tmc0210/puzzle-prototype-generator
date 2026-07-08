# Curator Decision: ra_loop_bind_shape_spectrum_20260707_01

- gap_id: `ra_gap_bind_bar_lshape_reverse_force`
- explorer_outputs:
  - `brief.md`
  - `cases.yml`
  - `cases.json`
  - `results.json`
  - `report.md`
  - `explorer_notes.md`
  - `proposed_families.md`
- decision: `relabel`

## Rationale

本轮材料有价值，但 explorer 给出的 B/S 归属不成立。机制角色如下：

- active_rule：`sticky rigid movement` 与墙口前沿检查。
- material_source：B/S 只负责把 crate 转成 sticky 材料，使 runtime 合法地产生 2 格、3 格、L 形和分离 footprint。
- consumer：右侧墙口 / 目标口消费 sticky footprint 的推动前沿。
- incidental：所有相关对象都进入 sticky side 后，B/S 边界位置和跨线时机不再参与关键观察点。
- 关键观察点：最后一次右推 sticky footprint 进墙口时，结果是 `force_blocked` 还是 pass。

因此，本轮不应作为 `B/S 绑定债` 的边界证据，也不应把 `bs_bind_shape_spectrum_mouth` 按 B/S family 收录。它应改归 `刚体黏块 + 墙口` 的对象行为 / consumer 形状谱。

保留为一个近邻形状谱，而不是拆成 2 格、3 格、L 形多个族，原因是：

- 局部问题相同：sticky 刚体被向右推入墙口，门口要看整块前面有没有路。
- 结构旋钮相同：footprint 形状、前沿口宽、connected / separated。
- 消费方式相同：墙口是否完整开放 footprint 的推动前沿。
- 反例边界相同：分离部件不共享前沿债；补上缺失前沿格后 blocked 变 pass。

证据中 `bs_shape_three_bar_three_mouth_pass` 和 `bs_shape_l_notch_pass` 的可达图触到 state budget，但动作回放和最终动作表足够支持 pass / block 对照；不把这些 case 的 graph completeness 写成结论。

## Lexicon Changes

- 从 `B/S 绑定债` 中移除 / 降级 shape spectrum 证据，新增归属边界说明：`ra_loop_bind_mouth_composition_20260707_01` 与 `ra_loop_bind_shape_spectrum_20260707_01` 不作为 B/S 边界证据。
- 在 `刚体黏块 + 墙口` 中添加“黏块前沿形状谱补充（B/S 仅材料来源）”。
- `run=ra_loop_bind_shape_spectrum_20260707_01` 的证据 tags 只保留 `runtime_observed,bounded_graph,consumption_probe`；不使用 `composition_probe` 来暗示 B/S 边界仍在关键观察点起作用。

## Index Changes

- `B/S 绑定债` 的机制角色说明改为：B/S 是 active_rule 仅限对象跨线、身份变化、粘连 / 分离由边界造成差异的观察点；若 B/S 只生成材料，后续归入下游 consumer。
- `B/S 绑定债` 的仍缺字段改为：跨线顺序、边界位置或可移动边界仍在关键观察点造成差异的 producer / selector probe。
- `刚体黏块 + 墙口` 的机制角色说明改为：sticky 刚体和墙口 consumer 是 active_rule；B/S 只在部分 run 中作为 material_source。
- `刚体黏块 + 墙口` 的仍缺字段改为：已补 sticky 形状谱接入前沿墙齿；仍缺“前沿能过但玩家把手 / 回位不足”的消费谱。

## Backlog Changes

- `ra_gap_bind_to_mouth_composition` 与 `ra_gap_bind_bar_lshape_reverse_force` 标记为 `closed`，并说明二者已 relabel 到 `刚体黏块 + 墙口`，不作为 B/S 边界 gap。
- 新增 / 改名 `ra_gap_sticky_shape_handle_return`，把下一轮探索焦点从“形状能不能过口”移到“形状前方能过，但玩家有没有把手 / 回位”。

## Next Round Suggestion

默认下一轮不再枚举 2 格 / 3 格 / L 形的镜像或横竖版本。若继续此方向，跑 `ra_gap_sticky_shape_handle_return`：可以预置 sticky，也可以用 B/S 生成 sticky；但 brief / proposed family 必须标明 B/S 是 material_source，关键观察点是玩家把手 / 回位。若要回到 B/S 方向，下一轮必须让边界位置、跨线顺序或移动边界刷产物在关键观察点仍然造成差异。
