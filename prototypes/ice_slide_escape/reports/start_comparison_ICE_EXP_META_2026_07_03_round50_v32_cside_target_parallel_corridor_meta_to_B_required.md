# 冰原起点比较：ICE_EXP_META_2026_07_03_round50_v32_cside_target_parallel_corridor_meta_to_B_required

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
| [22,4] | fail | yes | 25 | no | none | none | complete, states=20084, wins=11 | states=23, out=4, winOut=2, deadOut=2, dist=2 | branching_win_dag, forced=0/2 | 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径 |

## 细节

### 起点 [22,4]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径
- 第一步合法事件: walk
- Inputs: down down down down left up right up left left left left left left left left left left left down left down down down right
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk push_ice ice_destroy_group_d6_plus:len4 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 找到，cost=25, inputs=down down down down left up right up left left left left left left left left left left left down left down down down right, events=walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk push_ice ice_destroy_group_d6_plus:len4 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 找到，cost=25, inputs=down down down down left up right up left left left left left left left left left left left down left down down down right, events=walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk push_ice ice_destroy_group_d6_plus:len4 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 20084
- 合法转移: 51639
- 仅事件非法转移: 2314
- Forbidden reachable hits: none
- 事件计数: walk=50472, push_ice=1167, ice_destroy_group_d6_plus:len2=13, slide_restart_after_group=91, ice_blocks_ice_no_chain_push=830, ice_destroyed_d3=129, push_ice_failed=2314, ice_boundary_disappear:d3=48, ice_stop_short:d1=350, ice_boundary_disappear:d1=106, ice_stop_short:d2=230, ice_destroy_group_d6_plus:len4=47, ice_boundary_disappear:d4=72, ice_destroy_group_d6_plus:len1=31, ice_boundary_disappear:d5=96, ice_boundary_disappear:d9=45, ice_boundary_disappear:d13=19, ice_boundary_disappear:d21=20, ice_boundary_disappear:d12=26, ice_pass_through_d5:len4=6, ice_boundary_disappear_after_group=6, ice_rebound_d4=8, ice_boundary_disappear:d10=10, ice_boundary_disappear:d2=2
