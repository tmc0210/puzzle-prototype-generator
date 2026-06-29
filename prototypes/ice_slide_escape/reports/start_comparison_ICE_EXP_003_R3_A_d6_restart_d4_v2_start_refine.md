# 冰原起点比较：ICE_EXP_003_R3_A_d6_restart_d4_v2_start_refine

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [12,0]
- Required events: ice_rebound_d4, ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_blocks_ice_no_chain_push
- Forbidden events: none
- Report-only events: none
- 已检查起点: 11

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [12,0] | pass | yes | 68 | yes | none | none | complete, states=2694, wins=1 | states=54, out=5, winOut=1, deadOut=4, dist=3 | single_win_chain, forced=3/3 | none |
| [0,2] | pass | yes | 92 | yes | none | none | complete, states=2694, wins=1 | states=54, out=5, winOut=1, deadOut=4, dist=3 | single_win_chain, forced=3/3 | none |
| [0,3] | pass | yes | 91 | yes | none | none | complete, states=2694, wins=1 | states=54, out=5, winOut=1, deadOut=4, dist=3 | single_win_chain, forced=3/3 | none |
| [0,4] | pass | yes | 90 | yes | none | none | complete, states=2694, wins=1 | states=54, out=5, winOut=1, deadOut=4, dist=3 | single_win_chain, forced=3/3 | none |
| [0,5] | pass | yes | 89 | yes | none | none | complete, states=2694, wins=1 | states=54, out=5, winOut=1, deadOut=4, dist=3 | single_win_chain, forced=3/3 | none |
| [0,6] | pass | yes | 88 | yes | none | none | complete, states=2694, wins=1 | states=54, out=5, winOut=1, deadOut=4, dist=3 | single_win_chain, forced=3/3 | none |
| [0,7] | pass | yes | 87 | yes | none | none | complete, states=2694, wins=1 | states=54, out=5, winOut=1, deadOut=4, dist=3 | single_win_chain, forced=3/3 | none |
| [0,8] | pass | yes | 86 | yes | none | none | complete, states=2694, wins=1 | states=54, out=5, winOut=1, deadOut=4, dist=3 | single_win_chain, forced=3/3 | none |
| [0,9] | pass | yes | 85 | yes | none | none | complete, states=2694, wins=1 | states=54, out=5, winOut=1, deadOut=4, dist=3 | single_win_chain, forced=3/3 | none |
| [0,10] | pass | yes | 84 | yes | none | none | complete, states=2694, wins=1 | states=54, out=5, winOut=1, deadOut=4, dist=3 | single_win_chain, forced=3/3 | none |
| [0,11] | pass | yes | 83 | yes | none | none | complete, states=2694, wins=1 | states=54, out=5, winOut=1, deadOut=4, dist=3 | single_win_chain, forced=3/3 | none |

## 细节

### 起点 [12,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down left left up right left left left left down down down down down down down down down down right right right right right right right up up down down left left left left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right right right right up
- 返回解事件: walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=2820
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=2820

可达事件扫描：

- Status: complete
- 可达状态: 2694
- 合法转移: 5876
- 仅事件非法转移: 91
- Report hits: none
- 事件计数: walk=5792, push_ice=84, ice_rebound_d4=14, push_ice_failed=91, ice_stop_short:d1=32, ice_boundary_disappear:d1=10, ice_pass_through_d5:len1=13, slide_restart_after_group=23, ice_stop_short:d2=12, ice_blocks_ice_no_chain_push=23, ice_destroy_group_d6_plus:len2=11, ice_pass_through_d5:len2=8, ice_boundary_disappear_after_group=10, ice_destroy_group_d6_plus:len1=1, ice_destroyed_d3=3, ice_boundary_disappear:d12=2, ice_boundary_disappear:d2=1

### 起点 [0,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_boundary_disappear_after_group, ice_destroy_group_d6_plus:len2, ice_pass_through_d5:len2, push_ice, slide_restart_after_group, walk
- Inputs: down down down down down down down down down right right right right right right right up up up up up up up up up up right right right right left left left left down down down down down down down down down down right right right right right right right up up down down left left left left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right right right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=2820
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=2820

可达事件扫描：

- Status: complete
- 可达状态: 2694
- 合法转移: 5876
- 仅事件非法转移: 91
- Report hits: none
- 事件计数: walk=5792, push_ice=84, ice_destroy_group_d6_plus:len2=11, slide_restart_after_group=23, ice_pass_through_d5:len2=8, ice_boundary_disappear_after_group=10, ice_rebound_d4=14, push_ice_failed=91, ice_stop_short:d1=32, ice_destroy_group_d6_plus:len1=1, ice_pass_through_d5:len1=13, ice_stop_short:d2=12, ice_boundary_disappear:d1=10, ice_blocks_ice_no_chain_push=23, ice_destroyed_d3=3, ice_boundary_disappear:d2=1, ice_boundary_disappear:d12=2

### 起点 [0,3]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down down down down right right right right right right right up up up up up up up up up up right right right right left left left left down down down down down down down down down down right right right right right right right up up down down left left left left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right right right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=2820
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=2820

可达事件扫描：

- Status: complete
- 可达状态: 2694
- 合法转移: 5876
- 仅事件非法转移: 91
- Report hits: none
- 事件计数: walk=5792, push_ice=84, ice_destroy_group_d6_plus:len2=11, slide_restart_after_group=23, ice_pass_through_d5:len2=8, ice_boundary_disappear_after_group=10, ice_rebound_d4=14, push_ice_failed=91, ice_stop_short:d1=32, ice_destroy_group_d6_plus:len1=1, ice_pass_through_d5:len1=13, ice_stop_short:d2=12, ice_boundary_disappear:d1=10, ice_blocks_ice_no_chain_push=23, ice_destroyed_d3=3, ice_boundary_disappear:d2=1, ice_boundary_disappear:d12=2

### 起点 [0,4]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down down down right right right right right right right up up up up up up up up up up right right right right left left left left down down down down down down down down down down right right right right right right right up up down down left left left left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right right right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=2820
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=2820

可达事件扫描：

- Status: complete
- 可达状态: 2694
- 合法转移: 5876
- 仅事件非法转移: 91
- Report hits: none
- 事件计数: walk=5792, push_ice=84, ice_destroy_group_d6_plus:len2=11, slide_restart_after_group=23, ice_pass_through_d5:len2=8, ice_boundary_disappear_after_group=10, ice_rebound_d4=14, push_ice_failed=91, ice_stop_short:d1=32, ice_destroy_group_d6_plus:len1=1, ice_pass_through_d5:len1=13, ice_stop_short:d2=12, ice_boundary_disappear:d1=10, ice_blocks_ice_no_chain_push=23, ice_destroyed_d3=3, ice_boundary_disappear:d2=1, ice_boundary_disappear:d12=2

### 起点 [0,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down down right right right right right right right up up up up up up up up up up right right right right left left left left down down down down down down down down down down right right right right right right right up up down down left left left left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right right right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=2820
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=2820

可达事件扫描：

- Status: complete
- 可达状态: 2694
- 合法转移: 5876
- 仅事件非法转移: 91
- Report hits: none
- 事件计数: walk=5792, push_ice=84, ice_destroy_group_d6_plus:len2=11, slide_restart_after_group=23, ice_pass_through_d5:len2=8, ice_boundary_disappear_after_group=10, ice_rebound_d4=14, push_ice_failed=91, ice_stop_short:d1=32, ice_pass_through_d5:len1=13, ice_stop_short:d2=12, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear:d1=10, ice_blocks_ice_no_chain_push=23, ice_destroyed_d3=3, ice_boundary_disappear:d2=1, ice_boundary_disappear:d12=2

### 起点 [0,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down right right right right right right right up up up up up up up up up up right right right right left left left left down down down down down down down down down down right right right right right right right up up down down left left left left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right right right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=2820
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=2820

可达事件扫描：

- Status: complete
- 可达状态: 2694
- 合法转移: 5876
- 仅事件非法转移: 91
- Report hits: none
- 事件计数: walk=5792, push_ice=84, ice_destroy_group_d6_plus:len2=11, slide_restart_after_group=23, ice_pass_through_d5:len2=8, ice_boundary_disappear_after_group=10, ice_rebound_d4=14, push_ice_failed=91, ice_stop_short:d1=32, ice_pass_through_d5:len1=13, ice_stop_short:d2=12, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear:d1=10, ice_blocks_ice_no_chain_push=23, ice_destroyed_d3=3, ice_boundary_disappear:d2=1, ice_boundary_disappear:d12=2

### 起点 [0,7]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down right right right right right right right up up up up up up up up up up right right right right left left left left down down down down down down down down down down right right right right right right right up up down down left left left left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right right right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=2820
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=2820

可达事件扫描：

- Status: complete
- 可达状态: 2694
- 合法转移: 5876
- 仅事件非法转移: 91
- Report hits: none
- 事件计数: walk=5792, push_ice=84, ice_destroy_group_d6_plus:len2=11, slide_restart_after_group=23, ice_pass_through_d5:len2=8, ice_boundary_disappear_after_group=10, ice_rebound_d4=14, push_ice_failed=91, ice_stop_short:d1=32, ice_pass_through_d5:len1=13, ice_stop_short:d2=12, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear:d1=10, ice_blocks_ice_no_chain_push=23, ice_destroyed_d3=3, ice_boundary_disappear:d2=1, ice_boundary_disappear:d12=2

### 起点 [0,8]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down right right right right right right right up up up up up up up up up up right right right right left left left left down down down down down down down down down down right right right right right right right up up down down left left left left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right right right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=2820
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=2820

可达事件扫描：

- Status: complete
- 可达状态: 2694
- 合法转移: 5876
- 仅事件非法转移: 91
- Report hits: none
- 事件计数: walk=5792, push_ice=84, ice_destroy_group_d6_plus:len2=11, slide_restart_after_group=23, ice_pass_through_d5:len2=8, ice_boundary_disappear_after_group=10, ice_rebound_d4=14, push_ice_failed=91, ice_pass_through_d5:len1=13, ice_stop_short:d2=12, ice_stop_short:d1=32, ice_boundary_disappear:d1=10, ice_destroy_group_d6_plus:len1=1, ice_blocks_ice_no_chain_push=23, ice_destroyed_d3=3, ice_boundary_disappear:d2=1, ice_boundary_disappear:d12=2

### 起点 [0,9]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down right right right right right right right up up up up up up up up up up right right right right left left left left down down down down down down down down down down right right right right right right right up up down down left left left left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right right right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=2820
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=2820

可达事件扫描：

- Status: complete
- 可达状态: 2694
- 合法转移: 5876
- 仅事件非法转移: 91
- Report hits: none
- 事件计数: walk=5792, push_ice=84, ice_destroy_group_d6_plus:len2=11, slide_restart_after_group=23, ice_pass_through_d5:len2=8, ice_boundary_disappear_after_group=10, ice_pass_through_d5:len1=13, ice_stop_short:d2=12, ice_rebound_d4=14, push_ice_failed=91, ice_stop_short:d1=32, ice_boundary_disappear:d1=10, ice_destroy_group_d6_plus:len1=1, ice_blocks_ice_no_chain_push=23, ice_destroyed_d3=3, ice_boundary_disappear:d2=1, ice_boundary_disappear:d12=2

### 起点 [0,10]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down right right right right right right right up up up up up up up up up up right right right right left left left left down down down down down down down down down down right right right right right right right up up down down left left left left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right right right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=2820
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=2820

可达事件扫描：

- Status: complete
- 可达状态: 2694
- 合法转移: 5876
- 仅事件非法转移: 91
- Report hits: none
- 事件计数: walk=5792, push_ice=84, ice_destroy_group_d6_plus:len2=11, slide_restart_after_group=23, ice_pass_through_d5:len2=8, ice_boundary_disappear_after_group=10, ice_pass_through_d5:len1=13, ice_stop_short:d2=12, ice_rebound_d4=14, push_ice_failed=91, ice_stop_short:d1=32, ice_boundary_disappear:d1=10, ice_destroy_group_d6_plus:len1=1, ice_blocks_ice_no_chain_push=23, ice_destroyed_d3=3, ice_boundary_disappear:d2=1, ice_boundary_disappear:d12=2

### 起点 [0,11]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right right right up up up up up up up up up up right right right right left left left left down down down down down down down down down down right right right right right right right up up down down left left left left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right right right right up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=2820
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=2820

可达事件扫描：

- Status: complete
- 可达状态: 2694
- 合法转移: 5876
- 仅事件非法转移: 91
- Report hits: none
- 事件计数: walk=5792, push_ice=84, ice_destroy_group_d6_plus:len2=11, slide_restart_after_group=23, ice_pass_through_d5:len2=8, ice_boundary_disappear_after_group=10, ice_pass_through_d5:len1=13, ice_stop_short:d2=12, ice_rebound_d4=14, push_ice_failed=91, ice_boundary_disappear:d1=10, ice_stop_short:d1=32, ice_destroy_group_d6_plus:len1=1, ice_blocks_ice_no_chain_push=23, ice_destroyed_d3=3, ice_boundary_disappear:d2=1, ice_boundary_disappear:d12=2
