# 冰原起点比较：ICE_EXP_META_2026_07_03_round50_v33_cside_target_top_corridor_meta_to_B_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [11,10]
- Required winning-path events: ice_destroy_group_d6_plus, ice_destroyed_d3, ice_stop_short:d2
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [22,4] | unknown | yes | 33 | no | none | none | exhausted, states=120001, wins=12 | n/a | n/a | 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径; 可达事件扫描未完成 |

## 细节

### 起点 [22,4]

- 合法起点: true
- 机器闸门: unknown
- 闸门原因: 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径; 可达事件扫描未完成
- 第一步合法事件: walk
- Inputs: down down left up down right down down left up up right up up left left left left left left left left left left down left left down down down down down right
- 返回解事件: walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_destroy_group_d6_plus:len10 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 找到，cost=33, inputs=down down left up down right down down left up up right up up left left left left left left left left left left down left left down down down down down right, events=walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_destroy_group_d6_plus:len10 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 找到，cost=33, inputs=down down left up down right down down left up up right up up left left left left left left left left left left down left left down down down down down right, events=walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_destroy_group_d6_plus:len10 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

可达事件扫描：

- Status: exhausted
- 可达状态: 120001
- 合法转移: 303760
- 仅事件非法转移: 15061
- Forbidden reachable hits: none
- 事件计数: walk=294282, push_ice=9478, ice_destroy_group_d6_plus:len2=178, slide_restart_after_group=406, ice_blocks_ice_no_chain_push=6311, ice_destroyed_d3=1568, ice_stop_short:d1=2956, push_ice_failed=15061, ice_boundary_disappear:d3=335, ice_boundary_disappear:d1=468, ice_destroy_group_d6_plus:len10=36, ice_stop_short:d2=1385, ice_boundary_disappear:d5=563, ice_boundary_disappear:d4=41, ice_destroy_group_d6_plus:len5=36, ice_boundary_disappear_after_group=285, ice_boundary_disappear:d13=502, ice_rebound_d4=521, ice_boundary_disappear:d16=236, ice_boundary_disappear:d9=473, ice_boundary_disappear:d17=123, ice_pass_through_d5:len4=227, ice_destroy_group_d6_plus:len1=192, ice_boundary_disappear:d8=18, ice_destroy_group_d6_plus:len6=6, ice_destroy_group_d6_plus:len4=16, ice_boundary_disappear:d2=4
- Reason: state budget exceeded (120000)
