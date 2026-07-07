# 机制局部实验: ra_struct_tail_selector_01

- 原型: reality_anchor
- 生成时间: 2026-07-07T03:08:40.136Z
- 标题: 尾债再消费与 pull 刷子 stroke 选择器
- 备注: 本轮接续 ra_struct_consumption_01 中的 C+M/C+MM 尾债与 P/L 驱动 B/S 边界刷子。 目标是把尾债整理成可被回收、再绑定或延迟搬运的局部材料，并把 pull 刷子从单次远程改写扩展为 由初始距离和拉动次数控制的 stroke 选择器。


## 结构族摘要

### tail_debt_reconsumption
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| tail_cm_recover_down | C+M 尾债：下刷回收为双 crate | 从 C+M 状态继续把 B/S 边界向下刷过尾债行 | tail_cm_rebind_up, tail_cm_carry_side | unknown exhausted: state budget exceeded | up, left, right | down:force_blocked | complete / 20054 states |
| tail_cm_rebind_up | C+M 尾债：上刷再绑定为竖向工具 | 从同一 C+M 状态把 B/S 边界向上刷过 crate 行 | tail_cm_recover_down, tail_cm_carry_side | yes depth=11 | up, down, left, right | - | complete / 18337 states |
| tail_cm_carry_side | C+M 尾债：沿边界搬运保留债形 | 保持 C+M 与 B/S 的上下关系，只把边界侧向调位 | tail_cm_recover_down, tail_cm_rebind_up | yes depth=15 | up, down, left, right | - | complete / 16254 states |
| tail_cmm_recover_down | C+MM 宽尾：下刷回收为三 crate 资源 | 把 C+M 的单格尾债扩成横向宽尾，再下刷回收 | tail_cm_recover_down, tail_cmm_rebind_up | unknown exhausted: state budget exceeded | up, left, right | down:force_blocked | complete / 24503 states |
| tail_cmm_rebind_up | C+MM 宽尾：上刷再绑定为 L 形工具 | 把 C+M 的单格尾债扩成横向宽尾，再上刷绑定 crate | tail_cm_rebind_up, tail_cmm_recover_down | yes depth=11 | up, down, left, right | - | complete / 19924 states |
| tail_recover_lane_gate_closed | 下刷回收：anchor 行进格关闭 | 保留 C+M 尾债，但在 B/S anchor 下方加墙关闭下刷输入 | tail_cm_recover_down | not applicable: replay stopped at illegal action; return search skipped | up, left, right | down:force_blocked | complete / 11505 states |

### pull_brush_stroke_selector
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| stroke_immediate_bind_once | 0 格余量：一拉即刷 | 远处 crate 列位于 B 端列，第一次左拉后进入 sticky 侧 | stroke_one_delay_first_pull, stroke_one_delay_second_pull | yes depth=15 | up, down, left | right:pull_world_front_blocked | complete / 9988 states |
| stroke_one_delay_first_pull | 1 格余量：第一拉只预对齐 | 把 B/S anchor 右移一列，第一次左拉后边界仍未越过远处 crate 列 | stroke_immediate_bind_once, stroke_one_delay_second_pull | yes depth=11 | up, down, left | right:pull_world_front_blocked | complete / 9277 states |
| stroke_one_delay_second_pull | 1 格余量：第二拉完成刷入 | 保留 1 格余量布局，但执行第二次左拉 | stroke_one_delay_first_pull, stroke_two_delay_second_pull_preserves | yes depth=16 | up, down, left | right:pull_world_front_blocked | complete / 9277 states |
| stroke_two_delay_second_pull_preserves | 2 格余量：第二拉仍暂存 | 把 B/S anchor 再右移一列，两个 stroke 后边界只到 crate 列左侧 | stroke_one_delay_second_pull, stroke_two_delay_third_pull_binds | yes depth=12 | up, down, left | right:pull_world_front_blocked | complete / 11970 states |
| stroke_two_delay_third_pull_binds | 2 格余量：第三拉完成刷入 | 保留 2 格余量布局，但执行第三次左拉 | stroke_two_delay_second_pull_preserves, stroke_one_delay_second_pull | yes depth=17 | up, down, left | right:pull_world_front_blocked | complete / 11970 states |
| stroke_front_gate_closed | 前格墙：stroke 输入关闭 | 保留 0 格余量刷子，但把玩家左侧前格换成墙 | stroke_immediate_bind_once | not applicable: replay stopped at illegal action; return search skipped | up, down | left:destination_blocked, right:pull_world_front_blocked | complete / 2974 states |

## tail_cm_recover_down

结构族: tail_debt_reconsumption
变体: C+M 尾债：下刷回收为双 crate
变化变量: 从 C+M 状态继续把 B/S 边界向下刷过尾债行
对照: tail_cm_rebind_up, tail_cm_carry_side

问题: 同一 C+M 尾债在边界下刷后，尾部 sticky 被回收到 crate 资源。
动作序列: down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=26, maxStates=120000, maxTransitions=300000

layout:
```text
##########
#.......G#
#.@......#
#.B..C...#
#.S..M...#
#........#
##########
```

初始状态:
```text
##########
#.......G#
#.@......#
#.B..C...#
#.S..M...#
#........#
##########
```

动作回放:
- 1. down: legal; events=push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,sticky_to_box:n1; eventWin=no
```text
##########
#.......G#
#........#
#.@..C...#
#.B..C...#
#.S......#
##########
```

最终状态:
```text
##########
#.......G#
#........#
#.@..C...#
#.B..C...#
#.S......#
##########
```
变化格: (2,2) @->.; (2,3) B->@; (2,4) S->B; (5,4) M->C; (2,5) .->S

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,2\|C:5,3;5,4\|M:\|PL:none\|BS:B:2,4;S:2,5 |
| down | no | - | force_blocked |
| left | yes | walk | Ply:1,3\|C:5,3;5,4\|M:\|PL:none\|BS:B:2,4;S:2,5 |
| right | yes | walk | Ply:3,3\|C:5,3;5,4\|M:\|PL:none\|BS:B:2,4;S:2,5 |

回到初始: unknown (exhausted: state budget exceeded; 不可当作 no)
局部可达图: status=complete, states=20054, transitions=43526, winStates=44, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=1110, box_to_sticky:n1=342, box_to_sticky:n2=6, force_chain:n2=268, force_chain:n3=10, move_sticky_rigid=1018, push_object:box_sticky_anchor=986, push_object:crate#1=1563, push_object:crate#2=660, push_object:sticky#1=938, push_object:sticky#2=48, sticky_merge:n1=71, sticky_to_box:n1=211, sticky_to_box:n2=14, walk=39331

## tail_cm_rebind_up

结构族: tail_debt_reconsumption
变体: C+M 尾债：上刷再绑定为竖向工具
变化变量: 从同一 C+M 状态把 B/S 边界向上刷过 crate 行
对照: tail_cm_recover_down, tail_cm_carry_side

问题: 同一 C+M 尾债在边界上刷后，crate 重新并入 sticky 侧并与尾债合成竖向工具。
动作序列: up
反事实禁用: 无
预算: exploreDepth=14, returnDepth=26, maxStates=120000, maxTransitions=300000

layout:
```text
##########
#.......G#
#........#
#.B..C...#
#.S..M...#
#.@......#
##########
```

初始状态:
```text
##########
#.......G#
#........#
#.B..C...#
#.S..M...#
#.@......#
##########
```

动作回放:
- 1. up: legal; events=push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
##########
#.......G#
#.B......#
#.S..M...#
#.@..M...#
#........#
##########
```

最终状态:
```text
##########
#.......G#
#.B......#
#.S..M...#
#.@..M...#
#........#
##########
```
变化格: (2,2) .->B; (2,3) B->S; (5,3) C->M; (2,4) S->@; (2,5) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky | Ply:2,3\|C:\|M:5,3;5,4\|PL:none\|BS:B:2,1;S:2,2 |
| down | yes | walk | Ply:2,5\|C:\|M:5,3;5,4\|PL:none\|BS:B:2,2;S:2,3 |
| left | yes | walk | Ply:1,4\|C:\|M:5,3;5,4\|PL:none\|BS:B:2,2;S:2,3 |
| right | yes | walk | Ply:3,4\|C:\|M:5,3;5,4\|PL:none\|BS:B:2,2;S:2,3 |

回到初始: yes, depth=11, path=left up up up right down left down down down right
局部可达图: status=complete, states=18337, transitions=39889, winStates=41, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=1203, box_to_sticky:n1=311, box_to_sticky:n2=7, force_chain:n2=250, force_chain:n3=8, move_sticky_rigid=1221, push_object:box_sticky_anchor=1089, push_object:crate#1=1193, push_object:crate#2=468, push_object:sticky#1=1149, push_object:sticky#2=38, sticky_merge:n1=82, sticky_to_box:n1=272, sticky_to_box:n2=9, walk=35952

## tail_cm_carry_side

结构族: tail_debt_reconsumption
变体: C+M 尾债：沿边界搬运保留债形
变化变量: 保持 C+M 与 B/S 的上下关系，只把边界侧向调位
对照: tail_cm_recover_down, tail_cm_rebind_up

问题: C+M 尾债在边界侧向搬运时保留 crate 与 sticky 尾的分工，作为延迟处理材料。
动作序列: right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=26, maxStates=120000, maxTransitions=300000

layout:
```text
##########
#.......G#
#........#
#..@B.C..#
#...S.M..#
#........#
##########
```

初始状态:
```text
##########
#.......G#
#........#
#..@B.C..#
#...S.M..#
#........#
##########
```

动作回放:
- 1. right: legal; events=push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky; eventWin=no
```text
##########
#.......G#
#........#
#...@BC..#
#....SM..#
#........#
##########
```

最终状态:
```text
##########
#.......G#
#........#
#...@BC..#
#....SM..#
#........#
##########
```
变化格: (3,3) @->.; (4,3) B->@; (5,3) .->B; (4,4) S->.; (5,4) .->S

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,2\|C:6,3\|M:6,4\|PL:none\|BS:B:5,3;S:5,4 |
| down | yes | walk | Ply:4,4\|C:6,3\|M:6,4\|PL:none\|BS:B:5,3;S:5,4 |
| left | yes | walk | Ply:3,3\|C:6,3\|M:6,4\|PL:none\|BS:B:5,3;S:5,4 |
| right | yes | push_object:box_sticky_anchor,force_chain:n3,anchor_boundary_shift:box_sticky,move_sticky_rigid | Ply:5,3\|C:7,3\|M:7,4\|PL:none\|BS:B:6,3;S:6,4 |

回到初始: yes, depth=15, path=down down right right up left up up up right down left left left down
局部可达图: status=complete, states=16254, transitions=34693, winStates=85, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=1727, box_to_sticky:n1=295, box_to_sticky:n2=4, force_chain:n2=356, force_chain:n3=20, move_sticky_rigid=842, push_object:box_sticky_anchor=1519, push_object:crate#1=1059, push_object:crate#2=468, push_object:sticky#1=767, push_object:sticky#2=21, sticky_merge:n1=77, sticky_to_box:n1=196, sticky_to_box:n2=9, walk=30859

## tail_cmm_recover_down

结构族: tail_debt_reconsumption
变体: C+MM 宽尾：下刷回收为三 crate 资源
变化变量: 把 C+M 的单格尾债扩成横向宽尾，再下刷回收
对照: tail_cm_recover_down, tail_cmm_rebind_up

问题: C+MM 宽尾被边界下刷后，宽尾两格一起回收到 crate 侧。
动作序列: down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=26, maxStates=120000, maxTransitions=300000

layout:
```text
##########
#.......G#
#.@......#
#.B..C...#
#.S..MM..#
#........#
##########
```

初始状态:
```text
##########
#.......G#
#.@......#
#.B..C...#
#.S..MM..#
#........#
##########
```

动作回放:
- 1. down: legal; events=push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,sticky_to_box:n2; eventWin=no
```text
##########
#.......G#
#........#
#.@..C...#
#.B..CC..#
#.S......#
##########
```

最终状态:
```text
##########
#.......G#
#........#
#.@..C...#
#.B..CC..#
#.S......#
##########
```
变化格: (2,2) @->.; (2,3) B->@; (2,4) S->B; (5,4) M->C; (6,4) M->C; (2,5) .->S

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,2\|C:5,3;5,4;6,4\|M:\|PL:none\|BS:B:2,4;S:2,5 |
| down | no | - | force_blocked |
| left | yes | walk | Ply:1,3\|C:5,3;5,4;6,4\|M:\|PL:none\|BS:B:2,4;S:2,5 |
| right | yes | walk | Ply:3,3\|C:5,3;5,4;6,4\|M:\|PL:none\|BS:B:2,4;S:2,5 |

回到初始: unknown (exhausted: state budget exceeded; 不可当作 no)
局部可达图: status=complete, states=24503, transitions=48725, winStates=73, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=1139, box_to_sticky:n1=585, box_to_sticky:n2=8, box_to_sticky:n3=1, force_chain:n2=538, force_chain:n3=52, force_chain:n4=3, move_sticky_rigid=1132, push_object:box_sticky_anchor=964, push_object:crate#1=1795, push_object:crate#2=1223, push_object:crate#3=660, push_object:sticky#1=1068, push_object:sticky#2=31, sticky_merge:n1=162, sticky_to_box:n1=56, sticky_to_box:n2=176, sticky_to_box:n3=9, walk=42984

## tail_cmm_rebind_up

结构族: tail_debt_reconsumption
变体: C+MM 宽尾：上刷再绑定为 L 形工具
变化变量: 把 C+M 的单格尾债扩成横向宽尾，再上刷绑定 crate
对照: tail_cm_rebind_up, tail_cmm_recover_down

问题: C+MM 宽尾在边界上刷后，门内 crate 与宽尾合成 L 形 sticky 工具。
动作序列: up
反事实禁用: 无
预算: exploreDepth=14, returnDepth=26, maxStates=120000, maxTransitions=300000

layout:
```text
##########
#.......G#
#........#
#.B..C...#
#.S..MM..#
#.@......#
##########
```

初始状态:
```text
##########
#.......G#
#........#
#.B..C...#
#.S..MM..#
#.@......#
##########
```

动作回放:
- 1. up: legal; events=push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
##########
#.......G#
#.B......#
#.S..M...#
#.@..MM..#
#........#
##########
```

最终状态:
```text
##########
#.......G#
#.B......#
#.S..M...#
#.@..MM..#
#........#
##########
```
变化格: (2,2) .->B; (2,3) B->S; (5,3) C->M; (2,4) S->@; (2,5) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky | Ply:2,3\|C:\|M:5,3;5,4;6,4\|PL:none\|BS:B:2,1;S:2,2 |
| down | yes | walk | Ply:2,5\|C:\|M:5,3;5,4;6,4\|PL:none\|BS:B:2,2;S:2,3 |
| left | yes | walk | Ply:1,4\|C:\|M:5,3;5,4;6,4\|PL:none\|BS:B:2,2;S:2,3 |
| right | yes | walk | Ply:3,4\|C:\|M:5,3;5,4;6,4\|PL:none\|BS:B:2,2;S:2,3 |

回到初始: yes, depth=11, path=left up up up right down left down down down right
局部可达图: status=complete, states=19924, transitions=40139, winStates=49, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=1145, box_to_sticky:n1=449, box_to_sticky:n2=18, box_to_sticky:n3=2, force_chain:n2=441, force_chain:n3=39, force_chain:n4=1, move_sticky_rigid=1271, push_object:box_sticky_anchor=1021, push_object:crate#1=1179, push_object:crate#2=770, push_object:crate#3=530, push_object:sticky#1=1207, push_object:sticky#2=17, sticky_merge:n1=145, sticky_to_box:n1=85, sticky_to_box:n2=205, sticky_to_box:n3=6, walk=35415

## tail_recover_lane_gate_closed

结构族: tail_debt_reconsumption
变体: 下刷回收：anchor 行进格关闭
变化变量: 保留 C+M 尾债，但在 B/S anchor 下方加墙关闭下刷输入
对照: tail_cm_recover_down

问题: B/S anchor 行进格关闭时，C+M 尾债保持在当前债形，回收链被截在输入端。
动作序列: down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=26, maxStates=120000, maxTransitions=300000

layout:
```text
##########
#.......G#
#.@......#
#.B..C...#
#.S..M...#
#.#......#
##########
```

初始状态:
```text
##########
#.......G#
#.@......#
#.B..C...#
#.S..M...#
#.#......#
##########
```

动作回放:
- 1. down: illegal (force_blocked); events=-; eventWin=no
```text
##########
#.......G#
#.@......#
#.B..C...#
#.S..M...#
#.#......#
##########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
##########
#.......G#
#.@......#
#.B..C...#
#.S..M...#
#.#......#
##########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,1\|C:5,3\|M:5,4\|PL:none\|BS:B:2,3;S:2,4 |
| down | no | - | force_blocked |
| left | yes | walk | Ply:1,2\|C:5,3\|M:5,4\|PL:none\|BS:B:2,3;S:2,4 |
| right | yes | walk | Ply:3,2\|C:5,3\|M:5,4\|PL:none\|BS:B:2,3;S:2,4 |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=11505, transitions=24862, winStates=26, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=597, box_to_sticky:n1=160, force_chain:n2=186, force_chain:n3=9, move_sticky_rigid=758, push_object:box_sticky_anchor=509, push_object:crate#1=894, push_object:crate#2=253, push_object:sticky#1=683, push_object:sticky#2=45, sticky_merge:n1=53, sticky_to_box:n1=153, sticky_to_box:n2=11, walk=22478

## stroke_immediate_bind_once

结构族: pull_brush_stroke_selector
变体: 0 格余量：一拉即刷
变化变量: 远处 crate 列位于 B 端列，第一次左拉后进入 sticky 侧
对照: stroke_one_delay_first_pull, stroke_one_delay_second_pull

问题: pull 刷子的初始距离为 0 时，一次 stroke 直接把远处资源刷成 sticky 工具。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=26, maxStates=120000, maxTransitions=300000

layout:
```text
###########
#PL......G#
#...@BS...#
#....C....#
#....C....#
#.........#
###########
```

初始状态:
```text
###########
#PL......G#
#...@BS...#
#....C....#
#....C....#
#.........#
###########
```

动作回放:
- 1. left: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,box_to_sticky:n2,sticky_merge:n1; eventWin=no
```text
###########
#PL......G#
#..@BS....#
#....M....#
#....M....#
#.........#
###########
```

最终状态:
```text
###########
#PL......G#
#..@BS....#
#....M....#
#....M....#
#.........#
###########
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
局部可达图: status=complete, states=9988, transitions=17960, winStates=2, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=831, anchor_boundary_shift:push_pull=970, box_to_sticky:n1=238, box_to_sticky:n2=22, force_chain:n2=159, force_chain:n3=17, force_chain:n4=3, move_sticky_rigid=527, pull_object:box_sticky_anchor=672, pull_object:crate#1=452, pull_object:crate#2=283, pull_object:push_pull_anchor=619, pull_object:sticky#1=427, pull_object:sticky#2=12, push_object:box_sticky_anchor=120, push_object:crate#1=128, push_object:crate#2=60, push_object:push_pull_anchor=340, push_object:sticky#1=19, sticky_merge:n1=84, sticky_to_box:n1=126, sticky_to_box:n2=74, walk=14828

## stroke_one_delay_first_pull

结构族: pull_brush_stroke_selector
变体: 1 格余量：第一拉只预对齐
变化变量: 把 B/S anchor 右移一列，第一次左拉后边界仍未越过远处 crate 列
对照: stroke_immediate_bind_once, stroke_one_delay_second_pull

问题: 1 格余量把同一 pull 刷子改成准备位：第一拉只对齐边界，远处资源仍是 crate。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=26, maxStates=120000, maxTransitions=300000

layout:
```text
###########
#PL......G#
#....@BS..#
#....C....#
#....C....#
#.........#
###########
```

初始状态:
```text
###########
#PL......G#
#....@BS..#
#....C....#
#....C....#
#.........#
###########
```

动作回放:
- 1. left: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky; eventWin=no
```text
###########
#PL......G#
#...@BS...#
#....C....#
#....C....#
#.........#
###########
```

最终状态:
```text
###########
#PL......G#
#...@BS...#
#....C....#
#....C....#
#.........#
###########
```
变化格: (4,2) .->@; (5,2) @->B; (6,2) B->S; (7,2) S->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,1\|C:5,3;5,4\|M:\|PL:P:1,1;L:2,1\|BS:B:5,2;S:6,2 |
| down | yes | walk | Ply:4,3\|C:5,3;5,4\|M:\|PL:P:1,1;L:2,1\|BS:B:5,2;S:6,2 |
| left | yes | pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,box_to_sticky:n2,sticky_merge:n1 | Ply:3,2\|C:\|M:5,3;5,4\|PL:P:1,1;L:2,1\|BS:B:4,2;S:5,2 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=11, path=up right right right down right up left left left down
局部可达图: status=complete, states=9277, transitions=16498, winStates=0, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=707, anchor_boundary_shift:push_pull=985, box_to_sticky:n1=189, box_to_sticky:n2=20, force_chain:n2=110, force_chain:n3=15, force_chain:n4=2, move_sticky_rigid=335, pull_object:box_sticky_anchor=601, pull_object:crate#1=477, pull_object:crate#2=432, pull_object:push_pull_anchor=651, pull_object:sticky#1=274, pull_object:sticky#2=8, push_object:box_sticky_anchor=74, push_object:crate#1=108, push_object:crate#2=68, push_object:push_pull_anchor=325, push_object:sticky#1=8, sticky_merge:n1=62, sticky_to_box:n1=86, sticky_to_box:n2=59, walk=13472

## stroke_one_delay_second_pull

结构族: pull_brush_stroke_selector
变体: 1 格余量：第二拉完成刷入
变化变量: 保留 1 格余量布局，但执行第二次左拉
对照: stroke_one_delay_first_pull, stroke_two_delay_second_pull_preserves

问题: 同一准备位经过第二次 stroke 后，边界跨过远处 crate 列并产出 sticky 工具。
动作序列: left left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=26, maxStates=120000, maxTransitions=300000

layout:
```text
###########
#PL......G#
#....@BS..#
#....C....#
#....C....#
#.........#
###########
```

初始状态:
```text
###########
#PL......G#
#....@BS..#
#....C....#
#....C....#
#.........#
###########
```

动作回放:
- 1. left: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky; eventWin=no
```text
###########
#PL......G#
#...@BS...#
#....C....#
#....C....#
#.........#
###########
```
- 2. left: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,box_to_sticky:n2,sticky_merge:n1; eventWin=no
```text
###########
#PL......G#
#..@BS....#
#....M....#
#....M....#
#.........#
###########
```

最终状态:
```text
###########
#PL......G#
#..@BS....#
#....M....#
#....M....#
#.........#
###########
```
变化格: (3,2) .->@; (4,2) .->B; (5,2) @->S; (6,2) B->.; (7,2) S->.; (5,3) C->M; (5,4) C->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,1\|C:\|M:5,3;5,4\|PL:P:1,1;L:2,1\|BS:B:4,2;S:5,2 |
| down | yes | walk | Ply:3,3\|C:\|M:5,3;5,4\|PL:P:1,1;L:2,1\|BS:B:4,2;S:5,2 |
| left | yes | pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky | Ply:2,2\|C:\|M:5,3;5,4\|PL:P:1,1;L:2,1\|BS:B:3,2;S:4,2 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=16, path=down down down right right right up up up right right up left left left down
局部可达图: status=complete, states=9277, transitions=16498, winStates=0, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=707, anchor_boundary_shift:push_pull=985, box_to_sticky:n1=189, box_to_sticky:n2=20, force_chain:n2=110, force_chain:n3=15, force_chain:n4=2, move_sticky_rigid=335, pull_object:box_sticky_anchor=601, pull_object:crate#1=477, pull_object:crate#2=432, pull_object:push_pull_anchor=651, pull_object:sticky#1=274, pull_object:sticky#2=8, push_object:box_sticky_anchor=74, push_object:crate#1=108, push_object:crate#2=68, push_object:push_pull_anchor=325, push_object:sticky#1=8, sticky_merge:n1=62, sticky_to_box:n1=86, sticky_to_box:n2=59, walk=13472

## stroke_two_delay_second_pull_preserves

结构族: pull_brush_stroke_selector
变体: 2 格余量：第二拉仍暂存
变化变量: 把 B/S anchor 再右移一列，两个 stroke 后边界只到 crate 列左侧
对照: stroke_one_delay_second_pull, stroke_two_delay_third_pull_binds

问题: 2 格余量让两次 pull 仍只是预对齐，远处资源保持 crate 状态。
动作序列: left left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=26, maxStates=120000, maxTransitions=300000

layout:
```text
############
#PL.......G#
#.....@BS..#
#....C.....#
#....C.....#
#..........#
############
```

初始状态:
```text
############
#PL.......G#
#.....@BS..#
#....C.....#
#....C.....#
#..........#
############
```

动作回放:
- 1. left: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky; eventWin=no
```text
############
#PL.......G#
#....@BS...#
#....C.....#
#....C.....#
#..........#
############
```
- 2. left: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky; eventWin=no
```text
############
#PL.......G#
#...@BS....#
#....C.....#
#....C.....#
#..........#
############
```

最终状态:
```text
############
#PL.......G#
#...@BS....#
#....C.....#
#....C.....#
#..........#
############
```
变化格: (4,2) .->@; (5,2) .->B; (6,2) @->S; (7,2) B->.; (8,2) S->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,1\|C:5,3;5,4\|M:\|PL:P:1,1;L:2,1\|BS:B:5,2;S:6,2 |
| down | yes | walk | Ply:4,3\|C:5,3;5,4\|M:\|PL:P:1,1;L:2,1\|BS:B:5,2;S:6,2 |
| left | yes | pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,box_to_sticky:n2,sticky_merge:n1 | Ply:3,2\|C:\|M:5,3;5,4\|PL:P:1,1;L:2,1\|BS:B:4,2;S:5,2 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=12, path=up right right right down right right up left left left down
局部可达图: status=complete, states=11970, transitions=21533, winStates=0, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=881, anchor_boundary_shift:push_pull=949, box_to_sticky:n1=188, box_to_sticky:n2=17, force_chain:n2=107, force_chain:n3=10, force_chain:n4=1, move_sticky_rigid=326, pull_object:box_sticky_anchor=816, pull_object:crate#1=697, pull_object:crate#2=542, pull_object:push_pull_anchor=689, pull_object:sticky#1=278, pull_object:sticky#2=3, push_object:box_sticky_anchor=44, push_object:crate#1=82, push_object:crate#2=58, push_object:push_pull_anchor=255, push_object:sticky#1=3, sticky_merge:n1=41, sticky_to_box:n1=87, sticky_to_box:n2=49, walk=18066

## stroke_two_delay_third_pull_binds

结构族: pull_brush_stroke_selector
变体: 2 格余量：第三拉完成刷入
变化变量: 保留 2 格余量布局，但执行第三次左拉
对照: stroke_two_delay_second_pull_preserves, stroke_one_delay_second_pull

问题: 2 格余量需要第三个 stroke 才把远处 crate 列刷入 sticky 侧。
动作序列: left left left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=26, maxStates=120000, maxTransitions=300000

layout:
```text
############
#PL.......G#
#.....@BS..#
#....C.....#
#....C.....#
#..........#
############
```

初始状态:
```text
############
#PL.......G#
#.....@BS..#
#....C.....#
#....C.....#
#..........#
############
```

动作回放:
- 1. left: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky; eventWin=no
```text
############
#PL.......G#
#....@BS...#
#....C.....#
#....C.....#
#..........#
############
```
- 2. left: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky; eventWin=no
```text
############
#PL.......G#
#...@BS....#
#....C.....#
#....C.....#
#..........#
############
```
- 3. left: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,box_to_sticky:n2,sticky_merge:n1; eventWin=no
```text
############
#PL.......G#
#..@BS.....#
#....M.....#
#....M.....#
#..........#
############
```

最终状态:
```text
############
#PL.......G#
#..@BS.....#
#....M.....#
#....M.....#
#..........#
############
```
变化格: (3,2) .->@; (4,2) .->B; (5,2) .->S; (6,2) @->.; (7,2) B->.; (8,2) S->.; (5,3) C->M; (5,4) C->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,1\|C:\|M:5,3;5,4\|PL:P:1,1;L:2,1\|BS:B:4,2;S:5,2 |
| down | yes | walk | Ply:3,3\|C:\|M:5,3;5,4\|PL:P:1,1;L:2,1\|BS:B:4,2;S:5,2 |
| left | yes | pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky | Ply:2,2\|C:\|M:5,3;5,4\|PL:P:1,1;L:2,1\|BS:B:3,2;S:4,2 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=17, path=down down down right right right up up up right right right up left left left down
局部可达图: status=complete, states=11970, transitions=21533, winStates=0, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=881, anchor_boundary_shift:push_pull=949, box_to_sticky:n1=188, box_to_sticky:n2=17, force_chain:n2=107, force_chain:n3=10, force_chain:n4=1, move_sticky_rigid=326, pull_object:box_sticky_anchor=816, pull_object:crate#1=697, pull_object:crate#2=542, pull_object:push_pull_anchor=689, pull_object:sticky#1=278, pull_object:sticky#2=3, push_object:box_sticky_anchor=44, push_object:crate#1=82, push_object:crate#2=58, push_object:push_pull_anchor=255, push_object:sticky#1=3, sticky_merge:n1=41, sticky_to_box:n1=87, sticky_to_box:n2=49, walk=18066

## stroke_front_gate_closed

结构族: pull_brush_stroke_selector
变体: 前格墙：stroke 输入关闭
变化变量: 保留 0 格余量刷子，但把玩家左侧前格换成墙
对照: stroke_immediate_bind_once

问题: stroke 选择器的输入端仍受玩家前格门控制；前格被墙占用时远处资源保持未消费。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=26, maxStates=120000, maxTransitions=300000

layout:
```text
###########
#PL......G#
#..#@BS...#
#....C....#
#....C....#
#.........#
###########
```

初始状态:
```text
###########
#PL......G#
#..#@BS...#
#....C....#
#....C....#
#.........#
###########
```

动作回放:
- 1. left: illegal (destination_blocked); events=-; eventWin=no
```text
###########
#PL......G#
#..#@BS...#
#....C....#
#....C....#
#.........#
###########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
###########
#PL......G#
#..#@BS...#
#....C....#
#....C....#
#.........#
###########
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
局部可达图: status=complete, states=2974, transitions=5505, winStates=1, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=171, anchor_boundary_shift:push_pull=148, box_to_sticky:n1=65, box_to_sticky:n2=1, force_chain:n2=25, force_chain:n3=7, force_chain:n4=1, move_sticky_rigid=107, pull_object:box_sticky_anchor=166, pull_object:crate#1=164, pull_object:crate#2=122, pull_object:push_pull_anchor=92, pull_object:sticky#1=102, pull_object:sticky#2=2, push_object:box_sticky_anchor=3, push_object:crate#1=26, push_object:crate#2=17, push_object:push_pull_anchor=56, push_object:sticky#1=1, sticky_merge:n1=12, sticky_to_box:n1=29, sticky_to_box:n2=2, walk=4754

