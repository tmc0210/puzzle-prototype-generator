# 冰原起点比较：ICE_CAND_0005_meta_top_to_bottom_left

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,11]
- Required events: ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [9,0] | fail | no | n/a | no | none | none | complete, states=2, wins=0 | states=2, out=0, winOut=0, deadOut=0, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [9,0]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=2
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=2

可达事件扫描：

- Status: complete
- 可达状态: 2
- 合法转移: 2
- 仅事件非法转移: 0
- Report hits: none
- 事件计数: walk=2
