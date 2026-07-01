# 冰原起点比较：ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_meta_required_full

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,4]
- Required winning-path events: ice_rebound_d4, ice_stop_short, ice_boundary_disappear, ice_destroy_group_d6_plus
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [7,5] | pass | yes | 22 | yes | none | none | complete, states=1804, wins=1 | states=14, out=2, winOut=2, deadOut=0, dist=3 | branching_win_dag, forced=0/3 | none |

## 细节

### 起点 [7,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up left left left up left left left down right right right right right up left down right right right right right
- 返回解事件: walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk push_ice ice_boundary_disappear:d1 push_ice ice_destroy_group_d6_plus:len2 ice_boundary_disappear_after_group walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=2261
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=2261

可达事件扫描：

- Status: complete
- 可达状态: 1804
- 合法转移: 4706
- 仅事件非法转移: 137
- Forbidden reachable hits: none
- 事件计数: walk=4574, push_ice=132, ice_rebound_d4=33, push_ice_failed=137, ice_blocks_ice_no_chain_push=15, ice_stop_short:d2=21, ice_stop_short:d1=40, ice_boundary_disappear:d1=21, ice_destroy_group_d6_plus:len2=5, ice_boundary_disappear_after_group=5, ice_destroyed_d3=6, ice_boundary_disappear:d2=6
