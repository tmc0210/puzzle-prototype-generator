# 冰原起点比较：worker_round54_lshape_v4_pair_goal_D

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [19,11]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | fail | no | n/a | yes | none | none | complete, states=90, wins=0 | states=7, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [6,13] | fail | no | n/a | yes | none | none | complete, states=35, wins=0 | states=17, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [11,0] | pass | yes | 23 | yes | none | none | complete, states=82, wins=1 | states=1, out=1, winOut=1, deadOut=0, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [19,11] | pass | yes | 0 | yes | none | none | complete, states=26, wins=1 | states=11, out=1, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |

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
- 可达状态: 90
- 合法转移: 204
- 仅事件非法转移: 5
- Forbidden reachable hits: none
- 事件计数: walk=200, push_ice=4, ice_rebound_d4=2, ice_stop_short:d1=2, push_ice_failed=5

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
- 可达状态: 35
- 合法转移: 81
- 仅事件非法转移: 2
- Forbidden reachable hits: none
- 事件计数: walk=80, push_ice=1, ice_stop_short:d1=1, push_ice_failed=2

### 起点 [11,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_destroy_group_d6_plus:len1, ice_stop_short:d2, push_ice, slide_restart_after_group
- Inputs: down down down down down down down down down right down right down right right right right up left down right right right
- 返回解事件: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 82
- 合法转移: 181
- 仅事件非法转移: 11
- Forbidden reachable hits: none
- 事件计数: push_ice=5, ice_destroy_group_d6_plus:len1=1, slide_restart_after_group=1, ice_stop_short:d2=1, walk=176, push_ice_failed=11, ice_rebound_d4=2, ice_stop_short:d1=2, ice_blocks_ice_no_chain_push=3

### 起点 [19,11]

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
- 可达状态: 26
- 合法转移: 63
- 仅事件非法转移: 3
- Forbidden reachable hits: none
- 事件计数: walk=62, push_ice=1, ice_stop_short:d2=1, push_ice_failed=3
