# 冰原起点比较：ICE_CAND_0021_v1_base_goal_B_ABCD

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,6]
- Required events: ice_stop_short:d2
- Forbidden events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group
- Report-only events: none
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,2] | pass | yes | 8 | yes | none | none | complete, states=16, wins=1 | states=7, out=1, winOut=1, deadOut=0, dist=1 | one_win_continuation_per_scc, forced=1/1 | none |
| [0,6] | pass | yes | 12 | yes | none | none | complete, states=16, wins=1 | states=7, out=1, winOut=1, deadOut=0, dist=1 | one_win_continuation_per_scc, forced=1/1 | none |
| [14,2] | fail | no | n/a | no | none | none | complete, states=123, wins=0 | states=10, out=3, winOut=0, deadOut=3, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [14,6] | fail | no | n/a | no | none | none | complete, states=123, wins=0 | states=10, out=3, winOut=0, deadOut=3, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [0,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right left down down down down left
- 返回解事件: walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=15
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=15
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=15

可达事件扫描：

- Status: complete
- 可达状态: 16
- 合法转移: 29
- 仅事件非法转移: 1
- Report hits: none
- 事件计数: walk=28, push_ice=1, ice_blocks_ice_no_chain_push=2, ice_stop_short:d2=1, push_ice_failed=1

### 起点 [0,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up up up up right left down down down down left
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=15
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=15
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=15

可达事件扫描：

- Status: complete
- 可达状态: 16
- 合法转移: 29
- 仅事件非法转移: 1
- Report hits: none
- 事件计数: walk=28, push_ice=1, ice_blocks_ice_no_chain_push=2, ice_stop_short:d2=1, push_ice_failed=1

### 起点 [14,2]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=123
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=123
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=123

可达事件扫描：

- Status: complete
- 可达状态: 123
- 合法转移: 284
- 仅事件非法转移: 12
- Report hits: none
- 事件计数: walk=274, push_ice=10, ice_pass_through_d5:len2=4, slide_restart_after_group=4, ice_blocks_ice_no_chain_push=6, ice_stop_short:d2=6, push_ice_failed=12, ice_stop_short:d1=3, ice_destroyed_d3=1

### 起点 [14,6]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=123
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=123
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=123

可达事件扫描：

- Status: complete
- 可达状态: 123
- 合法转移: 284
- 仅事件非法转移: 12
- Report hits: none
- 事件计数: walk=274, push_ice_failed=12, push_ice=10, ice_blocks_ice_no_chain_push=6, ice_stop_short:d1=3, ice_pass_through_d5:len2=4, slide_restart_after_group=4, ice_stop_short:d2=6, ice_destroyed_d3=1
