// Pure decision logic for admin access. No imports on purpose: the unit
// tests load this file directly with Node, without Clerk or Next.js.

export type AdminCandidate = {
  id: string;
  publicMetadata?: unknown;
} | null | undefined;

export type AdminDecision =
  | { kind: "allowed"; userId: string }
  | { kind: "denied"; status: 401 | 403 };

// Same condition as components/AuthNavLinks.tsx and components/AuthSection.tsx.
export function hasAdminRole(user: AdminCandidate): user is NonNullable<AdminCandidate> {
  if (!user || typeof user.id !== "string" || user.id === "") return false;
  const metadata = user.publicMetadata;
  if (!metadata || typeof metadata !== "object") return false;
  return (metadata as Record<string, unknown>).role === "admin";
}

// 401: nobody is signed in. 403: signed in but not an admin, or the lookup
// failed. Any error counts as "not admin" (fail closed).
export async function decideAdminAccess(
  lookup: () => Promise<AdminCandidate>
): Promise<AdminDecision> {
  let user: AdminCandidate;
  try {
    user = await lookup();
  } catch {
    return { kind: "denied", status: 403 };
  }
  if (!user) return { kind: "denied", status: 401 };
  if (!hasAdminRole(user)) return { kind: "denied", status: 403 };
  return { kind: "allowed", userId: user.id };
}
