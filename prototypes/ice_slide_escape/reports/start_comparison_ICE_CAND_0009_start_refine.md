# 冰原起点比较：ICE_CAND_0009_start_refine

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [14,3]
- Required events: ice_rebound_d4, ice_pass_through_d5, slide_restart_after_group, ice_destroyed_d3, ice_destroy_group_d6_plus, ice_stop_short
- Forbidden events: none
- Report-only events: none
- 已检查起点: 10

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [14,3] | fail | no | n/a | no | none | none | complete, states=3, wins=0 | states=3, out=0, winOut=0, deadOut=0, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [0,6] | pass | yes | 37 | yes | none | none | complete, states=984, wins=1 | states=15, out=4, winOut=3, deadOut=1, dist=4 | branching_win_dag, forced=0/4 | none |
| [4,14] | fail | no | n/a | no | none | none | complete, states=35, wins=0 | states=13, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [5,14] | fail | no | n/a | no | none | none | complete, states=35, wins=0 | states=13, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [6,14] | fail | no | n/a | no | none | none | complete, states=35, wins=0 | states=13, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [7,14] | fail | no | n/a | no | none | none | complete, states=35, wins=0 | states=13, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [8,14] | fail | no | n/a | no | none | none | complete, states=35, wins=0 | states=13, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [9,14] | fail | no | n/a | no | none | none | complete, states=35, wins=0 | states=13, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [10,14] | fail | no | n/a | no | none | none | complete, states=35, wins=0 | states=13, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [11,14] | fail | no | n/a | no | none | none | complete, states=35, wins=0 | states=13, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [14,3]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=3
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=3

可达事件扫描：

- Status: complete
- 可达状态: 3
- 合法转移: 4
- 仅事件非法转移: 0
- Report hits: none
- 事件计数: walk=4

### 起点 [0,6]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up up right right down down down down right down down down down down down right right right right right right right up up up up up up up up up up up right right right
- 返回解事件: walk push_ice ice_rebound_d4 walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_stop_short:d1 walk walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len4 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=983
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=983

可达事件扫描：

- Status: complete
- 可达状态: 984
- 合法转移: 2077
- 仅事件非法转移: 38
- Report hits: none
- 事件计数: walk=2028, push_ice=49, ice_rebound_d4=7, ice_stop_short:d1=23, ice_pass_through_d5:len2=8, slide_restart_after_group=16, push_ice_failed=38, ice_destroyed_d3=15, ice_destroy_group_d6_plus:len2=4, ice_destroy_group_d6_plus:len4=4, ice_pass_through_d5:len6=4, ice_boundary_disappear_after_group=4

### 起点 [4,14]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=35
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=35

可达事件扫描：

- Status: complete
- 可达状态: 35
- 合法转移: 67
- 仅事件非法转移: 3
- Report hits: none
- 事件计数: walk=66, push_ice_failed=3, push_ice=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_stop_short:d1=1

### 起点 [5,14]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=35
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=35

可达事件扫描：

- Status: complete
- 可达状态: 35
- 合法转移: 67
- 仅事件非法转移: 3
- Report hits: none
- 事件计数: walk=66, push_ice_failed=3, push_ice=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_stop_short:d1=1

### 起点 [6,14]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=35
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=35

可达事件扫描：

- Status: complete
- 可达状态: 35
- 合法转移: 67
- 仅事件非法转移: 3
- Report hits: none
- 事件计数: walk=66, push_ice=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_stop_short:d1=1, push_ice_failed=3

### 起点 [7,14]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=35
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=35

可达事件扫描：

- Status: complete
- 可达状态: 35
- 合法转移: 67
- 仅事件非法转移: 3
- Report hits: none
- 事件计数: walk=66, push_ice=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_stop_short:d1=1, push_ice_failed=3

### 起点 [8,14]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=35
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=35

可达事件扫描：

- Status: complete
- 可达状态: 35
- 合法转移: 67
- 仅事件非法转移: 3
- Report hits: none
- 事件计数: walk=66, push_ice=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_stop_short:d1=1, push_ice_failed=3

### 起点 [9,14]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=35
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=35

可达事件扫描：

- Status: complete
- 可达状态: 35
- 合法转移: 67
- 仅事件非法转移: 3
- Report hits: none
- 事件计数: walk=66, push_ice=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_stop_short:d1=1, push_ice_failed=3

### 起点 [10,14]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=35
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=35

可达事件扫描：

- Status: complete
- 可达状态: 35
- 合法转移: 67
- 仅事件非法转移: 3
- Report hits: none
- 事件计数: walk=66, push_ice=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_stop_short:d1=1, push_ice_failed=3

### 起点 [11,14]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: ice_destroy_group_d6_plus:len2, ice_stop_short:d1, push_ice, slide_restart_after_group, walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=35
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=35

可达事件扫描：

- Status: complete
- 可达状态: 35
- 合法转移: 67
- 仅事件非法转移: 3
- Report hits: none
- 事件计数: push_ice=1, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_stop_short:d1=1, walk=66, push_ice_failed=3
