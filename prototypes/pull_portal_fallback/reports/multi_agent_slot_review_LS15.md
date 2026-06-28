# Multi-Agent Slot Review: LS15 Construct Then Exploit

Purpose: test the multi-agent review loop on a real campaign slot, not on a calibration fixture.

Slot: `LS15_construct_then_exploit`

Intended role: `combination`

Target pattern: `P_construct_trigger_then_exploit`

Expected player-facing idea:

```text
The player first constructs a trigger condition,
then exploits that condition to change spatial state.
```

For this prototype, the concrete interpretation is:

```text
Pull C into B's exit position
-> C blocks the paired portal exit
-> entering A now triggers blocked-exit fallback
-> A moves out of the doorway
-> the player reaches G
```

## Candidate

Candidate: `stress_v3_distinct_medium_combination`

```text
#########
###  ####
#G A@####
### #####
#  B#  ##
#    C ##
#########
```

Designer claim:

```text
intended_role: combination
known_mechanisms:
  - normal directional portal teleport
  - pull single crate
  - blocked-exit fallback
causal_chain:
  - Player starts on the right side of A.
  - Player uses A as a normal portal and lands below B.
  - Player pulls C left twice until C blocks B's downward exit.
  - Player enters B to return to the right side of A.
  - Player moves above A and enters A downward.
  - Because C blocks B's downward exit, A is pushed downward by fallback.
  - A's original cell opens the path to G.
chain_delta_from_previous:
  compared_to: dry_v2_s07_reuse_fallback_challenge
  difference: S07 uses fallback to extend or change the later C-pulling lane. This candidate uses C to construct the remote blocker, then uses fallback as the final door opener.
```

Analyzer report:

- [layout_analysis_stress_v3_distinct_medium_combination.md](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_stress_v3_distinct_medium_combination.md)
- Complete graph, 45 reachable states, 91 legal transitions, 1 winning state.
- Shortest cost: 14.
- Event counts: `walk=9`, `portal_enter=3`, `portal_teleport=2`, `pull_crate=2`, `portal_exit_blocked=1`, `portal_fallback_push=1`.
- Counterfactuals:
  - without pull: unsolvable.
  - without blocked portal fallback: unsolvable.
  - without portal teleport: unsolvable.
- Target event checks found no winning bypass for teleport, pull, or fallback.

## Mechanic Evidence Reviewer

Verdict: `supports_claim`

Evidence quality: `4/5`

Supported claims:

- The winning trace uses all three target mechanisms.
- Complete counterfactuals show each target mechanism is necessary.
- The event order supports construct-then-exploit: two `pull_crate` events occur before `portal_exit_blocked` and `portal_fallback_push`.
- Step 11 supports the claim that C blocks B's exit, causing A to fallback instead of teleport.
- After fallback, A's old cell becomes empty and the route to G opens.

Overstated or imprecise claims:

- The phrase "C occupies or approaches B's exit" should be tightened to "C blocks B's downward exit."
- The analyzer does not yet prove a full dependency partial order over all winning paths, though the current trace and complete counterfactuals are strong enough for the slot claim.

Role reading:

```text
discovery: not primary
application: supported
combination: supported
challenge: not supported by evidence alone
```

Novelty versus S07: `distinct_chain_supported`

Reason:

S07 uses fallback to change or extend the later C-pulling lane. This candidate uses C earlier as a remote trigger constructor, then uses fallback to open A's doorway. The direction of causality and the role of C differ.

Requested future checks:

- Report exact object coordinates at key snapshots, especially C after the second pull and B's blocked exit cell before fallback.
- Optionally test all winning traces for the event-order dependency `pull_crate -> portal_exit_blocked -> portal_fallback_push -> opened G route`.

## Puzzle Design Critic

Verdict: `strong_mainline_candidate`

Role fit: `combination`

Quality score: `5/5`

Strongest merits:

- The causal chain is clear and matches `construct_trigger_then_exploit`.
- C is a remote condition constructor, not a final-path cargo object.
- A changes role from portal entrance to movable door.
- The event structure is compact: two teleports, two pulls, one fallback.
- G being visibly near but blocked by A gives the player a strong reason to ask how to move A.

Risks:

- The level is a refined combination miniature, not a high-pressure challenge.
- It assumes the player already understands blocked portal fallback.
- Visual clarity depends on whether the player can read B's relevant exit side.

Comparison to S07:

`same-family mechanism, distinct mainline chain`

The critic judged it suitable as an independent mainline chain, not a weak copy of S07.

Revision request:

- No structural change required.
- Only verify visual readability of B's exit side and C's blocker role.

## Curator Decision

Classification: `accept_for_LS15_with_evidence_caveats`.

Reason:

Both reviewers accepted the slot claim. The evidence reviewer supports the concrete construct-then-exploit chain and novelty versus S07. The design critic rates it as a strong mainline candidate for combination, while correctly not promoting it to challenge.

This is a useful real-slot test of the multi-agent loop:

- It is not a negative fixture.
- It is not the known positive calibration fixture.
- It evaluates whether a candidate can fill a specific curriculum slot.
- It preserves the distinction between hard evidence, design quality, and curator placement.

## Tooling Implications

This review exposed two analyzer/reporting upgrades that would help future generalized workflows:

1. Key snapshots should include object coordinates for all named causal objects.
2. When full graph search is available, the analyzer should optionally report event-order constraints over all winning paths, not only one shortest trace and counterfactual solvability.

These are generic improvements. They are not specific to pull, portals, or fallback.
