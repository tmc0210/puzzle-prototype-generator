# 冰原起点比较：ICE_EXP_META_2026_07_03_round51_v35_direct_main_target_d6_base_strict

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [11,10]
- Required winning-path events: ice_destroyed_d3, ice_stop_short
- Forbidden winning-path events: ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group
- Forbidden reachable events: ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | fail | yes | 58 | yes | ice_destroy_group_d6_plus:len1, slide_restart_after_group | ice_destroy_group_d6_plus:len1, slide_restart_after_group | complete, states=4928, wins=1 | states=7, out=1, winOut=1, deadOut=0, dist=5 | branching_win_dag, forced=2/5 | 返回解触发 forbidden winning events; 存在触发 forbidden winning events 的胜利路径; 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 返回解触发 forbidden winning events; 存在触发 forbidden winning events 的胜利路径; 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: right right right right right right right right right right right right right right right down down down right right right right right right up up left up left left left left left left left left left left down down down left up down left left left left up down right right right right down right down right
- 返回解事件: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_boundary_disappear:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=4927
- 触发 forbidden winning events 的胜利路径: 找到，cost=58, inputs=right right right right right right right right right right right right right right right down down down right right right right right right up up left up left left left left left left left left left left down down down left up down left left left left up down right right right right down right down right, events=walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_boundary_disappear:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 找到，cost=58, inputs=right right right right right right right right right right right right right right right down down down right right right right right right up up left up left left left left left left left left left left down down down left up down left left left left up down right right right right down right down right, events=walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_boundary_disappear:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 4928
- 合法转移: 13126
- 仅事件非法转移: 506
- Forbidden reachable hits: ice_destroy_group_d6_plus:len1, slide_restart_after_group
- 事件计数: walk=12938, push_ice=188, ice_blocks_ice_no_chain_push=115, ice_destroyed_d3=5, ice_stop_short:d1=49, push_ice_failed=506, ice_destroy_group_d6_plus:len1=4, slide_restart_after_group=4, ice_boundary_disappear:d1=24, ice_stop_short:d2=76, ice_boundary_disappear:d9=16, ice_boundary_disappear:d5=12, ice_boundary_disappear:d13=6
