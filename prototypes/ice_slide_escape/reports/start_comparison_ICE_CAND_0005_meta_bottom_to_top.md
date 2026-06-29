# 冰原起点比较：ICE_CAND_0005_meta_bottom_to_top

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [9,0]
- Required events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,11] | pass | yes | 46 | yes | none | none | complete, states=168, wins=1 | states=22, out=2, winOut=1, deadOut=1, dist=2 | single_win_chain, forced=2/2 | none |

## 细节

### 起点 [0,11]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right right right right right right right right up down left left left left left left left left left left left left up up up up up up up up up right right right right right right right right right up up
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=167
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=167

可达事件扫描：

- Status: complete
- 可达状态: 168
- 合法转移: 330
- 仅事件非法转移: 2
- Report hits: none
- 事件计数: walk=326, push_ice=4, ice_destroy_group_d6_plus:len2=2, slide_restart_after_group=4, ice_destroyed_d3=1, ice_pass_through_d5:len1=2, ice_stop_short:d2=3, ice_blocks_ice_no_chain_push=2, push_ice_failed=2
