# 冰原起点比较：round54_v10_declared_to_B

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [7,0]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 3

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,6] | pass | yes | 19 | yes | none | none | complete, states=847, wins=1 | states=9, out=1, winOut=1, deadOut=0, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [10,0] | pass | yes | 21 | yes | none | none | complete, states=3040, wins=3 | states=1, out=1, winOut=1, deadOut=0, dist=3 | branching_win_dag, forced=2/3 | none |
| [0,10] | fail | no | n/a | yes | none | none | complete, states=1, wins=0 | states=1, out=0, winOut=0, deadOut=0, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [0,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up right right down right right up right right right down left up up up up up up
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk

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

### 起点 [10,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_pass_through_d5:len2, ice_stop_short:d2, push_ice, slide_restart_after_group
- Inputs: down down down down down down left down left left left left up right up right up up up up up
- 返回解事件: push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 3040
- 合法转移: 7311
- 仅事件非法转移: 181
- Forbidden reachable hits: none
- 事件计数: push_ice=159, ice_pass_through_d5:len2=1, slide_restart_after_group=23, ice_stop_short:d2=10, walk=7152, ice_blocks_ice_no_chain_push=19, ice_rebound_d4=25, ice_stop_short:d1=100, push_ice_failed=181, ice_destroy_group_d6_plus:len1=20, ice_boundary_disappear:d1=20, ice_destroyed_d3=2, ice_boundary_disappear:d6=2, ice_destroy_group_d6_plus:len2=2

### 起点 [0,10]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: none
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 1
- 合法转移: 0
- 仅事件非法转移: 0
- Forbidden reachable hits: none
- 事件计数: none
