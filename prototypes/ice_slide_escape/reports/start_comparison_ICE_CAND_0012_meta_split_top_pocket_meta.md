# 冰原起点比较：ICE_CAND_0012_meta_split_top_pocket_meta

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,7]
- Required events: ice_destroy_group_d6_plus, ice_rebound_d4, ice_pass_through_d5, slide_restart_after_group
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [6,0] | fail | no | n/a | no | none | none | complete, states=412, wins=0 | states=2, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [6,0]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=412
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=412

可达事件扫描：

- Status: complete
- 可达状态: 412
- 合法转移: 946
- 仅事件非法转移: 6
- Report hits: none
- 事件计数: walk=932, push_ice=14, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=2, ice_destroy_group_d6_plus:len3=1, ice_boundary_disappear:d1=8, ice_stop_short:d1=2, push_ice_failed=6, ice_stop_short:d2=2
