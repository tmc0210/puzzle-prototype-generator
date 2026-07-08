# 机制局部实验: ra_loop_bind_shape_spectrum_20260707_01

- 原型: reality_anchor
- 生成时间: 2026-07-07T06:47:41.592Z
- 标题: B/S 绑定 footprint 形状谱接同一右推墙口
- 备注: 同一 B/S 绑定线和右侧墙口消费者下，比较单格、2/3 格竖条、L 形、分离部件与开口修正；重点解释为：过 B/S 线后粘成一整块，门口要看整块前面有没有路。

## 结构族摘要

### bs_bind_shape_spectrum_mouth
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| bs_shape_single_cell_lower_lane_pass | single_cell_lower_lane_pass | 只让一个 crate 跨过 B/S 线，输出 footprint 是单格 | bs_shape_two_bar_single_mouth_block, bs_shape_separated_lower_shortcut_pass | yes depth=10 | up, down, left, right | - | complete / 813 states |
| bs_shape_two_bar_single_mouth_block | connected_two_cell_vertical_bar_single_mouth | 两个相邻 crate 先后跨线，粘成 2 格竖条；上格前方是墙，下格前方是目标口 | bs_shape_single_cell_lower_lane_pass, bs_shape_two_bar_two_mouth_pass, bs_shape_separated_lower_shortcut_pass | not applicable: replay stopped at illegal action; return search skipped | up, down, left | right:force_blocked | complete / 4891 states |
| bs_shape_two_bar_two_mouth_pass | connected_two_cell_vertical_bar_two_mouth | 保持 2 格竖条输出，只把上格前方墙改成第二个目标口 | bs_shape_two_bar_single_mouth_block, bs_shape_three_bar_two_mouth_block | yes depth=11 | up, down, left, right | - | complete / 10442 states |
| bs_shape_three_bar_two_mouth_block | connected_three_cell_vertical_bar_two_mouth | 把 connected footprint 从 2 格竖条加高到 3 格竖条，但右侧口只给下两格 | bs_shape_two_bar_two_mouth_pass, bs_shape_three_bar_three_mouth_pass | not applicable: replay stopped at illegal action; return search skipped | up, down, left | right:force_blocked | complete / 10481 states |
| bs_shape_three_bar_three_mouth_pass | connected_three_cell_vertical_bar_three_mouth | 保持 3 格竖条输出，把最上格前方也打开成目标口 | bs_shape_three_bar_two_mouth_block, bs_shape_two_bar_two_mouth_pass | yes depth=12 | up, down, left, right | - | exhausted / 20001 states |
| bs_shape_l_notch_block | connected_l_shape_missing_front_notch | 用上排双箱链和下排单箱粘成 L 形；下排前方有口，上排前凸角前方是墙 | bs_shape_l_notch_pass, bs_shape_two_bar_single_mouth_block | not applicable: replay stopped at illegal action; return search skipped | up, down, left | right:force_blocked | complete / 17060 states |
| bs_shape_l_notch_pass | connected_l_shape_front_notch_open | 保持同一 L 形生成动作，只把上排前凸角前方墙改成目标口 | bs_shape_l_notch_block, bs_shape_three_bar_three_mouth_pass | yes depth=14 | up, down, left, right | - | exhausted / 20001 states |
| bs_shape_separated_lower_shortcut_pass | separated_parts_lower_lane_shortcut | 两个 crate 隔一行跨线，保持两个 sticky 部件；只推动下方部件进一格口 | bs_shape_two_bar_single_mouth_block, bs_shape_three_bar_two_mouth_block, bs_shape_single_cell_lower_lane_pass | unknown exhausted: depth budget exceeded | up, down, left, right | - | complete / 1830 states |

## bs_shape_single_cell_lower_lane_pass: 单格基线，下行一格口可通过

结构族: bs_bind_shape_spectrum_mouth
变体: single_cell_lower_lane_pass
变化变量: 只让一个 crate 跨过 B/S 线，输出 footprint 是单格
对照: bs_shape_two_bar_single_mouth_block, bs_shape_separated_lower_shortcut_pass

问题: 同一右推墙口里，单格 sticky 是否能沿下行一格口覆盖目标，作为后续 connected footprint 的基线？
动作序列: right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
###########
####BS#####
#.........#
#.....#...#
#..@C.G...#
#.........#
###########
```

初始状态:
```text
###########
####BS#####
#.........#
#.....#...#
#..@C.G...#
#.........#
###########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,box_to_sticky:n1; eventWin=no
```text
###########
####BS#####
#.........#
#.....#...#
#...@MG...#
#.........#
###########
```
- 2. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
####BS#####
#.........#
#.....#...#
#....@m...#
#.........#
###########
```

最终状态:
```text
###########
####BS#####
#.........#
#.....#...#
#....@m...#
#.........#
###########
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
局部可达图: status=complete, states=813, transitions=2344, winStates=1, maxDepth=14
事件类型: box_to_sticky:n1=4, move_sticky_rigid=19, push_object:crate#1=40, push_object:sticky#1=19, sticky_to_box:n1=3, walk=2285

## bs_shape_two_bar_single_mouth_block: 2 格竖条，一格下口被整块前沿拒绝

结构族: bs_bind_shape_spectrum_mouth
变体: connected_two_cell_vertical_bar_single_mouth
变化变量: 两个相邻 crate 先后跨线，粘成 2 格竖条；上格前方是墙，下格前方是目标口
对照: bs_shape_single_cell_lower_lane_pass, bs_shape_two_bar_two_mouth_pass, bs_shape_separated_lower_shortcut_pass

问题: 2 格竖条向右推时，是否因为整块上格前方无路而不能只让下格进目标口？
动作序列: right left down right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
###########
####BS#####
#.........#
#..@C.#...#
#...C.G...#
#.........#
###########
```

初始状态:
```text
###########
####BS#####
#.........#
#..@C.#...#
#...C.G...#
#.........#
###########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,box_to_sticky:n1; eventWin=no
```text
###########
####BS#####
#.........#
#...@M#...#
#...C.G...#
#.........#
###########
```
- 2. left: legal; events=walk; eventWin=no
```text
###########
####BS#####
#.........#
#..@.M#...#
#...C.G...#
#.........#
###########
```
- 3. down: legal; events=walk; eventWin=no
```text
###########
####BS#####
#.........#
#....M#...#
#..@C.G...#
#.........#
###########
```
- 4. right: legal; events=push_object:crate#1,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
###########
####BS#####
#.........#
#....M#...#
#...@MG...#
#.........#
###########
```
- 5. right: illegal (force_blocked); events=-; eventWin=no
```text
###########
####BS#####
#.........#
#....M#...#
#...@MG...#
#.........#
###########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
###########
####BS#####
#.........#
#....M#...#
#...@MG...#
#.........#
###########
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
局部可达图: status=complete, states=4891, transitions=11993, winStates=19, maxDepth=14
事件类型: box_to_sticky:n1=75, force_chain:n2=21, move_sticky_rigid=240, push_object:crate#1=370, push_object:crate#2=172, push_object:sticky#1=207, push_object:sticky#2=30, sticky_merge:n1=14, sticky_to_box:n1=26, sticky_to_box:n2=2, walk=11214

## bs_shape_two_bar_two_mouth_pass: 2 格竖条，打开两格口后整体通过

结构族: bs_bind_shape_spectrum_mouth
变体: connected_two_cell_vertical_bar_two_mouth
变化变量: 保持 2 格竖条输出，只把上格前方墙改成第二个目标口
对照: bs_shape_two_bar_single_mouth_block, bs_shape_three_bar_two_mouth_block

问题: 同一个 2 格 connected footprint 在前沿两格都有路时，是否能整体进入墙口？
动作序列: right left down right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
###########
####BS#####
#.........#
#..@C.G...#
#...C.G...#
#.........#
###########
```

初始状态:
```text
###########
####BS#####
#.........#
#..@C.G...#
#...C.G...#
#.........#
###########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,box_to_sticky:n1; eventWin=no
```text
###########
####BS#####
#.........#
#...@MG...#
#...C.G...#
#.........#
###########
```
- 2. left: legal; events=walk; eventWin=no
```text
###########
####BS#####
#.........#
#..@.MG...#
#...C.G...#
#.........#
###########
```
- 3. down: legal; events=walk; eventWin=no
```text
###########
####BS#####
#.........#
#....MG...#
#..@C.G...#
#.........#
###########
```
- 4. right: legal; events=push_object:crate#1,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
###########
####BS#####
#.........#
#....MG...#
#...@MG...#
#.........#
###########
```
- 5. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
####BS#####
#.........#
#.....m...#
#....@m...#
#.........#
###########
```

最终状态:
```text
###########
####BS#####
#.........#
#.....m...#
#....@m...#
#.........#
###########
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
局部可达图: status=complete, states=10442, transitions=27510, winStates=2, maxDepth=14
事件类型: box_to_sticky:n1=111, force_chain:n2=26, move_sticky_rigid=853, push_object:crate#1=699, push_object:crate#2=185, push_object:sticky#1=732, push_object:sticky#2=117, sticky_merge:n1=45, sticky_to_box:n1=77, sticky_to_box:n2=6, walk=25777

## bs_shape_three_bar_two_mouth_block: 3 格竖条，两格口仍不够

结构族: bs_bind_shape_spectrum_mouth
变体: connected_three_cell_vertical_bar_two_mouth
变化变量: 把 connected footprint 从 2 格竖条加高到 3 格竖条，但右侧口只给下两格
对照: bs_shape_two_bar_two_mouth_pass, bs_shape_three_bar_three_mouth_pass

问题: 3 格竖条面对只够 2 格的口时，是否被最上格前方的墙拒绝？
动作序列: right left down right left down right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
###########
####BS#####
#..@C.#...#
#...C.G...#
#...C.G...#
#.........#
###########
```

初始状态:
```text
###########
####BS#####
#..@C.#...#
#...C.G...#
#...C.G...#
#.........#
###########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,box_to_sticky:n1; eventWin=no
```text
###########
####BS#####
#...@M#...#
#...C.G...#
#...C.G...#
#.........#
###########
```
- 2. left: legal; events=walk; eventWin=no
```text
###########
####BS#####
#..@.M#...#
#...C.G...#
#...C.G...#
#.........#
###########
```
- 3. down: legal; events=walk; eventWin=no
```text
###########
####BS#####
#....M#...#
#..@C.G...#
#...C.G...#
#.........#
###########
```
- 4. right: legal; events=push_object:crate#1,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
###########
####BS#####
#....M#...#
#...@MG...#
#...C.G...#
#.........#
###########
```
- 5. left: legal; events=walk; eventWin=no
```text
###########
####BS#####
#....M#...#
#..@.MG...#
#...C.G...#
#.........#
###########
```
- 6. down: legal; events=walk; eventWin=no
```text
###########
####BS#####
#....M#...#
#....MG...#
#..@C.G...#
#.........#
###########
```
- 7. right: legal; events=push_object:crate#1,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
###########
####BS#####
#....M#...#
#....MG...#
#...@MG...#
#.........#
###########
```
- 8. right: illegal (force_blocked); events=-; eventWin=no
```text
###########
####BS#####
#....M#...#
#....MG...#
#...@MG...#
#.........#
###########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
###########
####BS#####
#....M#...#
#....MG...#
#...@MG...#
#.........#
###########
```
变化格: (3,2) @->.; (4,2) C->.; (5,2) .->M; (4,3) C->.; (5,3) .->M; (4,4) C->@; (5,4) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,3\|C:\|M:5,2;5,3;5,4\|PL:none\|BS:B:4,1;S:5,1 |
| down | yes | walk | Ply:4,5\|C:\|M:5,2;5,3;5,4\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | walk | Ply:3,4\|C:\|M:5,2;5,3;5,4\|PL:none\|BS:B:4,1;S:5,1 |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=10481, transitions=23567, winStates=8, maxDepth=14
事件类型: box_to_sticky:n1=209, force_chain:n2=37, move_sticky_rigid=713, push_object:crate#1=554, push_object:crate#2=557, push_object:crate#3=66, push_object:sticky#1=423, push_object:sticky#2=282, push_object:sticky#3=5, sticky_merge:n1=91, sticky_to_box:n1=46, sticky_to_box:n2=11, sticky_to_box:n3=2, walk=21680

## bs_shape_three_bar_three_mouth_pass: 3 格竖条，三格口修正后整体通过

结构族: bs_bind_shape_spectrum_mouth
变体: connected_three_cell_vertical_bar_three_mouth
变化变量: 保持 3 格竖条输出，把最上格前方也打开成目标口
对照: bs_shape_three_bar_two_mouth_block, bs_shape_two_bar_two_mouth_pass

问题: 把口宽加到覆盖 3 格 footprint 前沿后，3 格竖条是否从同一消费者处变为可通过？
动作序列: right left down right left down right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
###########
####BS#####
#..@C.G...#
#...C.G...#
#...C.G...#
#.........#
###########
```

初始状态:
```text
###########
####BS#####
#..@C.G...#
#...C.G...#
#...C.G...#
#.........#
###########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,box_to_sticky:n1; eventWin=no
```text
###########
####BS#####
#...@MG...#
#...C.G...#
#...C.G...#
#.........#
###########
```
- 2. left: legal; events=walk; eventWin=no
```text
###########
####BS#####
#..@.MG...#
#...C.G...#
#...C.G...#
#.........#
###########
```
- 3. down: legal; events=walk; eventWin=no
```text
###########
####BS#####
#....MG...#
#..@C.G...#
#...C.G...#
#.........#
###########
```
- 4. right: legal; events=push_object:crate#1,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
###########
####BS#####
#....MG...#
#...@MG...#
#...C.G...#
#.........#
###########
```
- 5. left: legal; events=walk; eventWin=no
```text
###########
####BS#####
#....MG...#
#..@.MG...#
#...C.G...#
#.........#
###########
```
- 6. down: legal; events=walk; eventWin=no
```text
###########
####BS#####
#....MG...#
#....MG...#
#..@C.G...#
#.........#
###########
```
- 7. right: legal; events=push_object:crate#1,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
###########
####BS#####
#....MG...#
#....MG...#
#...@MG...#
#.........#
###########
```
- 8. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
####BS#####
#.....m...#
#.....m...#
#....@m...#
#.........#
###########
```

最终状态:
```text
###########
####BS#####
#.....m...#
#.....m...#
#....@m...#
#.........#
###########
```
变化格: (3,2) @->.; (4,2) C->.; (6,2) G->m; (4,3) C->.; (6,3) G->m; (4,4) C->.; (5,4) .->@; (6,4) G->m

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,3\|C:\|M:6,2;6,3;6,4\|PL:none\|BS:B:4,1;S:5,1 |
| down | yes | walk | Ply:5,5\|C:\|M:6,2;6,3;6,4\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | walk | Ply:4,4\|C:\|M:6,2;6,3;6,4\|PL:none\|BS:B:4,1;S:5,1 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:6,4\|C:\|M:7,2;7,3;7,4\|PL:none\|BS:B:4,1;S:5,1 |

回到初始: yes, depth=12, path=down right right up left left down left left up up up
局部可达图: status=exhausted, states=20001, transitions=45083, winStates=3, maxDepth=14
可达图停止原因: state budget exceeded
事件类型: box_to_sticky:n1=392, force_chain:n2=131, force_chain:n3=1, move_sticky_rigid=1892, push_object:crate#1=1198, push_object:crate#2=952, push_object:crate#3=105, push_object:sticky#1=1355, push_object:sticky#2=504, push_object:sticky#3=7, sticky_merge:n1=239, sticky_to_box:n1=171, sticky_to_box:n2=22, sticky_to_box:n3=3, walk=40962

## bs_shape_l_notch_block: L 形黏块，缺少前凸角口被拒绝

结构族: bs_bind_shape_spectrum_mouth
变体: connected_l_shape_missing_front_notch
变化变量: 用上排双箱链和下排单箱粘成 L 形；下排前方有口，上排前凸角前方是墙
对照: bs_shape_l_notch_pass, bs_shape_two_bar_single_mouth_block

问题: L 形向右推时，是否要求上排前凸角和下排前沿同时有路，而不是只看被玩家推的下格？
动作序列: right right left down right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
###########
####BS#####
#.........#
#.@CC..#..#
#...C.G...#
#.........#
###########
```

初始状态:
```text
###########
####BS#####
#.........#
#.@CC..#..#
#...C.G...#
#.........#
###########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,force_chain:n2,box_to_sticky:n1; eventWin=no
```text
###########
####BS#####
#.........#
#..@CM.#..#
#...C.G...#
#.........#
###########
```
- 2. right: legal; events=push_object:crate#1,force_chain:n2,move_sticky_rigid,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
###########
####BS#####
#.........#
#...@MM#..#
#...C.G...#
#.........#
###########
```
- 3. left: legal; events=walk; eventWin=no
```text
###########
####BS#####
#.........#
#..@.MM#..#
#...C.G...#
#.........#
###########
```
- 4. down: legal; events=walk; eventWin=no
```text
###########
####BS#####
#.........#
#....MM#..#
#..@C.G...#
#.........#
###########
```
- 5. right: legal; events=push_object:crate#1,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
###########
####BS#####
#.........#
#....MM#..#
#...@MG...#
#.........#
###########
```
- 6. right: illegal (force_blocked); events=-; eventWin=no
```text
###########
####BS#####
#.........#
#....MM#..#
#...@MG...#
#.........#
###########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
###########
####BS#####
#.........#
#....MM#..#
#...@MG...#
#.........#
###########
```
变化格: (2,3) @->.; (3,3) C->.; (4,3) C->.; (5,3) .->M; (6,3) .->M; (4,4) C->@; (5,4) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,3\|C:\|M:5,3;6,3;5,4\|PL:none\|BS:B:4,1;S:5,1 |
| down | yes | walk | Ply:4,5\|C:\|M:5,3;6,3;5,4\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | walk | Ply:3,4\|C:\|M:5,3;6,3;5,4\|PL:none\|BS:B:4,1;S:5,1 |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=17060, transitions=36679, winStates=202, maxDepth=14
事件类型: box_to_sticky:n1=400, force_chain:n2=259, force_chain:n3=9, move_sticky_rigid=1243, push_object:crate#1=1216, push_object:crate#2=1077, push_object:crate#3=309, push_object:sticky#1=1044, push_object:sticky#2=147, sticky_merge:n1=179, sticky_to_box:n1=172, sticky_to_box:n2=34, sticky_to_box:n3=1, walk=32886

## bs_shape_l_notch_pass: L 形黏块，补上前凸角缺口后通过

结构族: bs_bind_shape_spectrum_mouth
变体: connected_l_shape_front_notch_open
变化变量: 保持同一 L 形生成动作，只把上排前凸角前方墙改成目标口
对照: bs_shape_l_notch_block, bs_shape_three_bar_three_mouth_pass

问题: 补上 L 形前凸角所需的那一格口后，同一 L 形是否能整体进入消费者？
动作序列: right right left down right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
###########
####BS#####
#.........#
#.@CC..G..#
#...C.G...#
#.........#
###########
```

初始状态:
```text
###########
####BS#####
#.........#
#.@CC..G..#
#...C.G...#
#.........#
###########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,force_chain:n2,box_to_sticky:n1; eventWin=no
```text
###########
####BS#####
#.........#
#..@CM.G..#
#...C.G...#
#.........#
###########
```
- 2. right: legal; events=push_object:crate#1,force_chain:n2,move_sticky_rigid,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
###########
####BS#####
#.........#
#...@MMG..#
#...C.G...#
#.........#
###########
```
- 3. left: legal; events=walk; eventWin=no
```text
###########
####BS#####
#.........#
#..@.MMG..#
#...C.G...#
#.........#
###########
```
- 4. down: legal; events=walk; eventWin=no
```text
###########
####BS#####
#.........#
#....MMG..#
#..@C.G...#
#.........#
###########
```
- 5. right: legal; events=push_object:crate#1,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
###########
####BS#####
#.........#
#....MMG..#
#...@MG...#
#.........#
###########
```
- 6. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
###########
####BS#####
#.........#
#.....Mm..#
#....@m...#
#.........#
###########
```

最终状态:
```text
###########
####BS#####
#.........#
#.....Mm..#
#....@m...#
#.........#
###########
```
变化格: (2,3) @->.; (3,3) C->.; (4,3) C->.; (6,3) .->M; (7,3) G->m; (4,4) C->.; (5,4) .->@; (6,4) G->m

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,3\|C:\|M:6,3;7,3;6,4\|PL:none\|BS:B:4,1;S:5,1 |
| down | yes | walk | Ply:5,5\|C:\|M:6,3;7,3;6,4\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | walk | Ply:4,4\|C:\|M:6,3;7,3;6,4\|PL:none\|BS:B:4,1;S:5,1 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:6,4\|C:\|M:7,3;8,3;7,4\|PL:none\|BS:B:4,1;S:5,1 |

回到初始: yes, depth=14, path=up up right right right down left left left up left left left down
局部可达图: status=exhausted, states=20001, transitions=42479, winStates=9, maxDepth=13
可达图停止原因: state budget exceeded
事件类型: box_to_sticky:n1=360, force_chain:n2=247, force_chain:n3=6, move_sticky_rigid=1826, push_object:crate#1=1249, push_object:crate#2=996, push_object:crate#3=203, push_object:sticky#1=1661, push_object:sticky#2=125, sticky_merge:n1=162, sticky_to_box:n1=140, sticky_to_box:n2=24, walk=38245

## bs_shape_separated_lower_shortcut_pass: 分离部件不合并，下格绕过同一窄口

结构族: bs_bind_shape_spectrum_mouth
变体: separated_parts_lower_lane_shortcut
变化变量: 两个 crate 隔一行跨线，保持两个 sticky 部件；只推动下方部件进一格口
对照: bs_shape_two_bar_single_mouth_block, bs_shape_three_bar_two_mouth_block, bs_shape_single_cell_lower_lane_pass

问题: 如果上方 sticky 与下方 sticky 不正交相连，下方部件是否能作为单独 footprint 穿过同一窄口？
动作序列: right left down down right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
###########
####BS#####
#..@C.#...#
#.....#...#
#...C.G...#
#.........#
###########
```

初始状态:
```text
###########
####BS#####
#..@C.#...#
#.....#...#
#...C.G...#
#.........#
###########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,box_to_sticky:n1; eventWin=no
```text
###########
####BS#####
#...@M#...#
#.....#...#
#...C.G...#
#.........#
###########
```
- 2. left: legal; events=walk; eventWin=no
```text
###########
####BS#####
#..@.M#...#
#.....#...#
#...C.G...#
#.........#
###########
```
- 3. down: legal; events=walk; eventWin=no
```text
###########
####BS#####
#....M#...#
#..@..#...#
#...C.G...#
#.........#
###########
```
- 4. down: legal; events=walk; eventWin=no
```text
###########
####BS#####
#....M#...#
#.....#...#
#..@C.G...#
#.........#
###########
```
- 5. right: legal; events=push_object:crate#1,box_to_sticky:n1; eventWin=no
```text
###########
####BS#####
#....M#...#
#.....#...#
#...@MG...#
#.........#
###########
```
- 6. right: legal; events=push_object:sticky#2,move_sticky_rigid; eventWin=no
```text
###########
####BS#####
#....M#...#
#.....#...#
#....@m...#
#.........#
###########
```

最终状态:
```text
###########
####BS#####
#....M#...#
#.....#...#
#....@m...#
#.........#
###########
```
变化格: (3,2) @->.; (4,2) C->.; (5,2) .->M; (4,4) C->.; (5,4) .->@; (6,4) G->m

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,3\|C:\|M:5,2\|6,4\|PL:none\|BS:B:4,1;S:5,1 |
| down | yes | walk | Ply:5,5\|C:\|M:5,2\|6,4\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | walk | Ply:4,4\|C:\|M:5,2\|6,4\|PL:none\|BS:B:4,1;S:5,1 |
| right | yes | push_object:sticky#2,move_sticky_rigid | Ply:6,4\|C:\|M:5,2\|7,4\|PL:none\|BS:B:4,1;S:5,1 |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=1830, transitions=4836, winStates=5, maxDepth=14
事件类型: box_to_sticky:n1=33, force_chain:n2=3, move_sticky_rigid=45, push_object:crate#1=104, push_object:crate#2=89, push_object:sticky#1=33, push_object:sticky#2=12, sticky_merge:n1=3, sticky_to_box:n1=7, walk=4598

