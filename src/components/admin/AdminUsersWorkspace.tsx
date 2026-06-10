"use client";

import { useEffect, useState } from "react";
import { ADMIN_ROLES, type AdminRole } from "@/lib/admin-roles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  role: AdminRole;
  createdAt: string;
};

const roleOptions = Object.entries(ADMIN_ROLES) as [AdminRole, string][];

const emptyForm = {
  email: "",
  password: "",
  name: "",
  role: "front_office" as AdminRole,
};

export default function AdminUsersWorkspace({
  currentAdminId,
}: {
  currentAdminId: string;
}) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadUsers() {
    const response = await fetch("/api/admin/users");
    if (!response.ok) return;
    setUsers((await response.json()) as AdminUser[]);
  }

  useEffect(() => {
    void loadUsers();
  }, []);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        name: form.name || undefined,
        role: form.role,
      }),
    });

    const data = await response.json().catch(() => ({}));
    setLoading(false);

    if (!response.ok) {
      setError(typeof data.error === "string" ? data.error : "Failed to create user");
      return;
    }

    setForm(emptyForm);
    await loadUsers();
  }

  async function updateRole(id: string, role: AdminRole) {
    const response = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    if (response.ok) {
      await loadUsers();
    }
  }

  async function deleteUser(id: string) {
    if (!confirm("Delete this CMS user?")) return;

    const response = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      alert(typeof data.error === "string" ? data.error : "Failed to delete user");
      return;
    }

    await loadUsers();
  }

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Create CMS user</h2>
        <p className="mt-1 text-sm text-slate-500">
          Super Admins can add HR, Marketing, and Front Office accounts.
        </p>

        <form onSubmit={handleCreate} className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
            <Input
              value={form.name}
              onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
              placeholder="Team member name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <Input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
              placeholder="user@mapims.edu.in"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <Input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm((current) => ({ ...current, password: e.target.value }))}
              placeholder="Minimum 6 characters"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Role</label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  role: e.target.value as AdminRole,
                }))
              }
              className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm"
            >
              {roleOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {error ? (
            <p className="md:col-span-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          ) : null}

          <div className="md:col-span-2">
            <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700">
              {loading ? "Creating..." : "Create user"}
            </Button>
          </div>
        </form>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-slate-900">
                  {user.name ?? "—"}
                  {user.id === currentAdminId ? (
                    <span className="ml-2 text-xs font-normal text-slate-400">(you)</span>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-slate-600">{user.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={user.role}
                    disabled={user.id === currentAdminId}
                    onChange={(e) => updateRole(user.id, e.target.value as AdminRole)}
                    className={cn(
                      "rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm",
                      user.id === currentAdminId && "opacity-60"
                    )}
                  >
                    {roleOptions.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  {user.id !== currentAdminId ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
