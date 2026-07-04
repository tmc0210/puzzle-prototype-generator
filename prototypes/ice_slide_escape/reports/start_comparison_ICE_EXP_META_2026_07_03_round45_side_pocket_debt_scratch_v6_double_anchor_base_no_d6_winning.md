# 冰原起点比较：ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v6_double_anchor_base_no_d6_winning

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,10]
- Required winning-path events: ice_destroyed_d3
- Forbidden winning-path events: ice_destroy_group_d6_plus, ice_pass_through_d5
- Forbidden reachable events: ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | fail | yes | 29 | yes | none | ice_destroy_group_d6_plus:len2 | complete, states=4143, wins=4 | states=9, out=3, winOut=2, deadOut=1, dist=4 | branching_win_dag, forced=0/4 | 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: right right right right right right right right right down right down down left up down left left left left up down right down right right right right down
- 返回解事件: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=4139
- 触发 forbidden winning events 的胜利路径: 未找到；完整搜索，explored=4484
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=4484

可达事件扫描：

- Status: complete
- 可达状态: 4143
- 合法转移: 10207
- 仅事件非法转移: 572
- Forbidden reachable hits: ice_destroy_group_d6_plus:len2
- 事件计数: walk=9866, push_ice=341, ice_blocks_ice_no_chain_push=268, ice_destroyed_d3=50, ice_stop_short:d1=117, push_ice_failed=572, ice_stop_short:d2=66, ice_boundary_disappear:d1=23, ice_rebound_d4=20, ice_boundary_disappear:d9=19, ice_destroy_group_d6_plus:len2=16, slide_restart_after_group=16, ice_boundary_disappear:d8=16, ice_pass_through_d5:len12=10, ice_boundary_disappear_after_group=10, ice_boundary_disappear:d5=16, ice_boundary_disappear:d13=4
