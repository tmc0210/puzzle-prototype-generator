# 冰原起点比较：ICE_EXP_META_2026_07_03_round48_ordered_dual_debt_v19_lower_key_connected_probe_meta_required

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
| [10,10] | pass | yes | 51 | yes | none | none | complete, states=13328, wins=2 | states=21, out=5, winOut=4, deadOut=1, dist=5 | branching_win_dag, forced=0/5 | none |

## 细节

### 起点 [10,10]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up up up up up left down right down down down left left left up left left left up up up right down left down down right up down right down right right right up up up right up right right right right right right right right right right right right
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_boundary_disappear:d8 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=13326
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=13326

可达事件扫描：

- Status: complete
- 可达状态: 13328
- 合法转移: 31153
- 仅事件非法转移: 1964
- Forbidden reachable hits: none
- 事件计数: walk=29904, push_ice_failed=1964, push_ice=1249, ice_blocks_ice_no_chain_push=821, ice_stop_short:d1=448, ice_destroyed_d3=267, ice_stop_short:d2=246, ice_rebound_d4=36, ice_boundary_disappear:d5=69, ice_destroy_group_d6_plus:len2=48, slide_restart_after_group=48, ice_boundary_disappear:d8=48, ice_boundary_disappear:d9=69, ice_boundary_disappear:d17=10, ice_boundary_disappear:d1=40, ice_boundary_disappear:d13=16
