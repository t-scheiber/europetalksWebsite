import { test } from "node:test";
import assert from "node:assert/strict";
import { decideAdminAccess, hasAdminRole } from "../lib/admin-auth-core.ts";

const user = (publicMetadata) => ({ id: "user_123", publicMetadata });

test("nobody signed in gets 401", async () => {
  const decision = await decideAdminAccess(async () => null);
  assert.deepEqual(decision, { kind: "denied", status: 401 });
});

test("signed-in user without a role gets 403", async () => {
  const decision = await decideAdminAccess(async () => user({}));
  assert.deepEqual(decision, { kind: "denied", status: 403 });
});

test("signed-in user with role member gets 403", async () => {
  const decision = await decideAdminAccess(async () => user({ role: "member" }));
  assert.deepEqual(decision, { kind: "denied", status: 403 });
});

test("signed-in user with role admin is allowed", async () => {
  const decision = await decideAdminAccess(async () => user({ role: "admin" }));
  assert.deepEqual(decision, { kind: "allowed", userId: "user_123" });
});

test("a lookup that throws is denied", async () => {
  const decision = await decideAdminAccess(async () => {
    throw new Error("Clerk is unreachable");
  });
  assert.equal(decision.kind, "denied");
  assert.equal(decision.status, 403);
});

test("a lookup that throws synchronously is denied", async () => {
  const decision = await decideAdminAccess(() => {
    throw new Error("boom");
  });
  assert.equal(decision.kind, "denied");
});

test("only the exact string admin counts", () => {
  assert.equal(hasAdminRole(user({ role: "admin" })), true);
  assert.equal(hasAdminRole(user({ role: "Admin" })), false);
  assert.equal(hasAdminRole(user({ role: ["admin"] })), false);
  assert.equal(hasAdminRole(user({ role: true })), false);
  assert.equal(hasAdminRole(user(undefined)), false);
  assert.equal(hasAdminRole(user(null)), false);
  assert.equal(hasAdminRole(user("admin")), false);
  assert.equal(hasAdminRole({ id: "", publicMetadata: { role: "admin" } }), false);
  assert.equal(hasAdminRole(null), false);
  assert.equal(hasAdminRole(undefined), false);
});
