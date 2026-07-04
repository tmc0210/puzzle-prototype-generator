# 冰原起点比较：ICE_EXP_META_2026_07_03_round51_v36_double_borrow_c_target_meta_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [11,10]
- Required winning-path events: ice_destroy_group_d6_plus, ice_destroyed_d3, ice_stop_short:d2
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [22,4] | fail | yes | 29 | yes | none | none | complete, states=87762, wins=80 | states=28, out=6, winOut=3, deadOut=3, dist=2 | branching_win_dag, forced=0/2 | 存在缺少 required winning events 的胜利路径 |

## 细节

### 起点 [22,4]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required winning events 的胜利路径
- 第一步合法事件: walk
- Inputs: down left down left left down down right right up up left up left left left left left left left left left left down down down down down right
- 返回解事件: walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 找到，cost=43, inputs=down down left left left down down right right up down left left up right up up right right down left left down down right up up left left left left left left left left left left down left down down down right, events=walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk push_ice ice_stop_short:d1 walk walk push_ice ice_boundary_disappear:d1 walk walk push_ice ice_destroy_group_d6_plus:len4 slide_restart_after_group ice_stop_short:d2 walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 找到，cost=43, inputs=down down left left left down down right right up down left left up right up up right right down left left down down right up up left left left left left left left left left left down left down down down right, events=walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk push_ice ice_stop_short:d1 walk walk push_ice ice_boundary_disappear:d1 walk walk push_ice ice_destroy_group_d6_plus:len4 slide_restart_after_group ice_stop_short:d2 walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 87762
- 合法转移: 237662
- 仅事件非法转移: 10757
- Forbidden reachable hits: none
- 事件计数: walk=231886, push_ice=5776, ice_destroy_group_d6_plus:len2=25, slide_restart_after_group=656, ice_blocks_ice_no_chain_push=3771, ice_destroyed_d3=685, push_ice_failed=10757, ice_stop_short:d1=1893, ice_pass_through_d5:len3=154, ice_stop_short:d2=1286, ice_boundary_disappear:d1=529, ice_boundary_disappear:d2=160, ice_destroy_group_d6_plus:len1=294, ice_pass_through_d5:len4=112, ice_destroy_group_d6_plus:len4=137, ice_boundary_disappear_after_group=101, ice_pass_through_d5:len2=13, ice_boundary_disappear:d5=500, ice_boundary_disappear:d3=82, ice_boundary_disappear:d12=50, ice_boundary_disappear:d9=196, ice_boundary_disappear:d20=60, ice_boundary_disappear:d21=139, ice_boundary_disappear:d13=49, ice_pass_through_d5:len1=11, ice_destroy_group_d6_plus:len5=11, ice_boundary_disappear:d4=26, ice_rebound_d4=8, ice_boundary_disappear:d10=12
