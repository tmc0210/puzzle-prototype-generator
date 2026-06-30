# 冰原起点比较：ICE_CAND_0016_v2_all_edge_starts

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [14,1]
- Required events: ice_stop_short:d2, ice_pass_through_d5:len1, ice_pass_through_d5:len2, slide_restart_after_group, ice_destroyed_d3
- Forbidden events: none
- Report-only events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [14,1] | pass | yes | 52 | yes | none | none | complete, states=20603, wins=1 | states=126, out=10, winOut=2, deadOut=8, dist=4 | branching_win_dag, forced=0/4 | none |
| [0,9] | pass | yes | 44 | yes | none | none | complete, states=20603, wins=1 | states=126, out=10, winOut=2, deadOut=8, dist=4 | branching_win_dag, forced=0/4 | none |

## 细节

### 起点 [14,1]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left down left left left left left left left down left left left left left up up right left down down down down down down down down right up up up up up up right right right right up up right down right right right right right up left right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=30337
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=30337

可达事件扫描：

- Status: complete
- 可达状态: 20603
- 合法转移: 64613
- 仅事件非法转移: 1218
- Report hits: none
- 事件计数: walk=63512, push_ice=1101, ice_blocks_ice_no_chain_push=284, ice_destroyed_d3=98, push_ice_failed=1218, ice_boundary_disappear:d3=114, ice_stop_short:d1=411, ice_boundary_disappear:d7=38, ice_rebound_d4=114, ice_stop_short:d2=106, ice_pass_through_d5:len1=40, slide_restart_after_group=54, ice_pass_through_d5:len3=35, ice_boundary_disappear_after_group=84, ice_destroy_group_d6_plus:len1=30, ice_boundary_disappear:d2=25, ice_boundary_disappear:d6=41, ice_boundary_disappear:d1=45, ice_destroy_group_d6_plus:len2=20, ice_boundary_disappear:d5=25, ice_pass_through_d5:len2=13

### 起点 [0,9]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up up up up up up up up right left down down down down down down down down right up up up up up up right right right right up up right down right right right right right up left right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=30337
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=30337

可达事件扫描：

- Status: complete
- 可达状态: 20603
- 合法转移: 64613
- 仅事件非法转移: 1218
- Report hits: none
- 事件计数: walk=63512, push_ice=1101, ice_rebound_d4=114, ice_pass_through_d5:len3=35, ice_boundary_disappear_after_group=84, ice_stop_short:d1=411, push_ice_failed=1218, ice_boundary_disappear:d2=25, ice_destroy_group_d6_plus:len1=30, ice_stop_short:d2=106, ice_boundary_disappear:d5=25, ice_boundary_disappear:d1=45, ice_blocks_ice_no_chain_push=284, ice_destroyed_d3=98, ice_boundary_disappear:d3=114, ice_pass_through_d5:len1=40, slide_restart_after_group=54, ice_destroy_group_d6_plus:len2=20, ice_pass_through_d5:len2=13, ice_boundary_disappear:d7=38, ice_boundary_disappear:d6=41
