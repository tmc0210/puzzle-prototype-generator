# 冰原起点比较：ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_base_no_late

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [23,6]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,6] | pass | yes | 39 | yes | none | none | complete, states=5111, wins=1 | states=18, out=2, winOut=1, deadOut=1, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |

## 细节

### 起点 [0,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right down right right up right up right right right right down left up right right right down right down right right up right up right right right right down left up right right right down right
- 返回解事件: walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_destroyed_d3 walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=5716
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=5716

可达事件扫描：

- Status: complete
- 可达状态: 5111
- 合法转移: 12656
- 仅事件非法转移: 297
- Forbidden reachable hits: none
- 事件计数: walk=12464, push_ice=192, ice_rebound_d4=77, ice_stop_short:d1=92, push_ice_failed=297, ice_destroyed_d3=9, ice_blocks_ice_no_chain_push=14, ice_stop_short:d2=14
