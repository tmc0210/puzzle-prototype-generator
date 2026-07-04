# 冰原起点比较：worker_round53_v2_meta_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,1]
- Required winning-path events: ice_destroy_group_d6_plus, slide_restart_after_group
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [9,1] | pass | yes | 9 | yes | none | none | complete, states=351, wins=4 | states=1, out=1, winOut=1, deadOut=0, dist=1 | one_win_continuation_per_scc, forced=1/1 | none |

## 细节

### 起点 [9,1]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_boundary_disappear:d1, ice_destroy_group_d6_plus:len1, push_ice, slide_restart_after_group
- Inputs: left left left left left left left left left
- 返回解事件: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_boundary_disappear:d1 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=347
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=347

可达事件扫描：

- Status: complete
- 可达状态: 351
- 合法转移: 1017
- 仅事件非法转移: 12
- Forbidden reachable hits: none
- 事件计数: push_ice=15, ice_destroy_group_d6_plus:len1=1, slide_restart_after_group=1, ice_boundary_disappear:d1=1, walk=1002, ice_boundary_disappear:d4=4, push_ice_failed=12, ice_stop_short:d2=3, ice_destroyed_d3=5, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=2
