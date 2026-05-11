import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge, OrgTypeBadge, ValidationBadge } from "@/components/ui/Badge";
import {
  MapPin, Tag, Mail, Phone, Globe, Lock, GraduationCap, Building2,
  FileText, Download, ExternalLink, ArrowLeft, GitMerge
} from "lucide-react";
import { SCHOOL_TYPE_LABELS, COMPANY_TYPE_LABELS, formatDate } from "@/lib/utils";
import { ValidationStatus, VisibilityStatus } from "@prisma/client";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const profile = await prisma.organisationProfile.findUnique({
    where: { id: params.id },
    select: { name: true },
  });
  return { title: profile?.name ?? "Organisation Profile" };
}

export default async function ProfileDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  const { id } = params;

  const profile = await prisma.organisationProfile.findUnique({
    where: { id },
    include: {
      documents: { select: { id: true, name: true, url: true, fileType: true } },
      user: { select: { createdAt: true } },
    },
  });

  if (!profile) notFound();

  const isOwner = session?.user?.id === profile.userId;
  const isAdmin = session?.user?.role === "ADMIN";
  const isAuthenticated = Boolean(session);

  // Access control
  if (!isOwner && !isAdmin) {
    if (profile.validationStatus !== ValidationStatus.APPROVED) notFound();
    if (profile.visibilityStatus === VisibilityStatus.PRIVATE) notFound();
  }

  const showFullProfile = isOwner || isAdmin ||
    (isAuthenticated && profile.visibilityStatus !== VisibilityStatus.PRIVATE);

  const subTypeLabel = profile.orgType === "SCHOOL"
    ? (profile.schoolType ? SCHOOL_TYPE_LABELS[profile.schoolType] : null)
    : (profile.companyType ? COMPANY_TYPE_LABELS[profile.companyType] : null);

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/bridge/profiles" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Directory
            </Link>

            <div className="flex items-start gap-5">
              {/* Icon */}
              <div className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl ${profile.orgType === "SCHOOL" ? "bg-blue-50 ring-1 ring-blue-100" : "bg-amber-50 ring-1 ring-amber-100"}`}>
                {profile.orgType === "SCHOOL"
                  ? <GraduationCap className="h-8 w-8 text-blue-600" />
                  : <Building2 className="h-8 w-8 text-amber-600" />
                }
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <OrgTypeBadge type={profile.orgType} />
                  {subTypeLabel && <Badge variant="slate">{subTypeLabel}</Badge>}
                  {(isOwner || isAdmin) && <ValidationBadge status={profile.validationStatus} />}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{profile.name}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-400">
                  {profile.regions.length > 0 && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {profile.regions.join(" · ")}
                    </span>
                  )}
                  <span>Member since {formatDate(profile.user.createdAt)}</span>
                </div>
              </div>

              {(isOwner || isAdmin) && (
                <Link href="/profile" className="btn-secondary flex-shrink-0">
                  Edit Profile
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section className="card p-6">
                <h2 className="font-semibold text-slate-900 mb-4">Who We Are</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{profile.description}</p>
              </section>

              {/* Mission */}
              <section className="card p-6">
                <h2 className="font-semibold text-slate-900 mb-4">Our Mission</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{profile.mission}</p>
              </section>

              {/* Dialogue Experience */}
              {profile.dialogueExperience && (
                <section className="card p-6">
                  <h2 className="font-semibold text-slate-900 mb-4">
                    {profile.orgType === "SCHOOL" ? "Experience with Industry Dialogue" : "Experience with School Partnerships"}
                  </h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{profile.dialogueExperience}</p>
                </section>
              )}

              {/* Opportunities & Needs (full profile only) */}
              {showFullProfile ? (
                <>
                  <section className="card p-6 border-l-4 border-l-accent-500">
                    <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-100 text-xs text-accent-700 font-bold">✓</span>
                      What We Offer
                    </h2>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{profile.opportunities}</p>
                  </section>

                  <section className="card p-6 border-l-4 border-l-brand-500">
                    <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-xs text-brand-700 font-bold">?</span>
                      What We Need
                    </h2>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{profile.needs}</p>
                  </section>
                </>
              ) : (
                <div className="card p-8 text-center border-2 border-dashed border-slate-200">
                  <Lock className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                  <h3 className="font-semibold text-slate-700">Full Profile — Members Only</h3>
                  <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto">
                    Sign in or register to view this organisation&apos;s full offerings, needs, and contact details.
                  </p>
                  <div className="flex justify-center gap-3 mt-5">
                    <Link href="/auth/login" className="btn-primary">Sign In</Link>
                    <Link href="/auth/register" className="btn-secondary">Register Free</Link>
                  </div>
                </div>
              )}

              {/* Documents */}
              {profile.documents.length > 0 && showFullProfile && (
                <section className="card p-6">
                  <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-slate-400" />
                    Documents &amp; Materials
                  </h2>
                  <div className="space-y-2">
                    {profile.documents.map((doc) => (
                      <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 hover:bg-slate-50 transition-colors">
                        <Download className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-700 flex-1">{doc.name}</span>
                        <Badge variant="slate">{doc.fileType}</Badge>
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Sectors */}
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Sectors</h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.sectors.map((s) => <Badge key={s} variant="blue">{s}</Badge>)}
                </div>
              </div>

              {/* Regions */}
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  Regions
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.regions.map((r) => <Badge key={r} variant="slate">{r}</Badge>)}
                </div>
              </div>

              {/* Tags */}
              {profile.tags.length > 0 && (
                <div className="card p-5">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                    <Tag className="h-4 w-4 text-slate-400" />
                    Keywords
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.tags.map((t) => <Badge key={t} variant="slate">{t}</Badge>)}
                  </div>
                </div>
              )}

              {/* Contact (full profile) */}
              {showFullProfile && (
                <div className="card p-5">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    {profile.contactEmail && (
                      <a href={`mailto:${profile.contactEmail}`} className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-brand-700 transition-colors">
                        <Mail className="h-4 w-4 text-slate-400" />
                        {profile.contactEmail}
                      </a>
                    )}
                    {profile.telephone && (
                      <a href={`tel:${profile.telephone}`} className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-brand-700 transition-colors">
                        <Phone className="h-4 w-4 text-slate-400" />
                        {profile.telephone}
                      </a>
                    )}
                    {profile.website && (
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-brand-700 transition-colors">
                        <Globe className="h-4 w-4 text-slate-400" />
                        <span className="truncate">{profile.website.replace(/^https?:\/\//, "")}</span>
                        <ExternalLink className="h-3.5 w-3.5 text-slate-300 flex-shrink-0" />
                      </a>
                    )}
                    {!profile.contactEmail && !profile.telephone && !profile.website && (
                      <p className="text-xs text-slate-400">No contact information provided.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Match CTA */}
              {session && !isOwner && (
                <div className="card p-5 bg-gradient-to-br from-brand-50 to-accent-50 border-brand-100">
                  <GitMerge className="h-7 w-7 text-brand-600 mb-2" />
                  <h3 className="font-semibold text-slate-900 text-sm">Interested in Collaboration?</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Our matching system will identify if your profile aligns with this organisation&apos;s needs and opportunities.
                  </p>
                  <Link href="/bridge/co-design" className="btn-primary mt-4 text-xs w-full justify-center">
                    Request Co-Design →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
