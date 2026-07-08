# Proposed Families: pl_anchor_wall_latch_goal_plug

## 1. P/L 单口门闩：二格 footprint 被墙口宽度消费

### 语料化结果

Designer 可用装置：把横向 P/L anchor 的一个半格插在一格墙口，另一个半格作为侧向把手。玩家 push 或 pull 移动 anchor 本体后，原墙口从“被 anchor 半格堵住”变成“可 walk 通道”；若目标 footprint 少一格则首步 `force_blocked`，若墙口宽到有旁 lane 则玩家不需要移动 anchor 就能 shortcut。

最小形式：

```text
push 开闩，P 半格堵一格口：
###.###      ###.###
#.@PL.#  ->  #..@PL#
###.###      ###.###

pull 抽闩，反向 LP 的 P 半格堵一格口：
#.##.##      #.##.##
#.@LP.#  ->  #@LP..#
#.##.##      #.##.##

过窄反例：
###.###
#.@PL##  right => force_blocked
###.###

二格口 shortcut：
##..###
#.@PL.#  up => walk，不移动 anchor
##..###
```

适用变体：P 侧 push 横移开闩；反向 LP 下 pull 侧抽闩；右侧止位墙把开闩后位置变成承诺点；pull 后侧路开放 / 封死控制最终动作集合。

I/O：

- 输入：一格墙口；P/L anchor 横向贴口，恰好一个半格占据门口；玩家站在对应 push 或 pull 把手位；anchor 移动目标 footprint 至少有一格余量。
- 输出：门口格被释放，玩家或后续对象获得上下通道；anchor 新位置可被止位墙停住；pull 后玩家侧路把手可开放或被墙吃掉。

自然消费：

- 接通道门：把 `up/down` 从 illegal/被堵变成 legal walk。
- 接一次性承诺：移动后用止位墙或封闭把手阻止立刻恢复。
- 接组合输入：把释放出的单格通道交给 crate、B/S 边界刷或后续 P/L 边界交接消费。

误用边界：

- 二格或更宽墙口若留下旁 lane，玩家可以 walk shortcut，门闩不再是必经结构。
- L/P 端目标 footprint 若被墙占住，首步只是 `force_blocked` 反例，不能证明可动门闩。
- 大房间开放绕行会弱化“墙口消费”，需要再用反事实墙格证明 anchor 半格是必经堵点。
- 只看 `anchor_boundary_shift:push_pull` 还不够；必须有通道动作集合、宽度 shortcut 或把手对照证明移动结果被消费。

组合例句：

`P/L 单口门闩 -> 下游单格通道`：玩家先把 P/L 半格从一格墙口移开，获得上下通道；下一段结构要求玩家或箱子只能通过这个单格口，因此墙口宽度和止位墙同时约束可达性。

### Family 草案

- family 名称：`pl_anchor_wall_latch_mouth_width`
- 建议 curator 决策：`promote`。若 curator 想减少 P/L 顶层条目，也可作为 `P/L 横向把手` 的 consumer supplement，但不要降成普通长轴移动 witness。
- 机制角色：
  - active_rule：`push_force` / `pull_force` 移动 P/L anchor 本体；刚体 footprint 检查制造 `force_blocked` 反例。
  - material_source：P/L anchor 的二格刚体和 push/pull 标签朝向。
  - consumer：一格墙口、过窄 footprint 目标墙、二格口旁 lane、pull 后侧路把手、止位墙。
  - incidental：目标 `G` 只满足 runtime 合法输入；箱子、B/S、sticky 未使用。
- 关键观察点：anchor 移动后，原门口格从 P/L 占位变成玩家可走格；相邻变体第一次分叉在 `right` push / `left` pull 的 legality 与最终动作表。
- 局部问题：P/L anchor 的一个半格能否被一格墙口当成门闩消费，而不是只作为可移动对象。
- 结构旋钮：
  - 墙口宽度：一格 / 二格旁 lane。
  - 施力方式：P 侧 push / 反向 LP 的 pull 抽出。
  - anchor 目标 footprint：有余量 / 过窄墙挡。
  - pull 后侧路把手：开放 / 封死。
  - 止位墙：保留承诺点 / 允许继续漂移。
- 变体谱：
  - `one_cell_push_mouth_open`：push 合法，释放门口，最终 `up/down/left` legal，`right` 为 `force_blocked`。
  - `one_cell_push_mouth_too_narrow`：同输入因 L 端目标墙 `force_blocked`，无 anchor 移动。
  - `two_cell_mouth_shortcut`：二格口首步 `up` walk shortcut，门闩失效。
  - `one_cell_pull_extract_handle_open`：pull 合法抽出门口，最终 `up/down` 侧路保留。
  - `one_cell_pull_extract_handle_sealed`：同样 pull 合法，但最终无合法动作，回返把手被墙消费。
- 共同解释：一格口让 P/L 的单半格占位成为必经堵点；移动 anchor 本体重写的是门口占用关系。宽度过大时墙口不再消费 anchor，过窄时 footprint 目标墙在移动前就拒绝动作。
- 常见 shortcut：旁 lane、侧路绕行、目标只作装饰、把过窄 `force_blocked` 误写成门闩成功。
- 推荐 probe：把释放出的门口接一个单格 crate 口袋或 B/S 边界刷入口；再把二格口加回去，确认下游结构被 shortcut 绕过。
- 证据：`run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_wall_latch_goal_plug`，`cases=one_cell_push_mouth_open,one_cell_push_mouth_too_narrow,two_cell_mouth_shortcut,one_cell_pull_extract_handle_open,one_cell_pull_extract_handle_sealed`，`tags=runtime_observed,bounded_return,graph_complete,consumption_probe`。
- 不应进入 lexicon 的 case：`two_cell_mouth_shortcut` 单独不是可动性 family，只作为宽度边界；`one_cell_push_mouth_too_narrow` 单独只是门控反例。

## 2. P/L 目标塞子：覆盖态需要止位才成立

### 语料化结果

Designer 可用装置：P/L anchor 横移经过目标时，任一 anchor 半格覆盖目标都会让目标被计为 covered；但如果目标外侧没有止位，继续 push 会让 anchor 越过目标并释放它。当前证据只证明 target-covering 与墙止位的关系，不足以单独成为强 family。

最小形式：

```text
目标塞住，墙止位：
#@PLG##  right -> #.@PL##  (L 覆盖 G，final.isWin=true，right => force_blocked)

目标覆盖后释放：
#@PLG...# -> #.@PL...# -> #..@PL..# -> #...+PL.#
                                      (玩家在 G 上，anchor 已释放，final.isWin=false)
```

I/O：

- 输入：P/L anchor 与目标相邻；玩家能 push anchor 横穿目标；目标外侧可选择墙止位或开放余量。
- 输出：目标被 anchor 半格覆盖的短暂或稳定状态；若有墙止位，覆盖态保持；若无止位，继续移动会释放目标。

自然消费：

- 当前自然消费只有 runtime 的目标覆盖判定和右侧止位墙。
- 若要变成强语料，应接非胜利条件 consumer：例如目标格同时是单格通道、必须释放后让 crate 进入、或覆盖目标会堵住后续站位。

误用边界：

- 玩家站在目标上不算覆盖；`goal_cover_release_overtravel` 最终渲染为 `+` 且 `final.isWin=false`。
- 没有墙止位时，目标覆盖只是穿越态，不应写成稳定塞子。
- 只证明 `final.isWin=true` 不是足够的 mechanism family 证据；它可能只是 target-covering witness。
- 输入 ASCII 不能直接放置 P/L on goal，本轮只观察移动后覆盖 / 释放。

组合例句：

`P/L 目标塞子 -> 释放后 crate 终点`：先让 anchor 暂时堵住目标，迫使玩家把它推过止位或抽走；目标释放后才允许另一个对象覆盖。当前 run 尚未证明这条组合，只是建议 probe。

### Family 草案

- family 名称：`pl_anchor_goal_plug_crossing`
- 建议 curator 决策：`defer`，或作为 `pl_anchor_wall_latch_mouth_width` 的目标止位 supplement。不要单独 `promote`。
- 机制角色：
  - active_rule：`push_force` 移动 P/L anchor；`target_cover_win` 读取 anchor occupancy。
  - material_source：P/L anchor 的 target_covering trait。
  - consumer：目标覆盖判定；`goal_cover_stop_on_target` 中的右侧止位墙。
  - incidental：开放底行只提供玩家移动空间；没有 crate、B/S 或 sticky。
- 关键观察点：同样经过目标，墙止位使覆盖态停在 final state；开放余量让连续 push 释放目标。
- 局部问题：P/L anchor 能否作为目标塞子，以及墙止位是否决定塞子稳定性。
- 结构旋钮：
  - 目标外侧：墙止位 / 开放余量。
  - 动作次数：覆盖一步停住 / 连续越过释放。
  - 覆盖半格：L 半格覆盖 / P 半格经过覆盖。
- 变体谱：
  - `goal_cover_stop_on_target`：一步 push 后 `final.isWin=true`，下一步 `right` 被 `force_blocked`。
  - `goal_cover_release_overtravel`：三步 push 后 `final.isWin=false`，目标显示为 `+`，说明玩家站在目标不算覆盖。
- 共同解释：anchor 是 target-covering object，但“塞子”只有在止位或后续消费保持覆盖态时成立；开放余量会把覆盖降成过路状态。
- 常见 shortcut：把一次覆盖当稳定目标塞；把 `+` 误读成目标仍被覆盖；没有非胜利 consumer 时硬 promote。
- 推荐 probe：在目标格后接必须由 crate 覆盖的终点，或把目标格放入单格通道，比较 anchor 停住、越过、抽走三种情况下后续对象是否能进入。
- 证据：`run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_wall_latch_goal_plug`，`cases=goal_cover_stop_on_target,goal_cover_release_overtravel`，`tags=runtime_observed,bounded_return,graph_complete,event_witness`。
- 不应进入 lexicon 的 case：若 curator 只采强语料，两个目标 case 都应停在 run 中，最多作为“P/L anchor 可覆盖目标，但需非胜利消费 probe”的备注。

## 结论范围校准

- 已支撑：P/L anchor 本体可由 push/pull 移动，并作为一格墙口门闩被消费；正例出现 `anchor_boundary_shift:push_pull`；宽度、过窄 footprint、pull 后把手均产生可观测差异。
- 未覆盖导致收窄：没有覆盖垂直门闩、斜向绕行大房间、crate 下游消费；目标塞子缺非胜利条件 consumer。
- 不应入库的弱结论：目标覆盖 witness 不单独 promote；首步 illegal 的过窄 case 不单独作为可动性证据；二格口 shortcut 不说明 P/L 可动。
- 是否打开新题材：yes，若后续要推进，应是“目标塞子接非胜利 consumer”或“P/L 门闩接下游对象通道”的 composition probe，而不是补同一口型的普通变体。
