# 冰原起点比较：ICE_EXP_META_2026_07_01_round16_v37_base_required_core

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,1]
- Required winning-path events: ice_pass_through_d5, ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,7] | pass | yes | 32 | yes | none | none | complete, states=214594, wins=1 | states=33, out=11, winOut=3, deadOut=8, dist=4 | branching_win_dag, forced=0/4 | none |

## 细节

### 起点 [0,7]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up right right up up up left left up right down down right down down left up up right right right down left up up up up left left left left
- 返回解事件: walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk push_ice ice_stop_short:d1 walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=301035
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=301035

可达事件扫描：

- Status: complete
- 可达状态: 214594
- 合法转移: 635617
- 仅事件非法转移: 23668
- Forbidden reachable hits: none
- 事件计数: walk=604818, push_ice=30799, ice_blocks_ice_no_chain_push=5424, ice_stop_short:d2=6478, push_ice_failed=23668, ice_stop_short:d1=12048, ice_rebound_d4=3232, ice_pass_through_d5:len1=2597, slide_restart_after_group=523, ice_destroyed_d3=3595, ice_boundary_disappear:d2=1234, ice_boundary_disappear:d4=457, ice_boundary_disappear_after_group=2074, ice_boundary_disappear:d1=754, ice_boundary_disappear:d3=511, ice_boundary_disappear:d5=416
