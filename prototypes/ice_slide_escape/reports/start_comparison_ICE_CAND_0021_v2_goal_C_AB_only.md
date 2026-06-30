# 冰原起点比较：ICE_CAND_0021_v2_goal_C_AB_only

## 摘要

- Prototype: ice_slide_escape
- 玩家终点: [14,6]
- Required events: none
- Forbidden events: none
- Report-only events: none
- 已检查起点: 2

## 起点表

| 起点 | 机器闸门 | 可解 | Cost | Required 覆盖 | 返回解 forbidden | 可达 report hits | Graph | Initial SCC | Solution SCC | 原因 |
| --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| [0,2] | fail | no | n/a | yes | none | none | complete, states=16, wins=0 | states=7, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |
| [0,6] | fail | no | n/a | yes | none | none | complete, states=16, wins=0 | states=7, out=1, winOut=0, deadOut=1, dist=n/a | no_win_path, forced=0/0 | 该显式起终点不可解 |

## 细节

### 起点 [0,2]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未检查
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 16
- 合法转移: 29
- 仅事件非法转移: 1
- Report hits: none
- 事件计数: walk=28, push_ice=1, ice_blocks_ice_no_chain_push=2, ice_stop_short:d2=1, push_ice_failed=1

### 起点 [0,6]

- 合法起点: true
- 机器闸门: fail
- 闸门原因: 该显式起终点不可解
- 第一步合法事件: walk
- Inputs: none
- 返回解事件: none

胜利路径探针：

- 缺少 required events 的胜利路径: 未检查
- 触发 forbidden events 的胜利路径: 未检查
- 缺少 required 或触发 forbidden 的胜利路径: 未检查

可达事件扫描：

- Status: complete
- 可达状态: 16
- 合法转移: 29
- 仅事件非法转移: 1
- Report hits: none
- 事件计数: walk=28, push_ice=1, ice_blocks_ice_no_chain_push=2, ice_stop_short:d2=1, push_ice_failed=1
