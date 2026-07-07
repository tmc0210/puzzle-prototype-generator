# 机制局部实验: ra_struct_consumption_01

- 原型: reality_anchor
- 生成时间: 2026-07-07T02:55:26.399Z
- 标题: pull 驱动边界刷子与刷产物门口消费谱
- 备注: 本轮接续 lexicon 中的 B/S 移动边界刷子与 P/L pull 抽取把手。 目标不是再验证边界移动或 pull 规则，而是观察二者组合后能否成为新的局部装置： 用 pull 驱动 B/S 边界刷过远处对象，以及把边界刷产物推入同一门口消费位。


## 结构族摘要

### pl_driven_bs_boundary_brush
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| pull_brush_vertical_bind | pull 左移边界：竖列绑定 | 基准：pull 抽出横向 B/S anchor，使垂直 crate 列跨入 sticky 侧 | pull_brush_gap_preserves_parts, pull_parallel_preserves_remote | yes depth=15 | up, down, left | right:pull_world_front_blocked | complete / 8887 states |
| pull_brush_horizontal_bridge | pull 左移边界：横向桥接 | 把远处竖列改成横向相邻资源，左列跨线后与右列 sticky 接成横条 | pull_brush_vertical_bind, pull_brush_front_wall_closed | yes depth=15 | up, down, left | right:pull_world_front_blocked | complete / 9238 states |
| pull_brush_gap_preserves_parts | pull 左移边界：隔行保留部件 | 保持同一边界移动，但把远处 crate 分成隔行两点 | pull_brush_vertical_bind | yes depth=13 | up, down, left | right:pull_world_front_blocked | complete / 10123 states |
| pull_parallel_preserves_remote | pull 平移边界：远处资源不改写 | 把 pull 方向改为沿 B/S 边界平移，边界 x 位置不跨过远处对象 | pull_brush_vertical_bind | yes depth=11 | down, left, right | up:pull_world_front_blocked | complete / 5317 states |
| pull_brush_front_wall_closed | 玩家前格墙：刷子把手关闭 | 保留身后 B/S anchor 与远处资源，但用墙封住玩家 pull 前格 | pull_brush_vertical_bind, pull_brush_horizontal_bridge | not applicable: replay stopped at illegal action; return search skipped | up, down | left:destination_blocked, right:pull_world_front_blocked | complete / 2349 states |

### brush_product_door_consumption
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| door_cc_chain_push | 刷出 CC：双箱链式进门 | 基准：边界下刷把横条回收为 CC，再从左侧推入同一门口 | door_cm_tail_push, door_cmm_tail_push | yes depth=19 | up, down, left, right | - | complete / 15231 states |
| door_cm_tail_push | 刷出 C+M：单箱进门但留尾债 | 把横条产物改成竖条切头，得到 C+M 后再推 C 进入同一门口 | door_cc_chain_push, door_cmm_tail_push | yes depth=17 | up, down, left, right | - | complete / 14989 states |
| door_cmm_tail_push | 刷出 C+MM：单箱进门且留下宽尾 | 把竖条尾债扩成 L 形横尾，观察同一门口动作后的占位差异 | door_cm_tail_push, door_square_blocked_by_low_wall | unknown exhausted: state budget exceeded | up, down, left, right | - | complete / 16094 states |
| door_square_blocked_by_low_wall | 刷成 2x2：下沿墙封死门口 | 改为上刷绑定成 2x2，并在右侧下半格放墙，制造 footprint 门 | door_split_columns_one_column_passes, door_cmm_tail_push | not applicable: replay stopped at illegal action; return search skipped | up, down, left | right:force_blocked | complete / 8649 states |
| door_split_columns_one_column_passes | 刷成双柱：单柱先通过 | 在上刷绑定结构中加入列间隙，两个柱状工具分离，左柱可先被推入门口 | door_square_blocked_by_low_wall | yes depth=18 | up, down, left, right | - | complete / 29783 states |

## pull_brush_vertical_bind

结构族: pl_driven_bs_boundary_brush
变体: pull 左移边界：竖列绑定
变化变量: 基准：pull 抽出横向 B/S anchor，使垂直 crate 列跨入 sticky 侧
对照: pull_brush_gap_preserves_parts, pull_parallel_preserves_remote

问题: 一个 pull 把手同时移动 B/S 边界，把远处竖列 crate 改写成一个竖向 sticky 工具。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=90000, maxTransitions=220000

layout:
```text
##########
#PL.....G#
#...@BS..#
#....C...#
#....C...#
#........#
##########
```

初始状态:
```text
##########
#PL.....G#
#...@BS..#
#....C...#
#....C...#
#........#
##########
```

动作回放:
- 1. left: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,box_to_sticky:n2,sticky_merge:n1; eventWin=no
```text
##########
#PL.....G#
#..@BS...#
#....M...#
#....M...#
#........#
##########
```

最终状态:
```text
##########
#PL.....G#
#..@BS...#
#....M...#
#....M...#
#........#
##########
```
变化格: (3,2) .->@; (4,2) @->B; (5,2) B->S; (6,2) S->.; (5,3) C->M; (5,4) C->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,1\|C:\|M:5,3;5,4\|PL:P:1,1;L:2,1\|BS:B:4,2;S:5,2 |
| down | yes | walk | Ply:3,3\|C:\|M:5,3;5,4\|PL:P:1,1;L:2,1\|BS:B:4,2;S:5,2 |
| left | yes | pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky | Ply:2,2\|C:\|M:5,3;5,4\|PL:P:1,1;L:2,1\|BS:B:3,2;S:4,2 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=15, path=down down down right right right up up up right up left left left down
局部可达图: status=complete, states=8887, transitions=16012, winStates=1, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=753, anchor_boundary_shift:push_pull=923, box_to_sticky:n1=235, box_to_sticky:n2=21, force_chain:n2=155, force_chain:n3=17, force_chain:n4=3, move_sticky_rigid=466, pull_object:box_sticky_anchor=601, pull_object:crate#1=445, pull_object:crate#2=279, pull_object:push_pull_anchor=579, pull_object:sticky#1=369, pull_object:sticky#2=12, push_object:box_sticky_anchor=114, push_object:crate#1=125, push_object:crate#2=60, push_object:push_pull_anchor=333, push_object:sticky#1=16, sticky_merge:n1=83, sticky_to_box:n1=120, sticky_to_box:n2=72, walk=13079

## pull_brush_horizontal_bridge

结构族: pl_driven_bs_boundary_brush
变体: pull 左移边界：横向桥接
变化变量: 把远处竖列改成横向相邻资源，左列跨线后与右列 sticky 接成横条
对照: pull_brush_vertical_bind, pull_brush_front_wall_closed

问题: 同一个 pull 抽边界动作，可以把远处 C+M 桥接为横向 sticky 工具。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=90000, maxTransitions=220000

layout:
```text
##########
#PL.....G#
#...@BS..#
#....CC..#
#........#
#........#
##########
```

初始状态:
```text
##########
#PL.....G#
#...@BS..#
#....CM..#
#........#
#........#
##########
```

动作回放:
- 1. left: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
##########
#PL.....G#
#..@BS...#
#....MM..#
#........#
#........#
##########
```

最终状态:
```text
##########
#PL.....G#
#..@BS...#
#....MM..#
#........#
#........#
##########
```
变化格: (3,2) .->@; (4,2) @->B; (5,2) B->S; (6,2) S->.; (5,3) C->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,1\|C:\|M:5,3;6,3\|PL:P:1,1;L:2,1\|BS:B:4,2;S:5,2 |
| down | yes | walk | Ply:3,3\|C:\|M:5,3;6,3\|PL:P:1,1;L:2,1\|BS:B:4,2;S:5,2 |
| left | yes | pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky | Ply:2,2\|C:\|M:5,3;6,3\|PL:P:1,1;L:2,1\|BS:B:3,2;S:4,2 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=15, path=down down right right right right up up left right up left left left down
局部可达图: status=complete, states=9238, transitions=16612, winStates=1, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=794, anchor_boundary_shift:push_pull=805, box_to_sticky:n1=157, box_to_sticky:n2=3, force_chain:n2=233, force_chain:n3=9, force_chain:n4=4, move_sticky_rigid=750, pull_object:box_sticky_anchor=652, pull_object:crate#1=419, pull_object:crate#2=117, pull_object:push_pull_anchor=537, pull_object:sticky#1=567, pull_object:sticky#2=7, push_object:box_sticky_anchor=106, push_object:crate#1=100, push_object:crate#2=8, push_object:push_pull_anchor=257, push_object:sticky#1=17, sticky_merge:n1=76, sticky_to_box:n1=284, sticky_to_box:n2=7, walk=13825

## pull_brush_gap_preserves_parts

结构族: pl_driven_bs_boundary_brush
变体: pull 左移边界：隔行保留部件
变化变量: 保持同一边界移动，但把远处 crate 分成隔行两点
对照: pull_brush_vertical_bind

问题: pull 驱动边界刷过两个不邻接资源时，产物是两个独立 sticky 部件，不是一件工具。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=90000, maxTransitions=220000

layout:
```text
##########
#PL.....G#
#...@BS..#
#....C...#
#........#
#....C...#
##########
```

初始状态:
```text
##########
#PL.....G#
#...@BS..#
#....C...#
#........#
#....C...#
##########
```

动作回放:
- 1. left: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,box_to_sticky:n2; eventWin=no
```text
##########
#PL.....G#
#..@BS...#
#....M...#
#........#
#....M...#
##########
```

最终状态:
```text
##########
#PL.....G#
#..@BS...#
#....M...#
#........#
#....M...#
##########
```
变化格: (3,2) .->@; (4,2) @->B; (5,2) B->S; (6,2) S->.; (5,3) C->M; (5,5) C->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,1\|C:\|M:5,3\|5,5\|PL:P:1,1;L:2,1\|BS:B:4,2;S:5,2 |
| down | yes | walk | Ply:3,3\|C:\|M:5,3\|5,5\|PL:P:1,1;L:2,1\|BS:B:4,2;S:5,2 |
| left | yes | pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky | Ply:2,2\|C:\|M:5,3\|5,5\|PL:P:1,1;L:2,1\|BS:B:3,2;S:4,2 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=13, path=down down right right right up up right up left left left down
局部可达图: status=complete, states=10123, transitions=17700, winStates=1, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=859, anchor_boundary_shift:push_pull=888, box_to_sticky:n1=272, box_to_sticky:n2=20, force_chain:n2=146, force_chain:n3=14, move_sticky_rigid=728, pull_object:box_sticky_anchor=738, pull_object:crate#1=601, pull_object:crate#2=384, pull_object:push_pull_anchor=596, pull_object:sticky#1=456, pull_object:sticky#2=188, push_object:box_sticky_anchor=96, push_object:crate#1=124, push_object:crate#2=53, push_object:push_pull_anchor=281, push_object:sticky#1=16, push_object:sticky#2=6, sticky_merge:n1=111, sticky_to_box:n1=207, sticky_to_box:n2=43, walk=14161

## pull_parallel_preserves_remote

结构族: pl_driven_bs_boundary_brush
变体: pull 平移边界：远处资源不改写
变化变量: 把 pull 方向改为沿 B/S 边界平移，边界 x 位置不跨过远处对象
对照: pull_brush_vertical_bind

问题: pull 可以移动 B/S anchor 但不一定刷资源；沿边界平移只调位，保留远处对象身份。
动作序列: down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=90000, maxTransitions=220000

layout:
```text
##########
#PL..C..G#
#.....BS.#
#.....@..#
#........#
#........#
##########
```

初始状态:
```text
##########
#PL..C..G#
#.....BS.#
#.....@..#
#........#
#........#
##########
```

动作回放:
- 1. down: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky; eventWin=no
```text
##########
#PL..C..G#
#........#
#.....BS.#
#.....@..#
#........#
##########
```

最终状态:
```text
##########
#PL..C..G#
#........#
#.....BS.#
#.....@..#
#........#
##########
```
变化格: (6,2) B->.; (7,2) S->.; (6,3) @->B; (7,3) .->S; (6,4) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | pull_world_front_blocked |
| down | yes | pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky | Ply:6,5\|C:5,1\|M:\|PL:P:1,1;L:2,1\|BS:B:6,4;S:7,4 |
| left | yes | walk | Ply:5,4\|C:5,1\|M:\|PL:P:1,1;L:2,1\|BS:B:6,3;S:7,3 |
| right | yes | walk | Ply:7,4\|C:5,1\|M:\|PL:P:1,1;L:2,1\|BS:B:6,3;S:7,3 |

回到初始: yes, depth=11, path=left up up right right up right down down left left
局部可达图: status=complete, states=5317, transitions=10786, winStates=0, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=468, anchor_boundary_shift:push_pull=581, box_to_sticky:n1=54, force_chain:n2=24, move_sticky_rigid=83, pull_object:box_sticky_anchor=451, pull_object:crate#1=294, pull_object:push_pull_anchor=435, pull_object:sticky#1=74, push_object:box_sticky_anchor=17, push_object:crate#1=20, push_object:push_pull_anchor=141, sticky_to_box:n1=29, walk=9354

## pull_brush_front_wall_closed

结构族: pl_driven_bs_boundary_brush
变体: 玩家前格墙：刷子把手关闭
变化变量: 保留身后 B/S anchor 与远处资源，但用墙封住玩家 pull 前格
对照: pull_brush_vertical_bind, pull_brush_horizontal_bridge

问题: pull 驱动刷子的关闭点可以是玩家前格，而不是 B/S anchor 或远处资源本身。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=90000, maxTransitions=220000

layout:
```text
##########
#PL.....G#
#..#@BS..#
#....C...#
#....C...#
#........#
##########
```

初始状态:
```text
##########
#PL.....G#
#..#@BS..#
#....C...#
#....C...#
#........#
##########
```

动作回放:
- 1. left: illegal (destination_blocked); events=-; eventWin=no
```text
##########
#PL.....G#
#..#@BS..#
#....C...#
#....C...#
#........#
##########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
##########
#PL.....G#
#..#@BS..#
#....C...#
#....C...#
#........#
##########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,1\|C:5,3;5,4\|M:\|PL:P:1,1;L:2,1\|BS:B:5,2;S:6,2 |
| down | yes | walk | Ply:4,3\|C:5,3;5,4\|M:\|PL:P:1,1;L:2,1\|BS:B:5,2;S:6,2 |
| left | no | - | destination_blocked |
| right | no | - | pull_world_front_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=2349, transitions=4380, winStates=0, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=120, anchor_boundary_shift:push_pull=135, box_to_sticky:n1=63, force_chain:n2=23, force_chain:n3=7, force_chain:n4=1, move_sticky_rigid=68, pull_object:box_sticky_anchor=118, pull_object:crate#1=158, pull_object:crate#2=118, pull_object:push_pull_anchor=82, pull_object:sticky#1=64, pull_object:sticky#2=2, push_object:crate#1=24, push_object:crate#2=17, push_object:push_pull_anchor=53, sticky_merge:n1=11, sticky_to_box:n1=23, sticky_to_box:n2=1, walk=3744

## door_cc_chain_push

结构族: brush_product_door_consumption
变体: 刷出 CC：双箱链式进门
变化变量: 基准：边界下刷把横条回收为 CC，再从左侧推入同一门口
对照: door_cm_tail_push, door_cmm_tail_push

问题: 刷出两个 crate 后，门口消费是普通箱链，资源可继续被拆分或链推。
动作序列: down right right down right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=90000, maxTransitions=220000

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
- 2. right: legal; events=walk; eventWin=no
```text
##########
#.......G#
#..@.....#
#.B..CC..#
#.S......#
#........#
##########
```
- 3. right: legal; events=walk; eventWin=no
```text
##########
#.......G#
#...@....#
#.B..CC..#
#.S......#
#........#
##########
```
- 4. down: legal; events=walk; eventWin=no
```text
##########
#.......G#
#........#
#.B.@CC..#
#.S......#
#........#
##########
```
- 5. right: legal; events=push_object:crate#1,force_chain:n2; eventWin=no
```text
##########
#.......G#
#........#
#.B..@CC.#
#.S......#
#........#
##########
```

最终状态:
```text
##########
#.......G#
#........#
#.B..@CC.#
#.S......#
#........#
##########
```
变化格: (2,1) @->.; (2,2) B->.; (2,3) S->B; (5,3) M->@; (6,3) M->C; (7,3) .->C; (2,4) .->S

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,2\|C:6,3;7,3\|M:\|PL:none\|BS:B:2,3;S:2,4 |
| down | yes | walk | Ply:5,4\|C:6,3;7,3\|M:\|PL:none\|BS:B:2,3;S:2,4 |
| left | yes | walk | Ply:4,3\|C:6,3;7,3\|M:\|PL:none\|BS:B:2,3;S:2,4 |
| right | yes | push_object:crate#1,force_chain:n2 | Ply:6,3\|C:7,3;8,3\|M:\|PL:none\|BS:B:2,3;S:2,4 |

回到初始: yes, depth=19, path=up right right right down left down down left left left left left up left up up up right
局部可达图: status=complete, states=15231, transitions=32005, winStates=47, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=787, box_to_sticky:n1=264, box_to_sticky:n2=19, force_chain:n2=154, force_chain:n3=13, move_sticky_rigid=726, push_object:box_sticky_anchor=720, push_object:crate#1=1055, push_object:crate#2=726, push_object:sticky#1=693, push_object:sticky#2=26, sticky_merge:n1=57, sticky_to_box:n1=59, sticky_to_box:n2=75, walk=28785

## door_cm_tail_push

结构族: brush_product_door_consumption
变体: 刷出 C+M：单箱进门但留尾债
变化变量: 把横条产物改成竖条切头，得到 C+M 后再推 C 进入同一门口
对照: door_cc_chain_push, door_cmm_tail_push

问题: 同样能推一个 crate 进门，但 sticky 尾留在侧后方，形成后续处理债。
动作序列: down right right down right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=90000, maxTransitions=220000

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
- 2. right: legal; events=walk; eventWin=no
```text
##########
#.......G#
#..@.....#
#.B..C...#
#.S..M...#
#........#
##########
```
- 3. right: legal; events=walk; eventWin=no
```text
##########
#.......G#
#...@....#
#.B..C...#
#.S..M...#
#........#
##########
```
- 4. down: legal; events=walk; eventWin=no
```text
##########
#.......G#
#........#
#.B.@C...#
#.S..M...#
#........#
##########
```
- 5. right: legal; events=push_object:crate#1; eventWin=no
```text
##########
#.......G#
#........#
#.B..@C..#
#.S..M...#
#........#
##########
```

最终状态:
```text
##########
#.......G#
#........#
#.B..@C..#
#.S..M...#
#........#
##########
```
变化格: (2,1) @->.; (2,2) B->.; (2,3) S->B; (5,3) M->@; (6,3) .->C; (2,4) .->S

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,2\|C:6,3\|M:5,4\|PL:none\|BS:B:2,3;S:2,4 |
| down | yes | push_object:sticky#1,move_sticky_rigid | Ply:5,4\|C:6,3\|M:5,5\|PL:none\|BS:B:2,3;S:2,4 |
| left | yes | walk | Ply:4,3\|C:6,3\|M:5,4\|PL:none\|BS:B:2,3;S:2,4 |
| right | yes | push_object:crate#1 | Ply:6,3\|C:7,3\|M:5,4\|PL:none\|BS:B:2,3;S:2,4 |

回到初始: yes, depth=17, path=up right right down left down down left left left left up left up up up right
局部可达图: status=complete, states=14989, transitions=32069, winStates=25, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=839, box_to_sticky:n1=233, force_chain:n2=216, force_chain:n3=9, move_sticky_rigid=915, push_object:box_sticky_anchor=744, push_object:crate#1=1023, push_object:crate#2=427, push_object:sticky#1=862, push_object:sticky#2=27, sticky_merge:n1=55, sticky_to_box:n1=194, sticky_to_box:n2=6, walk=28986

## door_cmm_tail_push

结构族: brush_product_door_consumption
变体: 刷出 C+MM：单箱进门且留下宽尾
变化变量: 把竖条尾债扩成 L 形横尾，观察同一门口动作后的占位差异
对照: door_cm_tail_push, door_square_blocked_by_low_wall

问题: C+MM 产物让门口得到一个 crate，同时在下侧留下更宽的 sticky 尾，适合做宽尾阻塞语料。
动作序列: down right right down right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=90000, maxTransitions=220000

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
- 2. right: legal; events=walk; eventWin=no
```text
##########
#.......G#
#..@.....#
#.B..C...#
#.S..MM..#
#........#
##########
```
- 3. right: legal; events=walk; eventWin=no
```text
##########
#.......G#
#...@....#
#.B..C...#
#.S..MM..#
#........#
##########
```
- 4. down: legal; events=walk; eventWin=no
```text
##########
#.......G#
#........#
#.B.@C...#
#.S..MM..#
#........#
##########
```
- 5. right: legal; events=push_object:crate#1; eventWin=no
```text
##########
#.......G#
#........#
#.B..@C..#
#.S..MM..#
#........#
##########
```

最终状态:
```text
##########
#.......G#
#........#
#.B..@C..#
#.S..MM..#
#........#
##########
```
变化格: (2,1) @->.; (2,2) B->.; (2,3) S->B; (5,3) M->@; (6,3) .->C; (2,4) .->S

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,2\|C:6,3\|M:5,4;6,4\|PL:none\|BS:B:2,3;S:2,4 |
| down | yes | push_object:sticky#1,move_sticky_rigid | Ply:5,4\|C:6,3\|M:5,5;6,5\|PL:none\|BS:B:2,3;S:2,4 |
| left | yes | walk | Ply:4,3\|C:6,3\|M:5,4;6,4\|PL:none\|BS:B:2,3;S:2,4 |
| right | yes | push_object:crate#1 | Ply:6,3\|C:7,3\|M:5,4;6,4\|PL:none\|BS:B:2,3;S:2,4 |

回到初始: unknown (exhausted: state budget exceeded; 不可当作 no)
局部可达图: status=complete, states=16094, transitions=32301, winStates=20, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=782, box_to_sticky:n1=350, box_to_sticky:n2=7, force_chain:n2=374, force_chain:n3=31, force_chain:n4=1, move_sticky_rigid=939, push_object:box_sticky_anchor=678, push_object:crate#1=1063, push_object:crate#2=666, push_object:crate#3=383, push_object:sticky#1=899, push_object:sticky#2=14, sticky_merge:n1=112, sticky_to_box:n1=75, sticky_to_box:n2=146, sticky_to_box:n3=3, walk=28598

## door_square_blocked_by_low_wall

结构族: brush_product_door_consumption
变体: 刷成 2x2：下沿墙封死门口
变化变量: 改为上刷绑定成 2x2，并在右侧下半格放墙，制造 footprint 门
对照: door_split_columns_one_column_passes, door_cmm_tail_push

问题: 2x2 工具不是更强的 crate 链；一格下沿墙即可让它无法进入同一门口。
动作序列: up right right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=90000, maxTransitions=220000

layout:
```text
##########
#.......G#
#........#
#.B..CC..#
#.S..MM#.#
#.@......#
##########
```

初始状态:
```text
##########
#.......G#
#........#
#.B..CC..#
#.S..MM#.#
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
#.@..MM#.#
#........#
##########
```
- 2. right: legal; events=walk; eventWin=no
```text
##########
#.......G#
#.B......#
#.S..MM..#
#..@.MM#.#
#........#
##########
```
- 3. right: legal; events=walk; eventWin=no
```text
##########
#.......G#
#.B......#
#.S..MM..#
#...@MM#.#
#........#
##########
```
- 4. right: illegal (force_blocked); events=-; eventWin=no
```text
##########
#.......G#
#.B......#
#.S..MM..#
#...@MM#.#
#........#
##########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
##########
#.......G#
#.B......#
#.S..MM..#
#...@MM#.#
#........#
##########
```
变化格: (2,2) .->B; (2,3) B->S; (5,3) C->M; (6,3) C->M; (2,4) S->.; (4,4) .->@; (2,5) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,3\|C:\|M:5,3;6,3;5,4;6,4\|PL:none\|BS:B:2,2;S:2,3 |
| down | yes | walk | Ply:4,5\|C:\|M:5,3;6,3;5,4;6,4\|PL:none\|BS:B:2,2;S:2,3 |
| left | yes | walk | Ply:3,4\|C:\|M:5,3;6,3;5,4;6,4\|PL:none\|BS:B:2,2;S:2,3 |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=8649, transitions=16656, winStates=31, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=512, box_to_sticky:n1=252, box_to_sticky:n2=36, force_chain:n2=376, force_chain:n3=29, force_chain:n4=1, move_sticky_rigid=327, push_object:box_sticky_anchor=476, push_object:crate#1=428, push_object:crate#2=322, push_object:crate#3=340, push_object:crate#4=190, push_object:sticky#1=287, push_object:sticky#2=7, sticky_merge:n1=118, sticky_to_box:n1=17, sticky_to_box:n2=60, walk=14606

## door_split_columns_one_column_passes

结构族: brush_product_door_consumption
变体: 刷成双柱：单柱先通过
变化变量: 在上刷绑定结构中加入列间隙，两个柱状工具分离，左柱可先被推入门口
对照: door_square_blocked_by_low_wall

问题: 列间隙让大块门口失败改写为可逐柱消费，适合设计分批工具。
动作序列: up right right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=90000, maxTransitions=220000

layout:
```text
###########
#........G#
#.........#
#.B..C..C.#
#.S..M..M.#
#.@.......#
###########
```

初始状态:
```text
###########
#........G#
#.........#
#.B..C..C.#
#.S..M..M.#
#.@.......#
###########
```

动作回放:
- 1. up: legal; events=push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,box_to_sticky:n2,sticky_merge:n2; eventWin=no
```text
###########
#........G#
#.B.......#
#.S..M..M.#
#.@..M..M.#
#.........#
###########
```
- 2. right: legal; events=walk; eventWin=no
```text
###########
#........G#
#.B.......#
#.S..M..M.#
#..@.M..M.#
#.........#
###########
```
- 3. right: legal; events=walk; eventWin=no
```text
###########
#........G#
#.B.......#
#.S..M..M.#
#...@M..M.#
#.........#
###########
```
- 4. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
#........G#
#.B.......#
#.S...M.M.#
#....@M.M.#
#.........#
###########
```

最终状态:
```text
###########
#........G#
#.B.......#
#.S...M.M.#
#....@M.M.#
#.........#
###########
```
变化格: (2,2) .->B; (2,3) B->S; (5,3) C->.; (6,3) .->M; (8,3) C->M; (2,4) S->.; (5,4) M->@; (6,4) .->M; (2,5) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,3\|C:\|M:6,3;6,4\|8,3;8,4\|PL:none\|BS:B:2,2;S:2,3 |
| down | yes | walk | Ply:5,5\|C:\|M:6,3;6,4\|8,3;8,4\|PL:none\|BS:B:2,2;S:2,3 |
| left | yes | walk | Ply:4,4\|C:\|M:6,3;6,4\|8,3;8,4\|PL:none\|BS:B:2,2;S:2,3 |
| right | yes | push_object:sticky#1,move_sticky_rigid,sticky_merge:n1 | Ply:6,4\|C:\|M:7,3;8,3;7,4;8,4\|PL:none\|BS:B:2,2;S:2,3 |

回到初始: yes, depth=18, path=up up right right down left up up left left left left down left down down down right
局部可达图: status=complete, states=29783, transitions=57423, winStates=119, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=1274, box_to_sticky:n1=580, box_to_sticky:n2=68, box_to_sticky:n3=7, force_chain:n2=821, force_chain:n3=53, force_chain:n4=2, move_sticky_rigid=2811, push_object:box_sticky_anchor=1111, push_object:crate#1=1739, push_object:crate#2=1261, push_object:crate#3=508, push_object:crate#4=110, push_object:sticky#1=1815, push_object:sticky#2=763, push_object:sticky#3=4, sticky_merge:n1=576, sticky_merge:n2=11, sticky_to_box:n1=381, sticky_to_box:n2=217, sticky_to_box:n3=6, walk=50112

