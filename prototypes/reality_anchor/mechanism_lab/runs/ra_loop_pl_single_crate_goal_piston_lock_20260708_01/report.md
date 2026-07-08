# 机制局部实验: ra_loop_pl_single_crate_goal_piston_lock_20260708_01

- 原型: reality_anchor
- 生成时间: 2026-07-08T10:32:40.469Z
- 标题: P/L 单箱目标活塞：回撤撤销覆盖的顺序锁
- 备注: 单箱活塞通常退化；本轮只测试当伸出位是目标时，后续若必须回撤会把目标拉出，从而要求该目标最后达成。

## 结构族摘要

### pl_single_crate_goal_piston_lock
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| corridor_goal_last_action | goal_last_action | 狭窄通道；只执行推入目标 | corridor_goal_then_forced_retract, open_side_exit_preserves_goal | yes depth=1 | left | up:destination_blocked, down:destination_blocked, right:pull_world_front_blocked | complete / 4 states |
| corridor_goal_then_forced_retract | forced_retract_uncover | 同一狭窄通道；推入目标后必须 left 回撤 | corridor_goal_last_action | yes depth=0 | left, right | up:destination_blocked, down:destination_blocked | complete / 4 states |
| open_side_exit_preserves_goal | side_exit_not_lock | 打开上下侧路；推入目标后可不用回撤离开 | corridor_goal_then_forced_retract | yes depth=2 | up, left, right | down:destination_blocked | complete / 164 states |
| corridor_goal_offset_no_temp_cover | goal_offset_no_temp_cover | 目标向前偏一格，不在第一手伸出位 | corridor_goal_last_action | yes depth=0 | left, right | up:destination_blocked, down:destination_blocked | complete / 4 states |

## corridor_goal_last_action

结构族: pl_single_crate_goal_piston_lock
变体: goal_last_action
变化变量: 狭窄通道；只执行推入目标
对照: corridor_goal_then_forced_retract, open_side_exit_preserves_goal
备注: right 把单箱推入目标；若这是最后动作，目标保持覆盖并达成 win。
动作序列: right
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=12000, maxTransitions=60000

layout:
```text
#########
#..PL...#
#########
#..@CG..#
#########
```

初始状态:
```text
#########
#..PL...#
#########
#..@CG..#
#########
```

动作回放:
- 1. right: legal; events=push_object:crate#1; eventWin=no
```text
#########
#..PL...#
#########
#...@*..#
#########
```

最终状态:
```text
#########
#..PL...#
#########
#...@*..#
#########
```
变化格: (3,3) @->.; (4,3) C->@; (5,3) G->*

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | yes | pull_object:crate#1 | Ply:3,3\|C:4,3\|M:\|PL:P:3,1;L:4,1\|BS:none |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=1, path=left
局部可达图: status=complete, states=4, transitions=5, winStates=1, maxDepth=2
事件类型: push_object:crate#1=1, walk=4

## corridor_goal_then_forced_retract

结构族: pl_single_crate_goal_piston_lock
变体: forced_retract_uncover
变化变量: 同一狭窄通道；推入目标后必须 left 回撤
对照: corridor_goal_last_action
备注: right 临时覆盖目标；left 在 L 侧 pull 把 crate 拉回，目标被撤销。
动作序列: right left
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=12000, maxTransitions=60000

layout:
```text
#########
#..PL...#
#########
#..@CG..#
#########
```

初始状态:
```text
#########
#..PL...#
#########
#..@CG..#
#########
```

动作回放:
- 1. right: legal; events=push_object:crate#1; eventWin=no
```text
#########
#..PL...#
#########
#...@*..#
#########
```
- 2. left: legal; events=pull_object:crate#1; eventWin=no
```text
#########
#..PL...#
#########
#..@CG..#
#########
```

最终状态:
```text
#########
#..PL...#
#########
#..@CG..#
#########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:2,3\|C:4,3\|M:\|PL:P:3,1;L:4,1\|BS:none |
| right | yes | push_object:crate#1 | Ply:4,3\|C:5,3\|M:\|PL:P:3,1;L:4,1\|BS:none |

回到初始: yes, depth=0, path=
局部可达图: status=complete, states=4, transitions=5, winStates=1, maxDepth=2
事件类型: push_object:crate#1=1, walk=4

## open_side_exit_preserves_goal

结构族: pl_single_crate_goal_piston_lock
变体: side_exit_not_lock
变化变量: 打开上下侧路；推入目标后可不用回撤离开
对照: corridor_goal_then_forced_retract
备注: right 覆盖目标后，down 只是 walk；crate 留在目标上，所以不构成顺序锁。
动作序列: right down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=12000, maxTransitions=60000

layout:
```text
#########
#..PL...#
#.......#
#..@CG..#
#.......#
#########
```

初始状态:
```text
#########
#..PL...#
#.......#
#..@CG..#
#.......#
#########
```

动作回放:
- 1. right: legal; events=push_object:crate#1; eventWin=no
```text
#########
#..PL...#
#.......#
#...@*..#
#.......#
#########
```
- 2. down: legal; events=walk; eventWin=no
```text
#########
#..PL...#
#.......#
#....*..#
#...@...#
#########
```

最终状态:
```text
#########
#..PL...#
#.......#
#....*..#
#...@...#
#########
```
变化格: (3,3) @->.; (4,3) C->.; (5,3) G->*; (4,4) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,3\|C:5,3\|M:\|PL:P:3,1;L:4,1\|BS:none |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:3,4\|C:5,3\|M:\|PL:P:3,1;L:4,1\|BS:none |
| right | yes | walk | Ply:5,4\|C:5,3\|M:\|PL:P:3,1;L:4,1\|BS:none |

回到初始: yes, depth=2, path=up left
局部可达图: status=complete, states=164, transitions=344, winStates=8, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=12, force_chain:n2=1, pull_object:crate#1=4, pull_object:push_pull_anchor=8, push_object:crate#1=14, push_object:push_pull_anchor=4, walk=314

## corridor_goal_offset_no_temp_cover

结构族: pl_single_crate_goal_piston_lock
变体: goal_offset_no_temp_cover
变化变量: 目标向前偏一格，不在第一手伸出位
对照: corridor_goal_last_action
备注: right 只把 crate 推到目标前一格，没有临时覆盖；left 回撤也不产生顺序锁。
动作序列: right left
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=12000, maxTransitions=60000

layout:
```text
##########
#..PL....#
##########
#..@C.G..#
##########
```

初始状态:
```text
##########
#..PL....#
##########
#..@C.G..#
##########
```

动作回放:
- 1. right: legal; events=push_object:crate#1; eventWin=no
```text
##########
#..PL....#
##########
#...@CG..#
##########
```
- 2. left: legal; events=pull_object:crate#1; eventWin=no
```text
##########
#..PL....#
##########
#..@C.G..#
##########
```

最终状态:
```text
##########
#..PL....#
##########
#..@C.G..#
##########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:2,3\|C:4,3\|M:\|PL:P:3,1;L:4,1\|BS:none |
| right | yes | push_object:crate#1 | Ply:4,3\|C:5,3\|M:\|PL:P:3,1;L:4,1\|BS:none |

回到初始: yes, depth=0, path=
局部可达图: status=complete, states=4, transitions=6, winStates=0, maxDepth=2
事件类型: pull_object:crate#1=1, push_object:crate#1=1, walk=4

