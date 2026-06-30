# 冰原起点比较：ICE_CAND_0013_v9_mirrored_required_with_d3

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [12,0]
- Required events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_destroyed_d3
- Forbidden events: none
- Report-only events: none
- 已检查起点: 5

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,8] | fail | yes | 26 | yes | none | none | complete, states=3639, wins=3 | states=120, out=5, winOut=3, deadOut=2, dist=3 | branching_win_dag, forced=0/3 | 存在缺少 required events 的胜利路径 |
| [1,9] | fail | yes | 24 | yes | none | none | complete, states=3639, wins=3 | states=120, out=5, winOut=3, deadOut=2, dist=3 | branching_win_dag, forced=0/3 | 存在缺少 required events 的胜利路径 |
| [0,9] | fail | yes | 25 | yes | none | none | complete, states=3639, wins=3 | states=120, out=5, winOut=3, deadOut=2, dist=3 | branching_win_dag, forced=0/3 | 存在缺少 required events 的胜利路径 |
| [12,8] | fail | yes | 36 | yes | none | none | complete, states=3639, wins=3 | states=120, out=5, winOut=3, deadOut=2, dist=3 | branching_win_dag, forced=0/3 | 存在缺少 required events 的胜利路径 |
| [12,0] | fail | yes | 42 | no | none | none | complete, states=3639, wins=3 | states=120, out=5, winOut=3, deadOut=2, dist=3 | branching_win_dag, forced=0/3 | 返回解未覆盖全部 required events; 存在缺少 required events 的胜利路径 |

## 细节

### 起点 [0,8]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required events 的胜利路径
- 第一步合法事件: ice_boundary_disappear:d11, push_ice, walk
- Inputs: down right up up up up up up right up right right right up right right right right up right right right down left up right
- 返回解事件: walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=30, inputs=down right up up up up up up right right right right right right right right up up left left right right up right right right down left up right, events=walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=30, inputs=down right up up up up up up right right right right right right right right up up left left right right up right right right down left up right, events=walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

可达事件扫描：

- Status: complete
- 可达状态: 3639
- 合法转移: 12682
- 仅事件非法转移: 21
- Report hits: none
- 事件计数: walk=12540, push_ice=142, ice_boundary_disappear:d11=8, ice_boundary_disappear:d1=63, ice_pass_through_d5:len1=7, slide_restart_after_group=15, ice_stop_short:d1=7, ice_stop_short:d2=16, ice_blocks_ice_no_chain_push=20, ice_destroyed_d3=8, push_ice_failed=21, ice_boundary_disappear:d8=30, ice_destroy_group_d6_plus:len1=3, ice_boundary_disappear:d4=4, ice_pass_through_d5:len2=3, ice_boundary_disappear:d5=4, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear:d3=2, ice_pass_through_d5:len3=1

### 起点 [1,9]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required events 的胜利路径
- 第一步合法事件: ice_pass_through_d5:len1, ice_stop_short:d1, push_ice, slide_restart_after_group, walk
- Inputs: up up up up up up right up right right right up right right right right up right right right down left up right
- 返回解事件: push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=28, inputs=up up up up up up right right right right right right right right up up left left right right up right right right down left up right, events=push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=28, inputs=up up up up up up right right right right right right right right up up left left right right up right right right down left up right, events=push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

可达事件扫描：

- Status: complete
- 可达状态: 3639
- 合法转移: 12682
- 仅事件非法转移: 21
- Report hits: none
- 事件计数: push_ice=142, ice_pass_through_d5:len1=7, slide_restart_after_group=15, ice_stop_short:d1=7, walk=12540, ice_boundary_disappear:d11=8, ice_boundary_disappear:d1=63, ice_stop_short:d2=16, push_ice_failed=21, ice_boundary_disappear:d8=30, ice_blocks_ice_no_chain_push=20, ice_destroyed_d3=8, ice_destroy_group_d6_plus:len1=3, ice_boundary_disappear:d4=4, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear:d3=2, ice_pass_through_d5:len2=3, ice_boundary_disappear:d5=4, ice_pass_through_d5:len3=1

### 起点 [0,9]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required events 的胜利路径
- 第一步合法事件: walk
- Inputs: right up up up up up up right up right right right up right right right right up right right right down left up right
- 返回解事件: walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=29, inputs=right up up up up up up right right right right right right right right up up left left right right up right right right down left up right, events=walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=29, inputs=right up up up up up up right right right right right right right right up up left left right right up right right right down left up right, events=walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

可达事件扫描：

- Status: complete
- 可达状态: 3639
- 合法转移: 12682
- 仅事件非法转移: 21
- Report hits: none
- 事件计数: walk=12540, push_ice=142, ice_boundary_disappear:d11=8, ice_pass_through_d5:len1=7, slide_restart_after_group=15, ice_stop_short:d1=7, ice_boundary_disappear:d1=63, ice_stop_short:d2=16, push_ice_failed=21, ice_blocks_ice_no_chain_push=20, ice_destroyed_d3=8, ice_boundary_disappear:d8=30, ice_destroy_group_d6_plus:len1=3, ice_boundary_disappear:d4=4, ice_pass_through_d5:len2=3, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear:d3=2, ice_boundary_disappear:d5=4, ice_pass_through_d5:len3=1

### 起点 [12,8]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required events 的胜利路径
- 第一步合法事件: walk
- Inputs: down left left left left left left left left left left left up up up up up up right up right right right up right right right right up right right right down left up right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=40, inputs=down left left left left left left left left left left left up up up up up up right right right right right right right right up up left left right right up right right right down left up right, events=walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=40, inputs=down left left left left left left left left left left left up up up up up up right right right right right right right right up up left left right right up right right right down left up right, events=walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

可达事件扫描：

- Status: complete
- 可达状态: 3639
- 合法转移: 12682
- 仅事件非法转移: 21
- Report hits: none
- 事件计数: walk=12540, push_ice=142, ice_blocks_ice_no_chain_push=20, ice_destroyed_d3=8, ice_boundary_disappear:d1=63, ice_boundary_disappear:d8=30, ice_stop_short:d2=16, ice_pass_through_d5:len1=7, slide_restart_after_group=15, ice_stop_short:d1=7, push_ice_failed=21, ice_boundary_disappear:d11=8, ice_boundary_disappear:d5=4, ice_pass_through_d5:len2=3, ice_boundary_disappear:d4=4, ice_destroy_group_d6_plus:len1=3, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear:d3=2, ice_pass_through_d5:len3=1

### 起点 [12,0]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 返回解未覆盖全部 required events; 存在缺少 required events 的胜利路径
- 第一步合法事件: walk
- Inputs: left left down left left left left down down down down down down down down left left left left left up up up up up up right right right right right right right right up right right right up left up right
- 返回解事件: walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=42, inputs=left left down left left left left down down down down down down down down left left left left left up up up up up up right right right right right right right right up right right right up left up right, events=walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=42, inputs=left left down left left left left down down down down down down down down left left left left left up up up up up up right right right right right right right right up right right right up left up right, events=walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

可达事件扫描：

- Status: complete
- 可达状态: 3639
- 合法转移: 12682
- 仅事件非法转移: 21
- Report hits: none
- 事件计数: walk=12540, push_ice=142, ice_blocks_ice_no_chain_push=20, ice_destroyed_d3=8, ice_boundary_disappear:d8=30, ice_boundary_disappear:d1=63, ice_stop_short:d2=16, push_ice_failed=21, ice_boundary_disappear:d5=4, ice_pass_through_d5:len2=3, slide_restart_after_group=15, ice_boundary_disappear:d4=4, ice_destroy_group_d6_plus:len1=3, ice_pass_through_d5:len1=7, ice_stop_short:d1=7, ice_boundary_disappear:d11=8, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear:d3=2, ice_pass_through_d5:len3=1
