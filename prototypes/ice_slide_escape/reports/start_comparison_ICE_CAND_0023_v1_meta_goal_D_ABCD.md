# 冰原起点比较：ICE_CAND_0023_v1_meta_goal_D_ABCD

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [13,4]
- Required events: ice_destroy_group_d6_plus:len1, ice_pass_through_d5:len2, slide_restart_after_group, ice_stop_short:d1, ice_stop_short:d2
- Forbidden events: none
- Report-only events: none
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,2] | fail | no | n/a | no | none | none | complete, states=1703, wins=0 | states=15, out=8, winOut=0, deadOut=8, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [0,4] | fail | no | n/a | no | none | none | complete, states=1703, wins=0 | states=15, out=8, winOut=0, deadOut=8, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [13,5] | fail | yes | 29 | yes | none | none | complete, states=13866, wins=11 | states=20, out=5, winOut=1, deadOut=4, dist=4 | branching_win_dag, forced=1/4 | 存在缺少 required events 的胜利路径 |
| [13,4] | fail | yes | 28 | yes | none | none | complete, states=13866, wins=11 | states=20, out=5, winOut=1, deadOut=4, dist=4 | branching_win_dag, forced=1/4 | 存在缺少 required events 的胜利路径 |

## 细节

### 起点 [0,2]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1994
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1994

可达事件扫描：

- Status: complete
- 可达状态: 1703
- 合法转移: 4609
- 仅事件非法转移: 386
- Report hits: none
- 事件计数: walk=4318, push_ice=291, ice_blocks_ice_no_chain_push=86, ice_stop_short:d1=141, push_ice_failed=386, ice_stop_short:d2=94, ice_boundary_disappear:d2=40, ice_boundary_disappear:d3=9, ice_boundary_disappear:d1=7

### 起点 [0,4]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1994
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1994

可达事件扫描：

- Status: complete
- 可达状态: 1703
- 合法转移: 4609
- 仅事件非法转移: 386
- Report hits: none
- 事件计数: walk=4318, push_ice=291, ice_stop_short:d2=94, ice_blocks_ice_no_chain_push=86, ice_stop_short:d1=141, push_ice_failed=386, ice_boundary_disappear:d2=40, ice_boundary_disappear:d3=9, ice_boundary_disappear:d1=7

### 起点 [13,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required events 的胜利路径
- 第一步合法事件: walk
- Inputs: up left up up left right down down down down down left left left left left left up up right up left right right right right right right right
- 返回解事件: walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=39, inputs=up left left left left left left left left left up up down down right right down right down down left up up right up left right right right right right right up up left right down down right, events=walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=39, inputs=up left left left left left left left left left up up down down right right down right down down left up up right up left right right right right right right up up left right down down right, events=walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 13866
- 合法转移: 32591
- 仅事件非法转移: 2645
- Report hits: none
- 事件计数: walk=31464, push_ice=1127, ice_destroy_group_d6_plus:len1=2, slide_restart_after_group=87, ice_blocks_ice_no_chain_push=1010, ice_stop_short:d2=346, push_ice_failed=2645, ice_pass_through_d5:len2=41, ice_stop_short:d1=644, ice_boundary_disappear:d2=38, ice_boundary_disappear:d1=3, ice_boundary_disappear:d3=32, ice_pass_through_d5:len1=40, ice_boundary_disappear:d5=32, ice_boundary_disappear:d4=32, ice_pass_through_d5:len3=4

### 起点 [13,4]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required events 的胜利路径
- 第一步合法事件: ice_blocks_ice_no_chain_push, ice_destroy_group_d6_plus:len1, ice_stop_short:d2, push_ice, slide_restart_after_group, walk
- Inputs: left up up left right down down down down down left left left left left left up up right up left right right right right right right right
- 返回解事件: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=38, inputs=left left left left left left left left left up up down down right right down right down down left up up right up left right right right right right right up up left right down down right, events=push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=38, inputs=left left left left left left left left left up up down down right right down right down down left up up right up left right right right right right right up up left right down down right, events=push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 13866
- 合法转移: 32591
- 仅事件非法转移: 2645
- Report hits: none
- 事件计数: walk=31464, push_ice=1127, ice_destroy_group_d6_plus:len1=2, slide_restart_after_group=87, ice_blocks_ice_no_chain_push=1010, ice_stop_short:d2=346, ice_pass_through_d5:len2=41, ice_stop_short:d1=644, push_ice_failed=2645, ice_boundary_disappear:d2=38, ice_boundary_disappear:d1=3, ice_boundary_disappear:d3=32, ice_pass_through_d5:len1=40, ice_boundary_disappear:d5=32, ice_boundary_disappear:d4=32, ice_pass_through_d5:len3=4
