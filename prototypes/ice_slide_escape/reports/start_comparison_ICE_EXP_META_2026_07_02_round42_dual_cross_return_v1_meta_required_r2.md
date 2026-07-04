# 冰原起点比较：ICE_EXP_META_2026_07_02_round42_dual_cross_return_v1_meta_required_r2

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,6]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [23,6] | pass | yes | 47 | yes | none | none | complete, states=3038, wins=1 | states=558, out=8, winOut=0, deadOut=0, dist=0 | one_win_continuation_per_scc, forced=0/0 | none |

## 细节

### 起点 [23,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left up left left left left left left down down down left down down right up up up left left left up left up left left left left left left down down down left down down right up up up left left left up left left left
- 返回解事件: walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=3158
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=3158

可达事件扫描：

- Status: complete
- 可达状态: 3038
- 合法转移: 7546
- 仅事件非法转移: 140
- Forbidden reachable hits: none
- 事件计数: walk=7434, push_ice=112, ice_stop_short:d1=56, ice_rebound_d4=56, push_ice_failed=140
