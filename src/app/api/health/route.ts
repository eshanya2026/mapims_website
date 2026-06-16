import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  const hasMongoUri = Boolean(process.env.MONGODB_URI?.trim());
  const hasAuthSecret = Boolean(process.env.AUTH_SECRET?.trim());
  const dbName = process.env.MONGODB_DB_NAME?.trim() || "mapims-cms";

  if (!hasMongoUri || !hasAuthSecret) {
    return NextResponse.json(
      {
        ok: false,
        mongodbUri: hasMongoUri,
        authSecret: hasAuthSecret,
        database: dbName,
        message: "Missing required environment variables on the server.",
      },
      { status: 503 }
    );
  }

  try {
    const db = await getDb();
    await db.command({ ping: 1 });

    return NextResponse.json({
      ok: true,
      mongodbUri: true,
      authSecret: true,
      database: dbName,
      message: "Server configuration looks good.",
    });
  } catch (error) {
    console.error("[health]", error);
    return NextResponse.json(
      {
        ok: false,
        mongodbUri: true,
        authSecret: true,
        database: dbName,
        message: "Environment variables are set, but MongoDB connection failed.",
      },
      { status: 503 }
    );
  }
}
