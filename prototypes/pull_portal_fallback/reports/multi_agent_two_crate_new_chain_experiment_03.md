# Multi-Agent Two-Crate New-Chain Experiment 03

Purpose: test the current validated workflow on a new level, not a reused or reuse-strengthened variant.

This run used the main thread as persistent lead designer. Temporary agents were used only as reviewers after analyzer evidence was available.

## Workflow Under Test

```text
persistent lead designer / main thread
-> hard-evidence tools: solver / analyzer
-> mechanic evidence reviewer
-> puzzle design critic
-> lead-designer final decision
```

## Slot Brief

Design mode: `new_chain`

Target role: `combination / challenge candidate`

Design target:

```text
Build a two-crate, two-lock serial chain.
Each crate should create a separate portal fallback precondition.
Each crate should be necessary, not merely moved in the trace.
```

The goal is not just:

```text
crate/moved distinct >= 2
```

The stronger target is:

```text
two distinct crates each block a different portal exit
and removing either crate makes the level unwinnable
```

## Lead Designer Attempts

### Try 1

```text
###########
###      ##
#G A   D@##
### ### ###
#  B#  E###
#    C   C#
###########
```

Analyzer result:

- Solved.
- Only `A/B` and one crate were used in the shortest solution.
- `D/E` was bypassed.
- `crate/moved distinct=1`.

Decision: reject. This was not a two-crate chain.

### Try 2

```text
###########
###  ##  ##
#G A   D@##
### ### ###
#  B#  E###
#    C   C#
###########
```

Analyzer result:

- Solved.
- `D/E` was used as a normal teleport passage.
- Only one crate was moved.
- The lower modules were still connected enough that the first lock was not a real lock.

Decision: reject. `D/E` was not a consumed fallback lock.

### Try 3

Accepted candidate for review:

```text
###########
###  ##  ##
#G A   D@##
### ### ###
#  B## E###
#   C#  C #
###########
```

Report:

- [layout_analysis_two_crate_two_lock_chain_try3.md](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_two_crate_two_lock_chain_try3.md)
- [layout_analysis_two_crate_two_lock_chain_try3.json](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_two_crate_two_lock_chain_try3.json)

Key change:

```text
Separate the lower modules with a wall.
D fallback must happen before the player can reach the A/B module.
A fallback must happen before the player can reach G.
```

## Candidate Claim

Concrete causal chain:

```text
1. Player uses D/E to reach the right lower module.
2. Player pulls the right crate left so it blocks E's downward exit.
3. Player returns through E->D.
4. Player enters D downward.
5. E's downward exit is blocked by the right crate, so D is fallback-pushed down.
6. D's old position opens the route to the left A/B module.
7. Player uses A/B to reach the left lower module.
8. Player pulls the left crate left so it blocks B's downward exit.
9. Player returns through B->A.
10. Player enters A downward.
11. B's downward exit is blocked by the left crate, so A is fallback-pushed down.
12. A's old position opens the route to G.
```

Chain delta:

```text
This is a new chain, not reuse-strengthening an existing accepted level.
It tests two same-type objects as separate lock resources:
right crate -> D/E lock
left crate -> A/B lock
```

## Analyzer Evidence

Summary:

- Solved: yes.
- Cost: 25.
- Complete graph: yes.
- Reachable states: 64.
- Legal transitions: 135.
- Winning states: 1.

Solution events include:

```text
portal_enter:D
portal_teleport:D->E
pull_crate:crate#2
portal_enter:E
portal_teleport:E->D
portal_enter:D
portal_exit_blocked:D->E
portal_exit_blocked_by_crate:crate#2
portal_fallback_push:D
portal_enter:A
portal_teleport:A->B
pull_crate:crate#1
portal_enter:B
portal_teleport:B->A
portal_enter:A
portal_exit_blocked:A->B
portal_exit_blocked_by_crate:crate#1
portal_fallback_push:A
```

Object participation:

```text
crate/blocked_portal_exit:
  distinct=2
  instances=crate#1, crate#2

crate/moved:
  distinct=2
  instances=crate#1, crate#2

portal/moved:
  distinct=2
  instances=A, D
```

Counterfactuals:

```text
without_pull: unsolvable, complete
without_blocked_portal_push: unsolvable, complete
without_portal_teleport: unsolvable, complete
```

Target event checks:

```text
teleport: no winning bypass, complete search
pull: no winning bypass, complete search
blocked_portal_push: no winning bypass, complete search
```

## Object Removal Probes

Remove left crate:

```text
###########
###  ##  ##
#G A   D@##
### ### ###
#  B## E###
#    #  C #
###########
```

Result:

- Unsolvable.
- Complete graph.
- Winning states: 0.

Remove right crate:

```text
###########
###  ##  ##
#G A   D@##
### ### ###
#  B## E###
#   C#    #
###########
```

Result:

- Unsolvable.
- Complete graph.
- Winning states: 0.

Interpretation:

```text
Both crates are necessary under object-removal probes.
This is stronger than trace-level participation.
```

## Mechanic Evidence Reviewer

Verdict: `supports_claim`

Evidence quality: `5/5`

Supported claims:

- The concrete two-lock causal chain is supported.
- Two distinct crates are moved.
- Two distinct crates each block a different portal exit.
- Removing either crate makes the level unwinnable.
- The candidate is a real two-lock serial chain, not a single-lock puzzle with a decorative second crate.

Caveats:

- `new_chain` is partly a design-library classification; analyzer proves the chain exists, not that no similar level exists elsewhere.
- The reviewer did not judge aesthetics or player experience.

## Puzzle Design Critic

Verdict: `mainline_with_caveats`

Role fit: `combination / challenge`

Quality score: `4/5`

Strong merits:

- The two locks are real and serial.
- Both crates and both fallback pushes have responsibility.
- The analyzer and removal probes are clean.
- Try 3 fixed the bypasses from Try 1 and Try 2.

Risks:

- The two modules are highly isomorphic.
- The second half may feel like repeating the first half rather than discovering a new twist.
- As a challenge, its difficulty comes more from serial length and state memory than from a new structural surprise.

Advice:

- Keep the compact structure.
- Do not add distractors just to raise difficulty.
- If upgrading later, add one meaningful asymmetry such as a changed direction, different return pressure, or a side effect from the first lock affecting the second.

## Lead Designer Final Decision

Classification: `reject_mainline / keep_as_evidence_fixture`

Placement recommendation:

```text
not a mainline puzzle
keep as an analyzer / reviewer fixture for two-crate two-lock evidence
```

Reason:

The evidence gate is strong:

```text
complete graph
single winning state
two distinct moved crates
two distinct crate-blocked portal exits
two distinct fallback-pushed portals
no target-event winning bypasses
both single-crate removals unsolvable
```

However, the player-facing design gate fails:

```text
The two halves are clean but not meaningfully coupled.
The D/E lock only opens access to the A/B lock; it does not change the meaning, timing, resource pressure, or internal solution of the A/B lock.
The level behaves like two same-skill subproblems stitched together.
For hard-core logic puzzle players, this reads as duplicated work rather than a meaningful challenge.
```

The puzzle critic correctly noticed the issue but was too lenient by returning `mainline_with_caveats`. In this workflow, repetition alone should not be rejected, but repeated causal chains must be coupled. If repeated subchains are independent same-skill subproblems, they should be rejected or split unless the slot explicitly asks for a short confirmation / repetition exercise.

Final status for this run:

```text
mechanically valid evidence fixture
mainline rejected by lead-designer design gate
process result: evidence workflow succeeded, critic rubric was too weak
```

## Process Notes

This run validates several pieces of the updated prompt workflow:

- The lead designer wrote a concrete chain target before accepting a layout.
- Analyzer evidence rejected two plausible but flawed drafts.
- Try 3 was revised because of analyzer evidence, not rationalized after the fact.
- Object participation was checked beyond event counts.
- Object-removal probes caught the stronger per-object necessity question.
- Reviewer and critic received `chain_delta` and refinement notes.
- Final placement was corrected by the lead designer / main thread after reviewer output proved too lenient.

Remaining workflow gap:

```text
Object-removal probes are still manual ad hoc commands.
They should become a first-class analyzer diagnostic for object-role claims.
Critic prompts need a gate for independent repeated subproblems:
if repeated causal chains do not share resources, change each other's meaning, create timing/order/routing pressure,
reuse elements across roles, or force reinterpretation, they should be rejected or split.
Surface/layout similarity alone is not enough to reject; same-shape / different-solution or coupled-repetition designs may be valuable.
```
