# 冰原起点比较：ICE_CAND_0023_v2_base_goal_B_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,4]
- Required events: ice_stop_short:d1, ice_stop_short:d2
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,2] | pass | yes | 14 | yes | none | none | complete, states=1703, wins=1 | states=15, out=8, winOut=1, deadOut=7, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |

## 细节

### 起点 [0,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right up right right down down left left left down right left left
- 返回解事件: walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1993
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1993

可达事件扫描：

- Status: complete
- 可达状态: 1703
- 合法转移: 4609
- 仅事件非法转移: 386
- Report hits: none
- 事件计数: walk=4318, push_ice=291, ice_blocks_ice_no_chain_push=86, ice_stop_short:d1=141, push_ice_failed=386, ice_stop_short:d2=94, ice_boundary_disappear:d2=40, ice_boundary_disappear:d3=9, ice_boundary_disappear:d1=7
