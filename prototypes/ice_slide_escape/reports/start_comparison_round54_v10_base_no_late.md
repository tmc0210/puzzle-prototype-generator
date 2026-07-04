# 冰原起点比较：round54_v10_base_no_late

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [7,0]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,6] | pass | yes | 19 | yes | none | none | complete, states=847, wins=1 | states=9, out=1, winOut=1, deadOut=0, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |

## 细节

### 起点 [0,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up right right down right right up right right right down left up up up up up up
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=846
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=846

可达事件扫描：

- Status: complete
- 可达状态: 847
- 合法转移: 2050
- 仅事件非法转移: 38
- Forbidden reachable hits: none
- 事件计数: walk=2018, push_ice=32, ice_blocks_ice_no_chain_push=6, ice_rebound_d4=3, ice_stop_short:d1=19, push_ice_failed=38, ice_boundary_disappear:d6=2, ice_stop_short:d2=5, ice_destroyed_d3=3
