import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="card p-8 lg:p-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
            <p className="text-sm text-slate-400 mb-10">Last updated: January 2025</p>

            <div className="prose prose-slate max-w-none">
              <h2>1. Data Controller</h2>
              <p>
                Tech Bridge Academy is operated within the framework of the Erasmus+ KA220-VET project &ldquo;TECH BRIDGE VET&rdquo;. The data controller is the project coordinator. For data-related inquiries, please contact: <a href="mailto:privacy@techbridgeacademy.eu">privacy@techbridgeacademy.eu</a>.
              </p>

              <h2>2. What Data We Collect</h2>
              <p>We collect the following categories of personal data:</p>
              <ul>
                <li><strong>Account data:</strong> name, email address, encrypted password, user role.</li>
                <li><strong>Organisation profile data:</strong> organisation name, description, sector, region, contact details.</li>
                <li><strong>Activity data:</strong> survey responses, event registrations, match interactions.</li>
                <li><strong>Technical data:</strong> IP address (for security purposes only), browser type, session tokens.</li>
              </ul>

              <h2>3. Legal Basis for Processing</h2>
              <p>We process personal data on the basis of:</p>
              <ul>
                <li><strong>Contract:</strong> to provide the platform services you registered for.</li>
                <li><strong>Legitimate interest:</strong> to match organisations, generate statistics, and improve the platform.</li>
                <li><strong>Consent:</strong> for optional communications and data sharing with consortium partners.</li>
              </ul>

              <h2>4. How We Use Your Data</h2>
              <ul>
                <li>To create and manage your account and organisation profile.</li>
                <li>To run the matching engine and suggest relevant partner organisations.</li>
                <li>To send platform notifications related to matches, events, and surveys.</li>
                <li>To generate anonymised aggregate statistics for Erasmus+ project reporting.</li>
                <li>To comply with legal obligations.</li>
              </ul>

              <h2>5. Data Sharing</h2>
              <p>
                Your organisation profile (if set to Public visibility) is visible to other registered members of the platform. We do not sell personal data to third parties. Anonymised aggregate data may be shared with Erasmus+ funding bodies for project reporting.
              </p>

              <h2>6. Data Retention</h2>
              <p>
                Account data is retained for the duration of your account. Organisation profile data may be retained in anonymised form after account deletion for historical records. You may request deletion of your account and associated personal data at any time.
              </p>

              <h2>7. Your Rights (GDPR)</h2>
              <p>Under the GDPR, you have the right to:</p>
              <ul>
                <li><strong>Access</strong> your personal data.</li>
                <li><strong>Rectify</strong> inaccurate data.</li>
                <li><strong>Erase</strong> your data (&ldquo;right to be forgotten&rdquo;).</li>
                <li><strong>Restrict</strong> processing in certain circumstances.</li>
                <li><strong>Data portability</strong> — receive your data in a machine-readable format.</li>
                <li><strong>Object</strong> to processing based on legitimate interests.</li>
                <li><strong>Withdraw consent</strong> at any time (where processing is consent-based).</li>
              </ul>
              <p>
                To exercise these rights, contact us at <a href="mailto:privacy@techbridgeacademy.eu">privacy@techbridgeacademy.eu</a>.
              </p>

              <h2>8. Cookies</h2>
              <p>
                We use essential cookies for session management and authentication. No third-party tracking cookies are used. See our <a href="/cookies">Cookie Policy</a> for details.
              </p>

              <h2>9. Security</h2>
              <p>
                Passwords are stored using bcrypt hashing. Data is transmitted over HTTPS. We apply access controls and logging to protect against unauthorised access.
              </p>

              <h2>10. Contact</h2>
              <p>
                For any privacy-related questions or to exercise your rights, contact: <a href="mailto:privacy@techbridgeacademy.eu">privacy@techbridgeacademy.eu</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
