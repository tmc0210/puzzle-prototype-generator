# 机制局部实验: ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_wall_latch_goal_plug

- 原型: reality_anchor
- 生成时间: 2026-07-08T05:03:19.815Z
- 标题: P/L anchor 墙口门闩与目标塞子
- 备注: 本 topic 只研究 P/L anchor 本体作为二格门闩 / 目标塞子的可动性。 墙口宽度、过窄目标格、pull 后回返把手和目标覆盖作为 consumer； 箱子、B/S、sticky 不参与。


## 结构族摘要

### pl_anchor_wall_latch_mouth_width
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| one_cell_push_mouth_open | 一格墙口；push 横移开闩 | L 端有一格余量，P 半格从一格墙口移出 | one_cell_push_mouth_too_narrow, two_cell_mouth_shortcut | no complete | up, down, left | right:force_blocked | complete / 17 states |
| one_cell_push_mouth_too_narrow | 一格墙口；过窄 force_blocked | 把 L 端余量改成墙，锚点目标 footprint 不足 | one_cell_push_mouth_open | not applicable: replay stopped at illegal action; return search skipped | left | up:destination_blocked, down:destination_blocked, right:force_blocked | complete / 2 states |
| two_cell_mouth_shortcut | 二格墙口；宽度 shortcut | 一格墙口改成相邻二格墙口，旁 lane 不被 anchor 覆盖 | one_cell_push_mouth_open | yes depth=1 | up, down, right | left:destination_blocked | complete / 33 states |
| one_cell_pull_extract_handle_open | 一格墙口；pull 抽出且侧把手开放 | 反向 LP 摆放，P 半格堵门；左侧 pull 抽出后保留侧路把手 | one_cell_pull_extract_handle_sealed, one_cell_push_mouth_open | no complete | up, down | left:destination_blocked, right:pull_world_front_blocked | complete / 35 states |
| one_cell_pull_extract_handle_sealed | 一格墙口；pull 抽出但回返把手封死 | 关闭 pull 后玩家上下侧路，只保留被抽开的门口 | one_cell_pull_extract_handle_open | no complete | - | up:destination_blocked, down:destination_blocked, left:destination_blocked, right:pull_world_front_blocked | complete / 2 states |

### pl_anchor_goal_plug_crossing
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| goal_cover_stop_on_target | 目标塞住；墙止位 | 目标紧贴 L 端，右侧墙阻止继续越过目标 | goal_cover_release_overtravel | no complete | down, left | up:destination_blocked, right:force_blocked | complete / 8 states |
| goal_cover_release_overtravel | 目标覆盖后越过释放 | 目标外侧留三格余量，允许 anchor 穿过并释放目标 | goal_cover_stop_on_target | no complete | down, left, right | up:destination_blocked | complete / 14 states |

## one_cell_push_mouth_open: P/L 半格堵住一格墙口，push 后释放上下通道

结构族: pl_anchor_wall_latch_mouth_width
变体: 一格墙口；push 横移开闩
变化变量: L 端有一格余量，P 半格从一格墙口移出
对照: one_cell_push_mouth_too_narrow, two_cell_mouth_shortcut

问题: 当 P/L 横条只有 P 半格插在一格墙口内时，P 侧 push 是否把锚点整体右移， 让原来被 P 半格堵住的门口变成可 walk 的上下通道？

备注: active_rule=push_force 移动 P/L anchor；consumer=一格墙口和右侧墙止位。

动作序列: right
反事实禁用: 无
预算: exploreDepth=18, returnDepth=32, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#..G..#
###.###
#.@PL.#
###.###
#.....#
#######
```

初始状态:
```text
#######
#..G..#
###.###
#.@PL.#
###.###
#.....#
#######
```

动作回放:
- 1. right: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#######
#..G..#
###.###
#..@PL#
###.###
#.....#
#######
```

最终状态:
```text
#######
#..G..#
###.###
#..@PL#
###.###
#.....#
#######
```
变化格: (2,3) @->.; (3,3) P->@; (4,3) L->P; (5,3) .->L

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:\|M:\|PL:P:4,3;L:5,3\|BS:none |
| down | yes | walk | Ply:3,4\|C:\|M:\|PL:P:4,3;L:5,3\|BS:none |
| left | yes | walk | Ply:2,3\|C:\|M:\|PL:P:4,3;L:5,3\|BS:none |
| right | no | - | force_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=17, transitions=31, winStates=0, maxDepth=5
事件类型: anchor_boundary_shift:push_pull=1, push_object:push_pull_anchor=1, walk=30

## one_cell_push_mouth_too_narrow: 同一门闩少一格余量时首步被 footprint 目标墙阻断

结构族: pl_anchor_wall_latch_mouth_width
变体: 一格墙口；过窄 force_blocked
变化变量: 把 L 端余量改成墙，锚点目标 footprint 不足
对照: one_cell_push_mouth_open

问题: 若只有接触侧玩家前格可进入，但 L 半格的右移目标格是墙， 同样的 push 是否不移动 anchor，并以 force_blocked 失败？

备注: active_rule=push_force 的刚体 footprint 检查；consumer=过窄墙口。

动作序列: right
反事实禁用: 无
预算: exploreDepth=18, returnDepth=32, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#..G..#
###.###
#.@PL##
###.###
#.....#
#######
```

初始状态:
```text
#######
#..G..#
###.###
#.@PL##
###.###
#.....#
#######
```

动作回放:
- 1. right: illegal (force_blocked); events=-; eventWin=no
```text
#######
#..G..#
###.###
#.@PL##
###.###
#.....#
#######
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#######
#..G..#
###.###
#.@PL##
###.###
#.....#
#######
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:1,3\|C:\|M:\|PL:P:3,3;L:4,3\|BS:none |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=2, transitions=2, winStates=0, maxDepth=1
事件类型: walk=2

## two_cell_mouth_shortcut: 墙口过宽时玩家不移动 P/L 就能从旁 lane 通过

结构族: pl_anchor_wall_latch_mouth_width
变体: 二格墙口；宽度 shortcut
变化变量: 一格墙口改成相邻二格墙口，旁 lane 不被 anchor 覆盖
对照: one_cell_push_mouth_open

问题: 当墙口宽到有第二条相邻 lane 时，玩家是否可以直接 walk 通过， 使 P/L 门闩不再是必经 consumer？

备注: active_rule=walk；consumer=宽度 shortcut。此 case 不支撑 anchor 可动性，只校准门闩宽度边界。

动作序列: up
反事实禁用: 无
预算: exploreDepth=18, returnDepth=32, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#..G..#
##..###
#.@PL.#
##..###
#.....#
#######
```

初始状态:
```text
#######
#..G..#
##..###
#.@PL.#
##..###
#.....#
#######
```

动作回放:
- 1. up: legal; events=walk; eventWin=no
```text
#######
#..G..#
##@.###
#..PL.#
##..###
#.....#
#######
```

最终状态:
```text
#######
#..G..#
##@.###
#..PL.#
##..###
#.....#
#######
```
变化格: (2,2) .->@; (2,3) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,1\|C:\|M:\|PL:P:3,3;L:4,3\|BS:none |
| down | yes | walk | Ply:2,3\|C:\|M:\|PL:P:3,3;L:4,3\|BS:none |
| left | no | - | destination_blocked |
| right | yes | walk | Ply:3,2\|C:\|M:\|PL:P:3,3;L:4,3\|BS:none |

回到初始: yes, depth=1, path=down
局部可达图: status=complete, states=33, transitions=75, winStates=0, maxDepth=5
事件类型: anchor_boundary_shift:push_pull=1, push_object:push_pull_anchor=1, walk=74

## one_cell_pull_extract_handle_open: pull 可以把 P 半格从一格墙口抽出，侧路决定后续把手

结构族: pl_anchor_wall_latch_mouth_width
变体: 一格墙口；pull 抽出且侧把手开放
变化变量: 反向 LP 摆放，P 半格堵门；左侧 pull 抽出后保留侧路把手
对照: one_cell_pull_extract_handle_sealed, one_cell_push_mouth_open

问题: 在 LP 反向横条中，玩家处在 pull 侧并向左移动时， 是否能把 P 半格从门口抽出；若左侧上下侧路开放，最终动作集合是否保留侧路 walk？

备注: active_rule=pull_force 移动 P/L anchor；consumer=门口 P 半格和 pull 后侧路把手。

动作序列: left
反事实禁用: 无
预算: exploreDepth=18, returnDepth=32, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#..G..#
#.##.##
#.@LP.#
#.##.##
#.....#
#######
```

初始状态:
```text
#######
#..G..#
#.##.##
#.@LP.#
#.##.##
#.....#
#######
```

动作回放:
- 1. left: legal; events=pull_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#######
#..G..#
#.##.##
#@LP..#
#.##.##
#.....#
#######
```

最终状态:
```text
#######
#..G..#
#.##.##
#@LP..#
#.##.##
#.....#
#######
```
变化格: (1,3) .->@; (2,3) @->L; (3,3) L->P; (4,3) P->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:1,2\|C:\|M:\|PL:P:3,3;L:2,3\|BS:none |
| down | yes | walk | Ply:1,4\|C:\|M:\|PL:P:3,3;L:2,3\|BS:none |
| left | no | - | destination_blocked |
| right | no | - | pull_world_front_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=35, transitions=66, winStates=0, maxDepth=16
事件类型: anchor_boundary_shift:push_pull=2, pull_object:push_pull_anchor=1, push_object:push_pull_anchor=1, walk=64

## one_cell_pull_extract_handle_sealed: 同样 pull 抽出门闩后，墙可以吃掉玩家回返把手

结构族: pl_anchor_wall_latch_mouth_width
变体: 一格墙口；pull 抽出但回返把手封死
变化变量: 关闭 pull 后玩家上下侧路，只保留被抽开的门口
对照: one_cell_pull_extract_handle_open

问题: 若 pull 抽出动作本身仍合法，但玩家落点四周由墙和 anchor 封住， 最终动作集合是否从开放侧路变成无合法动作？

备注: active_rule=pull_force 移动 P/L anchor；consumer=回返把手墙。

动作序列: left
反事实禁用: 无
预算: exploreDepth=18, returnDepth=32, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#..G..#
####.##
#.@LP.#
####.##
#.....#
#######
```

初始状态:
```text
#######
#..G..#
####.##
#.@LP.#
####.##
#.....#
#######
```

动作回放:
- 1. left: legal; events=pull_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#######
#..G..#
####.##
#@LP..#
####.##
#.....#
#######
```

最终状态:
```text
#######
#..G..#
####.##
#@LP..#
####.##
#.....#
#######
```
变化格: (1,3) .->@; (2,3) @->L; (3,3) L->P; (4,3) P->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | no | - | destination_blocked |
| right | no | - | pull_world_front_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=2, transitions=1, winStates=0, maxDepth=1
事件类型: anchor_boundary_shift:push_pull=1, pull_object:push_pull_anchor=1

## goal_cover_stop_on_target: P/L 横移一格后以 L 半格覆盖目标并被墙止住

结构族: pl_anchor_goal_plug_crossing
变体: 目标塞住；墙止位
变化变量: 目标紧贴 L 端，右侧墙阻止继续越过目标
对照: goal_cover_release_overtravel

问题: 当单目标紧贴 L 端且目标外侧是墙时，push 是否让 L 半格覆盖目标， 并在下一步被墙保持为目标塞子？

备注: active_rule=push_force 移动 P/L anchor；consumer=目标覆盖判定和右侧止位墙。

动作序列: right
反事实禁用: 无
预算: exploreDepth=18, returnDepth=32, maxStates=30000, maxTransitions=120000

layout:
```text
#######
#@PLG##
#.....#
#######
```

初始状态:
```text
#######
#@PLG##
#.....#
#######
```

动作回放:
- 1. right: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#######
#.@PL##
#.....#
#######
```

最终状态:
```text
#######
#.@PL##
#.....#
#######
```
变化格: (1,1) @->.; (2,1) P->@; (3,1) L->P; (4,1) G->L

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:2,2\|C:\|M:\|PL:P:3,1;L:4,1\|BS:none |
| left | yes | walk | Ply:1,1\|C:\|M:\|PL:P:3,1;L:4,1\|BS:none |
| right | no | - | force_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=8, transitions=13, winStates=1, maxDepth=5
事件类型: anchor_boundary_shift:push_pull=1, push_object:push_pull_anchor=1, walk=12

## goal_cover_release_overtravel: 目标覆盖只是穿越态；继续 push 会释放目标

结构族: pl_anchor_goal_plug_crossing
变体: 目标覆盖后越过释放
变化变量: 目标外侧留三格余量，允许 anchor 穿过并释放目标
对照: goal_cover_stop_on_target

问题: 若目标外侧不是墙止位，P/L 连续 push 是否先覆盖目标，再越过目标， 最终把目标释放成玩家站在目标上的未覆盖状态？

备注: active_rule=push_force 移动 P/L anchor；consumer=目标覆盖判定。该 case 只作为目标塞子弱证据。

动作序列: right right right
反事实禁用: 无
预算: exploreDepth=18, returnDepth=32, maxStates=30000, maxTransitions=120000

layout:
```text
#########
#@PLG...#
#.......#
#########
```

初始状态:
```text
#########
#@PLG...#
#.......#
#########
```

动作回放:
- 1. right: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#########
#.@PL...#
#.......#
#########
```
- 2. right: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#########
#..@PL..#
#.......#
#########
```
- 3. right: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#########
#...+PL.#
#.......#
#########
```

最终状态:
```text
#########
#...+PL.#
#.......#
#########
```
变化格: (1,1) @->.; (2,1) P->.; (3,1) L->.; (4,1) G->+; (5,1) .->P; (6,1) .->L

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | yes | walk | Ply:4,2\|C:\|M:\|PL:P:5,1;L:6,1\|BS:none |
| left | yes | walk | Ply:3,1\|C:\|M:\|PL:P:5,1;L:6,1\|BS:none |
| right | yes | push_object:push_pull_anchor,anchor_boundary_shift:push_pull | Ply:5,1\|C:\|M:\|PL:P:6,1;L:7,1\|BS:none |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=14, transitions=29, winStates=2, maxDepth=8
事件类型: anchor_boundary_shift:push_pull=2, pull_object:push_pull_anchor=1, push_object:push_pull_anchor=1, walk=27

