# 冰原起点比较：worker_round47_non_BC_internal_d6_v1_meta_required

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
| [10,10] | pass | yes | 45 | yes | none | none | complete, states=1904, wins=2 | states=20, out=4, winOut=3, deadOut=1, dist=4 | branching_win_dag, forced=0/4 | none |

## 细节

### 起点 [10,10]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up up up up up left down right down down left left left left left left up up up right left down down down right right right right right up up right up right right right right right right right right right right right right
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_boundary_disappear:d8 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=1902
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=1902

可达事件扫描：

- Status: complete
- 可达状态: 1904
- 合法转移: 4168
- 仅事件非法转移: 391
- Forbidden reachable hits: none
- 事件计数: walk=4022, push_ice_failed=391, push_ice=146, ice_blocks_ice_no_chain_push=98, ice_stop_short:d1=39, ice_destroyed_d3=37, ice_stop_short:d2=23, ice_rebound_d4=13, ice_boundary_disappear:d5=12, ice_destroy_group_d6_plus:len2=8, slide_restart_after_group=8, ice_boundary_disappear:d8=8, ice_boundary_disappear:d9=12, ice_boundary_disappear:d13=2
