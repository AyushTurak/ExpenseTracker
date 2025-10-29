import { PublicNavbar } from '../components/layout/PublicNavbar';
import { Footer } from '../components/layout/Footer';
import { useEffect } from 'react';

export const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy - ExpenseTracker';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Read ExpenseTracker\'s privacy policy to understand how we collect, use, and protect your personal and financial information. Your privacy is our priority.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicNavbar />

      <main className="flex-1 py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> October 28, 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              ExpenseTracker ("we," "our," or "us") is committed to protecting your privacy and ensuring
              the security of your personal information. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our expense tracking application and services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Personal Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you register for an account, we collect:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Email address</li>
              <li>Name (optional)</li>
              <li>Password (encrypted and securely stored)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Financial Data</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              To provide expense tracking services, we store:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Transaction amounts and dates</li>
              <li>Expense categories</li>
              <li>Budget information</li>
              <li>Notes and descriptions you add to transactions</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Usage Information</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              We automatically collect certain information about your device and how you interact with
              our application, including browser type, device type, IP address, and pages visited.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Provide, operate, and maintain our expense tracking services</li>
              <li>Process and store your financial transactions</li>
              <li>Generate analytics and reports about your spending</li>
              <li>Send you notifications about budget alerts and account activity</li>
              <li>Improve and optimize our application</li>
              <li>Respond to your comments, questions, and support requests</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We implement industry-standard security measures to protect your information, including
              encryption of sensitive data, secure database storage, and regular security audits. However,
              no method of transmission over the internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We do not sell, trade, or rent your personal information to third parties. We may share your
              information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations or respond to lawful requests</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>With service providers who assist in operating our application (under strict confidentiality agreements)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Access, update, or delete your personal information</li>
              <li>Export your financial data at any time</li>
              <li>Close your account and request deletion of all data</li>
              <li>Opt out of promotional communications</li>
              <li>Request information about how we process your data</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We retain your personal information for as long as your account is active or as needed to
              provide services. If you close your account, we will delete your data within 30 days, unless
              retention is required by law.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We use cookies and similar tracking technologies to enhance your experience, remember your
              preferences, and analyze application usage. You can control cookie settings through your
              browser preferences.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Advertising and Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              ExpenseTracker uses Google AdSense to display advertisements. Google AdSense may use cookies
              and web beacons to collect information about your visits to this and other websites to provide
              advertisements about goods and services of interest to you.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the
              DART cookie enables it to serve ads to our users based on their visit to our site and other
              sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google
              Ad and Content Network privacy policy at{' '}
              <a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                https://policies.google.com/technologies/ads
              </a>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Third-party ad servers or ad networks may also use cookies, JavaScript, or web beacons in their
              respective advertisements and links that appear on ExpenseTracker. These technologies are used
              to measure the effectiveness of their advertising campaigns and to personalize advertising content.
              ExpenseTracker has no access to or control over these cookies used by third-party advertisers.
              You should consult the respective privacy policies of these third-party ad servers for more
              information on their practices and for instructions on how to opt-out of certain practices.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              ExpenseTracker is not intended for individuals under the age of 18. We do not knowingly
              collect personal information from children. If you believe we have inadvertently collected
              information from a child, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We may update this Privacy Policy periodically to reflect changes in our practices or legal
              requirements. We will notify you of significant changes by posting the updated policy on
              this page and updating the "Last Updated" date.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data
              practices, please contact us:
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Email:</strong>{' '}
              <a href="mailto:ayushturak@gmail.com" className="text-blue-600 hover:text-blue-700">
                ayushturak@gmail.com
              </a>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Consent</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              By using ExpenseTracker, you consent to this Privacy Policy and agree to its terms. If you
              do not agree with this policy, please discontinue use of our services.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
