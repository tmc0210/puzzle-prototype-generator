# 冰原起点比较：ICE_EXP_META_2026_07_03_round50_v34_interface_goal_D10_ABCD

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,10]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | pass | yes | 29 | yes | none | none | complete, states=641, wins=1 | states=7, out=1, winOut=1, deadOut=0, dist=4 | branching_win_dag, forced=2/4 | none |
| [11,10] | pass | yes | 1 | yes | none | none | complete, states=1286, wins=9 | states=20, out=4, winOut=0, deadOut=0, dist=0 | branching_win_dag, forced=0/0 | none |
| [22,4] | pass | yes | 26 | yes | none | none | complete, states=10804, wins=9 | states=2, out=1, winOut=1, deadOut=0, dist=2 | branching_win_dag, forced=1/2 | none |
| [10,10] | pass | yes | 0 | yes | none | none | complete, states=1286, wins=9 | states=20, out=4, winOut=0, deadOut=0, dist=0 | branching_win_dag, forced=0/0 | none |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right right right right right down right down down left up down left left left left up down right right right right down right down
- 返回解事件: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 641
- 合法转移: 1403
- 仅事件非法转移: 108
- Forbidden reachable hits: none
- 事件计数: walk=1368, push_ice=35, ice_blocks_ice_no_chain_push=30, ice_destroyed_d3=6, ice_stop_short:d1=8, push_ice_failed=108, ice_stop_short:d2=14, ice_boundary_disappear:d9=4, ice_boundary_disappear:d5=3

### 起点 [11,10]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left
- 返回解事件: walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 1286
- 合法转移: 2835
- 仅事件非法转移: 267
- Forbidden reachable hits: none
- 事件计数: walk=2740, push_ice_failed=267, push_ice=95, ice_blocks_ice_no_chain_push=87, ice_stop_short:d1=32, ice_destroyed_d3=19, ice_stop_short:d2=27, ice_boundary_disappear:d5=12, ice_boundary_disappear:d9=5

### 起点 [22,4]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down left down left down down right up up left up left left left left left left left left left left down down down down down
- 返回解事件: walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 10804
- 合法转移: 29053
- 仅事件非法转移: 1252
- Forbidden reachable hits: none
- 事件计数: walk=28534, push_ice=519, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=3, ice_blocks_ice_no_chain_push=351, ice_destroyed_d3=69, ice_stop_short:d1=174, push_ice_failed=1252, ice_stop_short:d2=154, ice_boundary_disappear:d1=48, ice_boundary_disappear:d5=48, ice_boundary_disappear:d9=20, ice_boundary_disappear:d13=6, ice_destroy_group_d6_plus:len1=2

### 起点 [10,10]

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
- 可达状态: 1286
- 合法转移: 2835
- 仅事件非法转移: 267
- Forbidden reachable hits: none
- 事件计数: walk=2740, push_ice_failed=267, push_ice=95, ice_blocks_ice_no_chain_push=87, ice_stop_short:d1=32, ice_destroyed_d3=19, ice_stop_short:d2=27, ice_boundary_disappear:d5=12, ice_boundary_disappear:d9=5
