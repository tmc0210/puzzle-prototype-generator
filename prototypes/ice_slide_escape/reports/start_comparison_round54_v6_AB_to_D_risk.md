# 冰原起点比较：round54_v6_AB_to_D_risk

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,10]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,6] | fail | no | n/a | yes | none | none | complete, states=4840, wins=0 | states=9, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [6,12] | fail | no | n/a | yes | none | none | complete, states=1566, wins=0 | states=102, out=9, winOut=0, deadOut=9, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [0,6]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 4840
- 合法转移: 11565
- 仅事件非法转移: 211
- Forbidden reachable hits: none
- 事件计数: walk=11304, push_ice=261, ice_blocks_ice_no_chain_push=51, ice_rebound_d4=55, ice_stop_short:d1=102, push_ice_failed=211, ice_boundary_disappear:d1=50, ice_pass_through_d5:len1=11, slide_restart_after_group=19, ice_boundary_disappear:d2=19, ice_stop_short:d2=15, ice_destroyed_d3=10, ice_boundary_disappear:d6=10, ice_destroy_group_d6_plus:len1=6, ice_pass_through_d5:len2=2

### 起点 [6,12]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 1566
- 合法转移: 3810
- 仅事件非法转移: 68
- Forbidden reachable hits: none
- 事件计数: walk=3716, push_ice=94, ice_stop_short:d1=46, push_ice_failed=68, ice_rebound_d4=14, ice_blocks_ice_no_chain_push=12, ice_boundary_disappear:d1=22, ice_boundary_disappear:d6=4, ice_destroyed_d3=4, ice_pass_through_d5:len2=2, slide_restart_after_group=2, ice_boundary_disappear:d2=2, ice_stop_short:d2=2
