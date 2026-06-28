# Multi-Agent Two-Crate Experiment 02

Purpose: rerun the two-crate participation experiment with a tool-using designer.

Experiment 01 showed that a text-only designer can produce a plausible causal chain that analyzer immediately refutes. This experiment checks whether giving the designer analyzer feedback improves candidate quality before reviewer review.

## Workflow

1. A tool-using designer was instructed to run `explain-layout` before making a slot claim.
2. The designer iterated privately and submitted a candidate that passed the basic analyzer sanity checks.
3. The controller independently reran analyzer and wrote the report.
4. Two reviewer agents judged the candidate:
   - Mechanic Evidence Reviewer
   - Puzzle Design Critic
5. The controller added object-removal probes and made the curator decision.

## Candidate

Candidate: `two_crate_participation_candidate`

```text
#########
###    ##
#G AC@ ##
### #####
#  B#  ##
#    C ##
#########
```

Analyzer report:

- [layout_analysis_two_crate_participation_candidate.md](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_two_crate_participation_candidate.md)
- [layout_analysis_two_crate_participation_candidate.json](D:/Developer/sokoban/prototypes/pull_portal_fallback/reports/layout_analysis_two_crate_participation_candidate.json)

## Designer Claim

Intended role: `combination`

Concrete chain:

```text
crate#1 starts near A's right-side return landing.
-> Player pulls crate#1 right once, clearing the later B -> A return area.
-> Player enters A from above and teleports to B's lower region.
-> Player pulls crate#2 left twice until it blocks B's downward exit.
-> Player enters B and returns to A's right side.
-> Player returns above A and enters A downward.
-> B's downward exit is blocked by crate#2.
-> A fallback-pushes downward.
-> A's old cell opens the path to G.
```

Object participation claim:

```text
crate/moved distinct >= 2
crate#2 blocks portal exit
```

## Analyzer Evidence

Summary:

- Solved: yes.
- Cost: 17.
- Complete graph: 95 reachable states, 190 legal transitions, 2 winning states.
- Counterfactuals:
  - without pull: unsolvable.
  - without blocked portal fallback: unsolvable.
  - without portal teleport: unsolvable.

Shortest solution events include:

```text
pull_crate:crate#1
portal_enter:A
portal_teleport:A->B
pull_crate:crate#2
pull_crate:crate#2
portal_enter:B
portal_teleport:B->A
portal_enter:A
portal_exit_blocked:A->B
portal_exit_blocked_by_crate:crate#2
portal_fallback_push:A
```

Object participation:

```text
crate/moved via pull_crate:
  distinct=2
  instances=crate#1, crate#2
  events=3

crate/blocked_portal_exit via portal_exit_blocked_by_crate:
  distinct=1
  instances=crate#2
  events=1

portal/entered via portal_enter:
  distinct=2
  instances=A, B
  events=3

portal/moved via portal_fallback_push:
  distinct=1
  instances=A
  events=1
```

Target checks:

```text
No shortest or winning bypass was found for:
  - pull_crate
  - pull_crate + portal_exit_blocked
  - portal_fallback_push
```

## Object-Removal Probes

These are not yet formal per-object counterfactuals. They are manual diagnostic probes.

### Remove Top Crate

Probe layout:

```text
#########
###    ##
#G A @ ##
### #####
#  B#  ##
#    C ##
#########
```

Result:

- Solved: yes.
- Cost: 15.
- Complete graph: 65 reachable states.
- Core chain still works with the remaining crate as the portal-exit blocker.

Interpretation:

`crate#1` in the original candidate is a real trace participant, but not a necessary resource under object removal. It is closer to a local obstruction / return-landing cleanup step than to a deep second causal resource.

### Remove Bottom Crate

Probe layout:

```text
#########
###    ##
#G AC@ ##
### #####
#  B#  ##
#      ##
#########
```

Result:

- Solved: no.
- Complete graph: 32 reachable states.
- Winning states: 0.

Interpretation:

The bottom crate role is strong. It is required to construct the portal-exit blocker.

## Mechanic Evidence Reviewer

Verdict: `supports_with_caveats`

Evidence quality: `5/5`

Supported claims:

- Trace-level `crate/moved distinct >= 2` is supported.
- `crate#2` has a strong role: it is moved to create `portal_exit_blocked_by_crate:crate#2`, and removing it makes the puzzle unsolvable.
- `portal_fallback_push:A` is supported by the shortest trace and counterfactual search.
- `crate#1` is supported as an existing-layout obstruction that must be cleared in the original candidate trace.

Unsupported / caveated claims:

- If the claim implies both crates are independently necessary resources, that is overclaimed.
- The removal probe weakens per-object necessity for `crate#1`: deleting the upper crate leaves the puzzle solvable.
- `crate#1` should be described as "must be cleared when present", not "essential to the puzzle's core mechanism".

Object participation verdict:

```text
pass for trace participation
weak / fail for strict per-object necessity
```

Recommended classification:

```text
two_crate_participation_candidate with caveat
```

Reviewer caveat:

```text
This is a two-crate moved-in-trace combination case,
not a robust two-crate necessary-resource case.
```

## Puzzle Design Critic

Verdict: `variant_only`

Role fit:

```text
application with a combination surface
```

Quality score: `3/5`

Strongest merits:

- `crate#2` has a strong role; deleting it makes the level unsolvable.
- The crate-blocked fallback chain is clean.
- The trace does show two moved crate lineages.

Design risks:

- `crate#1` is weakened by the removal probe: deleting it leaves the core chain solvable.
- The player may experience the level as one key crate plus one obstruction.
- As a mainline representative of "two same-type objects with different causal roles", it may send a muddy teaching signal.

Revision advice:

- Keep as variant or reinforcement, not as strong mainline.
- To upgrade, make `crate#1` an indispensable state-shaping resource:
  - a return support,
  - a landing controller,
  - a second blocker,
  - or an object whose final position is consumed later.

## Curator Decision

Classification: `variant_pool / promising_two_crate_candidate_with_role_caveat`.

Reason:

The candidate passes the new formal-ish trace gate:

```text
crate/moved distinct >= 2
portal_exit_blocked_by_crate occurs
pull / teleport / fallback are counterfactually necessary
```

However, the design critic and removal probe correctly show that trace-level participation is weaker than strong two-object design. `crate#1` is moved in the winning trace, but deleting it does not break the puzzle. Therefore this is not yet a strong mainline example of two same-type objects with distinct indispensable causal roles.

This distinction is exactly why multi-agent review remains useful even after analyzer checks pass:

```text
analyzer:
  confirms trace-level object participation

evidence reviewer:
  confirms claim support with caveats

design critic:
  identifies weak player-facing object role

curator:
  accepts into variant pool, not mainline
```

## Workflow Result

Tool-using designer was a significant improvement over text-only designer.

Experiment 01:

```text
text-only designer
-> distinct crate claim failed
-> portal blocker source was wrong
-> reviewers rejected
```

Experiment 02:

```text
tool-using designer
-> distinct crate trace claim passed
-> crate-blocked fallback source passed
-> reviewers found subtler role-quality caveat
```

Updated workflow rule:

```text
designer-side analyzer sanity check is mandatory
```

But analyzer sanity is not sufficient for mainline placement:

```text
trace participation != strong object-role design
```

## Next Tooling Implication

The next analyzer/reporting upgrade should support object-role counterfactuals or object-removal probes as first-class diagnostics:

```text
remove / ignore one object instance
-> rerun solvability
-> report whether the claimed role is indispensable
```

For indistinguishable objects, this must be treated carefully:

- Removing an instance is a diagnostic, not always a formal proof.
- It can still reveal whether the design relies on "two objects" or only on "one key object plus extra clutter".
