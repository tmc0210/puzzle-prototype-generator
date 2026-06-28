# Ice Slide Escape Design Archive

Status: experimental human-guided design archive.

This archive follows the design workflow and archive contract in:

```text
docs/29-design-archive-contract.md
docs/21-current-workflow-standard.md
```

Purpose:

```text
- preserve LLM designer candidates, critic attacks, designer defenses, tool evidence,
  and human designer comments;
- keep human comments attached to the candidate record;
- provide retrieval metadata for future designer / critic prompts;
- avoid treating the unverified player_model -> curriculum_v2 -> level_specs_v2
  chain as authoritative.
```

Files:

```text
index.yml
  Lookup layer for examples. Not the source of truth.

experiments/
  Human-guided experiment briefs.

candidates/
  One candidate record per archived candidate. Human comments live here.
```

Archive rule:

```text
Human comments are primary design-taste evidence.
LLM-derived tags are navigation metadata.
Process-wrong outputs do not enter the clean archive.
```
