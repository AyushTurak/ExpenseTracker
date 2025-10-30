import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PageLoader } from '../ui/Loader';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const isAdSenseReviewMode = import.meta.env.VITE_ADSENSE_REVIEW_MODE === 'true';

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user && !isAdSenseReviewMode) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
