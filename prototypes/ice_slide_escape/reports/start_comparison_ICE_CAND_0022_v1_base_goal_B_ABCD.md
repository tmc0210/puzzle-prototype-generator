# 冰原起点比较：ICE_CAND_0022_v1_base_goal_B_ABCD

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,7]
- Required events: ice_stop_short:d2
- Forbidden events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_destroyed_d3
- Report-only events: none
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,2] | pass | yes | 9 | yes | none | none | complete, states=18, wins=1 | states=8, out=1, winOut=1, deadOut=0, dist=1 | one_win_continuation_per_scc, forced=1/1 | none |
| [0,7] | pass | yes | 14 | yes | none | none | complete, states=18, wins=1 | states=8, out=1, winOut=1, deadOut=0, dist=1 | one_win_continuation_per_scc, forced=1/1 | none |
| [16,7] | fail | no | n/a | no | none | none | complete, states=1018, wins=0 | states=11, out=2, winOut=0, deadOut=2, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [16,2] | fail | no | n/a | no | none | none | complete, states=1018, wins=0 | states=11, out=2, winOut=0, deadOut=2, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [0,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right left down down down down down left
- 返回解事件: walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=17
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=17
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=17

可达事件扫描：

- Status: complete
- 可达状态: 18
- 合法转移: 33
- 仅事件非法转移: 1
- Report hits: none
- 事件计数: walk=32, push_ice=1, ice_blocks_ice_no_chain_push=2, ice_stop_short:d2=1, push_ice_failed=1

### 起点 [0,7]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up up up up up right left down down down down down left
- 返回解事件: walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=17
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=17
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=17

可达事件扫描：

- Status: complete
- 可达状态: 18
- 合法转移: 33
- 仅事件非法转移: 1
- Report hits: none
- 事件计数: walk=32, push_ice=1, ice_blocks_ice_no_chain_push=2, ice_stop_short:d2=1, push_ice_failed=1

### 起点 [16,7]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1035
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=1018
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1035

可达事件扫描：

- Status: complete
- 可达状态: 1018
- 合法转移: 2145
- 仅事件非法转移: 92
- Report hits: none
- 事件计数: walk=2058, ice_blocks_ice_no_chain_push=51, push_ice_failed=92, push_ice=87, ice_destroyed_d3=17, ice_stop_short:d1=32, ice_pass_through_d5:len2=9, slide_restart_after_group=12, ice_stop_short:d2=27, ice_boundary_disappear:d2=6, ice_boundary_disappear:d1=5, ice_destroy_group_d6_plus:len2=3

### 起点 [16,2]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1035
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=1018
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1035

可达事件扫描：

- Status: complete
- 可达状态: 1018
- 合法转移: 2145
- 仅事件非法转移: 92
- Report hits: none
- 事件计数: walk=2058, push_ice=87, ice_blocks_ice_no_chain_push=51, ice_stop_short:d1=32, push_ice_failed=92, ice_destroyed_d3=17, ice_stop_short:d2=27, ice_pass_through_d5:len2=9, slide_restart_after_group=12, ice_boundary_disappear:d2=6, ice_boundary_disappear:d1=5, ice_destroy_group_d6_plus:len2=3
