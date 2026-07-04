# 冰原起点比较：ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_interface_goal_A

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,6]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,6] | pass | yes | 0 | yes | none | none | complete, states=5111, wins=2 | states=18, out=2, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |
| [23,6] | pass | yes | 47 | yes | none | none | complete, states=7119, wins=2 | states=129, out=7, winOut=2, deadOut=5, dist=1 | branching_win_dag, forced=0/1 | none |

## 细节

### 起点 [0,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 5111
- 合法转移: 12656
- 仅事件非法转移: 297
- Forbidden reachable hits: none
- 事件计数: walk=12464, push_ice=192, ice_rebound_d4=77, ice_stop_short:d1=92, push_ice_failed=297, ice_destroyed_d3=9, ice_blocks_ice_no_chain_push=14, ice_stop_short:d2=14

### 起点 [23,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left up left left left left left left down down down left down down right up up up left left left up left up left left left left left left down down down left down down right up up up left left left up left left left
- 返回解事件: walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk push_ice ice_destroyed_d3 walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 7119
- 合法转移: 17612
- 仅事件非法转移: 412
- Forbidden reachable hits: none
- 事件计数: walk=17274, push_ice=338, ice_stop_short:d1=134, ice_rebound_d4=113, push_ice_failed=412, ice_destroyed_d3=77, ice_blocks_ice_no_chain_push=14, ice_stop_short:d2=14
