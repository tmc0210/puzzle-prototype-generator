# 冰原起点比较：ICE_EXP_META_2026_07_01_round18_v3_meta_required_core

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,5]
- Required winning-path events: ice_destroyed_d3, ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [7,5] | pass | yes | 33 | yes | none | none | complete, states=1829, wins=4 | states=1, out=1, winOut=1, deadOut=0, dist=5 | branching_win_dag, forced=1/5 | none |

## 细节

### 起点 [7,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_destroyed_d3, push_ice
- Inputs: left down left left up up up up up left left left left down right up right right right down down down left down down right up up left left left down left
- 返回解事件: push_ice ice_destroyed_d3 walk walk push_ice ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=2016
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=2016

可达事件扫描：

- Status: complete
- 可达状态: 1829
- 合法转移: 4516
- 仅事件非法转移: 175
- Forbidden reachable hits: none
- 事件计数: push_ice=122, ice_destroyed_d3=17, walk=4394, push_ice_failed=175, ice_stop_short:d2=16, ice_stop_short:d1=60, ice_boundary_disappear:d1=6, ice_rebound_d4=14, ice_blocks_ice_no_chain_push=14, ice_boundary_disappear:d4=5, ice_boundary_disappear:d3=4
