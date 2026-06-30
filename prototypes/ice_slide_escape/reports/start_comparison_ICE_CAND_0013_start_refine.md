# 冰原起点比较：ICE_CAND_0013_start_refine

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [9,0]
- Required events: ice_boundary_disappear, ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group
- Forbidden events: none
- Report-only events: none
- 已检查起点: 5

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [11,2] | pass | yes | 32 | yes | none | none | complete, states=436, wins=1 | states=17, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [4,2] | pass | yes | 39 | yes | none | none | complete, states=436, wins=1 | states=17, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [0,0] | pass | yes | 45 | yes | none | none | complete, states=436, wins=1 | states=17, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [0,2] | pass | yes | 43 | yes | none | none | complete, states=436, wins=1 | states=17, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |
| [2,0] | pass | yes | 43 | yes | none | none | complete, states=436, wins=1 | states=17, out=4, winOut=1, deadOut=3, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |

## 细节

### 起点 [11,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up up down down left left left left left left left left left up up right left down down left left up up right right right right right right right right right
- 返回解事件: walk push_ice ice_boundary_disappear:d0 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=435
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=435

可达事件扫描：

- Status: complete
- 可达状态: 436
- 合法转移: 889
- 仅事件非法转移: 6
- Report hits: none
- 事件计数: walk=860, push_ice=29, ice_boundary_disappear:d0=11, ice_boundary_disappear:d1=6, ice_pass_through_d5:len1=4, slide_restart_after_group=7, ice_blocks_ice_no_chain_push=8, ice_stop_short:d1=7, push_ice_failed=6, ice_stop_short:d2=3, ice_destroy_group_d6_plus:len4=1, ice_boundary_disappear_after_group=1, ice_destroy_group_d6_plus:len1=2, ice_boundary_disappear:d10=1, ice_destroy_group_d6_plus:len2=1

### 起点 [4,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right right right up up down down left left left left left left left left left up up right left down down left left up up right right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk push_ice ice_boundary_disappear:d0 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=435
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=435

可达事件扫描：

- Status: complete
- 可达状态: 436
- 合法转移: 889
- 仅事件非法转移: 6
- Report hits: none
- 事件计数: walk=860, push_ice=29, ice_boundary_disappear:d1=6, ice_pass_through_d5:len1=4, slide_restart_after_group=7, ice_blocks_ice_no_chain_push=8, ice_stop_short:d1=7, push_ice_failed=6, ice_boundary_disappear:d0=11, ice_destroy_group_d6_plus:len4=1, ice_boundary_disappear_after_group=1, ice_stop_short:d2=3, ice_destroy_group_d6_plus:len1=2, ice_destroy_group_d6_plus:len2=1, ice_boundary_disappear:d10=1

### 起点 [0,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_blocks_ice_no_chain_push, ice_stop_short:d1, push_ice, walk
- Inputs: down down right right right right right right right right right right right up up down down left left left left left left left left left up up right left down down left left up up right right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_boundary_disappear:d0 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=435
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=435

可达事件扫描：

- Status: complete
- 可达状态: 436
- 合法转移: 889
- 仅事件非法转移: 6
- Report hits: none
- 事件计数: walk=860, push_ice=29, ice_blocks_ice_no_chain_push=8, ice_stop_short:d1=7, push_ice_failed=6, ice_boundary_disappear:d1=6, ice_pass_through_d5:len1=4, slide_restart_after_group=7, ice_boundary_disappear:d0=11, ice_destroy_group_d6_plus:len4=1, ice_boundary_disappear_after_group=1, ice_stop_short:d2=3, ice_destroy_group_d6_plus:len2=1, ice_destroy_group_d6_plus:len1=2, ice_boundary_disappear:d10=1

### 起点 [0,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right right right right right right right up up down down left left left left left left left left left up up right left down down left left up up right right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_boundary_disappear:d0 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=435
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=435

可达事件扫描：

- Status: complete
- 可达状态: 436
- 合法转移: 889
- 仅事件非法转移: 6
- Report hits: none
- 事件计数: walk=860, push_ice=29, ice_blocks_ice_no_chain_push=8, ice_stop_short:d1=7, push_ice_failed=6, ice_boundary_disappear:d1=6, ice_pass_through_d5:len1=4, slide_restart_after_group=7, ice_boundary_disappear:d0=11, ice_destroy_group_d6_plus:len4=1, ice_boundary_disappear_after_group=1, ice_stop_short:d2=3, ice_destroy_group_d6_plus:len2=1, ice_destroy_group_d6_plus:len1=2, ice_boundary_disappear:d10=1

### 起点 [2,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_blocks_ice_no_chain_push, ice_boundary_disappear:d1, ice_pass_through_d5:len1, ice_stop_short:d1, push_ice, slide_restart_after_group, walk
- Inputs: down down right right right right right right right right right up up down down left left left left left left left left left up up right left down down left left up up right right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_boundary_disappear:d0 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=435
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=435

可达事件扫描：

- Status: complete
- 可达状态: 436
- 合法转移: 889
- 仅事件非法转移: 6
- Report hits: none
- 事件计数: walk=860, push_ice=29, ice_boundary_disappear:d1=6, ice_pass_through_d5:len1=4, slide_restart_after_group=7, ice_blocks_ice_no_chain_push=8, ice_stop_short:d1=7, push_ice_failed=6, ice_destroy_group_d6_plus:len4=1, ice_boundary_disappear_after_group=1, ice_boundary_disappear:d0=11, ice_stop_short:d2=3, ice_destroy_group_d6_plus:len2=1, ice_destroy_group_d6_plus:len1=2, ice_boundary_disappear:d10=1
