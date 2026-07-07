# 机制局部实验: ra_struct_rigid_tooth_consume_01

- 原型: reality_anchor
- 生成时间: 2026-07-07T04:24:45.456Z
- 标题: 竖向 sticky 刚体被墙齿目标口消费
- 备注: Reality Anchor 的 explorer run。本轮范围只看局部 B/S 归一化与 sticky merge 产物如何被一格墙齿目标口消费；不进入关卡设计，不读取历史设计归档、候选包、报告、采样配置或旧实验 run 材料。

## 结构族摘要

### rigid_tooth_mouth_consumption
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| rigid_pair_tooth_block | vertical_sticky_pair_with_upper_tooth | 双格竖向 sticky 刚体；上沿目标格被墙齿阻挡，下沿是目标口 | crate_pair_tooth_lower_pass, rigid_pair_open_mouth_pass, single_sticky_tooth_pass | not applicable: replay stopped at illegal action; return search skipped | - | up:destination_blocked, down:force_blocked, left:destination_blocked, right:force_blocked | complete / 1 states |
| crate_pair_tooth_lower_pass | vertical_crate_pair_with_upper_tooth | 同形竖排对象保持为两个 crate；B/S 边界远置在右侧箱子区域 | rigid_pair_tooth_block | no complete | down, left, right | up:force_blocked | complete / 2 states |
| rigid_pair_open_mouth_pass | vertical_sticky_pair_with_two_cell_mouth | 保留双格 sticky 刚体，但移除上沿墙齿，形成双格宽通过口 | rigid_pair_tooth_block | no complete | up, left, right | down:destination_blocked | complete / 2 states |
| single_sticky_tooth_pass | single_sticky_with_upper_tooth | 保留墙齿和 sticky side，但移除上方相邻 sticky，避免 merge 成双格刚体 | rigid_pair_tooth_block | no complete | left, right | up:destination_blocked, down:destination_blocked | complete / 2 states |

## rigid_pair_tooth_block

结构族: rigid_tooth_mouth_consumption
变体: vertical_sticky_pair_with_upper_tooth
变化变量: 双格竖向 sticky 刚体；上沿目标格被墙齿阻挡，下沿是目标口
对照: crate_pair_tooth_lower_pass, rigid_pair_open_mouth_pass, single_sticky_tooth_pass

问题: 同一格向右输入是否会因为刚体另一格撞墙而无法把下格送入目标口？
动作序列: right
反事实禁用: 无
预算: exploreDepth=12, returnDepth=16, maxStates=10000, maxTransitions=40000

layout:
```text
#######
###M# #
##@MG #
#BS#  #
#######
```

初始状态:
```text
#######
###M#.#
##@MG.#
#BS#..#
#######
```

动作回放:
- 1. right: illegal (force_blocked); events=-; eventWin=no
```text
#######
###M#.#
##@MG.#
#BS#..#
#######
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
#######
###M#.#
##@MG.#
#BS#..#
#######
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | force_blocked |
| left | no | - | destination_blocked |
| right | no | - | force_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=1, transitions=0, winStates=0, maxDepth=0
事件类型: 无

## crate_pair_tooth_lower_pass

结构族: rigid_tooth_mouth_consumption
变体: vertical_crate_pair_with_upper_tooth
变化变量: 同形竖排对象保持为两个 crate；B/S 边界远置在右侧箱子区域
对照: rigid_pair_tooth_block

问题: 墙齿只挡住上方 crate 的右侧时，下方 crate 是否仍可单独进入目标口？
动作序列: right
反事实禁用: 无
预算: exploreDepth=12, returnDepth=16, maxStates=10000, maxTransitions=40000

layout:
```text
#######
###C# #
##@CG #
### BS#
#######
```

初始状态:
```text
#######
###C#.#
##@CG.#
###.BS#
#######
```

动作回放:
- 1. right: legal; events=push_object:crate#2; eventWin=no
```text
#######
###C#.#
##.@*.#
###.BS#
#######
```

最终状态:
```text
#######
###C#.#
##.@*.#
###.BS#
#######
```
变化格: (2,2) @->.; (3,2) C->@; (4,2) G->*

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | force_blocked |
| down | yes | walk | Ply:3,3\|C:3,1;4,2\|M:\|PL:none\|BS:B:4,3;S:5,3 |
| left | yes | walk | Ply:2,2\|C:3,1;4,2\|M:\|PL:none\|BS:B:4,3;S:5,3 |
| right | yes | push_object:crate#2,box_to_sticky:n1 | Ply:4,2\|C:3,1\|M:5,2\|PL:none\|BS:B:4,3;S:5,3 |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=2, transitions=1, winStates=1, maxDepth=1
事件类型: push_object:crate#2=1

## rigid_pair_open_mouth_pass

结构族: rigid_tooth_mouth_consumption
变体: vertical_sticky_pair_with_two_cell_mouth
变化变量: 保留双格 sticky 刚体，但移除上沿墙齿，形成双格宽通过口
对照: rigid_pair_tooth_block

问题: 如果刚体两格前方都开放，双格 sticky 输出是否能整体进入目标口？
动作序列: right
反事实禁用: 无
预算: exploreDepth=12, returnDepth=16, maxStates=10000, maxTransitions=40000

layout:
```text
#######
###M  #
##@MG #
#BS#  #
#######
```

初始状态:
```text
#######
###M..#
##@MG.#
#BS#..#
#######
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
#######
###.M.#
##.@m.#
#BS#..#
#######
```

最终状态:
```text
#######
###.M.#
##.@m.#
#BS#..#
#######
```
变化格: (3,1) M->.; (4,1) .->M; (2,2) @->.; (3,2) M->@; (4,2) G->m

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:3,1\|C:\|M:4,1;4,2\|PL:none\|BS:B:1,3;S:2,3 |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:2,2\|C:\|M:4,1;4,2\|PL:none\|BS:B:1,3;S:2,3 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:4,2\|C:\|M:5,1;5,2\|PL:none\|BS:B:1,3;S:2,3 |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=2, transitions=1, winStates=1, maxDepth=1
事件类型: move_sticky_rigid=1, push_object:sticky#1=1

## single_sticky_tooth_pass

结构族: rigid_tooth_mouth_consumption
变体: single_sticky_with_upper_tooth
变化变量: 保留墙齿和 sticky side，但移除上方相邻 sticky，避免 merge 成双格刚体
对照: rigid_pair_tooth_block

问题: 同样墙齿下，单格 sticky 是否像单箱一样能进入下方目标口？
动作序列: right
反事实禁用: 无
预算: exploreDepth=12, returnDepth=16, maxStates=10000, maxTransitions=40000

layout:
```text
#######
####  #
##@MG #
#BS#  #
#######
```

初始状态:
```text
#######
####..#
##@MG.#
#BS#..#
#######
```

动作回放:
- 1. right: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
#######
####..#
##.@m.#
#BS#..#
#######
```

最终状态:
```text
#######
####..#
##.@m.#
#BS#..#
#######
```
变化格: (2,2) @->.; (3,2) M->@; (4,2) G->m

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | yes | walk | Ply:2,2\|C:\|M:4,2\|PL:none\|BS:B:1,3;S:2,3 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:4,2\|C:\|M:5,2\|PL:none\|BS:B:1,3;S:2,3 |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=2, transitions=1, winStates=1, maxDepth=1
事件类型: move_sticky_rigid=1, push_object:sticky#1=1

