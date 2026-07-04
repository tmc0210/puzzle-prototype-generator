# 冰原起点比较：ICE_EXP_META_2026_07_03_round43_0035_like_star_variant_base_required_d4_probe

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [7,5]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [1,5] | fail | yes | 8 | yes | none | none | complete, states=3783, wins=14 | states=1, out=1, winOut=1, deadOut=0, dist=2 | branching_win_dag, forced=1/3 | 存在缺少 required winning events 的胜利路径 |

## 细节

### 起点 [1,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required winning events 的胜利路径
- 第一步合法事件: ice_destroyed_d3, push_ice
- Inputs: up right right right right right right down
- 返回解事件: push_ice ice_destroyed_d3 walk walk push_ice ice_rebound_d4 walk walk push_ice ice_stop_short:d1 walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 找到，cost=10, inputs=up right right up right right down right right down, events=push_ice ice_destroyed_d3 walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 找到，cost=10, inputs=up right right up right right down right right down, events=push_ice ice_destroyed_d3 walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 3783
- 合法转移: 9926
- 仅事件非法转移: 406
- Forbidden reachable hits: none
- 事件计数: push_ice=338, ice_destroyed_d3=31, walk=9588, ice_blocks_ice_no_chain_push=76, ice_stop_short:d2=84, push_ice_failed=406, ice_rebound_d4=57, ice_stop_short:d1=135, ice_boundary_disappear:d2=19, ice_boundary_disappear:d1=12
