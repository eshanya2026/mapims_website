import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <AdminSidebar
        role={session.role}
        email={session.email}
        name={session.name}
      />
      <main className="min-w-0 flex-1 h-screen overflow-y-auto">{children}</main>
    </div>
  );
}
