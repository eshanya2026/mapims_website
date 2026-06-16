import { NextResponse } from "next/server";
import { authenticateAdmin, createSession } from "@/lib/auth";
import { getDefaultAdminPath, isAdminRole } from "@/lib/admin-roles";
import { loginSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const admin = await authenticateAdmin(parsed.data.email, parsed.data.password);
    if (!admin || !isAdminRole(admin.role)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    await createSession(admin);

    return NextResponse.json({
      ok: true,
      admin: {
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      defaultPath: getDefaultAdminPath(admin.role),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[admin/login]", error);

    if (message.includes("MONGODB_URI")) {
      return NextResponse.json(
        { error: "Server misconfigured: database connection is not set up." },
        { status: 503 }
      );
    }

    if (message.includes("AUTH_SECRET")) {
      return NextResponse.json(
        { error: "Server misconfigured: authentication secret is not set up." },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
