import { PublicNavbar } from '../components/layout/PublicNavbar';
import { Footer } from '../components/layout/Footer';
import { useEffect } from 'react';

export const TermsOfService = () => {
  useEffect(() => {
    document.title = 'Terms of Service - ExpenseTracker';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Read ExpenseTracker\'s terms of service to understand the rules and guidelines for using our expense tracking platform. Know your rights and responsibilities.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicNavbar />

      <main className="flex-1 py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> October 28, 2025
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              By accessing or using ExpenseTracker, you agree to be bound by these Terms of Service and
              all applicable laws and regulations. If you do not agree with any of these terms, you are
              prohibited from using or accessing this application.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              ExpenseTracker provides a web-based platform for personal expense tracking, budget management,
              and financial analytics. The service allows users to record transactions, categorize expenses,
              set budgets, generate reports, and gain insights into their spending patterns.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">User Accounts</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Account Creation</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              To use ExpenseTracker, you must create an account by providing a valid email address and
              password. You agree to provide accurate, current, and complete information during registration
              and to update this information as necessary.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Account Security</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You are responsible for maintaining the confidentiality of your account credentials and for
              all activities that occur under your account. You agree to immediately notify us of any
              unauthorized use of your account or any other breach of security.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Acceptable Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to use ExpenseTracker only for lawful purposes and in accordance with these Terms.
              You agree not to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Use the service in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any portion of the service</li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>Use automated systems to access the service without permission</li>
              <li>Impersonate another user or provide false information</li>
              <li>Upload malicious code, viruses, or any harmful content</li>
              <li>Attempt to reverse engineer or decompile any part of the service</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">User Content and Data</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Your Data</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You retain all rights to the financial data and content you submit to ExpenseTracker. By
              using the service, you grant us permission to store and process your data to provide the
              service. We will not sell or share your data with third parties except as described in our
              Privacy Policy.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Data Accuracy</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You are responsible for the accuracy of the information you enter into ExpenseTracker. While
              we provide tools to help you track and analyze expenses, we are not responsible for errors
              in your data or decisions made based on that data.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The ExpenseTracker application, including its design, code, features, and content (excluding
              user data), is owned by us and protected by copyright and other intellectual property laws.
              You may not copy, modify, distribute, sell, or lease any part of our service without explicit
              written permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Disclaimers and Limitations</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Service Availability</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              We strive to provide reliable service but do not guarantee uninterrupted access. The service
              is provided "as is" without warranties of any kind, either express or implied. We may
              temporarily suspend access for maintenance or updates without prior notice.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Financial Advice Disclaimer</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              ExpenseTracker is a tool for tracking and analyzing expenses, not a financial advisory service.
              We do not provide financial, tax, or legal advice. You should consult with qualified professionals
              for specific financial guidance.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Limitation of Liability</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              To the maximum extent permitted by law, ExpenseTracker and its developers shall not be liable
              for any indirect, incidental, special, consequential, or punitive damages resulting from your
              use or inability to use the service, including but not limited to loss of data, financial
              losses, or business interruption.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Backup and Loss</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              While we implement backup procedures, you are encouraged to regularly export and save copies
              of your financial data. We are not responsible for data loss due to technical failures,
              security breaches, or user error.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              You may terminate your account at any time through the application settings. We reserve the
              right to suspend or terminate your account if you violate these Terms or engage in fraudulent
              or illegal activity. Upon termination, your access to the service will cease, and we may
              delete your data after a reasonable period.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We may modify these Terms of Service at any time. We will notify users of significant changes
              by posting the updated terms on this page and updating the "Last Updated" date. Your continued
              use of the service after changes are posted constitutes acceptance of the modified terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              These Terms shall be governed by and construed in accordance with applicable laws, without
              regard to conflict of law provisions. Any disputes arising from these Terms or your use of
              the service shall be resolved through binding arbitration or in courts of competent jurisdiction.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Email:</strong>{' '}
              <a href="mailto:ayushturak@gmail.com" className="text-blue-600 hover:text-blue-700">
                ayushturak@gmail.com
              </a>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Severability</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will
              be limited or eliminated to the minimum extent necessary, and the remaining provisions will
              remain in full force and effect.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Entire Agreement</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              These Terms of Service, together with our Privacy Policy, constitute the entire agreement
              between you and ExpenseTracker regarding the use of the service and supersede all prior
              agreements and understandings.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
