# 机制局部实验: ra_topic_selection_preflight_20260707_01

- 原型: reality_anchor
- 生成时间: 2026-07-08T03:06:50.175Z
- 标题: topic selection preflight: nontrivial structure gates
- 备注: Controller-only preflight for selecting a mechanism_loop portfolio. These cases are not a full explorer run and must not be promoted directly. They test whether candidate topics have a non-obvious structural knob and a plausible consumer beyond rule smoke.


## 结构族摘要

### anchor_goal_boundary_side_effect
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| anchor_goal_cover_brushes_remote_row | B/S covers goal and sweeps a remote crate row | remote crate sits on the row that changes side after the anchor covers the target | anchor_goal_cover_remote_row_not_crossed | unknown exhausted: depth budget exceeded | down, left, right | up:force_blocked | complete / 805 states |
| anchor_goal_cover_remote_row_not_crossed | B/S covers goal but remote crate stays on box side | same target-cover move, but the remote crate is one row above the swept boundary | anchor_goal_cover_brushes_remote_row | unknown exhausted: depth budget exceeded | down, left, right | up:force_blocked | complete / 448 states |

### pull_extract_side_blocker_material
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| pull_vertical_bs_sweeps_sticky_blocker | vertical B/S pull sweeps a sticky blocker | the lower half target cell contains a sticky block that is movable in the same sweep direction | pull_vertical_bs_side_wall_blocks, pull_vertical_bs_side_empty | yes depth=11 | up, left | down:pull_world_front_blocked, right:pull_world_front_blocked | complete / 866 states |
| pull_vertical_bs_side_wall_blocks | vertical B/S pull side target is a wall | replace the sticky blocker with a wall in the same side target cell | pull_vertical_bs_sweeps_sticky_blocker | not applicable: replay stopped at illegal action; return search skipped | up | down:destination_blocked, left:force_blocked, right:pull_world_front_blocked | complete / 396 states |
| pull_vertical_bs_side_empty | vertical B/S pull side target is empty | remove the side blocker entirely | pull_vertical_bs_sweeps_sticky_blocker | yes depth=9 | up, down, left | right:pull_world_front_blocked | complete / 669 states |

### reverse_handle_occupied_spectrum
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| reverse_handle_empty_consumed | empty reverse handle cell | baseline: the reverse-force handle cell is empty after the first sticky push | reverse_handle_crate_can_be_cleared, reverse_handle_wall_closed | yes depth=4 | up, down, right | left:force_blocked | complete / 141 states |
| reverse_handle_crate_can_be_cleared | crate occupying reverse handle cell | replace the empty handle cell with a crate and give it a one-cell clearing pocket | reverse_handle_empty_consumed, reverse_handle_wall_closed | unknown exhausted: depth budget exceeded | up, down, right | left:force_blocked | complete / 162 states |
| reverse_handle_wall_closed | wall occupying reverse handle cell | replace the occupied handle cell with a wall while keeping the first sticky push legal | reverse_handle_empty_consumed, reverse_handle_crate_can_be_cleared | not applicable: replay stopped at illegal action; return search skipped | left, right | up:destination_blocked, down:force_blocked | complete / 22 states |

## anchor_goal_cover_brushes_remote_row

结构族: anchor_goal_boundary_side_effect
变体: B/S covers goal and sweeps a remote crate row
变化变量: remote crate sits on the row that changes side after the anchor covers the target
对照: anchor_goal_cover_remote_row_not_crossed

问题: Can an anchor-as-target move also consume a remote material row, making target cover a boundary endpoint selector?
动作序列: up
反事实禁用: 无
预算: exploreDepth=10, returnDepth=18, maxStates=40000, maxTransitions=100000

layout:
```text
#########
#..G....#
#..B.C..#
#..S....#
#..@....#
#########
```

初始状态:
```text
#########
#..G....#
#..B.C..#
#..S....#
#..@....#
#########
```

动作回放:
- 1. up: legal; events=push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky,box_to_sticky:n1; eventWin=no
```text
#########
#..B....#
#..S.M..#
#..@....#
#.......#
#########
```

最终状态:
```text
#########
#..B....#
#..S.M..#
#..@....#
#.......#
#########
```
变化格: (3,1) G->B; (3,2) B->S; (5,2) C->M; (3,3) S->@; (3,4) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | force_blocked |
| down | yes | walk | Ply:3,4\|C:\|M:5,2\|PL:none\|BS:B:3,1;S:3,2 |
| left | yes | walk | Ply:2,3\|C:\|M:5,2\|PL:none\|BS:B:3,1;S:3,2 |
| right | yes | walk | Ply:4,3\|C:\|M:5,2\|PL:none\|BS:B:3,1;S:3,2 |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=805, transitions=1676, winStates=10, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=98, box_to_sticky:n1=20, force_chain:n2=12, move_sticky_rigid=24, push_object:box_sticky_anchor=93, push_object:crate#1=56, push_object:sticky#1=21, sticky_to_box:n1=5, walk=1506

## anchor_goal_cover_remote_row_not_crossed

结构族: anchor_goal_boundary_side_effect
变体: B/S covers goal but remote crate stays on box side
变化变量: same target-cover move, but the remote crate is one row above the swept boundary
对照: anchor_goal_cover_brushes_remote_row

问题: If target cover alone is the whole story, remote row placement should not change material output.
动作序列: up
反事实禁用: 无
预算: exploreDepth=10, returnDepth=18, maxStates=40000, maxTransitions=100000

layout:
```text
#########
#..G.C..#
#..B....#
#..S....#
#..@....#
#########
```

初始状态:
```text
#########
#..G.C..#
#..B....#
#..S....#
#..@....#
#########
```

动作回放:
- 1. up: legal; events=push_object:box_sticky_anchor,anchor_boundary_shift:box_sticky; eventWin=no
```text
#########
#..B.C..#
#..S....#
#..@....#
#.......#
#########
```

最终状态:
```text
#########
#..B.C..#
#..S....#
#..@....#
#.......#
#########
```
变化格: (3,1) G->B; (3,2) B->S; (3,3) S->@; (3,4) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | force_blocked |
| down | yes | walk | Ply:3,4\|C:5,1\|M:\|PL:none\|BS:B:3,1;S:3,2 |
| left | yes | walk | Ply:2,3\|C:5,1\|M:\|PL:none\|BS:B:3,1;S:3,2 |
| right | yes | walk | Ply:4,3\|C:5,1\|M:\|PL:none\|BS:B:3,1;S:3,2 |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=448, transitions=990, winStates=7, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=62, force_chain:n2=3, push_object:box_sticky_anchor=62, push_object:crate#1=24, walk=904

## pull_vertical_bs_sweeps_sticky_blocker

结构族: pull_extract_side_blocker_material
变体: vertical B/S pull sweeps a sticky blocker
变化变量: the lower half target cell contains a sticky block that is movable in the same sweep direction
对照: pull_vertical_bs_side_wall_blocks, pull_vertical_bs_side_empty

问题: Does a sticky blocker become a movable side resource during pull extraction, rather than a simple wall-like blocker?
动作序列: left
反事实禁用: 无
预算: exploreDepth=10, returnDepth=18, maxStates=40000, maxTransitions=100000

layout:
```text
#########
#PL....G#
#.......#
#..@B...#
#..MS...#
#.......#
#########
```

初始状态:
```text
#########
#PL....G#
#.......#
#..@B...#
#..MS...#
#.......#
#########
```

动作回放:
- 1. left: legal; events=pull_object:box_sticky_anchor,force_chain:n2,anchor_boundary_shift:box_sticky,move_sticky_rigid; eventWin=no
```text
#########
#PL....G#
#.......#
#.@B....#
#.MS....#
#.......#
#########
```

最终状态:
```text
#########
#PL....G#
#.......#
#.@B....#
#.MS....#
#.......#
#########
```
变化格: (2,3) .->@; (3,3) @->B; (4,3) B->.; (2,4) .->M; (3,4) M->S; (4,4) S->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | pull_object:sticky#1,move_sticky_rigid,sticky_to_box:n1 | Ply:2,2\|C:2,3\|M:\|PL:P:1,1;L:2,1\|BS:B:3,3;S:3,4 |
| down | no | - | pull_world_front_blocked |
| left | yes | pull_object:box_sticky_anchor,force_chain:n2,anchor_boundary_shift:box_sticky,move_sticky_rigid | Ply:1,3\|C:\|M:1,4\|PL:P:1,1;L:2,1\|BS:B:2,3;S:2,4 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=11, path=up left down down right down left up right up right
局部可达图: status=complete, states=866, transitions=1539, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=130, anchor_boundary_shift:push_pull=77, box_to_sticky:n1=16, force_chain:n2=19, move_sticky_rigid=29, pull_object:box_sticky_anchor=109, pull_object:crate#1=22, pull_object:push_pull_anchor=68, pull_object:sticky#1=14, push_object:box_sticky_anchor=14, push_object:crate#1=8, push_object:push_pull_anchor=8, push_object:sticky#1=9, sticky_to_box:n1=9, walk=1287

## pull_vertical_bs_side_wall_blocks

结构族: pull_extract_side_blocker_material
变体: vertical B/S pull side target is a wall
变化变量: replace the sticky blocker with a wall in the same side target cell
对照: pull_vertical_bs_sweeps_sticky_blocker

问题: Wall in the lower half target cell should close the footprint gate.
动作序列: left
反事实禁用: 无
预算: exploreDepth=10, returnDepth=18, maxStates=40000, maxTransitions=100000

layout:
```text
#########
#PL....G#
#.......#
#..@B...#
#..#S...#
#.......#
#########
```

初始状态:
```text
#########
#PL....G#
#.......#
#..@B...#
#..#S...#
#.......#
#########
```

动作回放:
- 1. left: illegal (force_blocked); events=-; eventWin=no
```text
#########
#PL....G#
#.......#
#..@B...#
#..#S...#
#.......#
#########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#########
#PL....G#
#.......#
#..@B...#
#..#S...#
#.......#
#########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:\|PL:P:1,1;L:2,1\|BS:B:4,3;S:4,4 |
| down | no | - | destination_blocked |
| left | no | - | force_blocked |
| right | no | - | pull_world_front_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=396, transitions=761, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=54, anchor_boundary_shift:push_pull=33, force_chain:n2=2, pull_object:box_sticky_anchor=48, pull_object:push_pull_anchor=24, push_object:box_sticky_anchor=4, push_object:push_pull_anchor=9, walk=676

## pull_vertical_bs_side_empty

结构族: pull_extract_side_blocker_material
变体: vertical B/S pull side target is empty
变化变量: remove the side blocker entirely
对照: pull_vertical_bs_sweeps_sticky_blocker

问题: Empty side target isolates the blocker material effect from the base footprint movement.
动作序列: left
反事实禁用: 无
预算: exploreDepth=10, returnDepth=18, maxStates=40000, maxTransitions=100000

layout:
```text
#########
#PL....G#
#.......#
#..@B...#
#...S...#
#.......#
#########
```

初始状态:
```text
#########
#PL....G#
#.......#
#..@B...#
#...S...#
#.......#
#########
```

动作回放:
- 1. left: legal; events=pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky; eventWin=no
```text
#########
#PL....G#
#.......#
#.@B....#
#..S....#
#.......#
#########
```

最终状态:
```text
#########
#PL....G#
#.......#
#.@B....#
#..S....#
#.......#
#########
```
变化格: (2,3) .->@; (3,3) @->B; (4,3) B->.; (3,4) .->S; (4,4) S->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,2\|C:\|M:\|PL:P:1,1;L:2,1\|BS:B:3,3;S:3,4 |
| down | yes | walk | Ply:2,4\|C:\|M:\|PL:P:1,1;L:2,1\|BS:B:3,3;S:3,4 |
| left | yes | pull_object:box_sticky_anchor,anchor_boundary_shift:box_sticky | Ply:1,3\|C:\|M:\|PL:P:1,1;L:2,1\|BS:B:2,3;S:2,4 |
| right | no | - | pull_world_front_blocked |

回到初始: yes, depth=9, path=up right right down right up left left down
局部可达图: status=complete, states=669, transitions=1325, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=103, anchor_boundary_shift:push_pull=64, force_chain:n2=5, pull_object:box_sticky_anchor=87, pull_object:push_pull_anchor=47, push_object:box_sticky_anchor=12, push_object:push_pull_anchor=16, walk=1163

## reverse_handle_empty_consumed

结构族: reverse_handle_occupied_spectrum
变体: empty reverse handle cell
变化变量: baseline: the reverse-force handle cell is empty after the first sticky push
对照: reverse_handle_crate_can_be_cleared, reverse_handle_wall_closed

问题: Empty handle cell gives the player a direct reverse push interface after the sticky footprint passes the mouth.
动作序列: right down right right up left
反事实禁用: 无
预算: exploreDepth=10, returnDepth=18, maxStates=40000, maxTransitions=100000

layout:
```text
############
#G##########
###M...#####
##@M...#####
##.....#####
####SB######
############
```

初始状态:
```text
############
#G##########
###M...#####
##@M...#####
##.....#####
####SB######
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
###.M..#####
##.@M..#####
##.....#####
####SB######
############
```
- 2. down: legal; events=walk; eventWin=no
```text
############
#G##########
###.M..#####
##..M..#####
##.@...#####
####SB######
############
```
- 3. right: legal; events=walk; eventWin=no
```text
############
#G##########
###.M..#####
##..M..#####
##..@..#####
####SB######
############
```
- 4. right: legal; events=walk; eventWin=no
```text
############
#G##########
###.M..#####
##..M..#####
##...@.#####
####SB######
############
```
- 5. up: legal; events=walk; eventWin=no
```text
############
#G##########
###.M..#####
##..M@.#####
##.....#####
####SB######
############
```
- 6. left: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
###M...#####
##.M@..#####
##.....#####
####SB######
############
```

最终状态:
```text
############
#G##########
###M...#####
##.M@..#####
##.....#####
####SB######
############
```
变化格: (2,3) @->.; (4,3) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,2\|C:\|M:3,2;3,3\|PL:none\|BS:B:5,5;S:4,5 |
| down | yes | walk | Ply:4,4\|C:\|M:3,2;3,3\|PL:none\|BS:B:5,5;S:4,5 |
| left | no | - | force_blocked |
| right | yes | walk | Ply:5,3\|C:\|M:3,2;3,3\|PL:none\|BS:B:5,5;S:4,5 |

回到初始: yes, depth=4, path=down left left up
局部可达图: status=complete, states=141, transitions=298, winStates=0, maxDepth=10
事件类型: box_to_sticky:n1=4, move_sticky_rigid=11, push_object:crate#1=6, push_object:crate#2=8, push_object:sticky#1=11, sticky_merge:n1=1, sticky_to_box:n2=2, walk=273

## reverse_handle_crate_can_be_cleared

结构族: reverse_handle_occupied_spectrum
变体: crate occupying reverse handle cell
变化变量: replace the empty handle cell with a crate and give it a one-cell clearing pocket
对照: reverse_handle_empty_consumed, reverse_handle_wall_closed

问题: A crate in the handle cell turns the reverse interface into a clear-then-push resource handoff instead of simply closing the gate.
动作序列: right down right right up left
反事实禁用: 无
预算: exploreDepth=10, returnDepth=18, maxStates=40000, maxTransitions=100000

layout:
```text
############
#G##########
###M...#####
##@M.C.#####
##.....#####
####SB######
############
```

初始状态:
```text
############
#G##########
###M...#####
##@M.C.#####
##.....#####
####SB######
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
###.M..#####
##.@MC.#####
##.....#####
####SB######
############
```
- 2. down: legal; events=walk; eventWin=no
```text
############
#G##########
###.M..#####
##..MC.#####
##.@...#####
####SB######
############
```
- 3. right: legal; events=walk; eventWin=no
```text
############
#G##########
###.M..#####
##..MC.#####
##..@..#####
####SB######
############
```
- 4. right: legal; events=walk; eventWin=no
```text
############
#G##########
###.M..#####
##..MC.#####
##...@.#####
####SB######
############
```
- 5. up: legal; events=push_object:crate#1; eventWin=no
```text
############
#G##########
###.MC.#####
##..M@.#####
##.....#####
####SB######
############
```
- 6. left: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
###M.C.#####
##.M@..#####
##.....#####
####SB######
############
```

最终状态:
```text
############
#G##########
###M.C.#####
##.M@..#####
##.....#####
####SB######
############
```
变化格: (5,2) .->C; (2,3) @->.; (4,3) .->@; (5,3) C->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,2\|C:5,2\|M:3,2;3,3\|PL:none\|BS:B:5,5;S:4,5 |
| down | yes | walk | Ply:4,4\|C:5,2\|M:3,2;3,3\|PL:none\|BS:B:5,5;S:4,5 |
| left | no | - | force_blocked |
| right | yes | walk | Ply:5,3\|C:5,2\|M:3,2;3,3\|PL:none\|BS:B:5,5;S:4,5 |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=162, transitions=329, winStates=0, maxDepth=10
事件类型: box_to_sticky:n1=6, force_chain:n2=5, move_sticky_rigid=13, push_object:crate#1=15, push_object:crate#2=2, push_object:crate#3=3, push_object:sticky#1=11, sticky_merge:n1=4, sticky_to_box:n2=3, walk=298

## reverse_handle_wall_closed

结构族: reverse_handle_occupied_spectrum
变体: wall occupying reverse handle cell
变化变量: replace the occupied handle cell with a wall while keeping the first sticky push legal
对照: reverse_handle_empty_consumed, reverse_handle_crate_can_be_cleared

问题: A wall in the same handle cell closes the reverse interface and distinguishes movable occupancy from hard closure.
动作序列: right down right right up left
反事实禁用: 无
预算: exploreDepth=10, returnDepth=18, maxStates=40000, maxTransitions=100000

layout:
```text
############
#G##########
###M...#####
##@M.#.#####
##.....#####
####SB######
############
```

初始状态:
```text
############
#G##########
###M...#####
##@M.#.#####
##.....#####
####SB######
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#G##########
###.M..#####
##.@M#.#####
##.....#####
####SB######
############
```
- 2. down: legal; events=walk; eventWin=no
```text
############
#G##########
###.M..#####
##..M#.#####
##.@...#####
####SB######
############
```
- 3. right: legal; events=walk; eventWin=no
```text
############
#G##########
###.M..#####
##..M#.#####
##..@..#####
####SB######
############
```
- 4. right: legal; events=walk; eventWin=no
```text
############
#G##########
###.M..#####
##..M#.#####
##...@.#####
####SB######
############
```
- 5. up: illegal (destination_blocked); events=-; eventWin=no
```text
############
#G##########
###.M..#####
##..M#.#####
##...@.#####
####SB######
############
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
############
#G##########
###.M..#####
##..M#.#####
##...@.#####
####SB######
############
```
变化格: (3,2) M->.; (4,2) .->M; (2,3) @->.; (3,3) M->.; (4,3) .->M; (5,4) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | force_blocked |
| left | yes | walk | Ply:4,4\|C:\|M:4,2;4,3\|PL:none\|BS:B:5,5;S:4,5 |
| right | yes | walk | Ply:6,4\|C:\|M:4,2;4,3\|PL:none\|BS:B:5,5;S:4,5 |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=22, transitions=46, winStates=0, maxDepth=8
事件类型: move_sticky_rigid=2, push_object:sticky#1=2, walk=44

