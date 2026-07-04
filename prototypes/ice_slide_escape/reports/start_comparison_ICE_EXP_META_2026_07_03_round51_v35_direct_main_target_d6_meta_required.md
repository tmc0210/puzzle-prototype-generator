# 冰原起点比较：ICE_EXP_META_2026_07_03_round51_v35_direct_main_target_d6_meta_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [11,10]
- Required winning-path events: ice_destroy_group_d6_plus, ice_destroyed_d3, ice_stop_short:d2
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [22,4] | pass | yes | 31 | yes | none | none | complete, states=7630, wins=3 | states=2, out=1, winOut=1, deadOut=0, dist=3 | branching_win_dag, forced=1/3 | none |

## 细节

### 起点 [22,4]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down left down left down down right up up left up left left left left left left left left left left down down down left up down down right down right
- 返回解事件: walk push_ice ice_blocks_ice_no_chain_push ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=8125
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=8125

可达事件扫描：

- Status: complete
- 可达状态: 7630
- 合法转移: 20495
- 仅事件非法转移: 840
- Forbidden reachable hits: none
- 事件计数: walk=20170, push_ice=325, ice_blocks_ice_no_chain_push=212, ice_destroy_group_d6_plus:len1=3, slide_restart_after_group=3, ice_destroyed_d3=13, ice_stop_short:d1=92, push_ice_failed=840, ice_stop_short:d2=124, ice_boundary_disappear:d1=34, ice_boundary_disappear:d5=36, ice_boundary_disappear:d9=20, ice_boundary_disappear:d13=6
