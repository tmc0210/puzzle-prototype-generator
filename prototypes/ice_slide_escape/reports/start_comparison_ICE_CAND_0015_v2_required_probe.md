# 冰原起点比较：ICE_CAND_0015_v2_required_probe

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [14,1]
- Required events: ice_stop_short, ice_pass_through_d5, slide_restart_after_group, ice_destroyed_d3, ice_destroy_group_d6_plus
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,1] | pass | yes | 36 | yes | none | none | complete, states=3072, wins=1 | states=2, out=1, winOut=1, deadOut=0, dist=4 | branching_win_dag, forced=1/4 | none |

## 细节

### 起点 [0,1]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right down down down down down down down down left up up up up up up right right right right up up right right down right right right right right up left right right
- 返回解事件: walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=3249
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=3249

可达事件扫描：

- Status: complete
- 可达状态: 3072
- 合法转移: 9583
- 仅事件非法转移: 119
- Report hits: none
- 事件计数: walk=9472, push_ice=111, ice_stop_short:d2=2, push_ice_failed=119, ice_stop_short:d1=42, ice_blocks_ice_no_chain_push=16, ice_destroyed_d3=12, ice_pass_through_d5:len1=9, slide_restart_after_group=21, ice_rebound_d4=16, ice_boundary_disappear:d2=16, ice_pass_through_d5:len3=3, ice_boundary_disappear_after_group=7, ice_destroy_group_d6_plus:len1=4, ice_destroy_group_d6_plus:len2=12, ice_boundary_disappear:d4=10, ice_boundary_disappear:d1=4, ice_boundary_disappear:d9=1, ice_boundary_disappear:d5=1
