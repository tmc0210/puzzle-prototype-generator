# 冰原起点比较：ICE_EXP_META_2026_07_03_round48_ordered_dual_debt_v18_lower_key_probe_base_strict

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [11,10]
- Required winning-path events: ice_destroyed_d3, ice_stop_short
- Forbidden winning-path events: ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group
- Forbidden reachable events: ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | fail | no | n/a | no | none | ice_destroy_group_d6_plus:len2, slide_restart_after_group | complete, states=3584, wins=0 | states=9, out=3, winOut=0, deadOut=3, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解; 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解; 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=3584
- 触发 forbidden winning events 的胜利路径: 未找到；完整搜索，explored=3584
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=3584

可达事件扫描：

- Status: complete
- 可达状态: 3584
- 合法转移: 8332
- 仅事件非法转移: 537
- Forbidden reachable hits: ice_destroy_group_d6_plus:len2, slide_restart_after_group
- 事件计数: walk=8074, push_ice=258, ice_blocks_ice_no_chain_push=205, ice_destroyed_d3=31, ice_stop_short:d1=88, push_ice_failed=537, ice_stop_short:d2=76, ice_boundary_disappear:d9=23, ice_rebound_d4=14, ice_destroy_group_d6_plus:len2=10, slide_restart_after_group=10, ice_boundary_disappear:d8=10, ice_boundary_disappear:d5=12, ice_boundary_disappear:d13=4
