# worker_round54_lshape probe scan

```yaml
reviewer_called: false
critic_called: false
scope: fixed_l_shape_core_interface_and_isolation_scan
```

## 摘要表

| variant | base | base no-late | base d4 req | meta | meta d6/restart req | meta d4 req | L 消费 | pair risk |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| v1_bottom_D | yes/15 | no:ice_destroy_group_d6_plus:len1,ice_destroy_group_d6_plus:len3,ice_destroy_group_d6_plus:len4 | yes | yes/16 | yes | no | no:d6 后有 0 次后续推冰，换轴且含 d4/ice-block 的消费为 0 | A->D:cost17; B->D:cost4; C->B:cost16; D->B:cost4 |
| v1_left_D | yes/15 | no:ice_destroy_group_d6_plus:len1,ice_destroy_group_d6_plus:len3,ice_destroy_group_d6_plus:len4 | yes | no | no | no | no:返回解没有 d6/restart 步 | A->D:cost0; C->B:cost16; D->A:cost0; D->B:cost15 |
| v1_top_return_D | yes/15 | no:ice_destroy_group_d6_plus:len1,ice_destroy_group_d6_plus:len3,ice_destroy_group_d6_plus:len4 | yes | yes/21 | yes | no | no:d6 后有 0 次后续推冰，换轴且含 d4/ice-block 的消费为 0 | A->D:cost24; B->D:cost13; C->B:cost16; D->B:cost13 |
| v1_right_after_T2_D | yes/15 | no:ice_destroy_group_d6_plus:len1,ice_destroy_group_d6_plus:len3,ice_destroy_group_d6_plus:len4 | yes | yes/15 | yes | no | no:d6 后有 1 次后续推冰，换轴且含 d4/ice-block 的消费为 0 | A->D:cost22; B->D:cost11; C->B:cost16; D->B:cost11 |
| v1_lower_cut_D | yes/15 | no:ice_destroy_group_d6_plus:len1,ice_destroy_group_d6_plus:len3,ice_destroy_group_d6_plus:len4 | yes | no | no | no | no:返回解没有 d6/restart 步 | C->B:cost16 |

## 逐项读法

### v1_bottom_D

- 接口: A=[0,10], B=[7,12], C=[11,0], D=[9,12]
- 设计备注: 竖向 d6 产物落到 T2 右侧，但 D 在底边下支路，检查是否会被 d6 后 walk 直达。
- base events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk
- meta events: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- L 消费判断: d6 后有 0 次后续推冰，换轴且含 d4/ice-block 的消费为 0
- pair risk: A->D:cost17; B->D:cost4; C->B:cost16; D->B:cost4

### v1_left_D

- 接口: A=[0,10], B=[7,12], C=[11,0], D=[0,10]
- 设计备注: 同一 L 核，把 D 移到左边，检查是否能迫使 T2 回封后离开。
- base events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk
- meta events: none
- L 消费判断: 返回解没有 d6/restart 步
- pair risk: A->D:cost0; C->B:cost16; D->A:cost0; D->B:cost15

### v1_top_return_D

- 接口: A=[0,10], B=[7,12], C=[11,0], D=[8,0]
- 设计备注: 给 T1 回封后的右侧增加一条顶边出口，尝试让 D 位于回封后玩家侧。
- base events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk
- meta events: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- L 消费判断: d6 后有 0 次后续推冰，换轴且含 d4/ice-block 的消费为 0
- pair risk: A->D:cost24; B->D:cost13; C->B:cost16; D->B:cost13

### v1_right_after_T2_D

- 接口: A=[0,10], B=[7,12], C=[11,0], D=[14,10]
- 设计备注: 打开 T2 右侧边界，测试 D 是否能在 T2/产物动作后成为右侧出口。
- base events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk
- meta events: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk push_ice ice_boundary_disappear:d3 walk walk walk
- L 消费判断: d6 后有 1 次后续推冰，换轴且含 d4/ice-block 的消费为 0
- pair risk: A->D:cost22; B->D:cost11; C->B:cost16; D->B:cost11

### v1_lower_cut_D

- 接口: A=[0,10], B=[7,12], C=[11,0], D=[9,12]
- 设计备注: 切断下支路左侧连通，尝试使 D 只能通过 T2 空目标入口进入。
- base events: walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk
- meta events: none
- L 消费判断: 返回解没有 d6/restart 步
- pair risk: C->B:cost16
