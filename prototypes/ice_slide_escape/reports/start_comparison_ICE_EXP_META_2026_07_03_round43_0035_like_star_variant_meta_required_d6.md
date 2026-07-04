# 冰原起点比较：ICE_EXP_META_2026_07_03_round43_0035_like_star_variant_meta_required_d6

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,4]
- Required winning-path events: ice_destroy_group_d6_plus
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [7,5] | pass | yes | 22 | yes | none | none | complete, states=9948, wins=10 | states=14, out=2, winOut=2, deadOut=0, dist=3 | branching_win_dag, forced=0/3 | none |

## 细节

### 起点 [7,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up left left left up up up left left left down down down right right right right right right right right right
- 返回解事件: walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk push_ice ice_boundary_disappear:d1 push_ice ice_destroy_group_d6_plus:len2 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=9938
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=9938

可达事件扫描：

- Status: complete
- 可达状态: 9948
- 合法转移: 25614
- 仅事件非法转移: 1099
- Forbidden reachable hits: none
- 事件计数: walk=24776, push_ice=838, ice_blocks_ice_no_chain_push=249, ice_stop_short:d2=181, push_ice_failed=1099, ice_stop_short:d1=311, ice_boundary_disappear:d1=80, ice_destroy_group_d6_plus:len2=18, ice_boundary_disappear_after_group=35, ice_destroyed_d3=39, ice_rebound_d4=149, ice_boundary_disappear:d6=3, ice_boundary_disappear:d2=33, ice_boundary_disappear:d7=7, ice_pass_through_d5:len2=11, ice_pass_through_d5:len3=6
