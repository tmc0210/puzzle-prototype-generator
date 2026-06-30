# 冰原起点比较：ICE_CAND_0012_meta_E_first_right_entry_meta

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,7]
- Required events: ice_destroy_group_d6_plus, ice_rebound_d4, ice_pass_through_d5, slide_restart_after_group
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [14,9] | fail | no | n/a | no | none | none | complete, states=7223, wins=0 | states=16, out=2, winOut=0, deadOut=2, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [14,9]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=9977
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=9977

可达事件扫描：

- Status: complete
- 可达状态: 7223
- 合法转移: 18817
- 仅事件非法转移: 152
- Report hits: none
- 事件计数: walk=18456, push_ice=361, ice_destroy_group_d6_plus:len4=2, ice_boundary_disappear_after_group=70, ice_boundary_disappear:d2=30, ice_stop_short:d1=73, ice_blocks_ice_no_chain_push=59, push_ice_failed=152, ice_stop_short:d2=41, ice_rebound_d4=15, ice_boundary_disappear:d1=34, ice_destroyed_d3=30, ice_destroy_group_d6_plus:len1=66, ice_boundary_disappear:d12=15, ice_pass_through_d5:len1=4, slide_restart_after_group=4, ice_boundary_disappear:d9=18, ice_destroy_group_d6_plus:len2=2, ice_boundary_disappear:d7=16, ice_boundary_disappear:d3=6, ice_boundary_disappear:d8=6, ice_boundary_disappear:d5=7
