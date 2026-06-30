# 冰原起点比较：ICE_CAND_0012_meta_E_first_right_entry_base

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [14,1]
- Required events: ice_rebound_d4, ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,7] | pass | yes | 42 | yes | none | none | complete, states=11845, wins=1 | states=34, out=8, winOut=1, deadOut=7, dist=4 | one_win_continuation_per_scc, forced=4/4 | none |

## 细节

### 起点 [0,7]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right up right right up up up up up up right down right right right right right right right right down down down down down down down down left left right right up up up up up up up up right
- 返回解事件: walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=15777
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=15777

可达事件扫描：

- Status: complete
- 可达状态: 11845
- 合法转移: 30428
- 仅事件非法转移: 300
- Report hits: none
- 事件计数: walk=29796, push_ice=632, ice_rebound_d4=23, ice_stop_short:d1=177, push_ice_failed=300, ice_boundary_disappear:d2=25, ice_destroyed_d3=63, ice_stop_short:d2=41, ice_blocks_ice_no_chain_push=109, ice_pass_through_d5:len1=20, slide_restart_after_group=20, ice_boundary_disappear:d1=52, ice_boundary_disappear:d3=69, ice_destroy_group_d6_plus:len1=102, ice_boundary_disappear_after_group=123, ice_destroy_group_d6_plus:len2=4, ice_boundary_disappear:d7=27, ice_boundary_disappear:d8=10, ice_destroy_group_d6_plus:len4=17, ice_boundary_disappear:d9=19, ice_boundary_disappear:d12=2, ice_boundary_disappear:d5=1
