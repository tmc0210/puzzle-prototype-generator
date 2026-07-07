# 机制局部实验: ra_struct_boundary_pull_01

- 原型: reality_anchor
- 生成时间: 2026-07-07T02:35:45.001Z
- 标题: 移动边界刷子与 pull 抽取把手
- 备注: 本轮继续把规则当作公理，目标是产出两组可供 designer 使用的局部语料： B/S 锚点作为可移动切割线如何在不移动远处物体的情况下重写资源拓扑； P/L pull 侧如何按对象 footprint 与侧向余量形成抽取、卡住或扫带结构。


## 结构族摘要

### bs_moving_boundary_brush
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| brush_down_bar_full_release | 边界下刷：横条整行释放 | 基准：水平边界下移一格，完整覆盖 2 格横条所在行 | brush_down_vertical_partial, brush_parallel_preserve_bar | yes depth=11 | up, down, left, right | - | complete / 15231 states |
| brush_down_vertical_partial | 边界下刷：竖条切头 | 把横条改为跨越两行的竖条，边界只覆盖上半格 | brush_down_bar_full_release, brush_down_l_tail | yes depth=11 | up, down, left, right | - | complete / 14989 states |
| brush_down_l_tail | 边界下刷：L 形留尾 | 把竖条尾部扩成横向 L 底，切割线只释放上颈 | brush_down_vertical_partial, brush_up_bind_square | yes depth=11 | up, down, left, right | - | complete / 16094 states |
| brush_parallel_preserve_bar | 边界平移：保留横条债 | 把垂直下刷改为沿边界方向横移，边界行不跨过对象 | brush_down_bar_full_release | yes depth=9 | up, down, left, right | - | complete / 13171 states |
| brush_up_bind_square | 边界上刷：两行资源绑定成 2x2 | 边界上移一格，把上行 crate 纳入 sticky 侧并与下行 sticky 正交连接 | brush_up_gap_keeps_columns, brush_down_bar_full_release | yes depth=11 | up, down, left, right | - | complete / 24936 states |
| brush_up_gap_keeps_columns | 边界上刷：隔列保留两个柱状工具 | 在上刷绑定基准中加入一列间隙，阻止两个柱合并为大块 | brush_up_bind_square | yes depth=11 | up, down, left, right | - | complete / 32781 states |

### pl_pull_extraction_footprint
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| pull_crate_pocket_extract | 单 crate 抽取 | 基准：pull 前格空、身后单格 crate | pull_crate_front_wall, pull_bs_horizontal_axis | yes depth=9 | up, down, left | right:pull_world_front_blocked | complete / 2163 states |
| pull_crate_front_wall | 前格墙封死抽取 | 保留身后 crate，但把玩家前格换成墙 | pull_crate_pocket_extract | not applicable: replay stopped at illegal action; return search skipped | up, down | left:destination_blocked, right:pull_world_front_blocked | complete / 787 states |
| pull_bs_horizontal_axis | 二格锚点沿轴抽取 | 把身后单 crate 换成沿 pull 轴排列的 B/S 二格物体 | pull_crate_pocket_extract, pull_bs_vertical_side_open | yes depth=11 | up, down, left | right:pull_world_front_blocked | complete / 1531 states |
| pull_bs_vertical_side_open | 竖向锚点需要侧向余量 | 把 B/S 二格物体转为垂直 footprint，并开放下半格的目标位 | pull_bs_vertical_side_wall, pull_bs_horizontal_axis | yes depth=9 | up, down, left | right:pull_world_front_blocked | complete / 2449 states |
| pull_bs_vertical_side_wall | 侧向目标墙封死竖向抽取 | 保持玩家前格开放，但堵住垂直锚点下半格的目标位 | pull_bs_vertical_side_open, pull_crate_front_wall | not applicable: replay stopped at illegal action; return search skipped | up | down:destination_blocked, left:force_blocked, right:pull_world_front_blocked | complete / 1291 states |
| pull_bs_vertical_side_sweep_crate | 竖向锚点扫带侧箱 | 把侧向目标墙换成可移动 crate，抽取时同步扫走侧箱 | pull_bs_vertical_side_wall, pull_bs_vertical_side_open | yes depth=11 | up, left | down:pull_world_front_blocked, right:pull_world_front_blocked | complete / 4483 states |

## brush_down_bar_full_release

结构族: bs_moving_boundary_brush
变体: 边界下刷：横条整行释放
变化变量: 基准：水平边界下移一格，完整覆盖 2 格横条所在行
对照: brush_down_vertical_partial, brush_parallel_preserve_bar

问题: 移动 B/S 边界而不移动远处对象，把一个 sticky 横条整行回收为两个 crate。
动作序列: down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=80000, maxTransitions=200000

layout:
```text
##########
#.@.....G#
#.B......#
#.S..MM..#
#........#
#........#
##########
```

初始状态:
```text
##########
#.@.....G#
#.B......#
#.S..MM..#
#........#
#........#
##########
```

动作回放:
- 1. down: legal; events=push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,sticky_to_box:n2; eventWin=no
```text
##########
#.......G#
#.@......#
#.B..CC..#
#.S......#
#........#
##########
```

最终状态:
```text
##########
#.......G#
#.@......#
#.B..CC..#
#.S......#
#........#
##########
```
变化格: (2,1) @->.; (2,2) B->@; (2,3) S->B; (5,3) M->C; (6,3) M->C; (2,4) .->S

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,1\|C:5,3;6,3\|M:\|PL:none\|BS:B:2,3;S:2,4 |
| down | yes | push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky | Ply:2,3\|C:5,3;6,3\|M:\|PL:none\|BS:B:2,4;S:2,5 |
| left | yes | walk | Ply:1,2\|C:5,3;6,3\|M:\|PL:none\|BS:B:2,3;S:2,4 |
| right | yes | walk | Ply:3,2\|C:5,3;6,3\|M:\|PL:none\|BS:B:2,3;S:2,4 |

回到初始: yes, depth=11, path=left down down down right up left up up up right
局部可达图: status=complete, states=15231, transitions=32005, winStates=47, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=787, box_to_sticky:n1=264, box_to_sticky:n2=19, force_chain:n2=154, force_chain:n3=13, move_sticky_rigid=726, push_object:box_sticky_anchor=720, push_object:crate#1=1055, push_object:crate#2=726, push_object:sticky#1=693, push_object:sticky#2=26, sticky_merge:n1=57, sticky_to_box:n1=59, sticky_to_box:n2=75, walk=28785

## brush_down_vertical_partial

结构族: bs_moving_boundary_brush
变体: 边界下刷：竖条切头
变化变量: 把横条改为跨越两行的竖条，边界只覆盖上半格
对照: brush_down_bar_full_release, brush_down_l_tail

问题: 同样下刷一格，竖条被改写为 crate 头部和 sticky 尾部，适合制造部分释放债。
动作序列: down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=80000, maxTransitions=200000

layout:
```text
##########
#.@.....G#
#.B......#
#.S..M...#
#....M...#
#........#
##########
```

初始状态:
```text
##########
#.@.....G#
#.B......#
#.S..M...#
#....M...#
#........#
##########
```

动作回放:
- 1. down: legal; events=push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,sticky_to_box:n1; eventWin=no
```text
##########
#.......G#
#.@......#
#.B..C...#
#.S..M...#
#........#
##########
```

最终状态:
```text
##########
#.......G#
#.@......#
#.B..C...#
#.S..M...#
#........#
##########
```
变化格: (2,1) @->.; (2,2) B->@; (2,3) S->B; (5,3) M->C; (2,4) .->S

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,1\|C:5,3\|M:5,4\|PL:none\|BS:B:2,3;S:2,4 |
| down | yes | push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,sticky_to_box:n1 | Ply:2,3\|C:5,3;5,4\|M:\|PL:none\|BS:B:2,4;S:2,5 |
| left | yes | walk | Ply:1,2\|C:5,3\|M:5,4\|PL:none\|BS:B:2,3;S:2,4 |
| right | yes | walk | Ply:3,2\|C:5,3\|M:5,4\|PL:none\|BS:B:2,3;S:2,4 |

回到初始: yes, depth=11, path=left down down down right up left up up up right
局部可达图: status=complete, states=14989, transitions=32069, winStates=25, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=839, box_to_sticky:n1=233, force_chain:n2=216, force_chain:n3=9, move_sticky_rigid=915, push_object:box_sticky_anchor=744, push_object:crate#1=1023, push_object:crate#2=427, push_object:sticky#1=862, push_object:sticky#2=27, sticky_merge:n1=55, sticky_to_box:n1=194, sticky_to_box:n2=6, walk=28986

## brush_down_l_tail

结构族: bs_moving_boundary_brush
变体: 边界下刷：L 形留尾
变化变量: 把竖条尾部扩成横向 L 底，切割线只释放上颈
对照: brush_down_vertical_partial, brush_up_bind_square

问题: 切割 L 形上颈时，释放出的 crate 头与保留的 sticky 尾构成不同后续资源形态。
动作序列: down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=80000, maxTransitions=200000

layout:
```text
##########
#.@.....G#
#.B......#
#.S..M...#
#....MM..#
#........#
##########
```

初始状态:
```text
##########
#.@.....G#
#.B......#
#.S..M...#
#....MM..#
#........#
##########
```

动作回放:
- 1. down: legal; events=push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,sticky_to_box:n1; eventWin=no
```text
##########
#.......G#
#.@......#
#.B..C...#
#.S..MM..#
#........#
##########
```

最终状态:
```text
##########
#.......G#
#.@......#
#.B..C...#
#.S..MM..#
#........#
##########
```
变化格: (2,1) @->.; (2,2) B->@; (2,3) S->B; (5,3) M->C; (2,4) .->S

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,1\|C:5,3\|M:5,4;6,4\|PL:none\|BS:B:2,3;S:2,4 |
| down | yes | push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,sticky_to_box:n2 | Ply:2,3\|C:5,3;5,4;6,4\|M:\|PL:none\|BS:B:2,4;S:2,5 |
| left | yes | walk | Ply:1,2\|C:5,3\|M:5,4;6,4\|PL:none\|BS:B:2,3;S:2,4 |
| right | yes | walk | Ply:3,2\|C:5,3\|M:5,4;6,4\|PL:none\|BS:B:2,3;S:2,4 |

回到初始: yes, depth=11, path=left down down down right up left up up up right
局部可达图: status=complete, states=16094, transitions=32301, winStates=20, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=782, box_to_sticky:n1=350, box_to_sticky:n2=7, force_chain:n2=374, force_chain:n3=31, force_chain:n4=1, move_sticky_rigid=939, push_object:box_sticky_anchor=678, push_object:crate#1=1063, push_object:crate#2=666, push_object:crate#3=383, push_object:sticky#1=899, push_object:sticky#2=14, sticky_merge:n1=112, sticky_to_box:n1=75, sticky_to_box:n2=146, sticky_to_box:n3=3, walk=28598

## brush_parallel_preserve_bar

结构族: bs_moving_boundary_brush
变体: 边界平移：保留横条债
变化变量: 把垂直下刷改为沿边界方向横移，边界行不跨过对象
对照: brush_down_bar_full_release

问题: 沿边界方向搬运 B/S 锚点时，远处 sticky 横条保持为刚体债，可作为延迟切割的调位结构。
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=80000, maxTransitions=200000

layout:
```text
##########
#.......G#
#@B......#
#.S..MM..#
#........#
#........#
##########
```

初始状态:
```text
##########
#.......G#
#@B......#
#.S..MM..#
#........#
#........#
##########
```

动作回放:
- 1. right: legal; events=push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky; eventWin=no
```text
##########
#.......G#
#.@B.....#
#..S.MM..#
#........#
#........#
##########
```

最终状态:
```text
##########
#.......G#
#.@B.....#
#..S.MM..#
#........#
#........#
##########
```
变化格: (1,2) @->.; (2,2) B->@; (3,2) .->B; (2,3) S->.; (3,3) .->S

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,1\|C:\|M:5,3;6,3\|PL:none\|BS:B:3,2;S:3,3 |
| down | yes | walk | Ply:2,3\|C:\|M:5,3;6,3\|PL:none\|BS:B:3,2;S:3,3 |
| left | yes | walk | Ply:1,2\|C:\|M:5,3;6,3\|PL:none\|BS:B:3,2;S:3,3 |
| right | yes | push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky | Ply:3,2\|C:\|M:5,3;6,3\|PL:none\|BS:B:4,2;S:4,3 |

回到初始: yes, depth=9, path=up right right down left up left left down
局部可达图: status=complete, states=13171, transitions=27406, winStates=48, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=904, box_to_sticky:n1=244, box_to_sticky:n2=21, force_chain:n2=171, force_chain:n3=20, move_sticky_rigid=731, push_object:box_sticky_anchor=818, push_object:crate#1=847, push_object:crate#2=561, push_object:sticky#1=692, push_object:sticky#2=20, sticky_merge:n1=54, sticky_to_box:n1=57, sticky_to_box:n2=79, walk=24468

## brush_up_bind_square

结构族: bs_moving_boundary_brush
变体: 边界上刷：两行资源绑定成 2x2
变化变量: 边界上移一格，把上行 crate 纳入 sticky 侧并与下行 sticky 正交连接
对照: brush_up_gap_keeps_columns, brush_down_bar_full_release

问题: 移动边界线也能把未移动的 crate 行压进既有 sticky 行，形成一个 2x2 刚体工具。
动作序列: up
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=80000, maxTransitions=200000

layout:
```text
##########
#.......G#
#........#
#.B..CC..#
#.S..MM..#
#.@......#
##########
```

初始状态:
```text
##########
#.......G#
#........#
#.B..CC..#
#.S..MM..#
#.@......#
##########
```

动作回放:
- 1. up: legal; events=push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,box_to_sticky:n2,sticky_merge:n1; eventWin=no
```text
##########
#.......G#
#.B......#
#.S..MM..#
#.@..MM..#
#........#
##########
```

最终状态:
```text
##########
#.......G#
#.B......#
#.S..MM..#
#.@..MM..#
#........#
##########
```
变化格: (2,2) .->B; (2,3) B->S; (5,3) C->M; (6,3) C->M; (2,4) S->@; (2,5) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky | Ply:2,3\|C:\|M:5,3;6,3;5,4;6,4\|PL:none\|BS:B:2,1;S:2,2 |
| down | yes | walk | Ply:2,5\|C:\|M:5,3;6,3;5,4;6,4\|PL:none\|BS:B:2,2;S:2,3 |
| left | yes | walk | Ply:1,4\|C:\|M:5,3;6,3;5,4;6,4\|PL:none\|BS:B:2,2;S:2,3 |
| right | yes | walk | Ply:3,4\|C:\|M:5,3;6,3;5,4;6,4\|PL:none\|BS:B:2,2;S:2,3 |

回到初始: yes, depth=11, path=left up up up right down left down down down right
局部可达图: status=complete, states=24936, transitions=47314, winStates=96, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=1201, box_to_sticky:n1=666, box_to_sticky:n2=60, box_to_sticky:n3=2, force_chain:n2=873, force_chain:n3=122, force_chain:n4=7, move_sticky_rigid=1582, push_object:box_sticky_anchor=1061, push_object:crate#1=1421, push_object:crate#2=1257, push_object:crate#3=641, push_object:crate#4=455, push_object:sticky#1=1411, push_object:sticky#2=41, sticky_merge:n1=353, sticky_to_box:n1=23, sticky_to_box:n2=317, sticky_to_box:n3=6, walk=41027

## brush_up_gap_keeps_columns

结构族: bs_moving_boundary_brush
变体: 边界上刷：隔列保留两个柱状工具
变化变量: 在上刷绑定基准中加入一列间隙，阻止两个柱合并为大块
对照: brush_up_bind_square

问题: 同样上刷绑定两行资源，列间隙会保留两个独立柱状工具，而不是一个 2x2 刚体。
动作序列: up
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=80000, maxTransitions=200000

layout:
```text
##########
#.......G#
#........#
#.B..C.C.#
#.S..M.M.#
#.@......#
##########
```

初始状态:
```text
##########
#.......G#
#........#
#.B..C.C.#
#.S..M.M.#
#.@......#
##########
```

动作回放:
- 1. up: legal; events=push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,box_to_sticky:n2,sticky_merge:n2; eventWin=no
```text
##########
#.......G#
#.B......#
#.S..M.M.#
#.@..M.M.#
#........#
##########
```

最终状态:
```text
##########
#.......G#
#.B......#
#.S..M.M.#
#.@..M.M.#
#........#
##########
```
变化格: (2,2) .->B; (2,3) B->S; (5,3) C->M; (7,3) C->M; (2,4) S->@; (2,5) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky | Ply:2,3\|C:\|M:5,3;5,4\|7,3;7,4\|PL:none\|BS:B:2,1;S:2,2 |
| down | yes | walk | Ply:2,5\|C:\|M:5,3;5,4\|7,3;7,4\|PL:none\|BS:B:2,2;S:2,3 |
| left | yes | walk | Ply:1,4\|C:\|M:5,3;5,4\|7,3;7,4\|PL:none\|BS:B:2,2;S:2,3 |
| right | yes | walk | Ply:3,4\|C:\|M:5,3;5,4\|7,3;7,4\|PL:none\|BS:B:2,2;S:2,3 |

回到初始: yes, depth=11, path=left up up up right down left down down down right
局部可达图: status=complete, states=32781, transitions=61273, winStates=122, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=1542, box_to_sticky:n1=747, box_to_sticky:n2=78, box_to_sticky:n3=7, force_chain:n2=1007, force_chain:n3=90, force_chain:n4=3, move_sticky_rigid=3096, push_object:box_sticky_anchor=1294, push_object:crate#1=2041, push_object:crate#2=1534, push_object:crate#3=708, push_object:crate#4=207, push_object:sticky#1=2202, push_object:sticky#2=669, push_object:sticky#3=4, sticky_merge:n1=683, sticky_merge:n2=6, sticky_to_box:n1=385, sticky_to_box:n2=253, sticky_to_box:n3=7, walk=52614

## pull_crate_pocket_extract

结构族: pl_pull_extraction_footprint
变体: 单 crate 抽取
变化变量: 基准：pull 前格空、身后单格 crate
对照: pull_crate_front_wall, pull_bs_horizontal_axis

问题: P/L pull 侧提供一个抽取把手：玩家离开对象，crate 填入玩家旧格。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=80000, maxTransitions=200000

layout:
```text
#########
#PL....G#
#.......#
#..@C...#
#.......#
#########
```

初始状态:
```text
#########
#PL....G#
#.......#
#..@C...#
#.......#
#########
```

动作回放:
- 1. left: legal; events=pull_object:crate#1; eventWin=no
```text
#########
#PL....G#
#.......#
#.@C....#
#.......#
#########
```

最终状态:
```text
#########
#PL....G#
#.......#
#.@C....#
#.......#
#########
```
变化格: (2,3) .->@; (3,3) @->C; (4,3) C->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,2\|C:3,3\|M:\|PL:P:1,1;L:2,1\|BS:none |
| down | yes | walk | Ply:2,4\|C:3,3\|M:\|PL:P:1,1;L:2,1\|BS:none |
| left | yes | pull_object:crate#1 | Ply:1,3\|C:2,3\|M:\|PL:P:1,1;L:2,1\|BS:none |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=9, path=up right right down right up left left down
局部可达图: status=complete, states=2163, transitions=4874, winStates=5, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=240, force_chain:n2=21, pull_object:crate#1=146, pull_object:push_pull_anchor=141, push_object:crate#1=68, push_object:push_pull_anchor=97, walk=4422

## pull_crate_front_wall

结构族: pl_pull_extraction_footprint
变体: 前格墙封死抽取
变化变量: 保留身后 crate，但把玩家前格换成墙
对照: pull_crate_pocket_extract

问题: 对象就在身后也不够；pull 抽取需要玩家先能离开，前格墙把抽取把手关闭。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=80000, maxTransitions=200000

layout:
```text
#########
#PL....G#
#.......#
#.#@C...#
#.......#
#########
```

初始状态:
```text
#########
#PL....G#
#.......#
#.#@C...#
#.......#
#########
```

动作回放:
- 1. left: illegal (destination_blocked); events=-; eventWin=no
```text
#########
#PL....G#
#.......#
#.#@C...#
#.......#
#########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#########
#PL....G#
#.......#
#.#@C...#
#.......#
#########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:4,3\|M:\|PL:P:1,1;L:2,1\|BS:none |
| down | yes | walk | Ply:3,4\|C:4,3\|M:\|PL:P:1,1;L:2,1\|BS:none |
| left | no | - | destination_blocked |
| right | no | - | pull_world_front_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=787, transitions=1708, winStates=4, maxDepth=14
事件类型: anchor_boundary_shift:push_pull=74, force_chain:n2=4, pull_object:crate#1=61, pull_object:push_pull_anchor=52, push_object:crate#1=32, push_object:push_pull_anchor=22, walk=1541

## pull_bs_horizontal_axis

结构族: pl_pull_extraction_footprint
变体: 二格锚点沿轴抽取
变化变量: 把身后单 crate 换成沿 pull 轴排列的 B/S 二格物体
对照: pull_crate_pocket_extract, pull_bs_vertical_side_open

问题: 沿抽取轴排列的二格物体可通过一格前进空间完成整体抽取，适合当作长把手或移动边界。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=80000, maxTransitions=200000

layout:
```text
#########
#PL....G#
#.......#
#..@BS..#
#.......#
#########
```

初始状态:
```text
#########
#PL....G#
#.......#
#..@BS..#
#.......#
#########
```

动作回放:
- 1. left: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky; eventWin=no
```text
#########
#PL....G#
#.......#
#.@BS...#
#.......#
#########
```

最终状态:
```text
#########
#PL....G#
#.......#
#.@BS...#
#.......#
#########
```
变化格: (2,3) .->@; (3,3) @->B; (4,3) B->S; (5,3) S->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,2\|C:\|M:\|PL:P:1,1;L:2,1\|BS:B:3,3;S:4,3 |
| down | yes | walk | Ply:2,4\|C:\|M:\|PL:P:1,1;L:2,1\|BS:B:3,3;S:4,3 |
| left | yes | pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky | Ply:1,3\|C:\|M:\|PL:P:1,1;L:2,1\|BS:B:2,3;S:3,3 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=11, path=up right right right down right up left left left down
局部可达图: status=complete, states=1531, transitions=3372, winStates=4, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=208, anchor_boundary_shift:push_pull=173, force_chain:n2=23, pull_object:box_sticky_anchor=144, pull_object:push_pull_anchor=100, push_object:box_sticky_anchor=49, push_object:push_pull_anchor=65, walk=3014

## pull_bs_vertical_side_open

结构族: pl_pull_extraction_footprint
变体: 竖向锚点需要侧向余量
变化变量: 把 B/S 二格物体转为垂直 footprint，并开放下半格的目标位
对照: pull_bs_vertical_side_wall, pull_bs_horizontal_axis

问题: 垂直 footprint 的抽取不仅需要玩家前格，还需要侧向半格能同步平移。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=80000, maxTransitions=200000

layout:
```text
#########
#PL....G#
#.......#
#..@S...#
#...B...#
#.......#
#########
```

初始状态:
```text
#########
#PL....G#
#.......#
#..@S...#
#...B...#
#.......#
#########
```

动作回放:
- 1. left: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky; eventWin=no
```text
#########
#PL....G#
#.......#
#.@S....#
#..B....#
#.......#
#########
```

最终状态:
```text
#########
#PL....G#
#.......#
#.@S....#
#..B....#
#.......#
#########
```
变化格: (2,3) .->@; (3,3) @->S; (4,3) S->.; (3,4) .->B; (4,4) B->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,2\|C:\|M:\|PL:P:1,1;L:2,1\|BS:B:3,4;S:3,3 |
| down | yes | walk | Ply:2,4\|C:\|M:\|PL:P:1,1;L:2,1\|BS:B:3,4;S:3,3 |
| left | yes | pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky | Ply:1,3\|C:\|M:\|PL:P:1,1;L:2,1\|BS:B:2,4;S:2,3 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=9, path=up right right down right up left left down
局部可达图: status=complete, states=2449, transitions=5480, winStates=5, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=340, anchor_boundary_shift:push_pull=250, force_chain:n2=25, pull_object:box_sticky_anchor=222, pull_object:push_pull_anchor=147, push_object:box_sticky_anchor=97, push_object:push_pull_anchor=99, walk=4915

## pull_bs_vertical_side_wall

结构族: pl_pull_extraction_footprint
变体: 侧向目标墙封死竖向抽取
变化变量: 保持玩家前格开放，但堵住垂直锚点下半格的目标位
对照: pull_bs_vertical_side_open, pull_crate_front_wall

问题: 竖向 footprint 的失败可以来自侧向目标位，而不是玩家前格；这给 designer 一个独立墙格门。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=80000, maxTransitions=200000

layout:
```text
#########
#PL....G#
#.......#
#..@S...#
#..#B...#
#.......#
#########
```

初始状态:
```text
#########
#PL....G#
#.......#
#..@S...#
#..#B...#
#.......#
#########
```

动作回放:
- 1. left: illegal (force_blocked); events=-; eventWin=no
```text
#########
#PL....G#
#.......#
#..@S...#
#..#B...#
#.......#
#########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#########
#PL....G#
#.......#
#..@S...#
#..#B...#
#.......#
#########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:\|PL:P:1,1;L:2,1\|BS:B:4,4;S:4,3 |
| down | no | - | destination_blocked |
| left | no | - | force_blocked |
| right | no | - | pull_world_front_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=1291, transitions=2773, winStates=3, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=162, anchor_boundary_shift:push_pull=124, force_chain:n2=13, pull_object:box_sticky_anchor=127, pull_object:push_pull_anchor=78, push_object:box_sticky_anchor=24, push_object:push_pull_anchor=44, walk=2500

## pull_bs_vertical_side_sweep_crate

结构族: pl_pull_extraction_footprint
变体: 竖向锚点扫带侧箱
变化变量: 把侧向目标墙换成可移动 crate，抽取时同步扫走侧箱
对照: pull_bs_vertical_side_wall, pull_bs_vertical_side_open

问题: 侧向目标位不是只能开或堵；放入可移动资源时，抽取动作会变成带走侧箱的扫带结构。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=80000, maxTransitions=200000

layout:
```text
#########
#PL....G#
#.......#
#..@S...#
#..CB...#
#.......#
#########
```

初始状态:
```text
#########
#PL....G#
#.......#
#..@S...#
#..CB...#
#.......#
#########
```

动作回放:
- 1. left: legal; events=pull_object:box_sticky_anchor,force_chain:n2,anchor_boundary_shift:box_sticky; eventWin=no
```text
#########
#PL....G#
#.......#
#.@S....#
#.CB....#
#.......#
#########
```

最终状态:
```text
#########
#PL....G#
#.......#
#.@S....#
#.CB....#
#.......#
#########
```
变化格: (2,3) .->@; (3,3) @->S; (4,3) S->.; (2,4) .->C; (3,4) C->B; (4,4) B->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | pull_object:crate#1,box_to_sticky:n1 | Ply:2,2\|C:\|M:2,3\|PL:P:1,1;L:2,1\|BS:B:3,4;S:3,3 |
| down | no | - | pull_world_front_blocked |
| left | yes | pull_object:box_sticky_anchor,force_chain:n2,anchor_boundary_shift:box_sticky | Ply:1,3\|C:1,4\|M:\|PL:P:1,1;L:2,1\|BS:B:2,4;S:2,3 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=11, path=up left down down right down left up right up right
局部可达图: status=complete, states=4483, transitions=8737, winStates=9, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=605, anchor_boundary_shift:push_pull=352, box_to_sticky:n1=44, force_chain:n2=84, force_chain:n3=1, move_sticky_rigid=161, pull_object:box_sticky_anchor=457, pull_object:crate#1=72, pull_object:push_pull_anchor=286, pull_object:sticky#1=72, push_object:box_sticky_anchor=120, push_object:crate#1=32, push_object:push_pull_anchor=62, push_object:sticky#1=62, sticky_to_box:n1=55, walk=7574

