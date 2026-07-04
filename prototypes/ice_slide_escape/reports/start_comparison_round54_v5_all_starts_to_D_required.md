# 冰原起点比较：round54_v5_all_starts_to_D_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,10]
- Required winning-path events: ice_destroy_group_d6_plus, slide_restart_after_group, ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 3

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [7,0] | pass | yes | 33 | yes | none | none | complete, states=2661, wins=1 | states=1, out=1, winOut=1, deadOut=0, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [0,6] | fail | no | n/a | no | none | none | complete, states=6561, wins=0 | states=9, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [6,12] | fail | no | n/a | no | none | none | complete, states=1708, wins=0 | states=102, out=8, winOut=0, deadOut=8, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [7,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_destroy_group_d6_plus:len1, ice_stop_short:d2, push_ice, slide_restart_after_group
- Inputs: down down down down down right right right down left down down down down left left up up up left left up right down down down down left left left left left left
- 返回解事件: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=3166
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=3166

可达事件扫描：

- Status: complete
- 可达状态: 2661
- 合法转移: 6592
- 仅事件非法转移: 175
- Forbidden reachable hits: none
- 事件计数: push_ice=156, ice_destroy_group_d6_plus:len1=19, slide_restart_after_group=4, ice_stop_short:d2=26, walk=6436, ice_stop_short:d1=74, ice_rebound_d4=27, push_ice_failed=175, ice_blocks_ice_no_chain_push=26, ice_boundary_disappear_after_group=18, ice_boundary_disappear:d6=6, ice_pass_through_d5:len2=3, ice_boundary_disappear:d2=3, ice_destroyed_d3=2

### 起点 [0,6]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=7355
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=7355

可达事件扫描：

- Status: complete
- 可达状态: 6561
- 合法转移: 15619
- 仅事件非法转移: 292
- Forbidden reachable hits: none
- 事件计数: walk=15246, push_ice=373, ice_blocks_ice_no_chain_push=60, ice_rebound_d4=94, ice_stop_short:d1=141, push_ice_failed=292, ice_boundary_disappear:d1=67, ice_pass_through_d5:len1=17, slide_restart_after_group=25, ice_boundary_disappear:d2=25, ice_destroy_group_d6_plus:len1=6, ice_stop_short:d2=21, ice_destroyed_d3=12, ice_boundary_disappear:d6=13, ice_pass_through_d5:len2=2

### 起点 [6,12]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=2424
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=2424

可达事件扫描：

- Status: complete
- 可达状态: 1708
- 合法转移: 4154
- 仅事件非法转移: 74
- Forbidden reachable hits: none
- 事件计数: walk=4048, push_ice=106, ice_stop_short:d1=52, push_ice_failed=74, ice_rebound_d4=22, ice_boundary_disappear:d1=24, ice_blocks_ice_no_chain_push=12, ice_pass_through_d5:len2=2, slide_restart_after_group=2, ice_boundary_disappear:d2=2, ice_boundary_disappear:d6=4, ice_stop_short:d2=2
