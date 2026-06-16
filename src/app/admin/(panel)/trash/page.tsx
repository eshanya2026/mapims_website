import { redirect } from "next/navigation";
import { canAccessTrash } from "@/lib/admin-roles";
import { getSession } from "@/lib/auth";
import TrashWorkspace from "@/components/admin/TrashWorkspace";

export default async function AdminTrashPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  if (!canAccessTrash(session.role)) redirect("/admin");

  return <TrashWorkspace />;
}
