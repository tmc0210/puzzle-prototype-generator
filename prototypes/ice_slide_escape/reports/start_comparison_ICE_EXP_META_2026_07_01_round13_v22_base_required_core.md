# 冰原起点比较：ICE_EXP_META_2026_07_01_round13_v22_base_required_core

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,1]
- Required events: ice_pass_through_d5, ice_rebound_d4
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,7] | pass | yes | 42 | yes | none | none | complete, states=262265, wins=1 | states=31, out=12, winOut=2, deadOut=10, dist=4 | branching_win_dag, forced=0/4 | none |

## 细节

### 起点 [0,7]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up right right up up up up up right right right down up left left left left left down right down down right down down left up up right right right down left up up up up left left left left
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=377390
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=377390

可达事件扫描：

- Status: complete
- 可达状态: 262265
- 合法转移: 773111
- 仅事件非法转移: 28324
- Report hits: none
- 事件计数: walk=733974, push_ice=39137, ice_blocks_ice_no_chain_push=7640, ice_stop_short:d2=9222, push_ice_failed=28324, ice_stop_short:d1=15264, ice_rebound_d4=4264, ice_destroyed_d3=3312, ice_boundary_disappear:d2=1604, ice_boundary_disappear:d4=488, ice_pass_through_d5:len1=2989, ice_boundary_disappear_after_group=2761, ice_boundary_disappear:d1=1009, ice_boundary_disappear:d3=821, ice_boundary_disappear:d5=392, slide_restart_after_group=228
