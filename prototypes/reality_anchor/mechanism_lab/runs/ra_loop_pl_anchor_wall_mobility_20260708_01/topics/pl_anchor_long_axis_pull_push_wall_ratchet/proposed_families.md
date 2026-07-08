# Proposed Families: pl_anchor_long_axis_pull_push_wall_ratchet

## 语料化结果

### Designer 可用装置

`P/L 长轴墙廊` 可以补一条 `L` 侧 pull 版容量接口：玩家站在 `L` 端外侧，向远离 anchor 的方向移动，玩家前格余量被消耗为 P/L anchor 的同向长轴位移。0 格前格是首步门控反例，1 格前格是一次停位，2 格前格是两次容量。首拉后，侧廊和回返门决定玩家是否能离开端点，但不自动给出长轴反向恢复。

最小形式：

```text
P 侧 push 基线，一格 L 端余量：
########
#G#@PL.#
########

L 侧 pull，0 格玩家前格，首步门控：
########
#G.PL@##
########

L 侧 pull，1 格玩家前格，一次停位：
########
#G.PL@.#
########

L 侧 pull，2 格玩家前格，两次容量：
#########
#G.PL@..#
#########

L 侧 pull，侧廊开放但不是反向恢复：
########
#G.PL@.#
#......#
########

L 侧 pull，拉后回返门封墙：
########
#G.PL@.#
#.....##
########
```

局部状态图：

```text
pull 0:
#G.PL@## --right--> illegal destination_blocked

pull 1:
#G.PL@.# --right / pull_object + anchor_boundary_shift-->
#G..PL@# --all dirs--> blocked

pull 2:
#G.PL@..# --right / anchor_boundary_shift-->
#G..PL@.# --right / anchor_boundary_shift-->
#G...PL@#

return gate:
#G.PL@.# / #......# --right--> #G..PL@# / #......#
  open:  down = walk
  wall:  down = destination_blocked
```

适用变体：

- 水平 `P/L` anchor，玩家在 `P` 侧 push 或 `L` 侧 pull，移动方向沿 P->L 长轴。
- 一格高墙廊、或带侧廊的近似墙廊。
- 玩家前格余量为 0 / 1 / 2；首拉后下方或上方回返门开放 / 封闭。

输入接口：

- `P/L` anchor 本体必须可移动，且玩家在输入时处于正确 force side。
- pull 版要求玩家紧贴 `L` 端外侧，身后是 P/L anchor，前方空格数量可控。
- 若要消费首拉后的状态，需要在首拉后玩家所在端点旁放一个侧廊、门口、目标口或后续站位。

输出接口：

- `anchor_boundary_shift:push_pull` 事件和 P/L 边界整体平移 1 或 2 格。
- 玩家被带到新的端点，形成“还在端点 / 能否下侧廊 / 是否继续同向位移”的状态分类。
- 墙廊容量债：已经消耗的前格余量不能直接恢复成初始 anchor key。

自然消费方式：

- 一次性门闩：P/L anchor 移动后占住或释放一个单格口。
- 容量计数器：0 / 1 / 2 前格余量分别代表禁用、一次、两次 stroke。
- 回返门：首拉后让玩家能否离开端点，连接到后续站位或阻断 shortcut。
- 移动边界 driver：作为 B/S 边界刷子或 P/L 二次动作的上游位移，但 driver 本身不应单独升格。

组合例句：

`L 侧 pull 长轴墙廊 -> 回返门 -> 移动边界刷子`：玩家用一次 pull 把 P/L anchor 拉到刷线位；如果回返门开放，玩家能离开端点继续消费新边界；如果回返门被墙封住，首拉仍移动 anchor，但后续站位被关闭。

## Family 草案

### Family 名称

`P/L 长轴墙廊：push/pull 余量与回返门补谱`

建议 curator 决策：`supplement` 到现有 `P/L 长轴墙廊：L 端余量棘轮`。不建议 promote 新顶层条目，因为输出接口仍是长轴容量 / 棘轮，只是补齐 `L` 侧 pull 的输入门和拉后回返门。

### 机制角色

- active_rule：`forceModeAt` 选择 push / pull 语义；`push_force` / `pull_force` 移动 `anchor:push_pull` 并发出 `anchor_boundary_shift:push_pull`；墙格在玩家前格或回返门位置造成 `destination_blocked`。
- material_source：`P/L` anchor 本体和墙廊 footprint；`G` 只是 runtime 合法目标。
- consumer：端墙 / 玩家前格墙消费首步或连续步容量；拉后回返门墙消费首拉后的出口；侧廊消费玩家位置集合但不消费成反向恢复。
- incidental：可达图中的 walk 事件、侧廊中额外同向 push 事件；它们帮助校准 shortcut，但不是本 family 名称主体。

### 关键观察点

关键差异出现在第一步或第二步门控：

- 第一观察点：`pull_l_side_no_front_gate` 的 `right` 因 `destination_blocked` illegal，而 `pull_l_side_one_front_stop` 同位置增加 1 格前格后 legal 并出现 `anchor_boundary_shift:push_pull`。
- 第二观察点：`pull_l_side_two_front_capacity` 的第二次 `right` 再次 legal，证明玩家前格余量可以计数化为 pull stroke。
- 第三观察点：`pull_l_side_return_gate_wall` 首拉已合法并移动 anchor，但第二步 `down` 被 `destination_blocked` 关闭；墙在这里消费的是拉后回返门，不是 anchor 可动性。

### 局部问题

同一个水平 P/L anchor 在墙廊中，`P` 侧 push 和 `L` 侧 pull 是否都能形成可计数的长轴位移资源？pull 侧的端点门到底是 anchor 远端余量、玩家前格，还是拉后回返门？

### 结构旋钮

- driver：`P` 侧 push / `L` 侧 pull。
- 端点余量：push 看 L 端前方空格；pull 看玩家前方空格。
- pull 前格数量：0 / 1 / 2。
- 侧廊：封闭 / 开放。
- 拉后回返门：开放 / 封墙。
- 后续消费：只停位 / 允许离开端点 / 接移动边界或门闩。

### 变体谱

| case | 变体 | 观察 |
| --- | --- | --- |
| `push_p_side_one_l_slack_baseline` | P 侧 push，一格 L 端余量 | `push_object:push_pull_anchor` + `anchor_boundary_shift:push_pull`，complete / 3 states，回初始 complete no |
| `pull_l_side_no_front_gate` | L 侧 pull，0 格玩家前格 | 首步 `destination_blocked`，无 anchor 移动；门控反例 |
| `pull_l_side_one_front_stop` | L 侧 pull，1 格玩家前格 | 一次 `pull_object:push_pull_anchor` + `anchor_boundary_shift:push_pull`，complete / 2 states |
| `pull_l_side_two_front_capacity` | L 侧 pull，2 格玩家前格 | 两次 pull 都移动 anchor，事件出现 2 次，complete / 3 states |
| `pull_l_side_side_corridor_fake_handle` | 首拉后侧廊开放 | 首拉移动 anchor，final `down` legal，reachable complete / 30 states，但回初始 complete no |
| `pull_l_side_return_gate_open` | 回返门开放 | `right down` legal，第二步是 walk，证明首拉输出可被出口消费 |
| `pull_l_side_return_gate_wall` | 回返门封墙 | 首拉移动 anchor，第二步 `down` 为 `destination_blocked`；门控反例 |

### 被反例修正后的共同解释

pull 版不是“L 端外侧有空就能拉”。玩家必须先能走进前格；因此 0 格前格是输入门。首拉后，P/L anchor 已经整体右移，玩家站在新端点；侧廊可以让玩家离开端点或继续绕行，但完整图仍不能返回初始 anchor key。回返门墙不否定 anchor 可动性，只否定首拉后的出口。

严格长轴 pull 中，所谓 `P 半格目标墙`不能独立放置：P 半格目标会是原 L 半格的自让位置。若把墙放到 P 半格真正外部目标位，就已经变成横向移动 / footprint gate，归入 transverse wall gate matrix。

### 常见 shortcut 与误用边界

- 把 `destination_blocked` 写成“P/L anchor 不可动”会误导；它只是玩家前格或回返门关闭。
- 侧廊开放不等于反向恢复。它可能允许更多 walk 或同方向推进，但本轮 complete graph 仍没有回到初始 key。
- 只记录 `anchor_boundary_shift:push_pull` 不够；必须同时说明墙消费的是端点容量、首步门，还是拉后出口。
- 若布局给了另一条真正改变 force side / 方向的把手，就不再是本条的严格长轴墙廊谱。
- `returnToInitial.status=exhausted` 不能当不可回返证明；本轮关键 no 结论均为 `complete` 或因 illegal replay 标为 not applicable。

### 推荐 probe

把 pull 版一次位移接到极小 consumer：

- P/L anchor 首拉后堵住 / 打开一格门闩，比较回返门开放与封墙。
- P/L anchor 首拉后作为 B/S 移动边界刷子的 driver，比较 push driver 和 pull driver 是否只是输入侧差异，或是否产生新的 shortcut。
- 在不离开长轴的前提下增加 3 格玩家前格，确认容量继续线性增长；若侧廊引入新把手，则单独归到横向或边界交接题材。

### 证据

`run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_long_axis_pull_push_wall_ratchet`

证据强度：`runtime_observed`, `bounded_graph`, `graph_complete`, `event_witness`, `structure_difference`, `supplement_candidate`。

关键硬事实：

- 正例均出现 `anchor_boundary_shift:push_pull`：`push_p_side_one_l_slack_baseline`, `pull_l_side_one_front_stop`, `pull_l_side_two_front_capacity`, `pull_l_side_side_corridor_fake_handle`, `pull_l_side_return_gate_open`, `pull_l_side_return_gate_wall` 的首拉。
- 门控反例明确：`pull_l_side_no_front_gate` 首步 `destination_blocked` 且无移动；`pull_l_side_return_gate_wall` 首拉后第二步 `destination_blocked`。
- 所有 reachable graph 为 `complete`；主要正例回初始为 complete no，非法 replay case 的 return search 为 not applicable。

### 哪些 case 不应进入 lexicon

- `pull_l_side_no_front_gate` 只能作为玩家前格门控反例，不应单独成为可动性证据。
- `pull_l_side_return_gate_wall` 只能作为拉后回返门控反例；它的首步可支撑 anchor 移动，第二步失败不支撑“anchor 不可回返”的强结论。

### 结论范围校准

已支撑：pull 侧玩家前格余量可作为长轴容量；回返门墙能消费首拉后的出口；侧廊开放不自动恢复初始状态。

未覆盖：目标口、B/S 边界刷子、真实门闩消费尚未接入；P 半格目标墙不属于严格长轴 pull 的可隔离旋钮。

是否打开新题材或新结构用途：no。本轮更适合作为既有长轴墙廊条目的 pull / 回返门 supplement；若后续接 B/S 刷子或目标门闩，那是 composition probe，不是基础余量补债。
