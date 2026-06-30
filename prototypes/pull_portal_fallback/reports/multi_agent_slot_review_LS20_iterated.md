# Multi-Agent Slot Review: LS20 Iterated Push Until Jam

Purpose: continue the validated loop for `LS20_push_until_jam` until reviewer feedback upgrades the candidate from caveated to strong mainline.

Slot: `LS20_push_until_jam`

Intended role: `challenge`

Target pattern: `P_push_until_jam_boundary`

## Baseline Problem

The previous accepted-with-caveats LS20 candidate was mechanically valid but not a high-confidence challenge:

```text
Move D right repeatedly.
-> D blocks B's exit.
-> A fallback opens the route to G.
```

Reviewer caveat:

```text
The repeated D pushes are mechanically necessary, but may read as execution padding.
For a stronger challenge, make D movement change reasoning context or make the stop position carry a later causal role.
```

## Iteration 1: Failed Coupling Draft

Candidate: `ls20_iter1_intermediate_h_gate`

Result:

```text
Rejected by analyzer evidence before reviewer.
H was used as a normal teleport shortcut rather than a fallback gate.
B also became an unintended transport route.
```

Lesson:

```text
Adding another portal pair does not automatically create coupling.
The added pair must consume the changed state in the claimed branch, not merely provide another route.
```

## Iteration 2: Stop Before Overpush

Candidate: `ls20_iter2_stop_before_overpush`

```text
############
##       ###
#GA      ###
## # #######
#### #B#####
# D@    ####
#       ####
# E#########
############
```

Analyzer report:

- [layout_analysis_ls20_iter2_stop_before_overpush.md](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_ls20_iter2_stop_before_overpush.md)
- Solved: cost 19.
- Complete graph: 662 reachable states, 1818 legal transitions, 2 winning states.
- `without_blocked_portal_push`: unsolvable.
- Target event check: no shortest bypass, no winning bypass in complete graph.
- SCC: `one_win_continuation_per_scc`, solution irreversible path 5 SCC steps, `forcedWinPrefix=5/5`.
- At the aligned D position, the solution region has `commitments=3`, `viable=1`, `dead=2`.

Designer claim:

```text
D must stop at the B-exit alignment.
Overpushing D creates dead commitments.
```

Mechanic evidence reviewer:

```text
verdict: supports_claim
evidence_quality: 5/5
```

Puzzle design critic:

```text
verdict: mainline_with_caveats
role_fit: challenge
quality_score: 4/5
```

Critic summary:

```text
The revision fixes the original "push until wall" weakness.
However, it may still read as a precision checkpoint rather than a richer reasoning context.
```

Lead-designer decision:

```text
Keep as a valid fallback candidate, but continue iterating.
The remaining target is to make D's final position carry a second consumed role.
```

## Iteration 3b: Coupled Jam And Shared Dependency

Candidate: `ls20_iter3b_coupled_jam_h_lock`

```text
############
# H    #####
#GA    #####
## # #######
#### #B#####
# D@   I####
#       ####
# E#########
############
```

Analyzer report:

- [layout_analysis_ls20_iter3b_coupled_jam_h_lock.md](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_ls20_iter3b_coupled_jam_h_lock.md)
- Solved: cost 20.
- Complete graph: 1452 reachable states, 3847 legal transitions, 1 winning state.
- Events:
  - `portal_fallback_push:D=4`
  - `portal_exit_blocked:H->I=1`
  - `portal_exit_blocked_by_portal:D=2`
  - `portal_fallback_push:H=1`
  - `portal_exit_blocked:A->B=1`
  - `portal_fallback_push:A=1`
- Object participation:
  - portals entered: `A`, `D`, `H`
  - portals fallback-moved: `A`, `D`, `H`
- `without_blocked_portal_push`: unsolvable.
- `without_portal_teleport`: solvable at cost 21.
- `without_pull`: solvable at cost 20.
- Target event check: no shortest bypass, no winning bypass in complete graph.
- SCC: `one_win_continuation_per_scc`, solution irreversible path 6 SCC steps, `forcedWinPrefix=6/6`.

Additional jam probe:

```text
After solution step 10, walking to D's left gives row segment @DI.
Attempting to enter D rightward is illegal.
Reason: portal_fallback_failed
Events: portal_enter:D portal_exit_blocked:D->E portal_exit_blocked_by_wall portal_fallback_failed:D
State remains unchanged.
```

Concrete causal chain:

```text
D is pushed right repeatedly because E's right exit is wall-blocked.
-> D jams against I.
-> The D-I jam relation makes D block I's left exit.
-> Entering H from the right toward left fallback-pushes H left.
-> H moving left opens the cell above A.
-> The same D position also blocks B's downward exit.
-> Entering A downward fallback-pushes A down.
-> A's old cell opens the route to G.
```

Chain delta from iteration 2:

```text
Iter2:
  D exact position is consumed by A/B only.

Iter3b:
  D exact jammed position is consumed by H/I and A/B.
  I is both D's jam object and the paired portal whose exit D blocks.
```

## Reviewer Results

### Mechanic Evidence Reviewer

Verdict: `supports_claim`

Evidence quality: `5/5`

Supported claims:

- The candidate is solvable.
- Blocked-exit fallback is central; disabling it makes the level unsolvable.
- D is repeatedly pushed right by fallback.
- D jams against I; the explicit probe produces `portal_fallback_failed:D`.
- D's final position is consumed twice:
  - it blocks I's left exit for H fallback;
  - it blocks B's downward exit for A fallback.
- H/I is not decorative; H is entered and fallback-moved, while I participates as both jam object and paired exit source.

Caveats:

- The evidence is trace plus aggregate complete-graph no-bypass evidence, not a dedicated all-winning-path proof of exact double consumption.
- Normal teleport is not essential.
- There is no crate / pull contribution.

### Puzzle Design Critic

Verdict: `strong_mainline_candidate`

Role fit: `challenge`

Quality score: `5/5`

Strongest merits:

- The candidate fixes iteration 2's precision-checkpoint caveat.
- D's jammed position is reused across two portal pairs.
- I earns its keep as both physical jam object and paired portal whose exit is blocked.
- The jam boundary is verified by the probe.
- The causal chain has late-slot texture: D jam, H fallback unlock, A fallback finish.

Risks:

- The four D pushes are still the least interesting part.
- The risk after commitment is repeated fallback execution rather than new portal-routing responsibility.
- Normal teleport is nonessential, so this is specifically a fallback-jam challenge rather than a broad portal-routing challenge.

Placement advice:

```text
Keep this as the mainline late LS20 candidate.
Do not add distractors.
Only tune the D corridor if playtesting says four pushes feel too rote.
Preserve the D-I jam, H fallback unlock, and A fallback finish.
```

## Lead Designer Final Decision

Classification: `accept_mainline`

Final role: `challenge`

Calibrated quality score: `4/5`

Accepted candidate:

```text
############
# H    #####
#GA    #####
## # #######
#### #B#####
# D@   I####
#       ####
# E#########
############
```

Reason:

```text
The validated workflow reached a reviewer-approved high-quality candidate.
The final version no longer relies on repeated D pushes as raw execution padding.
The jammed D position becomes a shared dependency consumed by two later subsystems.
This is exactly the kind of role reuse and coupled repetition that prior design discussions identified as valuable.
```

Caveats to preserve:

- This level evidences fallback-jam logic, not pull/crate logic.
- Normal teleport should not be credited as necessary.
- The layout is linear after commitment; this is acceptable here because the challenge is a compact causal-chain puzzle, not an exploratory branching puzzle.
- After affordance-cap calibration, the original `5/5` critic score should be read as too generous. The calibrated judgment is strong mainline candidate / challenge / `4/5`; see [critic_affordance_cap_calibration.md](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/critic_affordance_cap_calibration.md).

## Generalizable Design Lesson

When a reviewer says a repeated operation feels like padding, the strongest fix is usually not to add distractors. A better repair is:

```text
repeated operation creates state X
-> X is not merely consumed once at the end
-> X becomes a shared dependency for at least two later interactions
-> at least one object in X also plays another role, such as boundary, blocker, key, route, resource, or trigger
```

This turns repetition into setup. It is a design-time principle, not a pure graph metric.
