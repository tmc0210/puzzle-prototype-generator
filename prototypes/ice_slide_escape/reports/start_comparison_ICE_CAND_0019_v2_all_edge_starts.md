# 冰原起点比较：ICE_CAND_0019_v2_all_edge_starts

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [15,3]
- Required events: ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1, ice_stop_short:d2, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group, ice_blocks_ice_no_chain_push
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,9] | pass | yes | 43 | yes | none | none | complete, states=50528, wins=7 | states=51, out=8, winOut=3, deadOut=5, dist=6 | branching_win_dag, forced=0/6 | none |

## 细节

### 起点 [0,9]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right up up right right right up up left up up right right right right right right right right up up left left left left left left left down up right right right right right right right down down right
- 返回解事件: walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=59928
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=59928

可达事件扫描：

- Status: complete
- 可达状态: 50528
- 合法转移: 140744
- 仅事件非法转移: 2502
- Report hits: none
- 事件计数: walk=138362, push_ice=2382, ice_stop_short:d2=194, ice_pass_through_d5:len1=237, slide_restart_after_group=204, ice_stop_short:d1=793, push_ice_failed=2502, ice_destroyed_d3=457, ice_destroy_group_d6_plus:len1=274, ice_boundary_disappear_after_group=379, ice_blocks_ice_no_chain_push=1265, ice_boundary_disappear:d4=117, ice_rebound_d4=142, ice_pass_through_d5:len3=51, ice_boundary_disappear:d8=194, ice_boundary_disappear:d7=92, ice_pass_through_d5:len2=4, ice_destroy_group_d6_plus:len3=17, ice_boundary_disappear:d11=14
