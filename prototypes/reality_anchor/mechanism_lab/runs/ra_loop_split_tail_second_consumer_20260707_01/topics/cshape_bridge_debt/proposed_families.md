# Proposed Families: cshape_bridge_debt

## 主要 proposed family

### `cshape_bridge_single_cell_mouth`

一句话：固定 B/S 把 C 形 sticky 左柱切成 crate 桥债后，单格墙口可以消费其中格 crate；未切断 C 形在同一墙口被整体 footprint 阻断。

机制角色：

- `固定 B/S 断桥`：active producer。它把 connected C 形 sticky footprint 改写成左柱 crate 桥 + 两个 sticky 端点。
- `左柱 crate 桥债`：material/output debt。它不是成果本身，而是等待第二段结构消费的对象资源。
- `单格墙口 / 上下墙齿`：active consumer。它只允许单格 crate 进入，拒绝未切断 C 形的整体 sticky footprint。
- `上端点目标袋`：本 topic 中只作为已知背景接口；本轮不把端点进目标写成新成果。

关键观察点：

- 正例 `split_bridge_narrow_mouth_pass`：第一步产生 `sticky_to_box:n3,sticky_split:n1`；最后一步是 `push_object:crate#2`，左柱中格 crate 进入单格墙口。
- 未切断反例 `unsplit_cshape_narrow_mouth_block`：同一动作串最后一步为 `force_blocked`，说明墙口拒绝 connected C 形 footprint。
- 预分离反例 `pre_split_endpoint_no_bridge_walk`：同一动作没有 bridge debt 时最后一步只是 `walk`，不能证明桥债消费。
- shortcut `unsplit_cshape_wide_mouth_shortcut`：墙口过宽时未切断 C 形也能整体进入，差异不再归因于桥债。
- 站位门 `split_bridge_stand_gate_event_only`：切断事件发生但无法到达施力格时，只能作为 event witness。

Topic coverage：

- 必须覆盖的“切断 C 形后 crate 桥债进入二段 consumer”：已满足。
- 必须覆盖的“未切断 C 形同动作失败或表现不同”：已满足。
- 必须覆盖的“预分离端点但没有桥债”：已满足。
- 必须覆盖的“通道 / 回返格过宽导致 shortcut”：已满足。
- 必须覆盖的“站位门关闭导致只剩事件 witness”：已满足。

建议 curator 决策：

- 接受为 `固定 B/S 断桥：sticky split 端点目标袋` 的 supplement / consumption probe。
- 暂不新开正式 family；family 名不应是 `sticky_split:n1`，也不应写成通用 crate 推箱。
- 推荐入库措辞聚焦：`断桥输出 -> 左柱 crate 桥债 -> 单格墙口消费`。
- 若后续 curator 需要 recipe，可追加一个顺序 case：先让上端点目标袋消费端点独立性，再回头让左柱 crate 桥进入墙口；当前 run 已证明桥债 consumer 本身，但尚未证明完整双段解题顺序。

## 不建议入库的边界族

### `cshape_bridge_width_shortcut`

过宽墙口让未切断 C 形也能整体进入。它适合保留为 shortcut 反例，不适合作为新机制家族。

### `pre_split_endpoint_no_bridge`

端点预分离可复现端点独立，但没有左柱 bridge debt；本 topic 下只能作为反例，不能证明桥债消费。

### `cshape_bridge_stand_gate`

站位门关闭时只观察到 `sticky_to_box` / `sticky_split`，没有第二段施力与消费；适合作为 event-witness guard，不入库。
