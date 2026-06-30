# 冰原起点比较：ICE_CAND_0014_v7_required_probe

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [14,3]
- Required events: ice_pass_through_d5, ice_destroy_group_d6_plus, ice_rebound_d4, slide_restart_after_group, ice_blocks_ice_no_chain_push
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,9] | unknown | no | n/a | no | none | none | exhausted, states=200001, wins=0 | n/a | n/a | 该显式起终点不可解; 可达事件扫描未完成 |

## 细节

### 起点 [0,9]

- 合法起点: true
- 机器闸门: unknown
- 闸门原因: 该显式起终点不可解; 可达事件扫描未完成
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未知；status=exhausted, explored=200001, reason=state budget exceeded (200000)
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未知；status=exhausted, explored=200001, reason=state budget exceeded (200000)

可达事件扫描：

- Status: exhausted
- 可达状态: 200001
- 合法转移: 468300
- 仅事件非法转移: 12359
- Report hits: none
- 事件计数: walk=452122, push_ice=16178, ice_pass_through_d5:len1=1915, slide_restart_after_group=2606, ice_stop_short:d1=8362, ice_blocks_ice_no_chain_push=3418, push_ice_failed=12359, ice_destroyed_d3=1979, ice_destroy_group_d6_plus:len1=2817, ice_boundary_disappear_after_group=2682, ice_boundary_disappear:d2=697, ice_pass_through_d5:len3=36, ice_boundary_disappear:d3=101, ice_boundary_disappear:d8=48, ice_rebound_d4=1458, ice_boundary_disappear:d4=84, ice_boundary_disappear:d10=43, ice_boundary_disappear:d11=24, ice_stop_short:d2=673, ice_destroy_group_d6_plus:len2=478, ice_boundary_disappear:d7=27, ice_destroy_group_d6_plus:len3=41, ice_pass_through_d5:len2=1
- Reason: state budget exceeded (200000)
