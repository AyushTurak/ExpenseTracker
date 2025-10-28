import { Link } from 'react-router-dom';
import { PublicNavbar } from '../components/layout/PublicNavbar';
import { Footer } from '../components/layout/Footer';
import { Calendar, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

export const Blog = () => {
  useEffect(() => {
    document.title = 'Blog - Personal Finance Tips & Expense Tracking Advice';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Read our blog for personal finance tips, budgeting advice, and expense tracking strategies. Learn how to manage money better and achieve your financial goals.'
      );
    }
  }, []);

  const blogPosts = [
    {
      slug: 'top-5-budgeting-tips',
      title: 'Top 5 Budgeting Tips for Financial Success',
      description:
        'Discover practical budgeting strategies that actually work. Learn how to create a realistic budget, stick to it, and achieve your financial goals faster.',
      date: 'October 25, 2025',
      category: 'Budgeting',
      readTime: '5 min read',
    },
    {
      slug: 'how-to-track-daily-expenses',
      title: 'How to Track Daily Expenses Effectively',
      description:
        'Master the art of daily expense tracking with our proven methods. Find out which techniques work best and how to make expense tracking a sustainable habit.',
      date: 'October 22, 2025',
      category: 'Expense Tracking',
      readTime: '6 min read',
    },
    {
      slug: 'why-financial-awareness-matters',
      title: 'Why Financial Awareness Matters More Than Ever',
      description:
        'Understanding your finances is the foundation of financial freedom. Learn why financial awareness is crucial and how it can transform your relationship with money.',
      date: 'October 18, 2025',
      category: 'Financial Literacy',
      readTime: '7 min read',
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
                Personal Finance Blog
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Expert tips, practical advice, and actionable strategies to help you master
                your finances and build lasting wealth.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all hover:border-blue-300"
                >
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {post.description}
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Read Full Article
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              New articles are published regularly. Check back often for the latest
              personal finance tips and expense tracking strategies.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
