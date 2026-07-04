# 冰原起点比较：ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_base_required_latest

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [15,0]
- Required winning-path events: ice_rebound_d4, ice_destroy_group_d6_plus
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,3] | pass | yes | 44 | yes | none | none | complete, states=10315, wins=1 | states=6, out=1, winOut=1, deadOut=0, dist=5 | branching_win_dag, forced=2/6 | none |

## 细节

### 起点 [0,3]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up right right down right right down right right right up right right down right right right up left down left left left left up left left left down right right right right right right right right right right up up up up
- 返回解事件: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_destroy_group_d6_plus:len4 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=10498
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=10498

可达事件扫描：

- Status: complete
- 可达状态: 10315
- 合法转移: 26846
- 仅事件非法转移: 1570
- Forbidden reachable hits: none
- 事件计数: walk=25914, push_ice=932, ice_blocks_ice_no_chain_push=700, ice_rebound_d4=165, push_ice_failed=1570, ice_stop_short:d1=447, ice_destroy_group_d6_plus:len5=33, ice_boundary_disappear_after_group=127, ice_destroy_group_d6_plus:len1=71, slide_restart_after_group=109, ice_destroy_group_d6_plus:len4=42, ice_pass_through_d5:len2=20, ice_boundary_disappear:d2=68, ice_stop_short:d2=51, ice_pass_through_d5:len3=21, ice_destroy_group_d6_plus:len2=27, ice_destroy_group_d6_plus:len3=22, ice_boundary_disappear:d12=4, ice_boundary_disappear:d3=42, ice_boundary_disappear:d14=6, ice_boundary_disappear:d13=1, ice_destroyed_d3=18, ice_boundary_disappear:d11=3
