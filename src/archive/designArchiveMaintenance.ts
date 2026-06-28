import type { PrototypePackage } from "../core/types.js";
import { access, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

type ArchiveCandidateIndexEntry = {
  candidate_id?: string;
  file?: string;
  [key: string]: unknown;
};

type ArchiveIndex = {
  candidates?: ArchiveCandidateIndexEntry[];
  [key: string]: unknown;
};

export type RemoveArchiveCandidateOptions = {
  apply: boolean;
  keepFile: boolean;
};

export type RemoveArchiveCandidateReport = {
  archiveRoot: string;
  indexPath: string;
  candidateId: string;
  candidateFile?: string;
  indexEntryFound: boolean;
  candidateFileExists: boolean;
  indexEntriesBefore: number;
  indexEntriesAfter: number;
  applied: boolean;
  keepFile: boolean;
  actions: string[];
};

export async function removeArchiveCandidate(
  pkg: PrototypePackage,
  candidateId: string,
  options: RemoveArchiveCandidateOptions,
): Promise<RemoveArchiveCandidateReport> {
  const archiveRoot = path.resolve(pkg.root, "design_archive");
  const indexPath = path.join(archiveRoot, "index.yml");
  assertInsidePath(path.resolve(pkg.root), archiveRoot, "archive root");
  assertInsidePath(archiveRoot, indexPath, "archive index");

  const rawIndex = await readFile(indexPath, "utf8");
  const index = YAML.parse(rawIndex) as ArchiveIndex | null;
  if (!index || typeof index !== "object") {
    throw new Error(`Archive index is not an object: ${indexPath}`);
  }

  const candidates = Array.isArray(index.candidates) ? index.candidates : [];
  const entry = candidates.find((candidate) => candidate.candidate_id === candidateId);
  const candidateFile = entry?.file ? path.resolve(archiveRoot, entry.file) : undefined;
  if (candidateFile) {
    assertInsidePath(archiveRoot, candidateFile, "candidate file");
  }

  const candidateFileExists = candidateFile ? await fileExists(candidateFile) : false;
  const remainingCandidates = candidates.filter((candidate) => candidate.candidate_id !== candidateId);
  const actions: string[] = [];

  if (entry) {
    actions.push(`从 ${indexPath} 移除 index entry '${candidateId}'`);
  } else {
    actions.push(`未找到 '${candidateId}' 的 index entry`);
  }
  if (candidateFile && candidateFileExists && !options.keepFile) {
    actions.push(`删除候选文件 ${candidateFile}`);
  } else if (candidateFile && candidateFileExists && options.keepFile) {
    actions.push(`保留候选文件 ${candidateFile}`);
  } else if (candidateFile && !candidateFileExists) {
    actions.push(`候选文件已经不存在：${candidateFile}`);
  }

  if (options.apply) {
    index.candidates = remainingCandidates;
    await writeFile(indexPath, YAML.stringify(index, { lineWidth: 0 }), "utf8");
    if (candidateFile && candidateFileExists && !options.keepFile) {
      await rm(candidateFile);
    }
  }

  return {
    archiveRoot,
    indexPath,
    candidateId,
    candidateFile,
    indexEntryFound: entry !== undefined,
    candidateFileExists,
    indexEntriesBefore: candidates.length,
    indexEntriesAfter: remainingCandidates.length,
    applied: options.apply,
    keepFile: options.keepFile,
    actions,
  };
}

export function formatRemoveArchiveCandidateReport(
  report: RemoveArchiveCandidateReport,
): string {
  return [
    `# 归档候选清理：${report.candidateId}`,
    "",
    `- 模式: ${report.applied ? "apply" : "dry-run"}`,
    `- 归档根目录: ${report.archiveRoot}`,
    `- Index: ${report.indexPath}`,
    `- 候选文件: ${report.candidateFile ?? "unknown"}`,
    `- 找到 index entry: ${report.indexEntryFound}`,
    `- 候选文件存在: ${report.candidateFileExists}`,
    `- Index entries: ${report.indexEntriesBefore} -> ${report.indexEntriesAfter}`,
    `- 保留文件: ${report.keepFile}`,
    "",
    "## 动作",
    "",
    ...report.actions.map((action) => `- ${action}`),
    "",
    report.applied
      ? "已执行。归档 index 和候选文件状态已完成上述动作。"
      : "仅预览。重新运行并添加 --apply 才会修改归档。",
    "",
  ].join("\n");
}

function assertInsidePath(root: string, target: string, label: string): void {
  const relative = path.relative(root, target);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`${label} must stay inside ${root}: ${target}`);
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}
