# 机制局部实验: ra_pilot_wall_motion_01

- 原型: reality_anchor
- 生成时间: 2026-07-06T07:06:41.382Z
- 标题: 墙结构对黏块局部回返性的影响
- 备注: 第一轮工具 pilot：只比较局部墙形、条块长度和同一动作后的回返 / 动作集合差异。

## sticky2_single_lane_push: 2 格横条在单排走廊中右推

问题: 同样的 2 格横条右推一步，单排走廊是否因为无法绕到右侧而不可回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=10, returnDepth=12, maxStates=10000, maxTransitions=40000

layout:
```text
########
#BS#..G#
########
#@MM...#
########
```

初始状态:
```text
########
#BS#..G#
########
#@MM...#
########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
########
#BS#..G#
########
#.@MM..#
########
```

最终状态:
```text
########
#BS#..G#
########
#.@MM..#
########
```
变化格: (1,3) @->.; (2,3) M->@; (4,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:1,3\|C:\|M:3,3;4,3\|PL:none\|BS:B:1,1;S:2,1 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:3,3\|C:\|M:4,3;5,3\|PL:none\|BS:B:1,1;S:2,1 |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=10, transitions=15, winStates=0, maxDepth=6
事件类型: move_sticky_rigid=3, push_object:sticky#1=3, walk=12

## sticky2_loop_room_push: 2 格横条在可绕行房间中右推

问题: 把单排走廊改成下方可绕行房间后，同一右推动作是否恢复回返路径？
动作序列: right
反事实禁用: 无
预算: exploreDepth=10, returnDepth=12, maxStates=10000, maxTransitions=40000

layout:
```text
########
#BS#..G#
########
#@MM...#
#......#
########
```

初始状态:
```text
########
#BS#..G#
########
#@MM...#
#......#
########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
########
#BS#..G#
########
#.@MM..#
#......#
########
```

最终状态:
```text
########
#BS#..G#
########
#.@MM..#
#......#
########
```
变化格: (1,3) @->.; (2,3) M->@; (4,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:2,4\|C:\|M:3,3;4,3\|PL:none\|BS:B:1,1;S:2,1 |
| left | yes | walk | Ply:1,3\|C:\|M:3,3;4,3\|PL:none\|BS:B:1,1;S:2,1 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:3,3\|C:\|M:4,3;5,3\|PL:none\|BS:B:1,1;S:2,1 |

回到初始: yes, depth=11, path=down right right right up left down left left left up
局部可达图: status=complete, states=50, transitions=118, winStates=0, maxDepth=10
事件类型: move_sticky_rigid=6, push_object:sticky#1=6, sticky_to_box:n1=1, walk=112

## sticky2_mouth_keeps_turnaround_cell: 2 格横条在墙口后仍留下右侧站位格

问题: 固定墙口宽度时，2 格横条右推后是否还能让玩家绕到右侧并推回？
动作序列: right
反事实禁用: 无
预算: exploreDepth=10, returnDepth=12, maxStates=10000, maxTransitions=40000

layout:
```text
#######
#BS#G.#
#######
#@MM..#
#.....#
#######
```

初始状态:
```text
#######
#BS#G.#
#######
#@MM..#
#.....#
#######
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
#######
#BS#G.#
#######
#.@MM.#
#.....#
#######
```

最终状态:
```text
#######
#BS#G.#
#######
#.@MM.#
#.....#
#######
```
变化格: (1,3) @->.; (2,3) M->@; (4,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:2,4\|C:\|M:3,3;4,3\|PL:none\|BS:B:1,1;S:2,1 |
| left | yes | walk | Ply:1,3\|C:\|M:3,3;4,3\|PL:none\|BS:B:1,1;S:2,1 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:3,3\|C:\|M:4,3;5,3\|PL:none\|BS:B:1,1;S:2,1 |

回到初始: yes, depth=11, path=down right right right up left down left left left up
局部可达图: status=complete, states=32, transitions=72, winStates=0, maxDepth=9
事件类型: move_sticky_rigid=4, push_object:sticky#1=4, sticky_to_box:n1=1, walk=68

## sticky3_mouth_consumes_turnaround_cell: 3 格横条在同一墙口后吃掉右侧站位格

问题: 只把 2 格横条换成 3 格横条后，右推一步是否占掉唯一的右侧站位格，从而不可回返？
动作序列: right
反事实禁用: 无
预算: exploreDepth=10, returnDepth=12, maxStates=10000, maxTransitions=40000

layout:
```text
#######
#BS#G.#
#######
#@MMM.#
#.....#
#######
```

初始状态:
```text
#######
#BS#G.#
#######
#@MMM.#
#.....#
#######
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
#######
#BS#G.#
#######
#.@MMM#
#.....#
#######
```

最终状态:
```text
#######
#BS#G.#
#######
#.@MMM#
#.....#
#######
```
变化格: (1,3) @->.; (2,3) M->@; (5,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:2,4\|C:\|M:3,3;4,3;5,3\|PL:none\|BS:B:1,1;S:2,1 |
| left | yes | walk | Ply:1,3\|C:\|M:3,3;4,3;5,3\|PL:none\|BS:B:1,1;S:2,1 |
| right | no | - | force_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=20, transitions=39, winStates=0, maxDepth=10
事件类型: move_sticky_rigid=2, push_object:sticky#1=2, sticky_to_box:n1=1, walk=37

