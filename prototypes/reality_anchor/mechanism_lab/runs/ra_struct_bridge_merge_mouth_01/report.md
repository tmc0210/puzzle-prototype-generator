# 机制局部实验: ra_struct_bridge_merge_mouth_01

- 原型: reality_anchor
- 生成时间: 2026-07-07T05:39:18.655Z
- 标题: B/S 桥格合并后由目标口宽消费
- 备注: Reality Anchor 的 explorer run。本轮范围只看 crate 跨入 sticky side 后作为桥格合并两个 sticky 端点，并由目标口宽消费；不进入关卡设计，不读取历史设计归档、候选包、报告、采样配置或旧实验 run 材料。

## 结构族摘要

### bridge_merge_mouth_consumption
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| bridge_merge_single_mouth_block | bridge_between_two_endpoints_single_mouth | crate 从 box side 跨入 sticky gap，变成桥格并连接上下两个 sticky 端点；右侧只有中格目标口 | no_endpoints_single_mouth_pass, bridge_merge_triple_mouth_pass, bridge_merge_upper_only_single_mouth_block | not applicable: replay stopped at illegal action; return search skipped | up, down, left | right:force_blocked | complete / 181 states |
| no_endpoints_single_mouth_pass | single_bridge_no_endpoints_single_mouth | 移除上下 sticky 端点，跨线 crate 只变成单格 sticky | bridge_merge_single_mouth_block | no complete | up, down, left, right | - | complete / 416 states |
| bridge_merge_triple_mouth_pass | bridge_between_two_endpoints_triple_mouth | 保留上下端点和桥格合并，但把右侧口宽打开为三格 | bridge_merge_single_mouth_block | unknown exhausted: depth budget exceeded | up, down, left, right | - | complete / 1330 states |
| bridge_merge_upper_only_single_mouth_block | bridge_to_one_endpoint_single_mouth | 只保留上方 sticky 端点；桥格合并成二格刚体，右上仍是墙 | bridge_merge_single_mouth_block, no_endpoints_single_mouth_pass | not applicable: replay stopped at illegal action; return search skipped | up, down, left | right:force_blocked | complete / 328 states |

## bridge_merge_single_mouth_block

结构族: bridge_merge_mouth_consumption
变体: bridge_between_two_endpoints_single_mouth
变化变量: crate 从 box side 跨入 sticky gap，变成桥格并连接上下两个 sticky 端点；右侧只有中格目标口
对照: no_endpoints_single_mouth_pass, bridge_merge_triple_mouth_pass, bridge_merge_upper_only_single_mouth_block

问题: 桥格把上下端点合并成三格刚体后，单格目标口是否会拒绝整体推进？
动作序列: right right
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=20000, maxTransitions=80000

layout:
```text
########
#...M#.#
#.@C G.#
#...M#.#
#..BS..#
########
```

初始状态:
```text
########
#...M#.#
#.@C.G.#
#...M#.#
#..BS..#
########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
########
#...M#.#
#..@MG.#
#...M#.#
#..BS..#
########
```
- 2. right: illegal (force_blocked); events=-; eventWin=no
```text
########
#...M#.#
#..@MG.#
#...M#.#
#..BS..#
########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
########
#...M#.#
#..@MG.#
#...M#.#
#..BS..#
########
```
变化格: (2,2) @->.; (3,2) C->@; (4,2) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,1\|C:\|M:4,1;4,2;4,3\|PL:none\|BS:B:3,4;S:4,4 |
| down | yes | walk | Ply:3,3\|C:\|M:4,1;4,2;4,3\|PL:none\|BS:B:3,4;S:4,4 |
| left | yes | walk | Ply:2,2\|C:\|M:4,1;4,2;4,3\|PL:none\|BS:B:3,4;S:4,4 |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=181, transitions=412, winStates=4, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=10, box_to_sticky:n1=4, force_chain:n2=1, push_object:box_sticky_anchor=10, push_object:crate#1=3, push_object:crate#2=12, push_object:crate#3=6, sticky_merge:n1=3, sticky_to_box:n2=3, sticky_to_box:n3=1, walk=381

## no_endpoints_single_mouth_pass

结构族: bridge_merge_mouth_consumption
变体: single_bridge_no_endpoints_single_mouth
变化变量: 移除上下 sticky 端点，跨线 crate 只变成单格 sticky
对照: bridge_merge_single_mouth_block

问题: 如果没有端点被桥接，单格 sticky 是否能进入同一目标口？
动作序列: right right
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=20000, maxTransitions=80000

layout:
```text
########
#....#.#
#.@C G.#
#....#.#
#..BS..#
########
```

初始状态:
```text
########
#....#.#
#.@C.G.#
#....#.#
#..BS..#
########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,box_to_sticky:n1; eventWin=no
```text
########
#....#.#
#..@MG.#
#....#.#
#..BS..#
########
```
- 2. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
########
#....#.#
#...@m.#
#....#.#
#..BS..#
########
```

最终状态:
```text
########
#....#.#
#...@m.#
#....#.#
#..BS..#
########
```
变化格: (2,2) @->.; (3,2) C->.; (4,2) .->@; (5,2) G->m

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,1\|C:\|M:5,2\|PL:none\|BS:B:3,4;S:4,4 |
| down | yes | walk | Ply:4,3\|C:\|M:5,2\|PL:none\|BS:B:3,4;S:4,4 |
| left | yes | walk | Ply:3,2\|C:\|M:5,2\|PL:none\|BS:B:3,4;S:4,4 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:5,2\|C:\|M:6,2\|PL:none\|BS:B:3,4;S:4,4 |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=416, transitions=907, winStates=3, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=23, box_to_sticky:n1=7, move_sticky_rigid=3, push_object:box_sticky_anchor=23, push_object:crate#1=49, push_object:sticky#1=3, sticky_to_box:n1=3, walk=832

## bridge_merge_triple_mouth_pass

结构族: bridge_merge_mouth_consumption
变体: bridge_between_two_endpoints_triple_mouth
变化变量: 保留上下端点和桥格合并，但把右侧口宽打开为三格
对照: bridge_merge_single_mouth_block

问题: 如果口宽匹配三格刚体，桥接合并后的整体是否可以推进并覆盖目标？
动作序列: right right
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=20000, maxTransitions=80000

layout:
```text
########
#...M..#
#.@C G.#
#...M..#
#..BS..#
########
```

初始状态:
```text
########
#...M..#
#.@C.G.#
#...M..#
#..BS..#
########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
########
#...M..#
#..@MG.#
#...M..#
#..BS..#
########
```
- 2. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
########
#....M.#
#...@m.#
#....M.#
#..BS..#
########
```

最终状态:
```text
########
#....M.#
#...@m.#
#....M.#
#..BS..#
########
```
变化格: (4,1) M->.; (5,1) .->M; (2,2) @->.; (3,2) C->.; (4,2) .->@; (5,2) G->m; (4,3) M->.; (5,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,1\|C:\|M:5,1;5,2;5,3\|PL:none\|BS:B:3,4;S:4,4 |
| down | yes | walk | Ply:4,3\|C:\|M:5,1;5,2;5,3\|PL:none\|BS:B:3,4;S:4,4 |
| left | yes | walk | Ply:3,2\|C:\|M:5,1;5,2;5,3\|PL:none\|BS:B:3,4;S:4,4 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:5,2\|C:\|M:6,1;6,2;6,3\|PL:none\|BS:B:3,4;S:4,4 |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=1330, transitions=2374, winStates=11, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=56, box_to_sticky:n1=40, box_to_sticky:n2=3, force_chain:n2=31, move_sticky_rigid=117, push_object:box_sticky_anchor=54, push_object:crate#1=82, push_object:crate#2=49, push_object:crate#3=20, push_object:sticky#1=62, push_object:sticky#2=45, push_object:sticky#3=3, sticky_merge:n1=33, sticky_to_box:n1=38, sticky_to_box:n2=4, sticky_to_box:n3=1, walk=2059

## bridge_merge_upper_only_single_mouth_block

结构族: bridge_merge_mouth_consumption
变体: bridge_to_one_endpoint_single_mouth
变化变量: 只保留上方 sticky 端点；桥格合并成二格刚体，右上仍是墙
对照: bridge_merge_single_mouth_block, no_endpoints_single_mouth_pass

问题: 只合并一个端点时，单格目标口是否仍会因为连接 footprint 超出中格而失败？
动作序列: right right
反事实禁用: 无
预算: exploreDepth=10, returnDepth=16, maxStates=20000, maxTransitions=80000

layout:
```text
########
#...M#.#
#.@C G.#
#....#.#
#..BS..#
########
```

初始状态:
```text
########
#...M#.#
#.@C.G.#
#....#.#
#..BS..#
########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
########
#...M#.#
#..@MG.#
#....#.#
#..BS..#
########
```
- 2. right: illegal (force_blocked); events=-; eventWin=no
```text
########
#...M#.#
#..@MG.#
#....#.#
#..BS..#
########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
########
#...M#.#
#..@MG.#
#....#.#
#..BS..#
########
```
变化格: (2,2) @->.; (3,2) C->@; (4,2) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,1\|C:\|M:4,1;4,2\|PL:none\|BS:B:3,4;S:4,4 |
| down | yes | walk | Ply:3,3\|C:\|M:4,1;4,2\|PL:none\|BS:B:3,4;S:4,4 |
| left | yes | walk | Ply:2,2\|C:\|M:4,1;4,2\|PL:none\|BS:B:3,4;S:4,4 |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=328, transitions=700, winStates=2, maxDepth=10
事件类型: anchor_boundary_shift:box_sticky=19, box_to_sticky:n1=6, push_object:box_sticky_anchor=19, push_object:crate#1=16, push_object:crate#2=20, sticky_merge:n1=2, sticky_to_box:n1=6, sticky_to_box:n2=2, walk=645

