# 冰原起点比较：ICE_EXP_META_2026_07_02_round42_cross_target_probe_v1_base_no_late_r2

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [13,6]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,6] | pass | yes | 21 | yes | none | none | complete, states=132, wins=1 | states=8, out=1, winOut=1, deadOut=0, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |

## 细节

### 起点 [0,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right up right right down right right up right right right down left up right right right down right
- 返回解事件: walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=131
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=131

可达事件扫描：

- Status: complete
- 可达状态: 132
- 合法转移: 292
- 仅事件非法转移: 4
- Forbidden reachable hits: none
- 事件计数: walk=288, push_ice=4, ice_rebound_d4=2, ice_stop_short:d1=2, push_ice_failed=4
