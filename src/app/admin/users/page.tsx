import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import AdminUserActions from "./AdminUserActions";

export const metadata = { title: "User Management — Admin" };

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: { role?: string; page?: string };
}) {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const page = Math.max(1, parseInt(searchParams.page ?? "1"));
  const perPage = 30;
  const roleFilter = searchParams.role as UserRole | undefined;

  const where = roleFilter ? { role: roleFilter } : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        profile: { select: { id: true, name: true, orgType: true, validationStatus: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  const ROLE_LABELS: Record<string, string> = {
    ADMIN: "Admin",
    SCHOOL: "School",
    COMPANY: "Company",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 mt-1">{total} registered users</p>
        </div>
      </div>

      {/* Role Filter */}
      <div className="flex gap-2 mb-6">
        {[undefined, "SCHOOL", "COMPANY", "ADMIN"].map((r) => (
          <a
            key={r ?? "all"}
            href={r ? `?role=${r}` : "?"}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              roleFilter === r
                ? "bg-brand-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-brand-300"
            }`}
          >
            {r ? ROLE_LABELS[r] : "All Users"}
          </a>
        ))}
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-slate-600">User</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-600">Role</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-600">Organisation</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-600">Joined</th>
              <th className="text-right px-5 py-3 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50">
                <td className="px-5 py-4">
                  <p className="font-medium text-slate-900">{user.name ?? "—"}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{user.email}</p>
                </td>
                <td className="px-5 py-4">
                  <Badge variant={user.role === "ADMIN" ? "red" : user.role === "SCHOOL" ? "blue" : "amber"}>
                    {ROLE_LABELS[user.role]}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  {user.profile ? (
                    <div>
                      <p className="text-slate-700">{user.profile.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{user.profile.validationStatus}</p>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-xs">No profile</span>
                  )}
                </td>
                <td className="px-5 py-4 text-slate-500 text-xs">{formatDate(user.createdAt)}</td>
                <td className="px-5 py-4 text-right">
                  <AdminUserActions userId={user.id} currentRole={user.role} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`?${roleFilter ? `role=${roleFilter}&` : ""}page=${p}`}
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition-colors ${
                p === page
                  ? "bg-brand-600 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-brand-300"
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
