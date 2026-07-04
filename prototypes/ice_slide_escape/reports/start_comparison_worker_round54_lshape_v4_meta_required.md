# 冰原起点比较：worker_round54_lshape_v4_meta_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [19,11]
- Required winning-path events: ice_destroy_group_d6_plus, slide_restart_after_group, ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [11,0] | pass | yes | 23 | yes | none | none | complete, states=82, wins=1 | states=1, out=1, winOut=1, deadOut=0, dist=3 | one_win_continuation_per_scc, forced=3/3 | none |

## 细节

### 起点 [11,0]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: ice_destroy_group_d6_plus:len1, ice_stop_short:d2, push_ice, slide_restart_after_group
- Inputs: down down down down down down down down down right down right down right right right right up left down right right right
- 返回解事件: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=81
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=81

可达事件扫描：

- Status: complete
- 可达状态: 82
- 合法转移: 181
- 仅事件非法转移: 11
- Forbidden reachable hits: none
- 事件计数: push_ice=5, ice_destroy_group_d6_plus:len1=1, slide_restart_after_group=1, ice_stop_short:d2=1, walk=176, push_ice_failed=11, ice_rebound_d4=2, ice_stop_short:d1=2, ice_blocks_ice_no_chain_push=3
