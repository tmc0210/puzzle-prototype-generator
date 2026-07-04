# 冰原起点比较：ICE_EXP_META_2026_07_03_round48_ordered_dual_debt_v16_probe_base_strict

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
| [0,5] | fail | yes | 16 | yes | none | ice_destroy_group_d6_plus:len11, ice_destroy_group_d6_plus:len2, ice_pass_through_d5:len11, ice_pass_through_d5:len12, ice_pass_through_d5:len4, slide_restart_after_group | complete, states=12825, wins=28 | states=9, out=3, winOut=3, deadOut=0, dist=1 | branching_win_dag, forced=0/2 | 存在缺少 required winning events 的胜利路径; 存在触发 forbidden winning events 的胜利路径; 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required winning events 的胜利路径; 存在触发 forbidden winning events 的胜利路径; 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: right right right right down down right right right right down right down right down right
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 找到，cost=16, inputs=right right right right down right down right right right down right down right down right, events=walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk
- 触发 forbidden winning events 的胜利路径: 找到，cost=20, inputs=right right right right down down right right right right down right right up left down down right down right, events=walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len4 ice_boundary_disappear_after_group walk walk walk walk walk
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 找到，cost=16, inputs=right right right right down right down right right right down right down right down right, events=walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 12825
- 合法转移: 30570
- 仅事件非法转移: 1684
- Forbidden reachable hits: ice_destroy_group_d6_plus:len11, ice_destroy_group_d6_plus:len2, ice_pass_through_d5:len11, ice_pass_through_d5:len12, ice_pass_through_d5:len4, slide_restart_after_group
- 事件计数: walk=29618, push_ice=952, ice_blocks_ice_no_chain_push=861, ice_destroyed_d3=123, ice_stop_short:d1=343, push_ice_failed=1684, ice_stop_short:d2=186, ice_pass_through_d5:len4=25, ice_boundary_disappear_after_group=65, ice_rebound_d4=43, ice_boundary_disappear:d9=50, ice_boundary_disappear:d5=61, ice_destroy_group_d6_plus:len11=18, ice_destroy_group_d6_plus:len2=51, slide_restart_after_group=51, ice_boundary_disappear:d8=51, ice_pass_through_d5:len12=3, ice_pass_through_d5:len11=19, ice_boundary_disappear:d4=16, ice_boundary_disappear:d13=7, ice_boundary_disappear:d17=5, ice_boundary_disappear:d6=2
