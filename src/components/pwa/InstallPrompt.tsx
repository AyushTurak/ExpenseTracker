import { useEffect, useState } from 'react';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';
import { useToast } from '../../contexts/ToastContext';
import { Download, X } from 'lucide-react';

export const InstallPrompt = () => {
  const { isInstallable, showPrompt } = useInstallPrompt();
  const { showToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('install_prompt_dismissed');
    if (dismissed) {
      setHasBeenDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (isInstallable && !hasBeenDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isInstallable, hasBeenDismissed]);

  const handleInstall = async () => {
    try {
      await showPrompt();
      showToast('App installed successfully!', 'success');
      setIsVisible(false);
    } catch (error) {
      console.error('Install failed:', error);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('install_prompt_dismissed', 'true');
    setHasBeenDismissed(true);
  };

  if (!isVisible || !isInstallable) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
          <Download className="w-6 h-6 text-blue-600" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">Install ExpenseTracker</h3>
          <p className="text-sm text-gray-600 mb-4">
            Get instant access to your finances. Install the app on your device for a faster, offline-capable experience.
          </p>

          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Not now
            </button>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
