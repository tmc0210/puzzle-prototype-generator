# ICE_EXP_003 2026-06-30 Round 7: Aggressive 8-Push Trace-Supported Candidate

```yaml
experiment_id: ICE_EXP_003_2026_06_30_round7_aggressive_8_push_trace_supported
prototype: ice_slide_escape
terminal_state: held_proposal
proposal_ready_candidates: []
held_candidates:
  - ICE_CAND_0014
review_integrity: independent_review
archive_pass: local_record_only
```

## Human Redirect

本轮由人类明确重定向：

```text
可读性、误触不是问题；关卡难度不设上限；只看关键逻辑是否精巧。
允许大量误导、反直觉操作和必要走路；一切只为逻辑难度服务。
```

因此，本轮不再把路线长、误触风险、开阔错误空间或反直觉程度当作核心攻击。
主要目标改为：

```text
- 至少 5-7 个关键 push，允许更多。
- 前序产物必须被后续消费。
- 至少一个临时资源先被创造、再被消费或牺牲。
- 起点/终点外尽量不开放其它边缘接口。
- 工具证据必须诚实区分 trace existence 与 full-graph proof。
```

## Candidate Result

`ICE_CAND_0014 v7` 达到 trace-supported held 状态。

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0014_scratch_v7_temp_stopper_open_k.txt
player_start: [0, 9]
player_goal: [14, 3]
manual_runtime_replay:
  input_count: 124
  push_count: 8
  win: true
initial_standable_edge_cells:
  - [0, 9]
```

核心逻辑：

```text
B d5 -> [2,1]
C d6 uses B -> [3,1]
D short-stop uses C -> [3,2]
E d5 uses D -> [4,2]
F d5 uses E -> [4,1]
H left d4 -> temporary stopper [3,3]
K up d4 uses temporary H -> [3,5]
H right d6 sacrifices temporary H and opens [14,3]
```

## Evidence Boundary

```yaml
trace_replay:
  result: pass
  ref: prototypes/ice_slide_escape/reports/trace_replay_ICE_CAND_0014_v7_temp_stopper_open_k.md
layout_analysis:
  result: exhausted
  states: 100001
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0014_v7_temp_stopper_open_k.md
required_event_probe:
  result: exhausted
  states: 200001
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0014_v7_required_probe.md
```

不能声称：

```text
- shortest solution uses the stated 8-push chain
- all winning paths require every stated event
- no bypass exists
- complete SCC / graph difficulty facts
```

可以声称：

```text
- 存在一条 runtime-validated 胜利 trace。
- 该 trace 包含 8 次 push。
- trace 中存在五段 target/stopper cascade 和一段临时 stopper 创造-消费-牺牲链。
- 初始可站立边缘只有 [0,9]，显式 goal [14,3] 初始为墙。
```

## Exploration Notes

```text
v1_false_open_chain:
  结果: 手动骨架部分可行，但开放内场导致 analyzer 状态空间爆炸。

v2_v4_corridor:
  结果: 收窄边缘和交通廊；v4 得到 6-push 可胜 trace。

v5_folded:
  结果: 试图缩短路线；人类随后明确表示走路和误触不是问题，因此停止该方向。

v6_temp_stopper:
  结果: 加入 H-left 临时 stopper 和 K rebound，但 K 上方墙导致 push failed。

v7_temp_stopper_open_k:
  结果: 打开 K 的竖向 d4 线，得到 8-push runtime-validated trace。
```

## Review Result

```yaml
review_1:
  candidate_version_reviewed: ICE_CAND_0014_v7_temp_stopper_open_k
  evidence_reviewer:
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    required_action: keep_limited_trace_supported_claim
    core_result: >
      The evidence supports existence of a runtime-validated 124-input,
      8-push winning trace and the stated local mechanism chain. It does not
      support no-bypass or all-winning-path claims because analyzer and
      required-event probes exhausted.
  design_critic:
    verdict: held_proposal
    review_loop_state: held_proposal
    required_action: strengthen_machine_evidence
    core_result: >
      The 8-push structure is meaningfully stronger than a three-step chain,
      and the H-left -> K-up -> H-right temporary-stopper creation/use/sacrifice
      is the strongest design feature. The blocking issue is evidence: only
      one winning trace is proven, not forcefulness in the full solution space.
```
## Terminal State

```text
held_proposal, not proposal_ready.
```

原因：

```text
逻辑结构已经明显回应“不要三段式”的要求，且 independent evidence/design review
均认可限定版 trace-supported claim 的价值。但 critic 给出 held_proposal，原因是
完整图/required-event 证据超预算，仍未证明无低 push bypass 或该 8-push 链在
所有胜利路径中强制。它应提交给人类作为高难方向样本，而不是作为已证明无 bypass
的正式 proposal。
```
