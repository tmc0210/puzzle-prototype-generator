# 冰原起点比较：worker_round54_vertical_v1_base_no_late

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
| [0,6] | fail | yes | 12 | no | none | ice_destroy_group_d6_plus:len1, ice_destroy_group_d6_plus:len2, ice_pass_through_d5:len1, ice_pass_through_d5:len2, ice_pass_through_d5:len3, slide_restart_after_group | complete, states=5774, wins=2 | states=90, out=11, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径; 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,6]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径; 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: right down right right right right right down down down down down
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 找到，cost=12, inputs=right down right right right right right down down down down down, events=walk walk walk walk walk walk walk walk walk walk walk walk
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 找到，cost=12, inputs=right down right right right right right down down down down down, events=walk walk walk walk walk walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 5774
- 合法转移: 14690
- 仅事件非法转移: 284
- Forbidden reachable hits: ice_destroy_group_d6_plus:len1, ice_destroy_group_d6_plus:len2, ice_pass_through_d5:len1, ice_pass_through_d5:len2, ice_pass_through_d5:len3, slide_restart_after_group
- 事件计数: walk=14388, push_ice=302, ice_blocks_ice_no_chain_push=26, ice_rebound_d4=12, ice_stop_short:d1=144, ice_boundary_disappear:d1=62, push_ice_failed=284, ice_pass_through_d5:len2=12, ice_boundary_disappear_after_group=40, ice_destroyed_d3=12, ice_stop_short:d2=24, ice_destroy_group_d6_plus:len1=16, ice_pass_through_d5:len1=4, slide_restart_after_group=4, ice_boundary_disappear:d2=8, ice_destroy_group_d6_plus:len2=8, ice_pass_through_d5:len3=4
