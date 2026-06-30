# 冰原起点比较：ICE_CAND_0012_v4_meta_top_to_left

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,7]
- Required events: ice_rebound_d4, ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- Forbidden events: none
- Report-only events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [4,0] | pass | yes | 69 | yes | none | none | complete, states=9158, wins=1 | states=34, out=8, winOut=1, deadOut=7, dist=4 | one_win_continuation_per_scc, forced=4/4 | none |
| [5,0] | pass | yes | 70 | yes | none | none | complete, states=9158, wins=1 | states=34, out=8, winOut=1, deadOut=7, dist=4 | one_win_continuation_per_scc, forced=4/4 | none |

## 细节

### 起点 [4,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down down left left left down right up right right up up up up up up right down right right right right right right right right down down down down down down down down left left right right up up up up up up up up left left left left left left left left down down down down down left down left left left left
- 返回解事件: walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=10740
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=10740

可达事件扫描：

- Status: complete
- 可达状态: 9158
- 合法转移: 24077
- 仅事件非法转移: 287
- Report hits: none
- 事件计数: walk=23610, push_ice=467, ice_blocks_ice_no_chain_push=122, ice_stop_short:d1=138, ice_destroy_group_d6_plus:len1=84, ice_boundary_disappear_after_group=114, push_ice_failed=287, ice_boundary_disappear:d1=28, ice_boundary_disappear:d2=16, ice_rebound_d4=14, ice_destroyed_d3=33, ice_stop_short:d2=84, ice_pass_through_d5:len1=20, slide_restart_after_group=20, ice_boundary_disappear:d7=24, ice_boundary_disappear:d3=5, ice_destroy_group_d6_plus:len4=16, ice_destroy_group_d6_plus:len2=12, ice_boundary_disappear:d8=7, ice_destroy_group_d6_plus:len3=2, ice_boundary_disappear:d9=3, ice_boundary_disappear:d5=1

### 起点 [5,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_boundary_disappear_after_group, ice_destroy_group_d6_plus:len1, push_ice, walk
- Inputs: left down down down down down down left left left down right up right right up up up up up up right down right right right right right right right right down down down down down down down down left left right right up up up up up up up up left left left left left left left left down down down down down left down left left left left
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=10740
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=10740

可达事件扫描：

- Status: complete
- 可达状态: 9158
- 合法转移: 24077
- 仅事件非法转移: 287
- Report hits: none
- 事件计数: push_ice=467, ice_destroy_group_d6_plus:len1=84, ice_boundary_disappear_after_group=114, walk=23610, ice_blocks_ice_no_chain_push=122, ice_stop_short:d1=138, push_ice_failed=287, ice_boundary_disappear:d1=28, ice_boundary_disappear:d2=16, ice_rebound_d4=14, ice_destroyed_d3=33, ice_stop_short:d2=84, ice_boundary_disappear:d3=5, ice_boundary_disappear:d7=24, ice_pass_through_d5:len1=20, slide_restart_after_group=20, ice_destroy_group_d6_plus:len4=16, ice_destroy_group_d6_plus:len2=12, ice_boundary_disappear:d8=7, ice_destroy_group_d6_plus:len3=2, ice_boundary_disappear:d9=3, ice_boundary_disappear:d5=1
