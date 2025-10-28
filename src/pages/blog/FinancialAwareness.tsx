import { Link } from 'react-router-dom';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { Footer } from '../../components/layout/Footer';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import { useEffect } from 'react';

export const FinancialAwareness = () => {
  useEffect(() => {
    document.title = 'Why Financial Awareness Matters More Than Ever | ExpenseTracker Blog';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Discover why financial awareness is crucial in today\'s economy. Learn how understanding your finances can transform your relationship with money and lead to lasting financial freedom.'
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
                  Financial Literacy
                </span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>October 18, 2025</span>
                </div>
                <span>7 min read</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Financial Awareness Matters More Than Ever
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                In an increasingly complex financial landscape, understanding your money isn't just
                helpful—it's essential for building security and achieving your life goals.
              </p>
            </header>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Financial awareness—the clear understanding of your income, expenses, debts, savings,
                and overall financial situation—has never been more critical. In a world of instant
                transactions, subscription services, and endless spending temptations, losing track
                of money is easier than ever. Yet those who develop strong financial awareness gain
                control, reduce stress, and build lasting wealth.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">The Cost of Financial Ignorance</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Many people operate in financial darkness, checking their bank balance occasionally
                and hoping enough money remains until the next paycheck. This approach leads to
                predictable problems: overdraft fees, mounting credit card debt, inability to save,
                and constant financial stress.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Research shows that financial stress affects not just your wallet but your physical
                and mental health, relationships, and job performance. The anxiety of not knowing
                where you stand financially creates a constant background stress that diminishes
                quality of life. Financial awareness eliminates this uncertainty and replaces it
                with confidence and control.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">What Financial Awareness Actually Means</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                True financial awareness goes beyond knowing your bank balance. It means understanding:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Exactly how much money comes in each month from all sources</li>
                <li>Where every dollar goes, down to small recurring charges</li>
                <li>Your total debt and the real cost of carrying that debt</li>
                <li>How much you're saving and whether it's enough for your goals</li>
                <li>Your spending patterns and which expenses are truly necessary</li>
                <li>The financial impact of your daily decisions and habits</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-6">
                This comprehensive understanding empowers you to make informed decisions rather than
                reactive choices driven by emotion or immediate circumstances.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">The Modern Financial Complexity Challenge</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Today's financial landscape is exponentially more complex than previous generations
                experienced. Consider the factors that make financial awareness harder now:
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Subscription services create small recurring charges that accumulate without notice.
                That $10 monthly streaming service seems insignificant, but five such subscriptions
                cost $600 annually. Digital payments make spending feel less real than cash transactions.
                Investment options are overwhelming, retirement planning is increasingly self-directed,
                and economic uncertainty makes long-term planning more challenging.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                In this environment, passive financial management isn't enough. Active awareness and
                intentional management are necessary for financial success.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">The Transformative Power of Awareness</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                When you develop true financial awareness, something remarkable happens: your entire
                relationship with money changes. Instead of feeling controlled by money, you control
                it. Instead of avoiding financial tasks because they're overwhelming, you handle them
                confidently because you understand them.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Reduced Financial Stress</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Knowing exactly where you stand financially eliminates the anxiety of uncertainty.
                Even if your financial situation needs improvement, awareness allows you to create
                a plan and measure progress, which provides hope and motivation.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Better Decision Making</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Financial awareness enables informed decisions. Instead of wondering if you can afford
                something, you know. Instead of guessing whether you're saving enough, you have data.
                This clarity leads to better choices that align with your actual financial capacity
                and goals.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Improved Saving and Investing</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                When you track expenses closely, you naturally identify savings opportunities. Small
                leaks in your budget become obvious, and you can redirect that money toward goals
                that matter. People with strong financial awareness typically save significantly more
                because they see where money goes and can intentionally redirect it.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Building Financial Awareness: Where to Start</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Developing financial awareness doesn't require an accounting degree or hours of daily
                work. It starts with simple, consistent habits:
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Begin by tracking every expense for one month. Don't judge or change anything—just
                observe and record. This exercise alone will reveal insights about your spending you
                never noticed. Use a tool like ExpenseTracker to make this process quick and automatic.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Review your bank and credit card statements monthly. Look for recurring charges you
                don't recognize or forgot about. Calculate your monthly income and essential expenses
                to understand your baseline financial requirements.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Set aside time weekly—even just 15 minutes—to review your finances. This regular
                check-in keeps you connected to your money and prevents problems from growing unnoticed.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">The Long-Term Benefits</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Financial awareness compounds over time. The more you practice it, the more natural
                it becomes, and the better your financial outcomes. People who maintain strong financial
                awareness over years typically achieve goals others consider impossible: becoming
                debt-free, building substantial savings, affording major purchases without stress, and
                retiring comfortably.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                These outcomes aren't about earning more money—they're about understanding and managing
                the money you have. Financial awareness is the foundation that makes all other financial
                strategies possible.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Conclusion</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                In today's complex financial world, awareness isn't optional for those who want financial
                success and security. It's the essential first step that enables everything else. Whether
                you're struggling with debt, living paycheck to paycheck, or simply wanting to optimize
                your finances, it all starts with awareness.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                The good news is that building financial awareness is completely within your control.
                It doesn't depend on your income level, education, or past financial mistakes. It simply
                requires commitment to understanding your money and taking consistent action. Start today,
                and watch how this single habit transforms your entire financial life.
              </p>
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Build Your Financial Awareness
              </h3>
              <p className="text-gray-700 mb-4">
                ExpenseTracker provides the tools you need to develop and maintain strong financial
                awareness through effortless tracking and insightful analytics.
              </p>
              <Link
                to="/register"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Your Journey
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};
