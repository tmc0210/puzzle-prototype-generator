# 机制局部实验: ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_mixed_force_chain_wall

- 原型: reality_anchor
- 生成时间: 2026-07-08T05:09:31.716Z
- 标题: 箱 + P/L anchor 混合力链的墙端容量与边界重写
- 备注: 本 topic 只看 crate 与 P/L anchor 同一 force chain；墙作为链端、玩家前格或后续边界 consumer。

## 结构族摘要

### pl_mixed_chain_wall_capacity
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| p_push_crate_into_anchor_tail_wall_after_one | crate_before_anchor | 链顺序为 crate -> P/L，L 端只有一格余量 | p_push_anchor_into_crate_tail_wall_after_one, anchor_only_two_steps_capacity_control | not applicable: replay stopped at illegal action; return search skipped | up, left, right | down:force_blocked | complete / 865 states |
| p_push_anchor_into_crate_tail_wall_after_one | anchor_before_crate | 链顺序为 P/L -> crate，L 端 crate 只剩一格余量 | p_push_crate_into_anchor_tail_wall_after_one, anchor_only_two_steps_capacity_control | not applicable: replay stopped at illegal action; return search skipped | up, left, right | down:force_blocked | complete / 495 states |
| anchor_only_two_steps_capacity_control | anchor_only_control | 移除 crate，保留同样墙廊余量 | p_push_crate_into_anchor_tail_wall_after_one, p_push_anchor_into_crate_tail_wall_after_one | no complete | up, left, right | down:force_blocked | complete / 411 states |

### pl_mixed_chain_boundary_rewrite
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| mixed_downshift_rewrites_side_crate_to_push | mixed_chain_shift_then_side_crate_push | 先用 P/L -> crate 混合链把 P 边界下移一格 | no_shift_side_crate_pull_front_gate | unknown exhausted: state budget exceeded | up, down, left, right | - | complete / 634 states |
| no_shift_side_crate_pull_front_gate | no_shift_gate | 不先移动 P/L；同一站位仍在 L 侧 | mixed_downshift_rewrites_side_crate_to_push | not applicable: replay stopped at illegal action; return search skipped | up, down, right | left:pull_world_front_blocked | complete / 634 states |

### pl_mixed_pull_wall_gate
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| l_pull_anchor_carries_side_crate_open | open_front_and_crate_target | L 侧 pull 横向 P/L，上方玩家前格和 crate 目标格都开放 | l_pull_anchor_front_wall_gate, l_pull_anchor_crate_target_wall_gate | unknown exhausted: depth budget exceeded | right | up:destination_blocked, down:pull_world_front_blocked, left:pull_world_front_blocked | complete / 143 states |
| l_pull_anchor_front_wall_gate | player_front_wall | 只关闭玩家 pull 前格 | l_pull_anchor_carries_side_crate_open | not applicable: replay stopped at illegal action; return search skipped | right | up:destination_blocked, down:pull_world_front_blocked, left:pull_world_front_blocked | complete / 53 states |
| l_pull_anchor_crate_target_wall_gate | crate_target_wall | 玩家前格开放，但被携带 crate 的目标格为墙 | l_pull_anchor_carries_side_crate_open | not applicable: replay stopped at illegal action; return search skipped | right | up:force_blocked, down:pull_world_front_blocked, left:pull_world_front_blocked | complete / 79 states |

## p_push_crate_into_anchor_tail_wall_after_one

结构族: pl_mixed_chain_wall_capacity
变体: crate_before_anchor
变化变量: 链顺序为 crate -> P/L，L 端只有一格余量
对照: p_push_anchor_into_crate_tail_wall_after_one, anchor_only_two_steps_capacity_control

问题: crate 顶住 P/L 后，墙是否在第二次推进时消费整条混合链尾端？
动作序列: down down
反事实禁用: 无
预算: exploreDepth=8, returnDepth=32, maxStates=50000, maxTransitions=120000

layout:
```text
########
#G.....#
#..@...#
#..C...#
#..P...#
#..L...#
#......#
########
```

初始状态:
```text
########
#G.....#
#..@...#
#..C...#
#..P...#
#..L...#
#......#
########
```

动作回放:
- 1. down: legal; events=push_object:crate#1,force_chain:n2,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#G.....#
#......#
#..@...#
#..C...#
#..P...#
#..L...#
########
```
- 2. down: illegal (force_blocked); events=-; eventWin=no
```text
########
#G.....#
#......#
#..@...#
#..C...#
#..P...#
#..L...#
########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
########
#G.....#
#......#
#..@...#
#..C...#
#..P...#
#..L...#
########
```
变化格: (3,2) @->.; (3,3) C->@; (3,4) P->C; (3,5) L->P; (3,6) .->L

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:3,4\|M:\|PL:P:3,5;L:3,6\|BS:none |
| down | no | - | force_blocked |
| left | yes | walk | Ply:2,3\|C:3,4\|M:\|PL:P:3,5;L:3,6\|BS:none |
| right | yes | walk | Ply:4,3\|C:3,4\|M:\|PL:P:3,5;L:3,6\|BS:none |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=865, transitions=1575, winStates=1, maxDepth=8
事件类型: anchor_boundary_shift:push_pull=98, force_chain:n2=1, pull_object:push_pull_anchor=35, push_object:crate#1=82, push_object:push_pull_anchor=62, walk=1396

## p_push_anchor_into_crate_tail_wall_after_one

结构族: pl_mixed_chain_wall_capacity
变体: anchor_before_crate
变化变量: 链顺序为 P/L -> crate，L 端 crate 只剩一格余量
对照: p_push_crate_into_anchor_tail_wall_after_one, anchor_only_two_steps_capacity_control

问题: P/L 顶住 crate 时，墙是否同样在第二次推进时消费混合链尾端？
动作序列: down down
反事实禁用: 无
预算: exploreDepth=8, returnDepth=32, maxStates=50000, maxTransitions=120000

layout:
```text
########
#G.....#
#..@...#
#..P...#
#..L...#
#..C...#
#......#
########
```

初始状态:
```text
########
#G.....#
#..@...#
#..P...#
#..L...#
#..C...#
#......#
########
```

动作回放:
- 1. down: legal; events=push_object:push_pull_anchor,force_chain:n2,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#G.....#
#......#
#..@...#
#..P...#
#..L...#
#..C...#
########
```
- 2. down: illegal (force_blocked); events=-; eventWin=no
```text
########
#G.....#
#......#
#..@...#
#..P...#
#..L...#
#..C...#
########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
########
#G.....#
#......#
#..@...#
#..P...#
#..L...#
#..C...#
########
```
变化格: (3,2) @->.; (3,3) P->@; (3,4) L->P; (3,5) C->L; (3,6) .->C

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:3,6\|M:\|PL:P:3,4;L:3,5\|BS:none |
| down | no | - | force_blocked |
| left | yes | walk | Ply:2,3\|C:3,6\|M:\|PL:P:3,4;L:3,5\|BS:none |
| right | yes | walk | Ply:4,3\|C:3,6\|M:\|PL:P:3,4;L:3,5\|BS:none |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=495, transitions=1019, winStates=0, maxDepth=8
事件类型: anchor_boundary_shift:push_pull=61, force_chain:n2=1, pull_object:crate#1=33, pull_object:push_pull_anchor=23, push_object:crate#1=6, push_object:push_pull_anchor=38, walk=919

## anchor_only_two_steps_capacity_control

结构族: pl_mixed_chain_wall_capacity
变体: anchor_only_control
变化变量: 移除 crate，保留同样墙廊余量
对照: p_push_crate_into_anchor_tail_wall_after_one, p_push_anchor_into_crate_tail_wall_after_one

问题: 没有 crate 进入同一 force chain 时，同样墙廊是否还能推进两步？
动作序列: down down
反事实禁用: 无
预算: exploreDepth=8, returnDepth=32, maxStates=50000, maxTransitions=120000

layout:
```text
########
#G.....#
#..@...#
#..P...#
#..L...#
#......#
#......#
########
```

初始状态:
```text
########
#G.....#
#..@...#
#..P...#
#..L...#
#......#
#......#
########
```

动作回放:
- 1. down: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#G.....#
#......#
#..@...#
#..P...#
#..L...#
#......#
########
```
- 2. down: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#G.....#
#......#
#......#
#..@...#
#..P...#
#..L...#
########
```

最终状态:
```text
########
#G.....#
#......#
#......#
#..@...#
#..P...#
#..L...#
########
```
变化格: (3,2) @->.; (3,3) P->.; (3,4) L->@; (3,5) .->P; (3,6) .->L

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,3\|C:\|M:\|PL:P:3,5;L:3,6\|BS:none |
| down | no | - | force_blocked |
| left | yes | walk | Ply:2,4\|C:\|M:\|PL:P:3,5;L:3,6\|BS:none |
| right | yes | walk | Ply:4,4\|C:\|M:\|PL:P:3,5;L:3,6\|BS:none |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=411, transitions=1058, winStates=0, maxDepth=8
事件类型: anchor_boundary_shift:push_pull=62, pull_object:push_pull_anchor=28, push_object:push_pull_anchor=34, walk=996

## mixed_downshift_rewrites_side_crate_to_push

结构族: pl_mixed_chain_boundary_rewrite
变体: mixed_chain_shift_then_side_crate_push
变化变量: 先用 P/L -> crate 混合链把 P 边界下移一格
对照: no_shift_side_crate_pull_front_gate

问题: 混合链移动 P/L 后，原本在 L 侧的侧边 crate 是否变成可从右侧 push 的对象？
动作序列: down right right down left
反事实禁用: 无
预算: exploreDepth=8, returnDepth=32, maxStates=50000, maxTransitions=120000

layout:
```text
########
#G.....#
#..@...#
#..P...#
#..LC..#
#..C...#
#......#
########
```

初始状态:
```text
########
#G.....#
#..@...#
#..P...#
#..LC..#
#..C...#
#......#
########
```

动作回放:
- 1. down: legal; events=push_object:push_pull_anchor,force_chain:n2,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#G.....#
#......#
#..@...#
#..PC..#
#..L...#
#..C...#
########
```
- 2. right: legal; events=walk; eventWin=no
```text
########
#G.....#
#......#
#...@..#
#..PC..#
#..L...#
#..C...#
########
```
- 3. right: legal; events=walk; eventWin=no
```text
########
#G.....#
#......#
#....@.#
#..PC..#
#..L...#
#..C...#
########
```
- 4. down: legal; events=walk; eventWin=no
```text
########
#G.....#
#......#
#......#
#..PC@.#
#..L...#
#..C...#
########
```
- 5. left: legal; events=push_object:crate#1,force_chain:n2,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#G.....#
#......#
#......#
#.PC@..#
#.L....#
#..C...#
########
```

最终状态:
```text
########
#G.....#
#......#
#......#
#.PC@..#
#.L....#
#..C...#
########
```
变化格: (3,2) @->.; (3,3) P->.; (2,4) .->P; (3,4) L->C; (4,4) C->@; (2,5) .->L; (3,5) C->.; (3,6) .->C

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,3\|C:3,4;3,6\|M:\|PL:P:2,4;L:2,5\|BS:none |
| down | yes | walk | Ply:4,5\|C:3,4;3,6\|M:\|PL:P:2,4;L:2,5\|BS:none |
| left | yes | push_object:crate#1,force_chain:n2,anchor_boundary_shift:push_pull | Ply:3,4\|C:2,4;3,6\|M:\|PL:P:1,4;L:1,5\|BS:none |
| right | yes | walk | Ply:5,4\|C:3,4;3,6\|M:\|PL:P:2,4;L:2,5\|BS:none |

回到初始: unknown (exhausted: state budget exceeded; 不可当作 no)
局部可达图: status=complete, states=634, transitions=1185, winStates=0, maxDepth=8
事件类型: anchor_boundary_shift:push_pull=73, force_chain:n2=14, pull_object:crate#1=14, pull_object:crate#2=40, pull_object:push_pull_anchor=27, push_object:crate#1=23, push_object:crate#2=3, push_object:push_pull_anchor=44, walk=1034

## no_shift_side_crate_pull_front_gate

结构族: pl_mixed_chain_boundary_rewrite
变体: no_shift_gate
变化变量: 不先移动 P/L；同一站位仍在 L 侧
对照: mixed_downshift_rewrites_side_crate_to_push

问题: 没有边界下移时，从同一右侧站位碰侧边 crate 是否被 pull front gate 拒绝？
动作序列: right right down down left
反事实禁用: 无
预算: exploreDepth=8, returnDepth=32, maxStates=50000, maxTransitions=120000

layout:
```text
########
#G.....#
#..@...#
#..P...#
#..LC..#
#..C...#
#......#
########
```

初始状态:
```text
########
#G.....#
#..@...#
#..P...#
#..LC..#
#..C...#
#......#
########
```

动作回放:
- 1. right: legal; events=walk; eventWin=no
```text
########
#G.....#
#...@..#
#..P...#
#..LC..#
#..C...#
#......#
########
```
- 2. right: legal; events=walk; eventWin=no
```text
########
#G.....#
#....@.#
#..P...#
#..LC..#
#..C...#
#......#
########
```
- 3. down: legal; events=walk; eventWin=no
```text
########
#G.....#
#......#
#..P.@.#
#..LC..#
#..C...#
#......#
########
```
- 4. down: legal; events=walk; eventWin=no
```text
########
#G.....#
#......#
#..P...#
#..LC@.#
#..C...#
#......#
########
```
- 5. left: illegal (pull_world_front_blocked); events=-; eventWin=no
```text
########
#G.....#
#......#
#..P...#
#..LC@.#
#..C...#
#......#
########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
########
#G.....#
#......#
#..P...#
#..LC@.#
#..C...#
#......#
########
```
变化格: (3,2) @->.; (5,4) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,3\|C:3,5;4,4\|M:\|PL:P:3,3;L:3,4\|BS:none |
| down | yes | walk | Ply:5,5\|C:3,5;4,4\|M:\|PL:P:3,3;L:3,4\|BS:none |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:crate#1 | Ply:6,4\|C:3,5;5,4\|M:\|PL:P:3,3;L:3,4\|BS:none |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=634, transitions=1185, winStates=0, maxDepth=8
事件类型: anchor_boundary_shift:push_pull=73, force_chain:n2=14, pull_object:crate#1=14, pull_object:crate#2=40, pull_object:push_pull_anchor=27, push_object:crate#1=23, push_object:crate#2=3, push_object:push_pull_anchor=44, walk=1034

## l_pull_anchor_carries_side_crate_open

结构族: pl_mixed_pull_wall_gate
变体: open_front_and_crate_target
变化变量: L 侧 pull 横向 P/L，上方玩家前格和 crate 目标格都开放
对照: l_pull_anchor_front_wall_gate, l_pull_anchor_crate_target_wall_gate

问题: L 侧 pull P/L 时，非接触半格目标上的 crate 是否与 anchor 同链上移？
动作序列: up
反事实禁用: 无
预算: exploreDepth=8, returnDepth=32, maxStates=50000, maxTransitions=120000

layout:
```text
########
#G.....#
#..C@..#
#..PL..#
#......#
########
```

初始状态:
```text
########
#G.....#
#..C@..#
#..PL..#
#......#
########
```

动作回放:
- 1. up: legal; events=pull_object:push_pull_anchor,force_chain:n2,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#G.C@..#
#..PL..#
#......#
#......#
########
```

最终状态:
```text
########
#G.C@..#
#..PL..#
#......#
#......#
########
```
变化格: (3,1) .->C; (4,1) .->@; (3,2) C->P; (4,2) @->L; (3,3) P->.; (4,3) L->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | pull_world_front_blocked |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:crate#1 | Ply:5,1\|C:4,1\|M:\|PL:P:3,2;L:4,2\|BS:none |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=143, transitions=262, winStates=0, maxDepth=8
事件类型: anchor_boundary_shift:push_pull=20, force_chain:n2=5, pull_object:crate#1=10, pull_object:push_pull_anchor=11, push_object:crate#1=3, push_object:push_pull_anchor=8, walk=230

## l_pull_anchor_front_wall_gate

结构族: pl_mixed_pull_wall_gate
变体: player_front_wall
变化变量: 只关闭玩家 pull 前格
对照: l_pull_anchor_carries_side_crate_open

问题: 玩家前格墙是否在 force chain 规划前截断 pull？
动作序列: up
反事实禁用: 无
预算: exploreDepth=8, returnDepth=32, maxStates=50000, maxTransitions=120000

layout:
```text
########
#G..#..#
#..C@..#
#..PL..#
#......#
########
```

初始状态:
```text
########
#G..#..#
#..C@..#
#..PL..#
#......#
########
```

动作回放:
- 1. up: illegal (destination_blocked); events=-; eventWin=no
```text
########
#G..#..#
#..C@..#
#..PL..#
#......#
########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
########
#G..#..#
#..C@..#
#..PL..#
#......#
########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | pull_world_front_blocked |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:crate#1 | Ply:5,2\|C:4,2\|M:\|PL:P:3,3;L:4,3\|BS:none |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=53, transitions=95, winStates=0, maxDepth=8
事件类型: anchor_boundary_shift:push_pull=5, pull_object:crate#1=4, pull_object:push_pull_anchor=2, push_object:push_pull_anchor=3, walk=86

## l_pull_anchor_crate_target_wall_gate

结构族: pl_mixed_pull_wall_gate
变体: crate_target_wall
变化变量: 玩家前格开放，但被携带 crate 的目标格为墙
对照: l_pull_anchor_carries_side_crate_open

问题: 非接触半格上的 crate 撞墙时，是否以 force_blocked 截断整条 pull 混合链？
动作序列: up
反事实禁用: 无
预算: exploreDepth=8, returnDepth=32, maxStates=50000, maxTransitions=120000

layout:
```text
########
#G.#...#
#..C@..#
#..PL..#
#......#
########
```

初始状态:
```text
########
#G.#...#
#..C@..#
#..PL..#
#......#
########
```

动作回放:
- 1. up: illegal (force_blocked); events=-; eventWin=no
```text
########
#G.#...#
#..C@..#
#..PL..#
#......#
########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
########
#G.#...#
#..C@..#
#..PL..#
#......#
########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | force_blocked |
| down | no | - | pull_world_front_blocked |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:crate#1 | Ply:5,2\|C:4,2\|M:\|PL:P:3,3;L:4,3\|BS:none |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=79, transitions=130, winStates=0, maxDepth=8
事件类型: anchor_boundary_shift:push_pull=12, force_chain:n2=4, pull_object:crate#1=6, pull_object:push_pull_anchor=5, push_object:crate#1=2, push_object:push_pull_anchor=6, walk=111

