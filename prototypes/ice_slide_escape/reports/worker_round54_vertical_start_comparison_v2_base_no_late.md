# 冰原起点比较：worker_round54_vertical_v2_base_no_late

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [6,12]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,6] | pass | yes | 20 | yes | none | none | complete, states=734, wins=2 | states=9, out=1, winOut=1, deadOut=0, dist=2 | branching_win_dag, forced=1/2 | none |

## 细节

### 起点 [0,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up right right down right right up right right right down left down left down down down down down
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=732
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=732

可达事件扫描：

- Status: complete
- 可达状态: 734
- 合法转移: 1752
- 仅事件非法转移: 36
- Forbidden reachable hits: none
- 事件计数: walk=1724, push_ice=28, ice_blocks_ice_no_chain_push=8, ice_rebound_d4=4, ice_stop_short:d1=13, push_ice_failed=36, ice_boundary_disappear:d1=8, ice_stop_short:d2=2, ice_boundary_disappear:d6=1
