# 冰原起点比较：ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_base_required_latest

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [27,5]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | pass | yes | 47 | yes | none | none | complete, states=1717, wins=1 | states=6, out=1, winOut=1, deadOut=0, dist=6 | branching_win_dag, forced=1/6 | none |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up right right down right right right down right right up left down right right right up right right right down right right up left down right right right up right right right down right right up left down right right right up right right right
- 返回解事件: walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=1716
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=1716

可达事件扫描：

- Status: complete
- 可达状态: 1717
- 合法转移: 3740
- 仅事件非法转移: 140
- Forbidden reachable hits: none
- 事件计数: walk=3614, push_ice=126, ice_rebound_d4=56, ice_stop_short:d1=70, push_ice_failed=140
