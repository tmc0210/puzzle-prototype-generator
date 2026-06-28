# Multi-Agent Two-Crate Experiment 01

Purpose: test the multi-agent review loop on a new requirement introduced by the multi-instance object model:

```text
At least two distinct ordinary crate lineages should participate in the winning solution.
```

This was intentionally run as a real candidate review, not as a hand-authored calibration fixture.

## Workflow

1. A designer agent proposed a compact two-crate combination candidate from rules and design intent only.
2. The controller ran the analyzer.
3. Two reviewer agents independently judged the evidence:
   - Mechanic Evidence Reviewer
   - Puzzle Design Critic
4. The curator integrated the evidence and reviewer results.

## Designer Candidate

Candidate: `multiagent_two_crate_designer_candidate`

```text
#########
#@  C  G#
### # ###
#   A   #
# ### #B#
# C     #
#########
```

Designer claim:

```text
intended_role: combination

C_top:
  clears the final route to G

C_bottom:
  is pulled into B's exit position,
  causing A to fallback instead of teleporting

object_participation:
  distinct crate lineages >= 2
```

## Analyzer Evidence

Report was generated with:

```text
npx tsx src/cli.ts explain-layout prototypes/pull_portal_fallback - --id multiagent_two_crate_designer_candidate --role combination --targets K_pull_single_crate,K_use_crate_to_block_portal_exit,K_move_portal_to_open_path --win player_on_goal
```

Summary:

- Solved: yes.
- Cost: 12.
- Complete graph: 157 reachable states, 263 legal transitions, 6 winning states.
- Shortest solution events:

```text
walk walk walk walk
portal_enter:A
portal_exit_blocked:A->B
portal_exit_blocked_by_wall
portal_fallback_push:A
walk
portal_enter:A
portal_exit_blocked:A->B
portal_exit_blocked_by_wall
portal_fallback_push:A
walk walk walk
pull_crate:crate#1
pull_crate:crate#1
```

Object participation:

```text
crate/moved via pull_crate:
  distinct=1
  instances=crate#1
  events=2

portal/entered via portal_enter:
  distinct=1
  instances=A
  events=2

portal/moved via portal_fallback_push:
  distinct=1
  instances=A
  events=2
```

Counterfactuals:

```text
without_pull: solvable yes, cost 12
without_blocked_portal_push: unsolvable
without_portal_teleport: solvable yes, cost 12
```

Important evidence reading:

- The two fallback pushes are caused by `portal_exit_blocked_by_wall`, not by a crate.
- Only one crate lineage is moved.
- The lower crate is not used in the returned winning solution.
- Pull is not necessary under the current counterfactual model, because `without_pull` remains solvable.
- Current legacy target event checks overclaim because `portal_exit_blocked` does not distinguish wall-blocked and crate-blocked exits.

## Mechanic Evidence Reviewer

Verdict: `does_not_support_claim`

Evidence quality: `4/5`

Supported claims:

- The puzzle is solvable.
- Portal fallback is mechanically important: disabling blocked-exit fallback makes the level unsolvable.
- A is entered and fallback-pushed.
- Some crate movement occurs late.

Unsupported / overclaimed claims:

- Distinct crate lineages >= 2 is not supported; analyzer reports only one moved crate lineage.
- `C_bottom` does not block B's exit.
- The fallback trigger is wall-blocked, not crate-blocked.
- The final route-clearing crate role is unsupported because `without_pull` is still solvable.
- The claimed crate/portal combination is overclaimed.

Object participation claim:

```text
fail
```

Recommended classification:

```text
reject as combination / two-crate lineage
possible reclassification: wall-blocked fallback candidate
```

## Puzzle Design Critic

Verdict: `reject`

Role fit: `other`

Quality score: `2/5`

Merits:

- Compact.
- Solvable.
- Cheap to iterate.
- Could be useful only as a tiny wall-blocked fallback fixture.

Design failures:

- The two-crate premise is absent from player experience.
- The lower crate is decorative.
- Fallback is caused by walls, not by constructed crate blockage.
- `without_pull` being solvable at the same cost removes the intended pull/crate role.
- Six win states suggest the intended causal reading is not enforced.

Revision advice:

- Make object participation report both crate lineages.
- Make fallback trigger specifically crate-blocked, not wall-blocked.
- Removing either crate should break the solution or change the role claim.
- The upper crate must clear access or a later operation route.
- The lower crate must be deliberately placed to create the fallback condition.

## Curator Decision

Classification: `reject`.

Reason:

Both reviewers independently rejected the slot claim. The analyzer directly refutes the central requirement:

```text
required: distinct moved crates >= 2
observed: distinct moved crates = 1
```

It also refutes the claimed trigger source:

```text
claimed: portal exit blocked by crate
observed: portal exit blocked by wall
```

This candidate must not enter the mainline, variant pool, or positive fixture set for two-crate participation. It may be kept only as a negative fixture showing that textual design intent is insufficient.

## Workflow Implication

This experiment exposed a process flaw:

```text
designer agent without analyzer access
-> plausible causal-chain prose
-> invalid runtime behavior
```

For future generalized workflow, a designer cannot be a pure text-only role when the rules are spatial, directional, and exception-heavy.

Revised requirement:

```text
tool-using designer:
  must run analyzer on each candidate before making a slot claim

or

controller-mediated designer:
  designer proposes a draft
  controller runs analyzer
  analyzer evidence is returned to designer
  designer revises before reviewer review
```

Reviewers remain valuable, but they should review candidates that have already passed a designer-side evidence sanity check. Otherwise the multi-agent loop spends reviewer effort catching errors that a local analyzer call would have caught immediately.

## Calibration Value

This is a useful negative-control sample for the multi-instance object model:

```text
negative_fixture:
  designer claims two-crate participation
  analyzer reports one crate lineage
  reviewers reject
```

It validates:

- Object participation reporting is useful.
- Evidence reviewers can catch object-lineage overclaims.
- Puzzle critics can identify decorative objects and role mismatch.
- Legacy event checks are too weak for crate-blocked portal claims unless object-specific blocker events are required.
