# Current Level Design And Review Standard

Status: provisional standard for level design, candidate review, and campaign placement. This is not the full project workflow standard.

This document intentionally covers the part of the project that starts after a prototype has enough confirmed rules, runtime behavior, and analysis tooling to design candidate levels. It does not replace the broader chain:

```text
user brief
-> agent preflight
-> mechanism IR / runtime
-> PuzzleScript Next export
-> solver / analyzer / formal evaluator hooks
-> player abilities / curriculum draft
-> level design and review
-> campaign selection
-> reports / playable package
-> future skill / plugin packaging
```

The broader chain is still distributed across docs such as `00-prototype-package.md`, `01-engine-and-scope.md`, `09-agent-preflight.md`, and `11-design-consensus-and-skill-notes.md`.

## Scope

This level-design workflow is mechanism-independent. Examples from `pull_portal_fallback` are case studies, not built-in assumptions.

Before applying it to a new prototype, the controller must confirm:

- player-facing win condition;
- object vocabulary and instance semantics;
- movement / action inputs;
- interaction order and unspecified edge cases;
- intended campaign size and rough role mix;
- which mechanisms are central, incidental, or boundary-only.

If these are not confirmed, the agent should ask or explicitly mark them as assumptions before generating serious candidates. If an open decision affects runtime behavior, solver soundness, or the intended slot, serious level design should stop.

## Roles

```text
main-thread lead designer:
  owns the design, reads analyzer evidence, revises candidates, and makes final placement decisions.

solver / analyzer:
  code tools. They report solvability, traces, events, object participation, graph/SCC facts, counterfactuals, and bypass evidence.

formal_evaluator:
  code hard-gate over declared evidence contracts. It can pass/fail/unknown only concrete facts. It does not judge fun, role, elegance, or curriculum fit.

evidence_reviewer:
  LLM/human reviewer. It checks whether analyzer/evaluator evidence supports the designer's concrete claim.

puzzle_design_critic:
  LLM/human reviewer. It attacks player-facing role fit, elegance, redundancy, repetition, and placement risks.

LLM player:
  future optional diagnostic. It is not part of the current acceptance gate.
```

`evaluator`, `reviewer`, and `critic` must not be collapsed into one vague quality oracle.

## Main Workflow

The validated level-design workflow is two nested loops plus campaign placement.

```text
0. preflight
   confirm rules, win condition, edge cases, object instances, and player model

1. slot viability
   inspect the intended level role / slot
   merge, rewrite, defer, or reject bad slots before designing maps

2. choose candidate generation mode
   fresh_chain
   reuse_strengthen
   refine_existing
   structural_redesign
   seed_or_witness_factory

3. designer inner loop
   write concrete causal_chain
   build compact layout
   treat layout size as an adjustable design variable, not a fixed constraint
   run solver / analyzer / formal_evaluator
   read trace, snapshots, counterfactuals, and graph facts
   answer the routed taste probes with concrete mechanism-language evidence
   revise, defend with failed attempts, downgrade, or discard
   repeat until hard evidence supports the claim or the attempt is abandoned

4. reviewer outer loop
   send only evidence-supported candidates to evidence_reviewer and design_critic
   critic attacks the relevant taste probes, not just analyzer pass/fail
   main-thread designer responds to each serious attack:
     accept_and_revise
     defend_with_attempts
     downgrade_or_hold
     reject_and_redesign
   any edited candidate returns to step 3

5. campaign placement gate
   compare against accepted and held candidates
   reject duplicate fills, uncoupled repeated subproblems, and slot relabeling
   keep only candidates with a real role in the campaign

6. over-generate then select
   keep more good candidates than the target count
   choose the final sequence only after group-level rhythm, novelty, and coverage are visible
```

The loop is not:

```text
slot -> map -> analyzer pass -> reviewer score -> accept
```

That shortcut is a known failure mode.

## Slot Viability Gate

Do not design maps for a bad slot. First check whether the slot has a real player-facing role.

A level role is not just a label. It must include:

```text
known_before:
  what the intended player already knows

target:
  what the level introduces, practices, combines, or challenges

support_level:
  how much the layout guides the player

evidence_contract:
  what hard evidence, graph evidence, reviewer evidence, or future LLM-player
  evidence would support the role
```

Viability questions:

- Does this mechanism / ability / pattern actually need this level role?
- Is this slot just a renamed part of an already accepted candidate?
- Is it a boundary / failure / constraint that should be embedded in a positive puzzle instead of becoming a standalone mainline level?
- Can the target be expressed as a consumed causal responsibility, or only as an event witness?
- Does the slot require upstream work in `ruleset -> abilities -> curriculum` before level design can proceed?

Actions:

```text
clean:
  design a candidate.

rewrite:
  restate the slot as a concrete player-facing task before designing.

merge:
  combine with a neighboring role or existing target.

defer:
  keep as backlog until upstream curriculum / ability work is clearer.

fixture_only:
  use only as a mechanism witness, analyzer test, or reviewer calibration sample.

reject:
  do not spend design effort on this slot.
```

Boundary or negative facts are allowed as part of a puzzle, but they should not automatically become positive teaching targets. A failure event can be a probe, fairness guardrail, or counterfactual check without occupying a mainline level slot.

## Required Candidate Packet

Every serious candidate sent to reviewers or campaign placement must carry enough structured context to prevent relabeling and overclaiming.

Minimum packet:

```text
prototype_context:
  confirmed win condition
  relevant rules and interaction order
  object / event instance semantics relevant to this claim
  graph completeness or budget status

slot_brief:
  intended_role
  known_before
  target claims
  support_level
  slot_viability result

candidate_identity:
  candidate_id
  candidate_mode
  origin:
    fresh / reuse_strengthened_from:<id> / refined_from:<id> /
    structural_redesign_for:<slot_or_insight> / seed_or_witness
  variant_family, if known

design_claim:
  concrete causal_chain:
    Do not write only the returned event sequence.
    Describe the puzzle relationship: what changes, what is reused, what is
    reinterpreted, and why the required actions are more than route execution.
    Analyzer events and counts are evidence for the chain, not the chain itself.
  consumed_state_changes
  chain_delta_from_previous, if applicable
  why_mainline_not_hold, if asking for mainline placement

evidence:
  solver/analyzer commands or report references
  solution trace
  key snapshots or state changes
  event evidence
  object participation evidence, if claimed
  SCC / graph facts, if complete graph is available
  counterfactuals or bypass checks, if available

taste_probe_answers:
  only the routed probes relevant to this candidate

known_caveats:
  role uncertainty, graph incompleteness, possible family overlap, or reviewer risks
```

If this packet is missing for a serious candidate, do not ask reviewers to rescue it. Send it back to the lead designer loop.

## Evidence Claim Hygiene

Hard evidence must be scoped. Do not turn a weak trace observation into a broad design claim.

Rules:

- Distinguish event patterns from event instances. A generic event pattern can prove that a type of event occurred; it cannot prove that a named object or pair caused it.
- Distinguish event counts from object participation. Repeating an action twice does not prove two distinct object instances participated.
- Distinguish trace evidence from all-solution evidence. A returned solution trace supports only that solution unless the graph evidence explicitly proves a broader scope.
- Distinguish complete graph facts from budgeted search facts. If graph search is incomplete, graph-dependent claims are `unknown`, not `pass`.
- If a claim names a source object, blocker, exit, relation, or state change, require source-specific evidence when the analyzer can provide it.
- Counterfactuals and bypass checks must state their scope. A local no-bypass check is not a proof of all possible player behavior.
- `event_occurs`-style wins are acceptable for mechanism witnesses and fixtures, but they are not player-facing mainline win conditions unless the prototype's confirmed win condition says so.
- Analyzer pass proves hard facts, not role fit, teaching quality, or fun.

## Candidate Generation Modes

```text
fresh_chain:
  Design a new core causal chain for the slot.

reuse_strengthen:
  Start from an already good level as an immutable base. Reuse an existing element,
  state change, or tail segment and give it a new necessary causal responsibility
  that is later consumed by the solution.

refine_existing:
  Repair a specific flaw in the same candidate after reading analyzer evidence
  or reviewer attacks. This is not a new candidate family.

structural_redesign:
  Stop local repair and design a new causal-chain family for the same slot,
  target insight, or caveat. Use this when the current family keeps producing
  useful but capped candidates.

seed_or_witness_factory:
  Produce minimal structures that prove a mechanism can happen or feed later design.
  These can become fixtures or raw material, but they are not application/challenge
  levels by default.
```

`reuse_strengthen` is a first-class generation mode. It is often the best way to grow a strong puzzle because it preserves a working structure while asking whether an existing element can gain a second, later-consumed role.

Valid `reuse_strengthen` flow:

```text
1. Keep the base level immutable.
2. Read its solution trace, key snapshots, and graph evidence.
3. Pick an existing object, state change, route, lock, or tail segment.
4. Assign a new causal responsibility to it.
5. Make the smallest layout change that could make that responsibility necessary.
6. Rerun solver / analyzer / evaluator.
7. Check that the old core still works and the new responsibility is necessary.
8. Submit as a strengthened candidate only if the new responsibility is consumed later.
```

Invalid versions:

- adding walking distance;
- moving the goal;
- rotating, mirroring, translating, or resizing;
- appending a second unrelated puzzle after the old one;
- repeating the same operation without changing later meaning.

## Local Repair Stop Rule

Local repair is useful for fixing a concrete flaw in an otherwise promising candidate. It is not an infinite quality machine.

```text
local repair:
  preserves the same causal-chain family.
  Examples: adjust start, remove clutter, shorten execution, close a bypass,
  make a claimed event necessary.

structural redesign:
  preserves the target insight or slot but creates a new causal-chain family.
  Examples: turn a weak repeated action into a choice, timing question,
  local order window, shared dependency, route comparison, or role switch.
```

Stop local repair when:

- repeated edits keep producing the same caveat;
- reviewer repeatedly returns strong-but-capped judgments;
- changes are only local geometry, presentation, or start-state tweaks around the same forced script;
- the candidate is valid but cannot support the intended role without a new chain.

Then either accept the best local version with caveats, hold it as related material, or start `structural_redesign`. Do not keep micro-editing a 4/5 family while pretending it is converging to a different kind of puzzle.

## Variant Vocabulary

`variant` is a relationship between candidates, not a quality grade and not an automatic reserve pool.

```text
variant_family:
  A group of candidates sharing the same core insight, causal skeleton,
  object roles, or player-facing solution posture.

transform_clone:
  Rotation, mirror, translation, goal shift, size change, route length change,
  or cosmetic relabeling. This is not valid new design work.

stitched_extension:
  An old level with another independent segment attached. If the new segment
  does not change the old structure's meaning, this is not a valid strengthened variant.

strengthened_variant:
  A valid advanced variant. It gives an existing element, state change, or
  chain segment a new necessary causal responsibility, and that responsibility
  is consumed later.

weakened_variant:
  A shortened, simplified, or decomposed version of a stronger level. It can be
  useful for pacing or teaching, but it cannot automatically coexist with the
  stronger version in the mainline.

fresh_chain:
  A candidate whose core causal chain is not in the same variant_family.
```

The default campaign rule is strict:

```text
one variant_family -> usually one mainline representative
```

Multiple candidates from the same family may enter the final campaign only when the lead designer explicitly justifies all of the following:

- they serve different campaign stages or player models;
- their player-facing solution meanings are substantially different;
- the later level adds a new necessary consumed responsibility, not just length;
- they are spaced and sequenced so the player does not read the later level as padding;
- reviewers and lead designer both answer why this is not lazy slot filling.

Otherwise, even two excellent related candidates should be held together and selected later, not placed into separate slots.

Provenance rule:

- A transformed, shortened, lengthened, or renamed old level cannot be submitted as a fresh candidate.
- A strengthened variant must name its base and chain delta.
- A reclassified held candidate must keep its origin. Do not present it as newly generated work.
- An accepted mainline level should not be taken back to fill another slot unless the campaign plan is explicitly reopened; otherwise it destroys selection slack.
- Held candidates are selection material. They are not a promised future level and not a place to hide weak slot fit.

## SCC Evidence Reading

When a complete graph is available, prefer the SCC condensation view for design reading. It collapses reversible wandering and shows irreversible commitments between mutually reachable state regions.

These terms are evidence vocabulary, not automatic scores:

```text
raw_state_count / scc_count:
  Raw reachable states versus reversible-state regions. A high raw count can be
  mostly harmless wandering if it collapses into few SCCs.

scc edge:
  An irreversible transition from one mutually reachable region to another.

single_win_chain:
  Along the win-reaching SCC subgraph, each solution-prefix SCC has exactly one
  win-reaching continuation. This can mean clean focus, but it can also mean a
  forced script.

branching_win_dag:
  At least one SCC has multiple win-reaching continuations or later merge paths.
  This is evidence to inspect, not automatic multi-solution failure.

initial out/win/dead:
  Irreversible exits from the initial SCC, how many can still reach a win, and
  how many are dead exits.

forced_win_prefix:
  How much of the win-reaching irreversible path is forced. High values are a
  challenge caveat unless the forced steps still carry visible planning,
  resource coupling, or changing interpretation.

tail:
  Inputs after first entering an SCC that already contains a winning state.
  A long tail may be harmless finish movement, incidental busywork, or a sign
  that the win condition / goal placement should be inspected.
```

Reading rules:

- Do not treat `branching_win_dag` as bad by itself. It may indicate a local order window or diamond structure.
- If win-reaching branches merge after completing different necessary state changes, they may be good local order flexibility.
- If branches are recoverable detours, they are not meaningful agency.
- If branches reach different wins without sharing the intended core chain, inspect for bypass or alternative solution families.
- If repeated branches are independent subproblems, campaign placement should usually reject or split them.
- If `single_win_chain` combines with high `forced_win_prefix`, the level may still be good, but challenge claims need extra justification from the causal chain and player-facing reasoning.
- If SCC evidence is unavailable, mark SCC-dependent probes unknown / qualitative.

Lead designer should label interesting win-reaching branches as one of:

```text
local_order_window
recoverable_detour
alternative_solution_branch
independent_subproblem_branch
bypass_risk
```

These labels are design interpretations. They must cite concrete state changes, merge points, trace events, or counterfactuals.

## Reviewer Context And Calibration

Reviewers are useful only when they receive enough context. They do not automatically inherit the main thread's design memory.

Reviewer context must include:

- confirmed win condition;
- relevant rules and interaction semantics;
- player model / known-before for this role;
- role rubric for the current slot;
- designer claim and chain delta;
- analyzer evidence with graph completeness status;
- routed taste probe answers;
- known related candidates or family risks;
- allowed evidence sources and allowed tools.

For each new prototype, calibrate reviewers with at least:

```text
negative fixture:
  analyzer passes but designer overclaims the role, such as witness -> application.

positive fixture:
  a human-accepted or lead-designer-accepted good candidate for this prototype.
```

Calibration checks verdict category and reasoning shape, not exact wording. Positive/negative fixtures from one prototype do not prove reviewers will work on another prototype.

## Taste Probe Integration

Taste notes are not passive reminders. They must enter the loop as a small set of routed structural questions.

They are still not formal evaluator metrics:

```text
formal_evaluator:
  checks declared hard evidence only.

taste probes:
  force designer / critic / lead decision to discuss puzzle structure.
```

Do not hardcode Sokoban objects, wall/crate examples, or generic placeholder vocabulary into these probes. The probe should ask a structural question; the answer must use the current prototype's concrete mechanism language, causal chain, and analyzer evidence.

Bad answer shape:

```text
No affordance is wasted.
The variant is different.
The repeated operation is necessary.
```

Good answer shape:

```text
This candidate reuses the same entrance from the base level, but the moved object now also
opens the later return route. The new route is consumed before the win path, and the
counterfactual without that movement is unsolved.
```

### Probe Router

Each serious candidate should activate only a few relevant probes. Do not ask every question on every level.

```text
fresh_chain:
  causal responsibility
  role fit
  opening commitment, if application / challenge

reuse_strengthen:
  causal responsibility
  strengthened responsibility
  variant family
  repeated operation / coupling, if present

refine_existing:
  original flaw
  repair evidence
  whether the repair introduced padding or clutter

structural_redesign:
  original capped caveat
  new causal-chain family
  whether the old caveat became a new reasoning task

seed_or_witness_factory:
  witness scope
  not application / challenge by default

campaign placement:
  variant family
  role uniqueness
  sequence / pacing justification
```

### Core Structural Probes

Use these as question families, not as a mandatory checklist.

```text
causal responsibility:
  What state change or relationship change is the core of this candidate?
  Where is that change consumed later?
  If it is not consumed, why is this not merely a witness?
  If a salient object, route, entry/exit, relation, or state change appears more
  than once, does its player-facing role change across the chain?
  If yes, describe that role timeline. If no, do not use repetition or event
  count as depth.

strengthened responsibility:
  If this extends an existing good level, which already-existing element,
  state change, or chain segment gained a new necessary responsibility?
  How does the later solution consume that new responsibility?

variant family:
  Does this share the same core insight, causal skeleton, object roles,
  or player-facing solution posture with an existing candidate?
  If yes, why should it not be held for family-level selection?

repeated operation / repeated chain:
  Is the repetition just repeated input/event execution, or a repeated causal subproblem?
  If it is a repeated causal subproblem, how are the repetitions coupled?
  If they are not coupled, should this be split, held, or rejected?

opening commitment:
  Use graph / SCC evidence when available. Report:
    - initial_scc_size
    - initial_scc_exit_count
    - initial_exit_source_distances
    - initial_win_exit_source_distances
    - dead_exits_before_first_win_exit
    - forced_win_prefix, if the SCC reporter provides it
  For application / challenge candidates, does the initial SCC give the player
  nontrivial reversible room before the first win-reaching irreversible commitment?
  If the initial SCC is a single state, or the first win-reaching irreversible exit is
  immediately forced, is that intentional and appropriate for this role?
  If complete graph evidence is unavailable, mark this probe unknown / qualitative;
  do not replace it with a fake metric.

  Role-specific reading:
    - discovery / witness:
        A near-immediate forced commitment can be acceptable, especially when the
        level is meant to show a rule or fixture event. It should not be upgraded
        to application just because the event is necessary.
    - guided_application:
        Some guidance and narrowness are acceptable, but the target use should not
        be merely a one-corridor forced witness. Prefer at least a nontrivial
        initial SCC or nearest win-reaching irreversible exit distance >= 1.
    - independent_application:
        Should normally give the player room to choose, arrange, route, preview,
        or otherwise actively apply known knowledge before the first decisive
        win-reaching commitment. A single forced win-reaching exit from the initial
        SCC is a role-fit caveat unless strongly justified.
    - combination / challenge:
        Opening comfort is not enough. Also inspect whether the later win-reaching
        SCC path is mostly forced. A high forced_win_prefix can be acceptable for
        a compact causal-chain puzzle, but it is a caveat for a broad challenge
        unless the forced steps carry visible planning, resource coupling, or
        changing interpretation.

salient element use:
  Does the candidate emphasize an element that the intended player already expects
  to have a strong role, but then use it only as low-grade filler, blocker, counter,
  or decoration?
  If yes, is that underuse intentional and itself part of the insight?

role fit:
  Does the candidate actually perform its claimed role, or is it a witness,
  forced demonstration, structure sample, or later challenge being relabeled?
```

### Use In The Loop

```text
designer self-check:
  answer the activated probes before reviewer submission.

design critic:
  attack weak, vague, or unsupported probe answers.

lead designer final decision:
  accept the attack and revise, defend with concrete failed attempts / analyzer evidence,
  downgrade to held candidate or fixture, or reject.

campaign placement:
  re-run variant-family and role-fit probes across neighboring accepted / held candidates.
```

If a probe cannot be answered without inventing upstream knowledge, mark that upstream context as missing. Do not synthesize a fake object ontology or knowledge map inside this level-design workflow.

## Candidate Classifications

```text
accept_mainline:
  evidence, role, design quality, and campaign placement all currently fit.

accept_with_caveats:
  usable mainline candidate with recorded caveats that do not invalidate its role.

hold_related_candidate:
  good or interesting candidate that belongs near an existing variant_family,
  fits a different slot, or should wait for group selection. This is selection
  material, not a promised future level.

witness_fixture:
  useful for proving a mechanic, test case, analyzer calibration, or reviewer calibration, but not a player-facing mainline level.

reject:
  central claim fails, design role fails, or it is a shortcut such as a transform, relabel, stitched extension, or independent repeated subproblem.
```

The old `variant pool` language should be avoided. A held candidate is not automatically a future level; it is selection material.

## What Is Currently Not Solved

- `ruleset -> player abilities -> curriculum slots` is still incomplete.
- Current `level_specs_v2` for `pull_portal_fallback` is a weak draft and should not be treated as a good curriculum model.
- Formal tools can report evidence, but they cannot yet score puzzle quality.
- SCC / graph metrics are design evidence, not an automatic taste formula.
- LLM player testing is intentionally deferred.

## Design Taste Index

These are reminders for the routed probes above, not a second checklist and not hard evaluator formulas:

- A good application or challenge needs a concrete consumed causal chain, not just an event witness.
- Extra walking, forced opening moves, and repeated same-operation padding do not create role depth.
- Late application / challenge candidates should reject mechanism-shaped corridors: a salient interaction is weak if it only acts as a one-step access gate, route tax, or renamed hallway without changing later causal reasoning.
- Do not rank depth by mechanism count. A shorter chain with one element or relation reused in changing roles can be stronger than a longer chain of required events.
- Repeated actions are only a warning sign, not a flaw by themselves. They become valuable when each repetition changes context, timing, route meaning, object role, or later state consumption.
- Repeated causal chains are acceptable only when they are coupled by shared resources, timing, order, state consumption, reinterpretation, or element role changes.
- Suspicious repetition or apparently redundant elements may be defended only by concrete failed edits and analyzer-backed design loss, not by hand-waving.
- Strong candidates can be compact. Adding distractors after the fact is usually worse than strengthening existing elements.
- Compact means causally economical, not smallest possible outer rectangle; over-compression can be as harmful as padding.
- Start-position refinements should consider the initial SCC when available, because the best readable opening may be a different reversible start state rather than a local one-tile adjustment.
