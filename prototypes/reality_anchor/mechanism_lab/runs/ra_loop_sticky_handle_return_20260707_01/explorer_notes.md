# Explorer Notes: ra_loop_sticky_handle_return_20260707_01

## 本轮假设

本轮研究 sticky footprint 已经能通过前沿口之后的回返 / 把手问题，不再证明前沿口宽。B/S anchor 只让预置 `M` 在 runtime 中合法保持 sticky；关键观察点发生在 sticky 刚体推进后的玩家站位、反向施力格和墙 / 侧廊 consumer。

原先先跑了竖向二连，随后补入同层的 3 格 L 形和 2x2。L 形不能只跑一种朝向；本轮最终补齐了 2x2 缺角意义下的四种 3 格 L 旋转。

## 候选结构族

1. `sticky_mouth_side_handle_return_gate`：前沿可过后，侧廊是否连到实际反向施力格。执行。
2. `lshape_corner_handle_open_closed`：3 格 L 形四种旋转的凸角 / 侧格是否提供侧向把手。并入同一执行族。
3. `square2_side_face_handle`：2x2 前沿可过后，一个右侧施力位是否足以整块反推。并入同一执行族。
4. `overwide_side_loop_shortcut`：上方 / 右侧空间过宽时是否绕过单格把手门。作为 shortcut case。
5. `return_stance_occupied_by_tail_debt`：反向施力格被 crate / sticky 尾债占住时是否从墙门变成资源移交。本轮未跑，建议作为后续独立变量。
6. `timing_before_after_handle_access`：先推 / 晚推是否改变玩家能否到达回位格。本轮未跑。

## 有效比较

- 竖向二连：`side_door_open_return_found` 与 `side_door_closed_no_return` 首步 `right` 都 legal，差异不是前沿口宽；只关闭侧廊末端一格，回初始从 `found depth=9` 变成 `no complete`。
- 竖向二连反例：`stance_cells_walled_side_door_insufficient` 保留附近侧廊，但实际反向施力格是墙，最终 `right:force_blocked`，回初始 `no complete`。这修正了“走到附近即可”的解释。
- 竖向二连 consumption：`explicit_handle_consumption_probe` 用 `right down right right up left` 显式把侧廊输出消费成一次反向 push。
- 3 格 L 形四旋转：
  - 缺右上角（`lshape_corner_handle_open_return`）：回初始 `found depth=11`；堵凸角右侧把手后 `no complete`。
  - 缺左上角（`lshape_missing_top_left_open_return`）：最终 `up:destination_blocked`，但底侧把手仍可回初始 `found depth=11`；堵下格把手后 `no complete`。
  - 缺右下角（`lshape_missing_bottom_right_open_return`）：回返更短，`found depth=9`；堵右侧下格把手后 `no complete`。
  - 缺左下角（`lshape_missing_bottom_left_open_return`）：必须从上格驱动，若不额外开放左下回路会把 driver 侧也困住；修正后 `found depth=13`，堵右侧下格把手后 `no complete`。这是四种 L 里最明显的附加差异。
- 3 格 L 形 consumption：`lshape_corner_explicit_handle_consumption` 用 `right down right right right up left` 显式消费凸角把手。
- 2x2：`square2_side_face_open_return` 在前沿两格都开放后，只要右侧下格施力位可达，就能回初始 `found depth=11`；`square2_side_face_blocked_no_return` 只堵这个施力位，回初始 `no complete`。
- 2x2 consumption：`square2_explicit_face_consumption` 显式走到右侧下格施力位并左推，证明一个可达施力格足以推动整个 2x2 刚体。
- shortcut：`wide_side_loop_shortcut` 和 `lshape_overwide_corner_shortcut` 都显示空间过宽会放大状态图并削弱“单格把手门”的约束价值。

## 被修正的解释

第一版 closed 竖条 case 被上方绕行推翻，因此本轮结论必须包含“封闭上方 / 下方绕行，只比较指定把手格”的前提。

第二个修正是 2x2。旧语料容易写成“2x2 需要整面外侧余量”，但本轮 runtime 证据显示，在这个局部几何里一个右侧施力位就能驱动整个 2x2 反推。更准确的说法是：2x2 需要的是“至少一个可达施力格 + 整块反推目标格开放”，而不是玩家必须站满整面。

第三个修正是 L 形。L 形凸角不是新 active rule；它是同一反向施力格谱系里的形状变体，但四种旋转并不等价。缺右上、缺左上、缺右下都可以归入“下格驱动后右侧把手开 / 关”的谱；缺左下必须从上格驱动，除了右侧把手，还要给玩家回到左上驱动位的下方回路。

## 不建议提交 curator 的弱结论

- 不要把 B/S 写进 family 标题或 active rule；它只是 material_source。
- 不要把过宽空间 shortcut 当正例。
- 不要把 `returnToInitial.status=exhausted` 用作不可回返证据；本轮关键 no case 都是 complete。
- 不要把 2x2 写成“必须整面外侧余量”；本轮只证明单个右侧施力位已经足够。

## 下一轮建议

若继续本条，应换变量而不是继续枚举形状：把反向施力格从墙换成 crate / sticky 尾债，比较 `force_blocked`、可推走、merge 或资源移交。否则可以回到 backlog 的下一条非形状缺口，例如固定 B/S 切割尾债的第二段消费。
