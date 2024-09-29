import { ROUTES } from '@/lib/routing';
import { useAuth } from '../state/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
    }
  }, [isAuthenticated, router]);

  return isAuthenticated;
};
