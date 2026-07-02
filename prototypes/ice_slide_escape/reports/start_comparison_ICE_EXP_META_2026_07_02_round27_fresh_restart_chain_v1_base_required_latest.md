# 冰原起点比较：ICE_EXP_META_2026_07_02_round27_fresh_restart_chain_v1_base_required_latest

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [20,11]
- Required winning-path events: ice_destroy_group_d6_plus, slide_restart_after_group
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,8] | pass | yes | 23 | yes | none | none | complete, states=262, wins=2 | states=13, out=3, winOut=2, deadOut=1, dist=2 | branching_win_dag, forced=0/2 | none |

## 细节

### 起点 [0,8]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right down down down right right right right right right right right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk push_ice ice_stop_short:d2 push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=260
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=260

可达事件扫描：

- Status: complete
- 可达状态: 262
- 合法转移: 520
- 仅事件非法转移: 20
- Forbidden reachable hits: none
- 事件计数: walk=500, push_ice=20, ice_blocks_ice_no_chain_push=6, ice_destroyed_d3=6, ice_stop_short:d2=4, ice_stop_short:d1=6, ice_destroy_group_d6_plus:len1=8, slide_restart_after_group=4, ice_boundary_disappear_after_group=4, push_ice_failed=20
