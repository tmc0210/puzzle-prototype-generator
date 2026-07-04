# 冰原起点比较：worker_round54_vertical_v2_meta_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,10]
- Required winning-path events: ice_destroy_group_d6_plus, slide_restart_after_group
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [7,0] | pass | yes | 19 | yes | none | none | complete, states=200, wins=1 | states=1, out=1, winOut=1, deadOut=0, dist=2 | one_win_continuation_per_scc, forced=2/2 | none |

## 细节

### 起点 [7,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_destroy_group_d6_plus:len1, ice_stop_short:d2, push_ice, slide_restart_after_group
- Inputs: down down down down down down down down down right down left left left left left left left left
- 返回解事件: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=199
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=199

可达事件扫描：

- Status: complete
- 可达状态: 200
- 合法转移: 506
- 仅事件非法转移: 13
- Forbidden reachable hits: none
- 事件计数: push_ice=8, ice_destroy_group_d6_plus:len1=3, slide_restart_after_group=1, ice_stop_short:d2=3, walk=498, push_ice_failed=13, ice_stop_short:d1=3, ice_boundary_disappear_after_group=2
