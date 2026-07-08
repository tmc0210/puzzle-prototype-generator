# Proposed Families: ra_loop_bind_mouth_composition_20260707_01

## B/S 绑定竖向 footprint -> 上沿墙齿目标口

建议 curator 决策：`supplement`

局部问题：
当两个 crate 先后跨过固定 B/S 边界并正交邻接为竖向 sticky 二连时，同一上沿墙齿目标口是否消费 connected footprint，而不是只见证 `box_to_sticky` / `sticky_merge`？

结构旋钮：

- 输出 connectedness：单格 sticky / 竖向 connected 二连 / 隔行两个独立 sticky 部件。
- 目标口上格：墙齿关闭 / 第二个目标开口。
- producer 顺序：上格先跨线，再下格跨线 merge；或隔行跨线保持分离。
- B/S anchor 固定性：本轮用墙槽固定 B/S，排除移动边界刷产物 shortcut。

变体谱：

- `connected_vertical_pair_single_lower_mouth`：上格先变 sticky，下格再跨线并 merge；下格目标口前有上沿墙齿。最后一步 `right` 非法，原因 `force_blocked`。
- `single_bound_cell_lower_mouth`：只有下格单元跨线，单格 sticky 覆盖同一目标，最终 `isWin=true`。
- `connected_vertical_pair_two_cell_mouth`：保持竖向二连输出，但上格也开放为目标口；整体推进覆盖上下目标，最终 `isWin=true`。
- `separated_parts_single_lower_mouth`：两个 crate 隔行跨线，保持两个独立 sticky 部件；下格部件绕过上沿墙齿覆盖目标，最终 `isWin=true`。

共同解释：
墙齿消费的是 B/S producer 输出的 connected footprint 前沿，而不是 sticky 材质。竖向二连 push 右移时，上下两格目标位必须同时开放；单格输出和隔行分离输出没有上格前沿债务，因此能进入同一单格下口。打开上格口宽后，同一 connected footprint 也能通过，修正了“二连必然失败”的解释。

输入条件：

- 固定 B/S 边界，box side 在左，sticky side 在右。
- 至少一个 crate 可从 box side 推入 sticky side；正例需要第二个 crate 与第一个跨线后正交邻接。
- 下格目标口可被玩家从左侧推入；上格位置可用墙齿或第二目标口控制。

输出状态：

- 正交邻接输出：`M/M` 竖向 connected sticky footprint，带上格前沿债务。
- 单格输出：单格 sticky，只带下格目标需求。
- 隔行输出：两个 sticky 部件，目标口只消费下格部件。
- 双格开口输出：connected footprint 覆盖两个目标。

自然消费方式：

- 作为 `B/S 绑定债` 到 `刚体黏块 + 墙口` 的 composition probe。
- 接目标回填：目标口是否开放到 footprint 全前沿，决定 correct footprint / wrong footprint。
- 作为错误形状检查器：多绑一个相邻 crate 会失败；隔行绑定则可能成为 shortcut。

常见 shortcut：

- B/S anchor 若可移动，状态图会混入边界刷产物；本轮用墙槽固定。
- 如果上格不是墙齿而是开放地面，竖向二连也可通过，不能证明单格 mouth 消费。
- 如果两个 crate 隔行跨线，输出不是 connected footprint，下格可绕过墙齿。
- 如果只观察 `sticky_merge`，没有后续目标口 push，则只是 event witness。

推荐 probe：

- 禁用 `box_sticky_normalize` 或构造同几何的预置 sticky 对照，确认差异依赖 B/S producer 输出而不是初始给定物体。
- 把竖向二连换成 L 形绑定产物，比较凸角侧把手是否成为新的 mouth shortcut。
- 把同一输出接反向施力格墙廊，比较目标口消费与回返站位消费是否给出同一 connectedness 边界。

组合例句：
`B/S 绑定债 -> 竖向 connected footprint -> 上沿墙齿目标口`：玩家先把两个 crate 绑定成竖向 rigid footprint；目标口只开放下格时，绑定过强会失败，打开上格口或保持隔行分离才通过。

不应进入 lexicon 的 case：
没有。四个 case 都只作为 existing-family supplement 的证据；其中 `bs_pair_tooth_connected_block` 不应单独被写成不可回返证明。

证据：
`run=ra_loop_bind_mouth_composition_20260707_01`, `cases=bs_pair_tooth_connected_block,bs_single_tooth_lower_pass,bs_pair_open_two_cell_mouth_pass,bs_gap_parts_tooth_shortcut`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe,composition_probe`
