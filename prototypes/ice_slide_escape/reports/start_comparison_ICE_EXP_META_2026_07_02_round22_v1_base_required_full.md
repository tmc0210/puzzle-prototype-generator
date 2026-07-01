# 冰原起点比较：ICE_EXP_META_2026_07_02_round22_v1_base_required_full

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [7,5]
- Required winning-path events: ice_destroyed_d3, ice_rebound_d4, ice_stop_short
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [1,5] | fail | yes | 12 | yes | none | none | complete, states=1753, wins=3 | states=1, out=1, winOut=1, deadOut=0, dist=1 | one_win_continuation_per_scc, forced=1/3 | 存在缺少 required winning events 的胜利路径 |

## 细节

### 起点 [1,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required winning events 的胜利路径
- 第一步合法事件: ice_destroyed_d3, push_ice
- Inputs: up right right right right right up left down right right down
- 返回解事件: push_ice ice_destroyed_d3 walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_stop_short:d1 walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 找到，cost=16, inputs=up up up up right right right right right down down left down right right down, events=push_ice ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 找到，cost=16, inputs=up up up up right right right right right down down left down right right down, events=push_ice ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 1753
- 合法转移: 4991
- 仅事件非法转移: 83
- Forbidden reachable hits: none
- 事件计数: push_ice=115, ice_destroyed_d3=17, walk=4876, ice_rebound_d4=22, push_ice_failed=83, ice_stop_short:d1=41, ice_stop_short:d2=16, ice_pass_through_d5:len1=4, ice_boundary_disappear_after_group=10, ice_boundary_disappear:d2=4, ice_blocks_ice_no_chain_push=18, ice_destroy_group_d6_plus:len1=4, ice_pass_through_d5:len3=1, ice_boundary_disappear:d1=5, ice_destroy_group_d6_plus:len2=1
