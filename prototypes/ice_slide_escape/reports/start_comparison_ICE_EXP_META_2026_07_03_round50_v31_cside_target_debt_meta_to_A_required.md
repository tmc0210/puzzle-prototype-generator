# 冰原起点比较：ICE_EXP_META_2026_07_03_round50_v31_cside_target_debt_meta_to_A_required

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,5]
- Required winning-path events: ice_destroy_group_d6_plus, ice_destroyed_d3, ice_stop_short:d2
- Forbidden winning-path events: none
- Forbidden reachable events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required winning 覆盖 | 返回解 forbidden winning | 可达 forbidden hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [22,4] | fail | no | n/a | no | none | none | complete, states=7250, wins=0 | states=11, out=3, winOut=0, deadOut=3, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [22,4]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required winning events 的胜利路径: 未找到；完整搜索，explored=11623
- 触发 forbidden winning events 的胜利路径: 未检查
- 缺少 required winning 或触发 forbidden winning 的胜利路径: 未找到；完整搜索，explored=11623

可达事件扫描：

- Status: complete
- 可达状态: 7250
- 合法转移: 16824
- 仅事件非法转移: 944
- Forbidden reachable hits: none
- 事件计数: walk=16304, push_ice=520, ice_destroy_group_d6_plus:len2=3, slide_restart_after_group=29, ice_blocks_ice_no_chain_push=301, ice_destroyed_d3=63, push_ice_failed=944, ice_boundary_disappear:d3=47, ice_stop_short:d1=143, ice_stop_short:d2=127, ice_boundary_disappear:d4=46, ice_destroy_group_d6_plus:len1=26, ice_boundary_disappear:d5=48, ice_boundary_disappear:d9=20, ice_boundary_disappear:d13=6, ice_boundary_disappear:d21=20
