# 冰原起点比较：ICE_CAND_0007_meta_top_to_bottom

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,10]
- Required events: ice_rebound_d4, ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_blocks_ice_no_chain_push
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [11,0] | fail | no | n/a | no | none | none | complete, states=1671, wins=0 | states=1, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [11,0]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: ice_stop_short:d1, push_ice
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=1845
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=1845

可达事件扫描：

- Status: complete
- 可达状态: 1671
- 合法转移: 3602
- 仅事件非法转移: 56
- Report hits: none
- 事件计数: push_ice=56, ice_stop_short:d1=24, walk=3546, push_ice_failed=56, ice_destroyed_d3=6, ice_boundary_disappear:d1=9, ice_pass_through_d5:len1=9, slide_restart_after_group=19, ice_stop_short:d2=9, ice_destroy_group_d6_plus:len2=6, ice_blocks_ice_no_chain_push=9, ice_pass_through_d5:len2=4, ice_boundary_disappear_after_group=3, ice_destroy_group_d6_plus:len3=3, ice_rebound_d4=3, ice_boundary_disappear:d13=2
