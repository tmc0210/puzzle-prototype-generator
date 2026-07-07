# Curator Refresh Decisions: ra_curator_refresh_01

本 refresh 只读取 `prototypes/reality_anchor/mechanism_lab/` 下的 lexicon 与 run 证据。未读取 design archive、levels、reports、candidate、playtest review、人类评价或 sampler/template 材料。

目标：按新门槛复审现有 lexicon。正式顶层条目必须至少有 `consumption_probe`，也就是结构输出被一个极小后续约束消费过。只有事件 witness、单纯 producer 或只改变 driver 的材料，不再作为顶层 lexicon 条目。

## 决策表

| 旧条目 | 决策 | 新位置 | 理由 |
|---|---|---|---|
| 刚体黏块推进后的回返谱系 | promote | `刚体黏块 + 墙口：反向施力格谱系` | 本身是 consumer：墙口、把手、口宽实际消费 sticky footprint，改变回返性和动作集合。 |
| P/L 长轴墙廊棘轮 | promote | `P/L 长轴墙廊：L 端余量棘轮` | 墙廊和 L 端余量消费 P/L 长轴位移，侧廊反例证明绕行不是 shortcut。 |
| P/L 横向把手的墙格门 | promote | `P/L 横向把手：玩家前格门与锚点 footprint 门` | 墙格分别消费玩家前格、锚点另一半目标格和首步后回返门。 |
| B/S 绑定债 | promote | `B/S 绑定债：箱资源生成刚体 footprint` | 大部分变体是 producer，但 `bind_bar_choke` 已经提供最小 consumption probe：单行走廊消费横条输出。 |
| B/S 解绑定债 | defer | 不作为顶层 lexicon；保留在 run 证据 | 旧证据主要在开放房间证明资源形态，缺少目标口、门口或墙结构消费输出。需要下一轮补 consumption probe。 |
| B/S 移动边界刷子 | merge | `B/S 移动边界刷产物：远程生成与门口消费` | producer 本身和 `边界刷产物的门口消费谱` 合并，才能形成完整输入 / 输出 / 消费接口。 |
| P/L pull 抽取把手 | promote | `P/L pull 抽取把手：前格门、footprint 门与扫带` | 前格墙、footprint 侧向墙、侧向 crate 扫带分别消费 pull 输出。 |
| 边界刷产物的门口消费谱 | merge | `B/S 移动边界刷产物：远程生成与门口消费` | 它是移动边界刷产物的下游 consumer，合并后更适合作为 designer 检索接口。 |
| P/L 驱动的 B/S 边界刷子 | supplement | `B/S 移动边界刷产物` 的输入侧补充 | push / pull / stroke 是 driver 差异，输出与消费方式仍归入移动边界刷子。 |
| 尾债再消费 | defer | 保留在 `ra_struct_tail_selector_01` | 有探索价值，但当前更像既有移动边界刷与门口消费谱的组合链，缺少新构型核心。 |
| Pull 刷子 stroke 选择器 | supplement | `B/S 移动边界刷产物` 的输入侧补充 | 距离 / 次数控制的是 driver 侧调位，不是新顶层结构族。 |

## 未补新实验的原因

本次 refresh 的目标是 curator 复审与重写，不是继续探索。现有 run 已经为 6 个正式条目提供了足够的 `consumption_probe`：

- sticky footprint 被墙口、口宽和把手消费。
- P/L 长轴位移被墙廊和 L 端余量消费。
- P/L 横向位移被玩家前格门和 anchor footprint 门消费。
- 绑定债的横条输出被单行走廊消费。
- 移动边界刷产物被同一门口、低墙和列间隙消费。
- pull 抽取被前格门、footprint 门和侧向 blocker 消费。

`B/S 解绑定债` 缺少这类消费证据，因此降级，不用想象补写。

## 下一轮推荐 probe

1. `unbind_debt_target_gate_probe`
   - 目标：证明 `C+M`、`CC`、竖向双 crate、`C+MM` 在目标口或单格门里产生不同消费结果。
   - 对照：目标少一个、门口宽一格、尾债空间开放。

2. `binding_to_wall_mouth_composition_probe`
   - 目标：把 `绑定债` 输出的 2 格条、3 格条、L 形接入同一个墙口回返结构。
   - 观察：正确 footprint 是否吞掉回返站位，错误 footprint 是否仍可回返或卡错把手。

3. `brush_tail_goal_fill_probe`
   - 目标：比较 `CC`、`C+M`、`C+MM` 在目标回填中是否留下不同尾债。
   - 对照：去掉尾债目标、拓宽尾债通道、移除低墙。

4. `pull_sweep_sticky_blocker_probe`
   - 目标：把 `P/L pull 抽取把手` 的侧向 blocker 从 crate 换成 sticky 部件。
   - 观察：扫带是资源移交、刚体合并，还是 footprint 关闭。
