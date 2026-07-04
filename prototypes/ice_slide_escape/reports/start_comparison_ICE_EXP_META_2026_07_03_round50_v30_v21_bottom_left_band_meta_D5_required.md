# 冰原起点比较：ICE_EXP_META_2026_07_03_round50_v30_v21_bottom_left_band_meta_D5_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [5,10]
- Required winning-path events: ice_destroy_group_d6_plus, ice_destroyed_d3, ice_stop_short
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [22,4] | fail | no | n/a | no | none | none | complete, states=11349, wins=0 | states=1, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [22,4]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: ice_stop_short:d1, push_ice
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=11349
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=11349

可达事件扫描：

- Status: complete
- 可达状态: 11349
- 合法转移: 25292
- 仅事件非法转移: 1372
- Forbidden reachable hits: none
- 事件计数: push_ice=924, ice_stop_short:d1=312, walk=24368, push_ice_failed=1372, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=414, ice_destroyed_d3=125, ice_stop_short:d2=159, ice_boundary_disappear:d5=80, ice_boundary_disappear:d1=154, ice_pass_through_d5:len12=13, ice_boundary_disappear_after_group=13, ice_boundary_disappear:d9=27, ice_boundary_disappear:d3=16, ice_boundary_disappear:d4=16, ice_boundary_disappear:d13=9, ice_rebound_d4=5, ice_boundary_disappear:d2=8
