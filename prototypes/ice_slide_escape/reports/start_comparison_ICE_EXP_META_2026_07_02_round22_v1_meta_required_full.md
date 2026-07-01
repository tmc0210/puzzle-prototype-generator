# 冰原起点比较：ICE_EXP_META_2026_07_02_round22_v1_meta_required_full

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,4]
- Required winning-path events: ice_rebound_d4, ice_stop_short, ice_boundary_disappear, ice_destroy_group_d6_plus
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [7,5] | pass | yes | 22 | yes | none | none | complete, states=3890, wins=1 | states=58, out=7, winOut=1, deadOut=6, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |

## 细节

### 起点 [7,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up left up left down left up up left left left down down right right right right right right right right right
- 返回解事件: walk walk walk push_ice ice_rebound_d4 walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk push_ice ice_boundary_disappear:d1 push_ice ice_destroy_group_d6_plus:len2 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=5433
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=5433

可达事件扫描：

- Status: complete
- 可达状态: 3890
- 合法转移: 11053
- 仅事件非法转移: 247
- Forbidden reachable hits: none
- 事件计数: walk=10752, push_ice=301, ice_rebound_d4=45, push_ice_failed=247, ice_blocks_ice_no_chain_push=56, ice_stop_short:d2=43, ice_stop_short:d1=96, ice_boundary_disappear:d1=53, ice_destroy_group_d6_plus:len2=8, ice_boundary_disappear_after_group=31, ice_destroy_group_d6_plus:len1=11, ice_pass_through_d5:len1=11, ice_destroyed_d3=25, ice_boundary_disappear:d2=6, ice_boundary_disappear:d8=1, ice_pass_through_d5:len3=1, ice_boundary_disappear:d4=1
