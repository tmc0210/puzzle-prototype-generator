# 冰原起点比较：ICE_EXP_META_2026_07_02_round39_l_ladder_v1_interface_goal_B

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [9,14]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,3] | pass | yes | 28 | yes | none | none | complete, states=2526, wins=1 | states=5, out=1, winOut=1, deadOut=0, dist=4 | branching_win_dag, forced=1/4 | none |
| [7,0] | pass | yes | 20 | yes | none | none | complete, states=979, wins=1 | states=17, out=2, winOut=1, deadOut=1, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [9,14] | pass | yes | 0 | yes | none | none | complete, states=185, wins=1 | states=14, out=2, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |
| [19,12] | fail | no | n/a | yes | none | none | complete, states=25, wins=0 | states=12, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [0,3]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right down right down right right right right up left down down down right down down down right down down left up down right down down
- 返回解事件: walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 2526
- 合法转移: 6063
- 仅事件非法转移: 203
- Forbidden reachable hits: none
- 事件计数: walk=5904, push_ice=159, ice_rebound_d4=68, ice_stop_short:d1=84, push_ice_failed=203, ice_boundary_disappear:d4=7

### 起点 [7,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down down down right down down down right down down left up down right down down
- 返回解事件: walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 979
- 合法转移: 2367
- 仅事件非法转移: 84
- Forbidden reachable hits: none
- 事件计数: walk=2308, push_ice=59, ice_stop_short:d1=35, push_ice_failed=84, ice_rebound_d4=24

### 起点 [9,14]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 185
- 合法转移: 451
- 仅事件非法转移: 16
- Forbidden reachable hits: none
- 事件计数: walk=440, push_ice_failed=16, push_ice=11, ice_stop_short:d1=7, ice_rebound_d4=4

### 起点 [19,12]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 25
- 合法转移: 61
- 仅事件非法转移: 2
- Forbidden reachable hits: none
- 事件计数: walk=60, push_ice=1, ice_stop_short:d1=1, push_ice_failed=2
