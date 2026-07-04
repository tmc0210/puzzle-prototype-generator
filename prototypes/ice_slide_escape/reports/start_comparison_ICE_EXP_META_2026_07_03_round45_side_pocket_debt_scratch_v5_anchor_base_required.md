# 冰原起点比较：ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v5_anchor_base_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,10]
- Required winning-path events: ice_destroyed_d3, ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | fail | yes | 15 | no | none | ice_destroy_group_d6_plus:len2, ice_pass_through_d5:len12, slide_restart_after_group | complete, states=7865, wins=20 | states=9, out=3, winOut=3, deadOut=0, dist=1 | branching_win_dag, forced=0/1 | 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径; 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径; 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: right right right right down right down down right down right right right right down
- 返回解事件: walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 找到，cost=15, inputs=right right right right down right down down right down right right right right down, events=walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 找到，cost=15, inputs=right right right right down right down down right down right right right right down, events=walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 7865
- 合法转移: 19499
- 仅事件非法转移: 1002
- Forbidden reachable hits: ice_destroy_group_d6_plus:len2, ice_pass_through_d5:len12, slide_restart_after_group
- 事件计数: walk=18838, push_ice=661, ice_blocks_ice_no_chain_push=357, ice_destroyed_d3=110, ice_stop_short:d1=187, push_ice_failed=1002, ice_stop_short:d2=118, ice_rebound_d4=84, ice_boundary_disappear:d9=36, ice_boundary_disappear:d1=36, ice_boundary_disappear:d5=40, ice_destroy_group_d6_plus:len2=40, slide_restart_after_group=40, ice_boundary_disappear:d8=40, ice_pass_through_d5:len12=2, ice_boundary_disappear_after_group=2, ice_boundary_disappear:d13=8
