# 冰原起点比较：ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_base_required_latest

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [20,3]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus, ice_boundary_disappear
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,3] | pass | yes | 34 | yes | none | none | complete, states=109808, wins=1 | states=2064, out=100, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |

## 细节

### 起点 [0,3]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up right right down right right right down right right up left down right right right up right right right down right right up left down right right right up right right right
- 返回解事件: walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=109830
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=109830

可达事件扫描：

- Status: complete
- 可达状态: 109808
- 合法转移: 243352
- 仅事件非法转移: 9344
- Forbidden reachable hits: none
- 事件计数: walk=235280, push_ice=8072, ice_stop_short:d1=4592, push_ice_failed=9344, ice_rebound_d4=3480
