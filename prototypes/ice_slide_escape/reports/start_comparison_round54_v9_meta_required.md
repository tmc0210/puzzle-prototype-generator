# 冰原起点比较：round54_v9_meta_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [18,10]
- Required winning-path events: ice_destroy_group_d6_plus, slide_restart_after_group, ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [11,0] | fail | no | n/a | no | none | none | complete, states=1178, wins=0 | states=1, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [11,0]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: ice_destroy_group_d6_plus:len1, ice_stop_short:d2, push_ice, slide_restart_after_group
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=1178
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=1178

可达事件扫描：

- Status: complete
- 可达状态: 1178
- 合法转移: 2588
- 仅事件非法转移: 59
- Forbidden reachable hits: none
- 事件计数: push_ice=56, ice_destroy_group_d6_plus:len1=15, slide_restart_after_group=1, ice_stop_short:d2=7, walk=2532, ice_blocks_ice_no_chain_push=9, ice_rebound_d4=1, push_ice_failed=59, ice_stop_short:d1=26, ice_boundary_disappear:d6=4, ice_boundary_disappear_after_group=18, ice_pass_through_d5:len7=4
