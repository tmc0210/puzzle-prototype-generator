# 冰原起点比较：round54_v10_AB_to_D_risk

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,10]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,6] | fail | no | n/a | yes | none | none | complete, states=847, wins=0 | states=9, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [7,0] | fail | no | n/a | yes | none | none | complete, states=140, wins=0 | states=34, out=2, winOut=0, deadOut=2, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

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
- 可达状态: 847
- 合法转移: 2050
- 仅事件非法转移: 38
- Forbidden reachable hits: none
- 事件计数: walk=2018, push_ice=32, ice_blocks_ice_no_chain_push=6, ice_rebound_d4=3, ice_stop_short:d1=19, push_ice_failed=38, ice_boundary_disappear:d6=2, ice_stop_short:d2=5, ice_destroyed_d3=3

### 起点 [7,0]

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
- 可达状态: 140
- 合法转移: 352
- 仅事件非法转移: 6
- Forbidden reachable hits: none
- 事件计数: walk=348, push_ice=4, ice_stop_short:d1=4, push_ice_failed=6
