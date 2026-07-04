# 冰原起点比较：ICE_EXP_META_2026_07_02_round41_mutual_anchor_pre_d6_probe_v1_meta_required_d6

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,3]
- Required winning-path events: ice_rebound_d4, ice_destroy_group_d6_plus
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [15,0] | fail | no | n/a | no | none | none | complete, states=5314, wins=0 | states=6, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [15,0]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=5314
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=5314

可达事件扫描：

- Status: complete
- 可达状态: 5314
- 合法转移: 13345
- 仅事件非法转移: 775
- Forbidden reachable hits: none
- 事件计数: walk=12914, push_ice=431, ice_blocks_ice_no_chain_push=363, ice_rebound_d4=72, ice_stop_short:d1=173, push_ice_failed=775, ice_boundary_disappear:d6=40, ice_boundary_disappear:d8=17, ice_destroy_group_d6_plus:len4=22, ice_boundary_disappear_after_group=34, ice_boundary_disappear:d11=14, ice_destroy_group_d6_plus:len5=12, ice_pass_through_d5:len2=16, slide_restart_after_group=29, ice_stop_short:d2=21, ice_boundary_disappear:d9=16, ice_boundary_disappear:d2=24, ice_destroy_group_d6_plus:len2=4, ice_destroy_group_d6_plus:len3=5, ice_boundary_disappear:d13=4, ice_destroyed_d3=8, ice_boundary_disappear:d3=6, ice_destroy_group_d6_plus:len1=4, ice_boundary_disappear:d10=1, ice_boundary_disappear:d14=1
