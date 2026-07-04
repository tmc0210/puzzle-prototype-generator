# 冰原起点比较：scratch_round45_internal_debt_rewrite_v5_base_no_late

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,10]
- Required winning-path events: ice_destroyed_d3, ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | pass | yes | 29 | yes | none | none | complete, states=1532, wins=1 | states=5, out=1, winOut=1, deadOut=0, dist=4 | branching_win_dag, forced=2/4 | none |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right right right right right down down right down down left up down left left left left up down right right right right right down
- 返回解事件: walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=1572
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=1572

可达事件扫描：

- Status: complete
- 可达状态: 1532
- 合法转移: 3852
- 仅事件非法转移: 69
- Forbidden reachable hits: none
- 事件计数: walk=3784, push_ice=68, ice_blocks_ice_no_chain_push=17, ice_destroyed_d3=7, ice_stop_short:d1=28, push_ice_failed=69, ice_stop_short:d2=2, ice_rebound_d4=18, ice_boundary_disappear:d9=4, ice_boundary_disappear:d5=7, ice_boundary_disappear:d1=2
