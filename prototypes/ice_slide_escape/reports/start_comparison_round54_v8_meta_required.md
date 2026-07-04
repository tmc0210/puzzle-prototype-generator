# 冰原起点比较：round54_v8_meta_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [17,10]
- Required winning-path events: ice_destroy_group_d6_plus, slide_restart_after_group, ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [10,0] | fail | yes | 19 | no | none | none | complete, states=1367, wins=1 | states=1, out=1, winOut=1, deadOut=0, dist=2 | one_win_continuation_per_scc, forced=2/2 | 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径 |

## 细节

### 起点 [10,0]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径
- 第一步合法事件: ice_destroy_group_d6_plus:len1, ice_stop_short:d2, push_ice, slide_restart_after_group
- Inputs: down down down down down down down down down left down right right right right right right right right
- 返回解事件: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 找到，cost=19, inputs=down down down down down down down down down left down right right right right right right right right, events=push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 找到，cost=19, inputs=down down down down down down down down down left down right right right right right right right right, events=push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 1367
- 合法转移: 3242
- 仅事件非法转移: 71
- Forbidden reachable hits: none
- 事件计数: push_ice=72, ice_destroy_group_d6_plus:len1=18, slide_restart_after_group=1, ice_stop_short:d2=7, walk=3170, ice_blocks_ice_no_chain_push=10, ice_rebound_d4=6, push_ice_failed=71, ice_stop_short:d1=34, ice_boundary_disappear_after_group=17, ice_boundary_disappear:d6=8
