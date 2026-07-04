# 冰原起点比较：worker_round53_v4_pair_goal_D

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [11,5]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,3] | pass | yes | 19 | yes | none | none | complete, states=122, wins=1 | states=7, out=1, winOut=1, deadOut=0, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [5,8] | pass | yes | 9 | yes | none | none | complete, states=51, wins=1 | states=25, out=1, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |
| [11,1] | pass | yes | 24 | yes | none | none | complete, states=150, wins=1 | states=1, out=1, winOut=1, deadOut=0, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [11,5] | pass | yes | 0 | yes | none | none | complete, states=51, wins=1 | states=25, out=1, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |

## 细节

### 起点 [0,3]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right down right right up right right down right right right up left down down right right right right
- 返回解事件: walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 122
- 合法转移: 336
- 仅事件非法转移: 4
- Forbidden reachable hits: none
- 事件计数: walk=332, push_ice=4, ice_rebound_d4=2, ice_stop_short:d1=2, push_ice_failed=4

### 起点 [5,8]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up up up right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 51
- 合法转移: 151
- 仅事件非法转移: 1
- Forbidden reachable hits: none
- 事件计数: walk=150, push_ice=1, ice_stop_short:d1=1, push_ice_failed=1

### 起点 [11,1]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_destroy_group_d6_plus:len1, ice_stop_short:d1, push_ice, slide_restart_after_group
- Inputs: left left left left left left left left down down right right down right right right up left down down right right right right
- 返回解事件: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 150
- 合法转移: 391
- 仅事件非法转移: 7
- Forbidden reachable hits: none
- 事件计数: push_ice=5, ice_destroy_group_d6_plus:len1=1, slide_restart_after_group=1, ice_stop_short:d1=3, walk=386, push_ice_failed=7, ice_rebound_d4=2

### 起点 [11,5]

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
- 可达状态: 51
- 合法转移: 151
- 仅事件非法转移: 1
- Forbidden reachable hits: none
- 事件计数: walk=150, push_ice=1, ice_stop_short:d1=1, push_ice_failed=1
