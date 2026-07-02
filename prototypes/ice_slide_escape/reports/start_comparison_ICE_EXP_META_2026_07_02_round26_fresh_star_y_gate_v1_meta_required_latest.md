# 冰原起点比较：ICE_EXP_META_2026_07_02_round26_fresh_star_y_gate_v1_meta_required_latest

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [31,15]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus, ice_boundary_disappear
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [13,0] | pass | yes | 55 | yes | none | none | complete, states=6722, wins=1 | states=6, out=1, winOut=1, deadOut=0, dist=6 | branching_win_dag, forced=1/6 | none |

## 细节

### 起点 [13,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down right down right right right right down down down down left left left left up down right right right right down down left down down down right down right right right right up left right up right right down right down right right right right up left down right right right
- 返回解事件: walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=6721
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=6721

可达事件扫描：

- Status: complete
- 可达状态: 6722
- 合法转移: 15335
- 仅事件非法转移: 400
- Forbidden reachable hits: none
- 事件计数: walk=15034, push_ice=301, ice_rebound_d4=101, ice_stop_short:d1=200, push_ice_failed=400
