# 冰原起点比较：ICE_EXP_META_2026_07_02_round22_v2_patch_base_required_full

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [7,5]
- Required winning-path events: ice_destroyed_d3, ice_rebound_d4, ice_stop_short
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [1,5] | pass | yes | 12 | yes | none | none | complete, states=388, wins=1 | states=1, out=1, winOut=1, deadOut=0, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |

## 细节

### 起点 [1,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_destroyed_d3, push_ice
- Inputs: up right right right right right up left down right right down
- 返回解事件: push_ice ice_destroyed_d3 walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_stop_short:d1 walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=387
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=387

可达事件扫描：

- Status: complete
- 可达状态: 388
- 合法转移: 959
- 仅事件非法转移: 29
- Forbidden reachable hits: none
- 事件计数: push_ice=27, ice_destroyed_d3=3, walk=932, ice_rebound_d4=7, push_ice_failed=29, ice_stop_short:d1=11, ice_stop_short:d2=6
