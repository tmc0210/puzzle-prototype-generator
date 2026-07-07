# 机制局部实验: ra_struct_binding_unbinding_01

- 原型: reality_anchor
- 生成时间: 2026-07-06T09:25:33.824Z
- 标题: 绑定债与解绑定债的局部结构谱
- 备注: 本轮把 Reality Anchor 的 B/S 归一化当作已知规则，目标不是验证事件是否触发， 而是为 designer 提供两组可复用局部材料：独立 crate 被压成 sticky 刚体后的动作负债， 以及 sticky 刚体被切回 crate 部件后的资源释放方式。


## 结构族摘要

### binding_debt_sticky_topology
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| bind_bar_open | 二连箱压成横条工具 | 基准：两个相邻 crate 沿施力轴跨入 sticky 侧 | bind_l_corner, bind_gap_keeps_parts, bind_bar_choke | yes depth=12 | up, down, left, right | - | complete / 11204 states |
| bind_l_corner | 三箱压成 L 形占角件 | 在横条基准上加入一个可晚推入的上方 crate，改变 sticky 邻接图为 L 形 | bind_bar_open, bind_gap_keeps_parts | yes depth=13 | down, left, right | up:force_blocked | complete / 22825 states |
| bind_gap_keeps_parts | 隔行压入保留两个部件 | 把正交邻接改成隔一行的并列入场，保留两个独立 sticky 部件 | bind_bar_open, bind_l_corner | yes depth=13 | up, left, right | down:destination_blocked | complete / 4484 states |
| bind_bar_choke | 走廊内横条成为宽塞 | 把开放房间收窄成单行走廊，限制绕行与侧向把手 | bind_bar_open | no complete | left, right | up:destination_blocked, down:destination_blocked | complete / 14 states |

### unbinding_debt_resource_release
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| unbind_head_slice_once | 横条切头释放一个 crate | 基准：2 格 sticky 横条垂直穿过 B/S 边界一步，留下 crate + sticky 尾 | unbind_full_bar_twice, unbind_l_neck, unbind_parallel_carry | yes depth=11 | up, down, left, right | - | complete / 10654 states |
| unbind_full_bar_twice | 横条二次切割完全拆箱 | 在切头基准上继续沿同一方向推进一次，把剩余 sticky 尾也切回 box 侧 | unbind_head_slice_once, unbind_parallel_carry | yes depth=12 | up, down, left, right | - | complete / 10654 states |
| unbind_l_neck | L 形切颈释放竖向双 crate 加尾 | 把 2 格横条改成 L 形，让一次切割同时释放两个相邻 crate 并保留一个 sticky 尾 | unbind_head_slice_once, unbind_vertical_full_release | yes depth=15 | up, down, left, right | - | complete / 20071 states |
| unbind_vertical_full_release | 竖条整列一次释放 | 把横条改成与边界平行的竖条，但从侧面整体推过边界 | unbind_l_neck, unbind_parallel_carry | yes depth=13 | up, down, left, right | - | complete / 10518 states |
| unbind_parallel_carry | 沿边界平移保留刚体债 | 把垂直切割改成沿边界方向推送，移动位置但不释放资源 | unbind_head_slice_once, unbind_vertical_full_release | yes depth=11 | up, down, left, right | - | complete / 17072 states |

## bind_bar_open

结构族: binding_debt_sticky_topology
变体: 二连箱压成横条工具
变化变量: 基准：两个相邻 crate 沿施力轴跨入 sticky 侧
对照: bind_l_corner, bind_gap_keeps_parts, bind_bar_choke

问题: 二连箱被压成 2 格横条后，designer 得到的是可沿轴继续递送的刚体工具，而不是两个可分配资源。
备注: 开放房间保留绕到刚体另一侧的可能性，用作绑定债的低约束基准。
动作序列: right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=60000, maxTransitions=160000

layout:
```text
#########
#...BS..#
#.......#
#.@CC...#
#.....G.#
#########
```

初始状态:
```text
#########
#...BS..#
#.......#
#.@CC...#
#.....G.#
#########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,force_chain:n2,box_to_sticky:n1; eventWin=no
```text
#########
#...BS..#
#.......#
#..@CM..#
#.....G.#
#########
```
- 2. right: legal; events=push_object:crate#1,force_chain:n2,move_sticky_rigid,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
#########
#...BS..#
#.......#
#...@MM.#
#.....G.#
#########
```

最终状态:
```text
#########
#...BS..#
#.......#
#...@MM.#
#.....G.#
#########
```
变化格: (2,3) @->.; (3,3) C->.; (4,3) C->@; (5,3) .->M; (6,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,2\|C:\|M:5,3;6,3\|PL:none\|BS:B:4,1;S:5,1 |
| down | yes | walk | Ply:4,4\|C:\|M:5,3;6,3\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | walk | Ply:3,3\|C:\|M:5,3;6,3\|PL:none\|BS:B:4,1;S:5,1 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:5,3\|C:\|M:6,3;7,3\|PL:none\|BS:B:4,1;S:5,1 |

回到初始: yes, depth=12, path=up right right right down left left up left left left down
局部可达图: status=complete, states=11204, transitions=25278, winStates=882, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=578, box_to_sticky:n1=221, box_to_sticky:n2=4, force_chain:n2=128, force_chain:n3=1, move_sticky_rigid=647, push_object:box_sticky_anchor=538, push_object:crate#1=832, push_object:crate#2=431, push_object:sticky#1=565, push_object:sticky#2=72, sticky_merge:n1=68, sticky_to_box:n1=152, sticky_to_box:n2=12, walk=22840

## bind_l_corner

结构族: binding_debt_sticky_topology
变体: 三箱压成 L 形占角件
变化变量: 在横条基准上加入一个可晚推入的上方 crate，改变 sticky 邻接图为 L 形
对照: bind_bar_open, bind_gap_keeps_parts

问题: 晚加入的第三个 crate 把横条工具改成占角件，后续用途从线性递送偏向封角/卡门。
备注: 动作序列先制造横条，再把上方 crate 接入同一 sticky 组件。
动作序列: right right left up right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=60000, maxTransitions=160000

layout:
```text
#########
#...BS..#
#...C...#
#.@CC...#
#.....G.#
#########
```

初始状态:
```text
#########
#...BS..#
#...C...#
#.@CC...#
#.....G.#
#########
```

动作回放:
- 1. right: legal; events=push_object:crate#2,force_chain:n2,box_to_sticky:n1; eventWin=no
```text
#########
#...BS..#
#...C...#
#..@CM..#
#.....G.#
#########
```
- 2. right: legal; events=push_object:crate#2,force_chain:n2,move_sticky_rigid,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
#########
#...BS..#
#...C...#
#...@MM.#
#.....G.#
#########
```
- 3. left: legal; events=walk; eventWin=no
```text
#########
#...BS..#
#...C...#
#..@.MM.#
#.....G.#
#########
```
- 4. up: legal; events=walk; eventWin=no
```text
#########
#...BS..#
#..@C...#
#....MM.#
#.....G.#
#########
```
- 5. right: legal; events=push_object:crate#1,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
#########
#...BS..#
#...@M..#
#....MM.#
#.....G.#
#########
```

最终状态:
```text
#########
#...BS..#
#...@M..#
#....MM.#
#.....G.#
#########
```
变化格: (4,2) C->@; (5,2) .->M; (2,3) @->.; (3,3) C->.; (4,3) C->.; (5,3) .->M; (6,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | force_blocked |
| down | yes | walk | Ply:4,3\|C:\|M:5,2;5,3;6,3\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | walk | Ply:3,2\|C:\|M:5,2;5,3;6,3\|PL:none\|BS:B:4,1;S:5,1 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:5,2\|C:\|M:6,2;6,3;7,3\|PL:none\|BS:B:4,1;S:5,1 |

回到初始: yes, depth=13, path=down down right right right up left left down left left left up
局部可达图: status=complete, states=22825, transitions=45212, winStates=1585, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=893, box_to_sticky:n1=622, box_to_sticky:n2=30, force_chain:n2=545, force_chain:n3=22, move_sticky_rigid=1424, push_object:box_sticky_anchor=795, push_object:crate#1=1724, push_object:crate#2=1270, push_object:crate#3=518, push_object:sticky#1=1143, push_object:sticky#2=208, push_object:sticky#3=14, sticky_merge:n1=270, sticky_to_box:n1=306, sticky_to_box:n2=61, sticky_to_box:n3=1, walk=39540

## bind_gap_keeps_parts

结构族: binding_debt_sticky_topology
变体: 隔行压入保留两个部件
变化变量: 把正交邻接改成隔一行的并列入场，保留两个独立 sticky 部件
对照: bind_bar_open, bind_l_corner

问题: 同样把 crate 送入 sticky 侧，但缺少正交接触时，designer 得到的是两个可分别处理的部件而不是一笔刚体债。
备注: 这是绑定债的误用边界：材质转换本身不等于资源绑定。
动作序列: up right right left down down right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=60000, maxTransitions=160000

layout:
```text
#########
#...BS..#
#...C...#
#.@.....#
#...C.G.#
#########
```

初始状态:
```text
#########
#...BS..#
#...C...#
#.@.....#
#...C.G.#
#########
```

动作回放:
- 1. up: legal; events=walk; eventWin=no
```text
#########
#...BS..#
#.@.C...#
#.......#
#...C.G.#
#########
```
- 2. right: legal; events=walk; eventWin=no
```text
#########
#...BS..#
#..@C...#
#.......#
#...C.G.#
#########
```
- 3. right: legal; events=push_object:crate#1,box_to_sticky:n1; eventWin=no
```text
#########
#...BS..#
#...@M..#
#.......#
#...C.G.#
#########
```
- 4. left: legal; events=walk; eventWin=no
```text
#########
#...BS..#
#..@.M..#
#.......#
#...C.G.#
#########
```
- 5. down: legal; events=walk; eventWin=no
```text
#########
#...BS..#
#....M..#
#..@....#
#...C.G.#
#########
```
- 6. down: legal; events=walk; eventWin=no
```text
#########
#...BS..#
#....M..#
#.......#
#..@C.G.#
#########
```
- 7. right: legal; events=push_object:crate#1,box_to_sticky:n1; eventWin=no
```text
#########
#...BS..#
#....M..#
#.......#
#...@MG.#
#########
```

最终状态:
```text
#########
#...BS..#
#....M..#
#.......#
#...@MG.#
#########
```
变化格: (4,2) C->.; (5,2) .->M; (2,3) @->.; (4,4) C->@; (5,4) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:4,3\|C:\|M:5,2\|5,4\|PL:none\|BS:B:4,1;S:5,1 |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:3,4\|C:\|M:5,2\|5,4\|PL:none\|BS:B:4,1;S:5,1 |
| right | yes | push_object:sticky#2,move_sticky_rigid | Ply:5,4\|C:\|M:5,2\|6,4\|PL:none\|BS:B:4,1;S:5,1 |

回到初始: yes, depth=13, path=up right right up left down right down left up left left left
局部可达图: status=complete, states=4484, transitions=9744, winStates=598, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=201, box_to_sticky:n1=78, box_to_sticky:n2=3, force_chain:n2=27, move_sticky_rigid=222, push_object:box_sticky_anchor=189, push_object:crate#1=350, push_object:crate#2=118, push_object:sticky#1=166, push_object:sticky#2=54, sticky_merge:n1=14, sticky_to_box:n1=58, sticky_to_box:n2=4, walk=8867

## bind_bar_choke

结构族: binding_debt_sticky_topology
变体: 走廊内横条成为宽塞
变化变量: 把开放房间收窄成单行走廊，限制绕行与侧向把手
对照: bind_bar_open

问题: 同一个 2 格横条在走廊里从可递送工具变成宽塞，后续动作集合被压到轴向处理。
备注: 该变体展示地形不是附属装饰，而是决定绑定债是否成为阻塞债的旋钮。
动作序列: right right
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=60000, maxTransitions=160000

layout:
```text
#########
#...BS..#
#########
#.@CC..G#
#########
```

初始状态:
```text
#########
#...BS..#
#########
#.@CC..G#
#########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,force_chain:n2,box_to_sticky:n1; eventWin=no
```text
#########
#...BS..#
#########
#..@CM.G#
#########
```
- 2. right: legal; events=push_object:crate#1,force_chain:n2,move_sticky_rigid,box_to_sticky:n1,sticky_merge:n1; eventWin=no
```text
#########
#...BS..#
#########
#...@MMG#
#########
```

最终状态:
```text
#########
#...BS..#
#########
#...@MMG#
#########
```
变化格: (2,3) @->.; (3,3) C->.; (4,3) C->@; (5,3) .->M; (6,3) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:3,3\|C:\|M:5,3;6,3\|PL:none\|BS:B:4,1;S:5,1 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:5,3\|C:\|M:6,3;7,3\|PL:none\|BS:B:4,1;S:5,1 |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=14, transitions=23, winStates=5, maxDepth=7
事件类型: box_to_sticky:n1=2, force_chain:n2=2, move_sticky_rigid=2, push_object:crate#1=2, push_object:sticky#1=1, sticky_merge:n1=1, walk=20

## unbind_head_slice_once

结构族: unbinding_debt_resource_release
变体: 横条切头释放一个 crate
变化变量: 基准：2 格 sticky 横条垂直穿过 B/S 边界一步，留下 crate + sticky 尾
对照: unbind_full_bar_twice, unbind_l_neck, unbind_parallel_carry

问题: 一次切头把刚体债改写为一个可独立使用的 crate 加一个仍受 sticky 约束的尾部。
备注: 价值在于部分释放：designer 可以先拿到一个部件，同时保留尾部作为后续债。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=60000, maxTransitions=160000

layout:
```text
##########
#...BS...#
#........#
#....MM@.#
#......G.#
##########
```

初始状态:
```text
##########
#...BS...#
#........#
#....MM@.#
#......G.#
##########
```

动作回放:
- 1. left: legal; events=push_object:sticky#1,move_sticky_rigid,sticky_to_box:n1; eventWin=no
```text
##########
#...BS...#
#........#
#...CM@..#
#......G.#
##########
```

最终状态:
```text
##########
#...BS...#
#........#
#...CM@..#
#......G.#
##########
```
变化格: (4,3) .->C; (6,3) M->@; (7,3) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:6,2\|C:4,3\|M:5,3\|PL:none\|BS:B:4,1;S:5,1 |
| down | yes | walk | Ply:6,4\|C:4,3\|M:5,3\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | push_object:sticky#1,force_chain:n2,move_sticky_rigid,sticky_to_box:n1 | Ply:5,3\|C:3,3;4,3\|M:\|PL:none\|BS:B:4,1;S:5,1 |
| right | yes | walk | Ply:7,3\|C:4,3\|M:5,3\|PL:none\|BS:B:4,1;S:5,1 |

回到初始: yes, depth=11, path=up left left left down right up right right right down
局部可达图: status=complete, states=10654, transitions=23611, winStates=344, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=595, box_to_sticky:n1=186, box_to_sticky:n2=3, force_chain:n2=116, move_sticky_rigid=660, push_object:box_sticky_anchor=555, push_object:crate#1=676, push_object:crate#2=327, push_object:sticky#1=603, push_object:sticky#2=48, sticky_merge:n1=60, sticky_to_box:n1=126, sticky_to_box:n2=8, walk=21402

## unbind_full_bar_twice

结构族: unbinding_debt_resource_release
变体: 横条二次切割完全拆箱
变化变量: 在切头基准上继续沿同一方向推进一次，把剩余 sticky 尾也切回 box 侧
对照: unbind_head_slice_once, unbind_parallel_carry

问题: 连续切割把一个刚体工具拆回两个独立 crate，designer 从单个笨重工具回收为两个可分配资源。
备注: 该变体给出解绑定债的完整释放端点。
动作序列: left left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=60000, maxTransitions=160000

layout:
```text
##########
#...BS...#
#........#
#....MM@.#
#......G.#
##########
```

初始状态:
```text
##########
#...BS...#
#........#
#....MM@.#
#......G.#
##########
```

动作回放:
- 1. left: legal; events=push_object:sticky#1,move_sticky_rigid,sticky_to_box:n1; eventWin=no
```text
##########
#...BS...#
#........#
#...CM@..#
#......G.#
##########
```
- 2. left: legal; events=push_object:sticky#1,force_chain:n2,move_sticky_rigid,sticky_to_box:n1; eventWin=no
```text
##########
#...BS...#
#........#
#..CC@...#
#......G.#
##########
```

最终状态:
```text
##########
#...BS...#
#........#
#..CC@...#
#......G.#
##########
```
变化格: (3,3) .->C; (4,3) .->C; (5,3) M->@; (6,3) M->.; (7,3) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,2\|C:3,3;4,3\|M:\|PL:none\|BS:B:4,1;S:5,1 |
| down | yes | walk | Ply:5,4\|C:3,3;4,3\|M:\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | push_object:crate#2,force_chain:n2 | Ply:4,3\|C:2,3;3,3\|M:\|PL:none\|BS:B:4,1;S:5,1 |
| right | yes | walk | Ply:6,3\|C:3,3;4,3\|M:\|PL:none\|BS:B:4,1;S:5,1 |

回到初始: yes, depth=12, path=up left left left down right right up right right right down
局部可达图: status=complete, states=10654, transitions=23611, winStates=344, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=595, box_to_sticky:n1=186, box_to_sticky:n2=3, force_chain:n2=116, move_sticky_rigid=660, push_object:box_sticky_anchor=555, push_object:crate#1=676, push_object:crate#2=327, push_object:sticky#1=603, push_object:sticky#2=48, sticky_merge:n1=60, sticky_to_box:n1=126, sticky_to_box:n2=8, walk=21402

## unbind_l_neck

结构族: unbinding_debt_resource_release
变体: L 形切颈释放竖向双 crate 加尾
变化变量: 把 2 格横条改成 L 形，让一次切割同时释放两个相邻 crate 并保留一个 sticky 尾
对照: unbind_head_slice_once, unbind_vertical_full_release

问题: 切在 L 形的颈部时，designer 得到的是一列可链推的 crate 资源和一个仍可当尾巴的 sticky 残件。
备注: 该变体展示解绑定债不是只按数量变化，切割线相对形状的位置会改变释放出的资源形态。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=60000, maxTransitions=160000

layout:
```text
##########
#...BS...#
#....M...#
#....MM@.#
#......G.#
##########
```

初始状态:
```text
##########
#...BS...#
#....M...#
#....MM@.#
#......G.#
##########
```

动作回放:
- 1. left: legal; events=push_object:sticky#1,move_sticky_rigid,sticky_to_box:n2; eventWin=no
```text
##########
#...BS...#
#...C....#
#...CM@..#
#......G.#
##########
```

最终状态:
```text
##########
#...BS...#
#...C....#
#...CM@..#
#......G.#
##########
```
变化格: (4,2) .->C; (5,2) M->.; (4,3) .->C; (6,3) M->@; (7,3) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:6,2\|C:4,2;4,3\|M:5,3\|PL:none\|BS:B:4,1;S:5,1 |
| down | yes | walk | Ply:6,4\|C:4,2;4,3\|M:5,3\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | push_object:sticky#1,force_chain:n2,move_sticky_rigid,sticky_to_box:n1 | Ply:5,3\|C:3,3;4,2;4,3\|M:\|PL:none\|BS:B:4,1;S:5,1 |
| right | yes | walk | Ply:7,3\|C:4,2;4,3\|M:5,3\|PL:none\|BS:B:4,1;S:5,1 |

回到初始: yes, depth=15, path=down left left left up right left up right down down right right right up
局部可达图: status=complete, states=20071, transitions=39740, winStates=721, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=953, box_to_sticky:n1=572, box_to_sticky:n2=20, box_to_sticky:n3=1, force_chain:n2=454, force_chain:n3=13, move_sticky_rigid=1387, push_object:box_sticky_anchor=850, push_object:crate#1=1261, push_object:crate#2=1040, push_object:crate#3=440, push_object:sticky#1=1241, push_object:sticky#2=77, push_object:sticky#3=2, sticky_merge:n1=221, sticky_to_box:n1=261, sticky_to_box:n2=59, sticky_to_box:n3=2, walk=34829

## unbind_vertical_full_release

结构族: unbinding_debt_resource_release
变体: 竖条整列一次释放
变化变量: 把横条改成与边界平行的竖条，但从侧面整体推过边界
对照: unbind_l_neck, unbind_parallel_carry

问题: 整列跨界时，刚体不会留下 sticky 尾，而是直接变成一列可链推 crate，适合作为完整资源释放结构。
备注: 这是切割线覆盖整个 footprint 的释放端点。
动作序列: left
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=60000, maxTransitions=160000

layout:
```text
##########
#...BS...#
#....M...#
#....M@..#
#......G.#
##########
```

初始状态:
```text
##########
#...BS...#
#....M...#
#....M@..#
#......G.#
##########
```

动作回放:
- 1. left: legal; events=push_object:sticky#1,move_sticky_rigid,sticky_to_box:n2; eventWin=no
```text
##########
#...BS...#
#...C....#
#...C@...#
#......G.#
##########
```

最终状态:
```text
##########
#...BS...#
#...C....#
#...C@...#
#......G.#
##########
```
变化格: (4,2) .->C; (5,2) M->.; (4,3) .->C; (5,3) M->@; (6,3) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,2\|C:4,2;4,3\|M:\|PL:none\|BS:B:4,1;S:5,1 |
| down | yes | walk | Ply:5,4\|C:4,2;4,3\|M:\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | push_object:crate#2 | Ply:4,3\|C:3,3;4,2\|M:\|PL:none\|BS:B:4,1;S:5,1 |
| right | yes | walk | Ply:6,3\|C:4,2;4,3\|M:\|PL:none\|BS:B:4,1;S:5,1 |

回到初始: yes, depth=13, path=down left left up up right left down right down right right up
局部可达图: status=complete, states=10518, transitions=22984, winStates=196, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=526, box_to_sticky:n1=162, box_to_sticky:n2=5, force_chain:n2=103, force_chain:n3=1, move_sticky_rigid=631, push_object:box_sticky_anchor=482, push_object:crate#1=669, push_object:crate#2=437, push_object:sticky#1=587, push_object:sticky#2=39, sticky_merge:n1=26, sticky_to_box:n1=85, sticky_to_box:n2=18, walk=20770

## unbind_parallel_carry

结构族: unbinding_debt_resource_release
变体: 沿边界平移保留刚体债
变化变量: 把垂直切割改成沿边界方向推送，移动位置但不释放资源
对照: unbind_head_slice_once, unbind_vertical_full_release

问题: 沿边界搬运保留 sticky 刚体身份，designer 可用它调整工具位置而不提前解债。
备注: 这是解绑定债的保守边界：同一个刚体仍可搬运，但不会变成可分配 crate。
动作序列: down
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=60000, maxTransitions=160000

layout:
```text
##########
#...BS...#
#....@...#
#....M...#
#....M.G.#
#........#
#........#
##########
```

初始状态:
```text
##########
#...BS...#
#....@...#
#....M...#
#....M.G.#
#........#
#........#
##########
```

动作回放:
- 1. down: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
##########
#...BS...#
#........#
#....@...#
#....M.G.#
#....M...#
#........#
##########
```

最终状态:
```text
##########
#...BS...#
#........#
#....@...#
#....M.G.#
#....M...#
#........#
##########
```
变化格: (5,2) @->.; (5,3) M->@; (5,5) .->M

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,2\|C:\|M:5,4;5,5\|PL:none\|BS:B:4,1;S:5,1 |
| down | yes | push_object:sticky#1,move_sticky_rigid | Ply:5,4\|C:\|M:5,5;5,6\|PL:none\|BS:B:4,1;S:5,1 |
| left | yes | walk | Ply:4,3\|C:\|M:5,4;5,5\|PL:none\|BS:B:4,1;S:5,1 |
| right | yes | walk | Ply:6,3\|C:\|M:5,4;5,5\|PL:none\|BS:B:4,1;S:5,1 |

回到初始: yes, depth=11, path=left down down down right up left up up up right
局部可达图: status=complete, states=17072, transitions=38062, winStates=799, maxDepth=14
事件类型: anchor_boundary_shift:box_sticky=441, box_to_sticky:n1=234, box_to_sticky:n2=10, force_chain:n2=86, move_sticky_rigid=864, push_object:box_sticky_anchor=424, push_object:crate#1=1052, push_object:crate#2=633, push_object:sticky#1=842, push_object:sticky#2=16, sticky_merge:n1=37, sticky_to_box:n1=72, sticky_to_box:n2=33, walk=35095

