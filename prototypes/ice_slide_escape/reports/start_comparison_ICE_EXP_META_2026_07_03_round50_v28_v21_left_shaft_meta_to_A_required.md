# 冰原起点比较：ICE_EXP_META_2026_07_03_round50_v28_v21_left_shaft_meta_to_A_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,5]
- Required winning-path events: ice_destroy_group_d6_plus, ice_destroyed_d3, ice_stop_short
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [22,4] | pass | yes | 29 | yes | none | none | complete, states=8284, wins=34 | states=1, out=1, winOut=1, deadOut=0, dist=3 | branching_win_dag, forced=2/3 | none |

## 细节

### 起点 [22,4]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_stop_short:d1, push_ice
- Inputs: down left left left left left left left left left left left left down down down left left left left left left up up up left left left left
- 返回解事件: push_ice ice_stop_short:d1 push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=8250
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=8250

可达事件扫描：

- Status: complete
- 可达状态: 8284
- 合法转移: 18359
- 仅事件非法转移: 1329
- Forbidden reachable hits: none
- 事件计数: push_ice=685, ice_stop_short:d1=240, walk=17674, push_ice_failed=1329, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=504, ice_destroyed_d3=98, ice_stop_short:d2=123, ice_boundary_disappear:d5=40, ice_rebound_d4=36, ice_boundary_disappear:d17=40, ice_pass_through_d5:len12=32, ice_boundary_disappear_after_group=32, ice_boundary_disappear:d13=39, ice_boundary_disappear:d9=37
