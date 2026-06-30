# 冰原起点比较：ICE_CAND_0011_all_edge_starts

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [17,8]
- Required events: ice_destroyed_d3, ice_rebound_d4, ice_pass_through_d5, slide_restart_after_group, ice_stop_short, ice_blocks_ice_no_chain_push
- Forbidden events: none
- Report-only events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [17,8] | fail | yes | 44 | no | none | none | complete, states=2330, wins=2 | states=84, out=5, winOut=2, deadOut=3, dist=3 | branching_win_dag, forced=0/3 | 返回解未覆盖全部 required events; 存在缺少 required events 的胜利路径 |
| [10,16] | pass | yes | 35 | yes | none | none | complete, states=1180, wins=1 | states=1, out=1, winOut=1, deadOut=0, dist=4 | one_win_continuation_per_scc, forced=4/4 | none |

## 细节

### 起点 [17,8]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 返回解未覆盖全部 required events; 存在缺少 required events 的胜利路径
- 第一步合法事件: walk
- Inputs: left left left left left left left down down left down down right up up up left left left left left left left left left up right down right right right right right right right right up right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=44, inputs=left left left left left left left down down left down down right up up up left left left left left left left left left up right down right right right right right right right right up right right right right right right right, events=walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=44, inputs=left left left left left left left down down left down down right up up up left left left left left left left left left up right down right right right right right right right right up right right right right right right right, events=walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 2330
- 合法转移: 7956
- 仅事件非法转移: 58
- Report hits: none
- 事件计数: walk=7900, push_ice=56, ice_blocks_ice_no_chain_push=5, ice_destroyed_d3=3, push_ice_failed=58, ice_boundary_disappear:d1=14, ice_rebound_d4=6, ice_stop_short:d1=18, ice_boundary_disappear:d7=6, ice_pass_through_d5:len1=8, slide_restart_after_group=8, ice_boundary_disappear:d9=6, ice_boundary_disappear:d5=3

### 起点 [10,16]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_blocks_ice_no_chain_push, ice_destroyed_d3, push_ice
- Inputs: up up up up up up up left left left left left left left left left up right down right right right right right right right right up right right right right right right right
- 返回解事件: push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1441
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1441

可达事件扫描：

- Status: complete
- 可达状态: 1180
- 合法转移: 4014
- 仅事件非法转移: 22
- Report hits: none
- 事件计数: push_ice=22, ice_blocks_ice_no_chain_push=2, ice_destroyed_d3=1, walk=3992, ice_rebound_d4=3, push_ice_failed=22, ice_stop_short:d1=9, ice_boundary_disappear:d5=3, ice_boundary_disappear:d7=3, ice_pass_through_d5:len1=4, slide_restart_after_group=4, ice_boundary_disappear:d9=3
