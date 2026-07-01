# 冰原起点比较：ICE_EXP_META_2026_07_02_round24_v1_verticalD_meta_required_full

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [12,14]
- Required winning-path events: ice_destroy_group_d6_plus, ice_rebound_d4, ice_stop_short
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [14,1] | pass | yes | 21 | yes | none | none | complete, states=706, wins=2 | states=2, out=2, winOut=1, deadOut=1, dist=3 | branching_win_dag, forced=1/3 | none |

## 细节

### 起点 [14,1]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left left down down right right up down down left down down down down down down down down down down
- 返回解事件: walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_rebound_d4 walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=704
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=704

可达事件扫描：

- Status: complete
- 可达状态: 706
- 合法转移: 1470
- 仅事件非法转移: 28
- Forbidden reachable hits: none
- 事件计数: walk=1434, push_ice=36, ice_stop_short:d2=5, ice_destroy_group_d6_plus:len1=13, slide_restart_after_group=3, ice_rebound_d4=3, push_ice_failed=28, ice_boundary_disappear_after_group=10, ice_boundary_disappear:d2=2, ice_stop_short:d1=12, ice_boundary_disappear:d1=4
