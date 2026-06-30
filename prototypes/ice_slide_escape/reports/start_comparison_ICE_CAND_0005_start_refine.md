# 冰原起点比较：ICE_CAND_0005_start_refine

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [9,0]
- Required events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short
- Forbidden events: none
- Report-only events: none
- 已检查起点: 11

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [9,0] | fail | no | n/a | no | none | none | complete, states=2, wins=0 | states=2, out=0, winOut=0, deadOut=0, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [0,2] | pass | yes | 55 | yes | none | none | complete, states=168, wins=1 | states=22, out=2, winOut=1, deadOut=1, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [0,3] | pass | yes | 54 | yes | none | none | complete, states=168, wins=1 | states=22, out=2, winOut=1, deadOut=1, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [0,4] | pass | yes | 53 | yes | none | none | complete, states=168, wins=1 | states=22, out=2, winOut=1, deadOut=1, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [0,5] | pass | yes | 52 | yes | none | none | complete, states=168, wins=1 | states=22, out=2, winOut=1, deadOut=1, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [0,6] | pass | yes | 51 | yes | none | none | complete, states=168, wins=1 | states=22, out=2, winOut=1, deadOut=1, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [0,7] | pass | yes | 50 | yes | none | none | complete, states=168, wins=1 | states=22, out=2, winOut=1, deadOut=1, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [0,8] | pass | yes | 49 | yes | none | none | complete, states=168, wins=1 | states=22, out=2, winOut=1, deadOut=1, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [0,9] | pass | yes | 48 | yes | none | none | complete, states=168, wins=1 | states=22, out=2, winOut=1, deadOut=1, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [0,10] | pass | yes | 47 | yes | none | none | complete, states=168, wins=1 | states=22, out=2, winOut=1, deadOut=1, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [0,11] | pass | yes | 46 | yes | none | none | complete, states=168, wins=1 | states=22, out=2, winOut=1, deadOut=1, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |

## 细节

### 起点 [9,0]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=2
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=2

可达事件扫描：

- Status: complete
- 可达状态: 2
- 合法转移: 2
- 仅事件非法转移: 0
- Report hits: none
- 事件计数: walk=2

### 起点 [0,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_destroy_group_d6_plus:len2, ice_destroyed_d3, push_ice, slide_restart_after_group, walk
- Inputs: down down down down down down down down down right right right right right right right right right right right right up down left left left left left left left left left left left left up up up up up up up up up right right right right right right right right right up up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=167
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=167

可达事件扫描：

- Status: complete
- 可达状态: 168
- 合法转移: 330
- 仅事件非法转移: 2
- Report hits: none
- 事件计数: walk=326, push_ice=4, ice_destroy_group_d6_plus:len2=2, slide_restart_after_group=4, ice_destroyed_d3=1, ice_pass_through_d5:len1=2, ice_stop_short:d2=3, ice_blocks_ice_no_chain_push=2, push_ice_failed=2

### 起点 [0,3]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down down down down right right right right right right right right right right right right up down left left left left left left left left left left left left up up up up up up up up up right right right right right right right right right up up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=167
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=167

可达事件扫描：

- Status: complete
- 可达状态: 168
- 合法转移: 330
- 仅事件非法转移: 2
- Report hits: none
- 事件计数: walk=326, push_ice=4, ice_destroy_group_d6_plus:len2=2, slide_restart_after_group=4, ice_destroyed_d3=1, ice_pass_through_d5:len1=2, ice_stop_short:d2=3, ice_blocks_ice_no_chain_push=2, push_ice_failed=2

### 起点 [0,4]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down down down right right right right right right right right right right right right up down left left left left left left left left left left left left up up up up up up up up up right right right right right right right right right up up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=167
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=167

可达事件扫描：

- Status: complete
- 可达状态: 168
- 合法转移: 330
- 仅事件非法转移: 2
- Report hits: none
- 事件计数: walk=326, push_ice=4, ice_destroy_group_d6_plus:len2=2, slide_restart_after_group=4, ice_destroyed_d3=1, ice_pass_through_d5:len1=2, ice_stop_short:d2=3, ice_blocks_ice_no_chain_push=2, push_ice_failed=2

### 起点 [0,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down down right right right right right right right right right right right right up down left left left left left left left left left left left left up up up up up up up up up right right right right right right right right right up up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=167
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=167

可达事件扫描：

- Status: complete
- 可达状态: 168
- 合法转移: 330
- 仅事件非法转移: 2
- Report hits: none
- 事件计数: walk=326, push_ice=4, ice_destroy_group_d6_plus:len2=2, slide_restart_after_group=4, ice_destroyed_d3=1, ice_pass_through_d5:len1=2, ice_stop_short:d2=3, ice_blocks_ice_no_chain_push=2, push_ice_failed=2

### 起点 [0,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down right right right right right right right right right right right right up down left left left left left left left left left left left left up up up up up up up up up right right right right right right right right right up up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=167
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=167

可达事件扫描：

- Status: complete
- 可达状态: 168
- 合法转移: 330
- 仅事件非法转移: 2
- Report hits: none
- 事件计数: walk=326, push_ice=4, ice_destroy_group_d6_plus:len2=2, slide_restart_after_group=4, ice_destroyed_d3=1, ice_pass_through_d5:len1=2, ice_stop_short:d2=3, ice_blocks_ice_no_chain_push=2, push_ice_failed=2

### 起点 [0,7]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down right right right right right right right right right right right right up down left left left left left left left left left left left left up up up up up up up up up right right right right right right right right right up up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=167
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=167

可达事件扫描：

- Status: complete
- 可达状态: 168
- 合法转移: 330
- 仅事件非法转移: 2
- Report hits: none
- 事件计数: walk=326, push_ice=4, ice_destroy_group_d6_plus:len2=2, slide_restart_after_group=4, ice_destroyed_d3=1, ice_pass_through_d5:len1=2, ice_stop_short:d2=3, ice_blocks_ice_no_chain_push=2, push_ice_failed=2

### 起点 [0,8]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down right right right right right right right right right right right right up down left left left left left left left left left left left left up up up up up up up up up right right right right right right right right right up up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=167
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=167

可达事件扫描：

- Status: complete
- 可达状态: 168
- 合法转移: 330
- 仅事件非法转移: 2
- Report hits: none
- 事件计数: walk=326, push_ice=4, ice_destroy_group_d6_plus:len2=2, slide_restart_after_group=4, ice_destroyed_d3=1, ice_pass_through_d5:len1=2, ice_stop_short:d2=3, ice_blocks_ice_no_chain_push=2, push_ice_failed=2

### 起点 [0,9]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down right right right right right right right right right right right right up down left left left left left left left left left left left left up up up up up up up up up right right right right right right right right right up up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=167
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=167

可达事件扫描：

- Status: complete
- 可达状态: 168
- 合法转移: 330
- 仅事件非法转移: 2
- Report hits: none
- 事件计数: walk=326, push_ice=4, ice_destroy_group_d6_plus:len2=2, slide_restart_after_group=4, ice_destroyed_d3=1, ice_pass_through_d5:len1=2, ice_stop_short:d2=3, ice_blocks_ice_no_chain_push=2, push_ice_failed=2

### 起点 [0,10]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down right right right right right right right right right right right right up down left left left left left left left left left left left left up up up up up up up up up right right right right right right right right right up up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=167
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=167

可达事件扫描：

- Status: complete
- 可达状态: 168
- 合法转移: 330
- 仅事件非法转移: 2
- Report hits: none
- 事件计数: walk=326, push_ice=4, ice_destroy_group_d6_plus:len2=2, slide_restart_after_group=4, ice_destroyed_d3=1, ice_pass_through_d5:len1=2, ice_stop_short:d2=3, ice_blocks_ice_no_chain_push=2, push_ice_failed=2

### 起点 [0,11]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right right right right right right right right up down left left left left left left left left left left left left up up up up up up up up up right right right right right right right right right up up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=167
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=167

可达事件扫描：

- Status: complete
- 可达状态: 168
- 合法转移: 330
- 仅事件非法转移: 2
- Report hits: none
- 事件计数: walk=326, push_ice=4, ice_destroy_group_d6_plus:len2=2, slide_restart_after_group=4, ice_destroyed_d3=1, ice_pass_through_d5:len1=2, ice_stop_short:d2=3, ice_blocks_ice_no_chain_push=2, push_ice_failed=2
