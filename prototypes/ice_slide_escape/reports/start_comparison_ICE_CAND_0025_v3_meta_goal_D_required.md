# 冰原起点比较：ICE_CAND_0025_v3_meta_goal_D_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [12,2]
- Required events: ice_destroy_group_d6_plus, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1, ice_boundary_disappear_after_group
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [12,5] | pass | yes | 19 | yes | none | none | complete, states=294, wins=1 | states=31, out=4, winOut=2, deadOut=2, dist=2 | branching_win_dag, forced=0/2 | none |

## 细节

### 起点 [12,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left up up left left left left left left up right right right right right right right right
- 返回解事件: walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=293
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=293

可达事件扫描：

- Status: complete
- 可达状态: 294
- 合法转移: 930
- 仅事件非法转移: 15
- Report hits: none
- 事件计数: walk=918, push_ice=12, ice_destroy_group_d6_plus:len1=6, slide_restart_after_group=3, ice_blocks_ice_no_chain_push=6, ice_stop_short:d1=6, push_ice_failed=15, ice_boundary_disappear:d2=3, ice_boundary_disappear_after_group=3
