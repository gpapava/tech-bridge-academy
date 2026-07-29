import { NextRequest, NextResponse } from "next/server";

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    country?: string;
  };
}

export async function GET(req: NextRequest) {
  const q = new URL(req.url).searchParams.get("q")?.trim();
  if (!q || q.length < 3) return NextResponse.json({ data: [] });

  const params = new URLSearchParams({
    format: "jsonv2",
    addressdetails: "1",
    limit: "5",
    q,
  });

  const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
    headers: { "User-Agent": "TechBridgeAcademy/1.0 (contact@techbridgeacademy.eu)" },
  });

  if (!res.ok) return NextResponse.json({ data: [] });

  const results: NominatimResult[] = await res.json();

  const data = results.map((r) => ({
    label: r.display_name,
    city: r.address?.city ?? r.address?.town ?? r.address?.village ?? r.address?.municipality ?? "",
    country: r.address?.country ?? "",
    latitude: parseFloat(r.lat),
    longitude: parseFloat(r.lon),
  }));

  return NextResponse.json({ data });
}
