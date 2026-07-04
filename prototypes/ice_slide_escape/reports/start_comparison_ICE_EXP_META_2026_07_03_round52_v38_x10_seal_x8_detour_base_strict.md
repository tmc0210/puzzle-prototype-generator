# 冰原起点比较：ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_base_strict

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [11,10]
- Required winning-path events: ice_destroyed_d3, ice_stop_short
- Forbidden winning-path events: ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group
- Forbidden reachable events: ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | pass | yes | 24 | yes | none | none | complete, states=1853, wins=6 | states=7, out=1, winOut=1, deadOut=0, dist=2 | branching_win_dag, forced=1/2 | none |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right right right right down down down left left left up down right right right right down right down right
- 返回解事件: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=1847
- 触发 forbidden winning events 的胜利路径: 未找到；完整搜索，explored=1847
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=1847

可达事件扫描：

- Status: complete
- 可达状态: 1853
- 合法转移: 4291
- 仅事件非法转移: 354
- Forbidden reachable hits: none
- 事件计数: walk=4162, push_ice=129, ice_blocks_ice_no_chain_push=95, ice_destroyed_d3=36, ice_stop_short:d1=34, push_ice_failed=354, ice_stop_short:d2=47, ice_boundary_disappear:d5=12
