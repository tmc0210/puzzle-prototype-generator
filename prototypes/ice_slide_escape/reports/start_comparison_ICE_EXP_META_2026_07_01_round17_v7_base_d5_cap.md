# 冰原起点比较：ICE_EXP_META_2026_07_01_round17_v7_base_d5_cap

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,7]
- Required winning-path events: ice_stop_short:d2
- Forbidden winning-path events: ice_destroy_group_d6_plus
- Forbidden reachable events: ice_destroy_group_d6_plus
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,2] | pass | yes | 23 | yes | none | none | complete, states=571, wins=1 | states=44, out=5, winOut=1, deadOut=4, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |
| [0,7] | pass | yes | 22 | yes | none | none | complete, states=571, wins=1 | states=44, out=5, winOut=1, deadOut=4, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |

## 细节

### 起点 [0,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right down down down right right right right up left left left left up up right left down down down down down left
- 返回解事件: walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=594
- 触发 forbidden winning events 的胜利路径: 未找到；完整搜索，explored=570
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=594

可达事件扫描：

- Status: complete
- 可达状态: 571
- 合法转移: 1412
- 仅事件非法转移: 30
- Forbidden reachable hits: none
- 事件计数: walk=1362, push_ice=50, ice_destroyed_d3=10, ice_stop_short:d1=14, push_ice_failed=30, ice_stop_short:d2=7, ice_rebound_d4=8, ice_boundary_disappear:d2=10, ice_blocks_ice_no_chain_push=3, ice_boundary_disappear:d1=1

### 起点 [0,7]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up up right right right right up left left left left up up right left down down down down down left
- 返回解事件: walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=594
- 触发 forbidden winning events 的胜利路径: 未找到；完整搜索，explored=570
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=594

可达事件扫描：

- Status: complete
- 可达状态: 571
- 合法转移: 1412
- 仅事件非法转移: 30
- Forbidden reachable hits: none
- 事件计数: walk=1362, push_ice=50, ice_destroyed_d3=10, ice_stop_short:d1=14, ice_stop_short:d2=7, push_ice_failed=30, ice_rebound_d4=8, ice_boundary_disappear:d2=10, ice_blocks_ice_no_chain_push=3, ice_boundary_disappear:d1=1
