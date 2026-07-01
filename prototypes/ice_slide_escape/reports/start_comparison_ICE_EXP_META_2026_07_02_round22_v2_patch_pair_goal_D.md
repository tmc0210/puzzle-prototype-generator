# 冰原起点比较：ICE_EXP_META_2026_07_02_round22_v2_patch_pair_goal_D

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,4]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 3

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [1,5] | fail | no | n/a | yes | none | none | complete, states=388, wins=0 | states=1, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [7,5] | pass | yes | 22 | yes | none | none | complete, states=772, wins=1 | states=14, out=2, winOut=1, deadOut=1, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [10,4] | fail | no | n/a | no | none | none | n/a | n/a | n/a | start is not a valid solve instance |

## 细节

### 起点 [1,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: ice_destroyed_d3, push_ice
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 388
- 合法转移: 959
- 仅事件非法转移: 29
- Forbidden reachable hits: none
- 事件计数: push_ice=27, ice_destroyed_d3=3, walk=932, ice_rebound_d4=7, push_ice_failed=29, ice_stop_short:d1=11, ice_stop_short:d2=6

### 起点 [7,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up left left left up left left left down right right right right right up left down right right right right right
- 返回解事件: walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_boundary_disappear:d1 push_ice ice_destroy_group_d6_plus:len2 ice_boundary_disappear_after_group walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 772
- 合法转移: 1899
- 仅事件非法转移: 65
- Forbidden reachable hits: none
- 事件计数: walk=1850, push_ice=49, ice_rebound_d4=10, push_ice_failed=65, ice_blocks_ice_no_chain_push=8, ice_stop_short:d2=10, ice_stop_short:d1=20, ice_boundary_disappear:d1=6, ice_destroy_group_d6_plus:len2=3, ice_boundary_disappear_after_group=3

### 起点 [10,4]

- 合法起点: false
- Error: Level ICE_EXP_META_2026_07_02_round22_v2_patch_pair_goal_D_start_10_4 player_start must initially be standable
- 机器闸门: fail
- 闸门原因: start is not a valid solve instance
- 第一步合法事件: none
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- 未检查
