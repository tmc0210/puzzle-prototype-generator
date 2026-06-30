# 冰原起点比较：ICE_CAND_0016_mf0009_required_probe

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,2]
- Required events: ice_stop_short, ice_destroyed_d3, ice_rebound_d4, ice_destroy_group_d6_plus
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [10,3] | fail | yes | 41 | yes | none | none | complete, states=58296, wins=2 | states=32, out=10, winOut=2, deadOut=8, dist=6 | branching_win_dag, forced=0/7 | 存在缺少 required events 的胜利路径 |

## 细节

### 起点 [10,3]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 存在缺少 required events 的胜利路径
- 第一步合法事件: walk
- Inputs: up left left left down left left up up right down left down right left down right right up down right right up up up left left right down left left left left left left down right up left left left
- 返回解事件: walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk push_ice ice_stop_short:d1 walk walk push_ice ice_destroyed_d3 walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 找到，cost=45, inputs=up left left left down left left up up right down left down right up right right right down down left left up down right right up up up left left right down left left left left left left down right up left left left, events=walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 找到，cost=45, inputs=up left left left down left left up up right down left down right up right right right down down left left up down right right up up up left left right down left left left left left left down right up left left left, events=walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 58296
- 合法转移: 166130
- 仅事件非法转移: 6623
- Report hits: none
- 事件计数: walk=159202, push_ice=6928, ice_rebound_d4=592, push_ice_failed=6623, ice_pass_through_d5:len1=640, ice_boundary_disappear_after_group=700, ice_destroyed_d3=1357, ice_blocks_ice_no_chain_push=2032, ice_stop_short:d1=2215, ice_stop_short:d2=1561, ice_boundary_disappear:d4=130, ice_boundary_disappear:d6=23, ice_boundary_disappear:d7=46, ice_boundary_disappear:d3=156, ice_boundary_disappear:d1=75, slide_restart_after_group=79, ice_boundary_disappear:d2=29, ice_boundary_disappear:d5=21, ice_destroy_group_d6_plus:len1=137, ice_boundary_disappear:d8=23, ice_pass_through_d5:len2=2
