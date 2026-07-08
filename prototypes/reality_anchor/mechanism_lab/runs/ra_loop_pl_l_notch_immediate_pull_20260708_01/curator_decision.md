# Curator Decision: ra_loop_pl_l_notch_immediate_pull_20260708_01

## 建议裁决

`promote`

建议作为新的顶层结构族进入正式 lexicon，名称：

```text
P/L L形缺角活塞：一推即侧拉
```

本文件只记录建议；尚未修改 `lexicon.md`、`lexicon_index.md` 或 `backlog.md`。

## 裁决理由

- 结构足够紧凑：两步即可完成横向 stroke 到正交 pull，无需绕路。
- 输入接口明确：玩家站在 L 形 2x2 缺角中，缺角贴 P/L 边界。
- 输出接口明确：上 / 下正交拉、短回返、前格门、目标格门、扫带邻物。
- 最小 consumer 已证明：横条错例、玩家前格墙、L 形目标墙、B/S anchor 扫带覆盖目标。
- 它不是现有 `P/L 边界交接` 的普通补谱，因为缺角站位使第一手 push 同时制造第二手正交 pull 把手。
- 它不是普通 `刚体黏块 + 墙口`，因为关键是 P/L 跨侧后的动作语义和缺角站位结合。

## 与上一轮关系

上一轮 `ra_loop_pl_l_shape_lateral_handle_20260708_01` 证明了较宽松的“横向 stroke 后绕到正交把手”。本轮更符合用户原题，证据更紧，建议用本轮作为正式主条目。上一轮可作为宽松变体 / provenance，不建议单独 promote。

## 结论范围校准

已支撑：

- 左下、左上、右下、右上四个 2x2 L 形缺角。
- 横向 stroke 后立即 `up` / `down` 正交 pull。
- 横条无缺角错例。
- 玩家前格墙与 L 形目标墙区分。
- B/S anchor 作为可移动邻物被扫带并覆盖目标。

未支撑：

- 竖向 P/L stroke。
- 更大 L 形、T 形、2x2 方块、三格条。
- 扫带 crate、P/L anchor、sticky blocker。
- 复杂关卡级目标链。

不应入库：

- 普通开放房间 L 形侧拉。
- 横条正交 walk。
- B/S anchor 边界刷作为本轮主标题。

## 正式入口建议改动

待用户确认后再做：

- `lexicon.md`：
  - 在组合矩阵新增：`P/L L形缺角活塞` -> `正交墙门；扫带邻物；短回返；目标覆盖`。
  - 新增顶层条目 `P/L L形缺角活塞：一推即侧拉`，以 `proposed_families.md` 为正文基础。
- `lexicon_index.md`：
  - 新增同名索引条目。
- `backlog.md`：
  - 不新增普通组合。
  - 只有若继续探索 blocker 类型，才新增真正新方向：`P/L L形缺角活塞扫带不同 blocker 类型`。
