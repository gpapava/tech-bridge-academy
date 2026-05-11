import Link from "next/link";
import { ArrowRight, Building2, GraduationCap, CheckCircle, XCircle, Send } from "lucide-react";
import { Badge, MatchStatusBadge } from "@/components/ui/Badge";
import { MATCH_SCORE_LABEL, formatRelative } from "@/lib/utils";

interface MatchCardProps {
  id: string;
  score: number;
  reasons: string[];
  status: string;
  reportSent: boolean;
  createdAt: Date;
  profileA: {
    id: string; name: string; orgType: string;
    sectors: string[]; regions: string[];
  };
  profileB: {
    id: string; name: string; orgType: string;
    sectors: string[]; regions: string[];
  };
  showAdminActions?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onSendReport?: (id: string) => void;
}

export function MatchCard({
  id, score, reasons, status, reportSent, createdAt,
  profileA, profileB, showAdminActions,
  onApprove, onReject, onSendReport
}: MatchCardProps) {
  const { label, color, bg } = MATCH_SCORE_LABEL(score);

  const school = profileA.orgType === "SCHOOL" ? profileA : profileB;
  const company = profileA.orgType === "COMPANY" ? profileA : profileB;

  return (
    <div className={`card border-l-4 ${bg} p-0 overflow-hidden`}>
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Score Circle */}
            <div className={`flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 ${color} font-bold text-lg flex-shrink-0`}
              style={{ borderColor: "currentColor" }}>
              <span>{score}</span>
              <span className="text-[10px] font-normal opacity-70">/ 100</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-sm font-semibold ${color}`}>{label} Match</span>
                <MatchStatusBadge status={status} />
                {reportSent && <Badge variant="blue">Report Sent</Badge>}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{formatRelative(createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Organisations */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { profile: school, icon: GraduationCap, color: "blue" },
            { profile: company, icon: Building2, color: "amber" },
          ].map(({ profile, icon: Icon, color: ic }) => (
            <Link
              key={profile.id}
              href={`/bridge/profiles/${profile.id}`}
              className={`flex items-start gap-3 rounded-lg border p-3 hover:bg-slate-50 transition-colors ${ic === "blue" ? "border-blue-100 bg-blue-50/30" : "border-amber-100 bg-amber-50/30"}`}
            >
              <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${ic === "blue" ? "text-blue-500" : "text-amber-500"}`} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 leading-snug">{profile.name}</p>
                <p className="text-xs text-slate-400 truncate mt-0.5">{profile.regions.slice(0, 2).join(", ")}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {profile.sectors.slice(0, 2).map((s) => (
                    <Badge key={s} variant={ic === "blue" ? "blue" : "amber"} className="text-[10px]">{s}</Badge>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Reasons */}
        {reasons.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500 mb-2">Why this match was identified:</p>
            <ul className="space-y-1">
              {reasons.slice(0, 4).map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="text-accent-500 mt-0.5 flex-shrink-0">✓</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Admin Actions */}
        {showAdminActions && status === "PENDING_REVIEW" && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
            <button
              onClick={() => onApprove?.(id)}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              Approve
            </button>
            <button
              onClick={() => onReject?.(id)}
              className="flex items-center gap-1.5 rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 transition-colors"
            >
              <XCircle className="h-3.5 w-3.5" />
              Reject
            </button>
            <Link
              href={`/admin/matches/${id}`}
              className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-800 transition-colors"
            >
              View details <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}

        {showAdminActions && status === "APPROVED" && !reportSent && (
          <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
            <button
              onClick={() => onSendReport?.(id)}
              className="flex items-center gap-1.5 rounded-lg bg-brand-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-800 transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
              Send Match Report to Organisations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
