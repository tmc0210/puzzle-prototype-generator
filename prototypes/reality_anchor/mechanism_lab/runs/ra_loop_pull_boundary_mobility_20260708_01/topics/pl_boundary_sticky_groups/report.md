# 机制局部实验: ra_loop_pull_boundary_mobility_20260708_01_pl_boundary_sticky_groups

- 原型: reality_anchor
- 生成时间: 2026-07-08T03:56:34.003Z
- 标题: P/L 边界邻域 sticky group 推拉可动性
- 备注: P/L 与 B/S 锚都封闭在上方隔间；P/L 只提供 x<=4 为 push、x>=5 为 pull 的全局边界， B/S 只使下半区的 M 保持 sticky。每个动作序列都要求玩家实际跨过 P/L 边界， 并在 P 侧先 push sticky group，再在 L 侧 pull 或触发明确 pull 门控。


## 结构族摘要

### pl_boundary_sticky_group_handoff
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| pl_sticky_bar_push_pull_extract | two_cell_bar_positive_extract | L 侧前格与 footprint 目标均开放 | pl_sticky_bar_l_front_wall_gate, pl_sticky_l_shape_target_wall_gate | unknown exhausted: depth budget exceeded | up, down, right | left:pull_world_front_blocked | complete / 486 states |
| pl_sticky_bar_l_front_wall_gate | two_cell_bar_pull_front_blocked | L 侧玩家前格改成墙；sticky footprint 自身目标仍可容纳 | pl_sticky_bar_push_pull_extract | not applicable: replay stopped at illegal action; return search skipped | up, down | left:pull_world_front_blocked, right:destination_blocked | complete / 396 states |

### pl_boundary_sticky_group_handle_return
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| pl_sticky_bar_open_handle_return | boundary_spanning_bar_reversible_handoff | sticky 横条初始跨界，P 侧下推后开放 L 侧上拉把手 | pl_sticky_bar_push_pull_extract | yes depth=0 | down, left, right | up:destination_blocked | complete / 314 states |

### pl_boundary_sticky_group_shape_gate
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| pl_sticky_l_shape_target_wall_gate | l_shape_pull_target_blocked | 二格横条增加一个下凸 sticky cell，L 侧 pull 的额外 footprint 目标格为墙 | pl_sticky_bar_push_pull_extract | not applicable: replay stopped at illegal action; return search skipped | up | down:destination_blocked, left:pull_world_front_blocked, right:force_blocked | complete / 97 states |

## pl_sticky_bar_push_pull_extract: 二格横条：P 侧送到边界，L 侧继续抽出

结构族: pl_boundary_sticky_group_handoff
变体: two_cell_bar_positive_extract
变化变量: L 侧前格与 footprint 目标均开放
对照: pl_sticky_bar_l_front_wall_gate, pl_sticky_l_shape_target_wall_gate

问题: 二格 sticky 横条在 P/L 分界邻域能否先由 P push 跨界，再由 L pull 利用玩家旧格继续右移？
备注: active_rule=push_force/pull_force with move_sticky_rigid; material_source=box_sticky_normalize/sticky_merge; consumer=边界右侧开放把手格与开放目标格；incidental=sealed anchors/goal。

动作序列: right up right right right down right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
############
#B##PL##..G#
#S##########
##.........#
#@MM.......#
#..........#
############
```

初始状态:
```text
############
#B##PL##..G#
#S##########
##.........#
#@MM.......#
#..........#
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#B##PL##..G#
#S##########
##.........#
#.@MM......#
#..........#
############
```
- 2. up: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##@........#
#..MM......#
#..........#
############
```
- 3. right: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##.@.......#
#..MM......#
#..........#
############
```
- 4. right: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##..@......#
#..MM......#
#..........#
############
```
- 5. right: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##...@.....#
#..MM......#
#..........#
############
```
- 6. down: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##.........#
#..MM@.....#
#..........#
############
```
- 7. right: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#B##PL##..G#
#S##########
##.........#
#...MM@....#
#..........#
############
```

最终状态:
```text
############
#B##PL##..G#
#S##########
##.........#
#...MM@....#
#..........#
############
```
变化格: (1,4) @->.; (2,4) M->.; (3,4) M->.; (4,4) .->M; (5,4) .->M; (6,4) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:6,3\|C:\|M:4,4;5,4\|PL:P:4,1;L:5,1\|BS:B:1,1;S:1,2 |
| down | yes | walk | Ply:6,5\|C:\|M:4,4;5,4\|PL:P:4,1;L:5,1\|BS:B:1,1;S:1,2 |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:sticky#1,move_sticky_rigid | Ply:7,4\|C:\|M:5,4;6,4\|PL:P:4,1;L:5,1\|BS:B:1,1;S:1,2 |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=486, transitions=1336, winStates=0, maxDepth=14
事件类型: move_sticky_rigid=54, pull_object:sticky#1=30, push_object:sticky#1=24, walk=1282

## pl_sticky_bar_l_front_wall_gate: 二格横条反例：L 侧前格门阻止抽出

结构族: pl_boundary_sticky_group_handoff
变体: two_cell_bar_pull_front_blocked
变化变量: L 侧玩家前格改成墙；sticky footprint 自身目标仍可容纳
对照: pl_sticky_bar_push_pull_extract

问题: P 侧同样可以把二格条送到边界时，L 侧 pull 的玩家前格门是否独立阻断后续抽出？
备注: active_rule=pull_force front-cell gate after P-side sticky push; material_source=box_sticky_normalize/sticky_merge; consumer=L 侧前格墙；incidental=sealed anchors/goal。

动作序列: right up right right right down right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
############
#B##PL##..G#
#S##########
##.........#
#@MM..#....#
#..........#
############
```

初始状态:
```text
############
#B##PL##..G#
#S##########
##.........#
#@MM..#....#
#..........#
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#B##PL##..G#
#S##########
##.........#
#.@MM.#....#
#..........#
############
```
- 2. up: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##@........#
#..MM.#....#
#..........#
############
```
- 3. right: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##.@.......#
#..MM.#....#
#..........#
############
```
- 4. right: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##..@......#
#..MM.#....#
#..........#
############
```
- 5. right: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##...@.....#
#..MM.#....#
#..........#
############
```
- 6. down: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##.........#
#..MM@#....#
#..........#
############
```
- 7. right: illegal (destination_blocked); events=-; eventWin=no
```text
############
#B##PL##..G#
#S##########
##.........#
#..MM@#....#
#..........#
############
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
############
#B##PL##..G#
#S##########
##.........#
#..MM@#....#
#..........#
############
```
变化格: (1,4) @->.; (2,4) M->.; (4,4) .->M; (5,4) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,3\|C:\|M:3,4;4,4\|PL:P:4,1;L:5,1\|BS:B:1,1;S:1,2 |
| down | yes | walk | Ply:5,5\|C:\|M:3,4;4,4\|PL:P:4,1;L:5,1\|BS:B:1,1;S:1,2 |
| left | no | - | pull_world_front_blocked |
| right | no | - | destination_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=396, transitions=1015, winStates=0, maxDepth=14
事件类型: move_sticky_rigid=38, pull_object:sticky#1=16, push_object:sticky#1=22, walk=977

## pl_sticky_bar_open_handle_return: 打开把手后的回返正例：P 下推、L 上拉回原状

结构族: pl_boundary_sticky_group_handle_return
变体: boundary_spanning_bar_reversible_handoff
变化变量: sticky 横条初始跨界，P 侧下推后开放 L 侧上拉把手
对照: pl_sticky_bar_push_pull_extract

问题: 跨界二格条是否能用 P 侧 push 先打开 L 侧把手格，再由 L 侧 pull 把 footprint 拉回原位？
备注: active_rule=push_force/pull_force with same sticky footprint under different side checks; material_source=box_sticky_normalize/sticky_merge; consumer=边界两侧把手格互补； incidental=sealed anchors/goal。

动作序列: down right up left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
############
#B##PL##..G#
#S##########
##..@......#
##..MM.....#
##.........#
############
```

初始状态:
```text
############
#B##PL##..G#
#S##########
##..@......#
##..MM.....#
##.........#
############
```

动作回放:
- 1. down: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#B##PL##..G#
#S##########
##.........#
##..@......#
##..MM.....#
############
```
- 2. right: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##.........#
##...@.....#
##..MM.....#
############
```
- 3. up: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#B##PL##..G#
#S##########
##...@.....#
##..MM.....#
##.........#
############
```
- 4. left: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##..@......#
##..MM.....#
##.........#
############
```

最终状态:
```text
############
#B##PL##..G#
#S##########
##..@......#
##..MM.....#
##.........#
############
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | push_object:sticky#1,move_sticky_rigid | Ply:4,4\|C:\|M:4,5;5,5\|PL:P:4,1;L:5,1\|BS:B:1,1;S:1,2 |
| left | yes | walk | Ply:3,3\|C:\|M:4,4;5,4\|PL:P:4,1;L:5,1\|BS:B:1,1;S:1,2 |
| right | yes | walk | Ply:5,3\|C:\|M:4,4;5,4\|PL:P:4,1;L:5,1\|BS:B:1,1;S:1,2 |

回到初始: yes, depth=0, path=
局部可达图: status=complete, states=314, transitions=849, winStates=0, maxDepth=14
事件类型: move_sticky_rigid=42, pull_object:sticky#1=34, push_object:sticky#1=8, walk=807

## pl_sticky_l_shape_target_wall_gate: L 形修正：前格开放但额外 footprint 目标格阻断 L 侧 pull

结构族: pl_boundary_sticky_group_shape_gate
变体: l_shape_pull_target_blocked
变化变量: 二格横条增加一个下凸 sticky cell，L 侧 pull 的额外 footprint 目标格为墙
对照: pl_sticky_bar_push_pull_extract

问题: 同样的 P 侧送入与 L 侧把手，L 形 footprint 是否会因额外目标格被墙消费而从可抽出变为不可抽出？
备注: active_rule=pull_force footprint check on rigid sticky group after P-side boundary push; material_source=box_sticky_normalize/sticky_merge; consumer=L 侧下凸目标格墙； incidental=sealed anchors/goal。

动作序列: right up right right right down right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=20, maxStates=20000, maxTransitions=80000

layout:
```text
############
#B##PL##..G#
#S##########
##.........#
#@MM.......#
#..M.#.....#
############
```

初始状态:
```text
############
#B##PL##..G#
#S##########
##.........#
#@MM.......#
#..M.#.....#
############
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
############
#B##PL##..G#
#S##########
##.........#
#.@MM......#
#...M#.....#
############
```
- 2. up: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##@........#
#..MM......#
#...M#.....#
############
```
- 3. right: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##.@.......#
#..MM......#
#...M#.....#
############
```
- 4. right: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##..@......#
#..MM......#
#...M#.....#
############
```
- 5. right: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##...@.....#
#..MM......#
#...M#.....#
############
```
- 6. down: legal; events=walk; eventWin=no
```text
############
#B##PL##..G#
#S##########
##.........#
#..MM@.....#
#...M#.....#
############
```
- 7. right: illegal (force_blocked); events=-; eventWin=no
```text
############
#B##PL##..G#
#S##########
##.........#
#..MM@.....#
#...M#.....#
############
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
############
#B##PL##..G#
#S##########
##.........#
#..MM@.....#
#...M#.....#
############
```
变化格: (1,4) @->.; (2,4) M->.; (4,4) .->M; (5,4) .->@; (3,5) M->.; (4,5) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,3\|C:\|M:3,4;4,4;4,5\|PL:P:4,1;L:5,1\|BS:B:1,1;S:1,2 |
| down | no | - | destination_blocked |
| left | no | - | pull_world_front_blocked |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=97, transitions=253, winStates=0, maxDepth=14
事件类型: move_sticky_rigid=14, pull_object:sticky#1=4, push_object:sticky#1=10, walk=239

