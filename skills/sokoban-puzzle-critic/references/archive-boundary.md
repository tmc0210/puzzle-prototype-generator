# Archive Taste Boundary

Archive taste context 只允许包含有人类评语支持的 candidate。

允许使用：

- `human_reviewed: true`
- 人类原文摘句
- 人类 aesthetic / difficulty calibration
- 与当前 candidate 的相关理由

禁止使用为审美依据：

- critic-only archive record
- designer-derived summary
- tool-only evidence
- tags
- `accepted` / `archive_use`
- retrieval summary

没有相关且带人类评语的条目时，写 `none_found` 和原因。
