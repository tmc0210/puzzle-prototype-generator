# Ice Slide Escape

Runtime bring-up package for the prototype-local `ice_slide_escape` mechanic.

Authoritative mechanism docs remain in:

- `docs/preflight.md`
- `docs/rules.md`
- `docs/solver_contract.md`
- `docs/designer_contract.md`
- `docs/meta_interfaces.md`
- `docs/design_directives.md`

Current scope:

- single rectangular level runtime
- explicit edge `player_start` and explicit edge `player_goal` per solve instance
- P01-P10 probe seed suite plus one explicit walled-goal smoke fixture
- curated miner profile for discovery evidence, with quick/deep presets
- experimental human-guided design archive at `design_archive/`

Unavailable in this package:

- level_specs_v2 candidate seed factories
- PuzzleScript exporter/checker
- cross-level big-map movement

`formal_level_size` remains open and does not block runtime or scratch designer testing.

Design archive entry point:

- `design_archive/README.md`
