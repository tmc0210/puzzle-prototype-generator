# Explorer Notes: pl_anchor_boundary_rewrite_second_action

## 运行范围

- 读取范围：本 topic `brief.md`、本轮 `round_manifest.md`、Reality Anchor `mechanic.yml` / `mechanics.ts` / `runtime.ts`、机制实验 protocol / local-run-format、当前 `lexicon_index.md`。
- 未读取：design archive、候选关卡、人类评价、sampler profile、其他 topic 的中间结果。
- 运行命令：

```text
npx tsx src/cli.ts mechanism-lab-run prototypes/reality_anchor prototypes/reality_anchor/mechanism_lab/runs/ra_loop_pl_anchor_wall_mobility_20260708_01/topics/pl_anchor_boundary_rewrite_second_action/cases.yml --run-id ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_boundary_rewrite_second_action --out-dir prototypes/reality_anchor/mechanism_lab/runs/ra_loop_pl_anchor_wall_mobility_20260708_01/topics/pl_anchor_boundary_rewrite_second_action --write
```

- runner 成功生成 `cases.json`、`results.json`、`report.md`。5 个 case 的局部可达图均为 `complete`。

## Case 摘要

| case | 首段 anchor 移动 | 第二动作 | 关键结果 |
| --- | --- | --- | --- |
| `push_two_shift_old_l_push_crate_goal` | P 侧 `right,right`，两次 `anchor_boundary_shift:push_pull` | 旧 L 半格站位 `down` | `push_object:crate#1`，箱子进入目标 |
| `push_second_shift_wall_blocks_rewrite` | 第一次合法，第二次被 L 端墙 `force_blocked` | 未执行 | 旧 L 半格不释放；只能作为门控反例 |
| `pull_two_shift_old_l_push_crate_goal` | L 侧 `right,right`，两次 `anchor_boundary_shift:push_pull` | 绕到旧 L 半格后 `down` | `push_object:crate#1`，箱子进入目标 |
| `pull_second_shift_front_wall_blocks_rewrite` | 第一次合法，第二次被玩家前格墙 `destination_blocked` | 未执行 | pull driver 的前格墙阻止重写链完成 |
| `push_one_shift_only_walks_not_consume` | 只 push 一次 | `down` | 只是 `walk`，没有消费旧 L 半格 |

## 观察

- 两个正例都不是“锚点能移动”的规则复述：关键观察点在锚点移动两格后，旧 L 半格从 anchor footprint 中释放，同时被新 P/L 边界归入 push side；随后的 `down` 才能 push crate 入目标。
- push driver 和 pull driver 都能构造同一输出：旧 L 半格释放为新 push 站位。pull driver 额外需要绕行通路回到旧 L 半格。
- `push_second_shift_wall_blocks_rewrite` 的墙消费的是 anchor L 端第二停位，报 `force_blocked`；`pull_second_shift_front_wall_blocks_rewrite` 的墙消费的是 pull 玩家前格，报 `destination_blocked`。两者都阻止第二次 anchor shift，因此不产生旧 L 站位。
- `push_one_shift_only_walks_not_consume` 修正了过宽解释：一次 anchor shift 也会发出 `anchor_boundary_shift:push_pull`，但玩家尚未站到旧 L 半格，第二动作只是 walk 或错位 push，不是本 family 的输出。
- 正例的 `returnToInitial.status=exhausted` 只写未知，不写不可回返；本 family 的证据来自动作链、目标消费和完整局部图，不依赖回返 no。

## 机制角色

- `active_rule`: P/L anchor 本体移动造成 `forceModeAt` 边界重写；第二动作在新 push side 中触发 `push_force`。
- `material_source`: 单个 crate 和目标格只作为第二动作 consumer 的材料。
- `consumer`: 墙消费第二次 anchor shift；目标格消费旧 L push 站位产生的 crate push 输出；绕行通路消费 pull driver 的可达性。
- `incidental`: 目标覆盖胜利、可达图中其他 anchor / crate 推拉旁支不是关键观察点。

## 结论范围校准

- 已支撑：水平 P/L anchor 沿长轴移动两格后，旧 L 半格可以从 occupied anchor cell 变成新的 push 侧操作站位；push driver 和 pull driver 都可构造该输出。
- 已支撑：墙位可以分别关闭 push driver 的 anchor 目标格和 pull driver 的玩家前格，从而阻止边界重写链。
- 未扩张：本组没有证明所有旧 anchor 半格都会成为有用站位；目前只证明旧 L 半格 + 下方 crate/target consumer。
- 未扩张：没有证明不可回返；正例 return search exhausted，必须保持未知。
- 不入库弱结论：一次 anchor shift 本身、目标覆盖本身、可达图中的其他 force-chain 旁支。

## 下一轮建议

本 family 的显然相邻变体是旧 P 半格、垂直 P/L、以及旧 L 半格接非目标 consumer；这些如果后续继续，应作为同一结构谱扩展或 recipe 组合，不应写成本轮未补 backlog。
