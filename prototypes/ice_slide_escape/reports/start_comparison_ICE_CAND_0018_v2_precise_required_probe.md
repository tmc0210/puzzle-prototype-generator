# 冰原起点比较：ICE_CAND_0018_v2_precise_required_probe

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [14,2]
- Required events: ice_pass_through_d5:len1, ice_stop_short:d2, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1, ice_pass_through_d5:len3, slide_restart_after_group
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,9] | fail | yes | 37 | yes | none | none | complete, states=116621, wins=1 | states=20, out=3, winOut=1, deadOut=2, dist=4 | branching_win_dag, forced=1/6 | 存在缺少 required events 的胜利路径 |

## 细节

### 起点 [0,9]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required events 的胜利路径
- 第一步合法事件: walk
- Inputs: right right up right right right right up up right up up left up up right left down down right up right up up left right down right right right right right up left down right right
- 返回解事件: walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len3 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=39, inputs=right right up right right right right up up up up up up right right up left down down down left down down right up up up right up right right right right right up left down right right, events=walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len3 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=39, inputs=right right up right right right right up up up up up up right right up left down down down left down down right up up up right up right right right right right up left down right right, events=walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len3 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 116621
- 合法转移: 300883
- 仅事件非法转移: 14770
- Report hits: none
- 事件计数: walk=292962, push_ice=7921, ice_rebound_d4=1249, ice_pass_through_d5:len1=1, slide_restart_after_group=121, ice_stop_short:d1=4389, push_ice_failed=14770, ice_blocks_ice_no_chain_push=4744, ice_stop_short:d2=841, ice_destroy_group_d6_plus:len1=354, ice_boundary_disappear_after_group=875, ice_destroyed_d3=450, ice_destroy_group_d6_plus:len2=153, ice_pass_through_d5:len2=368, ice_boundary_disappear:d7=96, ice_pass_through_d5:len3=80, ice_boundary_disappear:d8=21, ice_pass_through_d5:len4=40
