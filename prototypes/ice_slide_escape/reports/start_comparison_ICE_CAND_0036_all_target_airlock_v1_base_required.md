# 冰原起点比较：ICE_CAND_0036_all_target_airlock_v1_base_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [14,1]
- Required winning-path events: push_ice, ice_rebound_d4, ice_blocks_ice_no_chain_push
- Forbidden winning-path events: ice_destroyed_d3, ice_boundary_disappear, ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,6] | pass | yes | 43 | yes | none | none | complete, states=3052, wins=1 | states=6, out=1, winOut=1, deadOut=0, dist=4 | branching_win_dag, forced=2/4 | none |

## 细节

### 起点 [0,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right up right right right right down right up right right right right up up up up left left left left down up left left left left left down up right right right right right right right right right
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=2897
- 触发 forbidden winning events 的胜利路径: 未找到；完整搜索，explored=2897
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=2897

可达事件扫描：

- Status: complete
- 可达状态: 3052
- 合法转移: 6430
- 仅事件非法转移: 223
- Forbidden reachable hits: none
- 事件计数: walk=6182, push_ice=248, ice_blocks_ice_no_chain_push=177, ice_rebound_d4=43, push_ice_failed=223, ice_stop_short:d1=66, ice_boundary_disappear:d4=11, ice_boundary_disappear:d0=79, ice_pass_through_d5:len5=19, ice_boundary_disappear_after_group=19, ice_boundary_disappear:d2=15, ice_boundary_disappear:d5=3, ice_boundary_disappear:d7=4, ice_boundary_disappear:d8=4, ice_stop_short:d2=4
