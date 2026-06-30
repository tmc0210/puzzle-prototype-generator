# 冰原起点比较：ICE_CAND_0008_start_refine

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [13,11]
- Required events: ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group, ice_rebound_d4, ice_blocks_ice_no_chain_push, ice_stop_short
- Forbidden events: none
- Report-only events: none
- 已检查起点: 11

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,2] | pass | yes | 54 | yes | none | none | complete, states=653, wins=1 | states=36, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [0,3] | pass | yes | 55 | yes | none | none | complete, states=653, wins=1 | states=36, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [5,11] | pass | yes | 68 | yes | none | none | complete, states=653, wins=1 | states=36, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [6,11] | pass | yes | 69 | yes | none | none | complete, states=653, wins=1 | states=36, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [7,11] | pass | yes | 70 | yes | none | none | complete, states=653, wins=1 | states=36, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [8,11] | pass | yes | 71 | yes | none | none | complete, states=653, wins=1 | states=36, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [9,11] | pass | yes | 72 | yes | none | none | complete, states=653, wins=1 | states=36, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [10,11] | pass | yes | 73 | yes | none | none | complete, states=653, wins=1 | states=36, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [11,11] | pass | yes | 74 | yes | none | none | complete, states=653, wins=1 | states=36, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [12,11] | pass | yes | 75 | yes | none | none | complete, states=653, wins=1 | states=36, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [13,11] | pass | yes | 76 | yes | none | none | complete, states=653, wins=1 | states=36, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |

## 细节

### 起点 [0,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_destroy_group_d6_plus:len2, ice_stop_short:d2, push_ice, slide_restart_after_group, walk
- Inputs: right down right right right right down down down down down down down down right right right right right right up down left left left left left left up up up up up up up up right left down down down down down down down down right right right right right right right right
- 返回解事件: push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=810
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=810

可达事件扫描：

- Status: complete
- 可达状态: 653
- 合法转移: 1530
- 仅事件非法转移: 39
- Report hits: none
- 事件计数: walk=1500, push_ice=30, ice_destroy_group_d6_plus:len2=4, slide_restart_after_group=10, ice_stop_short:d2=6, push_ice_failed=39, ice_boundary_disappear:d1=4, ice_pass_through_d5:len2=6, ice_boundary_disappear_after_group=6, ice_boundary_disappear:d6=7, ice_pass_through_d5:len1=6, ice_blocks_ice_no_chain_push=9, ice_stop_short:d1=5, ice_rebound_d4=1, ice_boundary_disappear:d9=1

### 起点 [0,3]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up right down right right right right down down down down down down down down right right right right right right up down left left left left left left up up up up up up up up right left down down down down down down down down right right right right right right right right
- 返回解事件: walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=810
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=810

可达事件扫描：

- Status: complete
- 可达状态: 653
- 合法转移: 1530
- 仅事件非法转移: 39
- Report hits: none
- 事件计数: walk=1500, push_ice=30, ice_destroy_group_d6_plus:len2=4, slide_restart_after_group=10, ice_stop_short:d2=6, push_ice_failed=39, ice_boundary_disappear:d1=4, ice_pass_through_d5:len2=6, ice_boundary_disappear_after_group=6, ice_boundary_disappear:d6=7, ice_pass_through_d5:len1=6, ice_blocks_ice_no_chain_push=9, ice_stop_short:d1=5, ice_rebound_d4=1, ice_boundary_disappear:d9=1

### 起点 [5,11]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up up up up up up up up left left left left left up right down right right right right down down down down down down down down right right right right right right up down left left left left left left up up up up up up up up right left down down down down down down down down right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=810
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=810

可达事件扫描：

- Status: complete
- 可达状态: 653
- 合法转移: 1530
- 仅事件非法转移: 39
- Report hits: none
- 事件计数: walk=1500, push_ice=30, ice_pass_through_d5:len1=6, slide_restart_after_group=10, ice_stop_short:d2=6, ice_pass_through_d5:len2=6, ice_boundary_disappear_after_group=6, push_ice_failed=39, ice_boundary_disappear:d1=4, ice_boundary_disappear:d6=7, ice_destroy_group_d6_plus:len2=4, ice_blocks_ice_no_chain_push=9, ice_stop_short:d1=5, ice_rebound_d4=1, ice_boundary_disappear:d9=1

### 起点 [6,11]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left up up up up up up up up left left left left left up right down right right right right down down down down down down down down right right right right right right up down left left left left left left up up up up up up up up right left down down down down down down down down right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=810
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=810

可达事件扫描：

- Status: complete
- 可达状态: 653
- 合法转移: 1530
- 仅事件非法转移: 39
- Report hits: none
- 事件计数: walk=1500, push_ice=30, ice_pass_through_d5:len1=6, slide_restart_after_group=10, ice_stop_short:d2=6, ice_pass_through_d5:len2=6, ice_boundary_disappear_after_group=6, push_ice_failed=39, ice_boundary_disappear:d1=4, ice_boundary_disappear:d6=7, ice_destroy_group_d6_plus:len2=4, ice_blocks_ice_no_chain_push=9, ice_stop_short:d1=5, ice_rebound_d4=1, ice_boundary_disappear:d9=1

### 起点 [7,11]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left up up up up up up up up left left left left left up right down right right right right down down down down down down down down right right right right right right up down left left left left left left up up up up up up up up right left down down down down down down down down right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=810
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=810

可达事件扫描：

- Status: complete
- 可达状态: 653
- 合法转移: 1530
- 仅事件非法转移: 39
- Report hits: none
- 事件计数: walk=1500, push_ice=30, ice_pass_through_d5:len1=6, slide_restart_after_group=10, ice_stop_short:d2=6, ice_pass_through_d5:len2=6, ice_boundary_disappear_after_group=6, push_ice_failed=39, ice_boundary_disappear:d1=4, ice_boundary_disappear:d6=7, ice_destroy_group_d6_plus:len2=4, ice_blocks_ice_no_chain_push=9, ice_stop_short:d1=5, ice_rebound_d4=1, ice_boundary_disappear:d9=1

### 起点 [8,11]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left left up up up up up up up up left left left left left up right down right right right right down down down down down down down down right right right right right right up down left left left left left left up up up up up up up up right left down down down down down down down down right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=810
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=810

可达事件扫描：

- Status: complete
- 可达状态: 653
- 合法转移: 1530
- 仅事件非法转移: 39
- Report hits: none
- 事件计数: walk=1500, push_ice=30, ice_pass_through_d5:len1=6, slide_restart_after_group=10, ice_stop_short:d2=6, ice_pass_through_d5:len2=6, ice_boundary_disappear_after_group=6, push_ice_failed=39, ice_boundary_disappear:d1=4, ice_boundary_disappear:d6=7, ice_destroy_group_d6_plus:len2=4, ice_blocks_ice_no_chain_push=9, ice_stop_short:d1=5, ice_rebound_d4=1, ice_boundary_disappear:d9=1

### 起点 [9,11]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left left left up up up up up up up up left left left left left up right down right right right right down down down down down down down down right right right right right right up down left left left left left left up up up up up up up up right left down down down down down down down down right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=810
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=810

可达事件扫描：

- Status: complete
- 可达状态: 653
- 合法转移: 1530
- 仅事件非法转移: 39
- Report hits: none
- 事件计数: walk=1500, push_ice=30, ice_pass_through_d5:len1=6, slide_restart_after_group=10, ice_stop_short:d2=6, ice_pass_through_d5:len2=6, ice_boundary_disappear_after_group=6, push_ice_failed=39, ice_boundary_disappear:d1=4, ice_boundary_disappear:d6=7, ice_destroy_group_d6_plus:len2=4, ice_blocks_ice_no_chain_push=9, ice_stop_short:d1=5, ice_rebound_d4=1, ice_boundary_disappear:d9=1

### 起点 [10,11]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left left left left up up up up up up up up left left left left left up right down right right right right down down down down down down down down right right right right right right up down left left left left left left up up up up up up up up right left down down down down down down down down right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=810
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=810

可达事件扫描：

- Status: complete
- 可达状态: 653
- 合法转移: 1530
- 仅事件非法转移: 39
- Report hits: none
- 事件计数: walk=1500, push_ice=30, ice_pass_through_d5:len1=6, slide_restart_after_group=10, ice_stop_short:d2=6, ice_pass_through_d5:len2=6, ice_boundary_disappear_after_group=6, push_ice_failed=39, ice_boundary_disappear:d1=4, ice_boundary_disappear:d6=7, ice_destroy_group_d6_plus:len2=4, ice_blocks_ice_no_chain_push=9, ice_stop_short:d1=5, ice_rebound_d4=1, ice_boundary_disappear:d9=1

### 起点 [11,11]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_pass_through_d5:len1, ice_stop_short:d2, push_ice, slide_restart_after_group, walk
- Inputs: left left left left left left up up up up up up up up left left left left left up right down right right right right down down down down down down down down right right right right right right up down left left left left left left up up up up up up up up right left down down down down down down down down right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=810
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=810

可达事件扫描：

- Status: complete
- 可达状态: 653
- 合法转移: 1530
- 仅事件非法转移: 39
- Report hits: none
- 事件计数: push_ice=30, ice_pass_through_d5:len1=6, slide_restart_after_group=10, ice_stop_short:d2=6, walk=1500, ice_pass_through_d5:len2=6, ice_boundary_disappear_after_group=6, push_ice_failed=39, ice_boundary_disappear:d1=4, ice_boundary_disappear:d6=7, ice_destroy_group_d6_plus:len2=4, ice_blocks_ice_no_chain_push=9, ice_stop_short:d1=5, ice_rebound_d4=1, ice_boundary_disappear:d9=1

### 起点 [12,11]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left left left left left left up up up up up up up up left left left left left up right down right right right right down down down down down down down down right right right right right right up down left left left left left left up up up up up up up up right left down down down down down down down down right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=810
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=810

可达事件扫描：

- Status: complete
- 可达状态: 653
- 合法转移: 1530
- 仅事件非法转移: 39
- Report hits: none
- 事件计数: walk=1500, push_ice=30, ice_pass_through_d5:len1=6, slide_restart_after_group=10, ice_stop_short:d2=6, ice_pass_through_d5:len2=6, ice_boundary_disappear_after_group=6, push_ice_failed=39, ice_boundary_disappear:d1=4, ice_boundary_disappear:d6=7, ice_destroy_group_d6_plus:len2=4, ice_blocks_ice_no_chain_push=9, ice_stop_short:d1=5, ice_rebound_d4=1, ice_boundary_disappear:d9=1

### 起点 [13,11]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left left left left left left left up up up up up up up up left left left left left up right down right right right right down down down down down down down down right right right right right right up down left left left left left left up up up up up up up up right left down down down down down down down down right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=810
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=810

可达事件扫描：

- Status: complete
- 可达状态: 653
- 合法转移: 1530
- 仅事件非法转移: 39
- Report hits: none
- 事件计数: walk=1500, push_ice=30, ice_pass_through_d5:len1=6, slide_restart_after_group=10, ice_stop_short:d2=6, ice_pass_through_d5:len2=6, ice_boundary_disappear_after_group=6, push_ice_failed=39, ice_boundary_disappear:d1=4, ice_boundary_disappear:d6=7, ice_destroy_group_d6_plus:len2=4, ice_blocks_ice_no_chain_push=9, ice_stop_short:d1=5, ice_rebound_d4=1, ice_boundary_disappear:d9=1
