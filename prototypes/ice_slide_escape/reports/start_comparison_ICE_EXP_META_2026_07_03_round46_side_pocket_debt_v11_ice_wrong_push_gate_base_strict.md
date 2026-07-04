# 冰原起点比较：ICE_EXP_META_2026_07_03_round46_side_pocket_debt_v11_ice_wrong_push_gate_base_strict

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,10]
- Required winning-path events: ice_destroyed_d3, ice_stop_short
- Forbidden winning-path events: ice_destroy_group_d6_plus, ice_pass_through_d5
- Forbidden reachable events: ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | fail | yes | 15 | no | none | ice_destroy_group_d6_plus:len2, ice_pass_through_d5:len12, ice_pass_through_d5:len4, slide_restart_after_group | complete, states=6227, wins=14 | states=8, out=3, winOut=3, deadOut=0, dist=1 | branching_win_dag, forced=0/1 | 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径; 存在触发 forbidden winning events 的胜利路径; 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径; 存在触发 forbidden winning events 的胜利路径; 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: right right right right down down down right right right right right right down down
- 返回解事件: walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 找到，cost=15, inputs=right right right right down down down right right right right right right down down, events=walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk
- 触发 forbidden winning events 的胜利路径: 找到，cost=17, inputs=right right right right down right down left down right right right right right right down down, events=walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk push_ice ice_stop_short:d1 push_ice ice_pass_through_d5:len12 ice_boundary_disappear_after_group walk walk walk walk walk walk walk
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 找到，cost=15, inputs=right right right right down down down right right right right right right down down, events=walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 6227
- 合法转移: 14671
- 仅事件非法转移: 791
- Forbidden reachable hits: ice_destroy_group_d6_plus:len2, ice_pass_through_d5:len12, ice_pass_through_d5:len4, slide_restart_after_group
- 事件计数: walk=14142, push_ice=529, ice_blocks_ice_no_chain_push=342, ice_destroyed_d3=62, ice_stop_short:d1=200, push_ice_failed=791, ice_pass_through_d5:len12=17, ice_boundary_disappear_after_group=33, ice_stop_short:d2=88, ice_rebound_d4=28, ice_boundary_disappear:d9=27, ice_pass_through_d5:len4=16, ice_boundary_disappear:d5=32, ice_destroy_group_d6_plus:len2=24, slide_restart_after_group=24, ice_boundary_disappear:d8=24, ice_boundary_disappear:d2=22, ice_boundary_disappear:d17=6, ice_boundary_disappear:d13=7
