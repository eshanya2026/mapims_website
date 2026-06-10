import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { createAdmin, findAdminByEmail, listAdmins } from "@/lib/db/admins";
import { createAdminUserSchema } from "@/lib/validations";

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

export async function GET() {
  const admins = await listAdmins();
  return NextResponse.json(admins.map(serializeAdmin));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createAdminUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid user details" }, { status: 400 });
    }

    const existing = await findAdminByEmail(parsed.data.email);

    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const passwordHash = await hashPassword(parsed.data.password);
    const admin = await createAdmin({
      email: parsed.data.email,
      passwordHash,
      name: parsed.data.name ?? null,
      role: parsed.data.role,
    });

    return NextResponse.json(serializeAdmin(admin), { status: 201 });
  } catch (error) {
    console.error("[admin/users POST]", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
