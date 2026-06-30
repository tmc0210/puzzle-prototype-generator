# 冰原起点比较：ICE_CAND_0011_v3_all_edge_starts

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [11,8]
- Required events: ice_destroyed_d3, ice_rebound_d4, ice_pass_through_d5, slide_restart_after_group, ice_stop_short, ice_blocks_ice_no_chain_push
- Forbidden events: none
- Report-only events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [11,8] | fail | yes | 42 | no | none | none | complete, states=19716, wins=2 | states=77, out=9, winOut=2, deadOut=7, dist=4 | branching_win_dag, forced=0/4 | 返回解未覆盖全部 required events; 存在缺少 required events 的胜利路径 |
| [10,16] | pass | yes | 39 | yes | none | none | complete, states=10972, wins=1 | states=1, out=1, winOut=1, deadOut=0, dist=5 | branching_win_dag, forced=3/5 | none |

## 细节

### 起点 [11,8]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 返回解未覆盖全部 required events; 存在缺少 required events 的胜利路径
- 第一步合法事件: walk
- Inputs: left down down left down down right up up up left left left left left left left left left up right down down down down down down right right right right right right right up up up right up up up right
- 返回解事件: walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk push_ice ice_stop_short:d1 walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=42, inputs=left down down left down down right up up up left left left left left left left left left up right down down down down down down right right right right right right right up up up right up up up right, events=walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk push_ice ice_stop_short:d1 walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=42, inputs=left down down left down down right up up up left left left left left left left left left up right down down down down down down right right right right right right right up up up right up up up right, events=walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk push_ice ice_stop_short:d1 walk

可达事件扫描：

- Status: complete
- 可达状态: 19716
- 合法转移: 68608
- 仅事件非法转移: 695
- Report hits: none
- 事件计数: walk=67896, push_ice=712, ice_blocks_ice_no_chain_push=190, ice_destroyed_d3=18, push_ice_failed=695, ice_destroy_group_d6_plus:len1=50, ice_boundary_disappear_after_group=92, ice_stop_short:d2=45, ice_boundary_disappear:d1=167, ice_rebound_d4=59, ice_pass_through_d5:len8=32, ice_stop_short:d1=239, ice_destroy_group_d6_plus:len7=6, ice_pass_through_d5:len1=74, slide_restart_after_group=70, ice_boundary_disappear:d3=63, ice_boundary_disappear:d5=15, ice_boundary_disappear:d6=11, ice_boundary_disappear:d7=3

### 起点 [10,16]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_blocks_ice_no_chain_push, ice_destroyed_d3, push_ice
- Inputs: up up up up up up up left left left left left left left left left up right down down down down down down right right right right right right right up up up right up up up right
- 返回解事件: push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk push_ice ice_stop_short:d1 walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=14059
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=14059

可达事件扫描：

- Status: complete
- 可达状态: 10972
- 合法转移: 38086
- 仅事件非法转移: 300
- Report hits: none
- 事件计数: push_ice=350, ice_blocks_ice_no_chain_push=63, ice_destroyed_d3=7, walk=37736, ice_destroy_group_d6_plus:len1=32, ice_boundary_disappear_after_group=53, ice_pass_through_d5:len8=16, ice_rebound_d4=27, ice_stop_short:d2=21, ice_stop_short:d1=128, push_ice_failed=300, ice_boundary_disappear:d5=15, ice_boundary_disappear:d3=41, ice_boundary_disappear:d1=44, ice_destroy_group_d6_plus:len7=3, ice_pass_through_d5:len1=39, slide_restart_after_group=37, ice_boundary_disappear:d6=11, ice_boundary_disappear:d7=3
