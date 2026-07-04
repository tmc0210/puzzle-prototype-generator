# 冰原起点比较：ICE_EXP_META_2026_07_03_round50_v30_v21_bottom_left_band_base_strict

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
| [0,5] | fail | yes | 30 | yes | none | ice_pass_through_d5:len12 | complete, states=3558, wins=1 | states=7, out=1, winOut=1, deadOut=0, dist=4 | branching_win_dag, forced=2/4 | 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: right right right right right right right right right down right down down left up down left left left left up down right right right right down right down right
- 返回解事件: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=3705
- 触发 forbidden winning events 的胜利路径: 未找到；完整搜索，explored=3965
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=4113

可达事件扫描：

- Status: complete
- 可达状态: 3558
- 合法转移: 8147
- 仅事件非法转移: 403
- Forbidden reachable hits: ice_pass_through_d5:len12
- 事件计数: walk=7836, push_ice=311, ice_blocks_ice_no_chain_push=96, ice_destroyed_d3=30, ice_stop_short:d1=79, push_ice_failed=403, ice_stop_short:d2=78, ice_boundary_disappear:d1=56, ice_boundary_disappear:d9=21, ice_pass_through_d5:len12=4, ice_boundary_disappear_after_group=4, ice_boundary_disappear:d5=18, ice_boundary_disappear:d3=12, ice_rebound_d4=4, ice_boundary_disappear:d4=3, ice_boundary_disappear:d2=6
