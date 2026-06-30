# 冰原起点比较：ICE_CAND_0013_v3_y1_lane_required_with_d3

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [9,0]
- Required events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_destroyed_d3
- Forbidden events: none
- Report-only events: none
- 已检查起点: 5

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [5,9] | fail | yes | 37 | yes | none | none | complete, states=2728, wins=1 | states=111, out=5, winOut=3, deadOut=2, dist=3 | branching_win_dag, forced=0/3 | 存在缺少 required events 的胜利路径 |
| [11,9] | fail | yes | 31 | yes | none | none | complete, states=2728, wins=1 | states=111, out=5, winOut=3, deadOut=2, dist=3 | branching_win_dag, forced=0/3 | 存在缺少 required events 的胜利路径 |
| [0,9] | fail | yes | 42 | yes | none | none | complete, states=2728, wins=1 | states=111, out=5, winOut=3, deadOut=2, dist=3 | branching_win_dag, forced=0/3 | 存在缺少 required events 的胜利路径 |
| [0,1] | fail | yes | 50 | yes | none | none | complete, states=2728, wins=1 | states=111, out=5, winOut=3, deadOut=2, dist=3 | branching_win_dag, forced=0/3 | 存在缺少 required events 的胜利路径 |
| [12,9] | fail | yes | 32 | yes | none | none | complete, states=2728, wins=1 | states=111, out=5, winOut=3, deadOut=2, dist=3 | branching_win_dag, forced=0/3 | 存在缺少 required events 的胜利路径 |

## 细节

### 起点 [5,9]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required events 的胜利路径
- 第一步合法事件: walk
- Inputs: right right right right right right up up up up up up left left left left up up left left up left left left left left down right right right right right right right right right up
- 返回解事件: walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=45, inputs=right right right right right right up up up up up up left left left left left left left up up right up right right down up left left left left left left left down right right right right right right right right right up, events=walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_boundary_disappear:d8 walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=45, inputs=right right right right right right up up up up up up left left left left left left left up up right up right right down up left left left left left left left down right right right right right right right right right up, events=walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_boundary_disappear:d8 walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 2728
- 合法转移: 9676
- 仅事件非法转移: 16
- Report hits: none
- 事件计数: walk=9586, push_ice=90, ice_boundary_disappear:d1=39, ice_pass_through_d5:len1=7, slide_restart_after_group=13, ice_stop_short:d1=7, ice_boundary_disappear:d11=7, ice_stop_short:d2=8, ice_blocks_ice_no_chain_push=12, ice_destroyed_d3=10, push_ice_failed=16, ice_boundary_disappear:d8=16, ice_pass_through_d5:len2=3, ice_destroy_group_d6_plus:len1=3, ice_boundary_disappear:d5=3

### 起点 [11,9]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required events 的胜利路径
- 第一步合法事件: ice_pass_through_d5:len1, ice_stop_short:d1, push_ice, slide_restart_after_group, walk
- Inputs: up up up up up up left left left left up up left left up left left left left left down right right right right right right right right right up
- 返回解事件: push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=39, inputs=up up up up up up left left left left left left left up up right up right right down up left left left left left left left down right right right right right right right right right up, events=push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_boundary_disappear:d8 walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=39, inputs=up up up up up up left left left left left left left up up right up right right down up left left left left left left left down right right right right right right right right right up, events=push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_boundary_disappear:d8 walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 2728
- 合法转移: 9676
- 仅事件非法转移: 16
- Report hits: none
- 事件计数: push_ice=90, ice_pass_through_d5:len1=7, slide_restart_after_group=13, ice_stop_short:d1=7, walk=9586, ice_boundary_disappear:d1=39, ice_boundary_disappear:d11=7, ice_blocks_ice_no_chain_push=12, ice_destroyed_d3=10, push_ice_failed=16, ice_stop_short:d2=8, ice_boundary_disappear:d8=16, ice_destroy_group_d6_plus:len1=3, ice_pass_through_d5:len2=3, ice_boundary_disappear:d5=3

### 起点 [0,9]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required events 的胜利路径
- 第一步合法事件: walk
- Inputs: right right right right right right right right right right right up up up up up up left left left left up up left left up left left left left left down right right right right right right right right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=50, inputs=right right right right right right right right right right right up up up up up up left left left left left left left up up right up right right down up left left left left left left left down right right right right right right right right right up, events=walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_boundary_disappear:d8 walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=50, inputs=right right right right right right right right right right right up up up up up up left left left left left left left up up right up right right down up left left left left left left left down right right right right right right right right right up, events=walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_boundary_disappear:d8 walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 2728
- 合法转移: 9676
- 仅事件非法转移: 16
- Report hits: none
- 事件计数: walk=9586, push_ice=90, ice_blocks_ice_no_chain_push=12, ice_destroyed_d3=10, ice_boundary_disappear:d1=39, ice_boundary_disappear:d8=16, ice_pass_through_d5:len1=7, slide_restart_after_group=13, ice_stop_short:d1=7, ice_stop_short:d2=8, ice_boundary_disappear:d11=7, push_ice_failed=16, ice_boundary_disappear:d5=3, ice_pass_through_d5:len2=3, ice_destroy_group_d6_plus:len1=3

### 起点 [0,1]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required events 的胜利路径
- 第一步合法事件: ice_blocks_ice_no_chain_push, ice_destroyed_d3, push_ice, walk
- Inputs: down down down down down down down down right right right right right right right right right right right up up up up up up left left left left up up left left up left left left left left down right right right right right right right right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=52, inputs=up right right down right right right up right right down down down down down down down down down right right right right up up up up up up left left left left left left left up left left left left up right right right right right right right right right up, events=walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_boundary_disappear:d8 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=52, inputs=up right right down right right right up right right down down down down down down down down down right right right right up up up up up up left left left left left left left up left left left left up right right right right right right right right right up, events=walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_boundary_disappear:d8 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 2728
- 合法转移: 9676
- 仅事件非法转移: 16
- Report hits: none
- 事件计数: walk=9586, push_ice=90, ice_blocks_ice_no_chain_push=12, ice_destroyed_d3=10, ice_boundary_disappear:d8=16, ice_boundary_disappear:d1=39, ice_stop_short:d2=8, push_ice_failed=16, ice_boundary_disappear:d5=3, ice_pass_through_d5:len2=3, slide_restart_after_group=13, ice_destroy_group_d6_plus:len1=3, ice_pass_through_d5:len1=7, ice_stop_short:d1=7, ice_boundary_disappear:d11=7

### 起点 [12,9]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required events 的胜利路径
- 第一步合法事件: walk
- Inputs: left up up up up up up left left left left up up left left up left left left left left down right right right right right right right right right up
- 返回解事件: walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=40, inputs=left up up up up up up left left left left left left left up up right up right right down up left left left left left left left down right right right right right right right right right up, events=walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_boundary_disappear:d8 walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=40, inputs=left up up up up up up left left left left left left left up up right up right right down up left left left left left left left down right right right right right right right right right up, events=walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_boundary_disappear:d8 walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 2728
- 合法转移: 9676
- 仅事件非法转移: 16
- Report hits: none
- 事件计数: walk=9586, push_ice=90, ice_boundary_disappear:d11=7, ice_pass_through_d5:len1=7, slide_restart_after_group=13, ice_stop_short:d1=7, ice_boundary_disappear:d1=39, ice_blocks_ice_no_chain_push=12, ice_destroyed_d3=10, push_ice_failed=16, ice_stop_short:d2=8, ice_boundary_disappear:d8=16, ice_destroy_group_d6_plus:len1=3, ice_pass_through_d5:len2=3, ice_boundary_disappear:d5=3
