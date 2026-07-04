# 冰原起点比较：ICE_EXP_META_2026_07_03_round48_shifted_left_target_debt_v15_probe_meta_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [22,5]
- Required winning-path events: ice_destroy_group_d6_plus, ice_destroyed_d3, ice_stop_short
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [10,10] | fail | no | n/a | no | none | none | complete, states=21759, wins=0 | states=20, out=7, winOut=0, deadOut=7, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [10,10]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=22140
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=22140

可达事件扫描：

- Status: complete
- 可达状态: 21759
- 合法转移: 52478
- 仅事件非法转移: 4004
- Forbidden reachable hits: none
- 事件计数: walk=50470, push_ice=2008, ice_stop_short:d1=765, ice_blocks_ice_no_chain_push=1899, push_ice_failed=4004, ice_destroyed_d3=180, ice_stop_short:d2=599, ice_rebound_d4=91, ice_boundary_disappear:d4=84, ice_boundary_disappear:d2=90, ice_destroy_group_d6_plus:len2=52, slide_restart_after_group=52, ice_boundary_disappear:d9=52, ice_boundary_disappear:d8=35, ice_pass_through_d5:len12=34, ice_boundary_disappear_after_group=39, ice_boundary_disappear:d5=66, ice_boundary_disappear:d14=7, ice_pass_through_d5:len4=5
