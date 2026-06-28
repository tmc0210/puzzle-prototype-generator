# Multi-Agent Review Experiment 01

Purpose: test whether lightweight reviewer agents can prevent the Designer from self-accepting a weak level.

Calibration sample: `stress_v3_true_fallback_application`, previously overclaimed as a guided application.

## Candidate

```text
#########
#@  #####
### ### #
#  A G ##
### ### #
#  B ####
#########
```

Designer claim:

```text
intended_role: guided_application
causal_chain:
  - Player walks to the cell above A.
  - Player enters A downward.
  - B's downward exit is blocked by wall terrain.
  - A does not teleport the player; blocked-exit fallback pushes A downward.
  - A's original cell becomes empty.
  - The player walks through A's original cell to reach G.
why_not_discovery:
  - Player needs to understand that fallback moves A and use A's original cell as a doorway.
```

Analyzer report:

- [layout_analysis_stress_v3_true_fallback_application.md](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_stress_v3_true_fallback_application.md)
- Complete graph, 14 reachable states, 1 win state.
- Shortest solution: `right right down down down right right`.
- Only non-walk event: `portal_enter`, `portal_exit_blocked`, `portal_fallback_push`.
- Without blocked portal fallback: unsolvable.
- No target-event bypass found.

## Mechanic Evidence Reviewer

Verdict: `supports_discovery_only`

Supported claims:

- The trace supports entering A from above.
- The trace supports fallback moving A downward.
- The trace supports A's original cell becoming open.
- The found solution walks through that opened route to G.
- Complete counterfactual search supports fallback necessity.

Overstated claims:

- `guided_application` is not supported by trace.
- Necessity does not imply guided use.
- The trace does not show choice, setup, prior knowledge, or intentional timing.
- The player may simply follow the only available corridor and witness the mechanism.

Reviewer requirement for application:

- Show plausible alternatives where intentional fallback use matters.
- Let the player inspect or predict the blocked exit.
- Require deliberate positioning or direction choice, not only forced corridor motion.

## Puzzle Design Critic

Verdict: `discovery_witness`

Critique:

- The level is an event display box, not an application puzzle.
- The fallback event occurs on the only forward path.
- The player does not need to decide which direction to trigger fallback, why A must move, or what key cell it opens.
- State consumption is natural and immediate; that does not make it application.
- The structure is readable but over-constrained and too straight.

Revision request:

- Keep the idea that A must be moved out of a key cell.
- Add a reason for the player to want A moved before triggering it.
- Add at least one meaningful wrong or non-progressing trigger direction/position.
- Make the player choose, construct, or time the fallback use.
- Avoid a pure corridor that forces the event.

## Curator Decision

Classification: `witness_fixture`, not `mainline_guided_application`.

Reason:

Both independent reviewers rejected the Designer's role claim. The analyzer supports event necessity and state consumption, but the reviewers correctly distinguish that from application. This confirms that the multi-agent review step catches a failure that the single-agent Designer previously missed.

## Workflow Result

The lightweight multi-agent process was useful.

What worked:

- Evidence Reviewer did not judge aesthetics; it strictly separated trace-supported facts from role overclaim.
- Puzzle Critic independently identified the same role error from a player-experience perspective.
- Both reviewers converged on the same downgrade.
- The process prevented an analyzer-passing witness from entering the mainline as application.

Next test:

Run the same process on a newly designed replacement for the true fallback application slot. The Designer must first propose a concrete chain where the player chooses, constructs, or times fallback use.
