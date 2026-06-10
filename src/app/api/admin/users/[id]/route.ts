import { NextResponse } from "next/server";
import { getSession, hashPassword } from "@/lib/auth";
import {
  countAdminsByRole,
  deleteAdmin,
  findAdminById,
  updateAdmin,
} from "@/lib/db/admins";
import { updateAdminUserSchema } from "@/lib/validations";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function serializeAdmin(admin: {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: Date;
}) {
  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    createdAt: admin.createdAt.toISOString(),
  };
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const session = await getSession();
    const { id } = await context.params;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = updateAdminUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid user details" }, { status: 400 });
    }

    const existing = await findAdminById(id);
    if (!existing) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (parsed.data.role && parsed.data.role !== "super_admin" && existing.role === "super_admin") {
      const superAdminCount = await countAdminsByRole("super_admin");

      if (superAdminCount <= 1) {
        return NextResponse.json(
          { error: "At least one Super Admin is required" },
          { status: 400 }
        );
      }
    }

    const admin = await updateAdmin(id, {
      name: parsed.data.name,
      role: parsed.data.role,
      passwordHash: parsed.data.password
        ? await hashPassword(parsed.data.password)
        : undefined,
    });

    if (!admin) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(serializeAdmin(admin));
  } catch (error) {
    console.error("[admin/users PATCH]", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const session = await getSession();
    const { id } = await context.params;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.adminId === id) {
      return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 });
    }

    const existing = await findAdminById(id);
    if (!existing) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (existing.role === "super_admin") {
      const superAdminCount = await countAdminsByRole("super_admin");

      if (superAdminCount <= 1) {
        return NextResponse.json(
          { error: "At least one Super Admin is required" },
          { status: 400 }
        );
      }
    }

    await deleteAdmin(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/users DELETE]", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
