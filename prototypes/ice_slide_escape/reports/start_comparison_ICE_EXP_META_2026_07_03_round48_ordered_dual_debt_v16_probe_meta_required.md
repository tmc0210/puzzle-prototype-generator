# 冰原起点比较：ICE_EXP_META_2026_07_03_round48_ordered_dual_debt_v16_probe_meta_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [22,5]
- Required winning-path events: ice_destroy_group_d6_plus, ice_destroyed_d3, ice_stop_short
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [10,10] | pass | yes | 47 | yes | none | none | complete, states=30503, wins=2 | states=21, out=7, winOut=4, deadOut=3, dist=5 | branching_win_dag, forced=0/6 | none |

## 细节

### 起点 [10,10]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up up left up right up up left right down down left left left left down left left up up up right down left down down right up right right right right up right up right right right right right right right right right right right right
- 返回解事件: walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_boundary_disappear:d8 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=31752
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=31752

可达事件扫描：

- Status: complete
- 可达状态: 30503
- 合法转移: 72958
- 仅事件非法转移: 4395
- Forbidden reachable hits: none
- 事件计数: walk=70130, push_ice=2828, ice_blocks_ice_no_chain_push=1990, ice_destroyed_d3=484, ice_stop_short:d1=1051, push_ice_failed=4395, ice_stop_short:d2=483, ice_boundary_disappear:d5=139, ice_rebound_d4=90, ice_destroy_group_d6_plus:len11=60, ice_boundary_disappear_after_group=169, ice_pass_through_d5:len12=11, ice_destroy_group_d6_plus:len2=143, slide_restart_after_group=143, ice_boundary_disappear:d8=143, ice_pass_through_d5:len4=75, ice_boundary_disappear:d9=137, ice_boundary_disappear:d17=18, ice_pass_through_d5:len11=23, ice_boundary_disappear:d4=61, ice_boundary_disappear:d13=21, ice_boundary_disappear:d16=3, ice_boundary_disappear:d6=29
