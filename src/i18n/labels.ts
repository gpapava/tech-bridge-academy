import { useTranslations } from "next-intl";

const slug = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

// Sector, region and organisation-type values are stored in English in the database
// (so filters and matching keep working). This translates them for display only.
// Values typed in by users that are not in the lists are shown as they were written.
export function useOptionLabels() {
  const t = useTranslations("options");
  const pick = (group: string, key: string, fallback: string) => {
    const path = `${group}.${key}`;
    return t.has(path) ? t(path) : fallback;
  };
  return {
    sector: (v: string) => pick("sectors", slug(v), v),
    region: (v: string) => pick("regions", slug(v), v),
    schoolType: (v: string) => pick("schoolTypes", v, v),
    companyType: (v: string) => pick("companyTypes", v, v),
  };
}
