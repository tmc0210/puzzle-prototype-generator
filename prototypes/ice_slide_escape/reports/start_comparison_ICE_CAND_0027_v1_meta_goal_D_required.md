# 冰原起点比较：ICE_CAND_0027_v1_meta_goal_D_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [13,2]
- Required events: ice_pass_through_d5, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [13,3] | pass | yes | 11 | yes | none | none | complete, states=691, wins=1 | states=26, out=7, winOut=2, deadOut=5, dist=2 | branching_win_dag, forced=0/2 | none |

## 细节

### 起点 [13,3]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, ice_stop_short:d1, push_ice, slide_restart_after_group, walk
- Inputs: left down left left left up up right right right right
- 返回解事件: push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=799
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=799

可达事件扫描：

- Status: complete
- 可达状态: 691
- 合法转移: 2140
- 仅事件非法转移: 43
- Report hits: none
- 事件计数: walk=2080, push_ice=60, ice_pass_through_d5:len1=5, slide_restart_after_group=5, ice_blocks_ice_no_chain_push=7, ice_stop_short:d1=25, ice_stop_short:d2=11, push_ice_failed=43, ice_boundary_disappear:d1=5, ice_destroyed_d3=19
