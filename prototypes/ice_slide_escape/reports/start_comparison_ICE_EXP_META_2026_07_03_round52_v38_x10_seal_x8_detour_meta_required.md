# 冰原起点比较：ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_meta_required

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
| [23,4] | pass | yes | 36 | yes | none | none | complete, states=184683, wins=42 | states=29, out=6, winOut=3, deadOut=3, dist=4 | branching_win_dag, forced=0/4 | none |

## 细节

### 起点 [23,4]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left down left down left left down down right right up up left up left left left left left left left left left left left down left down down right up down down right down right
- 返回解事件: walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=189403
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=189403

可达事件扫描：

- Status: complete
- 可达状态: 184683
- 合法转移: 503104
- 仅事件非法转移: 22456
- Forbidden reachable hits: none
- 事件计数: walk=492696, push_ice=10408, ice_destroy_group_d6_plus:len2=127, slide_restart_after_group=933, ice_blocks_ice_no_chain_push=6652, ice_destroyed_d3=86, push_ice_failed=22456, ice_stop_short:d1=4349, ice_pass_through_d5:len3=182, ice_stop_short:d2=3291, ice_destroy_group_d6_plus:len1=623, ice_pass_through_d5:len4=218, ice_destroy_group_d6_plus:len4=136, ice_boundary_disappear_after_group=505, ice_pass_through_d5:len2=6, ice_boundary_disappear:d5=1407, ice_pass_through_d5:len7=22, ice_rebound_d4=146, ice_boundary_disappear:d20=130, ice_destroy_group_d6_plus:len3=8, ice_boundary_disappear:d21=260, ice_boundary_disappear:d3=32, ice_boundary_disappear:d2=135, ice_pass_through_d5:len1=87, ice_destroy_group_d6_plus:len5=29, ice_boundary_disappear:d8=65, ice_boundary_disappear:d15=2
