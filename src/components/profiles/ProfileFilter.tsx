"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn, SECTORS, REGIONS, SCHOOL_TYPE_LABELS, COMPANY_TYPE_LABELS } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useOptionLabels } from "@/i18n/labels";

interface ProfileFilterProps {
  onFilter: (filters: {
    search: string;
    orgType: string;
    schoolType: string;
    companyType: string;
    sector: string;
    region: string;
  }) => void;
  resultCount?: number;
}

export function ProfileFilter({ onFilter, resultCount }: ProfileFilterProps) {
  const t = useTranslations("profilesUi.filter");
  const label = useOptionLabels();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    orgType: "",
    schoolType: "",
    companyType: "",
    sector: "",
    region: "",
  });

  const handleChange = (key: keyof typeof filters, value: string) => {
    const updated = { ...filters, [key]: value };
    if (key === "orgType") {
      updated.schoolType = "";
      updated.companyType = "";
    }
    setFilters(updated);
    onFilter(updated);
  };

  const clearAll = () => {
    const empty = { search: "", orgType: "", schoolType: "", companyType: "", sector: "", region: "" };
    setFilters(empty);
    onFilter(empty);
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <div className="card p-4 space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder={t("search")}
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="input pl-10 pr-4"
        />
      </div>

      {/* Quick Filters Row */}
      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={filters.orgType}
          onChange={(e) => handleChange("orgType", e.target.value)}
          className="input w-auto text-sm py-2"
        >
          <option value="">{t("allTypes")}</option>
          <option value="SCHOOL">{t("schoolsVet")}</option>
          <option value="COMPANY">{t("companiesSmes")}</option>
        </select>

        <select
          value={filters.sector}
          onChange={(e) => handleChange("sector", e.target.value)}
          className="input w-auto text-sm py-2"
        >
          <option value="">{t("allSectors")}</option>
          {SECTORS.map((s) => <option key={s} value={s}>{label.sector(s)}</option>)}
        </select>

        <select
          value={filters.region}
          onChange={(e) => handleChange("region", e.target.value)}
          className="input w-auto text-sm py-2"
        >
          <option value="">{t("allRegions")}</option>
          {REGIONS.map((r) => <option key={r} value={r}>{label.region(r)}</option>)}
        </select>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(
            "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
            showAdvanced
              ? "border-brand-300 bg-brand-50 text-brand-700"
              : "border-slate-200 text-slate-600 hover:border-brand-200 hover:bg-brand-50"
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {t("advanced")}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
            {t("clear")}
          </button>
        )}

        {resultCount !== undefined && (
          <span className="ml-auto text-sm text-slate-400">
            {t("found", { count: resultCount })}
          </span>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-slate-100 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filters.orgType === "SCHOOL" || !filters.orgType ? (
            <div>
              <label className="label text-xs">{t("schoolType")}</label>
              <select
                value={filters.schoolType}
                onChange={(e) => handleChange("schoolType", e.target.value)}
                disabled={filters.orgType === "COMPANY"}
                className="input text-sm"
              >
                <option value="">{t("allSchoolTypes")}</option>
                {Object.keys(SCHOOL_TYPE_LABELS).map((v) => (
                  <option key={v} value={v}>{label.schoolType(v)}</option>
                ))}
              </select>
            </div>
          ) : null}

          {filters.orgType === "COMPANY" || !filters.orgType ? (
            <div>
              <label className="label text-xs">{t("companyType")}</label>
              <select
                value={filters.companyType}
                onChange={(e) => handleChange("companyType", e.target.value)}
                disabled={filters.orgType === "SCHOOL"}
                className="input text-sm"
              >
                <option value="">{t("allCompanyTypes")}</option>
                {Object.keys(COMPANY_TYPE_LABELS).map((v) => (
                  <option key={v} value={v}>{label.companyType(v)}</option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
