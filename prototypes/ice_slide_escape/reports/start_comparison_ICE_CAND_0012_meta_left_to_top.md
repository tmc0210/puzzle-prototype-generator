# 冰原起点比较：ICE_CAND_0012_meta_left_to_top

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [4,0]
- Required events: ice_rebound_d4, ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,7] | pass | yes | 47 | yes | none | none | complete, states=4058, wins=1 | states=2, out=1, winOut=1, deadOut=0, dist=4 | one_win_continuation_per_scc, forced=4/4 | none |

## 细节

### 起点 [0,7]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right up up up up up up up right down right right right right right right right down down down down down down down down left right up up up up up up up up left left left left left left left up left
- 返回解事件: walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=4832
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=4832

可达事件扫描：

- Status: complete
- 可达状态: 4058
- 合法转移: 9769
- 仅事件非法转移: 138
- Report hits: none
- 事件计数: walk=9574, push_ice=195, ice_rebound_d4=1, ice_stop_short:d1=61, push_ice_failed=138, ice_stop_short:d2=21, ice_blocks_ice_no_chain_push=67, ice_pass_through_d5:len1=17, slide_restart_after_group=17, ice_boundary_disappear:d1=20, ice_destroy_group_d6_plus:len1=43, ice_boundary_disappear_after_group=62, ice_destroy_group_d6_plus:len2=12, ice_boundary_disappear:d7=17, ice_boundary_disappear:d8=12, ice_destroy_group_d6_plus:len4=5, ice_pass_through_d5:len3=2, ice_boundary_disappear:d5=1
