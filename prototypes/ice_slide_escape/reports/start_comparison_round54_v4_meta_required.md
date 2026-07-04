# 冰原起点比较：round54_v4_meta_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,10]
- Required winning-path events: ice_destroy_group_d6_plus, slide_restart_after_group, ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [7,0] | fail | yes | 21 | no | none | none | complete, states=2749, wins=1 | states=1, out=1, winOut=1, deadOut=0, dist=2 | one_win_continuation_per_scc, forced=2/2 | 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径 |

## 细节

### 起点 [7,0]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径
- 第一步合法事件: ice_destroy_group_d6_plus:len1, ice_stop_short:d2, push_ice, slide_restart_after_group
- Inputs: down down down down down down down right right down down down left left left left left left left left left
- 返回解事件: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 找到，cost=21, inputs=down down down down down down down right right down down down left left left left left left left left left, events=push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 找到，cost=21, inputs=down down down down down down down right right down down down left left left left left left left left left, events=push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 2749
- 合法转移: 7054
- 仅事件非法转移: 177
- Forbidden reachable hits: none
- 事件计数: push_ice=162, ice_destroy_group_d6_plus:len1=21, slide_restart_after_group=4, ice_stop_short:d2=26, walk=6892, ice_stop_short:d1=78, ice_rebound_d4=27, push_ice_failed=177, ice_blocks_ice_no_chain_push=26, ice_boundary_disappear_after_group=20, ice_boundary_disappear:d6=6, ice_pass_through_d5:len2=3, ice_boundary_disappear:d2=3, ice_destroyed_d3=2
