# 冰原起点比较：worker_round54_lshape_v4_base_strict

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [6,13]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | pass | yes | 22 | yes | none | none | complete, states=90, wins=1 | states=7, out=1, winOut=1, deadOut=0, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down right right right up right up right right right right down left left down down down down down down down down
- 返回解事件: walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=89
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=89

可达事件扫描：

- Status: complete
- 可达状态: 90
- 合法转移: 204
- 仅事件非法转移: 5
- Forbidden reachable hits: none
- 事件计数: walk=200, push_ice=4, ice_rebound_d4=2, ice_stop_short:d1=2, push_ice_failed=5
