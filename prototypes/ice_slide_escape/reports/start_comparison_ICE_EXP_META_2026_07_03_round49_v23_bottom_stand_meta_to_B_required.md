# 冰原起点比较：ICE_EXP_META_2026_07_03_round49_v23_bottom_stand_meta_to_B_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [11,10]
- Required winning-path events: ice_destroy_group_d6_plus, ice_destroyed_d3, ice_stop_short
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [22,4] | pass | yes | 19 | yes | none | none | complete, states=1440, wins=7 | states=1, out=1, winOut=1, deadOut=0, dist=2 | branching_win_dag, forced=2/2 | none |

## 细节

### 起点 [22,4]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_stop_short:d1, push_ice
- Inputs: down left left left left left left left left left left left left down down down down down right
- 返回解事件: push_ice ice_stop_short:d1 push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=1433
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=1433

可达事件扫描：

- Status: complete
- 可达状态: 1440
- 合法转移: 3161
- 仅事件非法转移: 235
- Forbidden reachable hits: none
- 事件计数: push_ice=85, ice_stop_short:d1=28, walk=3076, push_ice_failed=235, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=69, ice_destroyed_d3=8, ice_boundary_disappear:d3=10, ice_boundary_disappear:d5=9, ice_stop_short:d2=15, ice_boundary_disappear:d4=8, ice_boundary_disappear:d9=5, ice_boundary_disappear:d13=2
