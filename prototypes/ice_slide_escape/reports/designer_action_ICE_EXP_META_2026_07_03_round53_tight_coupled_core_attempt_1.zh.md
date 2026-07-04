# ICE_EXP_META_2026_07_03_round53_tight_coupled_core attempt_1 designer action

```yaml
decision: structural_redesign_needed
review_integrity: missing
archive_eligibility: raw_run_only
candidate_submitted: false
independent_reviewer_called: false
independent_critic_called: false
reason: >
  本轮没有形成 serious candidate。worker_round53_v4 解决了“spare 补位冰过多”
  的核心密度问题，但仍有接口外溢与 meta d6 钥匙化；后续修复和本地扫描均未找到
  同时满足 base no-late、C->D d6/restart、A/B/C/D 全分离、A/B 不抢 D 的变体。
```

## 已完成的有效工作

- 写入 fresh claim：`prototypes/ice_slide_escape/reports/fresh_claim_ICE_EXP_META_2026_07_03_round53_tight_coupled_core_v0.zh.md`
- 读取并用于校准的人类 archive 锚点：
  - `ICE_CAND_0037`：重复 target-door / target-debt 拼接反例。
  - `ICE_CAND_0011`：有顺序逻辑但冗余空间、可删步骤、外溢导致审美极低。
  - `ICE_CAND_0024`：强共享空间 / 诱惑 / d6 遮蔽的高分 meta 正例。
  - `ICE_CAND_0035`：同格回返高分边界，但本轮明确不复用 B=C / return-pressure 模板。
  - `ICE_CAND_0019`：延迟隐藏 stopper / 非局部回读的正例。

## 当前最好结构素材：worker_round53_v4

```text
############
##.#......I.
###.########
..#.*....###
#...#......#
#####.......
#####......#
#####.######
#####.######
```

```yaml
A: [0, 3]
B: [5, 8]
C: [11, 1]
D: [11, 5]
```

优点：

- A/B/C/D 四点全分离。
- 初始唯一目标 `[4,3]` 有冰，并且它本身是路径门。
- base 没有 spare 补位冰：同一目标冰右推 d4 出门，再左推 d4 回封。
- base strict gate 通过：A->B cost 20，complete graph，122 states，1 win；完整可达无 d5 / restart / d6+。
- meta gate 通过：C->D cost 24，complete graph，150 states，1 win；所有胜路需要 d6+ / restart / d4。

致命问题：

- `A->D` cost 19 可解，且比 A->B 更短；这是未忽略内部非目标 pair 风险。
- `B->D` / `D->B` walk-only，说明 B/D 只是右侧开放区两个边缘点，不是有设计理由的分离。
- meta 的 d6 只是打开接近角，产物停在 `[2,1]` 后未被消费；后续仍是复做 base 的两次 d4 门核。

## 本地修复扫描

- `round53_skeleton_sweep.ts`
  - 扫描 300 个手工骨架连接变体。
  - baseGatePass: 111
  - metaDebt: 0
  - hitCount: 0

- `round53_v4_edge_goal_scan.ts`
  - 对 v4 全 edge goal 扫描。
  - 没有天然 D 满足：C->D 需要 d6+d4，且 A/B 抢不到 D。

- `round53_v4_local_repair_scan.ts`
  - 扫描 256 个左上 D 室 / 右下隔离局部 mask。
  - basePass: 256
  - hitCount: 0

- `round53_compact_meta_d6_search.ts`
  - 短批次 d6 专用搜索：
    - seed 202607535：baseGatePass 0
    - seed 202607536：baseGatePass 17，distinctMetaConsidered 4，但全部缺 d6/restart
  - 较宽 `round43_compact_meta_search` 找到早期机制双流程命中，但 meta 无 d6/restart，未采纳。

## worker 修复记录

`worker_round53_repair_attempt_summary.zh.md` 的结论与主线一致：

- 若让 d6 产物替代 `[2,3]` 左反弹障碍，上方替换站位容易成为过早 D / edge escape。
- 若 D 放回右侧，中央目标回封后玩家位置合理，但还缺一个 base 不可触发、meta-only 的右侧 D 开门动作。
- 两目标替换尝试能让 d6 产物落回 `[2,3]`，但会导致 base 可达 d5/restart 泄露或 C->D d6 后 walk-only。

## 下一步设计方向

本 family 不应继续做小墙修补；需要结构换轴：

1. 保留“目标冰自己出门 / 回封”的高密度门核。
2. 把 d6 产物替代站位内移，不能靠 edge cell 当操作位。
3. D 应在最终目标回封后的玩家侧，但必须由 meta-only 状态打开；不能是 B 旁边的开放边缘点。
4. 若使用第二目标，它必须承担“初始目标覆盖 + base 反弹障碍 + meta 被 d6 产物替代/偿还”三重角色，否则会退化成重复补位。
5. 下一轮应从“二目标交换 / d6 产物替代静态反弹障碍 / 右侧 D 二条件门”重新画骨架，而不是继续随机加墙删墙。
