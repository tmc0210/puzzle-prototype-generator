# 冰原起点比较：ICE_EXP_META_2026_07_01_round17_v7_meta_required_core

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,2]
- Required winning-path events: ice_destroyed_d3, ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus, ice_blocks_ice_no_chain_push, ice_stop_short:d1, ice_stop_short:d2
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [16,7] | pass | yes | 47 | yes | none | none | complete, states=10985, wins=1 | states=10, out=2, winOut=1, deadOut=1, dist=6 | branching_win_dag, forced=2/6 | none |

## 细节

### 起点 [16,7]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left left up up up up up left right down down down down down right right up up left right up up up left left left left left left left left left down down down left up left left left left up up right left left
- 返回解事件: walk walk walk walk push_ice ice_destroyed_d3 walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=12543
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=12543

可达事件扫描：

- Status: complete
- 可达状态: 10985
- 合法转移: 25682
- 仅事件非法转移: 487
- Forbidden reachable hits: none
- 事件计数: walk=24914, ice_blocks_ice_no_chain_push=83, push_ice_failed=487, push_ice=768, ice_destroyed_d3=113, ice_stop_short:d1=207, ice_pass_through_d5:len1=7, slide_restart_after_group=10, ice_stop_short:d2=164, ice_destroy_group_d6_plus:len1=69, ice_rebound_d4=72, ice_boundary_disappear:d2=66, ice_boundary_disappear_after_group=66, ice_boundary_disappear:d1=50, ice_boundary_disappear:d5=12, ice_boundary_disappear:d14=6, ice_boundary_disappear:d10=6, ice_boundary_disappear:d11=6
