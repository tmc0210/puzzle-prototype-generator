# 机制局部实验: ra_struct_fixed_boundary_split_pocket_01

- 原型: reality_anchor
- 生成时间: 2026-07-07T05:24:48.776Z
- 标题: 固定 B/S 边界切开刚体后被单格目标袋消费
- 备注: Reality Anchor 的 explorer run。本轮范围只看横向 sticky 二连块跨过固定 B/S 边界后，是否被切成 C+M，并由单格目标袋消费；不进入关卡设计，不读取历史设计归档、候选包、报告、采样配置或旧实验 run 材料。

## 结构族摘要

### fixed_boundary_split_pocket_consumption
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| split_tail_single_pocket_pass | sticky_pair_crosses_boundary_into_single_pocket | B/S 边界位于推后左格与右格之间；横向 sticky 二连块先被切成 C+M，再尝试只把左格推入目标袋 | all_sticky_single_pocket_block, all_sticky_two_cell_pocket_pass, all_box_single_pocket_pass | unknown exhausted: depth budget exceeded | down, left, right | up:force_blocked | complete / 1084 states |
| all_sticky_single_pocket_block | sticky_pair_stays_rigid_with_single_pocket | B/S 边界更靠左；推后两格仍在 sticky side，保持横向刚体，袋口右上格是墙 | split_tail_single_pocket_pass | not applicable: replay stopped at illegal action; return search skipped | left, right | up:force_blocked, down:force_blocked | complete / 888 states |
| all_sticky_two_cell_pocket_pass | sticky_pair_stays_rigid_with_two_cell_pocket | 保留未切开的横向 sticky 刚体，但打开右上格，形成双格目标袋 | all_sticky_single_pocket_block | unknown exhausted: depth budget exceeded | down, left, right | up:force_blocked | complete / 1359 states |
| all_box_single_pocket_pass | crate_pair_single_pocket | 同形横向二连资源保持为两个 crate；单格目标袋只消费左格 | split_tail_single_pocket_pass, all_sticky_single_pocket_block | unknown exhausted: depth budget exceeded | down, left, right | up:force_blocked | complete / 1079 states |

## split_tail_single_pocket_pass

结构族: fixed_boundary_split_pocket_consumption
变体: sticky_pair_crosses_boundary_into_single_pocket
变化变量: B/S 边界位于推后左格与右格之间；横向 sticky 二连块先被切成 C+M，再尝试只把左格推入目标袋
对照: all_sticky_single_pocket_block, all_sticky_two_cell_pocket_pass, all_box_single_pocket_pass

问题: 同一串动作中，固定边界切出的 C+M 是否允许左格 crate 单独上推进目标袋？
动作序列: left down left left up
反事实禁用: 无
预算: exploreDepth=12, returnDepth=18, maxStates=20000, maxTransitions=80000

layout:
```text
########
#..G#..#
#...MM@#
#......#
#..BS..#
########
```

初始状态:
```text
########
#..G#..#
#...MM@#
#......#
#..BS..#
########
```

动作回放:
- 1. left: legal; events=push_object:sticky#1,move_sticky_rigid,sticky_to_box:n1; eventWin=no
```text
########
#..G#..#
#..CM@.#
#......#
#..BS..#
########
```
- 2. down: legal; events=walk; eventWin=no
```text
########
#..G#..#
#..CM..#
#....@.#
#..BS..#
########
```
- 3. left: legal; events=walk; eventWin=no
```text
########
#..G#..#
#..CM..#
#...@..#
#..BS..#
########
```
- 4. left: legal; events=walk; eventWin=no
```text
########
#..G#..#
#..CM..#
#..@...#
#..BS..#
########
```
- 5. up: legal; events=push_object:crate#1; eventWin=no
```text
########
#..*#..#
#..@M..#
#......#
#..BS..#
########
```

最终状态:
```text
########
#..*#..#
#..@M..#
#......#
#..BS..#
########
```
变化格: (3,1) G->*; (3,2) .->@; (5,2) M->.; (6,2) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | force_blocked |
| down | yes | walk | Ply:3,3\|C:3,1\|M:4,2\|PL:none\|BS:B:3,4;S:4,4 |
| left | yes | walk | Ply:2,2\|C:3,1\|M:4,2\|PL:none\|BS:B:3,4;S:4,4 |
| right | yes | push_object:sticky#1,move_sticky_rigid | Ply:4,2\|C:3,1\|M:5,2\|PL:none\|BS:B:3,4;S:4,4 |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=1084, transitions=2202, winStates=15, maxDepth=12
事件类型: anchor_boundary_shift:box_sticky=61, box_to_sticky:n1=26, force_chain:n2=24, move_sticky_rigid=70, push_object:box_sticky_anchor=58, push_object:crate#1=53, push_object:crate#2=46, push_object:sticky#1=65, sticky_merge:n1=10, sticky_to_box:n1=20, walk=1980

## all_sticky_single_pocket_block

结构族: fixed_boundary_split_pocket_consumption
变体: sticky_pair_stays_rigid_with_single_pocket
变化变量: B/S 边界更靠左；推后两格仍在 sticky side，保持横向刚体，袋口右上格是墙
对照: split_tail_single_pocket_pass

问题: 如果二连块没有被边界切开，同一单格目标袋是否会因为刚体右格撞墙而拒绝上推？
动作序列: left down left left up
反事实禁用: 无
预算: exploreDepth=12, returnDepth=18, maxStates=20000, maxTransitions=80000

layout:
```text
########
#..G#..#
#...MM@#
#......#
#.BS...#
########
```

初始状态:
```text
########
#..G#..#
#...MM@#
#......#
#.BS...#
########
```

动作回放:
- 1. left: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
########
#..G#..#
#..MM@.#
#......#
#.BS...#
########
```
- 2. down: legal; events=walk; eventWin=no
```text
########
#..G#..#
#..MM..#
#....@.#
#.BS...#
########
```
- 3. left: legal; events=walk; eventWin=no
```text
########
#..G#..#
#..MM..#
#...@..#
#.BS...#
########
```
- 4. left: legal; events=walk; eventWin=no
```text
########
#..G#..#
#..MM..#
#..@...#
#.BS...#
########
```
- 5. up: illegal (force_blocked); events=-; eventWin=no
```text
########
#..G#..#
#..MM..#
#..@...#
#.BS...#
########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
########
#..G#..#
#..MM..#
#..@...#
#.BS...#
########
```
变化格: (3,2) .->M; (5,2) M->.; (6,2) @->.; (3,3) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | force_blocked |
| down | no | - | force_blocked |
| left | yes | walk | Ply:2,3\|C:\|M:3,2;4,2\|PL:none\|BS:B:2,4;S:3,4 |
| right | yes | walk | Ply:4,3\|C:\|M:3,2;4,2\|PL:none\|BS:B:2,4;S:3,4 |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=888, transitions=1816, winStates=12, maxDepth=12
事件类型: anchor_boundary_shift:box_sticky=46, box_to_sticky:n1=20, force_chain:n2=8, move_sticky_rigid=80, push_object:box_sticky_anchor=45, push_object:crate#1=32, push_object:crate#2=16, push_object:sticky#1=76, sticky_merge:n1=6, sticky_to_box:n1=16, walk=1647

## all_sticky_two_cell_pocket_pass

结构族: fixed_boundary_split_pocket_consumption
变体: sticky_pair_stays_rigid_with_two_cell_pocket
变化变量: 保留未切开的横向 sticky 刚体，但打开右上格，形成双格目标袋
对照: all_sticky_single_pocket_block

问题: 如果袋口同时容纳刚体两格，未切开的横向 sticky 二连块是否可以整体上推？
动作序列: left down left left up
反事实禁用: 无
预算: exploreDepth=12, returnDepth=18, maxStates=20000, maxTransitions=80000

layout:
```text
########
#..G...#
#...MM@#
#......#
#.BS...#
########
```

初始状态:
```text
########
#..G...#
#...MM@#
#......#
#.BS...#
########
```

动作回放:
- 1. left: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
########
#..G...#
#..MM@.#
#......#
#.BS...#
########
```
- 2. down: legal; events=walk; eventWin=no
```text
########
#..G...#
#..MM..#
#....@.#
#.BS...#
########
```
- 3. left: legal; events=walk; eventWin=no
```text
########
#..G...#
#..MM..#
#...@..#
#.BS...#
########
```
- 4. left: legal; events=walk; eventWin=no
```text
########
#..G...#
#..MM..#
#..@...#
#.BS...#
########
```
- 5. up: legal; events=push_object:sticky#1,move_sticky_rigid; eventWin=no
```text
########
#..mM..#
#..@...#
#......#
#.BS...#
########
```

最终状态:
```text
########
#..mM..#
#..@...#
#......#
#.BS...#
########
```
变化格: (3,1) G->m; (4,1) .->M; (3,2) .->@; (4,2) M->.; (5,2) M->.; (6,2) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | force_blocked |
| down | yes | walk | Ply:3,3\|C:\|M:3,1;4,1\|PL:none\|BS:B:2,4;S:3,4 |
| left | yes | walk | Ply:2,2\|C:\|M:3,1;4,1\|PL:none\|BS:B:2,4;S:3,4 |
| right | yes | walk | Ply:4,2\|C:\|M:3,1;4,1\|PL:none\|BS:B:2,4;S:3,4 |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=1359, transitions=2834, winStates=18, maxDepth=12
事件类型: anchor_boundary_shift:box_sticky=72, box_to_sticky:n1=29, box_to_sticky:n2=1, force_chain:n2=10, move_sticky_rigid=150, push_object:box_sticky_anchor=71, push_object:crate#1=50, push_object:crate#2=23, push_object:sticky#1=142, push_object:sticky#2=2, sticky_merge:n1=14, sticky_to_box:n1=28, sticky_to_box:n2=1, walk=2546

## all_box_single_pocket_pass

结构族: fixed_boundary_split_pocket_consumption
变体: crate_pair_single_pocket
变化变量: 同形横向二连资源保持为两个 crate；单格目标袋只消费左格
对照: split_tail_single_pocket_pass, all_sticky_single_pocket_block

问题: 如果二连资源本来就是可分离 crate，单格目标袋是否也能只消费左格？
动作序列: left down left left up
反事实禁用: 无
预算: exploreDepth=12, returnDepth=18, maxStates=20000, maxTransitions=80000

layout:
```text
########
#..G#..#
#...CC@#
#......#
#....BS#
########
```

初始状态:
```text
########
#..G#..#
#...CC@#
#......#
#....BS#
########
```

动作回放:
- 1. left: legal; events=push_object:crate#2,force_chain:n2; eventWin=no
```text
########
#..G#..#
#..CC@.#
#......#
#....BS#
########
```
- 2. down: legal; events=walk; eventWin=no
```text
########
#..G#..#
#..CC..#
#....@.#
#....BS#
########
```
- 3. left: legal; events=walk; eventWin=no
```text
########
#..G#..#
#..CC..#
#...@..#
#....BS#
########
```
- 4. left: legal; events=walk; eventWin=no
```text
########
#..G#..#
#..CC..#
#..@...#
#....BS#
########
```
- 5. up: legal; events=push_object:crate#1; eventWin=no
```text
########
#..*#..#
#..@C..#
#......#
#....BS#
########
```

最终状态:
```text
########
#..*#..#
#..@C..#
#......#
#....BS#
########
```
变化格: (3,1) G->*; (3,2) .->@; (5,2) C->.; (6,2) @->.

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | force_blocked |
| down | yes | walk | Ply:3,3\|C:3,1;4,2\|M:\|PL:none\|BS:B:5,4;S:6,4 |
| left | yes | walk | Ply:2,2\|C:3,1;4,2\|M:\|PL:none\|BS:B:5,4;S:6,4 |
| right | yes | push_object:crate#2 | Ply:4,2\|C:3,1;5,2\|M:\|PL:none\|BS:B:5,4;S:6,4 |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=1079, transitions=2248, winStates=15, maxDepth=12
事件类型: box_to_sticky:n1=16, force_chain:n2=8, move_sticky_rigid=4, push_object:crate#1=89, push_object:crate#2=97, push_object:sticky#1=4, walk=2058

