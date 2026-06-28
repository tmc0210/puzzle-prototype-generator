# Multi-Agent Coupled Chain Experiment 04

Purpose: test the revised principle:

```text
Repeated causal chains can be accepted when the repetitions are coupled.
Independent same-skill subproblems should be rejected or split.
```

This experiment follows the rejection of `two_crate_two_lock_chain_try3`, which had strong mechanical evidence but failed the design gate because its two locks were serial and independent.

## Workflow Under Test

```text
persistent lead designer / main thread
-> hard-evidence tools: solver / analyzer
-> mechanic evidence reviewer
-> puzzle design critic
-> lead-designer final decision
```

## Accepted Candidate For Review

Candidate: `coupled_pull_d_blocks_b_trim1`

```text
############
###  #######
#G A #######
### ########
#  B###  ###
# D ###E@###
#  #####C###
############
```

Report:

- [layout_analysis_coupled_pull_d_blocks_b_trim1.md](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_coupled_pull_d_blocks_b_trim1.md)
- [layout_analysis_coupled_pull_d_blocks_b_trim1.json](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_coupled_pull_d_blocks_b_trim1.json)

## Lead Designer Iteration Notes

### Coupled Attempt Try 1

Rejected by analyzer:

- Direct `B` teleport reached the goal area.
- Pull and fallback were bypassed.

### Coupled Attempt Try 2

Promising but rejected:

- D was moved and later consumed as a blocker for A/B.
- However, the crate started already blocking E's exit.
- Pull was unnecessary.

### Coupled Attempt Try 3

Rejected by analyzer:

- Introduced pull.
- But after pulling, the player could route directly to B from the right.
- D fallback was bypassed.
- Graph search exhausted because the right-side space was too large.

### Coupled Attempt Try 4

Rejected by analyzer:

- D could be fallback-pushed by a wall from an unintended direction.
- Pull was again unnecessary.
- This exposed a rule-specific edge case: unintended boundary fallback can create a bypass.

### Coupled Attempt Try 5

Mechanically valid but untrimmed:

- Pull, teleport, and fallback were all necessary.
- The first fallback moved D into B's exit blocker position.
- Complete graph: 17161 reachable states, 81 winning states.
- Layout contained large redundant right/bottom spaces.

### Trim 1

Accepted for review:

- Preserves the coupled causal chain.
- Complete graph: 100 reachable states.
- Winning states: 1.
- No winning bypass for pull, teleport, or blocked-portal fallback.

## Candidate Claim

Concrete causal chain:

```text
1. Player pulls the crate upward.
2. The crate moves to E's right exit cell.
3. Player enters E downward and teleports to below D.
4. Player enters D from the left.
5. E's right exit is blocked by the pulled crate, so D is fallback-pushed right.
6. The moved D now occupies B's downward exit cell.
7. Player enters B from the left and teleports to A's right side.
8. Player gets above A and enters A downward.
9. B's downward exit is blocked by the moved D, so A is fallback-pushed down.
10. A's old position opens the route to G.
```

Coupling claim:

```text
The first fallback does not merely open access to a second independent module.
It moves D into the exact blocker role consumed by the second fallback.
D changes role:
  operation target -> later blocker resource
```

This is the key difference from `two_crate_two_lock_chain_try3`, where D/E only opened access to a separate A/B lock.

## Analyzer Evidence

Summary:

- Solved: yes.
- Cost: 15.
- Depth: 15.
- Complete graph: yes.
- Reachable states: 100.
- Legal transitions: 215.
- Winning states: 1.

Solution events:

```text
pull_crate:crate#1
portal_enter:E
portal_teleport:E->D
portal_enter:D
portal_exit_blocked:D->E
portal_exit_blocked_by_crate:crate#1
portal_fallback_push:D
portal_enter:B
portal_teleport:B->A
portal_enter:A
portal_exit_blocked:A->B
portal_exit_blocked_by_portal:D
portal_fallback_push:A
```

Object participation:

```text
crate/moved:
  distinct=1
  instances=crate#1

crate/blocked_portal_exit:
  distinct=1
  instances=crate#1

portal/moved:
  distinct=2
  instances=A, D

portal/entered:
  distinct=4
  instances=A, B, D, E
```

Counterfactuals:

```text
without_pull: unsolvable, complete
without_blocked_portal_push: unsolvable, complete
without_portal_teleport: unsolvable, complete
```

Target event checks:

```text
teleport: no shortest or winning bypass, complete search
pull: no shortest or winning bypass, complete search
blocked_portal_push: no shortest or winning bypass, complete search
```

## Mechanic Evidence Reviewer

Verdict: `supports_with_caveats`

Evidence quality: `4/5`

Supported:

- The level is solvable with complete graph search.
- The concrete event chain is broadly supported.
- Pull, teleport, and blocked-portal fallback are necessary.
- The candidate is stronger than the independent two-lock control because D is first moved by fallback and later appears as the blocker consumed by A's fallback.

Coupling evidence verdict:

```text
Supported at trace level.
```

Main caveats:

- Analyzer summary is event-based, not coordinate-annotated enough.
- `portal_exit_blocked_by_portal:D` strongly implies D occupies B's relevant exit, but the reviewer could not inspect explicit coordinates from the prompt alone.
- The claim that A's old cell opens the route to G is plausible but not separately proven in the supplied summary.

## Puzzle Design Critic

Verdict: `strong_mainline_candidate`

Role fit: `challenge / combination`

Quality score: `5/5`

Lead-designer audit after user review:

```text
The critic verdict is too generous.
It correctly identifies the coupling, but it does not evaluate player-facing agency.
It also adds generic caveats not grounded in the supplied stage, prerequisite context, puzzle structure, or analyzer evidence.
```

Strongest merits:

- This version solves the previous failure mode.
- The two fallback uses are coupled: the first moves D into the blocker position required by the second.
- Pull, teleport, and fallback form a clear causal chain.
- D has role translation:

```text
operation target -> later blocker resource
```

- Complete graph evidence is tight: 100 reachable states, 1 winning state, and no target-mechanism bypass.
- Trim 1 keeps the chain while removing redundant space from Try 5.

Risks:

- Player-facing agency may be too low.
- From the initial state, the only meaningful progress action appears to be pulling C upward; other actions are likely reversible wandering or dead progress.
- The current analyzer report does not yet expose an SCC / condensation-graph view that would make this forced-prefix issue explicit.
- The critic's original caveats are too generic to be useful without a stated campaign stage, prerequisite knowledge, or concrete structural evidence.

Advice:

- Keep as a strong coupled-chain structure candidate.
- Do not treat it as a high-quality challenge until player-facing agency is checked.
- Do not enlarge it with distractors.
- If revised, add a real decision or construction choice without breaking the tight coupled chain.

## Lead Designer Final Decision

Classification: `mainline_candidate_with_agency_caveat`

Placement recommendation:

```text
strong coupled-chain structure candidate
not yet accepted as a strong challenge
```

Reason:

This candidate passes both gates:

```text
mechanical gate:
  complete graph
  single winning state
  pull / teleport / fallback all necessary
  no target-event winning bypass

design gate:
  repeated fallback chain is coupled
  first fallback's result becomes the second fallback's blocker
  D changes role from operated portal to later blocking resource
```

However, the player-agency gate is under-evaluated:

```text
The causal chain is elegant, but the state graph may be too narrow.
If the initial region has only one meaningful exit action after SCC / reversible-move collapse,
the level is closer to a scripted coupled-chain demonstration than a strong challenge.
```

The remaining evidence caveats are:

- Future analyzer reports should include key object coordinates for blocker claims, especially:

```text
after portal_fallback_push:D,
D position equals B's relevant exit cell
```

- Future analyzer reports should expose graph-shape evidence for player-facing agency:

```text
initial SCC
condensation graph
forced-prefix length
non-equivalent outgoing choices before key actions
```

## Process Result

This experiment validates the revised repetition rule:

```text
repetition alone is not failure
independent repetition is failure
coupled repetition can be strong
```

It also exposes a separate critic failure:

```text
coupled does not automatically mean high-quality challenge
critic must check player-facing agency when complete graph evidence is available
critic must avoid generic caveats not tied to concrete puzzle structure, player model, or analyzer evidence
```

The updated critic prompt also passed a regression check:

- `two_crate_two_lock_chain_try3` was re-reviewed under the new rule.
- The critic returned `variant_only`.
- The reason was exactly that the two locks were serial and independent, with D/E only opening access to A/B.

## Analyzer / Reporter Backlog

- Add coordinate-level key facts for source-specific blocker claims.
- Example:

```text
portal_exit_blocked_by_portal:D
entrance=A
paired=B
blocked_exit=(x,y)
blocker=D at (x,y)
```

- Add optional comparative refinement evidence, e.g. Try 5 vs Trim 1:

```text
state count before / after
winning state count before / after
target-event bypass status preserved
```

- Add graph-shape / agency diagnostics when complete graph is available:

```text
SCC condensation graph
forced-prefix report
meaningful outgoing choices from each solution-prefix SCC
whether non-solution actions are only reversible wandering inside an SCC
```
