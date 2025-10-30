import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCurrency, CURRENCIES } from '../../contexts/CurrencyContext';
import { useToast } from '../../contexts/ToastContext';
import { DollarSign, Menu, User, LogOut, Globe } from 'lucide-react';

export const Navbar = ({ onMenuToggle }: { onMenuToggle: () => void }) => {
  const { user, signOut } = useAuth();
  const { currency, setCurrency } = useCurrency();
  const { showToast } = useToast();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleCurrencyChange = (newCurrency: typeof CURRENCIES[0]) => {
    setCurrency(newCurrency);
    setShowCurrencyMenu(false);
    showToast(`Currency set to ${newCurrency.symbol} — values updated`, 'success');
  };

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>

          <Link to="/app/dashboard" className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              ExpenseTracker
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Currency selector"
            >
              <Globe size={18} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {currency.symbol} {currency.code}
              </span>
            </button>

            {showCurrencyMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowCurrencyMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-xs font-medium text-gray-500 uppercase">Select Currency</p>
                  </div>
                  {CURRENCIES.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => handleCurrencyChange(curr)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center justify-between ${
                        curr.code === currency.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-medium">{curr.symbol}</span>
                        <span>{curr.name}</span>
                      </span>
                      {curr.code === currency.code && (
                        <span className="text-blue-600">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={18} className="text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {userName}
              </span>
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/"
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <DollarSign size={16} />
                    Home
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
