# Proposed Families: pl_boundary_sticky_groups

## 1. P/L sticky group handoff gate

- 建议：`supplement`，接到既有 `P/L pull 抽取把手` 与 `刚体黏块 + 墙口`，暂不单独 `promote`。
- designer 可用装置：P 侧先把 sticky group 推到 P/L 边界邻域，玩家绕到 L 侧后，用 pull 的前格门和 footprint 目标格门决定是否能继续抽出。
- 最小形式：固定 P/L 竖向分界；二格 sticky 横条在 P 侧，P 玩家从左侧 push 一格后，footprint 贴边或跨边；玩家经开放通道跨到 L 侧，站在右侧把手格 pull。
- active_rule：`push_force` / `pull_force` 在边界两侧对同一 sticky rigid footprint 的不同检查。
- material_source：B/S 只生成 sticky 横条或 L 形；不能写成 active_rule。
- consumer：L 侧玩家前格、sticky footprint 目标格、边界右侧把手格。
- 输入接口：有一个可被 P 侧 push 送到边界邻域的 sticky group；玩家能实际跨到 L 侧把手位；L 侧前格和 footprint 目标格可被局部墙格分别控制。
- 输出接口：成功抽出时 sticky group 进入 L 侧并把玩家留在其右侧；失败时保留边界邻域状态并暴露 `destination_blocked` 或 `force_blocked` 的原因分类。
- 适用变体：
  - `pl_sticky_bar_push_pull_extract`：开放前格和目标格，P push 后 L pull 成功。
  - `pl_sticky_bar_l_front_wall_gate`：同一前置状态，但 L 侧玩家前格墙导致 `destination_blocked`。
  - `pl_sticky_l_shape_target_wall_gate`：玩家前格开放，但 L 形下凸目标格撞墙导致 `force_blocked`。
- 误用边界：
  - 玩家没有跨 P/L，或只在 L 侧全程 pull sticky，不算本 family。
  - 只证明 sticky footprint 被墙挡住、没有 P push -> L pull handoff，不算本 family。
  - 只观察 B/S 生成 sticky，不算本 family。
- 旧语料重复风险：中到高。前格门与 footprint 门分别已有旧条目；本草案的可取点只在“P 侧送入边界状态被 L 侧 pull 消费”的组合接口。
- 证据：`runtime_observed`、`bounded_graph`、`graph_complete`；case1 是正例，case2 和 case4 是 consumption / correction 反例。

## 2. Boundary-spanning sticky handle return

- 建议：`supplement`；若 curator 需要更强设计用途，可作为 `P/L sticky group handoff gate` 的 reversible variant。
- designer 可用装置：让二格 sticky 横条初始跨 P/L 边界。P 侧 push 垂直移动后打开 L 侧把手，L 侧 pull 反向移动同一 footprint，形成可验证的边界回返。
- 最小形式：玩家在 P 侧、位于跨界横条上方左半；P push 下移 sticky；玩家走到 L 侧上方右半；L pull 上移 sticky；玩家走回初始 P 侧。
- active_rule：P 侧 `push_force` 与 L 侧 `pull_force` 对跨界 sticky footprint 的互补施力。
- material_source：B/S 只提供二格 sticky 横条。
- consumer：开放的 L 侧上拉把手格和 P/L 跨界步。
- 输入接口：sticky footprint 已跨界或紧贴边界；push 后必须留下一个 L 侧把手位，且 pull 前格开放。
- 输出接口：可以恢复初始 object footprint，证明该 handoff 不必然是单向债务；也可作为后续“必须保留回返把手”的局部检查。
- 适用 case：`pl_sticky_bar_open_handle_return`，动作序列最终变化格为无，runner 记录 `returnToInitial=yes depth=0`。
- 误用边界：如果回返只依赖大空间绕行而没有 L 侧 pull sticky，则应归为普通通道 shortcut；如果 sticky 没有跨界或贴边，则不是 P/L 真边界证据。
- 旧语料重复风险：中低。旧索引有 P/L 横向把手和 pull 抽取把手，但本 case 的对象是 sticky group，且以同一 footprint 的 push/pull 回返为接口。
- 证据：`runtime_observed`、`bounded_return`、`bounded_graph`、`graph_complete`。

## 不建议单独收录的材料

- `pl_sticky_bar_l_front_wall_gate` 单独只复述 pull 世界玩家前格门，建议只作为 handoff gate 的反例。
- `pl_sticky_l_shape_target_wall_gate` 单独只复述 sticky footprint 被墙消费，建议只作为 handoff gate 的 L 形 correction。
- 本 topic 没有证明 B/S 边界差异；B/S 只能在最终语料中保留为 material_source。
