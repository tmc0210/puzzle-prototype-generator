# 冰原起点比较：round54_v5_meta_forbidden_missing

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,10]
- Required winning-path events: ice_destroy_group_d6_plus, slide_restart_after_group, ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [7,0] | pass | yes | 33 | yes | none | none | complete, states=2661, wins=1 | states=1, out=1, winOut=1, deadOut=0, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |

## 细节

### 起点 [7,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_destroy_group_d6_plus:len1, ice_stop_short:d2, push_ice, slide_restart_after_group
- Inputs: down down down down down right right right down left down down down down left left up up up left left up right down down down down left left left left left left
- 返回解事件: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=3166
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=3166

可达事件扫描：

- Status: complete
- 可达状态: 2661
- 合法转移: 6592
- 仅事件非法转移: 175
- Forbidden reachable hits: none
- 事件计数: push_ice=156, ice_destroy_group_d6_plus:len1=19, slide_restart_after_group=4, ice_stop_short:d2=26, walk=6436, ice_stop_short:d1=74, ice_rebound_d4=27, push_ice_failed=175, ice_blocks_ice_no_chain_push=26, ice_boundary_disappear_after_group=18, ice_boundary_disappear:d6=6, ice_pass_through_d5:len2=3, ice_boundary_disappear:d2=3, ice_destroyed_d3=2
