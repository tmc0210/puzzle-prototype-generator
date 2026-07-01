# 冰原起点比较：ICE_EXP_META_2026_07_01_round17_v5_meta_required_core

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [16,2]
- Required winning-path events: ice_destroyed_d3, ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus, ice_blocks_ice_no_chain_push, ice_stop_short:d1, ice_stop_short:d2
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [16,7] | pass | yes | 65 | yes | none | none | complete, states=7792, wins=1 | states=11, out=2, winOut=1, deadOut=1, dist=6 | branching_win_dag, forced=2/6 | none |
| [16,2] | pass | yes | 70 | yes | none | none | complete, states=7792, wins=1 | states=11, out=2, winOut=1, deadOut=1, dist=6 | branching_win_dag, forced=2/6 | none |

## 细节

### 起点 [16,7]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left left up up up up up left right down down down down down right right up up left right up up up left left left left left left left left left down down down left up left left left left up up right left down down right right right right up right up right right right right right right right right right right
- 返回解事件: walk walk walk walk push_ice ice_destroyed_d3 walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=8802
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=8802

可达事件扫描：

- Status: complete
- 可达状态: 7792
- 合法转移: 18130
- 仅事件非法转移: 345
- Forbidden reachable hits: none
- 事件计数: walk=17552, ice_blocks_ice_no_chain_push=81, push_ice_failed=345, push_ice=578, ice_destroyed_d3=87, ice_stop_short:d1=141, ice_pass_through_d5:len1=9, slide_restart_after_group=12, ice_boundary_disappear:d2=72, ice_stop_short:d2=118, ice_boundary_disappear:d1=34, ice_destroy_group_d6_plus:len1=3, ice_rebound_d4=48, ice_boundary_disappear:d14=54, ice_boundary_disappear:d10=12, ice_boundary_disappear:d5=6, ice_boundary_disappear:d11=6

### 起点 [16,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left down down down down down left left up up up up up left right down down down down down right right up up left right up up up left left left left left left left left left down down down left up left left left left up up right left down down right right right right up right up right right right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk push_ice ice_destroyed_d3 walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=8802
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=8802

可达事件扫描：

- Status: complete
- 可达状态: 7792
- 合法转移: 18130
- 仅事件非法转移: 345
- Forbidden reachable hits: none
- 事件计数: walk=17552, push_ice=578, ice_blocks_ice_no_chain_push=81, ice_stop_short:d1=141, push_ice_failed=345, ice_destroyed_d3=87, ice_stop_short:d2=118, ice_pass_through_d5:len1=9, slide_restart_after_group=12, ice_boundary_disappear:d2=72, ice_boundary_disappear:d1=34, ice_destroy_group_d6_plus:len1=3, ice_rebound_d4=48, ice_boundary_disappear:d14=54, ice_boundary_disappear:d10=12, ice_boundary_disappear:d5=6, ice_boundary_disappear:d11=6
