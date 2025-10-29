import { PublicNavbar } from '../components/layout/PublicNavbar';
import { Footer } from '../components/layout/Footer';
import { Heart, Target, Users, Lightbulb } from 'lucide-react';
import { useEffect } from 'react';

export const About = () => {
  useEffect(() => {
    document.title = 'About Us - ExpenseTracker by Ayush Turak';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Learn about ExpenseTracker and its creator Ayush Turak. Discover the mission behind our personal finance management tool and our commitment to helping people achieve financial wellness.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicNavbar />

      <main>
        <section className="bg-gradient-to-br from-blue-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About ExpenseTracker
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Empowering individuals to take control of their financial future through
                simple, effective expense tracking and insightful analytics.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                ExpenseTracker was created by <strong>Ayush Turak</strong>, a passionate developer who recognized
                the universal challenge of managing personal finances. Like many people, Ayush struggled with
                understanding where money was going each month and found existing financial tools either too
                complicated or lacking essential features.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                The motivation behind ExpenseTracker came from a simple realization: financial awareness is the
                first step toward financial freedom. Many people avoid tracking expenses because traditional
                methods are time-consuming and intimidating. Ayush set out to build a solution that would make
                expense tracking not just easy, but actually enjoyable.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                What started as a personal project to solve a real-world problem has evolved into a comprehensive
                financial management platform. ExpenseTracker combines intuitive design with powerful analytics,
                making it accessible to everyone from college students managing their first budget to professionals
                tracking complex expense categories.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Today, ExpenseTracker serves users who want clarity in their financial lives. The platform continues
                to evolve based on user feedback and real-world needs, always staying true to its core mission:
                making personal finance management simple, transparent, and empowering.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do and every feature we build.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Simplicity First</h3>
                <p className="text-gray-600 leading-relaxed">
                  Financial management should be straightforward, not complicated. We design every feature
                  with simplicity and usability in mind, ensuring anyone can start tracking expenses
                  within minutes.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">User-Centric Design</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every feature is built with real user needs in mind. We listen to feedback, understand
                  pain points, and continuously improve the platform to serve our community better.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Empowerment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Knowledge is power, especially when it comes to personal finances. We provide the tools
                  and insights needed to make informed decisions and achieve financial goals.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy & Security</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your financial data is personal and sensitive. We take security seriously and implement
                  industry-standard practices to keep your information safe and private.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet the Developer
              </h2>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">AT</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Ayush Turak</h3>
                  <p className="text-blue-600 font-medium mb-4">Founder & Developer</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Ayush is a full-stack developer with a passion for creating practical solutions to everyday
                    problems. With expertise in modern web technologies and a keen understanding of user experience,
                    Ayush has built ExpenseTracker from the ground up to be both powerful and accessible.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    When not coding, Ayush enjoys exploring new technologies, reading about personal finance,
                    and connecting with users to understand how ExpenseTracker can better serve their needs.
                    The goal is simple: help people achieve financial clarity and confidence through better
                    expense management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Be part of thousands of users taking control of their financial future.
              Start your journey with ExpenseTracker today.
            </p>
            <a
              href="/register"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Get Started Free
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
