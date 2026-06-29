# 冰原起点比较：ICE_CAND_0007_meta_left_to_right

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [16,1]
- Required events: ice_rebound_d4, ice_pass_through_d5, ice_destroy_group_d6_plus, slide_restart_after_group, ice_blocks_ice_no_chain_push
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,10] | fail | no | n/a | no | none | none | complete, states=2888, wins=0 | states=50, out=6, winOut=0, deadOut=6, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [0,10]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=3184
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=3184

可达事件扫描：

- Status: complete
- 可达状态: 2888
- 合法转移: 6333
- 仅事件非法转移: 85
- Report hits: none
- 事件计数: walk=6230, push_ice=103, ice_destroy_group_d6_plus:len2=13, slide_restart_after_group=28, ice_pass_through_d5:len2=10, ice_boundary_disappear_after_group=12, ice_pass_through_d5:len1=16, ice_stop_short:d2=15, ice_rebound_d4=14, ice_boundary_disappear:d1=21, ice_stop_short:d1=35, push_ice_failed=85, ice_destroy_group_d6_plus:len1=1, ice_blocks_ice_no_chain_push=23, ice_destroyed_d3=3, ice_boundary_disappear:d2=1, ice_boundary_disappear:d12=2
