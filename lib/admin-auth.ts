import { cache } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { decideAdminAccess, type AdminDecision } from "./admin-auth-core";

// The one place that decides whether a request comes from an admin.
// An admin is a Clerk user with publicMetadata.role === "admin".
//
// currentUser() makes one Clerk Backend API call (GET /users/{id}) when a
// session exists. React's cache() shares the result between the layout and
// the page of one render, so a page view costs one call, not two.
const resolveAdmin = cache(
  (): Promise<AdminDecision> => decideAdminAccess(() => currentUser())
);

// For route handlers. Returns the admin's user ID, or a ready 401/403
// response. Call it first in every handler:
//   const admin = await requireAdminApi();
//   if (admin instanceof NextResponse) return admin;
export async function requireAdminApi(): Promise<string | NextResponse> {
  const decision = await resolveAdmin();
  if (decision.kind === "allowed") return decision.userId;
  return decision.status === 401
    ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    : NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// For server components and layouts. Signed-out visitors go to /sign-in,
// signed-in non-admins go to the home page. Returns the admin's user ID.
export async function requireAdminPage(): Promise<string> {
  const decision = await resolveAdmin();
  if (decision.kind === "allowed") return decision.userId;
  redirect(decision.status === 401 ? "/sign-in" : "/");
}
