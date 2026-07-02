# 接口边缘扫描：ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_interface_edges

## Summary

- A->A: yes cost=0
- B->A: no
- C->A: no
- D->A: no
- A->B: yes cost=47
- B->B: yes cost=0
- C->B: no
- D->B: no
- A->C: no
- B->C: no
- C->C: yes cost=0
- D->C: no
- A->D: no
- B->D: no
- C->D: yes cost=47
- D->D: yes cost=0

- A=[0,5], B=[27,5], C=[27,15], D=[0,15]
- target_pairs: A->B, C->D
- ignored_internal_reverse_pairs: C->A, C->B, D->A, D->B

## Goal A [0,5]

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
| [0,5] | pass | yes | 0 | yes | none | none | complete, states=1717, wins=1 | states=6, out=1, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |
| [27,5] | fail | no | n/a | yes | none | none | complete, states=27, wins=0 | states=13, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [27,15] | fail | no | n/a | yes | none | none | complete, states=1717, wins=0 | states=6, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [0,15] | fail | no | n/a | yes | none | none | complete, states=27, wins=0 | states=13, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

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
- 可达状态: 1717
- 合法转移: 3740
- 仅事件非法转移: 140
- Forbidden reachable hits: none
- 事件计数: walk=3614, push_ice=126, ice_rebound_d4=56, ice_stop_short:d1=70, push_ice_failed=140

### 起点 [27,5]

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
- 可达状态: 27
- 合法转移: 59
- 仅事件非法转移: 1
- Forbidden reachable hits: none
- 事件计数: walk=58, push_ice=1, ice_stop_short:d1=1, push_ice_failed=1

### 起点 [27,15]

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
- 可达状态: 1717
- 合法转移: 3740
- 仅事件非法转移: 140
- Forbidden reachable hits: none
- 事件计数: walk=3614, push_ice=126, ice_rebound_d4=56, ice_stop_short:d1=70, push_ice_failed=140

### 起点 [0,15]

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
- 可达状态: 27
- 合法转移: 59
- 仅事件非法转移: 1
- Forbidden reachable hits: none
- 事件计数: walk=58, push_ice=1, ice_stop_short:d1=1, push_ice_failed=1

## Goal B [27,5]

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [27,5]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | pass | yes | 47 | yes | none | none | complete, states=1717, wins=1 | states=6, out=1, winOut=1, deadOut=0, dist=6 | branching_win_dag, forced=1/6 | none |
| [27,5] | pass | yes | 0 | yes | none | none | complete, states=27, wins=1 | states=13, out=1, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |
| [27,15] | fail | no | n/a | yes | none | none | complete, states=1717, wins=0 | states=6, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [0,15] | fail | no | n/a | yes | none | none | complete, states=27, wins=0 | states=13, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up right right down right right right down right right up left down right right right up right right right down right right up left down right right right up right right right down right right up left down right right right up right right right
- 返回解事件: walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 1717
- 合法转移: 3740
- 仅事件非法转移: 140
- Forbidden reachable hits: none
- 事件计数: walk=3614, push_ice=126, ice_rebound_d4=56, ice_stop_short:d1=70, push_ice_failed=140

### 起点 [27,5]

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
- 可达状态: 27
- 合法转移: 59
- 仅事件非法转移: 1
- Forbidden reachable hits: none
- 事件计数: walk=58, push_ice=1, ice_stop_short:d1=1, push_ice_failed=1

### 起点 [27,15]

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
- 可达状态: 1717
- 合法转移: 3740
- 仅事件非法转移: 140
- Forbidden reachable hits: none
- 事件计数: walk=3614, push_ice=126, ice_rebound_d4=56, ice_stop_short:d1=70, push_ice_failed=140

### 起点 [0,15]

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
- 可达状态: 27
- 合法转移: 59
- 仅事件非法转移: 1
- Forbidden reachable hits: none
- 事件计数: walk=58, push_ice=1, ice_stop_short:d1=1, push_ice_failed=1

## Goal C [27,15]

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [27,15]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | fail | no | n/a | yes | none | none | complete, states=1717, wins=0 | states=6, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [27,5] | fail | no | n/a | yes | none | none | complete, states=27, wins=0 | states=13, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [27,15] | pass | yes | 0 | yes | none | none | complete, states=1717, wins=1 | states=6, out=1, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |
| [0,15] | fail | no | n/a | yes | none | none | complete, states=27, wins=0 | states=13, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [0,5]

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
- 可达状态: 1717
- 合法转移: 3740
- 仅事件非法转移: 140
- Forbidden reachable hits: none
- 事件计数: walk=3614, push_ice=126, ice_rebound_d4=56, ice_stop_short:d1=70, push_ice_failed=140

### 起点 [27,5]

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
- 可达状态: 27
- 合法转移: 59
- 仅事件非法转移: 1
- Forbidden reachable hits: none
- 事件计数: walk=58, push_ice=1, ice_stop_short:d1=1, push_ice_failed=1

### 起点 [27,15]

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
- 可达状态: 1717
- 合法转移: 3740
- 仅事件非法转移: 140
- Forbidden reachable hits: none
- 事件计数: walk=3614, push_ice=126, ice_rebound_d4=56, ice_stop_short:d1=70, push_ice_failed=140

### 起点 [0,15]

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
- 可达状态: 27
- 合法转移: 59
- 仅事件非法转移: 1
- Forbidden reachable hits: none
- 事件计数: walk=58, push_ice=1, ice_stop_short:d1=1, push_ice_failed=1

## Goal D [0,15]

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,15]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | fail | no | n/a | yes | none | none | complete, states=1717, wins=0 | states=6, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [27,5] | fail | no | n/a | yes | none | none | complete, states=27, wins=0 | states=13, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [27,15] | pass | yes | 47 | yes | none | none | complete, states=1717, wins=1 | states=6, out=1, winOut=1, deadOut=0, dist=6 | branching_win_dag, forced=1/6 | none |
| [0,15] | pass | yes | 0 | yes | none | none | complete, states=27, wins=1 | states=13, out=1, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |

## 细节

### 起点 [0,5]

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
- 可达状态: 1717
- 合法转移: 3740
- 仅事件非法转移: 140
- Forbidden reachable hits: none
- 事件计数: walk=3614, push_ice=126, ice_rebound_d4=56, ice_stop_short:d1=70, push_ice_failed=140

### 起点 [27,5]

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
- 可达状态: 27
- 合法转移: 59
- 仅事件非法转移: 1
- Forbidden reachable hits: none
- 事件计数: walk=58, push_ice=1, ice_stop_short:d1=1, push_ice_failed=1

### 起点 [27,15]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left up left left down left left left down left left up right down left left left up left left left down left left up right down left left left up left left left down left left up right down left left left up left left left
- 返回解事件: walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 1717
- 合法转移: 3740
- 仅事件非法转移: 140
- Forbidden reachable hits: none
- 事件计数: walk=3614, push_ice=126, ice_rebound_d4=56, ice_stop_short:d1=70, push_ice_failed=140

### 起点 [0,15]

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
- 可达状态: 27
- 合法转移: 59
- 仅事件非法转移: 1
- Forbidden reachable hits: none
- 事件计数: walk=58, push_ice=1, ice_stop_short:d1=1, push_ice_failed=1

