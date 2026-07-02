# 接口边缘扫描：ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_interface_edges

## Summary

- A/D->A/D: yes cost=0
- B/C->A/D: yes cost=46
- A/D->B/C: yes cost=34
- B/C->B/C: yes cost=0

- A=D=[0,3]
- B=C=[20,3]
- target_pairs: A->B, C->D == [0,3]->[20,3] and [20,3]->[0,3]
- external edge points: none beyond these two cells

## Goal A/D [0,3]

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,3]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,3] | pass | yes | 0 | yes | none | none | complete, states=109808, wins=1 | states=2064, out=100, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |
| [20,3] | pass | yes | 46 | yes | none | none | complete, states=109808, wins=1 | states=2064, out=100, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |

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
- 可达状态: 109808
- 合法转移: 243352
- 仅事件非法转移: 9344
- Forbidden reachable hits: none
- 事件计数: walk=235280, push_ice=8072, ice_stop_short:d1=4592, push_ice_failed=9344, ice_rebound_d4=3480

### 起点 [20,3]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left down down down left left down left left left down left left up right down left left left up left left left down left left up right left up left left down left left up up up right right up up left left down left
- 返回解事件: walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 109808
- 合法转移: 243352
- 仅事件非法转移: 9344
- Forbidden reachable hits: none
- 事件计数: walk=235280, push_ice=8072, ice_rebound_d4=3480, ice_stop_short:d1=4592, push_ice_failed=9344

## Goal B/C [20,3]

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [20,3]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,3] | pass | yes | 34 | yes | none | none | complete, states=109808, wins=1 | states=2064, out=100, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |
| [20,3] | pass | yes | 0 | yes | none | none | complete, states=109808, wins=1 | states=2064, out=100, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |

## 细节

### 起点 [0,3]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up right right down right right right down right right up left down right right right up right right right down right right up left down right right right up right right right
- 返回解事件: walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 109808
- 合法转移: 243352
- 仅事件非法转移: 9344
- Forbidden reachable hits: none
- 事件计数: walk=235280, push_ice=8072, ice_stop_short:d1=4592, push_ice_failed=9344, ice_rebound_d4=3480

### 起点 [20,3]

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
- 可达状态: 109808
- 合法转移: 243352
- 仅事件非法转移: 9344
- Forbidden reachable hits: none
- 事件计数: walk=235280, push_ice=8072, ice_rebound_d4=3480, ice_stop_short:d1=4592, push_ice_failed=9344

