# 冰原起点比较：ICE_CAND_0015_v1_required_probe

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [14,1]
- Required events: ice_stop_short, ice_pass_through_d5, slide_restart_after_group, ice_destroyed_d3, ice_destroy_group_d6_plus
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,1] | fail | yes | 36 | yes | none | none | complete, states=7333, wins=2 | states=2, out=1, winOut=1, deadOut=0, dist=4 | branching_win_dag, forced=1/4 | 存在缺少 required events 的胜利路径 |

## 细节

### 起点 [0,1]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required events 的胜利路径
- 第一步合法事件: walk
- Inputs: right right right down down down down down down down down left up up up up up up right right right right up up right right right right right down right right up left right right
- 返回解事件: walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=42, inputs=right right right down down down down down down down down left up up up up up up right right right right right right right right right up up left left left right right right down right right up left right right, events=walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len3 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=42, inputs=right right right down down down down down down down down left up up up up up up right right right right right right right right right up up left left left right right right down right right up left right right, events=walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len3 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk

可达事件扫描：

- Status: complete
- 可达状态: 7333
- 合法转移: 25157
- 仅事件非法转移: 211
- Report hits: none
- 事件计数: walk=24996, push_ice=161, ice_stop_short:d2=21, push_ice_failed=211, ice_stop_short:d1=44, ice_blocks_ice_no_chain_push=34, ice_destroyed_d3=18, ice_pass_through_d5:len1=14, slide_restart_after_group=32, ice_destroy_group_d6_plus:len1=14, ice_boundary_disappear_after_group=14, ice_boundary_disappear:d2=34, ice_destroy_group_d6_plus:len2=9, ice_boundary_disappear:d4=14, ice_boundary_disappear:d1=7, ice_pass_through_d5:len3=9, ice_boundary_disappear:d6=9
