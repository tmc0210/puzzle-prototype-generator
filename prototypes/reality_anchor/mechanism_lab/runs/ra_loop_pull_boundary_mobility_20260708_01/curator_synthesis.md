# Curator Synthesis: ra_loop_pull_boundary_mobility_20260708_01

## 输入

本轮包含 6 个 topic：

- `single_crate_pull_mobility`
- `sticky_wall_pull_mobility`
- `sticky_wall_pull_shape_spectrum`
- `pl_boundary_single_crate`
- `pl_boundary_sticky_groups`
- `pl_boundary_multi_box_force_chain`

所有 topic 都成功运行 `mechanism-lab-run --write` 并生成 runner 产物。`single_crate_pull_mobility`、`sticky_wall_pull_mobility`、`sticky_wall_pull_shape_spectrum` 合并支撑一个完整 pull-side object mobility 结构族。

## 总体收口

本轮收出两个正式结构族：

1. `Pull 侧对象可动性：单箱基线与刚体墙口`
2. `P/L 边界交接：推入、跨侧与抽取分配`

分类修正：

- 单箱 pull 和黏块组 + 墙不应拆到两个旧条目的边角。它们是一条对象可动性谱：单箱说明目标格等于玩家旧格，多格 sticky 说明 footprint 的额外目标格和把手通路如何被墙或资源占用物消费。
- `sticky_wall_pull_shape_spectrum` 补上了原先不足的 3 格竖条、2x2、L 形方向、沿轴横条和把手占用物，因此不把它写成 backlog 债务。
- P/L 边界 topic 保留为另一条结构族，因为它的关键不是 pull 基础语法，而是真跨界 handoff：P 侧推入边界邻域，L 侧抽取 / 分配同一局部状态。

## Topic 判定

### single_crate_pull_mobility

- 判定：`merge` 到 `Pull 侧对象可动性`。
- 作用：单箱基线、前格门、单格口袋 complete no、push-side undo shortcut。
- 关键校准：单箱目标格就是玩家旧格，不应写成独立 footprint target blocker。

### sticky_wall_pull_mobility

- 判定：`merge` 到 `Pull 侧对象可动性`。
- 作用：单格 sticky control、2 格竖条 footprint target mouth、L 形下凸目标墙、post-mouth handle open / wall closed。

### sticky_wall_pull_shape_spectrum

- 判定：`merge` 到 `Pull 侧对象可动性`。
- 作用：补齐 3 格竖条、2x2、上钩 L、3 格横条沿轴、box-side crate blocker、sticky blocker。
- 关键修正：box-side crate blocker 可通过转换 / 搬运回返，sticky blocker 会 merge 成更大刚体并 complete no；二者不能合并解释。

### pl_boundary_single_crate

- 判定：`promote` 到 `P/L 边界交接`。
- 真边界门槛：通过。P 侧 push handoff，玩家跨到 L 侧，L 侧 pull 或前格门消费同一 crate。

### pl_boundary_sticky_groups

- 判定：`supplement` 到 `P/L 边界交接`。
- 真边界门槛：通过。P 侧 push sticky group，玩家跨到 L 侧，再 pull 或触发 front / footprint gate。
- 归属校准：front / footprint gate 的基础事实来自 `Pull 侧对象可动性`，本 topic 的价值是跨界 handoff。

### pl_boundary_multi_box_force_chain

- 判定：`promote` 到 `P/L 边界交接`。
- 真边界门槛：通过。P 侧 `force_chain:n2/n3` 后，L 侧只抽近端，残余链留下；`pl_chain2_pull_opens_lower_pocket` 是 downstream consumer。

## 不新增 backlog

本轮不把黏块组 + 墙的 pull 变体留作 backlog。已经补跑并入正式语料。若之后继续，只应进入 composition / recipe 层面，例如把 pull-side footprint 输出接目标回填、残余债务或完整关卡骨架，而不是补基础可动性债。
