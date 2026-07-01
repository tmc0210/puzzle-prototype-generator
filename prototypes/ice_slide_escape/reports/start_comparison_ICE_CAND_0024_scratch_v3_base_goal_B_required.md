# 冰原起点比较：ICE_CAND_0024_scratch_v3_base_goal_B_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [2,8]
- Required events: ice_rebound_d4, ice_stop_short:d1, ice_stop_short:d2
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [1,8] | pass | yes | 35 | yes | none | none | complete, states=103640, wins=2 | states=24, out=7, winOut=1, deadOut=6, dist=4 | branching_win_dag, forced=2/4 | none |

## 细节

### 起点 [1,8]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up right right right right right up down left left left up up up up right left down down down down right right up down left left up right down left left left down
- 返回解事件: walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=132903
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=132903

可达事件扫描：

- Status: complete
- 可达状态: 103640
- 合法转移: 245763
- 仅事件非法转移: 14025
- Report hits: none
- 事件计数: walk=235360, ice_blocks_ice_no_chain_push=3852, push_ice_failed=14025, push_ice=10403, ice_destroyed_d3=1333, ice_stop_short:d1=5099, ice_rebound_d4=605, ice_stop_short:d2=2362, ice_destroy_group_d6_plus:len1=518, slide_restart_after_group=518, ice_pass_through_d5:len2=138, ice_boundary_disappear_after_group=766, ice_destroy_group_d6_plus:len2=400, ice_boundary_disappear:d10=138, ice_boundary_disappear:d12=62, ice_destroy_group_d6_plus:len5=47, ice_destroy_group_d6_plus:len4=181, ice_boundary_disappear:d11=24, ice_boundary_disappear:d4=5, ice_boundary_disappear:d6=9
