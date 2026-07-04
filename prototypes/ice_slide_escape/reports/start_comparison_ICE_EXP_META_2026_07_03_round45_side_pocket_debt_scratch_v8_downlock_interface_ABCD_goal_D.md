# 冰原起点比较：ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_interface_ABCD_goal_D

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [22,5]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 3

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | fail | no | n/a | yes | none | none | complete, states=4393, wins=0 | states=9, out=3, winOut=0, deadOut=3, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [10,10] | pass | yes | 47 | yes | none | none | complete, states=10854, wins=2 | states=19, out=5, winOut=4, deadOut=1, dist=5 | branching_win_dag, forced=0/5 | none |
| [22,5] | pass | yes | 0 | yes | none | none | complete, states=8, wins=1 | states=8, out=0, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |

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
- 可达状态: 4393
- 合法转移: 10379
- 仅事件非法转移: 614
- Forbidden reachable hits: none
- 事件计数: walk=10044, push_ice=335, ice_blocks_ice_no_chain_push=289, ice_destroyed_d3=33, ice_stop_short:d1=137, push_ice_failed=614, ice_pass_through_d5:len4=12, ice_boundary_disappear_after_group=18, ice_stop_short:d2=41, ice_rebound_d4=34, ice_boundary_disappear:d9=19, ice_destroy_group_d6_plus:len2=12, slide_restart_after_group=12, ice_boundary_disappear:d8=12, ice_pass_through_d5:len12=6, ice_boundary_disappear:d5=16, ice_boundary_disappear:d13=4, ice_boundary_disappear:d2=21

### 起点 [10,10]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up up up up up left down right down down left left left left left left up up up right down left down down right up down right right right right up up right up right right right right right right right right right right right right
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_boundary_disappear:d8 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 10854
- 合法转移: 25409
- 仅事件非法转移: 1639
- Forbidden reachable hits: none
- 事件计数: walk=24370, push_ice_failed=1639, push_ice=1039, ice_blocks_ice_no_chain_push=737, ice_stop_short:d1=425, ice_destroyed_d3=105, ice_pass_through_d5:len4=41, ice_boundary_disappear_after_group=73, ice_stop_short:d2=165, ice_rebound_d4=67, ice_boundary_disappear:d5=55, ice_pass_through_d5:len12=32, ice_destroy_group_d6_plus:len2=38, slide_restart_after_group=38, ice_boundary_disappear:d8=38, ice_boundary_disappear:d9=49, ice_boundary_disappear:d17=10, ice_boundary_disappear:d2=40, ice_boundary_disappear:d13=12

### 起点 [22,5]

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
- 可达状态: 8
- 合法转移: 14
- 仅事件非法转移: 0
- Forbidden reachable hits: none
- 事件计数: walk=14
