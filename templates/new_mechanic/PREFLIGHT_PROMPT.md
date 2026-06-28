# Prompt: Confirm A New Sokoban-Like Mechanism

Use this prompt before implementation when the user has described a mechanism only partially.

```text
You are confirming the executable semantics for a new Sokoban-like mechanism before implementation.

Raw user brief:
<paste the user's mechanism idea exactly>

Goal:
Turn the raw brief into a confirmed mechanic packet that another Codex thread can implement.
Do not write runtime code yet.

Read first:
- README.md
- docs/09-agent-preflight.md
- docs/28-mechanic-disambiguation-and-ascii-probes.md
- docs/19-multi-instance-object-model.md
- docs/24-runtime-adapter-boundary.md
- templates/new_mechanic/README.md

Rules:
- Do not invent Sokoban defaults.
- Do not assume grid, walls, floor, player, push, pull, collision, portals, exits, gravity,
  object identity, or win condition from genre convention.
- Extract mechanism nouns and actions as unresolved terms, not as executable rules.
- Identify every runtime-critical unknown that affects parseLevel, stateKey, actions, step,
  isWin, solver soundness, object identity, or designer smoke levels.
- For ambiguous semantics, produce minimal ASCII probes with:
  - legend
  - before
  - action or action sequence
  - possible outcomes
  - what each outcome would mean for implementation
- If a probe temporarily uses walls, floor, a player, or a grid only for explanation, label that
  as temporary probe scaffolding.
- Ask questions in batches ordered by blocker severity. Do not ask only abstract questions when
  an ASCII probe would make the ambiguity observable.

Required output:
1. raw_brief summary without invented rules
2. extracted terms:
   - world assumptions
   - actors / controlled entities
   - objects
   - actions
   - mechanisms
   - win/loss conditions
3. runtime-critical unknowns table:
   - id
   - status: open | confirmed | defaulted | out_of_scope
   - why it matters
   - blocks
4. interaction matrix:
   - action x object
   - object x object
   - mechanism x mechanism
   - multi-instance / relation cases
   - win timing cases
5. ASCII probes for the first batch of blockers
6. questions for the user
7. confirmed mechanic packet draft, with open items clearly marked

Do not proceed to implementation until all runtime-critical items are confirmed or explicitly
out_of_scope for the first prototype.
```
