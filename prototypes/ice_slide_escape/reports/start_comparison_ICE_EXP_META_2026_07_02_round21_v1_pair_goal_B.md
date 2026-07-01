# 冰原起点比较：ICE_EXP_META_2026_07_02_round21_v1_pair_goal_B

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [6,8]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,4] | pass | yes | 10 | yes | none | none | complete, states=2529, wins=6 | states=52, out=6, winOut=4, deadOut=2, dist=1 | branching_win_dag, forced=0/1 | none |
| [6,8] | pass | yes | 16 | yes | none | none | complete, states=820, wins=3 | states=1, out=1, winOut=1, deadOut=0, dist=1 | one_win_continuation_per_scc, forced=1/1 | none |

## 细节

### 起点 [0,4]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right down right down down right right right right down
- 返回解事件: walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_stop_short:d2 walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 2529
- 合法转移: 6780
- 仅事件非法转移: 184
- Forbidden reachable hits: none
- 事件计数: walk=6586, push_ice_failed=184, push_ice=194, ice_rebound_d4=27, ice_stop_short:d1=64, ice_blocks_ice_no_chain_push=18, ice_stop_short:d2=44, ice_boundary_disappear:d1=34, ice_destroyed_d3=17, ice_pass_through_d5:len2=2, ice_boundary_disappear_after_group=5, ice_destroy_group_d6_plus:len1=2, ice_boundary_disappear:d3=2, ice_pass_through_d5:len1=1, ice_boundary_disappear:d2=1

### 起点 [6,8]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_boundary_disappear_after_group, ice_destroy_group_d6_plus:len1, push_ice
- Inputs: up up left left left left left up right down down right right right right down
- 返回解事件: push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 820
- 合法转移: 2121
- 仅事件非法转移: 44
- Forbidden reachable hits: none
- 事件计数: push_ice=41, ice_destroy_group_d6_plus:len1=3, ice_boundary_disappear_after_group=3, walk=2080, ice_stop_short:d1=17, ice_blocks_ice_no_chain_push=4, push_ice_failed=44, ice_rebound_d4=6, ice_stop_short:d2=5, ice_boundary_disappear:d1=2, ice_boundary_disappear:d5=3, ice_destroyed_d3=4, ice_boundary_disappear:d3=1
