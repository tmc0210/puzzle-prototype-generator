# 冰原起点比较：ICE_CAND_0027_v1_base_goal_B_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,2]
- Required events: ice_pass_through_d5, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,4] | pass | yes | 10 | yes | none | none | complete, states=191, wins=1 | states=1, out=1, winOut=1, deadOut=0, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |

## 细节

### 起点 [0,4]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, ice_stop_short:d1, push_ice, slide_restart_after_group
- Inputs: right up right right right up left left left left
- 返回解事件: push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=190
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=190

可达事件扫描：

- Status: complete
- 可达状态: 191
- 合法转移: 579
- 仅事件非法转移: 7
- Report hits: none
- 事件计数: push_ice=11, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=1, ice_stop_short:d1=4, walk=568, ice_stop_short:d2=4, push_ice_failed=7, ice_destroyed_d3=3
