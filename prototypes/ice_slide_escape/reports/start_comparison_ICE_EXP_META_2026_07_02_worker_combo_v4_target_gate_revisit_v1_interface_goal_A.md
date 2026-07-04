# 冰原起点比较：ICE_EXP_META_2026_07_02_worker_combo_v4_target_gate_revisit_v1_interface_goal_A

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,3]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,3] | pass | yes | 0 | yes | none | none | complete, states=5623, wins=30 | states=11, out=4, winOut=0, deadOut=0, dist=0 | branching_win_dag, forced=0/0 | none |
| [7,0] | pass | yes | 26 | yes | none | none | complete, states=3582, wins=6 | states=8, out=4, winOut=1, deadOut=3, dist=5 | branching_win_dag, forced=1/5 | none |
| [11,9] | fail | no | n/a | yes | none | none | complete, states=70225, wins=0 | states=68, out=12, winOut=0, deadOut=12, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [0,11] | fail | no | n/a | no | none | none | n/a | n/a | n/a | start is not a valid solve instance |

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
- 可达状态: 5623
- 合法转移: 14740
- 仅事件非法转移: 841
- Forbidden reachable hits: none
- 事件计数: walk=14090, push_ice=650, ice_boundary_disappear:d1=39, ice_blocks_ice_no_chain_push=288, ice_stop_short:d2=48, ice_stop_short:d1=262, ice_rebound_d4=148, push_ice_failed=841, ice_destroyed_d3=102, ice_boundary_disappear:d2=39, ice_pass_through_d5:len3=3, ice_boundary_disappear_after_group=12, ice_pass_through_d5:len1=9

### 起点 [7,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down left left down left left up left down up right right right right right down left up left left left left down down left left
- 返回解事件: walk walk walk walk walk push_ice ice_stop_short:d1 walk push_ice ice_stop_short:d1 push_ice ice_destroyed_d3 walk walk push_ice ice_rebound_d4 walk walk push_ice ice_stop_short:d1 walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 3582
- 合法转移: 9411
- 仅事件非法转移: 696
- Forbidden reachable hits: none
- 事件计数: walk=8986, push_ice=425, ice_blocks_ice_no_chain_push=245, ice_stop_short:d2=23, push_ice_failed=696, ice_stop_short:d1=189, ice_rebound_d4=99, ice_destroyed_d3=57, ice_boundary_disappear:d2=30, ice_boundary_disappear:d1=24, ice_pass_through_d5:len3=3, ice_boundary_disappear_after_group=3

### 起点 [11,9]

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
- 可达状态: 70225
- 合法转移: 204535
- 仅事件非法转移: 6855
- Forbidden reachable hits: none
- 事件计数: walk=198446, push_ice=6089, ice_blocks_ice_no_chain_push=2659, ice_destroy_group_d6_plus:len2=291, ice_boundary_disappear_after_group=1550, ice_destroy_group_d6_plus:len1=925, ice_rebound_d4=328, push_ice_failed=6855, ice_stop_short:d1=1206, ice_stop_short:d2=1424, ice_destroyed_d3=1164, ice_boundary_disappear:d7=127, ice_boundary_disappear:d4=127, ice_boundary_disappear:d3=36, ice_pass_through_d5:len2=128, ice_boundary_disappear:d8=36, ice_pass_through_d5:len1=176, ice_boundary_disappear:d5=28, ice_pass_through_d5:len3=30, ice_boundary_disappear:d6=28, ice_boundary_disappear:d9=31, ice_boundary_disappear:d1=4

### 起点 [0,11]

- 合法起点: false
- Error: Level ICE_EXP_META_2026_07_02_worker_combo_v4_target_gate_revisit_v1_interface_goal_A_start_0_11 player_start must initially be standable
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
