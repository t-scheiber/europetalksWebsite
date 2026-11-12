import { db } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const admin = await requireAdminApi();
    if (admin instanceof NextResponse) return admin;

    const events = await db.event.findMany({
      include: {
        _count: {
          select: { signups: true },
        },
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("[EVENTS_WITH_SIGNUPS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
