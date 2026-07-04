# 冰原起点比较：ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v7_order_gate_base_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,10]
- Required winning-path events: ice_destroyed_d3, ice_stop_short
- Forbidden winning-path events: none
- Forbidden reachable events: ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | fail | yes | 15 | yes | none | ice_destroy_group_d6_plus:len11, ice_destroy_group_d6_plus:len2 | complete, states=4795, wins=8 | states=9, out=3, winOut=3, deadOut=0, dist=2 | branching_win_dag, forced=0/3 | 存在缺少 required winning events 的胜利路径; 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required winning events 的胜利路径; 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: right right right right down down right right right right right down down right down
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_stop_short:d2 walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 找到，cost=15, inputs=right right right right down right down right right right right down down right down, events=walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_stop_short:d2 walk walk walk walk
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 找到，cost=15, inputs=right right right right down right down right right right right down down right down, events=walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_stop_short:d2 walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 4795
- 合法转移: 11314
- 仅事件非法转移: 700
- Forbidden reachable hits: ice_destroy_group_d6_plus:len11, ice_destroy_group_d6_plus:len2
- 事件计数: walk=10998, push_ice=316, ice_blocks_ice_no_chain_push=334, ice_destroyed_d3=62, ice_stop_short:d1=122, push_ice_failed=700, ice_stop_short:d2=41, ice_boundary_disappear:d9=27, ice_rebound_d4=14, ice_pass_through_d5:len4=2, ice_boundary_disappear_after_group=14, ice_boundary_disappear:d5=13, ice_destroy_group_d6_plus:len11=9, ice_destroy_group_d6_plus:len2=16, slide_restart_after_group=16, ice_boundary_disappear:d8=16, ice_pass_through_d5:len11=3, ice_boundary_disappear:d4=5, ice_boundary_disappear:d6=2
