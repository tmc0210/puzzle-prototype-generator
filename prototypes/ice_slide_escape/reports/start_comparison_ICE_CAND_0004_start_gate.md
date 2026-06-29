# 冰原起点比较：ICE_CAND_0004_start_gate

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [10,4]
- Required events: ice_rebound_d4
- Forbidden events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_boundary_disappear, ice_boundary_disappear_after_group
- Report-only events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_boundary_disappear, ice_boundary_disappear_after_group
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [10,4] | pass | yes | 24 | yes | none | none | complete, states=2254, wins=1 | states=20, out=5, winOut=2, deadOut=3, dist=2 | branching_win_dag, forced=0/2 | none |

## 细节

### 起点 [10,4]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: left left left down left left left up left up right up right right up left down down right down right right right right
- 返回解事件: walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=2253
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=2253
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=2253

可达事件扫描：

- Status: complete
- 可达状态: 2254
- 合法转移: 5914
- 仅事件非法转移: 256
- Report hits: none
- 事件计数: walk=5740, push_ice=174, ice_rebound_d4=42, ice_stop_short:d1=92, push_ice_failed=256, ice_stop_short:d2=30, ice_blocks_ice_no_chain_push=34, ice_destroyed_d3=10
