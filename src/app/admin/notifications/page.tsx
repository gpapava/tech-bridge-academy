import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { formatRelative } from "@/lib/utils";
import { Bell, PlusCircle } from "lucide-react";
import SendNotificationForm from "./SendNotificationForm";

export const metadata = { title: "Notifications — Admin" };

export default async function AdminNotificationsPage() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const recent = await prisma.notification.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { user: { select: { name: true, email: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 mt-1">Send and manage platform notifications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="font-semibold text-slate-900 mb-4">Recent Notifications</h2>
          {recent.length === 0 ? (
            <div className="card p-12 text-center text-slate-400">No notifications yet.</div>
          ) : (
            <div className="space-y-3">
              {recent.map((n) => (
                <div key={n.id} className={`card p-4 ${n.isRead ? "opacity-60" : ""}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                      <p className="text-sm text-slate-600 mt-0.5">{n.message}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-slate-400">To: {n.user.name ?? n.user.email}</span>
                        <span className="text-xs text-slate-300">·</span>
                        <span className="text-xs text-slate-400">{formatRelative(n.createdAt)}</span>
                      </div>
                    </div>
                    <Badge variant={n.isRead ? "slate" : "blue"} dot>
                      {n.isRead ? "Read" : "Unread"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <SendNotificationForm />
        </div>
      </div>
    </div>
  );
}
