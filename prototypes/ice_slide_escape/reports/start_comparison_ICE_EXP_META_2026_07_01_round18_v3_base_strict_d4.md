# 冰原起点比较：ICE_EXP_META_2026_07_01_round18_v3_base_strict_d4

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,2]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: ice_boundary_disappear, ice_pass_through_d5, ice_destroy_group_d6_plus
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,1] | fail | yes | 3 | yes | none | ice_boundary_disappear:d1, ice_boundary_disappear:d2, ice_boundary_disappear:d3, ice_boundary_disappear:d4 | complete, states=5417, wins=18 | states=27, out=7, winOut=6, deadOut=1, dist=1 | branching_win_dag, forced=0/1 | 可达图中出现 forbidden reachable events |
| [0,2] | fail | yes | 2 | yes | none | ice_boundary_disappear:d1, ice_boundary_disappear:d2, ice_boundary_disappear:d3, ice_boundary_disappear:d4 | complete, states=5417, wins=18 | states=27, out=7, winOut=6, deadOut=1, dist=1 | branching_win_dag, forced=0/1 | 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,1]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: down right left
- 返回解事件: walk push_ice ice_rebound_d4 walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=5948
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=5948

可达事件扫描：

- Status: complete
- 可达状态: 5417
- 合法转移: 13527
- 仅事件非法转移: 576
- Forbidden reachable hits: ice_boundary_disappear:d1, ice_boundary_disappear:d2, ice_boundary_disappear:d3, ice_boundary_disappear:d4
- 事件计数: walk=13064, push_ice=463, ice_rebound_d4=42, push_ice_failed=576, ice_boundary_disappear:d1=78, ice_stop_short:d1=220, ice_blocks_ice_no_chain_push=50, ice_destroyed_d3=48, ice_boundary_disappear:d4=15, ice_stop_short:d2=50, ice_boundary_disappear:d3=8, ice_boundary_disappear:d2=2

### 起点 [0,2]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 可达图中出现 forbidden reachable events
- 第一步合法事件: ice_rebound_d4, push_ice, walk
- Inputs: right left
- 返回解事件: push_ice ice_rebound_d4 walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=5948
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=5948

可达事件扫描：

- Status: complete
- 可达状态: 5417
- 合法转移: 13527
- 仅事件非法转移: 576
- Forbidden reachable hits: ice_boundary_disappear:d1, ice_boundary_disappear:d2, ice_boundary_disappear:d3, ice_boundary_disappear:d4
- 事件计数: walk=13064, push_ice=463, ice_rebound_d4=42, push_ice_failed=576, ice_stop_short:d1=220, ice_boundary_disappear:d1=78, ice_blocks_ice_no_chain_push=50, ice_destroyed_d3=48, ice_boundary_disappear:d4=15, ice_stop_short:d2=50, ice_boundary_disappear:d3=8, ice_boundary_disappear:d2=2
