# 冰原起点比较：ICE_EXP_META_2026_07_02_round42_cross_target_probe_v1_interface_goal_B

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [13,6]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,6] | fail | no | n/a | yes | none | none | complete, states=57, wins=0 | states=8, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [13,6] | pass | yes | 0 | yes | none | none | complete, states=2, wins=1 | states=2, out=0, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |
| [6,0] | fail | no | n/a | yes | none | none | complete, states=6, wins=0 | states=6, out=0, winOut=0, deadOut=0, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [6,13] | fail | no | n/a | yes | none | none | complete, states=9, wins=0 | states=9, out=0, winOut=0, deadOut=0, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [0,6]

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
- 可达状态: 57
- 合法转移: 116
- 仅事件非法转移: 2
- Forbidden reachable hits: none
- 事件计数: walk=114, push_ice=2, ice_rebound_d4=1, ice_stop_short:d1=1, push_ice_failed=2

### 起点 [13,6]

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
- 可达状态: 2
- 合法转移: 2
- 仅事件非法转移: 0
- Forbidden reachable hits: none
- 事件计数: walk=2

### 起点 [6,0]

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
- 可达状态: 6
- 合法转移: 10
- 仅事件非法转移: 0
- Forbidden reachable hits: none
- 事件计数: walk=10

### 起点 [6,13]

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
- 可达状态: 9
- 合法转移: 16
- 仅事件非法转移: 1
- Forbidden reachable hits: none
- 事件计数: walk=16, push_ice_failed=1
