# 冰原起点比较：ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1_meta_required_d6

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,3]
- Required winning-path events: ice_destroy_group_d6_plus
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [15,0] | pass | yes | 42 | yes | none | none | complete, states=10296, wins=1 | states=4, out=1, winOut=1, deadOut=0, dist=5 | branching_win_dag, forced=2/6 | none |

## 细节

### 起点 [15,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down left left down left left left up left left down left left left up right down right right right right up right right right down left left left left left left left left left left left left up left
- 返回解事件: walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk push_ice ice_rebound_d4 walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_blocks_ice_no_chain_push ice_destroy_group_d6_plus:len5 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=10479
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=10479

可达事件扫描：

- Status: complete
- 可达状态: 10296
- 合法转移: 26851
- 仅事件非法转移: 1494
- Forbidden reachable hits: none
- 事件计数: walk=25914, push_ice=937, ice_blocks_ice_no_chain_push=721, ice_rebound_d4=165, ice_stop_short:d1=451, push_ice_failed=1494, ice_destroy_group_d6_plus:len4=52, ice_boundary_disappear_after_group=132, ice_destroy_group_d6_plus:len1=59, slide_restart_after_group=106, ice_destroy_group_d6_plus:len5=21, ice_pass_through_d5:len2=24, ice_pass_through_d5:len3=17, ice_stop_short:d2=51, ice_destroy_group_d6_plus:len2=40, ice_boundary_disappear:d2=65, ice_destroy_group_d6_plus:len3=25, ice_boundary_disappear:d3=41, ice_boundary_disappear:d11=5, ice_boundary_disappear:d13=1, ice_destroyed_d3=18, ice_boundary_disappear:d14=6, ice_boundary_disappear:d12=2
