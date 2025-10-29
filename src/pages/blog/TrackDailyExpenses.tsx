import { Link } from 'react-router-dom';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { Footer } from '../../components/layout/Footer';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import { useEffect } from 'react';

export const TrackDailyExpenses = () => {
  useEffect(() => {
    document.title = 'How to Track Daily Expenses Effectively | ExpenseTracker Blog';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Learn proven methods for tracking daily expenses effectively. Discover practical tips, tools, and strategies to make expense tracking a sustainable habit for better financial management.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicNavbar />

      <main>
        <article className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>

            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Expense Tracking
                </span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>October 22, 2025</span>
                </div>
                <span>6 min read</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How to Track Daily Expenses Effectively
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Master daily expense tracking with proven methods that make it easy, sustainable,
                and actually beneficial for your financial health.
              </p>
            </header>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Tracking daily expenses is one of the most powerful financial habits you can develop.
                It provides clarity about your spending patterns, helps identify areas to cut costs,
                and keeps you accountable to your financial goals. Yet many people start tracking
                expenses only to give up within a few weeks. The key is finding a method that fits
                seamlessly into your daily routine.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Why Track Daily Expenses?</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Before diving into the how, let's understand the why. Daily expense tracking gives you
                a complete picture of your financial behavior. Without it, you're essentially operating
                in the dark, wondering why money disappears from your account each month. Studies show
                that people who track expenses regularly save significantly more than those who don't.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Beyond the numbers, tracking expenses builds financial awareness and discipline. It
                creates a pause before each purchase, making you more intentional with your spending
                decisions. This mindfulness alone can reduce impulse purchases and unnecessary expenses.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Choose the Right Tracking Method</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The best expense tracking method is the one you'll actually use consistently. Here are
                the most effective approaches:
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Digital Expense Tracking Apps</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Modern expense tracking apps like ExpenseTracker offer the perfect balance of convenience
                and functionality. You can record transactions in seconds, categorize them automatically,
                and access detailed analytics. The key advantages include cloud sync across devices,
                automatic calculations, and visual reports that make your data meaningful.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Mobile-First Approach</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Since you likely have your phone with you constantly, a mobile-friendly tracking solution
                ensures you can record expenses immediately. Waiting until you get home means you'll
                forget transactions or lose receipts. Record each expense right after making it, which
                takes just 10-15 seconds with the right app.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Spreadsheet Tracking</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                For those who prefer more control and customization, spreadsheets work well. Create
                columns for date, description, category, and amount. While more manual than apps,
                spreadsheets offer unlimited flexibility in how you organize and analyze your data.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Establish a Daily Routine</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Consistency is crucial for successful expense tracking. Build it into your existing
                routines rather than treating it as a separate task. Here are effective strategies:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>
                  <strong>Real-Time Tracking:</strong> Record each transaction immediately after making
                  it, while you're still at the store or restaurant.
                </li>
                <li>
                  <strong>End-of-Day Review:</strong> Spend 5 minutes before bed reviewing the day's
                  expenses and adding any you missed.
                </li>
                <li>
                  <strong>Weekly Check-In:</strong> Every Sunday, review your week's spending and ensure
                  all transactions are categorized correctly.
                </li>
                <li>
                  <strong>Receipt Management:</strong> Take photos of receipts immediately and attach
                  them to transactions, then discard paper receipts.
                </li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Categorize Intelligently</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Proper categorization turns raw data into actionable insights. Start with broad categories
                like groceries, transportation, utilities, entertainment, and dining out. As you track
                longer, you can add subcategories for more detailed analysis.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Don't overcomplicate it initially. Having 30 different categories sounds thorough but
                becomes overwhelming. Start with 8-10 main categories and expand only if needed for your
                specific financial goals.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Handle Different Payment Methods</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                In today's world, we pay with cash, debit cards, credit cards, and digital wallets.
                Each requires a slightly different tracking approach:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>
                  <strong>Cash Transactions:</strong> These are easiest to forget. Record them immediately
                  or keep all receipts in your wallet for end-of-day entry.
                </li>
                <li>
                  <strong>Card Payments:</strong> Check your bank statements regularly to catch any
                  missed transactions, but don't rely solely on bank records.
                </li>
                <li>
                  <strong>Subscriptions:</strong> Set up recurring transactions for monthly subscriptions
                  so they're automatically tracked without manual entry.
                </li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Make It Sustainable</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                The difference between people who succeed at expense tracking and those who quit is
                sustainability. Here's how to make it stick:
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Keep it simple. Don't aim for perfection—aim for consistency. Missing a transaction
                or miscategorizing something occasionally is normal. Focus on tracking at least 90%
                of your expenses, which provides enough data for meaningful insights.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Review your data regularly. The whole point of tracking is to use the information to
                improve your financial decisions. Schedule monthly reviews to identify spending patterns,
                celebrate wins where you stayed under budget, and adjust strategies for categories where
                you overspent.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Effective daily expense tracking doesn't require hours of work or complex systems. It
                requires choosing the right tool, building simple routines, and staying consistent. Start
                today by tracking just one day of expenses. Once you see how quick and valuable it is,
                you'll naturally want to continue.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Remember, every financial success story starts with awareness. Expense tracking provides
                that awareness and empowers you to make better money decisions every single day.
              </p>
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Start Tracking Expenses Today
              </h3>
              <p className="text-gray-700 mb-4">
                ExpenseTracker makes daily expense tracking effortless with quick entry, smart
                categorization, and insightful analytics.
              </p>
              <Link
                to="/register"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try It Free
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};
