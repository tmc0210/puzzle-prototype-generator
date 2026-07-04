# 冰原起点比较：ICE_EXP_META_2026_07_03_round52_v37_right_border_cap_meta_required

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
| [23,4] | pass | yes | 30 | yes | none | none | complete, states=136684, wins=105 | states=29, out=6, winOut=3, deadOut=3, dist=2 | branching_win_dag, forced=0/2 | none |

## 细节

### 起点 [23,4]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left down left down left left down down right right up up left up left left left left left left left left left left down down down down down right
- 返回解事件: walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=160093
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=160093

可达事件扫描：

- Status: complete
- 可达状态: 136684
- 合法转移: 367614
- 仅事件非法转移: 17008
- Forbidden reachable hits: none
- 事件计数: walk=358836, push_ice=8778, ice_destroy_group_d6_plus:len2=48, slide_restart_after_group=844, ice_blocks_ice_no_chain_push=5239, ice_destroyed_d3=1015, push_ice_failed=17008, ice_stop_short:d1=3816, ice_pass_through_d5:len3=242, ice_stop_short:d2=2172, ice_destroy_group_d6_plus:len1=448, ice_pass_through_d5:len4=191, ice_destroy_group_d6_plus:len4=150, ice_boundary_disappear_after_group=286, ice_pass_through_d5:len2=6, ice_boundary_disappear:d5=746, ice_boundary_disappear:d3=130, ice_boundary_disappear:d9=302, ice_boundary_disappear:d20=108, ice_boundary_disappear:d21=172, ice_pass_through_d5:len1=20, ice_destroy_group_d6_plus:len3=2, ice_destroy_group_d6_plus:len5=23, ice_boundary_disappear:d2=17, ice_boundary_disappear:d13=6, ice_boundary_disappear:d14=8
