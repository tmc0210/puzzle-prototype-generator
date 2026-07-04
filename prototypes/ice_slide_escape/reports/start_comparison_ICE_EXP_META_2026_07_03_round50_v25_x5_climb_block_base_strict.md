# 冰原起点比较：ICE_EXP_META_2026_07_03_round50_v25_x5_climb_block_base_strict

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,10]
- Required winning-path events: ice_destroyed_d3, ice_stop_short
- Forbidden winning-path events: ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group
- Forbidden reachable events: ice_destroy_group_d6_plus, ice_pass_through_d5, slide_restart_after_group
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | fail | no | n/a | no | none | ice_pass_through_d5:len4 | complete, states=636, wins=0 | states=8, out=2, winOut=0, deadOut=2, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解; 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解; 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=636
- 触发 forbidden winning events 的胜利路径: 未找到；完整搜索，explored=767
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=767

可达事件扫描：

- Status: complete
- 可达状态: 636
- 合法转移: 1430
- 仅事件非法转移: 111
- Forbidden reachable hits: ice_pass_through_d5:len4
- 事件计数: walk=1390, push_ice=40, ice_blocks_ice_no_chain_push=35, ice_destroyed_d3=6, ice_stop_short:d1=17, push_ice_failed=111, ice_pass_through_d5:len4=3, ice_boundary_disappear_after_group=3, ice_stop_short:d2=4, ice_rebound_d4=4, ice_boundary_disappear:d9=4, ice_boundary_disappear:d2=2
