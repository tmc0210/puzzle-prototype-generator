# 机制局部实验: ra_loop_pl_piston_20260708_01

- 原型: reality_anchor
- 生成时间: 2026-07-08T09:36:37.762Z
- 标题: P/L 边界往复活塞：本体形状与墙口消费
- 备注: 比较单箱、箱链、二格 sticky 横条、L 形 sticky 在同一 P/L 边界 stroke 中的伸出 / 回撤 / 残余债和墙阻碍差异。

## 结构族摘要

### pl_boundary_piston_body_wall
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| c_single_reversible_degenerate | single_crate_degenerate | 活塞本体为单箱；无后续墙齿消费 | cc_chain_pull_splits_debt | yes depth=0 | up, down, left, right | - | complete / 392 states |
| cc_chain_pull_splits_debt | crate_chain_near_end_extract | 活塞本体由 C 改为 CC；push 整链，pull 只抽近端 | c_single_reversible_degenerate | yes depth=14 | up, down, left, right | - | complete / 462 states |
| mm_bar_side_tooth_pass_reversible | sticky_bar_side_tooth_pass | 活塞本体为二格横条；侧齿在横条占格外 | l_shape_side_tooth_blocks_stroke | yes depth=0 | up, down, left, right | - | complete / 180 states |
| l_shape_side_tooth_blocks_stroke | l_shape_side_tooth_block | 横条增加下凸格成为 L 形；同一侧齿落到下凸格目标位 | mm_bar_side_tooth_pass_reversible, l_shape_wide_mouth_reversible | not applicable: replay stopped at illegal action; return search skipped | up, down, left | right:force_blocked | complete / 63 states |
| l_shape_wide_mouth_reversible | l_shape_wide_mouth_pass | 移除侧齿，L 形下凸格有行程余量 | l_shape_side_tooth_blocks_stroke | yes depth=0 | up, down, left, right | - | complete / 148 states |
| mm_bar_head_wall_blocks_stroke | sticky_bar_head_wall_block | 二格横条的前沿目标格加行程墙 | mm_bar_side_tooth_pass_reversible | not applicable: replay stopped at illegal action; return search skipped | up, down, left | right:force_blocked | complete / 50 states |

## c_single_reversible_degenerate

结构族: pl_boundary_piston_body_wall
变体: single_crate_degenerate
变化变量: 活塞本体为单箱；无后续墙齿消费
对照: cc_chain_pull_splits_debt
备注: 单箱 push 跨界后紧接 pull 精确回到初态，作为退化标尺。
动作序列: right left
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=12000, maxTransitions=60000

layout:
```text
#########
#..PL..G#
#.......#
#..@C...#
#.......#
#########
```

初始状态:
```text
#########
#..PL..G#
#.......#
#..@C...#
#.......#
#########
```

动作回放:
- 1. right: legal; events=push_object:crate#1; eventWin=no
```text
#########
#..PL..G#
#.......#
#...@C..#
#.......#
#########
```
- 2. left: legal; events=pull_object:crate#1; eventWin=no
```text
#########
#..PL..G#
#.......#
#..@C...#
#.......#
#########
```

最终状态:
```text
#########
#..PL..G#
#.......#
#..@C...#
#.......#
#########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:4,3\|M:\|PL:P:3,1;L:4,1\|BS:none |
| down | yes | walk | Ply:3,4\|C:4,3\|M:\|PL:P:3,1;L:4,1\|BS:none |
| left | yes | walk | Ply:2,3\|C:4,3\|M:\|PL:P:3,1;L:4,1\|BS:none |
| right | yes | push_object:crate#1 | Ply:4,3\|C:5,3\|M:\|PL:P:3,1;L:4,1\|BS:none |

回到初始: yes, depth=0, path=
局部可达图: status=complete, states=392, transitions=793, winStates=3, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=39, force_chain:n2=7, pull_object:crate#1=22, pull_object:push_pull_anchor=18, push_object:crate#1=18, push_object:push_pull_anchor=21, walk=714

## cc_chain_pull_splits_debt

结构族: pl_boundary_piston_body_wall
变体: crate_chain_near_end_extract
变化变量: 活塞本体由 C 改为 CC；push 整链，pull 只抽近端
对照: c_single_reversible_degenerate
备注: 箱链 push 是整链推进；紧接 pull 只拉回近端箱，远端箱留下残余债。
动作序列: right left
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=12000, maxTransitions=60000

layout:
```text
#########
#..PL..G#
#.......#
#..@CC..#
#.......#
#########
```

初始状态:
```text
#########
#..PL..G#
#.......#
#..@CC..#
#.......#
#########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,force_chain:n2; eventWin=no
```text
#########
#..PL..G#
#.......#
#...@CC.#
#.......#
#########
```
- 2. left: legal; events=pull_object:crate#1; eventWin=no
```text
#########
#..PL..G#
#.......#
#..@C.C.#
#.......#
#########
```

最终状态:
```text
#########
#..PL..G#
#.......#
#..@C.C.#
#.......#
#########
```
变化格: (5,3) C->.; (6,3) .->C

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,2\|C:4,3;6,3\|M:\|PL:P:3,1;L:4,1\|BS:none |
| down | yes | walk | Ply:3,4\|C:4,3;6,3\|M:\|PL:P:3,1;L:4,1\|BS:none |
| left | yes | walk | Ply:2,3\|C:4,3;6,3\|M:\|PL:P:3,1;L:4,1\|BS:none |
| right | yes | push_object:crate#1 | Ply:4,3\|C:5,3;6,3\|M:\|PL:P:3,1;L:4,1\|BS:none |

回到初始: yes, depth=14, path=up right right right up left down left left down right down left up
局部可达图: status=complete, states=462, transitions=885, winStates=4, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=51, force_chain:n2=10, force_chain:n3=1, pull_object:crate#1=16, pull_object:crate#2=14, pull_object:push_pull_anchor=28, push_object:crate#1=25, push_object:crate#2=5, push_object:push_pull_anchor=23, walk=774

## mm_bar_side_tooth_pass_reversible

结构族: pl_boundary_piston_body_wall
变体: sticky_bar_side_tooth_pass
变化变量: 活塞本体为二格横条；侧齿在横条占格外
对照: l_shape_side_tooth_blocks_stroke
备注: 同一侧齿下，横条 right/left 可往复；侧齿没有消费横条。
动作序列: right left
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=12000, maxTransitions=60000

layout:
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#....#..#
#########
```

初始状态:
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#....#..#
#########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
#########
#B#######
#S#PL..G#
#.......#
#...@MM.#
#....#..#
#########
```
- 2. left: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#....#..#
#########
```

最终状态:
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#....#..#
#########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,3\|C:\|M:4,4;5,4\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| down | yes | walk | Ply:3,5\|C:\|M:4,4;5,4\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| left | yes | walk | Ply:2,4\|C:\|M:4,4;5,4\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:4,4\|C:\|M:5,4;6,4\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |

回到初始: yes, depth=0, path=
局部可达图: status=complete, states=180, transitions=349, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=22, force_chain:n2=2, move_sticky_rigid=19, pull_object:push_pull_anchor=11, pull_object:sticky#1=13, push_object:push_pull_anchor=11, push_object:sticky#1=4, walk=310

## l_shape_side_tooth_blocks_stroke

结构族: pl_boundary_piston_body_wall
变体: l_shape_side_tooth_block
变化变量: 横条增加下凸格成为 L 形；同一侧齿落到下凸格目标位
对照: mm_bar_side_tooth_pass_reversible, l_shape_wide_mouth_reversible
备注: L 形下凸格在 push stroke 的目标格撞侧齿，首步被 force_blocked。
动作序列: right
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=12000, maxTransitions=60000

layout:
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#...M#..#
#########
```

初始状态:
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#...M#..#
#########
```

动作回放:
- 1. right: illegal (force_blocked); events=-; eventWin=no
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#...M#..#
#########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#...M#..#
#########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,3\|C:\|M:4,4;5,4;4,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| down | yes | walk | Ply:3,5\|C:\|M:4,4;5,4;4,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| left | yes | walk | Ply:2,4\|C:\|M:4,4;5,4;4,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=63, transitions=119, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=6, force_chain:n2=1, move_sticky_rigid=6, pull_object:push_pull_anchor=6, pull_object:sticky#1=5, walk=108

## l_shape_wide_mouth_reversible

结构族: pl_boundary_piston_body_wall
变体: l_shape_wide_mouth_pass
变化变量: 移除侧齿，L 形下凸格有行程余量
对照: l_shape_side_tooth_blocks_stroke
备注: 同一 L 形在宽一格空间中 right/left 可往复，说明侧齿是消费点。
动作序列: right left
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=12000, maxTransitions=60000

layout:
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#...M...#
#########
```

初始状态:
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#...M...#
#########
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
#########
#B#######
#S#PL..G#
#.......#
#...@MM.#
#....M..#
#########
```
- 2. left: legal; events=pull_object:sticky#1,move_sticky_rigid; eventWin=no
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#...M...#
#########
```

最终状态:
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#...M...#
#########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,3\|C:\|M:4,4;5,4;4,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| down | yes | walk | Ply:3,5\|C:\|M:4,4;5,4;4,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| left | yes | walk | Ply:2,4\|C:\|M:4,4;5,4;4,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:4,4\|C:\|M:5,4;6,4;5,5\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |

回到初始: yes, depth=0, path=
局部可达图: status=complete, states=148, transitions=283, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=18, force_chain:n2=3, move_sticky_rigid=33, pull_object:push_pull_anchor=11, pull_object:sticky#1=25, push_object:push_pull_anchor=5, push_object:sticky#1=7, walk=235

## mm_bar_head_wall_blocks_stroke

结构族: pl_boundary_piston_body_wall
变体: sticky_bar_head_wall_block
变化变量: 二格横条的前沿目标格加行程墙
对照: mm_bar_side_tooth_pass_reversible
备注: 横条右推时前端目标格撞墙，证明可撤回活塞仍需要伸出行程。
动作序列: right
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=12000, maxTransitions=60000

layout:
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM#.#
#.......#
#########
```

初始状态:
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM#.#
#.......#
#########
```

动作回放:
- 1. right: illegal (force_blocked); events=-; eventWin=no
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM#.#
#.......#
#########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#########
#B#######
#S#PL..G#
#.......#
#..@MM#.#
#.......#
#########
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,3\|C:\|M:4,4;5,4\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| down | yes | walk | Ply:3,5\|C:\|M:4,4;5,4\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| left | yes | walk | Ply:2,4\|C:\|M:4,4;5,4\|PL:P:3,2;L:4,2\|BS:B:1,1;S:1,2 |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=50, transitions=93, winStates=0, maxDepth=10
事件类型: anchor_boundary_shift:push_pull=5, move_sticky_rigid=3, pull_object:push_pull_anchor=5, pull_object:sticky#1=3, walk=85

