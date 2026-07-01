# 冰原起点比较：ICE_EXP_META_2026_07_01_round18_v4_base_d5_cap

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
| [0,1] | pass | yes | 3 | yes | none | none | complete, states=5051, wins=18 | states=25, out=7, winOut=6, deadOut=1, dist=1 | branching_win_dag, forced=0/1 | none |
| [0,2] | pass | yes | 2 | yes | none | none | complete, states=5051, wins=18 | states=25, out=7, winOut=6, deadOut=1, dist=1 | branching_win_dag, forced=0/1 | none |

## 细节

### 起点 [0,1]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down right left
- 返回解事件: walk push_ice ice_rebound_d4 walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=5546
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=5546

可达事件扫描：

- Status: complete
- 可达状态: 5051
- 合法转移: 12795
- 仅事件非法转移: 576
- Forbidden reachable hits: none
- 事件计数: walk=12332, push_ice=463, ice_rebound_d4=42, push_ice_failed=576, ice_boundary_disappear:d1=78, ice_stop_short:d1=220, ice_blocks_ice_no_chain_push=50, ice_destroyed_d3=48, ice_boundary_disappear:d4=15, ice_stop_short:d2=50, ice_boundary_disappear:d3=8, ice_boundary_disappear:d2=2

### 起点 [0,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_rebound_d4, push_ice, walk
- Inputs: right left
- 返回解事件: push_ice ice_rebound_d4 walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=5546
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=5546

可达事件扫描：

- Status: complete
- 可达状态: 5051
- 合法转移: 12795
- 仅事件非法转移: 576
- Forbidden reachable hits: none
- 事件计数: walk=12332, push_ice=463, ice_rebound_d4=42, push_ice_failed=576, ice_stop_short:d1=220, ice_boundary_disappear:d1=78, ice_blocks_ice_no_chain_push=50, ice_destroyed_d3=48, ice_boundary_disappear:d4=15, ice_stop_short:d2=50, ice_boundary_disappear:d3=8, ice_boundary_disappear:d2=2
