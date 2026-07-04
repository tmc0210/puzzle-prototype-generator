# 冰原起点比较：ICE_EXP_META_2026_07_03_round50_v25_x5_climb_block_meta_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [22,5]
- Required winning-path events: ice_destroy_group_d6_plus, ice_destroyed_d3, ice_stop_short, ice_rebound_d4
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [10,10] | fail | no | n/a | no | none | none | complete, states=1913, wins=0 | states=19, out=4, winOut=0, deadOut=4, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [10,10]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=1988
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=1988

可达事件扫描：

- Status: complete
- 可达状态: 1913
- 合法转移: 4317
- 仅事件非法转移: 362
- Forbidden reachable hits: none
- 事件计数: walk=4158, push_ice_failed=362, push_ice=159, ice_blocks_ice_no_chain_push=97, ice_stop_short:d1=57, ice_destroyed_d3=24, ice_pass_through_d5:len4=13, ice_boundary_disappear_after_group=13, ice_stop_short:d2=18, ice_rebound_d4=11, ice_boundary_disappear:d5=12, ice_destroy_group_d6_plus:len2=6, slide_restart_after_group=6, ice_boundary_disappear:d8=6, ice_boundary_disappear:d9=12, ice_boundary_disappear:d2=4, ice_boundary_disappear:d13=2
