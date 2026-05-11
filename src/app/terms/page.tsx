import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="card p-8 lg:p-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
            <p className="text-sm text-slate-400 mb-10">Last updated: January 2025</p>

            <div className="prose prose-slate max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By registering an account on Tech Bridge Academy, you agree to these Terms of Service. If you do not agree, please do not use the platform.
              </p>

              <h2>2. Platform Purpose</h2>
              <p>
                Tech Bridge Academy is a digital collaboration platform developed as part of the Erasmus+ KA220-VET project &ldquo;TECH BRIDGE VET&rdquo;. It connects VET schools and manufacturing SMEs to reduce skills mismatches in the mechanical engineering sector.
              </p>

              <h2>3. Eligibility</h2>
              <p>
                The platform is open to: VET schools and technical education institutions; manufacturing companies and SMEs; project consortium partners and authorised administrators. Personal use accounts are not supported.
              </p>

              <h2>4. User Responsibilities</h2>
              <ul>
                <li>You must provide accurate and truthful information in your registration and organisation profile.</li>
                <li>You are responsible for maintaining the security of your account credentials.</li>
                <li>You may not use the platform for commercial advertising, spam, or any activity unrelated to VET and skills development.</li>
                <li>You must not upload content that infringes intellectual property rights or contains harmful material.</li>
              </ul>

              <h2>5. Profile Validation</h2>
              <p>
                Organisation profiles are subject to review and validation by platform administrators. Profiles containing false or misleading information may be rejected or removed.
              </p>

              <h2>6. Matching System</h2>
              <p>
                Match suggestions are generated algorithmically based on your profile data. Matches are indicative and do not constitute endorsements or guarantees of partnership suitability.
              </p>

              <h2>7. Content Submitted to the Repository</h2>
              <p>
                By submitting content to the Good Practices Repository, you grant the platform a non-exclusive licence to publish and distribute that content for educational purposes within the Erasmus+ project framework.
              </p>

              <h2>8. Limitation of Liability</h2>
              <p>
                The platform is provided &ldquo;as is&rdquo; for educational and networking purposes. The project consortium is not liable for the outcome of any partnerships, collaborations, or agreements formed through the platform.
              </p>

              <h2>9. Termination</h2>
              <p>
                Platform administrators may suspend or terminate accounts that violate these terms. Users may delete their accounts at any time via account settings or by contacting the team.
              </p>

              <h2>10. Changes to Terms</h2>
              <p>
                These terms may be updated from time to time. Continued use of the platform after changes constitutes acceptance of the updated terms.
              </p>

              <h2>11. Contact</h2>
              <p>
                For questions about these terms: <a href="mailto:info@techbridgeacademy.eu">info@techbridgeacademy.eu</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
