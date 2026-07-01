# 冰原起点比较：ICE_CAND_0025_v4_meta_goal_D_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [16,2]
- Required events: ice_destroy_group_d6_plus, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1, ice_boundary_disappear_after_group
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [16,5] | pass | yes | 21 | yes | none | none | complete, states=85, wins=1 | states=2, out=1, winOut=1, deadOut=0, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |

## 细节

### 起点 [16,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left left left left left left left left up up up right right right right right right right right right
- 返回解事件: walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=84
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=84

可达事件扫描：

- Status: complete
- 可达状态: 85
- 合法转移: 226
- 仅事件非法转移: 8
- Report hits: none
- 事件计数: walk=224, push_ice=2, ice_destroy_group_d6_plus:len1=2, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=5, ice_stop_short:d1=1, push_ice_failed=8, ice_boundary_disappear_after_group=1
