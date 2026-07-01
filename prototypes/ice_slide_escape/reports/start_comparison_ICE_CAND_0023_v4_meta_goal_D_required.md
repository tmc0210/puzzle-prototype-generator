# 冰原起点比较：ICE_CAND_0023_v4_meta_goal_D_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [13,4]
- Required events: ice_pass_through_d5:len2, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1, ice_stop_short:d2
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [13,2] | pass | yes | 18 | yes | none | none | complete, states=260, wins=1 | states=10, out=4, winOut=3, deadOut=1, dist=4 | branching_win_dag, forced=0/4 | none |

## 细节

### 起点 [13,2]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left right down down left down right down down left up up right up left right right
- 返回解事件: walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=270
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=270

可达事件扫描：

- Status: complete
- 可达状态: 260
- 合法转移: 560
- 仅事件非法转移: 24
- Report hits: none
- 事件计数: walk=532, push_ice=28, ice_pass_through_d5:len2=8, slide_restart_after_group=16, ice_blocks_ice_no_chain_push=20, ice_stop_short:d1=18, ice_pass_through_d5:len1=8, ice_stop_short:d2=10, push_ice_failed=24
