# 机制局部实验: ra_loop_bind_mouth_composition_20260707_01

- 原型: reality_anchor
- 生成时间: 2026-07-07T06:22:20.461Z

## smoke_schema_probe: Smoke schema probe
动作序列: (无)
反事实禁用: 无
预算: exploreDepth=14, returnDepth=24, maxStates=20000, maxTransitions=80000

layout:
```text
#####
#@CG#
#####
```

初始状态:
```text
#####
#@CG#
#####
```

最终状态:
```text
#####
#@CG#
#####
```
变化格: 无

最终状态动作表:
| action | legal | events | next / reason |
| --- | --- | --- | --- |
| up | no | - | destination_blocked |
| down | no | - | destination_blocked |
| left | no | - | destination_blocked |
| right | yes | push_object:crate#1 | Ply:2,1\|C:3,1\|M:\|PL:none\|BS:none |

回到初始: yes, depth=0, path=
局部可达图: status=complete, states=2, transitions=1, winStates=1, maxDepth=1
事件类型: push_object:crate#1=1

