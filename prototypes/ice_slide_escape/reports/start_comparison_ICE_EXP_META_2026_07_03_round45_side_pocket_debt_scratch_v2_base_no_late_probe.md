# 冰原起点比较：ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v2_base_no_late_probe

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
| [0,5] | fail | yes | 29 | yes | none | ice_destroy_group_d6_plus:len2, ice_pass_through_d5:len12, ice_pass_through_d5:len3, ice_pass_through_d5:len4, slide_restart_after_group | complete, states=6597, wins=1 | states=12, out=5, winOut=1, deadOut=4, dist=3 | branching_win_dag, forced=2/4 | 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: right right right right right right right right right down down right down down left up down left left left left up down right right right right right down
- 返回解事件: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=8422
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=8422

可达事件扫描：

- Status: complete
- 可达状态: 6597
- 合法转移: 15372
- 仅事件非法转移: 571
- Forbidden reachable hits: ice_destroy_group_d6_plus:len2, ice_pass_through_d5:len12, ice_pass_through_d5:len3, ice_pass_through_d5:len4, slide_restart_after_group
- 事件计数: walk=14918, push_ice=454, ice_blocks_ice_no_chain_push=124, ice_destroyed_d3=58, ice_stop_short:d2=4, ice_stop_short:d1=209, push_ice_failed=571, ice_pass_through_d5:len4=14, ice_boundary_disappear_after_group=56, ice_rebound_d4=77, ice_pass_through_d5:len3=34, ice_destroy_group_d6_plus:len2=11, slide_restart_after_group=11, ice_boundary_disappear:d8=11, ice_pass_through_d5:len12=8, ice_boundary_disappear:d5=15, ice_boundary_disappear:d13=3, ice_boundary_disappear:d1=21
