import Link from "next/link";
import { MapPin, Eye, Download, Tag, ExternalLink, Film } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { truncate, formatDate } from "@/lib/utils";

interface InitiativeCardProps {
  id: string;
  title: string;
  description: string;
  actors: string;
  country?: string | null;
  region?: string | null;
  sector?: string | null;
  tags: string[];
  viewCount: number;
  downloadCount: number;
  hasVideo?: boolean;
  createdAt: Date;
  href?: string;
  onTagClick?: (tag: string) => void;
  onSectorClick?: (sector: string) => void;
}

export function InitiativeCard({
  id, title, description, actors, country, region,
  sector, tags, viewCount, downloadCount, hasVideo, createdAt, href,
  onTagClick, onSectorClick,
}: InitiativeCardProps) {
  const cardHref = href ?? `/bridge/repository/${id}`;

  return (
    <Link href={cardHref} className="card-hover group block">
      <div className="p-6">
        {/* Tags row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {sector && (
            <button
              type="button"
              onClick={(e) => {
                if (!onSectorClick) return;
                e.preventDefault();
                e.stopPropagation();
                onSectorClick(sector);
              }}
            >
              <Badge variant="bridge">{sector}</Badge>
            </button>
          )}
          {hasVideo && (
            <Badge variant="purple">
              <Film className="h-3 w-3 mr-1" />
              Video
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-slate-900 leading-snug group-hover:text-brand-700 transition-colors mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed">
          {truncate(description, 180)}
        </p>

        {/* Actors */}
        <p className="mt-3 text-xs text-slate-400 line-clamp-1">
          <span className="font-medium text-slate-500">Key actors:</span>{" "}
          {truncate(actors, 100)}
        </p>

        {/* Location */}
        {(country || region) && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin className="h-3.5 w-3.5 text-slate-300 flex-shrink-0" />
            <span>{[region, country].filter(Boolean).join(", ")}</span>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <Tag className="h-3 w-3 text-slate-300 flex-shrink-0" />
            {tags.slice(0, 6).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={(e) => {
                  if (!onTagClick) return;
                  e.preventDefault();
                  e.stopPropagation();
                  onTagClick(tag);
                }}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 hover:bg-target-smes/10 hover:text-target-smes transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> {viewCount}
            </span>
            <span className="flex items-center gap-1">
              <Download className="h-3.5 w-3.5" /> {downloadCount}
            </span>
          </div>
          <span className="text-xs text-slate-400">{formatDate(createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}
