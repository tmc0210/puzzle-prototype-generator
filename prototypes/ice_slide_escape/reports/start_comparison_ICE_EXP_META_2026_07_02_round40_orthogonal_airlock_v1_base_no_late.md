# 冰原起点比较：ICE_EXP_META_2026_07_02_round40_orthogonal_airlock_v1_base_no_late

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [13,5]
- Required winning-path events: ice_boundary_disappear, ice_rebound_d4, ice_stop_short
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | pass | yes | 23 | yes | none | none | complete, states=476, wins=3 | states=9, out=1, winOut=1, deadOut=0, dist=3 | branching_win_dag, forced=1/3 | none |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right right right right right up up right up up left down right right right down down right down
- 返回解事件: walk walk walk walk walk walk walk walk push_ice ice_boundary_disappear:d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk push_ice ice_stop_short:d1 walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=428
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=428

可达事件扫描：

- Status: complete
- 可达状态: 476
- 合法转移: 1065
- 仅事件非法转移: 58
- Forbidden reachable hits: none
- 事件计数: walk=1030, push_ice=35, ice_boundary_disappear:d4=1, ice_stop_short:d1=13, push_ice_failed=58, ice_stop_short:d2=4, ice_blocks_ice_no_chain_push=5, ice_rebound_d4=4, ice_boundary_disappear:d12=3, ice_boundary_disappear:d1=7, ice_boundary_disappear:d9=1, ice_boundary_disappear:d3=1, ice_boundary_disappear:d10=1
