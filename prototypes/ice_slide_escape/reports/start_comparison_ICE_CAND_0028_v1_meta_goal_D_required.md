# 冰原起点比较：ICE_CAND_0028_v1_meta_goal_D_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [13,7]
- Required events: ice_pass_through_d5, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d2
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [13,3] | pass | yes | 10 | yes | none | none | complete, states=339, wins=1 | states=1, out=1, winOut=1, deadOut=0, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |

## 细节

### 起点 [13,3]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, ice_stop_short:d2, push_ice, slide_restart_after_group
- Inputs: left down left down down right up down down right
- 返回解事件: push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=338
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=338

可达事件扫描：

- Status: complete
- 可达状态: 339
- 合法转移: 1105
- 仅事件非法转移: 10
- Report hits: none
- 事件计数: push_ice=13, ice_blocks_ice_no_chain_push=9, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_stop_short:d2=5, walk=1092, push_ice_failed=10, ice_boundary_disappear:d1=4, ice_stop_short:d1=4
