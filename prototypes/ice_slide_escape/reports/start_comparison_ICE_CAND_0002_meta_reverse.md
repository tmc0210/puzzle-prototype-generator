# 冰原起点比较：ICE_CAND_0002_meta_reverse

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [1,9]
- Required events: ice_rebound_d4
- Forbidden events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_boundary_disappear, ice_boundary_disappear_after_group
- Report-only events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_boundary_disappear, ice_boundary_disappear_after_group
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [4,0] | fail | no | n/a | no | none | ice_boundary_disappear_after_group, ice_pass_through_d5:len2 | complete, states=107, wins=0 | states=17, out=3, winOut=0, deadOut=3, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解; 可达图中出现 report-only events |

## 细节

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
