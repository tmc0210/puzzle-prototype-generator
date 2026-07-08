# Proposed Families: ra_loop_sticky_handle_return_20260707_01

## sticky 前沿通过后的形状把手回位门

建议名称：`sticky 前沿通过后的形状把手回位门`

机制角色：

- `active_rule`：sticky 刚体移动后的反向施力站位检查，以及墙 / 侧廊 consumer 对玩家可达性的限制。
- `material_source`：B/S anchor 只负责让预置 `M` 在 runtime 中合法保持 sticky；它不参与关键观察点。
- `consumer`：前沿口之后的侧廊、竖条右侧施力格、L 形凸角右侧把手、2x2 右侧施力位、封闭绕行的墙。
- `incidental`：孤立 `G` 只满足 parser 需要；目标覆盖和 B/S 边界移动都不是本轮关键观察点。

关键观察点：

首步 `right` 在所有受控正反例中都 legal，差异不来自前沿口宽。差异第一次出现在推进后：玩家是否能到达 sticky footprint 右侧某个实际施力格，并用它执行反向 push。关键 no case 均为局部图 complete，不依赖预算耗尽。

局部问题：

当 sticky footprint 的前沿口宽已经允许通过时，不同 footprint 形状把反向施力格放在哪里？墙 / 侧廊是否能消费这个位置，从而制造可回返、不可回返或 shortcut 状态？

结构旋钮：

- footprint 形状：竖向二连、3 格 L 形、2x2。
- 推进后可达施力格的位置：竖条右侧、L 形凸角右侧、2x2 右侧下格。
- 玩家侧廊是否连到该施力格。
- 上方 / 下方 / 右侧绕行是否封闭。
- 空间是否过宽，导致单格把手门被绕过。

变体谱：

- `side_door_open_return_found`：竖向二连，侧廊连到右侧施力格；回初始 found。
- `side_door_closed_no_return`：竖向二连，侧廊短一格；回初始 complete no。
- `stance_cells_walled_side_door_insufficient`：竖向二连，附近侧廊存在但施力格是墙；最终 `right:force_blocked`。
- `explicit_handle_consumption_probe`：竖向二连，显式消费侧廊把手。
- `wide_side_loop_shortcut`：竖向二连，过宽空间造成 shortcut，只作误用边界。
- `lshape_corner_handle_open_return` / `lshape_corner_handle_blocked_no_return`：缺右上角 L，凸角右侧把手开放时回初始 found，堵住后 complete no。
- `lshape_corner_explicit_handle_consumption`：3 格 L 形，显式消费凸角把手。
- `lshape_overwide_corner_shortcut`：L 形周边过宽，状态图放大，只作 shortcut 边界。
- `lshape_missing_top_left_open_return` / `lshape_missing_top_left_blocked_no_return`：缺左上角 L，最终上方被堵，但底侧把手仍可回返；堵下格把手后 complete no。
- `lshape_missing_bottom_right_open_return` / `lshape_missing_bottom_right_blocked_no_return`：缺右下角 L，回返路径更短；堵右侧下格把手后 complete no。
- `lshape_missing_bottom_left_open_return` / `lshape_missing_bottom_left_blocked_no_return`：缺左下角 L，需要从上格驱动；必须额外开放左下回路才能回到原驱动位，堵右侧下格把手后 complete no。
- `square2_side_face_open_return`：2x2，右侧下格施力位开放；回初始 found。
- `square2_side_face_blocked_no_return`：2x2，只堵右侧下格施力位；回初始 complete no。
- `square2_explicit_face_consumption`：2x2，显式消费一个右侧施力位并整块反推。

共同解释：

这组结构不比较 sticky 是否能进入墙口，而是比较进入后能否撤回。前沿开放只是输入条件；真正被消费的是推进后的施力格位置。竖条、L 形和 2x2 的共同点是：只要有一个可达施力格且整块反推目标格开放，rigid group 可以反推；如果该施力格被墙切掉，回返消失。四种 L 旋转显示该施力格的位置和 driver 回位需求不同：缺左下角必须从上格驱动，比其他 L 多一个回到左上驱动位的路径要求。L 形和 2x2 不应新建顶层 family，它们扩展了同一反向施力格谱系。

输入条件：

- 一个 sticky footprint：竖向二连、3 格 L 形或 2x2。
- 玩家从左侧推动 footprint，下格或相邻接触格可被 push。
- 右侧前沿目标格对整个 footprint 完整开放，使首步合法。
- 上下绕行在受控 case 中封闭，避免绕过指定把手。

输出状态：

- 可回返：玩家能经侧廊到达某个右侧施力格，执行反向 push，并回到初始 key。
- 不可回返：局部图 complete 且无回初始路径。
- 动作集合差异：实际施力格是墙时，相关方向出现 `force_blocked`。
- shortcut：空间过宽时仍可回返，但不再证明单格把手门被消费。

自然消费方式：

- 接在 B/S 或其他 producer 输出的 sticky footprint 后，作为“正确形状进入后是否能撤回”的承诺门。
- 接目标口或单列通道：目标口只检查前沿 pass，后方侧廊 / 凸角 / 右侧施力位检查反向施力债。
- 接尾债占位 probe：把施力格从墙换成 crate / sticky，测试阻挡是否变成资源移交。

常见 shortcut：

- 上方或右侧空间过宽会让玩家绕到施力格，削弱单格把手门。
- 只有附近通道不够，必须能站到实际施力格。
- 若前沿目标格未完整开放，结果退化成旧的前沿口宽规则。
- 2x2 不要求玩家站满整面；本轮证据只需要一个可达施力位。

推荐 probe：

- 把反向施力格从墙换成 crate / sticky 尾债，比较 `force_blocked`、可推走、merge 或资源移交。
- 用 producer 输出的 L 形或 2x2 接入同一 consumer，确认 producer 只是 material_source 还是也参与关键观察点。

组合例句：

`B/S 产出 sticky footprint -> 完整前沿口让刚体进入 -> 后方侧廊 / 凸角 / 右侧施力位决定能否撤回 -> 目标口或下一段通道消费这个承诺点`。

建议 curator 决策：

`supplement`。并入 `刚体黏块 + 墙口：反向施力格谱系`。本轮补足了同一 family 下的竖向二连、3 格 L 形和 2x2 形状谱，有 explicit consumption probe 和 complete graph 支撑，但 active_rule 仍是 sticky 刚体 + 墙 / 侧廊 consumer。

哪些 case 不应进入 lexicon：

- `wide_side_loop_shortcut` 和 `lshape_overwide_corner_shortcut` 不作为正例，只作为 shortcut 边界。
- 缺左下角 L 的早期封死版本不应引用；那是 driver 回位被误封，不是把手格本身的结论。
- 三个 explicit consumption case 不单独成条，只作为对应 open 变体的消费证明。
