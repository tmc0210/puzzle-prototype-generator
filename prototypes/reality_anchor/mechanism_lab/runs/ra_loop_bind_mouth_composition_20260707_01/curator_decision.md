# Curator Decision: ra_loop_bind_mouth_composition_20260707_01

- gap_id: `ra_gap_bind_to_mouth_composition`
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

本轮材料有价值，但原先把它写成 `B/S 绑定债` 的 supplement 归属过宽。机制角色如下：

- active_rule：`sticky rigid movement` 与墙口前沿检查。
- material_source：B/S 只负责把两个 crate 转成 sticky 材料，让它们形成竖向 connected footprint。
- consumer：右侧上沿墙齿目标口消费 sticky footprint 的推动前沿。
- incidental：两个 crate 都进入 sticky side 并 merge 之后，B/S 边界不再参与关键观察点。
- 关键观察点：最后一步向右推 sticky footprint 进入目标口时，结果是 `force_blocked` 还是 pass。

四个 case 显示的是 sticky connected footprint 被 `刚体黏块 + 墙口` 的前沿墙齿 consumer 消费：

- `bs_pair_tooth_connected_block`：固定 B/S 下两个 crate 先后跨线并 merge 成竖向二连；同一目标口的上格被墙齿关闭，最后一步 `right` 为 `force_blocked`。
- `bs_single_tooth_lower_pass`：去掉上格 crate 后，单格 sticky 通过同一目标口。
- `bs_pair_open_two_cell_mouth_pass`：保持竖向二连，但打开上格目标口后整体通过。
- `bs_gap_parts_tooth_shortcut`：两个 crate 隔行跨线保持分离，下格部件绕过同一墙齿。

差异来自 connected footprint 前沿是否被 mouth 完整开放，而不是来自 B/S 边界位置、跨线顺序或 push driver。B/S anchor 已在 rerun 中用墙槽固定，状态图不再混入移动边界刷产物；这也意味着 B/S 在关键观察点前已经退场。

本轮结论已由 `ra_loop_bind_shape_spectrum_20260707_01` 扩展成完整 sticky 前沿形状谱；当前 decision 作为归属纠偏记录保留。

## Lexicon Changes

- 不在 `B/S 绑定债` 中按边界证据收录本轮；只保留归属边界说明：B/S 在本轮是 material_source。
- 在 `刚体黏块 + 墙口` 中把本轮作为 sticky 竖向二连进入墙口的对象行为证据，并由后续 `ra_loop_bind_shape_spectrum_20260707_01` 合并扩展。
- `run=ra_loop_bind_mouth_composition_20260707_01` 的证据 tags 只保留 `runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`；不使用 `composition_probe` 来暗示 B/S 边界仍在关键观察点起作用。

## Index Changes

- `B/S 绑定债` 不因本轮提高证据强度；仍缺 active B/S 边界造成差异的 producer / selector probe。
- `刚体黏块 + 墙口` 记录本轮为 sticky 前沿墙齿消费证据；完整形状谱由 `ra_loop_bind_shape_spectrum_20260707_01` 收口。

## Backlog Changes

- `ra_gap_bind_to_mouth_composition` 标记为 `closed`，并 relabel 到 `刚体黏块 + 墙口`；它不再作为 B/S 边界 gap 延展。
- 后续形状枚举由 `ra_gap_bind_bar_lshape_reverse_force` / `ra_loop_bind_shape_spectrum_20260707_01` 收口后，也改归 sticky 墙口对象行为。

## Next Round Suggestion

默认不再沿着 “B/S 产出更多形状再推入墙口” 继续枚举。若继续 sticky 墙口方向，应跑 `ra_gap_sticky_shape_handle_return`；若回到 B/S 方向，必须设计让边界位置、跨线顺序或移动边界刷产物在关键观察点仍然造成差异的 case。
