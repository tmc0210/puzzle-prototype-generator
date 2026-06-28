# LS20 Affordance Redesign Iterations

Purpose: continue from `ls20_iter3b_coupled_jam_h_lock` after critic calibration capped it at 4/5 for affordance narrowing and linearity.

## Starting Point

Accepted baseline:

```text
ls20_iter3b_coupled_jam_h_lock
```

Calibrated judgment:

```text
verdict: strong_mainline_candidate
role_fit: challenge
quality_score: 4/5
```

Main caveats:

```text
Normal teleport was nonessential.
The graph was highly linear.
Repeated D pushes still felt like execution once the trick was understood.
```

## Iteration 4: Required Initial Teleport

Candidate: `ls20_iter4_require_initial_teleport`

```text
############
# H    #####
#GA    #####
## # #######
#### #B#####
# D@   I####
# #     ####
# E#########
############
```

Analyzer report:

- [layout_analysis_ls20_iter4_require_initial_teleport.md](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_ls20_iter4_require_initial_teleport.md)
- Solved: cost 20.
- Complete graph: 2496 states, 6189 legal transitions, 1 winning state.
- `without_blocked_portal_push`: unsolvable.
- `without_portal_teleport`: unsolvable.
- D fallback pushes: 4.
- H fallback and A fallback are preserved.

Design intent:

```text
Block the walking route from the start side to D's pushing side.
Force the player to use D->E normal teleport before pushing D.
```

Reviewer result:

```text
evidence_reviewer:
  verdict: supports_claim
  evidence_quality: 5/5

puzzle_critic:
  verdict: strong_mainline_candidate
  role_fit: challenge
  quality_score: 4/5
```

Critic judgment:

```text
Real improvement over iter3b: normal teleport is now necessary.
Still 4/5: the teleport is mostly a forced opener, not a deep reasoning beat.
D pushing remains repetitive and the graph remains linear.
```

Lead decision:

```text
Iter4 is mechanically stronger than iter3b, but not an aesthetic breakthrough.
Continue searching for a version where normal teleport is part of midgame reasoning.
```

## Iteration 5b: Midgame B->A Teleport

Candidate: `ls20_iter5b_shorter_midgame_b_to_a`

```text
############
# H ########
#GA ########
## #########
#### B######
# D@  I#####
# #    #####
# E#########
############
```

Analyzer report:

- [layout_analysis_ls20_iter5b_shorter_midgame_b_to_a.md](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_ls20_iter5b_shorter_midgame_b_to_a.md)
- Solved: cost 17.
- Complete graph: 155 states, 341 legal transitions, 1 winning state.
- `without_blocked_portal_push`: unsolvable.
- `without_portal_teleport`: unsolvable.
- D fallback pushes: 3.
- Midgame normal teleport: `B->A`.
- H fallback and A fallback are preserved.

Design intent:

```text
D->E normal teleport reaches D's pushing side.
D is pushed into D-I jam position.
B->A normal teleport moves the player into the sealed A/H room.
H fallback opens the A approach.
A fallback opens the goal path.
```

Reviewer result:

```text
evidence_reviewer:
  verdict: supports_with_caveats
  evidence_quality: 5/5

puzzle_critic:
  verdict: strong_mainline_candidate
  role_fit: challenge
  quality_score: 4/5
```

Critic judgment:

```text
Real improvement over iter4:
  B->A is a midgame route, so normal teleport is not only a forced opener.
  D push count drops from 4 to 3.

Still 4/5:
  The structure is even more sealed / linear.
  B->A may read as a routing gate rather than a deep teleport reasoning moment.
  The puzzle is still mostly executing a discovered chain.
```

Lead decision:

```text
Iter5b is probably stronger than iter4 as a compact LS20 mainline candidate.
It should not be treated as an overall 5/5.
```

## Current Best Locally Generated Candidate

Current preferred compact LS20 candidate before checking existing candidate-pool material:

```text
ls20_iter5b_shorter_midgame_b_to_a
```

Reason:

```text
It preserves the D-I jam / H unlock / A finish identity.
It reduces D repetition.
It makes normal teleport necessary both as an opener and as a midgame route.
It has complete graph support and no winning bypass.
```

Caveat:

```text
It remains a linear compact causal-chain puzzle.
It is a strong 4/5 mainline candidate, not a 5/5 aesthetic endpoint.
```

## Reclassification Probe: Hard Chain As LS20

After repeated 4/5 results, the loop checked whether an existing high-quality hard-chain structure also satisfies the LS20 slot. This was useful as a diagnostic and candidate-pool management action, but it should not be treated as a replacement for designing enough fresh LS20 candidates and later selecting from an overfull pool.

Candidate: `ls20_hard_chain_jam_candidate`

```text
########
# A  @ #
#     B#
#  C## #
###### #
#####G #
########
```

Analyzer report:

- [layout_analysis_ls20_hard_chain_jam_candidate.md](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_ls20_hard_chain_jam_candidate.md)
- Solved: cost 26.
- Complete graph: 1231 states, 3078 legal transitions, 14 winning states.
- `without_pull`: unsolvable.
- `without_blocked_portal_push`: unsolvable.
- `without_portal_teleport`: unsolvable.
- Target checks:
  - crate-blocked portal exit: no shortest bypass, no winning bypass.
  - blocked-portal entrance push: no shortest bypass, no winning bypass.
- SCC:
  - `branching_win_dag`
  - solution irreversible path 9 SCC steps
  - `forcedWinPrefix=0/9`
  - initial SCC has 3 win-reaching exits and 0 dead exits.

Additional jam probe:

```text
After B is pushed to the final goal-side position,
the player can stand above B.
Attempting to enter B downward is illegal.
Reason: portal_fallback_failed
Events: portal_enter:B portal_exit_blocked:B->A portal_exit_blocked_by_crate:crate#1 portal_fallback_failed:B
State remains unchanged.
```

LS20 interpretation:

```text
B is fallback-pushed downward three times.
The repeated push is enabled by the crate blocking A's exit.
B reaches a terminal / jam position near the goal.
That final B position is consumed by the final A->B teleport to reach the goal side.
```

Why it beats the D/I variants:

```text
The push-until-jam segment is embedded in a richer role-changing chain.
The crate is pulled, then becomes a remote portal-exit blocker.
A and B both use normal teleport and fallback push.
The graph has healthy branching / merging rather than a single forced script.
The repeated B pushes change final routing instead of acting as a sealed corridor counter.
```

Reviewer result:

```text
evidence_reviewer:
  verdict: supports_claim
  evidence_quality: 5/5

puzzle_critic:
  verdict: strong_mainline_candidate
  role_fit: challenge
  quality_score: 5/5
```

Lead decision for this experiment:

```text
Accept `ls20_hard_chain_jam_candidate` as the current best LS20 late challenge.
This is not merely a general combination puzzle: the LS20 push-until-jam action is central,
has a verified terminal boundary, and its final position is consumed by final routing.
```

Important caveat:

```text
This does not mean the campaign should fill LS20 by stealing an already validated hard-chain level.
Final campaign construction should over-generate candidates, then perform group-level sequencing and selection.
If this level is reused for LS20, it must be accounted for as a reused / reclassified candidate,
not as newly designed LS20 output.
```

Placement caveat:

```text
This is dense.
It should come after players have separately practiced:
  - crate-as-exit-blocker
  - repeated portal fallback movement
  - jam / fallback failure boundaries
```

## General Process Lesson

Repeated 4/5 results are useful. They indicate the local repair loop is working, but also that the current structural family may have hit an aesthetic ceiling.

Do not keep micro-editing walls forever.

If the goal is to reach 5/5, switch from local repair to structural redesign:

```text
local repair:
  keep same chain family
  adjust walls / routes / object positions
  fix one caveat at a time

structural redesign:
  preserve the target insight
  design a new chain where the previously underused affordance creates a choice,
  timing question, route comparison, reversible preview, or local order window
```

For this LS20 family, a 5/5 attempt likely needs:

```text
B/A teleport consequence is forecastable and choice-bearing,
not merely a sealed-room route.

or

D's jam position creates a local order window instead of a single forced chain.

or

normal teleport and fallback interact in a way where the player must choose
which portal affordance to invoke from the same local structure.
```

The hard-chain reclassification demonstrates a limited diagnostic route:

```text
search the casebook / variant pool for an already strong chain
where the target slot is present as a central substructure.

This can reveal that the slot is representable by a richer structure,
but it is not a substitute for over-generating and selecting from a broad candidate pool.
```
