import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MapLoader } from "@/components/map/MapLoader";
import { MapPin } from "lucide-react";

export const metadata = { title: "Stakeholder Map" };

export default function StakeholderMapPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="bg-gradient-to-br from-target-bridge to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-target-general mb-6">
                <MapPin className="h-4 w-4" />
                Stakeholder Map
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">Where We Are</h1>
              <p className="text-target-general text-xl leading-relaxed">
                Explore validated schools, companies, and organisations across the Tech Bridge VET network. Click a pin for a quick preview, or open the full profile for more detail.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <MapLoader />
        </div>
      </main>
      <Footer />
    </>
  );
}
