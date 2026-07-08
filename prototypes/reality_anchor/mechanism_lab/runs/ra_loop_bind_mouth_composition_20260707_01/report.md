# 机制局部实验: ra_loop_bind_mouth_composition_20260707_01

- 原型: reality_anchor
- 生成时间: 2026-07-07T06:28:01.105Z
- 标题: B/S 绑定产物接上沿墙齿目标口
- 备注: 比较 B/S 绑定生成的 connected footprint 是否被同一墙齿目标口消费；B/S anchor 固定在墙槽中，避免边界移动成为 shortcut。

## 结构族摘要

### bs_pair_tooth_mouth
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| bs_pair_tooth_connected_block | connected_vertical_pair_single_lower_mouth | 两个相邻 crate 先后跨 B/S 后正交邻接，形成竖向 connected sticky；上沿墙齿关闭上格目标位 | bs_single_tooth_lower_pass, bs_pair_open_two_cell_mouth_pass, bs_gap_parts_tooth_shortcut | not applicable: replay stopped at illegal action; return search skipped | up, down, left | right:force_blocked | complete / 4011 states |
| bs_single_tooth_lower_pass | single_bound_cell_lower_mouth | 去掉上方 crate，输出从竖向二连变成单格 sticky | bs_pair_tooth_connected_block | yes depth=10 | up, down, left, right | - | complete / 601 states |
| bs_pair_open_two_cell_mouth_pass | connected_vertical_pair_two_cell_mouth | 保持竖向二连输出，但把上沿墙齿改成第二个目标开口 | bs_pair_tooth_connected_block | yes depth=11 | up, down, left, right | - | complete / 7022 states |
| bs_gap_parts_tooth_shortcut | separated_parts_single_lower_mouth | 两个 crate 隔行跨 B/S，保持两个 sticky 部件而不合并 | bs_pair_tooth_connected_block | yes depth=16 | up, down, left, right | - | complete / 2442 states |

## bs_pair_tooth_connected_block: B/S 产出竖向二连，单格下口被上沿墙齿拒绝

结构族: bs_pair_tooth_mouth
变体: connected_vertical_pair_single_lower_mouth
变化变量: 两个相邻 crate 先后跨 B/S 后正交邻接，形成竖向 connected sticky；上沿墙齿关闭上格目标位
对照: bs_single_tooth_lower_pass, bs_pair_open_two_cell_mouth_pass, bs_gap_parts_tooth_shortcut

问题: 同一单格下口是否拒绝 B/S 产出的竖向二连，而不是只拒绝某次 push driver？
动作序列: right left down right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
#########
####BS###
#.......#
#..@C.#.#
#...C.G.#
#.......#
#########
```

初始状态:
```text
#########
####BS###
#.......#
#..@C.#.#
#...C.G.#
#.......#
#########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,box_to_sticky:n1; eventWin=no
```text
#########
####BS###
#.......#
#...@M#.#
#...C.G.#
#.......#
#########
```
- 2. left: legal; events=walk; eventWin=no
```text
#########
####BS###
#.......#
#..@.M#.#
#...C.G.#
#.......#
#########
```
- 3. down: legal; events=walk; eventWin=no
```text
#########
####BS###
#.......#
#....M#.#
#..@C.G.#
#.......#
#########
```
- 4. right: legal; events=push_object:crate#1,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
#########
####BS###
#.......#
#....M#.#
#...@MG.#
#.......#
#########
```
- 5. right: illegal (force_blocked); events=-; eventWin=no
```text
#########
####BS###
#.......#
#....M#.#
#...@MG.#
#.......#
#########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#########
####BS###
#.......#
#....M#.#
#...@MG.#
#.......#
#########
```
变化格: (3,3) @->.; (4,3) C->.; (5,3) .->M; (4,4) C->@; (5,4) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,3\|C:\|M:5,3;5,4\|PL:none\|BS:B:4,1;S:5,1 |
| down | yes | walk | Ply:4,5\|C:\|M:5,3;5,4\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | walk | Ply:3,4\|C:\|M:5,3;5,4\|PL:none\|BS:B:4,1;S:5,1 |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=4011, transitions=9869, winStates=19, maxDepth=14
事件类型: box_to_sticky:n1=75, force_chain:n2=21, move_sticky_rigid=184, push_object:crate#1=367, push_object:crate#2=172, push_object:sticky#1=165, push_object:sticky#2=16, sticky_merge:n1=14, sticky_to_box:n1=25, sticky_to_box:n2=2, walk=9149

## bs_single_tooth_lower_pass: 只绑定下格单元，同一墙齿目标口允许通过

结构族: bs_pair_tooth_mouth
变体: single_bound_cell_lower_mouth
变化变量: 去掉上方 crate，输出从竖向二连变成单格 sticky
对照: bs_pair_tooth_connected_block

问题: 单格 sticky 在同一上沿墙齿下是否能覆盖下格目标，证明被拒绝的是 connected footprint 的上格目标位需求？
动作序列: right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
#########
####BS###
#.......#
#.....#.#
#..@C.G.#
#.......#
#########
```

初始状态:
```text
#########
####BS###
#.......#
#.....#.#
#..@C.G.#
#.......#
#########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,box_to_sticky:n1; eventWin=no
```text
#########
####BS###
#.......#
#.....#.#
#...@MG.#
#.......#
#########
```
- 2. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
#########
####BS###
#.......#
#.....#.#
#....@m.#
#.......#
#########
```

最终状态:
```text
#########
####BS###
#.......#
#.....#.#
#....@m.#
#.......#
#########
```
变化格: (3,4) @->.; (4,4) C->.; (5,4) .->@; (6,4) G->m

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,3\|C:\|M:6,4\|PL:none\|BS:B:4,1;S:5,1 |
| down | yes | walk | Ply:5,5\|C:\|M:6,4\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | walk | Ply:4,4\|C:\|M:6,4\|PL:none\|BS:B:4,1;S:5,1 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:6,4\|C:\|M:7,4\|PL:none\|BS:B:4,1;S:5,1 |

回到初始: yes, depth=10, path=down right right up left left up left left down
局部可达图: status=complete, states=601, transitions=1743, winStates=1, maxDepth=14
事件类型: box_to_sticky:n1=4, move_sticky_rigid=13, push_object:crate#1=40, push_object:sticky#1=13, sticky_to_box:n1=3, walk=1690

## bs_pair_open_two_cell_mouth_pass: 同样竖向二连，打开上格口宽后整体通过

结构族: bs_pair_tooth_mouth
变体: connected_vertical_pair_two_cell_mouth
变化变量: 保持竖向二连输出，但把上沿墙齿改成第二个目标开口
对照: bs_pair_tooth_connected_block

问题: 打开上格口宽后，同样 B/S 产出的 connected footprint 是否能整体进入目标口？
动作序列: right left down right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
#########
####BS###
#.......#
#..@C.G.#
#...C.G.#
#.......#
#########
```

初始状态:
```text
#########
####BS###
#.......#
#..@C.G.#
#...C.G.#
#.......#
#########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,box_to_sticky:n1; eventWin=no
```text
#########
####BS###
#.......#
#...@MG.#
#...C.G.#
#.......#
#########
```
- 2. left: legal; events=walk; eventWin=no
```text
#########
####BS###
#.......#
#..@.MG.#
#...C.G.#
#.......#
#########
```
- 3. down: legal; events=walk; eventWin=no
```text
#########
####BS###
#.......#
#....MG.#
#..@C.G.#
#.......#
#########
```
- 4. right: legal; events=push_object:crate#1,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
#########
####BS###
#.......#
#....MG.#
#...@MG.#
#.......#
#########
```
- 5. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
#########
####BS###
#.......#
#.....m.#
#....@m.#
#.......#
#########
```

最终状态:
```text
#########
####BS###
#.......#
#.....m.#
#....@m.#
#.......#
#########
```
变化格: (3,3) @->.; (4,3) C->.; (6,3) G->m; (4,4) C->.; (5,4) .->@; (6,4) G->m

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,3\|C:\|M:6,3;6,4\|PL:none\|BS:B:4,1;S:5,1 |
| down | yes | walk | Ply:5,5\|C:\|M:6,3;6,4\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | walk | Ply:4,4\|C:\|M:6,3;6,4\|PL:none\|BS:B:4,1;S:5,1 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:6,4\|C:\|M:7,3;7,4\|PL:none\|BS:B:4,1;S:5,1 |

回到初始: yes, depth=11, path=up up right right down left left up left left down
局部可达图: status=complete, states=7022, transitions=19000, winStates=2, maxDepth=14
事件类型: box_to_sticky:n1=99, force_chain:n2=26, move_sticky_rigid=535, push_object:crate#1=597, push_object:crate#2=185, push_object:sticky#1=471, push_object:sticky#2=60, sticky_merge:n1=43, sticky_to_box:n1=71, sticky_to_box:n2=6, walk=17687

## bs_gap_parts_tooth_shortcut: 隔行绑定保持两部件，下格绕过同一上沿墙齿

结构族: bs_pair_tooth_mouth
变体: separated_parts_single_lower_mouth
变化变量: 两个 crate 隔行跨 B/S，保持两个 sticky 部件而不合并
对照: bs_pair_tooth_connected_block

问题: 隔行输出的非 connected 部件是否让下格单元绕过同一墙齿，作为 connectedness 的 shortcut 反例？
动作序列: right left down down right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
#########
####BS###
#..@C...#
#.....#.#
#...C.G.#
#.......#
#########
```

初始状态:
```text
#########
####BS###
#..@C...#
#.....#.#
#...C.G.#
#.......#
#########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,box_to_sticky:n1; eventWin=no
```text
#########
####BS###
#...@M..#
#.....#.#
#...C.G.#
#.......#
#########
```
- 2. left: legal; events=walk; eventWin=no
```text
#########
####BS###
#..@.M..#
#.....#.#
#...C.G.#
#.......#
#########
```
- 3. down: legal; events=walk; eventWin=no
```text
#########
####BS###
#....M..#
#..@..#.#
#...C.G.#
#.......#
#########
```
- 4. down: legal; events=walk; eventWin=no
```text
#########
####BS###
#....M..#
#.....#.#
#..@C.G.#
#.......#
#########
```
- 5. right: legal; events=push_object:crate#1,box_to_sticky:n1; eventWin=no
```text
#########
####BS###
#....M..#
#.....#.#
#...@MG.#
#.......#
#########
```
- 6. right: legal; events=push_object:sticky#2,move_sticky_rigid; eventWin=no
```text
#########
####BS###
#....M..#
#.....#.#
#....@m.#
#.......#
#########
```

最终状态:
```text
#########
####BS###
#....M..#
#.....#.#
#....@m.#
#.......#
#########
```
变化格: (3,2) @->.; (4,2) C->.; (5,2) .->M; (4,4) C->.; (5,4) .->@; (6,4) G->m

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,3\|C:\|M:5,2\|6,4\|PL:none\|BS:B:4,1;S:5,1 |
| down | yes | walk | Ply:5,5\|C:\|M:5,2\|6,4\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | walk | Ply:4,4\|C:\|M:5,2\|6,4\|PL:none\|BS:B:4,1;S:5,1 |
| right | yes | push_object:sticky#2,move_sticky_rigid | Ply:6,4\|C:\|M:5,2\|7,4\|PL:none\|BS:B:4,1;S:5,1 |

回到初始: yes, depth=16, path=down right right up left left right right up up left left down left left up
局部可达图: status=complete, states=2442, transitions=6386, winStates=7, maxDepth=14
事件类型: box_to_sticky:n1=42, force_chain:n2=5, move_sticky_rigid=107, push_object:crate#1=181, push_object:crate#2=89, push_object:sticky#1=93, push_object:sticky#2=13, sticky_merge:n1=7, sticky_to_box:n1=21, sticky_to_box:n2=1, walk=6010

