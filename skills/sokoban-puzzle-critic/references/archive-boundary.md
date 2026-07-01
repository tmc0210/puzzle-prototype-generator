# Archive Taste Boundary

Archive taste context 只允许包含有人类评语支持的 candidate。

允许使用：

- `human_reviewed: true`
- 人类原文摘句
- 人类 aesthetic / difficulty calibration
- 与当前 candidate 的相关理由

这些条目只用于审美校准、失败模式和 critic 注意力校准。读取 candidate record 不授权 designer 把它当 base 修改。

没有可用 human archive anchors 时，critic 不能输出任何分数化审美或难度结论。禁止 `4`、`4+`、`4-`、`low 4`、`meets 4`、`3/3+` 等表述；只能写 `unscored_missing_human_archive_context`、`target_fit_unknown` 或非分数结构观察。

禁止使用为审美依据：

- critic-only archive record
- designer-derived summary
- tool-only evidence
- tags
- `accepted` / `archive_use`
- retrieval summary

没有相关且带人类评语的条目时，写 `none_found` 和原因。
