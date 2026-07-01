# 冰原起点比较：ICE_EXP_META_2026_07_01_round16_v37_meta_required_core

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [17,1]
- Required winning-path events: ice_destroy_group_d6_plus, ice_blocks_ice_no_chain_push
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [17,7] | pass | yes | 36 | yes | none | none | complete, states=15515, wins=1 | states=72, out=9, winOut=3, deadOut=6, dist=4 | branching_win_dag, forced=0/4 | none |

## 细节

### 起点 [17,7]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left up up up left down left left up left left up down right down right right right down down left left left left up up up right right right right right up up up right
- 返回解事件: walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=17069
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=17069

可达事件扫描：

- Status: complete
- 可达状态: 15515
- 合法转移: 42529
- 仅事件非法转移: 1168
- Forbidden reachable hits: none
- 事件计数: walk=41352, push_ice=1177, ice_destroy_group_d6_plus:len2=42, slide_restart_after_group=70, ice_blocks_ice_no_chain_push=321, ice_stop_short:d1=457, push_ice_failed=1168, ice_stop_short:d2=280, ice_destroyed_d3=300, ice_rebound_d4=110, ice_pass_through_d5:len1=13, ice_boundary_disappear_after_group=13, ice_pass_through_d5:len3=10, ice_pass_through_d5:len2=18, ice_boundary_disappear:d1=11, ice_boundary_disappear:d2=3, ice_boundary_disappear:d5=3
