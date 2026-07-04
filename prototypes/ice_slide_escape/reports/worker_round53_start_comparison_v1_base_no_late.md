# 冰原起点比较：worker_round53_v1_base_no_late

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [9,6]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,3] | fail | yes | 12 | yes | none | ice_destroy_group_d6_plus:len1, ice_pass_through_d5:len1, slide_restart_after_group | complete, states=3176, wins=30 | states=51, out=6, winOut=0, deadOut=0, dist=0 | branching_win_dag, forced=0/0 | 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,3]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: right down down down right right right right right right right right
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 3176
- 合法转移: 10024
- 仅事件非法转移: 94
- Forbidden reachable hits: ice_destroy_group_d6_plus:len1, ice_pass_through_d5:len1, slide_restart_after_group
- 事件计数: walk=9840, push_ice=184, ice_destroyed_d3=52, ice_rebound_d4=16, push_ice_failed=94, ice_stop_short:d2=14, ice_blocks_ice_no_chain_push=6, ice_stop_short:d1=24, ice_boundary_disappear:d4=30, ice_boundary_disappear:d1=30, ice_destroy_group_d6_plus:len1=12, ice_boundary_disappear_after_group=16, ice_pass_through_d5:len1=6, slide_restart_after_group=2, ice_boundary_disappear:d2=2
