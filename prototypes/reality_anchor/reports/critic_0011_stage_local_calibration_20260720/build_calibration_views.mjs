#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import YAML from "yaml";

const repoRoot = path.resolve(import.meta.dirname, "../../../..");
const archiveRoot = path.join(repoRoot, "prototypes/reality_anchor/design_archive/candidates");

const stageLocalIds = [
  "RA_CAND_0007",
  "RA_CAND_0008",
  "RA_CAND_0009",
  "RA_CAND_0010",
  "RA_CAND_0015",
];

const broaderAestheticIds = [
  "RA_CAND_0001",
  "RA_CAND_0004",
  "RA_CAND_0006",
  "RA_CAND_0025",
  "RA_CAND_0030",
  "RA_CAND_0031",
  "RA_CAND_0032",
];

const priorCourseRef = "prototypes/reality_anchor/reports/llm_fill_player_benchmark_20260714_tmp/primer_f.md";

function fencedYaml(section, label) {
  const match = section.match(/```yaml[ \t]*\r?\n([\s\S]*?)```/);
  if (!match) throw new Error(`${label} 缺少 YAML block`);
  return YAML.parse(match[1]);
}

function section(text, heading) {
  const start = text.indexOf(`${heading}\n`);
  if (start < 0) throw new Error(`缺少 section：${heading}`);
  const contentStart = start + heading.length + 1;
  const next = text.indexOf("\n## ", contentStart);
  return text.slice(contentStart, next < 0 ? text.length : next);
}

function layoutFrom(text, id) {
  const layoutSection = section(text, "## Layout");
  const blocks = [...layoutSection.matchAll(/```text[ \t]*\r?\n([\s\S]*?)```/g)];
  const layout = blocks.at(-1)?.[1]?.trimEnd();
  if (!layout) throw new Error(`${id} 缺少 layout`);
  return layout;
}

async function readCard(id) {
  const text = await readFile(path.join(archiveRoot, `${id}.md`), "utf8");
  const metadata = fencedYaml(text, `${id} metadata`);
  const verdict = fencedYaml(section(text, "## Human Verdict"), `${id} Human Verdict`);
  const comments = (verdict.human_comments ?? []).map((comment) => String(comment.text).trim());
  if (comments.length === 0) throw new Error(`${id} 缺少人类原评语`);
  return {
    id,
    status: verdict.status ?? metadata.human_final_status ?? metadata.status,
    aestheticScore: metadata.aesthetic_score,
    difficultyScore: metadata.difficulty_score,
    layout: layoutFrom(text, id),
    comments,
  };
}

function renderCard(card, includeDifficulty) {
  const lines = [
    `## ${card.id}`,
    "",
    `- 人类状态：${card.status}`,
    `- 审美分：${card.aestheticScore}`,
  ];
  if (includeDifficulty) lines.push(`- 难度分：${card.difficultyScore}`);
  lines.push("", "```text", card.layout, "```", "", "人类原评语：", "");
  for (const comment of card.comments) lines.push(`> ${comment.replaceAll("\n", "\n> ")}`, "");
  return lines.join("\n").trimEnd();
}

const stageCards = await Promise.all(stageLocalIds.map(readCard));
const aestheticCards = await Promise.all(broaderAestheticIds.map(readCard));

const stageBody = [
  "# 当前课程阶段校准",
  "",
  "以下均为当前目标之前 L01—L05 的人类归档原件投影；保留布局、审美分、难度分和人类原评语。",
  "",
  ...stageCards.map((card) => renderCard(card, true)),
  "",
].join("\n\n");

const aestheticBody = [
  "# 跨阶段审美校准",
  "",
  "以下投影保留布局、审美分和人类原评语；不携带难度分。",
  "",
  ...aestheticCards.map((card) => renderCard(card, false)),
  "",
].join("\n\n");

const stageOutput = [
  "---",
  YAML.stringify({
    critic_calibration_kind: "stage_local_difficulty",
    covered_prior_course_refs: [priorCourseRef],
    difficulty_metadata: "stage_local",
  }, { lineWidth: 0 }).trimEnd(),
  "---",
  "",
  stageBody,
].join("\n");

const aestheticOutput = [
  "---",
  YAML.stringify({
    critic_calibration_kind: "cross_stage_aesthetic",
    difficulty_metadata: "omitted",
  }, { lineWidth: 0 }).trimEnd(),
  "---",
  "",
  aestheticBody,
].join("\n");

await writeFile(path.join(import.meta.dirname, "stage_local_calibration.md"), stageBody, "utf8");
await writeFile(path.join(import.meta.dirname, "broader_aesthetic_calibration.md"), aestheticBody, "utf8");
await writeFile(path.join(import.meta.dirname, "stage_local_calibration_formal.md"), stageOutput, "utf8");
await writeFile(path.join(import.meta.dirname, "broader_aesthetic_calibration_formal.md"), aestheticOutput, "utf8");

const testedPacket = YAML.parse(await readFile(
  path.join(repoRoot, "prototypes/reality_anchor/reports/critic_0011_holistic_group_20260720/critic_packet.yml"),
  "utf8",
));
testedPacket.review_attempt_id = "stage-local-calibration-20260720";
testedPacket.human_archive_refs = [
  "prototypes/reality_anchor/reports/critic_0011_stage_local_calibration_20260720/stage_local_calibration.md",
  "prototypes/reality_anchor/reports/critic_0011_stage_local_calibration_20260720/broader_aesthetic_calibration.md",
];
await writeFile(
  path.join(import.meta.dirname, "critic_packet.yml"),
  YAML.stringify(testedPacket, { lineWidth: 0 }),
  "utf8",
);
