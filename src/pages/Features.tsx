import { PublicNavbar } from '../components/layout/PublicNavbar';
import { Footer } from '../components/layout/Footer';
import {
  DollarSign,
  PieChart,
  TrendingUp,
  Calendar,
  Tag,
  Download,
  Bell,
  Lock,
  BarChart3,
  Filter,
  FileText,
  Smartphone,
} from 'lucide-react';
import { useEffect } from 'react';

export const Features = () => {
  useEffect(() => {
    document.title = 'Features - ExpenseTracker Personal Finance Management';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Discover ExpenseTracker features: expense categorization, visual analytics, budget alerts, PDF reports, recurring transactions, and more. Everything you need for smart financial management.'
      );
    }
  }, []);

  const features = [
    {
      icon: <DollarSign className="w-10 h-10 text-blue-600" />,
      title: 'Comprehensive Expense Tracking',
      description:
        'Record every transaction with detailed information including amount, category, date, and notes. Keep a complete history of all your financial activities in one centralized location.',
    },
    {
      icon: <Tag className="w-10 h-10 text-blue-600" />,
      title: 'Smart Categorization',
      description:
        'Organize expenses into customizable categories like groceries, utilities, entertainment, and transportation. Create unlimited categories tailored to your specific spending patterns.',
    },
    {
      icon: <PieChart className="w-10 h-10 text-blue-600" />,
      title: 'Visual Analytics & Charts',
      description:
        'Transform your spending data into beautiful, easy-to-understand charts and graphs. Visualize spending trends, category breakdowns, and monthly comparisons at a glance.',
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-blue-600" />,
      title: 'Budget Management',
      description:
        'Set monthly budgets for each spending category and track your progress in real-time. Stay on target with visual indicators showing how much of your budget remains.',
    },
    {
      icon: <Bell className="w-10 h-10 text-blue-600" />,
      title: 'Smart Budget Alerts',
      description:
        'Receive notifications when you approach or exceed your budget limits. Stay informed and make conscious spending decisions before going over budget.',
    },
    {
      icon: <Calendar className="w-10 h-10 text-blue-600" />,
      title: 'Date Range Filtering',
      description:
        'View and analyze expenses across any time period. Filter by week, month, quarter, or custom date ranges to understand your spending patterns over time.',
    },
    {
      icon: <Download className="w-10 h-10 text-blue-600" />,
      title: 'Export to PDF & CSV',
      description:
        'Generate professional reports and export your financial data in multiple formats. Perfect for tax preparation, expense reimbursement, or record keeping.',
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-blue-600" />,
      title: 'Advanced Analytics Dashboard',
      description:
        'Access comprehensive insights including spending trends, category comparisons, and financial summaries. Make data-driven decisions with powerful analytics tools.',
    },
    {
      icon: <Filter className="w-10 h-10 text-blue-600" />,
      title: 'Flexible Filtering & Search',
      description:
        'Quickly find specific transactions using powerful search and filter options. Filter by category, date, amount range, or transaction type.',
    },
    {
      icon: <FileText className="w-10 h-10 text-blue-600" />,
      title: 'Detailed Transaction History',
      description:
        'Maintain a complete record of all transactions with timestamps, descriptions, and attachments. Edit or delete entries as needed to keep records accurate.',
    },
    {
      icon: <Lock className="w-10 h-10 text-blue-600" />,
      title: 'Secure & Private',
      description:
        'Your financial data is protected with industry-standard encryption and security measures. Your privacy is our priority, and your data stays yours.',
    },
    {
      icon: <Smartphone className="w-10 h-10 text-blue-600" />,
      title: 'Responsive Design',
      description:
        'Access your financial information from any device. Our responsive design ensures a seamless experience on desktop, tablet, and mobile devices.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicNavbar />

      <main>
        <section className="bg-gradient-to-br from-blue-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Powerful Features for Complete Financial Control
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                ExpenseTracker comes packed with everything you need to manage your personal finances effectively.
                From basic expense tracking to advanced analytics, we've got you covered.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-blue-300"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need in One Place
              </h2>
              <p className="text-lg text-gray-600">
                ExpenseTracker combines powerful functionality with an intuitive interface,
                making financial management accessible to everyone.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">Save Time:</strong> Quick transaction entry and automated categorization
                      help you track expenses in seconds, not minutes.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">Gain Clarity:</strong> Visual dashboards and reports transform raw numbers
                      into actionable insights about your spending habits.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">Stay Accountable:</strong> Budget alerts and spending notifications
                      keep you informed and help prevent overspending.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">Make Better Decisions:</strong> Historical data and trend analysis
                      empower you to make informed financial choices.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
