# 冰原起点比较：scratch_round45_internal_debt_rewrite_v5_C_to_B_probe

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,10]
- Required winning-path events: none
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [8,0] | pass | yes | 16 | yes | none | none | complete, states=2307, wins=3 | states=9, out=3, winOut=2, deadOut=1, dist=2 | branching_win_dag, forced=0/2 | none |

## 细节

### 起点 [8,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: down down down down down right down down right down down left up down right down
- 返回解事件: walk walk walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未检查
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 2307
- 合法转移: 5879
- 仅事件非法转移: 101
- Forbidden reachable hits: none
- 事件计数: walk=5760, push_ice=119, ice_destroyed_d3=15, ice_blocks_ice_no_chain_push=36, ice_stop_short:d2=14, ice_boundary_disappear:d5=22, push_ice_failed=101, ice_stop_short:d1=37, ice_rebound_d4=24, ice_boundary_disappear:d9=5, ice_boundary_disappear:d1=2
