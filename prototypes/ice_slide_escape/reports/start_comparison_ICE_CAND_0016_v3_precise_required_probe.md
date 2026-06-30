# 冰原起点比较：ICE_CAND_0016_v3_precise_required_probe

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [14,2]
- Required events: ice_stop_short:d2, ice_pass_through_d5:len1, ice_pass_through_d5:len2, slide_restart_after_group, ice_destroyed_d3, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,9] | pass | yes | 47 | yes | none | none | complete, states=49118, wins=1 | states=100, out=9, winOut=3, deadOut=6, dist=5 | branching_win_dag, forced=0/5 | none |

## 细节

### 起点 [0,9]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up up up up up up up up right left down down down down down down down down right up up up up up up right right right right up up right left down right right right right right right up left down right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=58048
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=58048

可达事件扫描：

- Status: complete
- 可达状态: 49118
- 合法转移: 153625
- 仅事件非法转移: 3089
- Report hits: none
- 事件计数: walk=151004, push_ice=2621, ice_rebound_d4=213, ice_pass_through_d5:len3=80, ice_boundary_disappear_after_group=574, ice_stop_short:d1=933, push_ice_failed=3089, ice_boundary_disappear:d2=66, ice_destroy_group_d6_plus:len1=376, ice_stop_short:d2=474, ice_boundary_disappear:d5=57, ice_boundary_disappear:d1=100, ice_blocks_ice_no_chain_push=563, ice_destroyed_d3=204, ice_pass_through_d5:len1=186, slide_restart_after_group=202, ice_destroy_group_d6_plus:len2=43, ice_pass_through_d5:len2=91
