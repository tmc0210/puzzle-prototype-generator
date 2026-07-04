# 冰原起点比较：ICE_EXP_META_2026_07_02_round40_orthogonal_airlock_v1_meta_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [13,2]
- Required winning-path events: ice_boundary_disappear, ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [13,4] | pass | yes | 16 | yes | none | none | complete, states=481, wins=4 | states=6, out=2, winOut=2, deadOut=0, dist=2 | branching_win_dag, forced=0/2 | none |

## 细节

### 起点 [13,4]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down left left left left up up right up up left down right right right right
- 返回解事件: walk walk walk walk push_ice ice_boundary_disappear:d9 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=477
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=477

可达事件扫描：

- Status: complete
- 可达状态: 481
- 合法转移: 1077
- 仅事件非法转移: 63
- Forbidden reachable hits: none
- 事件计数: walk=1040, ice_blocks_ice_no_chain_push=6, push_ice_failed=63, push_ice=37, ice_stop_short:d2=5, ice_boundary_disappear:d9=3, ice_stop_short:d1=13, ice_rebound_d4=4, ice_boundary_disappear:d1=7, ice_boundary_disappear:d12=3, ice_boundary_disappear:d3=1, ice_boundary_disappear:d10=1
