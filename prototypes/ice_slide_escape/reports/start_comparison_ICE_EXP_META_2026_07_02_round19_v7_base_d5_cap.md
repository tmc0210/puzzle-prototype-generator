# 冰原起点比较：ICE_EXP_META_2026_07_02_round19_v7_base_d5_cap

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,2]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: ice_destroy_group_d6_plus
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [1,0] | pass | yes | 5 | yes | none | none | complete, states=651, wins=4 | states=23, out=4, winOut=3, deadOut=1, dist=1 | branching_win_dag, forced=0/1 | none |
| [0,2] | pass | yes | 4 | yes | none | none | complete, states=651, wins=4 | states=23, out=4, winOut=3, deadOut=1, dist=1 | branching_win_dag, forced=0/1 | none |

## 细节

### 起点 [1,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down right left left
- 返回解事件: walk walk push_ice ice_rebound_d4 walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=749
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=749

可达事件扫描：

- Status: complete
- 可达状态: 651
- 合法转移: 1618
- 仅事件非法转移: 66
- Forbidden reachable hits: none
- 事件计数: walk=1570, push_ice=48, ice_rebound_d4=10, push_ice_failed=66, ice_boundary_disappear:d2=4, ice_stop_short:d1=23, ice_blocks_ice_no_chain_push=10, ice_destroyed_d3=2, ice_boundary_disappear:d5=2, ice_stop_short:d2=6, ice_boundary_disappear:d1=1

### 起点 [0,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right left left
- 返回解事件: walk push_ice ice_rebound_d4 walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=749
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=749

可达事件扫描：

- Status: complete
- 可达状态: 651
- 合法转移: 1618
- 仅事件非法转移: 66
- Forbidden reachable hits: none
- 事件计数: walk=1570, push_ice=48, ice_rebound_d4=10, push_ice_failed=66, ice_stop_short:d1=23, ice_boundary_disappear:d2=4, ice_blocks_ice_no_chain_push=10, ice_destroyed_d3=2, ice_boundary_disappear:d5=2, ice_stop_short:d2=6, ice_boundary_disappear:d1=1
