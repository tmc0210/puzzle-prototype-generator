```yaml
review_iteration: review_1
candidate_version_reviewed: RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2
review_input_type: candidate_version
verdict: supports_with_caveats
review_loop_state: proposal_ready_with_caveats
required_action: none
supported_claims:
  - core4 event probe 支持四组 claimed/required winning-path events 均为全胜路必经：combined probe found_bypass=false 且 status=complete；四个 individual probes 对 anchor_boundary_shift:box_sticky、box_to_sticky、sticky_merge、move_sticky_rigid 也均为 found_bypass=false 且 status=complete。
  - 返回解实际包含 anchor_boundary_shift:box_sticky、box_to_sticky、sticky_merge、move_sticky_rigid；关键快照支持“先经 B/S 转黏并合并，最后横向 sticky 刚体上移覆盖双目标”的事件链。
  - 普通箱替代版支持“普通箱不能替代这个具体结构”：替代布局 solver_found=false，search/graph status=complete，reachable_states=20740，winning_states=0。
  - 候选没有把返回解声明为唯一解，也没有声明审美分数或难度分数；packet 明确 score_claim_allowed=false。
  - 候选明确没有 instance-level object participation 证据，并把硬证据范围限定为 event/geometry-level。
unsupported_or_overclaimed:
  - 玩家实际能否读出“handle 携带 shadow cell”的理解，工具证据不能单独证明；当前只能说证据支持该玩家侧解读的结构前提。
  - 若将“C 必须先经 B/S 转黏并与 M 合并”解释为对象实例级 all-solution identity claim，则当前 object participation 证据不足；按 packet 自述应仅按 event/geometry-level claim 读取。
  - 普通箱替代证据只支持这个具体 ordinary-box analog 完整无解，不支持所有可能普通箱重设计或其他普通箱变体均无解。
evidence_limits:
  - event probe 证明的是 winning-path event gate，不是唯一输入序列、唯一最短解或玩家决策必然性。
  - complete graph/reachable facts可作为完整性背景，但不能自动转化为审美、难度或 campaign placement 结论。
  - K_runtime_smoke 没有 configured detector；本轮核心机制证据主要来自 event probe 与完整图/反事实替代版。
questions_for_designer: []
```
