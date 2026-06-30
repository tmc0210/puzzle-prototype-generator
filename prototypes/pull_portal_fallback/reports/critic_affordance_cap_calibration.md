# Critic Calibration: Affordance Cap Rule

Purpose: calibrate the puzzle-design critic after `ls20_iter3b_coupled_jam_h_lock` exposed a scoring issue.

## Issue

The critic originally judged `ls20_iter3b_coupled_jam_h_lock` as:

```text
verdict: strong_mainline_candidate
role_fit: challenge
quality_score: 5/5
```

This was too generous for overall puzzle quality. The level has excellent LS20 slot fit, but it also has a meaningful aesthetic caveat:

```text
Normal teleport is nonessential.
Several portal pairs mainly serve fallback / exit-blocking structure.
The level is strong fallback-jam logic, but not a fully elegant use of all known portal affordances.
```

The problem was not that the critic missed the caveat. It mentioned similar caveats, but still gave 5/5. Therefore the prompt needed a score-consistency rule, not a larger checklist.

## Updated Critic Rule

The prompt template now keeps a single `quality_score`, but narrows the meaning of 5/5:

```text
quality_score is overall puzzle quality for this role,
not just evidence strength or slot completion.

If the critic lists a nontrivial design failure or meaningful aesthetic caveat,
the score should normally be below 5.

5/5 is reserved for strong slot fit with no clear padding,
no clear affordance underuse relative to the player model,
and no major unresolved aesthetic caveat.
```

This is intentionally lighter than a multi-dimensional scoring table.

## First Retest

Prompt added player-model-relative affordance cap, but did not yet add the score-consistency sentence.

Result:

```text
verdict: strong_mainline_candidate
role_fit: challenge
quality_score: 5/5
```

The critic identified:

```text
Normal teleport remains nonessential.
This is the main affordance-underuse caveat.
The graph is fairly linear.
The four D pushes can feel procedural.
```

but still gave 5/5. This was a calibration failure.

## Second Retest

Prompt added:

```text
Do not let excellent slot fit override the quality cap.
If you list a nontrivial design failure or meaningful aesthetic caveat,
the score should normally be below 5.
```

Result:

```text
verdict: strong_mainline_candidate
role_fit: challenge
quality_score: 4/5
```

This is the desired behavior.

The critic preserved the level's strengths:

```text
D's final jam position is consumed twice.
H/I is justified rather than decorative.
The jam probe cleanly verifies the boundary lesson.
The complete graph shows no winning bypass.
```

But it capped the score because:

```text
The solution graph is highly linear after commitment.
Normal teleport is nonessential.
The D pushes remain repetitive execution once the trick is understood.
```

## Final Calibration Judgment

For `ls20_iter3b_coupled_jam_h_lock`, the calibrated judgment is:

```text
verdict: strong_mainline_candidate
role_fit: challenge
quality_score: 4/5
```

Lead-designer interpretation:

```text
Strong LS20 mainline candidate.
Excellent fallback-jam slot fit.
Not an overall puzzle-quality 5/5 because of affordance narrowing and linearity.
```

## General Lesson

The useful rubric is not a heavy affordance audit. It is a full-score gate:

```text
Designer should actively avoid wasting known affordances.
Critic should only lightly check this, mainly before awarding 5/5.
```

This check must remain player-model-relative:

```text
Do not penalize a level for not using affordances the player has not learned yet.
Do cap the score when known high-affordance elements are mostly used as generic parts,
unless that downgrade is the intended puzzle insight.
```

## Positive Calibration Check

The updated critic was also tested on `hard_chain_opening_formal_case`, a compact late combination/challenge candidate:

```text
########
# A  @ #
#     B#
#  C## #
###### #
#####G #
########
```

Analyzer highlights:

```text
pull, normal teleport, and fallback are all necessary.
A and B are used as teleport endpoints and fallback-moved objects.
The crate is pulled, then later becomes a remote portal-exit blocker.
The SCC graph has branching / merging route structure.
```

Updated critic result:

```text
verdict: strong_mainline_candidate
role_fit: combination / challenge
quality_score: 5/5
```

This is the desired calibration behavior:

```text
The critic caps LS20 forced-chain candidates at 4/5 when they have meaningful caveats,
but still gives 5/5 to a compact high-quality puzzle with strong role reuse,
healthy local order windows, and broad affordance use.
```
