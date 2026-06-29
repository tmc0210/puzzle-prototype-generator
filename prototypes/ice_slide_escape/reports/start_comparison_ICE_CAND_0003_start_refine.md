# 冰原起点比较：ICE_CAND_0003_start_refine

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [4,8]
- Required events: ice_rebound_d4
- Forbidden events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_boundary_disappear, ice_boundary_disappear_after_group
- Report-only events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_boundary_disappear, ice_boundary_disappear_after_group
- 已检查起点: 4

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [1,8] | pass | yes | 35 | yes | none | none | complete, states=540, wins=1 | states=29, out=4, winOut=1, deadOut=3, dist=2 | single_win_chain, forced=2/2 | none |
| [2,8] | pass | yes | 36 | yes | none | none | complete, states=540, wins=1 | states=29, out=4, winOut=1, deadOut=3, dist=2 | single_win_chain, forced=2/2 | none |
| [3,8] | pass | yes | 37 | yes | none | none | complete, states=540, wins=1 | states=29, out=4, winOut=1, deadOut=3, dist=2 | single_win_chain, forced=2/2 | none |
| [4,8] | pass | yes | 38 | yes | none | none | complete, states=540, wins=1 | states=29, out=4, winOut=1, deadOut=3, dist=2 | single_win_chain, forced=2/2 | none |

## 细节

### 起点 [1,8]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up up up up up right right right right right right up up right down down left left left left left left left down down down down right right right right up down left down
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=539
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=539
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=539

可达事件扫描：

- Status: complete
- 可达状态: 540
- 合法转移: 1244
- 仅事件非法转移: 28
- Report hits: none
- 事件计数: walk=1216, push_ice=28, ice_rebound_d4=8, ice_stop_short:d1=16, push_ice_failed=28, ice_destroyed_d3=4

### 起点 [2,8]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up left up up up up right right right right right right up up right down down left left left left left left left down down down down right right right right up down left down
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=539
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=539
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=539

可达事件扫描：

- Status: complete
- 可达状态: 540
- 合法转移: 1244
- 仅事件非法转移: 28
- Report hits: none
- 事件计数: walk=1216, push_ice=28, ice_rebound_d4=8, ice_stop_short:d1=16, push_ice_failed=28, ice_destroyed_d3=4

### 起点 [3,8]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up left left up up up up right right right right right right up up right down down left left left left left left left down down down down right right right right up down left down
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=539
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=539
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=539

可达事件扫描：

- Status: complete
- 可达状态: 540
- 合法转移: 1244
- 仅事件非法转移: 28
- Report hits: none
- 事件计数: walk=1216, push_ice=28, ice_rebound_d4=8, ice_stop_short:d1=16, push_ice_failed=28, ice_destroyed_d3=4

### 起点 [4,8]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: up left left left up up up up right right right right right right up up right down down left left left left left left left down down down down right right right right up down left down
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=539
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=539
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=539

可达事件扫描：

- Status: complete
- 可达状态: 540
- 合法转移: 1244
- 仅事件非法转移: 28
- Report hits: none
- 事件计数: walk=1216, push_ice=28, ice_rebound_d4=8, ice_stop_short:d1=16, push_ice_failed=28, ice_destroyed_d3=4
