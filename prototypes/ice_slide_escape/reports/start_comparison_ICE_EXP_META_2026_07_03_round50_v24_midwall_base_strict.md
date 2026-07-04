# 冰原起点比较：ICE_EXP_META_2026_07_03_round50_v24_midwall_base_strict

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,10]
- Required winning-path events: ice_destroyed_d3, ice_stop_short
- Forbidden winning-path events: ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group
- Forbidden reachable events: ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | fail | yes | 33 | yes | none | ice_destroy_group_d6_plus:len2, slide_restart_after_group | complete, states=4724, wins=4 | states=9, out=3, winOut=2, deadOut=1, dist=4 | branching_win_dag, forced=0/4 | 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: right right right right right right right right right down right down down left up down left down left left up left up down right down right right up right right down down
- 返回解事件: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=4720
- 触发 forbidden winning events 的胜利路径: 未找到；完整搜索，explored=4720
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=4720

可达事件扫描：

- Status: complete
- 可达状态: 4724
- 合法转移: 10705
- 仅事件非法转移: 699
- Forbidden reachable hits: ice_destroy_group_d6_plus:len2, slide_restart_after_group
- 事件计数: walk=10358, push_ice=347, ice_blocks_ice_no_chain_push=259, ice_destroyed_d3=29, ice_stop_short:d1=181, push_ice_failed=699, ice_stop_short:d2=43, ice_boundary_disappear:d9=21, ice_rebound_d4=18, ice_destroy_group_d6_plus:len2=14, slide_restart_after_group=14, ice_boundary_disappear:d8=14, ice_boundary_disappear:d5=18, ice_boundary_disappear:d13=4, ice_boundary_disappear:d2=19
