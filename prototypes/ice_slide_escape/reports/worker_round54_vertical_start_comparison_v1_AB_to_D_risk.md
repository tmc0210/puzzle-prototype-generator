# 冰原起点比较：worker_round54_vertical_v1_AB_to_D_risk

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [11,10]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,6] | fail | no | n/a | yes | none | none | complete, states=5774, wins=0 | states=90, out=11, winOut=0, deadOut=11, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [6,12] | fail | no | n/a | yes | none | none | complete, states=5774, wins=0 | states=90, out=11, winOut=0, deadOut=11, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

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
- 可达状态: 5774
- 合法转移: 14690
- 仅事件非法转移: 284
- Forbidden reachable hits: none
- 事件计数: walk=14388, push_ice=302, ice_blocks_ice_no_chain_push=26, ice_rebound_d4=12, ice_stop_short:d1=144, ice_boundary_disappear:d1=62, push_ice_failed=284, ice_pass_through_d5:len2=12, ice_boundary_disappear_after_group=40, ice_destroyed_d3=12, ice_stop_short:d2=24, ice_destroy_group_d6_plus:len1=16, ice_pass_through_d5:len1=4, slide_restart_after_group=4, ice_boundary_disappear:d2=8, ice_destroy_group_d6_plus:len2=8, ice_pass_through_d5:len3=4

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
- 可达状态: 5774
- 合法转移: 14690
- 仅事件非法转移: 284
- Forbidden reachable hits: none
- 事件计数: walk=14388, push_ice=302, ice_stop_short:d1=144, push_ice_failed=284, ice_blocks_ice_no_chain_push=26, ice_rebound_d4=12, ice_pass_through_d5:len2=12, ice_boundary_disappear_after_group=40, ice_destroyed_d3=12, ice_stop_short:d2=24, ice_boundary_disappear:d1=62, ice_destroy_group_d6_plus:len2=8, ice_destroy_group_d6_plus:len1=16, ice_pass_through_d5:len1=4, slide_restart_after_group=4, ice_boundary_disappear:d2=8, ice_pass_through_d5:len3=4
