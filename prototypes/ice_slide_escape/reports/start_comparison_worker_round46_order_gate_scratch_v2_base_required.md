# 冰原起点比较：worker_round46_order_gate_scratch_v2_base_required

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
| [0,5] | pass | yes | 29 | yes | none | none | complete, states=3251, wins=4 | states=9, out=3, winOut=2, deadOut=1, dist=4 | branching_win_dag, forced=0/4 | none |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right right right right right down right down down left up down left left left left up down right right right right down right down
- 返回解事件: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=3247
- 触发 forbidden winning events 的胜利路径: 未找到；完整搜索，explored=3517
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=3517

可达事件扫描：

- Status: complete
- 可达状态: 3251
- 合法转移: 7478
- 仅事件非法转移: 478
- Forbidden reachable hits: none
- 事件计数: walk=7242, push_ice=236, ice_blocks_ice_no_chain_push=200, ice_destroyed_d3=27, ice_stop_short:d1=76, push_ice_failed=478, ice_stop_short:d2=62, ice_rebound_d4=16, ice_boundary_disappear:d9=19, ice_destroy_group_d6_plus:len2=12, slide_restart_after_group=12, ice_boundary_disappear:d8=12, ice_pass_through_d5:len12=8, ice_boundary_disappear_after_group=8, ice_boundary_disappear:d5=12, ice_boundary_disappear:d13=4
