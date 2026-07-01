# 冰原起点比较：ICE_CAND_0025_v4_base_goal_B_required

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
| [0,5] | pass | yes | 13 | yes | none | none | complete, states=197, wins=2 | states=28, out=3, winOut=2, deadOut=1, dist=1 | branching_win_dag, forced=0/1 | none |

## 细节

### 起点 [0,5]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right right right right right up up up left left left left left
- 返回解事件: walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=195
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=195

可达事件扫描：

- Status: complete
- 可达状态: 197
- 合法转移: 581
- 仅事件非法转移: 6
- Report hits: none
- 事件计数: walk=574, push_ice=7, ice_stop_short:d1=2, push_ice_failed=6, ice_boundary_disappear:d5=2, ice_destroy_group_d6_plus:len1=3, ice_boundary_disappear_after_group=3
