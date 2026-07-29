import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NetworkingBoard } from "@/components/networking/NetworkingBoard";
import { Megaphone } from "lucide-react";

export const metadata = { title: "Networking Board" };

export default function NetworkingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="bg-gradient-to-br from-brand-900 to-brand-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-brand-200 mb-6">
                <Megaphone className="h-4 w-4" />
                Bridge Area · Networking
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Networking Board
              </h1>
              <p className="text-brand-200 text-lg leading-relaxed">
                A shared notice board for the Tech Bridge Academy network. Post announcements, look for partners, or offer collaboration opportunities to schools and companies across the community.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <NetworkingBoard />
        </div>
      </main>
      <Footer />
    </>
  );
}
