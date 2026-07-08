# Proposed Families: sticky_wall_pull_shape_spectrum

## 建议收录方式

本补实验应并入正式结构族 `Pull 侧对象可动性：单箱基线与刚体墙口`，并把该结构族从“基础补充”提升为完整谱系条目。它不按 B/S 或 P/L 单独归属；B/S / P/L 只是提供材料和 pull side。

## 结构族：pull-side sticky footprint mouth and handle occupancy

### Designer 可用装置

玩家在 pull side 拉动 connected sticky footprint。墙口可以消费 footprint 的任一目标格；拉过口后，反向把手通路可以被墙、crate 或 sticky 尾债消费。crate blocker 与 sticky blocker 不等价：crate 可通过 B/S 转换和搬运形成资源移交，sticky blocker 会 merge 成更大刚体并关闭回返。

### 局部结构谱

```text
3 格竖条，中段目标格为墙 / 打开：
###########
#PL#.....G#
#BS#......#
#..#.M@...#
#..#.M#...#
#..#.M....#
#..#......#
###########

###########
#PL#.....G#
#BS#......#
#..#.M@...#
#..#.M....#
#..#.M....#
#..#......#
###########

2x2，右下目标格为墙 / 打开：
###########
#PL#.....G#
#BS#......#
#..#.MM@..#
#..#.MM#..#
#..#......#
###########

###########
#PL#.....G#
#BS#......#
#..#.MM@..#
#..#.MM...#
#..#......#
###########

上钩 L，远端目标格为墙 / 打开：
###########
#PL#.....G#
#BS#......#
#..#.MM#..#
#..#.M@...#
#..#......#
###########

###########
#PL#.....G#
#BS#......#
#..#.MM...#
#..#.M@...#
#..#......#
###########

沿轴 3 格横条 clear / 前格墙：
###########
#PL#.....G#
#BS#......#
#..#MMM@..#
#..#......#
###########

###########
#PL#.....G#
#BS#......#
#..#MMM@#.#
#..#......#
###########

post-mouth handle：open / box-side crate / sticky blocker：
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.M...#
##########

##########
#PL#....G#
#B.#..C..#
#S.#.M@..#
#..#.M...#
##########

##########
#PL#....G#
#BS#..M..#
#..#.M@..#
#..#.M...#
##########
```

### 机制角色

- `active_rule`: `pull_force` 对 sticky rigid footprint 的整体目标格检查；pull 后反向把手可达性；box/sticky blocker 的资源形态差异。
- `material_source`: B/S 只提供合法 sticky material；crate blocker case 中竖向 B/S 只用于让 blocker 保持 box-side crate。
- `consumer`: 中段目标墙、2x2 右下目标墙、L 形远端目标墙、玩家前格墙、post-mouth handle 通路中的 crate / sticky。
- `incidental`: 目标只满足 parser；P/L 只提供 pull side。

### 结构旋钮

- footprint 形状：3 格竖条、2x2、上钩 L、3 格横条。
- pull 方向：侧拉 / 沿轴拉。
- 目标墙位置：中段、右下、L 远端脚、玩家前格。
- post-mouth handle 占用物：空、box-side crate、sticky blocker。
- 回返路径：短回返、长回返、complete no。

### 可观测事实

- 3 格竖条和 2x2 的目标格墙反例都是 `force_blocked`；对应开口变体 legal 且 bounded return found。
- 上钩 L 打开远端目标格后 legal，但局部图 complete no；说明首步可动和回返是两层。
- 3 格横条沿轴 pull legal，但同样 complete no；沿轴版本的失败墙是玩家前格 `destination_blocked`，不是 footprint 侧向目标格。
- box-side crate blocker 不是硬封门：最终 return found depth 15，并出现 `box_to_sticky` / `sticky_to_box` / `sticky_merge` 事件。
- sticky blocker 会 merge 成三格竖向 sticky，并给出 complete no。

### 输入 / 输出接口

- 输入：pull side、玩家前格可控、身后 connected sticky footprint、墙口或把手占用物可控。
- 输出：legal pull / `force_blocked` / `destination_blocked` / merged larger sticky / 可回返或 complete no。
- 自然消费：墙口验证 footprint 形状；把手通路验证资源类型；下游结构可以要求保留或清除某个把手格。

### 误用边界

- 单格 sticky 不代表 sticky group 规则。
- 沿轴横条不能替代侧拉 footprint 目标格谱。
- box-side crate blocker 不能和 sticky blocker 合并解释；runtime 证据相反。
- complete no 只来自完整图；非法 replay 的 return not_applicable 不可当作 no。

### 证据

`run=ra_loop_pull_boundary_mobility_20260708_01_sticky_wall_pull_shape_spectrum`, `cases=bar3_side_pull_mid_wall_blocked,bar3_side_pull_open_mouth,square2_side_pull_lower_wall_blocked,square2_side_pull_open_mouth,l_upper_hook_pull_tooth_blocked,l_upper_hook_pull_notch_open,hbar3_axis_pull_clear,hbar3_axis_pull_front_wall_blocked,bar2_post_pull_handle_open_control,bar2_post_pull_handle_crate_blocker,bar2_post_pull_handle_sticky_blocker`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`
