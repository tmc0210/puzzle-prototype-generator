# 机制局部实验: ra_loop_split_tail_second_consumer_20260707_01_cshape_bridge_debt

- 原型: reality_anchor
- 生成时间: 2026-07-07T08:30:48.965Z
- 标题: C 形断桥后的左柱 crate 桥债接入单格墙口
- 备注: 只探索 cshape_bridge_debt topic。关键动作串为先把 C 形 sticky 推过固定 B/S 边界，再从右侧站到左柱中格右侧，尝试把左柱 crate 桥债推入单格墙口。


## 结构族摘要

### cshape_bridge_single_cell_mouth
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| split_bridge_narrow_mouth_pass | split_bridge_narrow_mouth | B/S 边界切过 C 形左柱；二段口只开放左柱中格 | unsplit_cshape_narrow_mouth_block, pre_split_endpoint_no_bridge_walk, unsplit_cshape_wide_mouth_shortcut, split_bridge_stand_gate_event_only | unknown exhausted: depth budget exceeded | up, left, right | down:force_blocked | complete / 406 states |
| unsplit_cshape_narrow_mouth_block | unsplit_cshape_narrow_mouth | B/S 边界保持 C 形整体 sticky；二段口仍为单格 | split_bridge_narrow_mouth_pass | not applicable: replay stopped at illegal action; return search skipped | right | up:force_blocked_by_player, down:force_blocked_by_player, left:force_blocked | complete / 169 states |
| pre_split_endpoint_no_bridge_walk | pre_split_no_bridge | 端点预分离，缺少左柱 bridge debt | split_bridge_narrow_mouth_pass | unknown exhausted: depth budget exceeded | up, down, left, right | - | complete / 1217 states |
| unsplit_cshape_wide_mouth_shortcut | wide_mouth_shortcut | 单格墙口放宽为三格口 | unsplit_cshape_narrow_mouth_block, split_bridge_narrow_mouth_pass | unknown exhausted: depth budget exceeded | up, left, right | down:force_blocked | complete / 602 states |
| split_bridge_stand_gate_event_only | stand_gate_closed | 切断后通往左柱中格右侧的站位门关闭 | split_bridge_narrow_mouth_pass | not applicable: replay stopped at illegal action; return search skipped | up, right | down:destination_blocked, left:force_blocked | complete / 90 states |

## split_bridge_narrow_mouth_pass: 切断后左柱 crate 桥债可被单格墙口消费

结构族: cshape_bridge_single_cell_mouth
变体: split_bridge_narrow_mouth
变化变量: B/S 边界切过 C 形左柱；二段口只开放左柱中格
对照: unsplit_cshape_narrow_mouth_block, pre_split_endpoint_no_bridge_walk, unsplit_cshape_wide_mouth_shortcut, split_bridge_stand_gate_event_only

问题: 切断产生的左柱 crate 桥是否能在第二段被单格墙口单独接收？
备注: 第一步产生左柱 crate 桥和两个 sticky 端点；随后从 (4,3) 向左推中格 crate， 上下墙齿只允许单格债务进入。

动作序列: left down left left
反事实禁用: 无
预算: exploreDepth=12, returnDepth=16, maxStates=20000, maxTransitions=80000

layout:
```text
########
###.G..#
###.MM@#
#...M..#
#.#.MM.#
#..BS..#
########
```

初始状态:
```text
########
###.G..#
###.MM@#
#...M..#
#.#.MM.#
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
#.#CM..#
#..BS..#
########
```
- 2. down: legal; events=walk; eventWin=no
```text
########
###.G..#
###CM..#
#..C.@.#
#.#CM..#
#..BS..#
########
```
- 3. left: legal; events=walk; eventWin=no
```text
########
###.G..#
###CM..#
#..C@..#
#.#CM..#
#..BS..#
########
```
- 4. left: legal; events=push_object:crate#2; eventWin=no
```text
########
###.G..#
###CM..#
#.C@...#
#.#CM..#
#..BS..#
########
```

最终状态:
```text
########
###.G..#
###CM..#
#.C@...#
#.#CM..#
#..BS..#
########
```
变化格: (3,2) .->C; (5,2) M->.; (6,2) @->.; (2,3) .->C; (3,3) .->@; (4,3) M->.; (3,4) .->C; (5,4) M->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | push_object:crate#1 | Ply:3,2\|C:2,3;3,1;3,4\|M:4,2\|4,4\|PL:none\|BS:B:3,5;S:4,5 |
| down | no | - | force_blocked |
| left | yes | push_object:crate#2 | Ply:2,3\|C:1,3;3,2;3,4\|M:4,2\|4,4\|PL:none\|BS:B:3,5;S:4,5 |
| right | yes | walk | Ply:4,3\|C:2,3;3,2;3,4\|M:4,2\|4,4\|PL:none\|BS:B:3,5;S:4,5 |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=406, transitions=799, winStates=16, maxDepth=12
事件类型: anchor_boundary_shift:box_sticky=19, box_to_sticky:n1=5, box_to_sticky:n2=5, box_to_sticky:n3=2, move_sticky_rigid=71, push_object:box_sticky_anchor=19, push_object:crate#1=3, push_object:crate#2=5, push_object:sticky#1=45, push_object:sticky#2=24, push_object:sticky#3=2, sticky_merge:n1=18, sticky_merge:n2=2, sticky_split:n1=4, sticky_to_box:n1=2, sticky_to_box:n3=4, walk=701

## unsplit_cshape_narrow_mouth_block: 未切断 C 形在同一单格墙口被整体 footprint 阻断

结构族: cshape_bridge_single_cell_mouth
变体: unsplit_cshape_narrow_mouth
变化变量: B/S 边界保持 C 形整体 sticky；二段口仍为单格
对照: split_bridge_narrow_mouth_pass

问题: 如果第一段没有断桥，同一二段动作是否会失败？
备注: 第一推后 C 形仍为整体 sticky footprint；从右侧向左推中格时，上下端点同时撞到墙齿。

动作序列: left down left left
反事实禁用: 无
预算: exploreDepth=12, returnDepth=16, maxStates=20000, maxTransitions=80000

layout:
```text
########
###.G..#
###.MM@#
#...M..#
#.#.MM.#
#.BS...#
########
```

初始状态:
```text
########
###.G..#
###.MM@#
#...M..#
#.#.MM.#
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
#.#MM..#
#.BS...#
########
```
- 2. down: legal; events=walk; eventWin=no
```text
########
###.G..#
###MM..#
#..M.@.#
#.#MM..#
#.BS...#
########
```
- 3. left: legal; events=walk; eventWin=no
```text
########
###.G..#
###MM..#
#..M@..#
#.#MM..#
#.BS...#
########
```
- 4. left: illegal (force_blocked); events=-; eventWin=no
```text
########
###.G..#
###MM..#
#..M@..#
#.#MM..#
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
#.#MM..#
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
局部可达图: status=complete, states=169, transitions=365, winStates=7, maxDepth=12
事件类型: anchor_boundary_shift:box_sticky=10, force_chain:n2=4, move_sticky_rigid=32, push_object:box_sticky_anchor=7, push_object:sticky#1=31, sticky_split:n1=1, sticky_to_box:n3=1, walk=327

## pre_split_endpoint_no_bridge_walk: 预分离端点没有左柱桥债，同动作退化为走路

结构族: cshape_bridge_single_cell_mouth
变体: pre_split_no_bridge
变化变量: 端点预分离，缺少左柱 bridge debt
对照: split_bridge_narrow_mouth_pass

问题: 如果端点本来分离且没有左柱 crate 桥，同一动作能否证明桥债消费？
备注: 这里没有中格桥债；最后一次 left 只是走入空格，因此只能说明端点独立，不证明 bridge consumer。

动作序列: left down left left
反事实禁用: 无
预算: exploreDepth=12, returnDepth=16, maxStates=20000, maxTransitions=80000

layout:
```text
########
###.G..#
###.MM@#
#......#
#.#.MM.#
#..BS..#
########
```

初始状态:
```text
########
###.G..#
###.MM@#
#......#
#.#.MM.#
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
#.#.MM.#
#..BS..#
########
```
- 2. down: legal; events=walk; eventWin=no
```text
########
###.G..#
###CM..#
#....@.#
#.#.MM.#
#..BS..#
########
```
- 3. left: legal; events=walk; eventWin=no
```text
########
###.G..#
###CM..#
#...@..#
#.#.MM.#
#..BS..#
########
```
- 4. left: legal; events=walk; eventWin=no
```text
########
###.G..#
###CM..#
#..@...#
#.#.MM.#
#..BS..#
########
```

最终状态:
```text
########
###.G..#
###CM..#
#..@...#
#.#.MM.#
#..BS..#
########
```
变化格: (3,2) .->C; (5,2) M->.; (6,2) @->.; (3,3) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | push_object:crate#1 | Ply:3,2\|C:3,1\|M:4,2\|4,4;5,4\|PL:none\|BS:B:3,5;S:4,5 |
| down | yes | walk | Ply:3,4\|C:3,2\|M:4,2\|4,4;5,4\|PL:none\|BS:B:3,5;S:4,5 |
| left | yes | walk | Ply:2,3\|C:3,2\|M:4,2\|4,4;5,4\|PL:none\|BS:B:3,5;S:4,5 |
| right | yes | walk | Ply:4,3\|C:3,2\|M:4,2\|4,4;5,4\|PL:none\|BS:B:3,5;S:4,5 |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=1217, transitions=2330, winStates=62, maxDepth=12
事件类型: anchor_boundary_shift:box_sticky=33, box_to_sticky:n1=7, box_to_sticky:n2=3, box_to_sticky:n3=1, force_chain:n2=5, move_sticky_rigid=236, push_object:box_sticky_anchor=33, push_object:crate#1=22, push_object:crate#2=7, push_object:crate#3=3, push_object:sticky#1=153, push_object:sticky#2=81, sticky_merge:n1=47, sticky_merge:n2=1, sticky_to_box:n1=20, sticky_to_box:n2=14, walk=2031

## unsplit_cshape_wide_mouth_shortcut: 过宽墙口让未切断 C 形也能整体进入

结构族: cshape_bridge_single_cell_mouth
变体: wide_mouth_shortcut
变化变量: 单格墙口放宽为三格口
对照: unsplit_cshape_narrow_mouth_block, split_bridge_narrow_mouth_pass

问题: 如果二段 consumer 过宽，未切断反例是否失效？
备注: 打开上下墙齿后，未切断 C 形可以整体向左进入宽口；该成功不再隔离左柱 crate 桥债。

动作序列: left down left left
反事实禁用: 无
预算: exploreDepth=12, returnDepth=16, maxStates=20000, maxTransitions=80000

layout:
```text
########
###.G..#
#...MM@#
#...M..#
#...MM.#
#.BS...#
########
```

初始状态:
```text
########
###.G..#
#...MM@#
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
#..MM@.#
#..M...#
#..MM..#
#.BS...#
########
```
- 2. down: legal; events=walk; eventWin=no
```text
########
###.G..#
#..MM..#
#..M.@.#
#..MM..#
#.BS...#
########
```
- 3. left: legal; events=walk; eventWin=no
```text
########
###.G..#
#..MM..#
#..M@..#
#..MM..#
#.BS...#
########
```
- 4. left: legal; events=push_object:sticky#1,move_sticky_rigid,sticky_to_box:n3,sticky_split:n1; eventWin=no
```text
########
###.G..#
#.CM...#
#.C@...#
#.CM...#
#.BS...#
########
```

最终状态:
```text
########
###.G..#
#.CM...#
#.C@...#
#.CM...#
#.BS...#
########
```
变化格: (2,2) .->C; (3,2) .->M; (4,2) M->.; (5,2) M->.; (6,2) @->.; (2,3) .->C; (3,3) .->@; (4,3) M->.; (2,4) .->C; (3,4) .->M; (4,4) M->.; (5,4) M->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | push_object:sticky#1,move_sticky_rigid | Ply:3,2\|C:2,2;2,3;2,4\|M:3,1\|3,4\|PL:none\|BS:B:2,5;S:3,5 |
| down | no | - | force_blocked |
| left | yes | push_object:crate#2 | Ply:2,3\|C:1,3;2,2;2,4\|M:3,2\|3,4\|PL:none\|BS:B:2,5;S:3,5 |
| right | yes | walk | Ply:4,3\|C:2,2;2,3;2,4\|M:3,2\|3,4\|PL:none\|BS:B:2,5;S:3,5 |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=602, transitions=1454, winStates=7, maxDepth=12
事件类型: anchor_boundary_shift:box_sticky=25, box_to_sticky:n2=7, box_to_sticky:n3=8, force_chain:n2=15, force_chain:n3=4, move_sticky_rigid=67, push_object:box_sticky_anchor=22, push_object:crate#1=8, push_object:crate#2=6, push_object:crate#3=2, push_object:sticky#1=59, push_object:sticky#2=7, sticky_merge:n1=17, sticky_merge:n2=1, sticky_split:n1=7, sticky_to_box:n1=11, sticky_to_box:n2=4, sticky_to_box:n3=7, walk=1350

## split_bridge_stand_gate_event_only: 站位门关闭时只剩断桥事件 witness

结构族: cshape_bridge_single_cell_mouth
变体: stand_gate_closed
变化变量: 切断后通往左柱中格右侧的站位门关闭
对照: split_bridge_narrow_mouth_pass

问题: 如果玩家无法到达二段施力格，切断事件本身是否足够？
备注: 第一步仍产生 sticky_to_box / sticky_split，但玩家无法下行到施力格；不能把事件名写成 family。

动作序列: left down
反事实禁用: 无
预算: exploreDepth=12, returnDepth=16, maxStates=20000, maxTransitions=80000

layout:
```text
########
###.G..#
###.MM@#
#...M#.#
#.#.MM.#
#..BS..#
########
```

初始状态:
```text
########
###.G..#
###.MM@#
#...M#.#
#.#.MM.#
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
#.#CM..#
#..BS..#
########
```
- 2. down: illegal (destination_blocked); events=-; eventWin=no
```text
########
###.G..#
###CM@.#
#..C.#.#
#.#CM..#
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
#.#CM..#
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
局部可达图: status=complete, states=90, transitions=178, winStates=3, maxDepth=12
事件类型: anchor_boundary_shift:box_sticky=7, box_to_sticky:n3=2, move_sticky_rigid=10, push_object:box_sticky_anchor=7, push_object:sticky#1=10, sticky_merge:n1=3, sticky_split:n1=3, sticky_to_box:n3=3, walk=161

