# 冰原起点比较：ICE_EXP_META_2026_07_02_round37_cross_axis_target_debt_v1_interface_goal_C

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [11,0]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 3

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,3] | pass | yes | 20 | yes | none | none | complete, states=2770, wins=1 | states=5, out=1, winOut=1, deadOut=0, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [18,5] | fail | no | n/a | yes | none | none | complete, states=84, wins=0 | states=9, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [11,0] | pass | yes | 0 | yes | none | none | complete, states=525, wins=1 | states=19, out=3, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |

## 细节

### 起点 [0,3]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right down right down right right right right up left up right right right right up up up
- 返回解事件: walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 2770
- 合法转移: 6543
- 仅事件非法转移: 162
- Forbidden reachable hits: none
- 事件计数: walk=6396, push_ice=147, ice_rebound_d4=48, ice_stop_short:d1=90, push_ice_failed=162, ice_destroyed_d3=9, ice_blocks_ice_no_chain_push=2

### 起点 [18,5]

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
- 可达状态: 84
- 合法转移: 202
- 仅事件非法转移: 6
- Forbidden reachable hits: none
- 事件计数: walk=200, push_ice=2, ice_stop_short:d1=2, push_ice_failed=6

### 起点 [11,0]

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
- 可达状态: 525
- 合法转移: 1267
- 仅事件非法转移: 34
- Forbidden reachable hits: none
- 事件计数: walk=1244, push_ice=23, ice_rebound_d4=8, ice_stop_short:d1=15, push_ice_failed=34
