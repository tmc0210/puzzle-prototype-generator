# 冰原起点比较：worker_round46_order_gate_scratch_v3_base_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,10]
- Required winning-path events: ice_destroyed_d3, ice_stop_short
- Forbidden winning-path events: ice_destroy_group_d6_plus, ice_pass_through_d5
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | fail | yes | 15 | no | none | none | complete, states=6682, wins=20 | states=9, out=3, winOut=3, deadOut=0, dist=1 | branching_win_dag, forced=0/2 | 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径 |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 返回解未覆盖全部 required winning events; 存在缺少 required winning events 的胜利路径
- 第一步合法事件: walk
- Inputs: right right right right down down right down right right right right down right down
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 找到，cost=15, inputs=right right right right down down right down right right right right down right down, events=walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk
- 触发 forbidden winning events 的胜利路径: 未找到；完整搜索，explored=6940
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 找到，cost=15, inputs=right right right right down down right down right right right right down right down, events=walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk

可达事件扫描：

- Status: complete
- 可达状态: 6682
- 合法转移: 15857
- 仅事件非法转移: 1066
- Forbidden reachable hits: none
- 事件计数: walk=15352, push_ice=505, ice_blocks_ice_no_chain_push=492, ice_destroyed_d3=91, ice_stop_short:d1=159, push_ice_failed=1066, ice_stop_short:d2=115, ice_boundary_disappear:d9=40, ice_rebound_d4=17, ice_boundary_disappear:d5=28, ice_destroy_group_d6_plus:len2=31, slide_restart_after_group=31, ice_boundary_disappear:d8=31, ice_pass_through_d5:len12=8, ice_boundary_disappear_after_group=8, ice_boundary_disappear:d4=6, ice_boundary_disappear:d13=8, ice_boundary_disappear:d6=2
