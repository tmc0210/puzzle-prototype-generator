# 冰原起点比较：ICE_EXP_META_2026_07_02_round24_v1_verticalD_base_required_latest

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,3]
- Required winning-path events: ice_destroy_group_d6_plus, ice_rebound_d4, ice_stop_short
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [14,8] | pass | yes | 23 | yes | none | none | complete, states=275, wins=2 | states=9, out=1, winOut=1, deadOut=0, dist=4 | branching_win_dag, forced=2/4 | none |

## 细节

### 起点 [14,8]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left up up up up right up up down left left left left left left left left left left left left left
- 返回解事件: walk walk push_ice ice_rebound_d4 walk walk push_ice ice_stop_short:d1 walk walk push_ice ice_stop_short:d1 walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=273
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=273

可达事件扫描：

- Status: complete
- 可达状态: 275
- 合法转移: 572
- 仅事件非法转移: 9
- Forbidden reachable hits: none
- 事件计数: walk=562, push_ice_failed=9, push_ice=10, ice_rebound_d4=1, ice_stop_short:d1=4, ice_destroy_group_d6_plus:len1=2, ice_boundary_disappear_after_group=2, ice_boundary_disappear:d2=1, ice_blocks_ice_no_chain_push=1, ice_stop_short:d2=1, ice_boundary_disappear:d1=1
