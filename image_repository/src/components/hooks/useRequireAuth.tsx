import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './useAuth';

// callback to include useEffect(to route to login page), and include auth object
export const useRequireAuth = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.user) {
      router.push('/login');
    }
  }, [auth, router]);

  return auth;
};