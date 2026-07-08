# 机制局部实验: ra_loop_pull_boundary_mobility_20260708_01_pl_boundary_multi_box_force_chain

- 原型: reality_anchor
- 生成时间: 2026-07-08T03:56:08.644Z
- 标题: P/L 边界多箱力链探针
- 备注: 真 P/L 跨界局部探针：P 侧推链对照 L 侧近端抽取、前格门和打开口袋的 consumer。

## 结构族摘要

### pl_boundary_chain_extract
| case | variant | changed variable | contrast | return | final legal | final illegal | graph |
| --- | --- | --- | --- | --- | --- | --- | --- |
| pl_chain2_pull_extract_near_end | chain2_extract | P 侧链长为两个箱子；L 侧把手贴近链的近端 | pl_chain3_pull_extract_near_end, pl_chain2_pull_front_gate_blocked | unknown exhausted: depth budget exceeded | up, down, right | left:pull_world_front_blocked | complete / 1655 states |
| pl_chain3_pull_extract_near_end | chain3_extract | P 侧链长为三个箱子；L 侧把手位置保持相同 | pl_chain2_pull_extract_near_end | unknown exhausted: state budget exceeded | up, down, right | left:pull_world_front_blocked | complete / 2982 states |
| pl_chain2_pull_front_gate_blocked | front_gate_blocked | L 侧玩家前格被占用，同时身后一格有可被抽取的箱子 | pl_chain2_pull_extract_near_end | not applicable: replay stopped at illegal action; return search skipped | up, down | left:pull_world_front_blocked, right:pull_world_front_blocked | complete / 1629 states |
| pl_chain2_pull_opens_lower_pocket | opened_pocket_consumer | L 侧被抽出的近端箱让出通往下方口袋的唯一口 | pl_chain2_pull_extract_near_end, pl_chain2_pull_front_gate_blocked | no complete | up | down:destination_blocked, left:destination_blocked, right:destination_blocked | complete / 100 states |

## pl_chain2_pull_extract_near_end: 二箱 P 推链后由 L 侧抽近端

结构族: pl_boundary_chain_extract
变体: chain2_extract
变化变量: P 侧链长为两个箱子；L 侧把手贴近链的近端
对照: pl_chain3_pull_extract_near_end, pl_chain2_pull_front_gate_blocked

问题: P 侧二箱力链在玩家跨到 L 侧后，是否退化为只抽近端的单箱资源分配？
备注: active_rule=P/L push-chain vs pull-extract semantics；consumer=侧向通路保证真实跨界。
动作序列: right up right right right down right
反事实禁用: 无
预算: exploreDepth=10, returnDepth=18, maxStates=12000, maxTransitions=48000

layout:
```text
##########
####PL####
##########
#........#
#.@CC...G#
#........#
#........#
##########
```

初始状态:
```text
##########
####PL####
##########
#........#
#.@CC...G#
#........#
#........#
##########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,force_chain:n2; eventWin=no
```text
##########
####PL####
##########
#........#
#..@CC..G#
#........#
#........#
##########
```
- 2. up: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#..@.....#
#...CC..G#
#........#
#........#
##########
```
- 3. right: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#...@....#
#...CC..G#
#........#
#........#
##########
```
- 4. right: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#....@...#
#...CC..G#
#........#
#........#
##########
```
- 5. right: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#.....@..#
#...CC..G#
#........#
#........#
##########
```
- 6. down: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#........#
#...CC@.G#
#........#
#........#
##########
```
- 7. right: legal; events=pull_object:crate#2; eventWin=no
```text
##########
####PL####
##########
#........#
#...C.C@G#
#........#
#........#
##########
```

最终状态:
```text
##########
####PL####
##########
#........#
#...C.C@G#
#........#
#........#
##########
```
变化格: (2,4) @->.; (3,4) C->.; (6,4) .->C; (7,4) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:7,3\|C:4,4;6,4\|M:\|PL:P:4,1;L:5,1\|BS:none |
| down | yes | walk | Ply:7,5\|C:4,4;6,4\|M:\|PL:P:4,1;L:5,1\|BS:none |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:crate#2 | Ply:8,4\|C:4,4;7,4\|M:\|PL:P:4,1;L:5,1\|BS:none |

回到初始: unknown (exhausted: depth budget exceeded; 不可当作 no)
局部可达图: status=complete, states=1655, transitions=3517, winStates=0, maxDepth=10
事件类型: force_chain:n2=7, pull_object:crate#1=55, pull_object:crate#2=71, push_object:crate#1=83, push_object:crate#2=85, walk=3223

## pl_chain3_pull_extract_near_end: 三箱 P 推链后由 L 侧抽近端

结构族: pl_boundary_chain_extract
变体: chain3_extract
变化变量: P 侧链长为三个箱子；L 侧把手位置保持相同
对照: pl_chain2_pull_extract_near_end

问题: 把 P 侧推链延长到三箱后，同一个 L 侧抽取是否留下不同的残余资源？
备注: active_rule=P/L push-chain vs pull-extract semantics；旋钮=链长。
动作序列: right up right right right right down right
反事实禁用: 无
预算: exploreDepth=10, returnDepth=18, maxStates=12000, maxTransitions=48000

layout:
```text
##########
####PL####
##########
#........#
#@CCC...G#
#........#
#........#
##########
```

初始状态:
```text
##########
####PL####
##########
#........#
#@CCC...G#
#........#
#........#
##########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,force_chain:n3; eventWin=no
```text
##########
####PL####
##########
#........#
#.@CCC..G#
#........#
#........#
##########
```
- 2. up: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#.@......#
#..CCC..G#
#........#
#........#
##########
```
- 3. right: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#..@.....#
#..CCC..G#
#........#
#........#
##########
```
- 4. right: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#...@....#
#..CCC..G#
#........#
#........#
##########
```
- 5. right: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#....@...#
#..CCC..G#
#........#
#........#
##########
```
- 6. right: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#.....@..#
#..CCC..G#
#........#
#........#
##########
```
- 7. down: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#........#
#..CCC@.G#
#........#
#........#
##########
```
- 8. right: legal; events=pull_object:crate#3; eventWin=no
```text
##########
####PL####
##########
#........#
#..CC.C@G#
#........#
#........#
##########
```

最终状态:
```text
##########
####PL####
##########
#........#
#..CC.C@G#
#........#
#........#
##########
```
变化格: (1,4) @->.; (2,4) C->.; (6,4) .->C; (7,4) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:7,3\|C:3,4;4,4;6,4\|M:\|PL:P:4,1;L:5,1\|BS:none |
| down | yes | walk | Ply:7,5\|C:3,4;4,4;6,4\|M:\|PL:P:4,1;L:5,1\|BS:none |
| left | no | - | pull_world_front_blocked |
| right | yes | pull_object:crate#3 | Ply:8,4\|C:3,4;4,4;7,4\|M:\|PL:P:4,1;L:5,1\|BS:none |

回到初始: unknown (exhausted: state budget exceeded; 不可当作 no)
局部可达图: status=complete, states=2982, transitions=5437, winStates=1, maxDepth=10
事件类型: force_chain:n2=45, force_chain:n3=4, pull_object:crate#1=47, pull_object:crate#2=68, pull_object:crate#3=78, push_object:crate#1=170, push_object:crate#2=145, push_object:crate#3=171, walk=4758

## pl_chain2_pull_front_gate_blocked: L 侧前格门阻止身后箱抽取

结构族: pl_boundary_chain_extract
变体: front_gate_blocked
变化变量: L 侧玩家前格被占用，同时身后一格有可被抽取的箱子
对照: pl_chain2_pull_extract_near_end

问题: P 侧推链建立后，即使 L 侧身后一格有箱子，前格占用是否仍会拒绝 pull？
备注: active_rule=P 侧 force_chain setup 后的 L pull 前格门。
动作序列: right up right right right down right
反事实禁用: 无
预算: exploreDepth=10, returnDepth=18, maxStates=12000, maxTransitions=48000

layout:
```text
##########
####PL####
##########
#........#
#.@CC..CG#
#........#
#........#
##########
```

初始状态:
```text
##########
####PL####
##########
#........#
#.@CC..CG#
#........#
#........#
##########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,force_chain:n2; eventWin=no
```text
##########
####PL####
##########
#........#
#..@CC.CG#
#........#
#........#
##########
```
- 2. up: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#..@.....#
#...CC.CG#
#........#
#........#
##########
```
- 3. right: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#...@....#
#...CC.CG#
#........#
#........#
##########
```
- 4. right: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#....@...#
#...CC.CG#
#........#
#........#
##########
```
- 5. right: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#.....@..#
#...CC.CG#
#........#
#........#
##########
```
- 6. down: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#........#
#...CC@CG#
#........#
#........#
##########
```
- 7. right: illegal (pull_world_front_blocked); events=-; eventWin=no
```text
##########
####PL####
##########
#........#
#...CC@CG#
#........#
#........#
##########
```
- 后续动作未继续回放，因为动作序列中出现 illegal step。

最终状态:
```text
##########
####PL####
##########
#........#
#...CC@CG#
#........#
#........#
##########
```
变化格: (2,4) @->.; (3,4) C->.; (5,4) .->C; (6,4) .->@

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:6,3\|C:4,4;5,4;7,4\|M:\|PL:P:4,1;L:5,1\|BS:none |
| down | yes | walk | Ply:6,5\|C:4,4;5,4;7,4\|M:\|PL:P:4,1;L:5,1\|BS:none |
| left | no | - | pull_world_front_blocked |
| right | no | - | pull_world_front_blocked |

回到初始: not applicable (replay stopped at illegal action; return search skipped)
局部可达图: status=complete, states=1629, transitions=3188, winStates=1, maxDepth=10
事件类型: force_chain:n2=6, force_chain:n3=1, pull_object:crate#1=42, pull_object:crate#2=44, pull_object:crate#3=64, push_object:crate#1=72, push_object:crate#2=41, push_object:crate#3=62, walk=2863

## pl_chain2_pull_opens_lower_pocket: L 抽取打开下方口袋入口

结构族: pl_boundary_chain_extract
变体: opened_pocket_consumer
变化变量: L 侧被抽出的近端箱让出通往下方口袋的唯一口
对照: pl_chain2_pull_extract_near_end, pl_chain2_pull_front_gate_blocked

问题: 近端 L pull 能否把 P 侧推链产物消费成后续移动 shortcut？
备注: active_rule=P/L push-chain vs pull-extract semantics；consumer=下方单格口袋入口。
动作序列: right up right right right down right up left left down down
反事实禁用: 无
预算: exploreDepth=10, returnDepth=18, maxStates=12000, maxTransitions=48000

layout:
```text
##########
####PL####
##########
#........#
#.@CC....#
#####G####
##########
```

初始状态:
```text
##########
####PL####
##########
#........#
#.@CC....#
#####G####
##########
```

动作回放:
- 1. right: legal; events=push_object:crate#1,force_chain:n2; eventWin=no
```text
##########
####PL####
##########
#........#
#..@CC...#
#####G####
##########
```
- 2. up: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#..@.....#
#...CC...#
#####G####
##########
```
- 3. right: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#...@....#
#...CC...#
#####G####
##########
```
- 4. right: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#....@...#
#...CC...#
#####G####
##########
```
- 5. right: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#.....@..#
#...CC...#
#####G####
##########
```
- 6. down: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#........#
#...CC@..#
#####G####
##########
```
- 7. right: legal; events=pull_object:crate#2; eventWin=no
```text
##########
####PL####
##########
#........#
#...C.C@.#
#####G####
##########
```
- 8. up: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#......@.#
#...C.C..#
#####G####
##########
```
- 9. left: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#.....@..#
#...C.C..#
#####G####
##########
```
- 10. left: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#....@...#
#...C.C..#
#####G####
##########
```
- 11. down: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#........#
#...C@C..#
#####G####
##########
```
- 12. down: legal; events=walk; eventWin=no
```text
##########
####PL####
##########
#........#
#...C.C..#
#####+####
##########
```

最终状态:
```text
##########
####PL####
##########
#........#
#...C.C..#
#####+####
##########
```
变化格: (2,4) @->.; (3,4) C->.; (6,4) .->C; (5,5) G->+

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | yes | walk | Ply:5,4\|C:4,4;6,4\|M:\|PL:P:4,1;L:5,1\|BS:none |
| down | no | - | destination_blocked |
| left | no | - | destination_blocked |
| right | no | - | destination_blocked |

回到初始: no (complete: search complete)
局部可达图: status=complete, states=100, transitions=218, winStates=0, maxDepth=10
事件类型: force_chain:n2=3, pull_object:crate#1=1, pull_object:crate#2=6, push_object:crate#1=4, walk=207

