# 冰原起点比较：ICE_EXP_META_2026_07_02_round19_v6_meta_required_core

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [7,5]
- Required winning-path events: ice_destroyed_d3, ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [6,7] | pass | yes | 31 | yes | none | none | complete, states=888, wins=2 | states=3, out=2, winOut=2, deadOut=0, dist=5 | branching_win_dag, forced=0/5 | none |

## 细节

### 起点 [6,7]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up left left up up up up up left left left left down right up right right right down down down left down down right up down right right up right
- 返回解事件: walk walk push_ice ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_stop_short:d1 walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=942
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=942

可达事件扫描：

- Status: complete
- 可达状态: 888
- 合法转移: 2204
- 仅事件非法转移: 74
- Forbidden reachable hits: none
- 事件计数: walk=2136, push_ice=68, ice_stop_short:d1=42, push_ice_failed=74, ice_destroyed_d3=2, ice_boundary_disappear:d1=4, ice_rebound_d4=12, ice_boundary_disappear:d4=4, ice_stop_short:d2=4, ice_blocks_ice_no_chain_push=6
