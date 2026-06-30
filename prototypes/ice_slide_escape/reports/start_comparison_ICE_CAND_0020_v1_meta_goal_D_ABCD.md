# 冰原起点比较：ICE_CAND_0020_v1_meta_goal_D_ABCD

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [13,4]
- Required events: ice_pass_through_d5:len1, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1
- Forbidden events: ice_destroyed_d3, ice_rebound_d4, ice_boundary_disappear, ice_boundary_disappear_after_group
- Report-only events: none
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,2] | fail | no | n/a | no | none | none | complete, states=24, wins=0 | states=5, out=2, winOut=0, deadOut=2, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [0,4] | fail | no | n/a | no | none | none | complete, states=24, wins=0 | states=5, out=2, winOut=0, deadOut=2, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [13,2] | pass | yes | 12 | yes | none | none | complete, states=69, wins=1 | states=3, out=1, winOut=1, deadOut=0, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [13,4] | fail | no | n/a | no | none | none | complete, states=39, wins=0 | states=12, out=2, winOut=0, deadOut=2, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [0,2]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=24
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=24
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=24

可达事件扫描：

- Status: complete
- 可达状态: 24
- 合法转移: 44
- 仅事件非法转移: 4
- Report hits: none
- 事件计数: walk=40, push_ice=4, ice_stop_short:d1=4, push_ice_failed=4

### 起点 [0,4]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=24
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=24
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=24

可达事件扫描：

- Status: complete
- 可达状态: 24
- 合法转移: 44
- 仅事件非法转移: 4
- Report hits: none
- 事件计数: walk=40, push_ice=4, ice_stop_short:d1=4, push_ice_failed=4

### 起点 [13,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left left down down down right right up left right right
- 返回解事件: walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=68
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=68
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=68

可达事件扫描：

- Status: complete
- 可达状态: 69
- 合法转移: 141
- 仅事件非法转移: 2
- Report hits: none
- 事件计数: walk=138, push_ice=3, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_blocks_ice_no_chain_push=3, ice_stop_short:d1=2, ice_boundary_disappear:d2=1, push_ice_failed=2, ice_destroy_group_d6_plus:len1=1

### 起点 [13,4]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=39
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=39
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=39

可达事件扫描：

- Status: complete
- 可达状态: 39
- 合法转移: 82
- 仅事件非法转移: 5
- Report hits: none
- 事件计数: walk=80, push_ice=2, ice_destroy_group_d6_plus:len1=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=1, push_ice_failed=5, ice_boundary_disappear:d2=1
