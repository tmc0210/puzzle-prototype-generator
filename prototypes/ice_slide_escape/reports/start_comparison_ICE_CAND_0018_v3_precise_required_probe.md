# 冰原起点比较：ICE_CAND_0018_v3_precise_required_probe

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [15,2]
- Required events: ice_pass_through_d5:len1, ice_stop_short:d2, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1, ice_pass_through_d5:len3, slide_restart_after_group
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,9] | pass | yes | 34 | yes | none | none | complete, states=6962, wins=1 | states=21, out=3, winOut=1, deadOut=2, dist=5 | branching_win_dag, forced=1/5 | none |

## 细节

### 起点 [0,9]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right up right right right right up up right up up left up up right left down down right up right up right right right right right right up left down right right
- 返回解事件: walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len3 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=7204
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=7204

可达事件扫描：

- Status: complete
- 可达状态: 6962
- 合法转移: 17959
- 仅事件非法转移: 863
- Report hits: none
- 事件计数: walk=17622, push_ice=337, ice_rebound_d4=14, ice_pass_through_d5:len1=1, slide_restart_after_group=40, ice_stop_short:d1=152, push_ice_failed=863, ice_blocks_ice_no_chain_push=157, ice_stop_short:d2=68, ice_destroy_group_d6_plus:len1=40, ice_boundary_disappear_after_group=50, ice_destroyed_d3=43, ice_pass_through_d5:len2=10, ice_pass_through_d5:len3=26, ice_boundary_disappear:d8=10, ice_pass_through_d5:len4=13
