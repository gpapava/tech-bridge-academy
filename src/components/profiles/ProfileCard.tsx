import Link from "next/link";
import { MapPin, Tag, Building2, GraduationCap, ArrowRight } from "lucide-react";
import { Badge, OrgTypeBadge, ValidationBadge } from "@/components/ui/Badge";
import { cn, truncate } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useOptionLabels } from "@/i18n/labels";

interface ProfileCardProps {
  id: string;
  orgType: string;
  schoolType?: string | null;
  companyType?: string | null;
  name: string;
  description: string;
  mission: string;
  regions: string[];
  sectors: string[];
  tags: string[];
  validationStatus: string;
  logoUrl?: string | null;
  showValidation?: boolean;
  href?: string;
}

export function ProfileCard({
  id, orgType, schoolType, companyType, name, description,
  regions, sectors, tags, validationStatus, logoUrl,
  showValidation = false, href
}: ProfileCardProps) {
  const t = useTranslations("profilesUi.card");
  const label = useOptionLabels();
  const subTypeLabel = orgType === "SCHOOL"
    ? (schoolType ? label.schoolType(schoolType) : null)
    : (companyType ? label.companyType(companyType) : null);

  const profileHref = href ?? `/bridge/profiles/${id}`;

  return (
    <Link href={profileHref} className="card-hover group block">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Logo / Icon */}
          <div className={cn(
            "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ring-1",
            orgType === "SCHOOL"
              ? "bg-blue-50 ring-blue-100"
              : "bg-amber-50 ring-amber-100"
          )}>
            {logoUrl
              ? <img src={logoUrl} alt={name} className="h-10 w-10 rounded-lg object-contain" />
              : orgType === "SCHOOL"
                ? <GraduationCap className="h-6 w-6 text-blue-600" />
                : <Building2 className="h-6 w-6 text-amber-600" />
            }
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <OrgTypeBadge type={orgType} />
              {subTypeLabel && <Badge variant="slate">{subTypeLabel}</Badge>}
              {showValidation && <ValidationBadge status={validationStatus} />}
            </div>
            <h3 className="font-semibold text-slate-900 leading-snug group-hover:text-brand-700 transition-colors">
              {name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm text-slate-500 leading-relaxed">
          {truncate(description, 160)}
        </p>

        {/* Regions */}
        {regions.length > 0 && (
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin className="h-3.5 w-3.5 text-slate-300 flex-shrink-0" />
            <span className="truncate">{regions.slice(0, 3).map(label.region).join(" · ")}</span>
          </div>
        )}

        {/* Sectors */}
        {sectors.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {sectors.slice(0, 3).map((s) => (
              <Badge key={s} variant="blue">{label.sector(s)}</Badge>
            ))}
            {sectors.length > 3 && (
              <Badge variant="slate">+{sectors.length - 3}</Badge>
            )}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            <Tag className="h-3 w-3 text-slate-300 flex-shrink-0" />
            <p className="text-xs text-slate-400 truncate">
              {tags.slice(0, 5).join(", ")}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-5 flex items-center text-xs font-medium text-brand-600 group-hover:text-brand-800 transition-colors">
          {t("viewProfile")}
          <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
