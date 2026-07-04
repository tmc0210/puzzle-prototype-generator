# 冰原起点比较：round54_v8_AB_to_D_risk

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [17,10]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,6] | fail | no | n/a | yes | none | none | complete, states=1282, wins=0 | states=9, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [6,12] | fail | no | n/a | yes | none | none | complete, states=270, wins=0 | states=21, out=2, winOut=0, deadOut=2, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

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
- 可达状态: 1282
- 合法转移: 2931
- 仅事件非法转移: 50
- Forbidden reachable hits: none
- 事件计数: walk=2880, push_ice=51, ice_blocks_ice_no_chain_push=28, ice_rebound_d4=12, ice_stop_short:d1=32, push_ice_failed=50, ice_stop_short:d2=5, ice_destroyed_d3=2

### 起点 [6,12]

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
- 可达状态: 270
- 合法转移: 634
- 仅事件非法转移: 8
- Forbidden reachable hits: none
- 事件计数: walk=624, push_ice=10, ice_stop_short:d1=8, push_ice_failed=8, ice_blocks_ice_no_chain_push=6, ice_rebound_d4=2
