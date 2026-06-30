# 冰原起点比较：ICE_CAND_0021_v1_meta_goal_D_ABCD

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [14,6]
- Required events: ice_pass_through_d5, slide_restart_after_group, ice_stop_short:d1
- Forbidden events: ice_destroy_group_d6_plus
- Report-only events: none
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,2] | fail | no | n/a | no | none | none | complete, states=16, wins=0 | states=7, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [0,6] | fail | no | n/a | no | none | none | complete, states=16, wins=0 | states=7, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [14,2] | pass | yes | 18 | yes | none | none | complete, states=123, wins=1 | states=10, out=3, winOut=2, deadOut=1, dist=3 | branching_win_dag, forced=0/3 | none |
| [14,6] | pass | yes | 22 | yes | none | none | complete, states=123, wins=1 | states=10, out=3, winOut=2, deadOut=1, dist=3 | branching_win_dag, forced=0/3 | none |

## 细节

### 起点 [0,2]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=16
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=16
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=16

可达事件扫描：

- Status: complete
- 可达状态: 16
- 合法转移: 29
- 仅事件非法转移: 1
- Report hits: none
- 事件计数: walk=28, push_ice=1, ice_blocks_ice_no_chain_push=2, ice_stop_short:d2=1, push_ice_failed=1

### 起点 [0,6]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=16
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=16
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=16

可达事件扫描：

- Status: complete
- 可达状态: 16
- 合法转移: 29
- 仅事件非法转移: 1
- Report hits: none
- 事件计数: walk=28, push_ice=1, ice_blocks_ice_no_chain_push=2, ice_stop_short:d2=1, push_ice_failed=1

### 起点 [14,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left down right down down left up up right up left down down down down right right
- 返回解事件: walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=133
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=122
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=133

可达事件扫描：

- Status: complete
- 可达状态: 123
- 合法转移: 284
- 仅事件非法转移: 12
- Report hits: none
- 事件计数: walk=274, push_ice=10, ice_pass_through_d5:len2=4, slide_restart_after_group=4, ice_blocks_ice_no_chain_push=6, ice_stop_short:d2=6, push_ice_failed=12, ice_stop_short:d1=3, ice_destroyed_d3=1

### 起点 [14,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left up up up up left down right down down left up up right up left down down down down right right
- 返回解事件: walk walk walk walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=133
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=122
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=133

可达事件扫描：

- Status: complete
- 可达状态: 123
- 合法转移: 284
- 仅事件非法转移: 12
- Report hits: none
- 事件计数: walk=274, push_ice_failed=12, push_ice=10, ice_blocks_ice_no_chain_push=6, ice_stop_short:d1=3, ice_pass_through_d5:len2=4, slide_restart_after_group=4, ice_stop_short:d2=6, ice_destroyed_d3=1
