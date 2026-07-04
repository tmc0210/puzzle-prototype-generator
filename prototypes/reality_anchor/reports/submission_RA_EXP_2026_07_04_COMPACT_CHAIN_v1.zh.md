# Submission: RA_EXP_2026_07_04_COMPACT_CHAIN_v1

```yaml
candidate_version: RA_EXP_2026_07_04_COMPACT_CHAIN_v1
prototype: reality_anchor
title: Compact chain v1
status: proposal_ready_with_caveats
archive_eligibility: human_pending
review_integrity: independent_review
latest_review_iteration: review_2
open_required_action_after_latest_review: none
score_claim: none
score_reason: reality_anchor 当前 clean archive 只有一个正向人评锚点，缺少负例/下界校准；本次不输出数值审美或难度结论。
```

## ASCII

```text
##########
#G.#MPL..#
#.@BSG.M.#
#..C.....#
##########
```

## Solution

```text
down right right right up left left down left up down right right right right up down
```

逐步读法：

1. `down`
2. `right`: 推 crate，触发 `box_to_sticky`。
3. `right`
4. `right`: 连续移动 sticky 刚体。
5. `up`
6. `left`
7. `left`: 推 B/S 左移。
8. `down`
9. `left`
10. `up`: 推 B/S 上移并在返回解中覆盖左上目标。
11. `down`
12. `right`
13. `right`
14. `right`
15. `right`: 推 sticky 刚体并触发 `sticky_merge`。
16. `up`
17. `down`: pull P/L 下移，在返回解中覆盖中线目标并胜利。

## Key Snapshots

Start:

```text
##########
#G.#MPL..#
#.@BSG.M.#
#..C.....#
##########
```

Step 2 after `right`: crate 转 sticky。

```text
##########
#G.#MPL..#
#..BSG.M.#
#..@M....#
##########
```

Step 7 after `left`: B/S 已左移到左侧通道。

```text
##########
#G.#MPL..#
#BS@.G.M.#
#.....M..#
##########
```

Step 10 after `up`: B/S 上移，返回解中覆盖左上目标。

```text
##########
#BS#MPL..#
#.@..G.M.#
#.....M..#
##########
```

Step 15 after `right`: sticky 刚体右移并触发 merge。

```text
##########
#BS#MPL..#
#....G.M.#
#.....@M.#
##########
```

Step 17 after `down`: pull P/L，下移覆盖中线目标并胜利。

```text
##########
#BS#M....#
#....PLM.#
#.....@M.#
##########
```

## Evidence Summary

```yaml
solver:
  found: true
  cost: 17
  depth: 17
  explored_states: 365
graph:
  status: complete
  reachable_states: 991
  legal_transitions: 2474
  winning_states: 3
scc:
  solution_irreversible_path_steps: 7
  forced_win_prefix: 3/7
  handoff_scriptiness: scripted=2/7, max_run=2
event_probe_core6:
  status: complete
  found_bypass: false
  required_groups:
    - push_pull_anchor_shift
    - box_sticky_anchor_shift
    - pull_event
    - material_normalization
    - sticky_merge
    - sticky_rigid_move
```

## Review Summary

Evidence reviewer `review_2`:

```yaml
verdict: supports_claim
review_loop_state: proposal_ready
required_action: none
```

Puzzle critic `review_2`:

```yaml
verdict: supports_with_noncore_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none
```

Critic conclusion 摘要：

- 强项：B/S 材料线清楚，把材料归一化、sticky 刚体移动、sticky_merge 和 B/S 位移压成紧凑短链。
- 强项：P/L 没有被夸成全局主矛盾，而是作为不可绕过的轻量 pull 收束，符合本轮 lower-burden dual-anchor brief。
- Caveat：P/L 权重较轻，后续材料不能升级成同等主轴或全局互锁。
- Caveat：B/S 链仍有短链执行感风险；当前只能作为合格的低负担候选，不包装成开放规划型高难关。
- Caveat：archive 只有一个人类正例，无负例/下界，因此审美和难度保持未评分。

## Verification

```yaml
explain_level:
  command: npx tsx src/cli.ts explain-level prototypes/reality_anchor RA_EXP_2026_07_04_COMPACT_CHAIN_v1 --max-states 300000 --graph-max-states 300000 --write
  result: pass
npm_check:
  command: npm run check
  result: pass
```

## Artifact Refs

- `prototypes/reality_anchor/levels.yml`
- `prototypes/reality_anchor/reports/candidate_packet_RA_EXP_2026_07_04_COMPACT_CHAIN_v1_review2.zh.md`
- `prototypes/reality_anchor/reports/evidence_review_RA_EXP_2026_07_04_COMPACT_CHAIN_v1_review_2.md`
- `prototypes/reality_anchor/reports/puzzle_critic_RA_EXP_2026_07_04_COMPACT_CHAIN_v1_review_2.md`
- `prototypes/reality_anchor/reports/designer_action_RA_EXP_2026_07_04_COMPACT_CHAIN_v1_review_2.zh.md`
- `prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.md`
- `prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.md`
- `prototypes/reality_anchor/reports/trace_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.md`

