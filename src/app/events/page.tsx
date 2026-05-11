import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { Calendar, MapPin, Video, Users, ArrowRight } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export const metadata = { title: "Events" };
export const revalidate = 1800;

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    prisma.event.findMany({
      where: { isPublished: true, startDate: { gte: new Date() } },
      include: { _count: { select: { registrations: true } } },
      orderBy: { startDate: "asc" },
    }),
    prisma.event.findMany({
      where: { isPublished: true, startDate: { lt: new Date() } },
      include: { _count: { select: { registrations: true } } },
      orderBy: { startDate: "desc" },
      take: 6,
    }),
  ]);

  const EventCard = ({ event }: { event: (typeof upcoming)[0] }) => (
    <div className="card p-6">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge variant="blue">{event.eventType}</Badge>
        {event.isVirtual
          ? <Badge variant="teal"><Video className="h-3 w-3 mr-1" />Online</Badge>
          : <Badge variant="slate"><MapPin className="h-3 w-3 mr-1" />In-Person</Badge>
        }
      </div>
      <h3 className="font-semibold text-slate-900 text-lg leading-snug mb-2">{event.title}</h3>
      <p className="text-sm text-slate-500 line-clamp-2 mb-4">{event.description}</p>

      <div className="space-y-2 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-300" />
          <span>{formatDateTime(event.startDate)}</span>
        </div>
        {event.location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-300" />
            <span>{event.location}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-slate-300" />
          <span>{event._count.registrations} registered</span>
          {event.capacity && <span className="text-slate-400">/ {event.capacity} capacity</span>}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <Link href={`/events/${event.id}`} className="text-sm text-brand-600 font-medium hover:text-brand-800 flex items-center gap-1">
          View Details <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href={`/events/${event.id}/register`} className="btn-accent text-xs">
          Register →
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-slate-900">Events Calendar</h1>
            <p className="text-slate-500 mt-2">Webinars, workshops, networking events, and partner meetings from the TECH BRIDGE VET consortium</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Upcoming */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-brand-600" />
              Upcoming Events
            </h2>
            {upcoming.length === 0 ? (
              <div className="text-center py-12 text-slate-400">No upcoming events scheduled. Check back soon!</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {upcoming.map((event) => <EventCard key={event.id} event={event} />)}
              </div>
            )}
          </section>

          {/* Past */}
          {past.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-slate-300" />
                Past Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 opacity-70">
                {past.map((event) => <EventCard key={event.id} event={event} />)}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
