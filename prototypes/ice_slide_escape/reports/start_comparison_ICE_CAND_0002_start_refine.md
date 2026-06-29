# 冰原起点比较：ICE_CAND_0002_start_refine

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [4,0]
- Required events: ice_rebound_d4
- Forbidden events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_boundary_disappear, ice_boundary_disappear_after_group
- Report-only events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_boundary_disappear, ice_boundary_disappear_after_group
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [1,9] | fail | yes | 16 | yes | none | ice_boundary_disappear_after_group, ice_pass_through_d5:len1, ice_pass_through_d5:len2 | complete, states=200, wins=1 | states=3, out=1, winOut=1, deadOut=0, dist=1 | single_win_chain, forced=1/1 | 可达图中出现 report-only events |
| [4,0] | fail | no | n/a | no | none | ice_boundary_disappear_after_group, ice_pass_through_d5:len2 | complete, states=107, wins=0 | states=17, out=3, winOut=0, deadOut=3, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解; 可达图中出现 report-only events |

## 细节

### 起点 [1,9]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 可达图中出现 report-only events
- 第一步合法事件: walk
- Inputs: up up right right right up up up up up up right down up left up
- 返回解事件: walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=199
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=199
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=199

可达事件扫描：

- Status: complete
- 可达状态: 200
- 合法转移: 477
- 仅事件非法转移: 21
- Report hits: ice_boundary_disappear_after_group, ice_pass_through_d5:len1, ice_pass_through_d5:len2
- 事件计数: walk=462, push_ice=15, ice_rebound_d4=4, ice_stop_short:d1=8, push_ice_failed=21, ice_blocks_ice_no_chain_push=4, ice_pass_through_d5:len2=1, ice_boundary_disappear_after_group=2, ice_pass_through_d5:len1=1, ice_stop_short:d2=1

### 起点 [4,0]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解; 可达图中出现 report-only events
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=107
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=107
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=107

可达事件扫描：

- Status: complete
- 可达状态: 107
- 合法转移: 269
- 仅事件非法转移: 9
- Report hits: ice_boundary_disappear_after_group, ice_pass_through_d5:len2
- 事件计数: walk=262, push_ice_failed=9, push_ice=7, ice_pass_through_d5:len2=2, ice_boundary_disappear_after_group=2, ice_stop_short:d1=5
