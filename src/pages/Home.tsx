import { Link } from 'react-router-dom';
import { PublicNavbar } from '../components/layout/PublicNavbar';
import { Footer } from '../components/layout/Footer';
import { DollarSign, TrendingUp, PieChart, Shield, Smartphone, Download } from 'lucide-react';
import { useEffect } from 'react';

export const Home = () => {
  useEffect(() => {
    document.title = 'ExpenseTracker - Smart Personal Finance Management';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Take control of your finances with ExpenseTracker. Track expenses, analyze spending patterns, create budgets, and achieve your financial goals with our intuitive expense management tool.'
      );
    }
  }, []);

  const features = [
    {
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
      title: 'Track Every Expense',
      description: 'Record and categorize all your transactions effortlessly',
    },
    {
      icon: <PieChart className="w-8 h-8 text-blue-600" />,
      title: 'Visual Analytics',
      description: 'Understand your spending with beautiful charts and insights',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: 'Budget Management',
      description: 'Set budgets and get alerts when you approach your limits',
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and protected',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicNavbar />

      <main>
        <section className="bg-gradient-to-br from-blue-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Take Control of Your Financial Future
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                ExpenseTracker helps you understand where your money goes, make smarter financial decisions,
                and achieve your savings goals. Start tracking your expenses today and build better money habits
                for tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/features"
                  className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg"
                >
                  Explore Features
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose ExpenseTracker?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Managing personal finances doesn't have to be complicated. Our platform makes it simple
                to track spending, understand patterns, and make informed financial decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Built for Everyone Who Wants Financial Clarity
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Whether you're a student managing a tight budget, a professional tracking business expenses,
                  or a family planning for the future, ExpenseTracker adapts to your needs. Our intuitive
                  interface makes expense tracking accessible to everyone, regardless of financial expertise.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  With real-time insights and comprehensive analytics, you'll gain a complete understanding
                  of your spending habits. Identify areas where you can save, set realistic budgets, and watch
                  your financial health improve month after month.
                </p>
                <div className="flex items-center gap-6 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <span>Mobile Friendly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-blue-600" />
                    <span>Export Reports</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-8 rounded-2xl">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <span className="text-gray-600">Monthly Budget</span>
                      <span className="font-semibold text-gray-900">$2,500</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b">
                      <span className="text-gray-600">Spent This Month</span>
                      <span className="font-semibold text-blue-600">$1,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Remaining</span>
                      <span className="font-semibold text-green-600">$653</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Financial Life?
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Join thousands of users who have taken control of their finances with ExpenseTracker.
              Start your journey to financial freedom today.
            </p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Create Free Account
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
