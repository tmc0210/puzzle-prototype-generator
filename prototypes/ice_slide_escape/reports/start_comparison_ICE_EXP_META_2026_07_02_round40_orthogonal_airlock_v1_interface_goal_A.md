# 冰原起点比较：ICE_EXP_META_2026_07_02_round40_orthogonal_airlock_v1_interface_goal_A

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,5]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | pass | yes | 0 | yes | none | none | complete, states=476, wins=1 | states=9, out=1, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |
| [13,5] | fail | no | n/a | yes | none | none | complete, states=481, wins=0 | states=6, out=2, winOut=0, deadOut=2, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [13,4] | fail | no | n/a | yes | none | none | complete, states=481, wins=0 | states=6, out=2, winOut=0, deadOut=2, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [13,2] | fail | no | n/a | yes | none | none | complete, states=536, wins=0 | states=11, out=4, winOut=0, deadOut=4, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [0,5]

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
- 可达状态: 476
- 合法转移: 1065
- 仅事件非法转移: 58
- Forbidden reachable hits: none
- 事件计数: walk=1030, push_ice=35, ice_boundary_disappear:d4=1, ice_stop_short:d1=13, push_ice_failed=58, ice_stop_short:d2=4, ice_blocks_ice_no_chain_push=5, ice_rebound_d4=4, ice_boundary_disappear:d12=3, ice_boundary_disappear:d1=7, ice_boundary_disappear:d9=1, ice_boundary_disappear:d3=1, ice_boundary_disappear:d10=1

### 起点 [13,5]

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
- 可达状态: 481
- 合法转移: 1077
- 仅事件非法转移: 63
- Forbidden reachable hits: none
- 事件计数: walk=1040, ice_blocks_ice_no_chain_push=6, push_ice_failed=63, push_ice=37, ice_stop_short:d2=5, ice_boundary_disappear:d9=3, ice_stop_short:d1=13, ice_rebound_d4=4, ice_boundary_disappear:d1=7, ice_boundary_disappear:d12=3, ice_boundary_disappear:d3=1, ice_boundary_disappear:d10=1

### 起点 [13,4]

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
- 可达状态: 481
- 合法转移: 1077
- 仅事件非法转移: 63
- Forbidden reachable hits: none
- 事件计数: walk=1040, ice_blocks_ice_no_chain_push=6, push_ice_failed=63, push_ice=37, ice_stop_short:d2=5, ice_boundary_disappear:d9=3, ice_stop_short:d1=13, ice_rebound_d4=4, ice_boundary_disappear:d1=7, ice_boundary_disappear:d12=3, ice_boundary_disappear:d3=1, ice_boundary_disappear:d10=1

### 起点 [13,2]

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
- 可达状态: 536
- 合法转移: 1199
- 仅事件非法转移: 93
- Forbidden reachable hits: none
- 事件计数: walk=1150, push_ice=49, ice_stop_short:d1=20, push_ice_failed=93, ice_blocks_ice_no_chain_push=20, ice_stop_short:d2=9, ice_boundary_disappear:d1=6, ice_destroyed_d3=5, ice_boundary_disappear:d3=3, ice_boundary_disappear:d12=3, ice_boundary_disappear:d10=3
