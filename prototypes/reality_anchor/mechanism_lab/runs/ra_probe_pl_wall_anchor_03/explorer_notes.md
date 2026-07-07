# Explorer Notes: ra_probe_pl_wall_anchor_03

## Exploration brief

- `prototype`: `reality_anchor`
- `scope`: 只看 P/L 推拉锚点和墙结构；局部对象限制为玩家、P/L、墙、一个目标格。
- `exclusions`: 不看黏块形状谱系，不使用 B/S，不读取 design archive、候选包、评价报告、sampler profile 或 hardcoded layout template。
- `source_boundary`: 允许读取 `mechanic.yml`、Reality Anchor runtime / adapter、mechanism-lab 协议和本轮 run 产物；curator 阶段只读取本轮结果和 lexicon 文件。
- `run_intent`: `explore_then_curate`

## Primitive refs

- `forceModeAt`: P/L 水平相邻时，P 侧为 `x <= P.x`，L 侧为另一侧；竖直相邻时，P 侧为 `y <= P.y`。
- `push_force`: 玩家在 push 区域时，朝相邻可移动对象输入会推动整组对象。
- `pull_force`: 玩家在 pull 区域时，玩家前格必须为空，身后若有对象则把对象沿输入方向拉动。
- `anchor_boundary_shift:push_pull`: P/L 锚点整体移动时记录边界位移事件。
- `force_blocked`: 锚点任意一半的目标格撞墙或越界时，整次 force plan 非法。

## 候选结构族

1. `pl_long_axis_wall_ratchet`：P/L 长轴方向上，L 端前方 0/1/2 格余量如何改变可推进次数、最终动作表和回返性。
2. `pl_perpendicular_handle_wall_gates`：横向 P/L 的 P 侧推把手与 L 侧拉把手，如何被玩家前格墙、锚点另一半目标墙和回返绕行格分别打开或切断。
3. `pl_vertical_axis_drop_slot`：竖向 P/L 在单列竖井中沿 P->L 方向移动时，底部停格和侧向出口如何改变继续推进能力。
4. `pl_corner_keyhole_turn`：P/L 贴墙角时，玩家能接触 P 半格或 L 半格的哪一侧，是否改变垂直/水平二选一动作集合。
5. `pl_pull_front_vs_anchor_body`：L 侧拉动中，玩家前格墙与被拉锚点另一半目标墙造成的失败类型是否可稳定区分。
6. `pl_side_bypass_false_reverse`：加入绕行侧廊后，玩家能到达 L 侧是否真的提供长轴反向位移，还是只增加步行状态。
7. `pl_one_cell_mouth_capacity`：同一墙廊口宽下，P/L 从第 0、1、2 个停位进入时是否形成不同的后续合法动作集合。
8. `pl_label_reflection`：交换 P/L 左右朝向后，墙廊棘轮方向是否随 L 端翻转。

执行选择：本轮执行 1 和 2。它们的近邻变体密度高，能同时观察动作合法性、事件、回返搜索和局部图完整性；6 被并入 1，5 被并入 2。

## 本轮假设

- 长轴方向不是普通“可推两格块”，而是由 P 侧 push 与 L 侧 pull 共同形成朝 L 端移动的棘轮。墙廊的 L 端余量应决定可以吃掉几个停位。
- 横向 P/L 的垂直位移存在两类把手：P 侧站位可推入锚点，L 侧站位可拉离锚点。墙结构可能分别阻断玩家前进格、锚点接触半格或锚点非接触半格。

## 有效比较

- `long_axis_no_front_cell` -> `long_axis_one_front_cell`：L 端前方从 0 格变为 1 格后，`right` 从 `force_blocked` 变为 legal，并触发 `push_object:push_pull_anchor` 与 `anchor_boundary_shift:push_pull`。
- `long_axis_one_front_cell` -> `long_axis_two_front_cells`：同样先推一步后，最终动作表从 `right:force_blocked` 变为 `right` legal；局部图从 3 states 增到 6 states。
- `long_axis_two_front_cells` -> `long_axis_side_bypass_still_one_way`：侧廊把最终状态合法动作扩展为 `down,left,right`，局部图增到 33 states，但回到初始仍是 `no complete`。绕行不是长轴反推能力。
- `p_side_push_down_open_loop` -> `p_side_push_down_other_half_wall`：只堵住 L 半格下落目标，就让 P 侧 `down` 从 legal 变为 `force_blocked`。
- `p_side_push_down_open_loop` -> `p_side_push_down_l_front_wall_after_shift`：初始 `down` 仍 legal，但推动后回到初始从 depth 3 变为 `no complete`；堵住的是推动后的 L 侧 pull 前格，不是初始推动空间。
- `l_side_pull_up_open_loop` -> `l_side_pull_up_front_wall`：只堵玩家前进格，`up` 直接 `destination_blocked`。
- `l_side_pull_up_open_loop` -> `l_side_pull_up_p_target_wall`：玩家前进格开放，但 P 半格上移目标被墙堵住，`up` 变为 `force_blocked`。

## 被修正的解释

- “能绕到 L 侧就能反向移动 P/L”被修正。`side_bypass` 的可达图 complete，且回返搜索 complete 为 no；绕行只增加玩家步行与少量 pull 状态，不恢复长轴反向位移。
- “P 侧推只关心接触的 P 半格”被修正。`p_side_push_l_target_blocked` 显示 L 半格目标墙同样阻断整条锚。
- “L 侧拉只关心玩家前格”被修正。`l_side_pull_p_target_wall` 显示玩家前格开放仍会因 P 半格目标墙 `force_blocked`。
- “推动合法就可回返”被修正。`p_side_push_l_front_wall` 的首步合法，但推动后 L 侧前格墙切断了短回返；该 case 的回返搜索 complete 为 no。

## 不建议提交 curator 的弱结论

- 不把 `long_axis_no_front_cell` 的 `return depth=0` 写成可回返；这是因为首步 illegal，最终状态仍是初始状态。
- 不把“所有 P/L 位移都不可逆”写入语料；横向 P/L 的垂直位移在开放房间里可以 depth 3 回返。
- 不把“墙越多越难”写入语料；本轮有效变量是具体墙格：L 端前方余量、玩家 pull 前格、P/L 另一半目标格、推动后的回返前格。
- 不声称全局不可达性；所有结论只针对本轮小图，证据标签为 `runtime_observed`、`bounded_return`、`graph_complete`。

## 下一轮建议

- 做 `pl_label_reflection`：把水平 P/L 反成 L/P，验证长轴棘轮是否跟随 L 端翻转。
- 做竖向 P/L 版本，比较“向下棘轮”与“水平长轴棘轮”是否完全同构。
- 对 `p_side_push_l_front_wall` 加一个只开放 L 侧前格的近邻 case，确认首步后的回返被恢复时最小墙格是哪一个。
- 对 `side_bypass` 加更大侧廊，检查是否仍不能恢复长轴反推，避免把 33-state 小图误当作所有绕行结构。
