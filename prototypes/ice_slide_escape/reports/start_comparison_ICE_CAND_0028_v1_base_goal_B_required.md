# 冰原起点比较：ICE_CAND_0028_v1_base_goal_B_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,1]
- Required events: ice_stop_short:d1, ice_stop_short:d2, ice_blocks_ice_no_chain_push
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,7] | pass | yes | 22 | yes | none | none | complete, states=37704, wins=1 | states=33, out=9, winOut=1, deadOut=8, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |

## 细节

### 起点 [0,7]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up up right right right up down left down down right up up left up left up up up left left
- 返回解事件: walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=52281
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=52281

可达事件扫描：

- Status: complete
- 可达状态: 37704
- 合法转移: 117447
- 仅事件非法转移: 1591
- Report hits: none
- 事件计数: walk=115130, push_ice=2317, ice_stop_short:d1=791, ice_blocks_ice_no_chain_push=486, push_ice_failed=1591, ice_destroyed_d3=544, ice_pass_through_d5:len1=139, ice_boundary_disappear_after_group=81, slide_restart_after_group=70, ice_boundary_disappear:d1=418, ice_boundary_disappear:d4=72, ice_stop_short:d2=327, ice_rebound_d4=72, ice_destroy_group_d6_plus:len1=12, ice_boundary_disappear:d8=12
