# Evidence Review: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4 review_4

verdict: pass
reviewer: independent_subagent

## Evidence Summary

最短解成本 24。关键事件为 step 1 `pull_object:crate#1`，step 9 `pull_object:push_pull_anchor` + `anchor_boundary_shift:push_pull`，step 19/20 两次 `push_object:push_pull_anchor` + `anchor_boundary_shift:push_pull`，step 24 `push_object:crate#1`。

事件计数覆盖普通箱拉 1 次、普通箱推 1 次、P/L 拉 1 次、P/L 推 2 次、P/L boundary shift 3 次。方向探针要求组为 `anchor_pull_right`、`anchor_push_right`、`crate_pull`、`crate_push`，覆盖第五关要求的 P/L 长边同向拉+推，以及普通箱子拉+推。

## Bypass Audit

directional combined probe: `Found bypass: false`, `Status: complete`。

individual probes: `anchor_pull_right`、`anchor_push_right`、`crate_pull`、`crate_push` 全部 `Found bypass: false`。

event count probe: 要求 `anchor_boundary_shift:push_pull >= 3`，结果 `Found bypass below count: false`。

主图分析完成：85 reachable states、15 winning states，forced viable/optimal prefix 为 4/4，支持没有绕过关键承诺链的可赢路径。

## Residual Risk

主分析报告里的 target detector 未配置，因此不能把 target check 当作旁路证明；旁路证明来自专门的 directional probe 和 event-count probe。没有单独的垂直 P/L 禁止探针，但第五关核心要求是长边同向拉+推，当前证据满足。
