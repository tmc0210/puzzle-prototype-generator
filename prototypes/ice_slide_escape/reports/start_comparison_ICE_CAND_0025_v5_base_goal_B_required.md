# 冰原起点比较：ICE_CAND_0025_v5_base_goal_B_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,2]
- Required events: ice_stop_short:d1
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,5] | pass | yes | 13 | yes | none | none | complete, states=37, wins=1 | states=18, out=1, winOut=1, deadOut=0, dist=1 | one_win_continuation_per_scc, forced=1/1 | none |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right left up up up left left left left
- 返回解事件: walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=36
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=36

可达事件扫描：

- Status: complete
- 可达状态: 37
- 合法转移: 107
- 仅事件非法转移: 1
- Report hits: none
- 事件计数: walk=106, push_ice=1, ice_stop_short:d1=1, push_ice_failed=1
