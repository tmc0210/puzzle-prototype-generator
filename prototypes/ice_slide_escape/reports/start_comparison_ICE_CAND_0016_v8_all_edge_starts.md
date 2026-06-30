# 冰原起点比较：ICE_CAND_0016_v8_all_edge_starts

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [14,2]
- Required events: ice_stop_short:d2, ice_pass_through_d5:len1, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3, ice_pass_through_d5:len2, slide_restart_after_group
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,9] | pass | yes | 55 | yes | none | none | complete, states=112043, wins=1 | states=16, out=4, winOut=1, deadOut=3, dist=6 | branching_win_dag, forced=2/6 | none |

## 细节

### 起点 [0,9]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up up up up up up up up right left down down down down down down down down right up right right right right up up up up up up right down left down down right up up left up up right right down right right right right up left down right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=163190
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=163190

可达事件扫描：

- Status: complete
- 可达状态: 112043
- 合法转移: 290632
- 仅事件非法转移: 11993
- Report hits: none
- 事件计数: walk=283338, push_ice=7294, ice_rebound_d4=164, ice_pass_through_d5:len3=39, ice_boundary_disappear_after_group=1255, ice_stop_short:d1=3082, push_ice_failed=11993, ice_stop_short:d2=1899, ice_blocks_ice_no_chain_push=3122, ice_destroy_group_d6_plus:len1=566, ice_destroyed_d3=746, ice_pass_through_d5:len1=209, slide_restart_after_group=229, ice_destroy_group_d6_plus:len2=148, ice_pass_through_d5:len2=522, ice_boundary_disappear:d7=148
