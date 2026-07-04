# 冰原起点比较：ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v2_base_no_late

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,10]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | pass | yes | 29 | yes | none | none | complete, states=922, wins=1 | states=5, out=1, winOut=1, deadOut=0, dist=4 | branching_win_dag, forced=2/4 | none |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right right right right right down down right down down left up down left left left left up down right right right right right down
- 返回解事件: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 922
- 合法转移: 2003
- 仅事件非法转移: 41
- Forbidden reachable hits: none
- 事件计数: walk=1952, push_ice=51, ice_blocks_ice_no_chain_push=4, ice_destroyed_d3=6, ice_stop_short:d1=24, push_ice_failed=41, ice_rebound_d4=14, ice_boundary_disappear:d5=5, ice_boundary_disappear:d1=2
