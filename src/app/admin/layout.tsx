import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Navbar } from "@/components/layout/Navbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar />
        <div className="flex-1 min-w-0 overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
}
