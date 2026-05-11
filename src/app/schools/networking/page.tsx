import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProfileCard } from "@/components/profiles/ProfileCard";
import { GraduationCap, Calendar } from "lucide-react";
import { ValidationStatus } from "@prisma/client";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";

export const metadata = { title: "School Networking" };

export default async function SchoolNetworkingPage() {
  const session = await getSession();
  if (!session) redirect("/auth/login?callbackUrl=/schools/networking");

  const [schools, events] = await Promise.all([
    prisma.organisationProfile.findMany({
      where: { orgType: "SCHOOL", validationStatus: ValidationStatus.APPROVED },
      orderBy: { createdAt: "desc" },
      take: 9,
    }),
    prisma.event.findMany({
      where: { isPublished: true, startDate: { gte: new Date() } },
      orderBy: { startDate: "asc" },
      take: 5,
      include: { _count: { select: { registrations: true } } },
    }),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-gradient-to-br from-blue-900 to-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-blue-200 mb-6">
                <GraduationCap className="h-4 w-4" />
                Schools Area · Networking
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">School Networking</h1>
              <p className="text-blue-100 leading-relaxed">
                Connect with VET schools and technical institutions across Italy and Europe. Explore the school directory, exchange best practices, and join collaborative events.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-slate-900 mb-6">School Directory</h2>
              {schools.length === 0 ? (
                <p className="text-slate-400">No schools registered yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {schools.map((s) => (
                    <ProfileCard key={s.id} {...s} description={s.description ?? ""} mission={s.mission ?? ""} />
                  ))}
                </div>
              )}
              <Link href="/bridge/profiles?orgType=SCHOOL" className="btn-secondary mt-6 inline-flex">
                View All Schools →
              </Link>
            </div>

            <div>
              <div className="card p-5">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Upcoming School Events
                </h3>
                {events.length === 0 ? (
                  <p className="text-sm text-slate-400">No events scheduled.</p>
                ) : (
                  <div className="space-y-3">
                    {events.map((ev) => (
                      <div key={ev.id} className="rounded-xl bg-blue-50 border border-blue-100 p-4">
                        <p className="text-sm font-medium text-slate-900">{ev.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{formatDateTime(ev.startDate)}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {ev.isVirtual ? "Online" : ev.location}
                          {" · "}{ev._count.registrations} registered
                        </p>
                        <Link href={`/events/${ev.id}`} className="text-xs text-blue-700 font-medium mt-2 inline-block">
                          View Details →
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
                <Link href="/events" className="btn-secondary mt-4 w-full justify-center text-sm">
                  All Events →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
