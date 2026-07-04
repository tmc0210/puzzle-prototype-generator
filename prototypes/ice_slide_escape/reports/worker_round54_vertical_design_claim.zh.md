# worker_round54_vertical 设计 claim

## 范围

- family: A
- 只探索“竖向 d6 产物内移”结构。
- archive lineage: fresh_required；旧 archive 只做口味校准和失败模式校准，不复用布局、接口、对象角色或主因果链。
- 本轮不调用 evidence reviewer / puzzle critic。
- 本轮只写 `prototypes/ice_slide_escape/reports/worker_round54_vertical_*` 文件。

## 硬目标

- A/B/C/D 全分离，且四点均为 edge cell。
- 所有目标初始均有冰。
- 优先 2 个目标、2-4 枚冰。
- base: A->B，完整可达图无 `ice_pass_through_d5`、`slide_restart_after_group`、`ice_destroy_group_d6_plus`；可用知识阶段为 d6 前或更早。
- meta: C->D，所有胜路必须使用 `ice_destroy_group_d6_plus` 与 `slide_restart_after_group`。
- meta 的 d6 产物不能只是开入口；它必须在后续成为被推对象、stopper/obstacle，或参与打开 D 门。
- 若找到候选，跑 base no-late、meta required、A/B 到 D 风险。

## 口味校准

- 正向参考只抽象借鉴：0033 的“小误导/回访继续做”、0034 的“meta 扰乱共享结构而非复刻 base”、0035 的“同一结构被地图语境重读”。不复用它们的接口关系或几何模板。
- 负向下界：0037 被人类判为审美 1，因为三个无洞见重复步骤拼接，并有 A->D 外溢。本轮必须避免“摧毁一个目标上的冰，再找最近冰补回去”的重复补位。

## 结构假设

玩家视角核心不是“找 spare ice 补目标”，而是：

1. base 中两个目标冰都像稳定结构的一部分；其中一块目标冰同时是门或反弹障碍。
2. meta 先通过竖向 d6/restart 把一块冰产物内移到共享中核。
3. 这个 d6 产物随后改变同一中核的几何：作为 stopper/obstacle 让某块目标冰能被回封，或被二次推动以打开 D。
4. 因此 meta 不是“d6 开入口后复做 base”，而是“d6 产物改写 base 中一个静态障碍/门的角色”。

## 反证条件

- 如果 d6 后的冰停住但不再参与任何后续推动、阻挡或 D 可达，就失败。
- 如果 A->D 可解，尤其比 A->B 更自然或更短，就失败。
- 如果 base 可达扫描命中 d5/restart/d6+，就失败。
- 如果目标债表现为三次或多次同构补位，或出现多个只用于补位的冰，就失败。
- 如果只能靠远离核心的小修墙隔开接口，而不能解释为结构的一部分，就记录为几何矛盾，不送审。
