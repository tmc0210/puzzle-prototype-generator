import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { createReadStream } from "node:fs";
import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import type { LevelDoc } from "../core/types.js";
import { createPlayableRepository, type ReviewPayload } from "./repository.js";

const args = process.argv.slice(2);
const packagePath = args[0] && !args[0].startsWith("--") ? args[0] : "prototypes/reality_anchor";
const optionArgs = args[0] && !args[0].startsWith("--") ? args.slice(1) : args;
const port = Number(getOption(optionArgs, "--port") ?? process.env.PORT ?? 4173);
const repository = createPlayableRepository(packagePath);
const playableRoot = path.join(repository.root, "playable");
await assertExists(path.join(playableRoot, "index.html"));

const server = createServer((request, response) => {
  void handleRequest(request, response).catch((error: unknown) => {
    sendJson(response, 500, {
      error: error instanceof Error ? error.message : String(error),
    });
  });
});

server.listen(port, () => {
  console.log(`Playable review server: http://localhost:${port}`);
  console.log(`Prototype: ${repository.root}`);
});

async function handleRequest(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  if (url.pathname === "/api/playable-data" && request.method === "GET") {
    sendJson(response, 200, await repository.loadPlayableData());
    return;
  }
  if (url.pathname === "/api/review-data" && request.method === "GET") {
    sendJson(response, 200, await repository.loadReviewData());
    return;
  }
  if (url.pathname === "/api/editor-data" && request.method === "GET") {
    sendJson(response, 200, await repository.loadEditorCatalog());
    return;
  }
  if (url.pathname === "/api/editor/diagnose" && request.method === "POST") {
    const body = await readJsonBody<{
      level?: LevelDoc;
      solverMaxStates?: number;
      solverMaxDepth?: number;
      graphMaxStates?: number;
      graphMaxTransitions?: number;
    }>(request);
    if (!body.level) {
      sendJson(response, 400, { error: "level is required" });
      return;
    }
    sendJson(response, 200, await repository.diagnoseEditorLevel(body as { level: LevelDoc }));
    return;
  }
  if (url.pathname === "/api/editor/save-level" && request.method === "POST") {
    const body = await readJsonBody<{ sourceKey?: string; level?: LevelDoc }>(request);
    if (!body.level) {
      sendJson(response, 400, { error: "level is required" });
      return;
    }
    sendJson(response, 200, await repository.saveEditorLevel({ sourceKey: body.sourceKey, level: body.level }));
    return;
  }
  if (url.pathname === "/api/editor/promote-level" && request.method === "POST") {
    const body = await readJsonBody<{ levelId?: string }>(request);
    if (!body.levelId) {
      sendJson(response, 400, { error: "levelId is required" });
      return;
    }
    sendJson(response, 200, await repository.promoteStudioLevel(body.levelId));
    return;
  }
  if (url.pathname === "/api/archive-review" && request.method === "POST") {
    const body = await readJsonBody<{ candidateId?: string; review?: ReviewPayload }>(request);
    if (!body.candidateId || !body.review) {
      sendJson(response, 400, { error: "candidateId and review are required" });
      return;
    }
    await repository.saveArchiveReview(body.candidateId, body.review);
    sendJson(response, 200, await repository.loadReviewData());
    return;
  }
  if (url.pathname === "/api/playtest-review" && request.method === "POST") {
    const body = await readJsonBody<{ levelId?: string; review?: ReviewPayload }>(request);
    if (!body.levelId || !body.review) {
      sendJson(response, 400, { error: "levelId and review are required" });
      return;
    }
    await repository.savePlaytestReview(body.levelId, body.review);
    sendJson(response, 200, await repository.loadReviewData());
    return;
  }
  if (url.pathname.startsWith("/api/")) {
    sendJson(response, 404, { error: "Unknown API endpoint" });
    return;
  }
  await serveStatic(response, url.pathname);
}

async function serveStatic(response: ServerResponse, pathname: string): Promise<void> {
  const relative = pathname === "/"
    ? "index.html"
    : pathname === "/editor"
      ? "editor.html"
      : decodeURIComponent(pathname.slice(1));
  const target = path.resolve(playableRoot, relative);
  assertInsidePath(playableRoot, target, "static file");
  if (!(await fileExists(target))) {
    sendText(response, 404, "Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": mimeType(target) });
  createReadStream(target).pipe(response);
}

async function readJsonBody<T>(request: IncomingMessage): Promise<T> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as T;
}

function sendJson(response: ServerResponse, status: number, value: unknown): void {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(`${JSON.stringify(value, null, 2)}\n`);
}

function sendText(response: ServerResponse, status: number, value: string): void {
  response.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(value);
}

function mimeType(filePath: string): string {
  switch (path.extname(filePath)) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".json":
    case ".map":
      return "application/json; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

function assertInsidePath(root: string, target: string, label: string): void {
  const relative = path.relative(path.resolve(root), path.resolve(target));
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

async function assertExists(filePath: string): Promise<void> {
  if (!(await fileExists(filePath))) {
    await mkdir(path.dirname(filePath), { recursive: true });
    throw new Error(`Playable output not found: ${filePath}. Run exportPlayable first.`);
  }
}

function getOption(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  if (index === -1) {
    return undefined;
  }
  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${name} requires a value`);
  }
  return value;
}
