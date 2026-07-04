# 冰原起点比较：scratch_round45_internal_debt_rewrite_v4_meta_D175_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [17,5]
- Required winning-path events: ice_destroy_group_d6_plus, ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [8,0] | fail | no | n/a | no | none | none | complete, states=2449, wins=0 | states=9, out=3, winOut=0, deadOut=3, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [8,0]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=2832
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=2832

可达事件扫描：

- Status: complete
- 可达状态: 2449
- 合法转移: 6421
- 仅事件非法转移: 99
- Forbidden reachable hits: none
- 事件计数: walk=6304, push_ice=117, ice_destroyed_d3=17, ice_blocks_ice_no_chain_push=36, ice_stop_short:d2=14, ice_boundary_disappear:d5=22, push_ice_failed=99, ice_stop_short:d1=35, ice_rebound_d4=22, ice_boundary_disappear:d9=5, ice_destroy_group_d6_plus:len5=2, ice_boundary_disappear_after_group=2
