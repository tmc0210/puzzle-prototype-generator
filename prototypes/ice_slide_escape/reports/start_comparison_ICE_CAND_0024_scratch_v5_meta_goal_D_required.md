# 冰原起点比较：ICE_CAND_0024_scratch_v5_meta_goal_D_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [17,8]
- Required events: ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_stop_short:d2
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [16,8] | pass | yes | 47 | yes | none | none | complete, states=44114, wins=11 | states=9, out=3, winOut=2, deadOut=1, dist=3 | branching_win_dag, forced=0/3 | none |

## 细节

### 起点 [16,8]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up up up up up left left left left left left left left left down down right right down down left left left up up right up up right right right right right right right right down right down down left up down right down down right
- 返回解事件: walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=44103
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=44103

可达事件扫描：

- Status: complete
- 可达状态: 44114
- 合法转移: 105482
- 仅事件非法转移: 5728
- Report hits: none
- 事件计数: walk=102238, push_ice_failed=5728, push_ice=3244, ice_blocks_ice_no_chain_push=2136, ice_stop_short:d1=1595, ice_destroy_group_d6_plus:len1=65, slide_restart_after_group=162, ice_stop_short:d2=854, ice_destroy_group_d6_plus:len2=159, ice_destroyed_d3=353, ice_rebound_d4=294, ice_pass_through_d5:len2=80, ice_boundary_disappear_after_group=142, ice_boundary_disappear:d10=6
