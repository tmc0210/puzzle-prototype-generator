# Multi-Agent Review Experiment 02

Purpose: positive-control calibration for the lightweight reviewer loop.

Experiment 01 checked whether reviewers could reject an analyzer-passing but overclaimed witness. This experiment checks the opposite direction: whether the same review pattern can pass a strong candidate instead of acting as a pure rejection machine.

Calibration sample: `dry_v2_s07_reuse_fallback_challenge`.

## Candidate

```text
#####   ##
#G C   A #
#### ## ##
##B# #####
#@ #######
##########
```

Designer claim:

```text
intended_role: challenge / advanced combination
targets:
  - K_portal_teleports_player
  - K_pull_single_crate
  - K_blocked_portal_pushes_entrance
causal_chain:
  - Player first uses B -> A as an ordinary teleport to reach the upper corridor.
  - Player pulls C right so C approaches A.
  - Player enters A; B's exit is blocked, so A does not teleport the player and is pushed right by fallback.
  - A's movement changes the upper corridor and enables continued handling of C.
  - Player loops to the other side of C and pulls C left toward G.
role_claim:
  - A is reused as ordinary portal, movable fallback object, and spatial modifier.
  - C's position and A's movement are causally coupled, not two independent required events.
```

Analyzer report:

- [layout_analysis_dry_v2_s07_reuse_fallback_challenge.md](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_dry_v2_s07_reuse_fallback_challenge.md)
- Complete graph, 58 reachable states, 115 legal transitions, 1 winning state.
- Shortest solution cost: 18.
- Event counts: `walk=9`, `portal_enter=2`, `portal_teleport=1`, `pull_crate=7`, `portal_exit_blocked=1`, `portal_fallback_push=1`.
- Counterfactuals:
  - without pull: unsolvable.
  - without blocked portal fallback: unsolvable.
  - without portal teleport: unsolvable.
- Target event checks found no shortest or winning bypass for teleport, pull, or fallback.

## Mechanic Evidence Reviewer

Verdict: `supports_with_caveats`

Evidence quality: `4/5`

Supported claims:

- The full search supports all three target mechanisms as necessary.
- The shortest solution contains ordinary teleport, pull, blocked portal, and fallback push events.
- Fallback is not decorative: after A is pushed, the solution immediately continues pulling C, so the changed state is consumed later.
- Complete bypass checks strengthen the claim that the target mechanisms are not optional.
- The trace supports a causal relation between C being pulled near A, A being moved by fallback, and C then being handled again.

Caveats:

- Analyzer evidence does not by itself prove `advanced challenge`.
- It supports necessary mechanism combination more strongly than human-facing challenge depth.
- More detailed coordinate evidence would better show exactly which post-fallback C positions depend on A's movement.
- The small reachable graph may indicate a tight scripted application rather than a broad challenge.

Evidence-only role reading:

`application / constrained combination puzzle`, with challenge tendency. It is not a simple discovery or witness, but the exact strength of the challenge claim depends on how much active planning the player must do.

Requested follow-up checks:

- Show fallback-before and fallback-after local graph effects.
- Track C coordinates across pulls to prove A/C coupling.
- Inspect winning traces for whether fallback timing and location are essentially fixed.

## Puzzle Design Critic

Verdict: `strong_mainline_candidate`

Role fit: `challenge`

Quality score: `5/5`

Strongest merits:

- The level combines teleport, pull, and fallback instead of merely showing them in sequence.
- A is reused elegantly: ordinary teleport structure first, movable fallback object later, and then spatial modifier for the pull route.
- C is a state variable in the chain, not just cargo.
- Counterfactuals support the design intent because disabling any core mechanism makes the level unsolvable.
- The level is compact and focused; the critic judged the 18-step solution and 58-state graph appropriate for an advanced challenge.

Risks:

- The level assumes prior teaching of blocked portal fallback.
- If the visual consequence of moving A is unclear, players may experience the fallback as trial-and-error.
- Its tightness is a strength, but it leaves little onboarding margin.

Revision request:

- Do not make major changes.
- Only consider a tiny visual-clarity adjustment if playtests show that players miss how A's moved position changes C handling.
- Place it after a prior level where blocked portal fallback was already actively used.

## Curator Decision

Classification: `mainline_candidate_with_evidence_caveats`.

Reason:

The positive-control test passed. The evidence reviewer did not overclaim: it accepted the causal evidence while reserving judgment on how advanced the challenge is. The puzzle critic independently gave a high design score and classified the level as a strong mainline candidate.

This is the desired split of responsibility:

- Evidence reviewer checks whether analyzer traces support concrete causal claims.
- Puzzle critic judges player-facing design quality and role fit.
- Curator integrates both, preserving caveats instead of flattening them into a single pass/fail.

## Workflow Result

The multi-agent review loop now has both a negative and positive calibration sample.

Validated behavior:

- Experiment 01: reviewers rejected an overclaimed discovery/witness.
- Experiment 02: reviewers accepted a strong candidate.

Open calibration questions:

- Evidence reports should include object coordinates for important state changes, especially when claiming two objects are causally coupled.
- Review prompts should remain generic and prototype-parameterized; they should not contain rejection-biased language aimed at the last failure mode.
- Future campaign generation should treat reviewer output as structured evidence for curator decisions, not as a replacement for analyzer facts or human taste.
