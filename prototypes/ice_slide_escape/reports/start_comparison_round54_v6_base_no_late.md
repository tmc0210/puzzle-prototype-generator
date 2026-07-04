# 冰原起点比较：round54_v6_base_no_late

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [6,12]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,6] | fail | yes | 20 | yes | none | ice_destroy_group_d6_plus:len1, ice_pass_through_d5:len1, ice_pass_through_d5:len2, slide_restart_after_group | complete, states=4840, wins=2 | states=9, out=1, winOut=1, deadOut=0, dist=2 | branching_win_dag, forced=1/2 | 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,6]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: right up right right down right right up right right right down left down left down down down down down
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=4838
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=4838

可达事件扫描：

- Status: complete
- 可达状态: 4840
- 合法转移: 11565
- 仅事件非法转移: 211
- Forbidden reachable hits: ice_destroy_group_d6_plus:len1, ice_pass_through_d5:len1, ice_pass_through_d5:len2, slide_restart_after_group
- 事件计数: walk=11304, push_ice=261, ice_blocks_ice_no_chain_push=51, ice_rebound_d4=55, ice_stop_short:d1=102, push_ice_failed=211, ice_boundary_disappear:d1=50, ice_pass_through_d5:len1=11, slide_restart_after_group=19, ice_boundary_disappear:d2=19, ice_stop_short:d2=15, ice_destroyed_d3=10, ice_boundary_disappear:d6=10, ice_destroy_group_d6_plus:len1=6, ice_pass_through_d5:len2=2
