# 冰原起点比较：ICE_CAND_0006_start_refine

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [9,0]
- Required events: ice_rebound_d4, ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short
- Forbidden events: none
- Report-only events: none
- 已检查起点: 11

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [9,0] | fail | no | n/a | no | none | none | complete, states=15, wins=0 | states=7, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [0,2] | pass | yes | 77 | yes | none | none | complete, states=1446, wins=1 | states=38, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [0,3] | pass | yes | 76 | yes | none | none | complete, states=1446, wins=1 | states=38, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [0,4] | pass | yes | 75 | yes | none | none | complete, states=1446, wins=1 | states=38, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [0,5] | pass | yes | 74 | yes | none | none | complete, states=1446, wins=1 | states=38, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [0,6] | pass | yes | 73 | yes | none | none | complete, states=1446, wins=1 | states=38, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [0,7] | pass | yes | 72 | yes | none | none | complete, states=1446, wins=1 | states=38, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [0,8] | pass | yes | 71 | yes | none | none | complete, states=1446, wins=1 | states=38, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [0,9] | pass | yes | 70 | yes | none | none | complete, states=1446, wins=1 | states=38, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [0,10] | pass | yes | 69 | yes | none | none | complete, states=1446, wins=1 | states=38, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [0,11] | pass | yes | 68 | yes | none | none | complete, states=1446, wins=1 | states=38, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |

## 细节

### 起点 [9,0]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=15
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=15

可达事件扫描：

- Status: complete
- 可达状态: 15
- 合法转移: 31
- 仅事件非法转移: 1
- Report hits: none
- 事件计数: walk=30, push_ice=1, ice_stop_short:d1=1, push_ice_failed=1

### 起点 [0,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_destroy_group_d6_plus:len2, ice_stop_short:d2, push_ice, slide_restart_after_group, walk
- Inputs: down down down down down down down down down right right right right right right right up up up up up up up up up up right left down down down down down down down down down down right right right right up up down down left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1498
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1498

可达事件扫描：

- Status: complete
- 可达状态: 1446
- 合法转移: 2985
- 仅事件非法转移: 58
- Report hits: none
- 事件计数: walk=2940, push_ice=45, ice_destroy_group_d6_plus:len2=8, slide_restart_after_group=17, ice_stop_short:d2=13, ice_rebound_d4=3, push_ice_failed=58, ice_stop_short:d1=19, ice_pass_through_d5:len1=6, ice_pass_through_d5:len2=3, ice_pass_through_d5:len4=1, ice_boundary_disappear_after_group=1, ice_boundary_disappear:d1=8, ice_blocks_ice_no_chain_push=16, ice_destroyed_d3=1

### 起点 [0,3]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down down down down right right right right right right right up up up up up up up up up up right left down down down down down down down down down down right right right right up up down down left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1498
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1498

可达事件扫描：

- Status: complete
- 可达状态: 1446
- 合法转移: 2985
- 仅事件非法转移: 58
- Report hits: none
- 事件计数: walk=2940, push_ice=45, ice_destroy_group_d6_plus:len2=8, slide_restart_after_group=17, ice_stop_short:d2=13, ice_rebound_d4=3, push_ice_failed=58, ice_stop_short:d1=19, ice_pass_through_d5:len1=6, ice_pass_through_d5:len2=3, ice_pass_through_d5:len4=1, ice_boundary_disappear_after_group=1, ice_boundary_disappear:d1=8, ice_blocks_ice_no_chain_push=16, ice_destroyed_d3=1

### 起点 [0,4]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down down down right right right right right right right up up up up up up up up up up right left down down down down down down down down down down right right right right up up down down left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1498
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1498

可达事件扫描：

- Status: complete
- 可达状态: 1446
- 合法转移: 2985
- 仅事件非法转移: 58
- Report hits: none
- 事件计数: walk=2940, push_ice=45, ice_destroy_group_d6_plus:len2=8, slide_restart_after_group=17, ice_stop_short:d2=13, ice_rebound_d4=3, push_ice_failed=58, ice_stop_short:d1=19, ice_pass_through_d5:len1=6, ice_pass_through_d5:len2=3, ice_pass_through_d5:len4=1, ice_boundary_disappear_after_group=1, ice_boundary_disappear:d1=8, ice_blocks_ice_no_chain_push=16, ice_destroyed_d3=1

### 起点 [0,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down down right right right right right right right up up up up up up up up up up right left down down down down down down down down down down right right right right up up down down left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1498
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1498

可达事件扫描：

- Status: complete
- 可达状态: 1446
- 合法转移: 2985
- 仅事件非法转移: 58
- Report hits: none
- 事件计数: walk=2940, push_ice=45, ice_destroy_group_d6_plus:len2=8, slide_restart_after_group=17, ice_stop_short:d2=13, ice_rebound_d4=3, push_ice_failed=58, ice_stop_short:d1=19, ice_pass_through_d5:len1=6, ice_pass_through_d5:len2=3, ice_boundary_disappear:d1=8, ice_pass_through_d5:len4=1, ice_boundary_disappear_after_group=1, ice_blocks_ice_no_chain_push=16, ice_destroyed_d3=1

### 起点 [0,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down right right right right right right right up up up up up up up up up up right left down down down down down down down down down down right right right right up up down down left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1498
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1498

可达事件扫描：

- Status: complete
- 可达状态: 1446
- 合法转移: 2985
- 仅事件非法转移: 58
- Report hits: none
- 事件计数: walk=2940, push_ice=45, ice_destroy_group_d6_plus:len2=8, slide_restart_after_group=17, ice_stop_short:d2=13, ice_rebound_d4=3, push_ice_failed=58, ice_stop_short:d1=19, ice_pass_through_d5:len1=6, ice_pass_through_d5:len2=3, ice_boundary_disappear:d1=8, ice_pass_through_d5:len4=1, ice_boundary_disappear_after_group=1, ice_blocks_ice_no_chain_push=16, ice_destroyed_d3=1

### 起点 [0,7]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down right right right right right right right up up up up up up up up up up right left down down down down down down down down down down right right right right up up down down left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1498
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1498

可达事件扫描：

- Status: complete
- 可达状态: 1446
- 合法转移: 2985
- 仅事件非法转移: 58
- Report hits: none
- 事件计数: walk=2940, push_ice=45, ice_destroy_group_d6_plus:len2=8, slide_restart_after_group=17, ice_stop_short:d2=13, ice_rebound_d4=3, push_ice_failed=58, ice_stop_short:d1=19, ice_pass_through_d5:len1=6, ice_boundary_disappear:d1=8, ice_pass_through_d5:len2=3, ice_pass_through_d5:len4=1, ice_boundary_disappear_after_group=1, ice_blocks_ice_no_chain_push=16, ice_destroyed_d3=1

### 起点 [0,8]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down right right right right right right right up up up up up up up up up up right left down down down down down down down down down down right right right right up up down down left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1498
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1498

可达事件扫描：

- Status: complete
- 可达状态: 1446
- 合法转移: 2985
- 仅事件非法转移: 58
- Report hits: none
- 事件计数: walk=2940, push_ice=45, ice_destroy_group_d6_plus:len2=8, slide_restart_after_group=17, ice_stop_short:d2=13, ice_rebound_d4=3, push_ice_failed=58, ice_pass_through_d5:len1=6, ice_stop_short:d1=19, ice_boundary_disappear:d1=8, ice_pass_through_d5:len2=3, ice_pass_through_d5:len4=1, ice_boundary_disappear_after_group=1, ice_blocks_ice_no_chain_push=16, ice_destroyed_d3=1

### 起点 [0,9]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down right right right right right right right up up up up up up up up up up right left down down down down down down down down down down right right right right up up down down left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1498
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1498

可达事件扫描：

- Status: complete
- 可达状态: 1446
- 合法转移: 2985
- 仅事件非法转移: 58
- Report hits: none
- 事件计数: walk=2940, push_ice=45, ice_destroy_group_d6_plus:len2=8, slide_restart_after_group=17, ice_stop_short:d2=13, ice_pass_through_d5:len1=6, ice_rebound_d4=3, push_ice_failed=58, ice_stop_short:d1=19, ice_boundary_disappear:d1=8, ice_pass_through_d5:len2=3, ice_blocks_ice_no_chain_push=16, ice_pass_through_d5:len4=1, ice_boundary_disappear_after_group=1, ice_destroyed_d3=1

### 起点 [0,10]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down right right right right right right right up up up up up up up up up up right left down down down down down down down down down down right right right right up up down down left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1498
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1498

可达事件扫描：

- Status: complete
- 可达状态: 1446
- 合法转移: 2985
- 仅事件非法转移: 58
- Report hits: none
- 事件计数: walk=2940, push_ice=45, ice_destroy_group_d6_plus:len2=8, slide_restart_after_group=17, ice_stop_short:d2=13, ice_pass_through_d5:len1=6, ice_rebound_d4=3, push_ice_failed=58, ice_stop_short:d1=19, ice_boundary_disappear:d1=8, ice_pass_through_d5:len2=3, ice_blocks_ice_no_chain_push=16, ice_pass_through_d5:len4=1, ice_boundary_disappear_after_group=1, ice_destroyed_d3=1

### 起点 [0,11]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right right right up up up up up up up up up up right left down down down down down down down down down down right right right right up up down down left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1498
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1498

可达事件扫描：

- Status: complete
- 可达状态: 1446
- 合法转移: 2985
- 仅事件非法转移: 58
- Report hits: none
- 事件计数: walk=2940, push_ice=45, ice_destroy_group_d6_plus:len2=8, slide_restart_after_group=17, ice_stop_short:d2=13, ice_pass_through_d5:len1=6, ice_rebound_d4=3, push_ice_failed=58, ice_stop_short:d1=19, ice_boundary_disappear:d1=8, ice_blocks_ice_no_chain_push=16, ice_pass_through_d5:len2=3, ice_pass_through_d5:len4=1, ice_boundary_disappear_after_group=1, ice_destroyed_d3=1
