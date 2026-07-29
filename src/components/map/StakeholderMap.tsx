"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { GraduationCap, Building2, Mail, Phone, ArrowRight } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface MapProfile {
  id: string;
  orgType: "SCHOOL" | "COMPANY";
  name: string;
  city?: string | null;
  country?: string | null;
  latitude: number;
  longitude: number;
  logoUrl?: string | null;
  contactEmail?: string | null;
  telephone?: string | null;
}

const MARKER_COLOR: Record<string, string> = {
  SCHOOL: "#184c5e",
  COMPANY: "#15a1e4",
};

function markerIcon(orgType: string) {
  const color = MARKER_COLOR[orgType] ?? "#5e7d89";
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:16px;height:16px;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
  });
}

export function StakeholderMap() {
  const [profiles, setProfiles] = useState<MapProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/profiles/map")
      .then((r) => r.json())
      .then((d) => setProfiles(d.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative h-[70vh] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      {loading && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-white/70">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" />
        </div>
      )}

      <MapContainer center={[48, 12] as [number, number]} zoom={4} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {profiles.map((p) => (
          <Marker key={p.id} position={[p.latitude, p.longitude] as [number, number]} icon={markerIcon(p.orgType)}>
            <Popup minWidth={220}>
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${p.orgType === "SCHOOL" ? "bg-blue-50" : "bg-amber-50"}`}>
                  {p.logoUrl
                    ? <img src={p.logoUrl} alt={p.name} className="h-8 w-8 rounded object-contain" />
                    : p.orgType === "SCHOOL"
                      ? <GraduationCap className="h-5 w-5 text-blue-600" />
                      : <Building2 className="h-5 w-5 text-amber-600" />}
                </div>
                <div className="min-w-0">
                  <span className={`inline-block text-[11px] font-medium rounded-full px-2 py-0.5 mb-1 ${p.orgType === "SCHOOL" ? "bg-target-schools/10 text-target-schools" : "bg-target-smes/10 text-target-smes"}`}>
                    {p.orgType === "SCHOOL" ? "School / VET" : "Company / SME"}
                  </span>
                  <p className="font-semibold text-slate-900 text-sm leading-snug">{p.name}</p>
                  {(p.city || p.country) && (
                    <p className="text-xs text-slate-500 mt-0.5">{[p.city, p.country].filter(Boolean).join(", ")}</p>
                  )}
                </div>
              </div>

              {(p.contactEmail || p.telephone) && (
                <div className="mt-3 space-y-1 border-t border-slate-100 pt-2">
                  {p.contactEmail && (
                    <a href={`mailto:${p.contactEmail}`} className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-brand-700">
                      <Mail className="h-3.5 w-3.5" /> {p.contactEmail}
                    </a>
                  )}
                  {p.telephone && (
                    <a href={`tel:${p.telephone}`} className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-brand-700">
                      <Phone className="h-3.5 w-3.5" /> {p.telephone}
                    </a>
                  )}
                </div>
              )}

              <Link href={`/bridge/profiles/${p.id}`} className="mt-3 flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-800">
                View full profile <ArrowRight className="h-3 w-3" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {!loading && profiles.length === 0 && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-white/90 pointer-events-none">
          <p className="text-sm text-slate-500">No stakeholders with a location yet.</p>
        </div>
      )}
    </div>
  );
}
