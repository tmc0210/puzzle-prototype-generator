# 机制局部实验: ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_boundary_rewrite_second_action

- 原型: reality_anchor
- 生成时间: 2026-07-08T05:00:08.442Z
- 标题: P/L anchor 边界重写后的第二动作
- 备注: P/L anchor 本体先被 push 或 pull 长轴移动；移动后的旧 L 半格成为新的 push 侧站位， 再由墙/目标消费第二动作。失败对照用墙阻止第二次锚点移动，避免把普通对象推拉误写成本题材。


## 结构族摘要

### pl_anchor_boundary_rewrite_second_action
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| push_two_shift_old_l_push_crate_goal | push_driver_old_l_becomes_push_site | P 侧 push 将水平 P/L anchor 连续右移两格，旧 L 半格释放并落入新 push side | push_second_shift_wall_blocks_rewrite | unknown exhausted: depth budget exceeded | up, left, right | down:force_blocked | complete / 3866 states |
| push_second_shift_wall_blocks_rewrite | push_driver_second_shift_wall_blocked | L 端第二停位改成墙，第二次 anchor shift 被拒绝 | push_two_shift_old_l_push_crate_goal | not applicable: replay stopped at illegal action; return search skipped | up, down, left | right:force_blocked | complete / 1232 states |
| pull_two_shift_old_l_push_crate_goal | pull_driver_old_l_becomes_push_site | L 侧 pull 将水平 P/L anchor 连续右移两格，玩家绕行到旧 L 半格并使用新 push side | pull_second_shift_front_wall_blocks_rewrite | unknown exhausted: depth budget exceeded | up, left, right | down:force_blocked | complete / 4811 states |
| pull_second_shift_front_wall_blocks_rewrite | pull_driver_second_shift_front_wall_blocked | 第二次 pull 的玩家前格改成墙，anchor 不能继续右移，旧 L 半格不释放 | pull_two_shift_old_l_push_crate_goal | not applicable: replay stopped at illegal action; return search skipped | up, down | left:pull_world_front_blocked, right:destination_blocked | complete / 2215 states |
| push_one_shift_only_walks_not_consume | one_shift_no_old_l_site | 只推动一次 P/L anchor，玩家还没站到旧 L 半格 | push_two_shift_old_l_push_crate_goal | unknown exhausted: depth budget exceeded | up, down, left, right | - | complete / 3866 states |

## push_two_shift_old_l_push_crate_goal

结构族: pl_anchor_boundary_rewrite_second_action
变体: push_driver_old_l_becomes_push_site
变化变量: P 侧 push 将水平 P/L anchor 连续右移两格，旧 L 半格释放并落入新 push side
对照: push_second_shift_wall_blocks_rewrite

问题: P 侧连续推动锚点后，旧 L 半格能否成为 push 侧站位，继续把下方箱子推入目标？
动作序列: right right down
反事实禁用: 无
预算: exploreDepth=18, returnDepth=28, maxStates=30000, maxTransitions=120000

layout:
```text
########
#......#
#@PL...#
#..C...#
#..G...#
########
```

初始状态:
```text
########
#......#
#@PL...#
#..C...#
#..G...#
########
```

动作回放:
- 1. right: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#......#
#.@PL..#
#..C...#
#..G...#
########
```
- 2. right: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#......#
#..@PL.#
#..C...#
#..G...#
########
```
- 3. down: legal; events=push_object:crate#1; eventWin=no
```text
########
#......#
#...PL.#
#..@...#
#..*...#
########
```

最终状态:
```text
########
#......#
#...PL.#
#..@...#
#..*...#
########
```
变化格: (1,2) @->.; (2,2) P->.; (3,2) L->.; (4,2) .->P; (5,2) .->L; (3,3) C->@; (3,4) G->*

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:3,4\|M:\|PL:P:4,2;L:5,2\|BS:none |
| down | no | - | force_blocked |
| left | yes | walk | Ply:2,3\|C:3,4\|M:\|PL:P:4,2;L:5,2\|BS:none |
| right | yes | walk | Ply:4,3\|C:3,4\|M:\|PL:P:4,2;L:5,2\|BS:none |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=3866, transitions=10560, winStates=31, maxDepth=18
事件类型: anchor_boundary_shift:push_pull=453, force_chain:n2=30, pull_object:crate#1=91, pull_object:push_pull_anchor=182, push_object:crate#1=309, push_object:push_pull_anchor=263, walk=9715

## push_second_shift_wall_blocks_rewrite

结构族: pl_anchor_boundary_rewrite_second_action
变体: push_driver_second_shift_wall_blocked
变化变量: L 端第二停位改成墙，第二次 anchor shift 被拒绝
对照: push_two_shift_old_l_push_crate_goal

问题: 如果墙阻止第二次移动，旧 L 半格是否无法释放为后续 push 站位？
动作序列: right right down
反事实禁用: 无
预算: exploreDepth=18, returnDepth=28, maxStates=30000, maxTransitions=120000

layout:
```text
########
#......#
#@PL.#.#
#..C...#
#..G...#
########
```

初始状态:
```text
########
#......#
#@PL.#.#
#..C...#
#..G...#
########
```

动作回放:
- 1. right: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#......#
#.@PL#.#
#..C...#
#..G...#
########
```
- 2. right: illegal (force_blocked); events=-; eventWin=no
```text
########
#......#
#.@PL#.#
#..C...#
#..G...#
########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
########
#......#
#.@PL#.#
#..C...#
#..G...#
########
```
变化格: (1,2) @->.; (2,2) P->@; (3,2) L->P; (4,2) .->L

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,1\|C:3,3\|M:\|PL:P:3,2;L:4,2\|BS:none |
| down | yes | walk | Ply:2,3\|C:3,3\|M:\|PL:P:3,2;L:4,2\|BS:none |
| left | yes | walk | Ply:1,2\|C:3,3\|M:\|PL:P:3,2;L:4,2\|BS:none |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=1232, transitions=3092, winStates=14, maxDepth=18
事件类型: anchor_boundary_shift:push_pull=88, force_chain:n2=9, pull_object:crate#1=37, pull_object:push_pull_anchor=26, push_object:crate#1=84, push_object:push_pull_anchor=60, walk=2885

## pull_two_shift_old_l_push_crate_goal

结构族: pl_anchor_boundary_rewrite_second_action
变体: pull_driver_old_l_becomes_push_site
变化变量: L 侧 pull 将水平 P/L anchor 连续右移两格，玩家绕行到旧 L 半格并使用新 push side
对照: pull_second_shift_front_wall_blocks_rewrite

问题: L 侧连续拉动锚点后，玩家能否绕到旧 L 半格，用被重写出的 push 侧把下方箱子推入目标？
动作序列: right right up left left left down down
反事实禁用: 无
预算: exploreDepth=18, returnDepth=28, maxStates=30000, maxTransitions=120000

layout:
```text
#########
#.......#
#..PL@..#
#...C...#
#...G...#
#########
```

初始状态:
```text
#########
#.......#
#..PL@..#
#...C...#
#...G...#
#########
```

动作回放:
- 1. right: legal; events=pull_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#########
#.......#
#...PL@.#
#...C...#
#...G...#
#########
```
- 2. right: legal; events=pull_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#########
#.......#
#....PL@#
#...C...#
#...G...#
#########
```
- 3. up: legal; events=walk; eventWin=no
```text
#########
#......@#
#....PL.#
#...C...#
#...G...#
#########
```
- 4. left: legal; events=walk; eventWin=no
```text
#########
#.....@.#
#....PL.#
#...C...#
#...G...#
#########
```
- 5. left: legal; events=walk; eventWin=no
```text
#########
#....@..#
#....PL.#
#...C...#
#...G...#
#########
```
- 6. left: legal; events=walk; eventWin=no
```text
#########
#...@...#
#....PL.#
#...C...#
#...G...#
#########
```
- 7. down: legal; events=walk; eventWin=no
```text
#########
#.......#
#...@PL.#
#...C...#
#...G...#
#########
```
- 8. down: legal; events=push_object:crate#1; eventWin=no
```text
#########
#.......#
#....PL.#
#...@...#
#...*...#
#########
```

最终状态:
```text
#########
#.......#
#....PL.#
#...@...#
#...*...#
#########
```
变化格: (3,2) P->.; (4,2) L->.; (5,2) @->P; (6,2) .->L; (4,3) C->@; (4,4) G->*

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,2\|C:4,4\|M:\|PL:P:5,2;L:6,2\|BS:none |
| down | no | - | force_blocked |
| left | yes | walk | Ply:3,3\|C:4,4\|M:\|PL:P:5,2;L:6,2\|BS:none |
| right | yes | walk | Ply:5,3\|C:4,4\|M:\|PL:P:5,2;L:6,2\|BS:none |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=4811, transitions=12926, winStates=32, maxDepth=18
事件类型: anchor_boundary_shift:push_pull=492, force_chain:n2=32, pull_object:crate#1=84, pull_object:push_pull_anchor=185, push_object:crate#1=382, push_object:push_pull_anchor=298, walk=11977

## pull_second_shift_front_wall_blocks_rewrite

结构族: pl_anchor_boundary_rewrite_second_action
变体: pull_driver_second_shift_front_wall_blocked
变化变量: 第二次 pull 的玩家前格改成墙，anchor 不能继续右移，旧 L 半格不释放
对照: pull_two_shift_old_l_push_crate_goal

问题: 如果玩家前格墙阻止第二次 pull，边界重写后的旧 L push 站位是否不成立？
动作序列: right right up left left left down down
反事实禁用: 无
预算: exploreDepth=18, returnDepth=28, maxStates=30000, maxTransitions=120000

layout:
```text
#########
#.......#
#..PL@.##
#...C...#
#...G...#
#########
```

初始状态:
```text
#########
#.......#
#..PL@.##
#...C...#
#...G...#
#########
```

动作回放:
- 1. right: legal; events=pull_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
#########
#.......#
#...PL@##
#...C...#
#...G...#
#########
```
- 2. right: illegal (destination_blocked); events=-; eventWin=no
```text
#########
#.......#
#...PL@##
#...C...#
#...G...#
#########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#########
#.......#
#...PL@##
#...C...#
#...G...#
#########
```
变化格: (3,2) P->.; (4,2) L->P; (5,2) @->L; (6,2) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:6,1\|C:4,3\|M:\|PL:P:4,2;L:5,2\|BS:none |
| down | yes | walk | Ply:6,3\|C:4,3\|M:\|PL:P:4,2;L:5,2\|BS:none |
| left | no | - | pull_world_front_blocked |
| right | no | - | destination_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=2215, transitions=5246, winStates=20, maxDepth=18
事件类型: anchor_boundary_shift:push_pull=206, force_chain:n2=23, pull_object:crate#1=56, pull_object:push_pull_anchor=77, push_object:crate#1=152, push_object:push_pull_anchor=123, walk=4838

## push_one_shift_only_walks_not_consume

结构族: pl_anchor_boundary_rewrite_second_action
变体: one_shift_no_old_l_site
变化变量: 只推动一次 P/L anchor，玩家还没站到旧 L 半格
对照: push_two_shift_old_l_push_crate_goal

问题: 只移动一次锚点时，后续 down 是否只是普通走路/错位，而非旧 L 半格上的 crate push consumer？
动作序列: right down
反事实禁用: 无
预算: exploreDepth=18, returnDepth=28, maxStates=30000, maxTransitions=120000

layout:
```text
########
#......#
#@PL...#
#..C...#
#..G...#
########
```

初始状态:
```text
########
#......#
#@PL...#
#..C...#
#..G...#
########
```

动作回放:
- 1. right: legal; events=push_object:push_pull_anchor,anchor_boundary_shift:push_pull; eventWin=no
```text
########
#......#
#.@PL..#
#..C...#
#..G...#
########
```
- 2. down: legal; events=walk; eventWin=no
```text
########
#......#
#..PL..#
#.@C...#
#..G...#
########
```

最终状态:
```text
########
#......#
#..PL..#
#.@C...#
#..G...#
########
```
变化格: (1,2) @->.; (2,2) P->.; (3,2) L->P; (4,2) .->L; (2,3) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:2,2\|C:3,3\|M:\|PL:P:3,2;L:4,2\|BS:none |
| down | yes | walk | Ply:2,4\|C:3,3\|M:\|PL:P:3,2;L:4,2\|BS:none |
| left | yes | walk | Ply:1,3\|C:3,3\|M:\|PL:P:3,2;L:4,2\|BS:none |
| right | yes | push_object:crate#1 | Ply:3,3\|C:4,3\|M:\|PL:P:3,2;L:4,2\|BS:none |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=3866, transitions=10560, winStates=31, maxDepth=18
事件类型: anchor_boundary_shift:push_pull=453, force_chain:n2=30, pull_object:crate#1=91, pull_object:push_pull_anchor=182, push_object:crate#1=309, push_object:push_pull_anchor=263, walk=9715

