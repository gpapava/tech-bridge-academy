"use client";

import { useMemo, useState } from "react";
import { Video, FileText, Download, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  resourceType: string;
  fileUrl: string | null;
  externalUrl: string | null;
  effort: string | null;
}

const RESOURCE_TYPES = ["All", "Template", "Guide", "Toolkit", "Video", "Webinar"];

export function StaffResourceList({ resources }: { resources: Resource[] }) {
  const [activeType, setActiveType] = useState("All");

  const filtered = useMemo(
    () => (activeType === "All" ? resources : resources.filter((r) => r.resourceType === activeType)),
    [resources, activeType]
  );

  const categories = useMemo(() => [...new Set(filtered.map((r) => r.category))], [filtered]);

  return (
    <div>
      {/* Material Categorisation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {RESOURCE_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              activeType === type
                ? "bg-brand-800 text-white border-brand-800"
                : "border-slate-200 text-slate-600 hover:border-brand-300 hover:bg-brand-50"
            )}
          >
            {type}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <FileText className="h-10 w-10 mx-auto mb-3 text-slate-200" />
          No resources match this category yet.
        </div>
      ) : (
        categories.map((cat) => (
          <section key={cat} className="mb-10">
            <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide mb-4 pb-2 border-b border-slate-100">{cat}</h3>
            <div className="space-y-3">
              {filtered.filter((r) => r.category === cat).map((resource) => (
                <div key={resource.id} className="card p-5 flex items-start gap-4">
                  <div className={cn(
                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl",
                    resource.resourceType === "Video" ? "bg-purple-50" :
                    resource.resourceType === "Template" ? "bg-blue-50" :
                    resource.resourceType === "Webinar" ? "bg-green-50" : "bg-slate-50"
                  )}>
                    {resource.resourceType === "Video"
                      ? <Video className="h-5 w-5 text-purple-600" />
                      : resource.fileUrl
                        ? <Download className="h-5 w-5 text-blue-600" />
                        : <FileText className="h-5 w-5 text-slate-500" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-medium text-slate-900">{resource.title}</h4>
                      <Badge variant="slate">{resource.resourceType}</Badge>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{resource.description}</p>
                    {resource.effort && (
                      <p className="text-xs text-slate-400 mt-1">⏱ {resource.effort}</p>
                    )}
                    <div className="flex gap-3 mt-3">
                      {resource.fileUrl && (
                        <a href={resource.fileUrl} download className="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-800">
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </a>
                      )}
                      {resource.externalUrl && (
                        <a href={resource.externalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-800">
                          <ExternalLink className="h-3.5 w-3.5" />
                          Open Resource
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
