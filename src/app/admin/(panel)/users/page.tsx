import { redirect } from "next/navigation";
import AdminUsersWorkspace from "@/components/admin/AdminUsersWorkspace";
import { getSession } from "@/lib/auth";

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">CMS users</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage admin accounts and role-based access for the hospital CMS.
        </p>
      </div>
      <AdminUsersWorkspace currentAdminId={session.adminId} />
    </div>
  );
}
