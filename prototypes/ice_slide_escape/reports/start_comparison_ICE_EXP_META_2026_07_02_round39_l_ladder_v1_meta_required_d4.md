# 冰原起点比较：ICE_EXP_META_2026_07_02_round39_l_ladder_v1_meta_required_d4

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [19,12]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [7,0] | pass | yes | 34 | yes | none | none | complete, states=979, wins=1 | states=17, out=2, winOut=1, deadOut=1, dist=4 | branching_win_dag, forced=1/4 | none |

## 细节

### 起点 [7,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down down down right down down down right down down left up up right right right down right down right right right right up left down right right right right
- 返回解事件: walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=978
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=978

可达事件扫描：

- Status: complete
- 可达状态: 979
- 合法转移: 2367
- 仅事件非法转移: 84
- Forbidden reachable hits: none
- 事件计数: walk=2308, push_ice=59, ice_stop_short:d1=35, push_ice_failed=84, ice_rebound_d4=24
