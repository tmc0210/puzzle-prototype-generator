# 冰原起点比较：ICE_EXP_META_2026_07_03_round44_target_debt_cannon_v1_meta_required_d6

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,10]
- Required winning-path events: ice_destroy_group_d6_plus
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [22,5] | pass | yes | 23 | yes | none | none | complete, states=1778, wins=3 | states=1, out=1, winOut=1, deadOut=0, dist=3 | branching_win_dag, forced=2/3 | none |

## 细节

### 起点 [22,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_blocks_ice_no_chain_push, ice_destroy_group_d6_plus:len2, ice_destroyed_d3, push_ice, slide_restart_after_group
- Inputs: left left left left left left left left left left left left left down down right down down left up down right down
- 返回解事件: push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=1775
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=1775

可达事件扫描：

- Status: complete
- 可达状态: 1778
- 合法转移: 3905
- 仅事件非法转移: 57
- Forbidden reachable hits: none
- 事件计数: push_ice=83, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=12, ice_destroyed_d3=7, walk=3822, ice_stop_short:d1=30, push_ice_failed=57, ice_boundary_disappear:d5=15, ice_rebound_d4=18, ice_stop_short:d2=9, ice_boundary_disappear:d13=2, ice_pass_through_d5:len11=2, ice_boundary_disappear_after_group=2
