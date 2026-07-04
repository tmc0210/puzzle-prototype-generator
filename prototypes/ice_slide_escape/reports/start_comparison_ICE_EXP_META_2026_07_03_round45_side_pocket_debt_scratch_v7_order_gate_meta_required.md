# 冰原起点比较：ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v7_order_gate_meta_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [22,5]
- Required winning-path events: ice_destroy_group_d6_plus, ice_destroyed_d3, ice_stop_short
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [10,10] | pass | yes | 47 | yes | none | none | complete, states=14607, wins=2 | states=12, out=4, winOut=1, deadOut=3, dist=6 | branching_win_dag, forced=1/6 | none |

## 细节

### 起点 [10,10]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up up left up right up up left right down down left left left left down left left up up up right down left down down right up right right right right up right up right right right right right right right right right right right right
- 返回解事件: walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_boundary_disappear:d8 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=15079
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=15079

可达事件扫描：

- Status: complete
- 可达状态: 14607
- 合法转移: 34327
- 仅事件非法转移: 2303
- Forbidden reachable hits: none
- 事件计数: walk=33052, push_ice=1275, ice_blocks_ice_no_chain_push=928, ice_destroyed_d3=289, ice_stop_short:d1=526, push_ice_failed=2303, ice_stop_short:d2=98, ice_boundary_disappear:d5=74, ice_rebound_d4=38, ice_destroy_group_d6_plus:len11=36, ice_boundary_disappear_after_group=41, ice_destroy_group_d6_plus:len2=70, slide_restart_after_group=70, ice_boundary_disappear:d8=70, ice_boundary_disappear:d9=84, ice_pass_through_d5:len4=2, ice_boundary_disappear:d17=6, ice_boundary_disappear:d4=17, ice_pass_through_d5:len11=3, ice_boundary_disappear:d13=21, ice_boundary_disappear:d16=3, ice_boundary_disappear:d6=8
