# 冰原起点比较：ICE_CAND_0016_v1_all_edge_starts

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [14,1]
- Required events: ice_stop_short:d2, ice_pass_through_d5:len1, slide_restart_after_group, ice_destroyed_d3, ice_destroy_group_d6_plus:len2
- Forbidden events: none
- Report-only events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [14,1] | fail | yes | 18 | no | none | none | complete, states=64, wins=1 | states=11, out=2, winOut=1, deadOut=1, dist=2 | one_win_continuation_per_scc, forced=2/2 | 返回解未覆盖全部 required events; 存在缺少 required events 的胜利路径 |
| [0,9] | fail | yes | 26 | no | none | none | complete, states=9483, wins=14 | states=102, out=8, winOut=8, deadOut=0, dist=2 | branching_win_dag, forced=0/2 | 返回解未覆盖全部 required events; 存在缺少 required events 的胜利路径 |

## 细节

### 起点 [14,1]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 返回解未覆盖全部 required events; 存在缺少 required events 的胜利路径
- 第一步合法事件: walk
- Inputs: left down left left up left left left down right right right right right up left right right
- 返回解事件: walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=18, inputs=left down left left up left left left down right right right right right up left right right, events=walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=18, inputs=left down left left up left left left down right right right right right up left right right, events=walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

可达事件扫描：

- Status: complete
- 可达状态: 64
- 合法转移: 162
- 仅事件非法转移: 7
- Report hits: none
- 事件计数: walk=156, push_ice=6, ice_blocks_ice_no_chain_push=3, ice_destroyed_d3=1, push_ice_failed=7, ice_boundary_disappear:d2=2, ice_stop_short:d2=3, ice_pass_through_d5:len2=1, slide_restart_after_group=1

### 起点 [0,9]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 返回解未覆盖全部 required events; 存在缺少 required events 的胜利路径
- 第一步合法事件: walk
- Inputs: right up up up up up up right right right right right up up right right down right right right right right up left right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=26, inputs=right up up up up up up right right right right right up up right right down right right right right right up left right right, events=walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=26, inputs=right up up up up up up right right right right right up up right right down right right right right right up left right right, events=walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

可达事件扫描：

- Status: complete
- 可达状态: 9483
- 合法转移: 29672
- 仅事件非法转移: 352
- Report hits: none
- 事件计数: walk=29268, push_ice=404, ice_rebound_d4=38, ice_pass_through_d5:len3=13, ice_boundary_disappear_after_group=37, ice_stop_short:d1=138, push_ice_failed=352, ice_boundary_disappear:d2=50, ice_destroy_group_d6_plus:len1=44, ice_stop_short:d2=47, ice_boundary_disappear:d5=12, ice_boundary_disappear:d1=16, ice_blocks_ice_no_chain_push=106, ice_destroyed_d3=61, ice_pass_through_d5:len1=11, slide_restart_after_group=49, ice_destroy_group_d6_plus:len2=17, ice_boundary_disappear:d9=3, ice_destroy_group_d6_plus:len3=1, ice_boundary_disappear:d12=2
