# 冰原起点比较：ICE_EXP_META_2026_07_02_round41_mutual_anchor_pre_d6_probe_v1_base_no_d6

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [17,3]
- Required winning-path events: ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,3] | fail | yes | 43 | yes | none | ice_destroy_group_d6_plus:len1, ice_destroy_group_d6_plus:len2, ice_destroy_group_d6_plus:len3, ice_destroy_group_d6_plus:len4, ice_destroy_group_d6_plus:len5, ice_pass_through_d5:len2, slide_restart_after_group | complete, states=9284, wins=1 | states=6, out=1, winOut=1, deadOut=0, dist=5 | branching_win_dag, forced=2/6 | 可达图中出现 forbidden reachable events |

## 细节

### 起点 [0,3]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 可达图中出现 forbidden reachable events
- 第一步合法事件: walk
- Inputs: right up right right down right right down right right right up right right down right right right up left down left left left left up left left left down right right right right right right right right right right up right right
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_destroy_group_d6_plus:len4 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=9283
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=9283

可达事件扫描：

- Status: complete
- 可达状态: 9284
- 合法转移: 23879
- 仅事件非法转移: 1248
- Forbidden reachable hits: ice_destroy_group_d6_plus:len1, ice_destroy_group_d6_plus:len2, ice_destroy_group_d6_plus:len3, ice_destroy_group_d6_plus:len4, ice_destroy_group_d6_plus:len5, ice_pass_through_d5:len2, slide_restart_after_group
- 事件计数: walk=23058, push_ice=821, ice_blocks_ice_no_chain_push=548, ice_rebound_d4=148, push_ice_failed=1248, ice_stop_short:d1=275, ice_boundary_disappear:d3=148, ice_destroy_group_d6_plus:len5=26, ice_boundary_disappear_after_group=58, ice_destroy_group_d6_plus:len1=67, slide_restart_after_group=103, ice_destroy_group_d6_plus:len4=32, ice_pass_through_d5:len2=19, ice_boundary_disappear:d2=64, ice_boundary_disappear:d5=33, ice_boundary_disappear:d8=21, ice_destroy_group_d6_plus:len2=15, ice_stop_short:d2=16, ice_boundary_disappear:d10=5, ice_boundary_disappear:d11=13, ice_boundary_disappear:d12=4, ice_boundary_disappear:d13=4, ice_boundary_disappear:d14=5, ice_boundary_disappear:d7=4, ice_destroyed_d3=10, ice_boundary_disappear:d6=9, ice_destroy_group_d6_plus:len3=2, ice_boundary_disappear:d9=4
