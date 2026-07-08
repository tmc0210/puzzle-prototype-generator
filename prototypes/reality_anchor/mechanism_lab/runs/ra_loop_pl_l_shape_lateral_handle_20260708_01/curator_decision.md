# Curator Decision: ra_loop_pl_l_shape_lateral_handle_20260708_01

## 建议裁决

`promote`

建议作为新的顶层结构族进入正式 lexicon，名称：

```text
P/L L形活塞正交把手：朝向、侧拉与扫带
```

本文件只记录建议；尚未修改 `lexicon.md`、`lexicon_index.md` 或 `backlog.md`。

## 裁决理由

- 本轮有清晰输入接口：P/L 横向 stroke、L 形 sticky 朝向、stroke 后可绕到正交把手。
- 本轮有清晰输出接口：正交 pull 把手、行程墙 / 侧拉目标墙分类、侧向扫带邻物。
- 本轮有最小 consumer：同一墙位消费不同阶段，初始把手封墙消费把手生成，B/S anchor 消费侧向目标格并被扫带覆盖目标。
- 这不是 `P/L 边界交接` 的普通变体，因为横向 stroke 制造了新正交把手和新消费关系。
- 这也不是单纯 `刚体黏块 + 墙口`，因为关键差异来自 P/L stroke 改变把手可达性和动作阶段。

## 结论范围校准

已支撑：

- 横向 P/L stroke，第一手 `right`。
- 四个 L 形朝向：下凸左脚、下凸右脚、上凸左脚、上凸右脚。
- 同一墙位在朝向变化后变成第一手行程墙或侧向目标墙。
- 初始侧向把手封住时，横向 stroke 可把把手移到开放列。
- 侧向目标格换成 B/S anchor 时，可被扫带并覆盖目标。

未支撑：

- 竖向 P/L stroke。
- 反向 stroke 或反向 P/L 摆放。
- 2x2、三格条、T 形或其他刚体形状。
- 侧向扫带 crate、P/L anchor 或 sticky blocker。

不应入库：

- 单独“L 形可被侧拉”的规则事实。
- B/S anchor 移动作为本轮标题。
- `returnToInitial.status=exhausted` 作为不可回返证据。

## 正式入口建议改动

待用户确认后再做：

- `lexicon.md`：
  - 在组合矩阵新增输出：`P/L stroke 生成的 L 形正交把手`，可自然接入 `侧向墙齿；B/S anchor 扫带；回返门；移动边界刷子`。
  - 新增顶层条目 `P/L L形活塞正交把手：朝向、侧拉与扫带`，使用 `proposed_families.md` 的接口卡片、结构谱、对照关系、误用边界和证据。
- `lexicon_index.md`：
  - 新增同名索引条目，说明输入接口、输出接口和主要接法。
- `backlog.md`：
  - 不新增普通组合债。
  - 只有若用户要继续探索，可新增真正新设计空间，例如 `P/L L形正交把手扫带不同 blocker 类型`，其输入接口是侧向目标格从墙换成 crate / P/L anchor / sticky blocker，最小 consumer 是扫带、合并或封闭差异。
