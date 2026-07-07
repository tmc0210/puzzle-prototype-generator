# 机制局部实验: ra_struct_sticky_split_pocket_01

- 原型: reality_anchor
- 生成时间: 2026-07-07T05:34:05.455Z
- 标题: C 形 sticky 被固定 B/S 边界切断后由上端点目标袋消费
- 备注: Reality Anchor 的 explorer run。本轮范围只看 C 形 sticky 刚体跨过固定 B/S 边界后是否被切成独立端点，并由上方单格目标袋消费；不进入关卡设计，不读取历史设计归档、候选包、报告、采样配置或旧实验 run 材料。

## 结构族摘要

### sticky_split_endpoint_pocket_consumption
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| split_cshape_upper_pocket_pass | boundary_cuts_cshape_into_two_endpoints | 固定 B/S 边界切过 C 形刚体的左柱，推后左柱变 crate，右侧上下端点分裂为两个 sticky 组件 | unsplit_cshape_upper_pocket_block, split_cshape_no_stand_block, pre_split_endpoints_upper_pocket_pass | unknown exhausted: depth budget exceeded | down, right | up:force_blocked, left:force_blocked | complete / 427 states |
| unsplit_cshape_upper_pocket_block | cshape_stays_rigid | B/S 边界更靠左，推后 C 形仍整体在 sticky side，保持一个刚体 footprint | split_cshape_upper_pocket_pass | not applicable: replay stopped at illegal action; return search skipped | right | up:force_blocked_by_player, down:force_blocked_by_player, left:force_blocked | complete / 134 states |
| split_cshape_no_stand_block | split_endpoint_but_stand_cell_closed | 保留边界切断输出，但把绕到上端点下方的通路封成墙 | split_cshape_upper_pocket_pass | not applicable: replay stopped at illegal action; return search skipped | up, right | down:destination_blocked, left:force_blocked | complete / 188 states |
| pre_split_endpoints_upper_pocket_pass | already_separate_endpoints | 右侧上下端点一开始就不正交相邻，边界不需要切断桥格 | split_cshape_upper_pocket_pass, unsplit_cshape_upper_pocket_block | unknown exhausted: depth budget exceeded | down, right | up:force_blocked, left:force_blocked | complete / 841 states |

## split_cshape_upper_pocket_pass

结构族: sticky_split_endpoint_pocket_consumption
变体: boundary_cuts_cshape_into_two_endpoints
变化变量: 固定 B/S 边界切过 C 形刚体的左柱，推后左柱变 crate，右侧上下端点分裂为两个 sticky 组件
对照: unsplit_cshape_upper_pocket_block, split_cshape_no_stand_block, pre_split_endpoints_upper_pocket_pass

问题: C 形刚体被切成独立上端点后，玩家是否能只把上端点推入上方目标袋？
动作序列: left down left up
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=20000, maxTransitions=80000

layout:
```text
########
###.G..#
###.MM@#
#...M..#
#...MM.#
#..BS..#
########
```

初始状态:
```text
########
###.G..#
###.MM@#
#...M..#
#...MM.#
#..BS..#
########
```

动作回放:
- 1. left: legal; events=push_object:sticky#1,move_sticky_rigid,sticky_to_box:n3,sticky_split:n1; eventWin=no
```text
########
###.G..#
###CM@.#
#..C...#
#..CM..#
#..BS..#
########
```
- 2. down: legal; events=walk; eventWin=no
```text
########
###.G..#
###CM..#
#..C.@.#
#..CM..#
#..BS..#
########
```
- 3. left: legal; events=walk; eventWin=no
```text
########
###.G..#
###CM..#
#..C@..#
#..CM..#
#..BS..#
########
```
- 4. up: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
########
###.m..#
###C@..#
#..C...#
#..CM..#
#..BS..#
########
```

最终状态:
```text
########
###.m..#
###C@..#
#..C...#
#..CM..#
#..BS..#
########
```
变化格: (4,1) G->m; (3,2) .->C; (4,2) M->@; (5,2) M->.; (6,2) @->.; (3,3) .->C; (4,3) M->.; (3,4) .->C; (5,4) M->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | force_blocked |
| down | yes | walk | Ply:4,3\|C:3,2;3,3;3,4\|M:4,1\|4,4\|PL:none\|BS:B:3,5;S:4,5 |
| left | no | - | force_blocked |
| right | yes | walk | Ply:5,2\|C:3,2;3,3;3,4\|M:4,1\|4,4\|PL:none\|BS:B:3,5;S:4,5 |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=427, transitions=762, winStates=24, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=17, box_to_sticky:n1=7, box_to_sticky:n2=2, box_to_sticky:n3=3, force_chain:n2=15, force_chain:n3=2, move_sticky_rigid=69, push_object:box_sticky_anchor=17, push_object:crate#1=7, push_object:crate#2=10, push_object:crate#3=9, push_object:crate#4=6, push_object:crate#5=3, push_object:sticky#1=52, push_object:sticky#2=15, sticky_merge:n1=11, sticky_merge:n2=1, sticky_split:n1=4, sticky_to_box:n1=7, sticky_to_box:n2=5, sticky_to_box:n3=4, walk=643

## unsplit_cshape_upper_pocket_block

结构族: sticky_split_endpoint_pocket_consumption
变体: cshape_stays_rigid
变化变量: B/S 边界更靠左，推后 C 形仍整体在 sticky side，保持一个刚体 footprint
对照: split_cshape_upper_pocket_pass

问题: 如果 C 形没有被切断，同一上方目标袋是否会被整体 footprint 的其它格子阻断？
动作序列: left down left up
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=20000, maxTransitions=80000

layout:
```text
########
###.G..#
###.MM@#
#...M..#
#...MM.#
#.BS...#
########
```

初始状态:
```text
########
###.G..#
###.MM@#
#...M..#
#...MM.#
#.BS...#
########
```

动作回放:
- 1. left: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
########
###.G..#
###MM@.#
#..M...#
#..MM..#
#.BS...#
########
```
- 2. down: legal; events=walk; eventWin=no
```text
########
###.G..#
###MM..#
#..M.@.#
#..MM..#
#.BS...#
########
```
- 3. left: legal; events=walk; eventWin=no
```text
########
###.G..#
###MM..#
#..M@..#
#..MM..#
#.BS...#
########
```
- 4. up: illegal (force_blocked_by_player); events=-; eventWin=no
```text
########
###.G..#
###MM..#
#..M@..#
#..MM..#
#.BS...#
########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
########
###.G..#
###MM..#
#..M@..#
#..MM..#
#.BS...#
########
```
变化格: (3,2) .->M; (5,2) M->.; (6,2) @->.; (3,3) .->M; (4,3) M->@; (3,4) .->M; (5,4) M->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | force_blocked_by_player |
| down | no | - | force_blocked_by_player |
| left | no | - | force_blocked |
| right | yes | walk | Ply:5,3\|C:\|M:3,2;4,2;3,3;3,4;4,4\|PL:none\|BS:B:2,5;S:3,5 |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=134, transitions=295, winStates=7, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=7, force_chain:n2=3, move_sticky_rigid=25, push_object:box_sticky_anchor=4, push_object:sticky#1=25, walk=266

## split_cshape_no_stand_block

结构族: sticky_split_endpoint_pocket_consumption
变体: split_endpoint_but_stand_cell_closed
变化变量: 保留边界切断输出，但把绕到上端点下方的通路封成墙
对照: split_cshape_upper_pocket_pass

问题: 即使切出了独立上端点，如果缺少下方施力站位，目标袋消费是否仍然失败？
动作序列: left down left up
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=20000, maxTransitions=80000

layout:
```text
########
###.G..#
###.MM@#
#...M#.#
#...MM.#
#..BS..#
########
```

初始状态:
```text
########
###.G..#
###.MM@#
#...M#.#
#...MM.#
#..BS..#
########
```

动作回放:
- 1. left: legal; events=push_object:sticky#1,move_sticky_rigid,sticky_to_box:n3,sticky_split:n1; eventWin=no
```text
########
###.G..#
###CM@.#
#..C.#.#
#..CM..#
#..BS..#
########
```
- 2. down: illegal (destination_blocked); events=-; eventWin=no
```text
########
###.G..#
###CM@.#
#..C.#.#
#..CM..#
#..BS..#
########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
########
###.G..#
###CM@.#
#..C.#.#
#..CM..#
#..BS..#
########
```
变化格: (3,2) .->C; (5,2) M->@; (6,2) @->.; (3,3) .->C; (4,3) M->.; (3,4) .->C; (5,4) M->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,1\|C:3,2;3,3;3,4\|M:4,2\|4,4\|PL:none\|BS:B:3,5;S:4,5 |
| down | no | - | destination_blocked |
| left | no | - | force_blocked |
| right | yes | walk | Ply:6,2\|C:3,2;3,3;3,4\|M:4,2\|4,4\|PL:none\|BS:B:3,5;S:4,5 |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=188, transitions=326, winStates=12, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=9, box_to_sticky:n1=3, box_to_sticky:n2=1, box_to_sticky:n3=2, force_chain:n2=4, force_chain:n3=1, move_sticky_rigid=23, push_object:box_sticky_anchor=9, push_object:crate#1=3, push_object:crate#2=6, push_object:crate#3=5, push_object:crate#4=4, push_object:sticky#1=21, push_object:sticky#2=2, sticky_merge:n1=5, sticky_split:n1=3, sticky_to_box:n1=1, sticky_to_box:n2=1, sticky_to_box:n3=3, walk=276

## pre_split_endpoints_upper_pocket_pass

结构族: sticky_split_endpoint_pocket_consumption
变体: already_separate_endpoints
变化变量: 右侧上下端点一开始就不正交相邻，边界不需要切断桥格
对照: split_cshape_upper_pocket_pass, unsplit_cshape_upper_pocket_block

问题: 如果上端点本来就是独立 sticky，单格目标袋是否表现得和切断输出一样？
动作序列: left down left up
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=20000, maxTransitions=80000

layout:
```text
########
###.G..#
###.MM@#
#......#
#...MM.#
#..BS..#
########
```

初始状态:
```text
########
###.G..#
###.MM@#
#......#
#...MM.#
#..BS..#
########
```

动作回放:
- 1. left: legal; events=push_object:sticky#1,move_sticky_rigid,sticky_to_box:n1; eventWin=no
```text
########
###.G..#
###CM@.#
#......#
#...MM.#
#..BS..#
########
```
- 2. down: legal; events=walk; eventWin=no
```text
########
###.G..#
###CM..#
#....@.#
#...MM.#
#..BS..#
########
```
- 3. left: legal; events=walk; eventWin=no
```text
########
###.G..#
###CM..#
#...@..#
#...MM.#
#..BS..#
########
```
- 4. up: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
########
###.m..#
###C@..#
#......#
#...MM.#
#..BS..#
########
```

最终状态:
```text
########
###.m..#
###C@..#
#......#
#...MM.#
#..BS..#
########
```
变化格: (4,1) G->m; (3,2) .->C; (4,2) M->@; (5,2) M->.; (6,2) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | force_blocked |
| down | yes | walk | Ply:4,3\|C:3,2\|M:4,1\|4,4;5,4\|PL:none\|BS:B:3,5;S:4,5 |
| left | no | - | force_blocked |
| right | yes | walk | Ply:5,2\|C:3,2\|M:4,1\|4,4;5,4\|PL:none\|BS:B:3,5;S:4,5 |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=841, transitions=1512, winStates=42, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=35, box_to_sticky:n1=13, box_to_sticky:n2=3, force_chain:n2=13, force_chain:n3=2, move_sticky_rigid=153, push_object:box_sticky_anchor=35, push_object:crate#1=22, push_object:crate#2=8, push_object:crate#3=5, push_object:crate#4=1, push_object:sticky#1=102, push_object:sticky#2=47, sticky_merge:n1=38, sticky_merge:n2=1, sticky_to_box:n1=18, sticky_to_box:n2=16, walk=1292

