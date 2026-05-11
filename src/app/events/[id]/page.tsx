import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Calendar, MapPin, Video, Users, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";
import EventRegisterButton from "./EventRegisterButton";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({ where: { id: params.id }, select: { title: true } });
  return { title: event?.title ?? "Event" };
}

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession();

  const event = await prisma.event.findUnique({
    where: { id: params.id, isPublished: true },
    include: { _count: { select: { registrations: true } } },
  });

  if (!event) notFound();

  const isRegistered = session
    ? await prisma.eventRegistration.findUnique({
        where: { eventId_userId: { eventId: event.id, userId: session.user.id } },
      }).then(Boolean)
    : false;

  const isPast = new Date(event.startDate) < new Date();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/events" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>

          <div className="card p-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="blue">{event.eventType}</Badge>
              {event.isVirtual
                ? <Badge variant="teal"><Video className="h-3 w-3 mr-1" />Online</Badge>
                : <Badge variant="slate"><MapPin className="h-3 w-3 mr-1" />In-Person</Badge>
              }
              {isPast && <Badge variant="slate">Past Event</Badge>}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">{event.title}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-brand-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Date &amp; Time</p>
                  <p className="text-sm font-medium text-slate-800">{formatDateTime(event.startDate)}</p>
                  {event.endDate && (
                    <p className="text-xs text-slate-400">Until {formatDateTime(event.endDate)}</p>
                  )}
                </div>
              </div>

              {event.location && !event.isVirtual && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-brand-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Location</p>
                    <p className="text-sm font-medium text-slate-800">{event.location}</p>
                  </div>
                </div>
              )}

              {event.isVirtual && event.meetingUrl && (
                <div className="flex items-start gap-3">
                  <Video className="h-5 w-5 text-brand-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Meeting Link</p>
                    <a href={event.meetingUrl} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-brand-600 hover:underline font-medium">
                      Join Online
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-brand-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Registrations</p>
                  <p className="text-sm font-medium text-slate-800">
                    {event._count.registrations} registered
                    {event.capacity && ` / ${event.capacity} capacity`}
                  </p>
                </div>
              </div>
            </div>

            <div className="prose prose-slate max-w-none mb-8">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{event.description}</p>
            </div>

            {!isPast && (
              <div className="border-t border-slate-100 pt-6">
                {session ? (
                  <EventRegisterButton
                    eventId={event.id}
                    isRegistered={isRegistered}
                    isFull={!!(event.capacity && event._count.registrations >= event.capacity)}
                  />
                ) : (
                  <div className="flex items-center gap-3">
                    <Link href={`/auth/login?callbackUrl=/events/${event.id}`} className="btn-primary">
                      Sign in to Register
                    </Link>
                    <Link href="/auth/register" className="btn-secondary">
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
