# 冰原起点比较：ICE_EXP_META_2026_07_02_round22_v1_pair_goal_B

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [7,5]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 3

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [1,5] | pass | yes | 12 | yes | none | none | complete, states=1753, wins=3 | states=1, out=1, winOut=1, deadOut=0, dist=1 | one_win_continuation_per_scc, forced=1/3 | none |
| [7,5] | pass | yes | 8 | yes | none | none | complete, states=3890, wins=9 | states=58, out=7, winOut=0, deadOut=0, dist=0 | branching_win_dag, forced=0/0 | none |
| [10,4] | fail | no | n/a | no | none | none | n/a | n/a | n/a | start is not a valid solve instance |

## 细节

### 起点 [1,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_destroyed_d3, push_ice
- Inputs: up right right right right right up left down right right down
- 返回解事件: push_ice ice_destroyed_d3 walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_stop_short:d1 walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 1753
- 合法转移: 4991
- 仅事件非法转移: 83
- Forbidden reachable hits: none
- 事件计数: push_ice=115, ice_destroyed_d3=17, walk=4876, ice_rebound_d4=22, push_ice_failed=83, ice_stop_short:d1=41, ice_stop_short:d2=16, ice_pass_through_d5:len1=4, ice_boundary_disappear_after_group=10, ice_boundary_disappear:d2=4, ice_blocks_ice_no_chain_push=18, ice_destroy_group_d6_plus:len1=4, ice_pass_through_d5:len3=1, ice_boundary_disappear:d1=5, ice_destroy_group_d6_plus:len2=1

### 起点 [7,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up left up left down right right down
- 返回解事件: walk walk walk push_ice ice_rebound_d4 walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 3890
- 合法转移: 11053
- 仅事件非法转移: 247
- Forbidden reachable hits: none
- 事件计数: walk=10752, push_ice=301, ice_rebound_d4=45, push_ice_failed=247, ice_blocks_ice_no_chain_push=56, ice_stop_short:d2=43, ice_stop_short:d1=96, ice_boundary_disappear:d1=53, ice_destroy_group_d6_plus:len2=8, ice_boundary_disappear_after_group=31, ice_destroy_group_d6_plus:len1=11, ice_pass_through_d5:len1=11, ice_destroyed_d3=25, ice_boundary_disappear:d2=6, ice_boundary_disappear:d8=1, ice_pass_through_d5:len3=1, ice_boundary_disappear:d4=1

### 起点 [10,4]

- 合法起点: false
- Error: Level ICE_EXP_META_2026_07_02_round22_v1_pair_goal_B_start_10_4 player_start must initially be standable
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
