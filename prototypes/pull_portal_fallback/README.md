# Pull Portal Fallback Prototype

This prototype package is the first vertical-slice fixture for the project.

Mechanic summary:

```text
The player can pull crates but cannot push them.
Portals are paired by group.
When the player tries to enter a portal whose exit is blocked, the player does not teleport.
Instead, the attempted movement tries to push the entrance portal in the input direction.
```

This package is runtime-verified by the current minimal solver/evaluator gate. Its levels are currently `candidate` fixtures: useful for exercising mechanics and tooling, but not yet accepted as high-quality curriculum levels.

Player-facing win standard:

```text
The player reaches a designated goal cell.
```

Levels that use `event_occurs` are fixture witnesses, not finished player-facing puzzle levels.

Current status:

```text
npm run validate
```

currently fails the full audit gate because quality scoring, accepted level status, and certified curriculum coverage are not complete. Informal trace semantics remain advisory and do not participate in evaluator proof. `npm run playable:build` still generates a local Web playable at `playable/index.html`.

`npm run ps:export` also generates a conservative PuzzleScript Next fixture export at `game.ps`.

`npm run audit:write` generates the MVP gate report at `reports/audit.md`.

Current level set:

```text
20 levels
0/9 knowledge items covered by certified curriculum levels
```

`candidate` in `levels.yml` means the level is available for runtime experiments. It does not mean the level has received a design-quality pass.

`curriculum.yml` is the normative course plan. If `reports/audit.md` shows curriculum gaps, the level set is not complete against that plan even when individual levels pass the solver/evaluator gate.

## Files

- `mechanic.yml`: Mechanic truth for runtime and solver.
- `knowledge.yml`: Candidate knowledge list derived from the mechanic.
- `curriculum.yml`: First-pass course plan.
- `levels.yml`: Hand-authored candidate levels for the initial fixture.
- `playable/`: Generated runtime-backed playable output.
- `reports/evaluation.json`: Generated solver/evaluator report.
- `game.ps`: Generated PuzzleScript Next fixture export.
