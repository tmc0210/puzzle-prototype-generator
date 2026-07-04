# 冰原起点比较：ICE_EXP_META_2026_07_02_round41_round38_reverse_probe_goal_A

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,3]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 3

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,3] | pass | yes | 0 | yes | none | none | complete, states=25016, wins=1 | states=5, out=1, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |
| [11,0] | fail | no | n/a | yes | none | none | complete, states=4763, wins=0 | states=19, out=3, winOut=0, deadOut=3, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [26,5] | fail | no | n/a | yes | none | none | complete, states=125, wins=0 | states=9, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [0,3]

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
- 可达状态: 25016
- 合法转移: 59155
- 仅事件非法转移: 1716
- Forbidden reachable hits: none
- 事件计数: walk=57690, push_ice=1465, ice_rebound_d4=404, ice_stop_short:d1=936, push_ice_failed=1716, ice_destroyed_d3=89, ice_stop_short:d2=36

### 起点 [11,0]

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
- 可达状态: 4763
- 合法转移: 11465
- 仅事件非法转移: 358
- Forbidden reachable hits: none
- 事件计数: walk=11216, push_ice=249, ice_rebound_d4=66, ice_stop_short:d1=167, push_ice_failed=358, ice_stop_short:d2=8, ice_destroyed_d3=8

### 起点 [26,5]

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
- 可达状态: 125
- 合法转移: 297
- 仅事件非法转移: 12
- Forbidden reachable hits: none
- 事件计数: walk=294, push_ice=3, ice_stop_short:d1=3, push_ice_failed=12
