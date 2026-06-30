# 冰原起点比较：ICE_CAND_0012_meta_split_top_pocket_base

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [14,1]
- Required events: ice_rebound_d4, ice_pass_through_d5, slide_restart_after_group, ice_destroy_group_d6_plus
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,7] | fail | no | n/a | no | none | none | complete, states=959, wins=0 | states=1, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [0,7]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: ice_rebound_d4, push_ice
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1075
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1075

可达事件扫描：

- Status: complete
- 可达状态: 959
- 合法转移: 2269
- 仅事件非法转移: 20
- Report hits: none
- 事件计数: push_ice=53, ice_rebound_d4=1, walk=2216, ice_stop_short:d1=14, push_ice_failed=20, ice_stop_short:d2=6, ice_blocks_ice_no_chain_push=5, ice_pass_through_d5:len1=5, slide_restart_after_group=5, ice_boundary_disappear:d1=17, ice_destroyed_d3=8, ice_boundary_disappear:d7=3, ice_destroy_group_d6_plus:len1=4, ice_boundary_disappear_after_group=4
