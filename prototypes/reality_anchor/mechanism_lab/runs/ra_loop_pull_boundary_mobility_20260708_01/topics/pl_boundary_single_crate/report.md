# 机制局部实验: ra_loop_pull_boundary_mobility_20260708_01_pl_boundary_single_crate

- 原型: reality_anchor
- 生成时间: 2026-07-08T03:52:49.084Z
- 标题: P/L boundary single-crate local probes
- 备注: 只研究单个 crate 在 P/L 边界邻域的 push / pull 语义切换。 active_rule=P/L forceModeAt changes player action semantics； 墙、目标口袋和站位为 consumer。


## 结构族摘要

### single_crate_boundary_exchange
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| plb_01_push_cross_pull_success | complement_success | L-side front cell is open after P-side handoff | plb_02_push_cross_pull_front_wall, plb_04_goal_pocket_shortcut | unknown exhausted: depth budget exceeded | up, down, right | left:pull_world_front_blocked | complete / 1613 states |
| plb_02_push_cross_pull_front_wall | L_front_wall_gate | L-side front cell is a wall | plb_01_push_cross_pull_success | not applicable: replay stopped at illegal action; return search skipped | up, down | left:pull_world_front_blocked, right:destination_blocked | complete / 1275 states |

### single_crate_l_pull_p_release_gate
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| plb_03_l_pull_then_p_push_wall | P_side_release_wall | after L pull, P-side push direction is wall-blocked | plb_01_push_cross_pull_success | not applicable: replay stopped at illegal action; return search skipped | up, down, left | right:force_blocked | complete / 384 states |

### single_crate_boundary_goal_pocket
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| plb_04_goal_pocket_shortcut | L_pull_deposits_on_goal | L-side puller stand cell is also the goal pocket | plb_01_push_cross_pull_success | unknown exhausted: depth budget exceeded | up, down, right | left:pull_world_front_blocked | complete / 1358 states |

## plb_01_push_cross_pull_success: P side pushes crate onto boundary, L side pulls it onward

结构族: single_crate_boundary_exchange
变体: complement_success
变化变量: L-side front cell is open after P-side handoff
对照: plb_02_push_cross_pull_front_wall, plb_04_goal_pocket_shortcut

问题: Can the same crate be pushed from the P side to the boundary-adjacent L cell, then pulled by the player after crossing into the L side?

备注: Step 1 is a P-side push on the crate at x=4. Step 3 crosses from P to L. Step 6 is an L-side pull of the same crate. active_rule=P/L forceModeAt; open L front cell is the consumer.

动作序列: right down right right up right
反事实禁用: 无
预算: exploreDepth=12, returnDepth=18, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#...PL..G#
#........#
#..@C....#
#........#
##########
```

初始状态:
```text
##########
#...PL..G#
#........#
#..@C....#
#........#
##########
```

动作回放:
- 1. right: legal; events=push_object:crate#1; eventWin=no
```text
##########
#...PL..G#
#........#
#...@C...#
#........#
##########
```
- 2. down: legal; events=walk; eventWin=no
```text
##########
#...PL..G#
#........#
#....C...#
#...@....#
##########
```
- 3. right: legal; events=walk; eventWin=no
```text
##########
#...PL..G#
#........#
#....C...#
#....@...#
##########
```
- 4. right: legal; events=walk; eventWin=no
```text
##########
#...PL..G#
#........#
#....C...#
#.....@..#
##########
```
- 5. up: legal; events=walk; eventWin=no
```text
##########
#...PL..G#
#........#
#....C@..#
#........#
##########
```
- 6. right: legal; events=pull_object:crate#1; eventWin=no
```text
##########
#...PL..G#
#........#
#.....C@.#
#........#
##########
```

最终状态:
```text
##########
#...PL..G#
#........#
#.....C@.#
#........#
##########
```
变化格: (3,3) @->.; (4,3) C->.; (6,3) .->C; (7,3) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:7,2\|C:6,3\|M:\|PL:P:4,1;L:5,1\|BS:none |
| down | yes | walk | Ply:7,4\|C:6,3\|M:\|PL:P:4,1;L:5,1\|BS:none |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:crate#1 | Ply:8,3\|C:7,3\|M:\|PL:P:4,1;L:5,1\|BS:none |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=1613, transitions=3688, winStates=8, maxDepth=12
事件类型: anchor_boundary_shift:push_pull=152, force_chain:n2=12, pull_object:crate#1=66, pull_object:push_pull_anchor=81, push_object:crate#1=99, push_object:push_pull_anchor=70, walk=3372

## plb_02_push_cross_pull_front_wall: P side handoff succeeds, L side pull is stopped by front wall

结构族: single_crate_boundary_exchange
变体: L_front_wall_gate
变化变量: L-side front cell is a wall
对照: plb_01_push_cross_pull_success

问题: Does the same P-side push handoff become gated when the L-side puller's front cell is blocked?

备注: Step 1 is a P-side push, step 3 crosses into L, and step 6 attempts the L-side pull. The crate remains boundary-adjacent at x=5; wall at x=7 is the consumer for the pull front-cell gate.

动作序列: right down right right up right
反事实禁用: 无
预算: exploreDepth=12, returnDepth=18, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#...PL..G#
#........#
#..@C..#.#
#........#
##########
```

初始状态:
```text
##########
#...PL..G#
#........#
#..@C..#.#
#........#
##########
```

动作回放:
- 1. right: legal; events=push_object:crate#1; eventWin=no
```text
##########
#...PL..G#
#........#
#...@C.#.#
#........#
##########
```
- 2. down: legal; events=walk; eventWin=no
```text
##########
#...PL..G#
#........#
#....C.#.#
#...@....#
##########
```
- 3. right: legal; events=walk; eventWin=no
```text
##########
#...PL..G#
#........#
#....C.#.#
#....@...#
##########
```
- 4. right: legal; events=walk; eventWin=no
```text
##########
#...PL..G#
#........#
#....C.#.#
#.....@..#
##########
```
- 5. up: legal; events=walk; eventWin=no
```text
##########
#...PL..G#
#........#
#....C@#.#
#........#
##########
```
- 6. right: illegal (destination_blocked); events=-; eventWin=no
```text
##########
#...PL..G#
#........#
#....C@#.#
#........#
##########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
##########
#...PL..G#
#........#
#....C@#.#
#........#
##########
```
变化格: (3,3) @->.; (4,3) C->.; (5,3) .->C; (6,3) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:6,2\|C:5,3\|M:\|PL:P:4,1;L:5,1\|BS:none |
| down | yes | walk | Ply:6,4\|C:5,3\|M:\|PL:P:4,1;L:5,1\|BS:none |
| left | no | - | pull_world_front_blocked |
| right | no | - | destination_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=1275, transitions=2838, winStates=8, maxDepth=12
事件类型: anchor_boundary_shift:push_pull=110, force_chain:n2=8, pull_object:crate#1=36, pull_object:push_pull_anchor=50, push_object:crate#1=92, push_object:push_pull_anchor=59, walk=2601

## plb_03_l_pull_then_p_push_wall: L side pulls boundary crate, then P side push release fails

结构族: single_crate_l_pull_p_release_gate
变体: P_side_release_wall
变化变量: after L pull, P-side push direction is wall-blocked
对照: plb_01_push_cross_pull_success

问题: After an L-side pull moves a boundary-adjacent crate, does crossing to the P side change the next crate action into a push that can be consumed by a side wall?

备注: Step 1 is an L-side pull on the crate at x=5. Step 2 crosses from L to P. Step 4 is a P-side push attempt on the same crate and should be blocked by the wall at x=6. active_rule=P/L forceModeAt; side wall is consumer.

动作序列: down left up right
反事实禁用: 无
预算: exploreDepth=12, returnDepth=18, maxStates=20000, maxTransitions=80000

layout:
```text
#########
#...PL.G#
#.......#
#....C..#
#....@#.#
#.......#
#########
```

初始状态:
```text
#########
#...PL.G#
#.......#
#....C..#
#....@#.#
#.......#
#########
```

动作回放:
- 1. down: legal; events=pull_object:crate#1; eventWin=no
```text
#########
#...PL.G#
#.......#
#.......#
#....C#.#
#....@..#
#########
```
- 2. left: legal; events=walk; eventWin=no
```text
#########
#...PL.G#
#.......#
#.......#
#....C#.#
#...@...#
#########
```
- 3. up: legal; events=walk; eventWin=no
```text
#########
#...PL.G#
#.......#
#.......#
#...@C#.#
#.......#
#########
```
- 4. right: illegal (force_blocked); events=-; eventWin=no
```text
#########
#...PL.G#
#.......#
#.......#
#...@C#.#
#.......#
#########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#########
#...PL.G#
#.......#
#.......#
#...@C#.#
#.......#
#########
```
变化格: (5,3) C->.; (4,4) .->@; (5,4) @->C

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,3\|C:5,4\|M:\|PL:P:4,1;L:5,1\|BS:none |
| down | yes | walk | Ply:4,5\|C:5,4\|M:\|PL:P:4,1;L:5,1\|BS:none |
| left | yes | walk | Ply:3,4\|C:5,4\|M:\|PL:P:4,1;L:5,1\|BS:none |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=384, transitions=886, winStates=3, maxDepth=12
事件类型: anchor_boundary_shift:push_pull=35, force_chain:n2=4, pull_object:crate#1=10, pull_object:push_pull_anchor=12, push_object:crate#1=11, push_object:push_pull_anchor=23, walk=830

## plb_04_goal_pocket_shortcut: L side pull deposits the handed-off crate into a boundary pocket

结构族: single_crate_boundary_goal_pocket
变体: L_pull_deposits_on_goal
变化变量: L-side puller stand cell is also the goal pocket
对照: plb_01_push_cross_pull_success

问题: Can the P-to-L handoff be consumed by a goal pocket at the L puller's previous stand cell?

备注: Step 1 is a P-side push, step 3 crosses into L, and step 6 is an L-side pull. The player stands on the goal pocket just before pulling; the crate is pulled onto that same boundary-near cell.

动作序列: right down right right up right
反事实禁用: 无
预算: exploreDepth=12, returnDepth=18, maxStates=20000, maxTransitions=80000

layout:
```text
##########
#...PL...#
#........#
#..@C.G..#
#........#
##########
```

初始状态:
```text
##########
#...PL...#
#........#
#..@C.G..#
#........#
##########
```

动作回放:
- 1. right: legal; events=push_object:crate#1; eventWin=no
```text
##########
#...PL...#
#........#
#...@CG..#
#........#
##########
```
- 2. down: legal; events=walk; eventWin=no
```text
##########
#...PL...#
#........#
#....CG..#
#...@....#
##########
```
- 3. right: legal; events=walk; eventWin=no
```text
##########
#...PL...#
#........#
#....CG..#
#....@...#
##########
```
- 4. right: legal; events=walk; eventWin=no
```text
##########
#...PL...#
#........#
#....CG..#
#.....@..#
##########
```
- 5. up: legal; events=walk; eventWin=no
```text
##########
#...PL...#
#........#
#....C+..#
#........#
##########
```
- 6. right: legal; events=pull_object:crate#1; eventWin=no
```text
##########
#...PL...#
#........#
#.....*@.#
#........#
##########
```

最终状态:
```text
##########
#...PL...#
#........#
#.....*@.#
#........#
##########
```
变化格: (3,3) @->.; (4,3) C->.; (6,3) G->*; (7,3) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:7,2\|C:6,3\|M:\|PL:P:4,1;L:5,1\|BS:none |
| down | yes | walk | Ply:7,4\|C:6,3\|M:\|PL:P:4,1;L:5,1\|BS:none |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:crate#1 | Ply:8,3\|C:7,3\|M:\|PL:P:4,1;L:5,1\|BS:none |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=1358, transitions=3096, winStates=29, maxDepth=12
事件类型: anchor_boundary_shift:push_pull=112, force_chain:n2=8, pull_object:crate#1=42, pull_object:push_pull_anchor=63, push_object:crate#1=103, push_object:push_pull_anchor=48, walk=2840

