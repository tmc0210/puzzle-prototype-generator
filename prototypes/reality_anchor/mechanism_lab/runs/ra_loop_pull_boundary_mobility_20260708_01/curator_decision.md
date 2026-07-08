# Curator Decision: ra_loop_pull_boundary_mobility_20260708_01

## 决策摘要

- `promote`: 新增 `Pull 侧对象可动性：单箱基线与刚体墙口`。
- `promote`: 新增 `P/L 边界交接：推入、跨侧与抽取分配`。
- `merge`: `single_crate_pull_mobility`、`sticky_wall_pull_mobility`、`sticky_wall_pull_shape_spectrum` 合并为同一个 pull-side object mobility 结构族；不是塞进旧条目的边角。
- `supplement`: `pl_boundary_sticky_groups` 作为 `P/L 边界交接` 的 sticky footprint 变体，同时引用 pull-side object mobility 的 footprint 门事实。
- `relabel`: B/S 在 sticky 相关 topic 中只作为 `material_source`；不能按 B/S 边界 evidence 入库。
- `defer`: 无。本轮补实验已经覆盖原先明显缺口，不把 sticky pull 形状谱另写 backlog。

## 更新文件

已更新：

- `prototypes/reality_anchor/mechanism_lab/lexicon.md`
- `prototypes/reality_anchor/mechanism_lab/lexicon_index.md`

未更新：

- `prototypes/reality_anchor/mechanism_lab/backlog.md`

原因：用户要求不要把黏块组 + 墙的 pull 变体留债；本轮已新增 `sticky_wall_pull_shape_spectrum` 补实验并入正式语料。

## 证据引用

- `run=ra_loop_pull_boundary_mobility_20260708_01_single_crate_pull_mobility`
- `run=ra_loop_pull_boundary_mobility_20260708_01_sticky_wall_pull_mobility`
- `run=ra_loop_pull_boundary_mobility_20260708_01_sticky_wall_pull_shape_spectrum`
- `run=ra_loop_pull_boundary_mobility_20260708_01_pl_boundary_single_crate`
- `run=ra_loop_pull_boundary_mobility_20260708_01_pl_boundary_sticky_groups`
- `run=ra_loop_pull_boundary_mobility_20260708_01_pl_boundary_multi_box_force_chain`

## 范围校准

- `Pull 侧对象可动性` 是完整结构族：包含局部结构谱、机制角色、旋钮、可观测事实、输入 / 输出接口、自然消费、设计价值、误用边界和证据。
- 单箱 pull 和黏块组 + 墙属于同一条谱系：单箱是目标格等于玩家旧格的基线，多格 sticky 是 footprint 目标格检查的扩展。
- `sticky_wall_pull_shape_spectrum` 新增 3 格竖条、2x2、上钩 L、3 格横条沿轴、box-side crate blocker 和 sticky blocker，把原先缺口补成正式证据。
- `P/L 边界交接` 仍然要求 true boundary：玩家实际跨 P/L，两侧对同一对象或同一资源链发生不同语义的动作或门控。
- `returnToInitial.status=exhausted` 全部写成 unknown；只有 complete no 的 case 用作不可回返证据。
