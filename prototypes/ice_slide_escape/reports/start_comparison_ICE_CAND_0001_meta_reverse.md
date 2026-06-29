# 冰原起点比较：ICE_CAND_0001_meta_reverse

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [1,0]
- Required events: ice_rebound_d4
- Forbidden events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_boundary_disappear, ice_boundary_disappear_after_group
- Report-only events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_boundary_disappear, ice_boundary_disappear_after_group
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [7,0] | fail | no | n/a | no | none | none | complete, states=126, wins=0 | states=11, out=3, winOut=0, deadOut=3, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [7,0]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=126
- 触发 forbidden events 的胜利路径: 未找到；完整搜索，explored=126
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=126

可达事件扫描：

- Status: complete
- 可达状态: 126
- 合法转移: 258
- 仅事件非法转移: 8
- Report hits: none
- 事件计数: walk=248, push_ice=10, ice_rebound_d4=2, ice_stop_short:d1=6, push_ice_failed=8, ice_stop_short:d2=2
