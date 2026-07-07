# Reality Anchor 机制语料当前索引

本文件是当前状态入口，给 controller / curator 和短周期 explorer 快速避重、选缺口和生成 brief。正式语料正文仍以 `lexicon.md` 为准；历史 refresh / decision 文件只是当时快照，默认不读。

## B/S 绑定债：箱资源生成刚体 footprint

- 一句话用途：把多个可分配箱子压成横条、L 形、分离部件或宽塞等 sticky footprint 材料。
- 输入接口：至少两个 crate 能跨入 sticky 侧，入场邻接图和节奏可控，并有后续墙口、门口或通道消费 footprint。
- 输出接口：2 格横条、L 形占角件、分离 sticky 部件、宽塞，或桥接既有端点形成更大 connected footprint。
- 主要消费方式：单行走廊、目标口宽、刚体墙口回返谱系、后续固定边界切割。
- 证据强度：`consumption_probe`，含 `runtime_observed`、`bounded_graph`、部分 `graph_complete`。
- 仍缺：更多绑定形状进入同一 consumer 的 composition probe，尤其 L 形、横向桥接和桥接后切割。

## 固定 B/S 切割：C+M 尾巴与单格目标袋

- 一句话用途：把横向二连 sticky 切成可单独上推的 crate 左格和保留在旁边的 sticky 尾债。
- 输入接口：横向二连资源、固定 B/S 边界切在两格之间、玩家能绕到左格下方、上方目标袋只容纳单格。
- 输出接口：`C+M` 的可分离左格、sticky 尾债；对照是未切开的 `MM` 和本来可分离的 `CC`。
- 主要消费方式：单格目标袋消费可分离左格，双格袋口作为 shortcut 反例。
- 证据强度：`consumption_probe`，含 `runtime_observed`、`bounded_graph`、`graph_complete`。
- 仍缺：把 sticky 尾债接入第二段 consumer，比较 `C+MM`、`CC+M`、`MMM` 的尾债谱。

## 固定 B/S 断桥：sticky split 端点目标袋

- 一句话用途：把 C 形 connected sticky 切断成可单独消费的端点和 crate 桥债。
- 输入接口：C 形 sticky footprint、固定 B/S 边界切过连接桥、玩家能绕到端点下方、单格端点目标袋。
- 输出接口：上端点/下端点独立性、左柱 crate 桥债、未切断 C 形作为错误 footprint。
- 主要消费方式：上端点单格目标袋消费端点独立性；站位关闭和预分离端点作为边界 case。
- 证据强度：`consumption_probe`，含 `runtime_observed`、`bounded_graph`、`graph_complete`。
- 仍缺：上下端点双分配、crate 桥债的第二段消费、禁用 normalize 的 counterfactual。

## 刚体黏块 + 墙口：反向施力格谱系

- 一句话用途：用墙口、口宽和把手消费 sticky footprint，决定推进后是否保留反向施力格。
- 输入接口：2 格条、3 格条、4 格条、2x2 或 L 形 sticky footprint 被送入窄口、单列通道或把手附近。
- 输出接口：可回返 / 不可回返的局部状态、端点余量需求、L 形侧向把手需求、前沿目标格需求。
- 主要消费方式：墙口余量、端点外侧站位、2x2 整面空间、L 形凸出格把手、前沿墙齿。
- 证据强度：`consumption_probe`，含 `runtime_observed`、`bounded_return`、`bounded_graph`、`graph_complete`。
- 仍缺：把绑定债产出的多种 footprint 系统接入同一墙口，形成 producer -> consumer 的 composition probe。

## B/S 移动边界刷产物：远程生成与门口消费

- 一句话用途：移动 B/S 边界选择远处产物，再让同一门口消费 `CC`、`C+M`、`C+MM`、2x2 或双柱。
- 输入接口：可移动 B/S anchor、远处 footprint、边界能跨线，driver 可是 push / pull / 力链搬运。
- 输出接口：释放箱链、单箱加尾债、大 footprint gate、分柱 sticky 工具。
- 主要消费方式：门口、低墙、列间隙、目标回填或刚体墙口消费刷产物。
- 证据强度：`consumption_probe`，含 `runtime_observed`、`bounded_return`、`graph_complete`。
- 仍缺：目标回填版本，证明不同刷产物覆盖目标后留下不同尾债和 shortcut。

## P/L 长轴墙廊：L 端余量棘轮

- 一句话用途：把水平 P/L 在一格高墙廊中变成消耗 L 端余量的单向位移资源。
- 输入接口：水平 P/L 位于长轴墙廊，玩家从 P 侧 push，L 端前方余量为 0 / 1 / 2，可选侧廊。
- 输出接口：首步 illegal、一次性停位、多次推进能力，或侧廊开放但仍不能反向恢复。
- 主要消费方式：停位容量、一次性开关、门闩、移动 B/S 边界刷子的 driver。
- 证据强度：`consumption_probe`，含 `runtime_observed`、`bounded_return`、`graph_complete`。
- 仍缺：接到移动边界刷子的 recipe probe，确认棘轮位移不只是 driver 说明。

## P/L 横向把手：玩家前格门与锚点 footprint 门

- 一句话用途：把横向 P/L 的垂直 push / pull 拆成玩家前格门、另一半 footprint 门和回返门。
- 输入接口：横向 P/L、P 侧 push 或 L 侧 pull 站位、上下目标格和玩家 pull 前格可分别被墙控制。
- 输出接口：首步合法、`destination_blocked`、`force_blocked`、首步后回返门关闭。
- 主要消费方式：墙格分类器、移动边界刷子的把手前置条件、轻量承诺点。
- 证据强度：`consumption_probe`，含 `runtime_observed`、`bounded_return`、`graph_complete`。
- 仍缺：与移动边界刷子串接，比较 push driver 与 pull driver 是否制造不同 shortcut。

## P/L pull 抽取把手：前格门、footprint 门与扫带

- 一句话用途：把 pull 抽取拆成玩家前格、被拉对象 footprint 目标格和侧向 blocker 类型三层门。
- 输入接口：玩家处于 pull 侧，身后有 crate、B/S anchor 或其他 footprint，前格和目标格可被墙 / crate / sticky 控制。
- 输出接口：单格抽入玩家旧格、沿轴二格整体抽出、垂直二格因侧向目标位合法或非法、侧向 crate 扫带。
- 主要消费方式：远程抽出 B/S anchor、口袋资源抽取、侧向扫带资源移交。
- 证据强度：`consumption_probe`，含 `runtime_observed`、`bounded_return`、`graph_complete`。
- 仍缺：把侧向 blocker 换成 sticky，验证扫带后是资源移交、刚体合并还是 footprint 关闭。
