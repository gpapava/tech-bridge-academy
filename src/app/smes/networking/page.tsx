import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProfileCard } from "@/components/profiles/ProfileCard";
import { Network, Calendar } from "lucide-react";
import { ValidationStatus } from "@prisma/client";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";

export const metadata = { title: "SME Networking" };

export default async function SMENetworkingPage() {
  const session = await getSession();
  if (!session) redirect("/auth/login?callbackUrl=/smes/networking");

  const [companies, events] = await Promise.all([
    prisma.organisationProfile.findMany({
      where: { orgType: "COMPANY", validationStatus: ValidationStatus.APPROVED },
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
        <div className="bg-gradient-to-br from-amber-900 to-amber-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-amber-200 mb-6">
                <Network className="h-4 w-4" />
                SME Services · Networking
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">SME Networking</h1>
              <p className="text-amber-100 leading-relaxed">
                Connect with manufacturing companies, training providers, and sector stakeholders. Explore the company directory, send collaboration requests, and join upcoming events.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Company Directory</h2>
              {companies.length === 0 ? (
                <p className="text-slate-400">No companies registered yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {companies.map((c) => (
                    <ProfileCard key={c.id} {...c} description={c.description ?? ""} mission={c.mission ?? ""} />
                  ))}
                </div>
              )}
              <Link href="/bridge/profiles?orgType=COMPANY" className="btn-secondary mt-6 inline-flex">
                View All Companies →
              </Link>
            </div>

            {/* Events Sidebar */}
            <div>
              <div className="card p-5">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-amber-600" />
                  Upcoming Networking Events
                </h3>
                {events.length === 0 ? (
                  <p className="text-sm text-slate-400">No events scheduled.</p>
                ) : (
                  <div className="space-y-3">
                    {events.map((ev) => (
                      <div key={ev.id} className="rounded-xl bg-amber-50 border border-amber-100 p-4">
                        <p className="text-sm font-medium text-slate-900">{ev.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{formatDateTime(ev.startDate)}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {ev.isVirtual ? "Online" : ev.location}
                          {" · "}{ev._count.registrations} registered
                        </p>
                        <Link href={`/events/${ev.id}`} className="text-xs text-amber-700 font-medium mt-2 inline-block">
                          Register →
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
