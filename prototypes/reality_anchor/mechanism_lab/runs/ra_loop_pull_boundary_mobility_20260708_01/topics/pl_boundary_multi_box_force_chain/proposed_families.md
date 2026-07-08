# Proposed Families: pl_boundary_multi_box_force_chain

## 候选 family：P/L 边界链端抽取分配器

建议：作为新 family 候选提交 curator；若已有更宽的 P/L 边界抽取条目，则并入为 multi-box / force-chain supplement。它已经不只是 driver witness，因为 `pl_chain2_pull_opens_lower_pocket` 证明了抽取后的空口可以被下游口袋消费。

### 设计装置

玩家在 P 侧把 2 个以上同轴箱链推到 P/L 边界邻域，形成一个整体移动的资源包。玩家绕到 L 侧后，pull 不会继续搬动整条链，只会抽走身后一格的近端箱；远端箱留在边界/P 侧，形成残余阻挡、残余资源或后续债务。

这个装置可以用作“链端分配器”：P 侧负责把多箱打包送到边界，L 侧负责从链端取走一个箱，并把剩余链留给另一个 consumer。

### 最小形式

- 一个 P/L 分界，玩家必须能从 P 侧实际跨到 L 侧。
- 至少两个同轴 crate；P 侧玩家站在链尾后方，可以推整链。
- L 侧有一条侧向把手通路，让玩家站到近端箱前方一格。
- L 侧 pull 方向的前格必须为空；如果前格被占用，该结构转为前格门反例。

### 适用变体

- `pl_chain2_pull_extract_near_end`: 二箱链，P 侧 `force_chain:n2` 后，L 侧 `pull_object:crate#2` 抽走近端，留下一个边界残余箱。
- `pl_chain3_pull_extract_near_end`: 三箱链，P 侧 `force_chain:n3` 后，同样的 L 侧抽取只移动近端箱，留下两个连续残余箱；链长是有效旋钮。
- `pl_chain2_pull_front_gate_blocked`: 前格被第三箱占用时，L 侧动作被 `pull_world_front_blocked` 拒绝，可作为锁门/反例 supplement。
- `pl_chain2_pull_opens_lower_pocket`: 近端箱被抽走后，原先被箱占住的 x=5 口打开，玩家能进入下方单格口袋；这是最小 consumer probe。

### 输入 / 输出接口

- 输入：P 侧可推链、跨界侧路、L 侧近端把手、至少两个 crate。
- 输出：一个被抽到 L 侧的新箱位置；一个仍留在 P 侧或边界邻域的残余链；可选的单格空口。
- 自然 consumer：单格口袋、目标口、回返门、前格阻挡箱、要求保留残余箱作为后续垫脚/阻挡的结构。
- 常见 shortcut：如果抽走近端箱正好让出口袋口，玩家可以不再处理整条链，直接通过空口进入被隔离区域。

### 机制角色

- `active_rule`: P/L push-chain vs pull-extract semantics；P 侧 `force_chain:n2/n3` 与 L 侧 `pull_object` 或 `pull_world_front_blocked` 的差异。
- `material_source`: 普通 crate 链；封闭 P/L anchor 只提供边界。
- `consumer`: 前格阻挡箱、下方单格口袋、跨界侧路。
- `incidental`: 目标格本轮只作为解析/口袋终点，不证明胜利装置。

### 误用边界

- 只有 P 侧推链、玩家没有实际跨过 P/L 分界线，不成立。
- 只有单箱 pull，不成立；必须有至少两个 crate 或 crate + anchor 参与同一局部资源差异。
- L 侧玩家没有贴住近端箱的身后一格时，只会走路，不构成抽取分配器。
- L 侧前格被占时不会抽取；这是前格门 supplement，不应被写成“抽取失败的不可达证明”。
- `returnToInitial.status=exhausted` 只能作为未知；本轮不能声称二箱/三箱抽取不可逆。

### 证据标签

- `runtime_observed`: 四个 case 均有动作回放。
- `bounded_graph`: 四个 case 的 reachable graph 均 complete。
- `consumption_probe`: `pl_chain2_pull_opens_lower_pocket`。
- `bounded_return`: 仅 `pl_chain2_pull_opens_lower_pocket` 支持 complete no；二箱/三箱抽取为 exhausted unknown，前格门 case 不适用。

## Supplement：L 侧前格门保险

建议：作为上述 family 的反例/supplement，而不是独立 family。它的设计用途是在 L 侧玩家已经贴住身后近端箱时，用前格占用强制拒绝 pull，形成“看似有把手但不能抽”的门控。

支撑 case：`pl_chain2_pull_front_gate_blocked`。事件链为 P 侧 `force_chain:n2`，跨界后 L 侧 `right` 被 `pull_world_front_blocked` 拒绝。

## Recipe 候选：抽近端打开单格口袋

建议：作为 composition/recipe 种子，不单列顶层 family。把链端抽取分配器接到一个单格口袋 mouth：P 侧推链先把近端箱放在 mouth 上，L 侧抽走近端后 mouth 打开，玩家通过口袋进入隔离区域。

支撑 case：`pl_chain2_pull_opens_lower_pocket`。第 7 步 `pull_object:crate#2` 后，后续 walk 进入下方 `+`，证明输出空口被消费。
