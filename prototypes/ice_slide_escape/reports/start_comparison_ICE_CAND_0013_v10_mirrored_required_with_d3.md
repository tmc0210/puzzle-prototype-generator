# 冰原起点比较：ICE_CAND_0013_v10_mirrored_required_with_d3

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
| [0,8] | pass | yes | 30 | yes | none | none | complete, states=2809, wins=1 | states=113, out=4, winOut=2, deadOut=2, dist=3 | branching_win_dag, forced=0/3 | none |
| [1,9] | pass | yes | 28 | yes | none | none | complete, states=2809, wins=1 | states=113, out=4, winOut=2, deadOut=2, dist=3 | branching_win_dag, forced=0/3 | none |
| [0,9] | pass | yes | 29 | yes | none | none | complete, states=2809, wins=1 | states=113, out=4, winOut=2, deadOut=2, dist=3 | branching_win_dag, forced=0/3 | none |
| [12,8] | pass | yes | 40 | yes | none | none | complete, states=2809, wins=1 | states=113, out=4, winOut=2, deadOut=2, dist=3 | branching_win_dag, forced=0/3 | none |
| [12,0] | pass | yes | 48 | yes | none | none | complete, states=2809, wins=1 | states=113, out=4, winOut=2, deadOut=2, dist=3 | branching_win_dag, forced=0/3 | none |

## 细节

### 起点 [0,8]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_boundary_disappear:d11, push_ice, walk
- Inputs: down right up up up up up up right up right right right up right right left down down right right right right right up right up left up right
- 返回解事件: walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=5281
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=5281

可达事件扫描：

- Status: complete
- 可达状态: 2809
- 合法转移: 9672
- 仅事件非法转移: 11
- Report hits: none
- 事件计数: walk=9576, push_ice=96, ice_boundary_disappear:d11=7, ice_boundary_disappear:d1=40, ice_pass_through_d5:len1=6, slide_restart_after_group=10, ice_stop_short:d1=6, ice_stop_short:d2=10, ice_blocks_ice_no_chain_push=11, ice_destroyed_d3=8, push_ice_failed=11, ice_boundary_disappear:d8=18, ice_destroy_group_d6_plus:len1=3, ice_boundary_disappear:d4=2, ice_boundary_disappear:d5=4, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear:d3=1

### 起点 [1,9]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_pass_through_d5:len1, ice_stop_short:d1, push_ice, slide_restart_after_group, walk
- Inputs: up up up up up up right up right right right up right right left down down right right right right right up right up left up right
- 返回解事件: push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=5281
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=5281

可达事件扫描：

- Status: complete
- 可达状态: 2809
- 合法转移: 9672
- 仅事件非法转移: 11
- Report hits: none
- 事件计数: push_ice=96, ice_pass_through_d5:len1=6, slide_restart_after_group=10, ice_stop_short:d1=6, walk=9576, ice_boundary_disappear:d11=7, ice_boundary_disappear:d1=40, ice_stop_short:d2=10, push_ice_failed=11, ice_boundary_disappear:d8=18, ice_blocks_ice_no_chain_push=11, ice_destroyed_d3=8, ice_destroy_group_d6_plus:len1=3, ice_boundary_disappear:d4=2, ice_boundary_disappear:d5=4, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear:d3=1

### 起点 [0,9]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up up up up up up right up right right right up right right left down down right right right right right up right up left up right
- 返回解事件: walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=5281
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=5281

可达事件扫描：

- Status: complete
- 可达状态: 2809
- 合法转移: 9672
- 仅事件非法转移: 11
- Report hits: none
- 事件计数: walk=9576, push_ice=96, ice_boundary_disappear:d11=7, ice_pass_through_d5:len1=6, slide_restart_after_group=10, ice_stop_short:d1=6, ice_boundary_disappear:d1=40, ice_stop_short:d2=10, push_ice_failed=11, ice_blocks_ice_no_chain_push=11, ice_destroyed_d3=8, ice_boundary_disappear:d8=18, ice_destroy_group_d6_plus:len1=3, ice_boundary_disappear:d4=2, ice_boundary_disappear:d5=4, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear:d3=1

### 起点 [12,8]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down left left left left left left left left left left left up up up up up up right up right right right up right right left down down right right right right right up right up left up right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=5281
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=5281

可达事件扫描：

- Status: complete
- 可达状态: 2809
- 合法转移: 9672
- 仅事件非法转移: 11
- Report hits: none
- 事件计数: walk=9576, push_ice=96, ice_blocks_ice_no_chain_push=11, ice_destroyed_d3=8, ice_boundary_disappear:d1=40, ice_boundary_disappear:d8=18, ice_stop_short:d2=10, ice_pass_through_d5:len1=6, slide_restart_after_group=10, ice_stop_short:d1=6, push_ice_failed=11, ice_boundary_disappear:d11=7, ice_boundary_disappear:d5=4, ice_destroy_group_d6_plus:len1=3, ice_boundary_disappear:d4=2, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear:d3=1

### 起点 [12,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down down down down down left left left left left left left left left left left up up up up up up right up right right right up right right left down down right right right right right up right up left up right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=5281
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=5281

可达事件扫描：

- Status: complete
- 可达状态: 2809
- 合法转移: 9672
- 仅事件非法转移: 11
- Report hits: none
- 事件计数: walk=9576, push_ice=96, ice_blocks_ice_no_chain_push=11, ice_destroyed_d3=8, ice_boundary_disappear:d8=18, ice_boundary_disappear:d1=40, ice_stop_short:d2=10, push_ice_failed=11, ice_boundary_disappear:d5=4, ice_pass_through_d5:len1=6, slide_restart_after_group=10, ice_stop_short:d1=6, ice_boundary_disappear:d11=7, ice_destroy_group_d6_plus:len1=3, ice_boundary_disappear:d4=2, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear:d3=1
