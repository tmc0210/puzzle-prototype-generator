# 冰原起点比较：ICE_EXP_META_2026_07_01_round15_v30_base_required_core

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [0,1]
- Required events: ice_pass_through_d5, ice_rebound_d4
- Forbidden events: none
- Report-only events: none
- 已检查起点: 1

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,7] | pass | yes | 42 | yes | none | none | complete, states=334283, wins=1 | states=31, out=12, winOut=2, deadOut=10, dist=4 | branching_win_dag, forced=0/4 | none |

## 细节

### 起点 [0,7]

- 合法起点: true
- 机器闸门: pass
- 闸门原因: none
- 第一步合法事件: walk
- Inputs: right up right right up up up up up right right right down up left left left left left down right down down right down down left up down right right right up left up up up up left left left left
- 返回解事件: walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk

胜利路径探针：

- 缺少 required events 的胜利路径: 未找到；完整搜索，explored=473104
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未找到；完整搜索，explored=473104

可达事件扫描：

- Status: complete
- 可达状态: 334283
- 合法转移: 979110
- 仅事件非法转移: 34715
- Report hits: none
- 事件计数: walk=928276, push_ice=50834, ice_blocks_ice_no_chain_push=9549, ice_stop_short:d2=13605, push_ice_failed=34715, ice_stop_short:d1=17555, ice_rebound_d4=5032, ice_destroyed_d3=6185, ice_boundary_disappear:d2=1924, ice_boundary_disappear:d4=620, ice_pass_through_d5:len1=3593, ice_boundary_disappear_after_group=3318, ice_boundary_disappear:d1=1141, ice_boundary_disappear:d3=987, ice_boundary_disappear:d5=467, slide_restart_after_group=275
