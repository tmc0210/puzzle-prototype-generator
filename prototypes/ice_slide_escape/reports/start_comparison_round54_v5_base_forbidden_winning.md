# 冰原起点比较：round54_v5_base_forbidden_winning

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [6,12]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,6] | pass | yes | 20 | yes | none | none | complete, states=6561, wins=2 | states=9, out=1, winOut=1, deadOut=0, dist=2 | branching_win_dag, forced=1/2 | none |

## 细节

### 起点 [0,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up right right down right right up right right right down left down left down down down down down
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=6559
- 触发 forbidden winning events 的胜利路径: 未找到；完整搜索，explored=7353
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=7353

可达事件扫描：

- Status: complete
- 可达状态: 6561
- 合法转移: 15619
- 仅事件非法转移: 292
- Forbidden reachable hits: none
- 事件计数: walk=15246, push_ice=373, ice_blocks_ice_no_chain_push=60, ice_rebound_d4=94, ice_stop_short:d1=141, push_ice_failed=292, ice_boundary_disappear:d1=67, ice_pass_through_d5:len1=17, slide_restart_after_group=25, ice_boundary_disappear:d2=25, ice_destroy_group_d6_plus:len1=6, ice_stop_short:d2=21, ice_destroyed_d3=12, ice_boundary_disappear:d6=13, ice_pass_through_d5:len2=2
