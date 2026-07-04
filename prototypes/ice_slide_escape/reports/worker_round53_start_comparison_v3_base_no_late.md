# 冰原起点比较：worker_round53_v3_base_no_late

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
| [0,3] | pass | yes | 16 | yes | none | none | complete, states=294, wins=2 | states=4, out=1, winOut=1, deadOut=0, dist=2 | branching_win_dag, forced=1/2 | none |

## 细节

### 起点 [0,3]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right down right down down left up down right right right right right
- 返回解事件: walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 294
- 合法转移: 813
- 仅事件非法转移: 12
- Forbidden reachable hits: none
- 事件计数: walk=802, push_ice=11, ice_destroyed_d3=1, ice_stop_short:d2=4, push_ice_failed=12, ice_boundary_disappear:d1=4, ice_boundary_disappear:d4=2
