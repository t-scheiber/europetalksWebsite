// Static checks: every admin route handler and admin page that reads data
// must call the admin helper first, so a new file cannot forget it.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const HANDLER =
  /^export\s+(?:async\s+function\s+|const\s+|function\s+)(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b/gm;
const REEXPORT = /^export\s*\{[^}]*\b(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b[^}]*\}/m;
const GUARD =
  /const\s+(\w+)\s*=\s*await\s+requireAdminApi\(\)\s*;\s*if\s*\(\s*\1\s+instanceof\s+NextResponse\s*\)\s*return\s+\1\s*;/;
const DATA_ACCESS = /\bdb\.|request\.(json|formData|text|arrayBuffer)\(|writeFile|mkdir/;

// Returns a list of problems found in one route file's source.
function findRouteProblems(source) {
  const problems = [];
  if (REEXPORT.test(source)) {
    problems.push("re-exported handler cannot be checked, declare it in this file");
  }
  const matches = [...source.matchAll(HANDLER)];
  matches.forEach((match, i) => {
    const name = match[1];
    const end = i + 1 < matches.length ? matches[i + 1].index : source.length;
    const body = source.slice(match.index, end);
    const guard = GUARD.exec(body);
    if (!guard) {
      problems.push(`${name} does not call requireAdminApi() and return its response`);
      return;
    }
    if (DATA_ACCESS.test(body.slice(0, guard.index))) {
      problems.push(`${name} touches data before requireAdminApi()`);
    }
  });
  return problems;
}

test("every handler under app/api/admin calls requireAdminApi first", () => {
  const dir = join(root, "app", "api", "admin");
  const routeFiles = walk(dir).filter((f) => /[\\/]route\.(ts|tsx|js|mjs)$/.test(f));
  assert.ok(routeFiles.length > 0, "no admin route files found");
  const failures = [];
  let handlerCount = 0;
  for (const file of routeFiles) {
    const source = readFileSync(file, "utf8");
    handlerCount += [...source.matchAll(HANDLER)].length;
    for (const problem of findRouteProblems(source)) {
      failures.push(`${relative(root, file)}: ${problem}`);
    }
  }
  assert.ok(handlerCount > 0, "no handlers found, the pattern is out of date");
  assert.deepEqual(failures, []);
});

test("the checker flags a handler that forgets the helper", () => {
  const forgetful = `
import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({});
}`;
  assert.equal(findRouteProblems(forgetful).length, 1);

  const oldCheck = `
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  return NextResponse.json({});
}`;
  assert.equal(findRouteProblems(oldCheck).length, 1);

  const oneOfTwo = `
export async function GET() {
  const admin = await requireAdminApi();
  if (admin instanceof NextResponse) return admin;
  return NextResponse.json({});
}
export async function DELETE() {
  return NextResponse.json({});
}`;
  const problems = findRouteProblems(oneOfTwo);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /^DELETE /);

  const lateCheck = `
export async function POST(request: Request) {
  const json = await request.json();
  const admin = await requireAdminApi();
  if (admin instanceof NextResponse) return admin;
  return NextResponse.json(json);
}`;
  assert.equal(findRouteProblems(lateCheck).length, 1);

  const good = `
export async function GET() {
  try {
    const admin = await requireAdminApi();
    if (admin instanceof NextResponse) return admin;
    return NextResponse.json(await db.event.findMany());
  } catch {
    return new NextResponse("x", { status: 500 });
  }
}`;
  assert.deepEqual(findRouteProblems(good), []);
});

test("the admin layout and every server page that reads data call requireAdminPage", () => {
  const dir = join(root, "app", "admin");
  const files = walk(dir).filter((f) => /\.(tsx|ts)$/.test(f));
  const layouts = files.filter((f) => /[\\/]layout\.tsx$/.test(f));
  assert.ok(layouts.length > 0, "app/admin/layout.tsx is missing");
  const failures = [];
  for (const file of files) {
    const source = readFileSync(file, "utf8");
    const isLayout = layouts.includes(file);
    const isClient = /^\s*["']use client["']/.test(source);
    const readsData = /from\s+["'](@\/lib\/(db|prisma)|@prisma\/client)["']/.test(source);
    if (isLayout || (!isClient && readsData)) {
      if (!/await\s+requireAdminPage\(\)/.test(source)) {
        failures.push(`${relative(root, file)} does not call requireAdminPage()`);
      }
    }
  }
  assert.deepEqual(failures, []);
});
