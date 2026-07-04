# 冰原起点比较：ICE_EXP_META_2026_07_02_round42_cross_return_probe_v1_goal_A_r2

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,6]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,6] | pass | yes | 0 | yes | none | none | complete, states=293, wins=1 | states=18, out=2, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |
| [13,6] | fail | no | n/a | yes | none | none | complete, states=166, wins=0 | states=18, out=2, winOut=0, deadOut=2, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [0,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 293
- 合法转移: 734
- 仅事件非法转移: 8
- Forbidden reachable hits: none
- 事件计数: walk=726, push_ice=8, ice_rebound_d4=3, ice_destroyed_d3=1, ice_stop_short:d1=3, push_ice_failed=8, ice_destroy_group_d6_plus:len3=1, ice_boundary_disappear_after_group=1

### 起点 [13,6]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 166
- 合法转移: 418
- 仅事件非法转移: 5
- Forbidden reachable hits: none
- 事件计数: walk=414, push_ice=4, ice_stop_short:d1=2, ice_rebound_d4=1, push_ice_failed=5, ice_destroy_group_d6_plus:len3=1, ice_boundary_disappear_after_group=1
