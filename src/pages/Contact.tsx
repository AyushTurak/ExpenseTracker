import { useState, useEffect } from 'react';
import { PublicNavbar } from '../components/layout/PublicNavbar';
import { Footer } from '../components/layout/Footer';
import { Mail, MessageSquare, Send } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    document.title = 'Contact Us - ExpenseTracker';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Get in touch with ExpenseTracker. Contact us for support, feedback, or questions about our personal finance management platform. We are here to help you succeed.'
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData._gotcha) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xanygkjz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
        setTimeout(() => setSubmitStatus('idle'), 10000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicNavbar />

      <main>
        <section className="bg-gradient-to-br from-blue-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Have questions, feedback, or need assistance? We'd love to hear from you.
                Reach out and our team will get back to you as soon as possible.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                <a
                  href="mailto:turakayush@gmail.com"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  turakayush@gmail.com
                </a>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Support</h3>
                <p className="text-gray-600">
                  Get help with your account
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Feedback</h3>
                <p className="text-gray-600">
                  Share your ideas with us
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">
                    Thank you for your message! We'll get back to you soon.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">
                    Oops! Something went wrong. Please try again or email us directly at{' '}
                    <a href="mailto:turakayush@gmail.com" className="underline">
                      turakayush@gmail.com
                    </a>
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Report a Bug</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </div>

                <input
                  type="text"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  <span className="text-sm text-gray-500">
                    or{' '}
                    <a
                      href="mailto:turakayush@gmail.com?subject=Contact from ExpenseTracker"
                      className="text-blue-600 hover:text-blue-700 font-medium underline"
                    >
                      email us directly
                    </a>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Looking for quick answers? Check out our most common questions below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How do I get started with ExpenseTracker?
                </h3>
                <p className="text-gray-600">
                  Simply create a free account, and you'll have immediate access to all features.
                  Start by adding your first expense and explore the dashboard.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Is my financial data secure?
                </h3>
                <p className="text-gray-600">
                  Yes, we use industry-standard encryption and security measures to protect your data.
                  Your privacy is our top priority.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I export my expense data?
                </h3>
                <p className="text-gray-600">
                  Absolutely! You can export your transactions and reports in PDF and CSV formats
                  for record-keeping or analysis.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Is ExpenseTracker free to use?
                </h3>
                <p className="text-gray-600">
                  Yes, ExpenseTracker is free to use with all core features available to all users.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
