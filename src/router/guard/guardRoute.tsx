import { Navigate, useLocation } from 'react-router-dom';

import type { ReactNode } from 'react';
import { useUserToken } from '@/stores/modules/userStore';

export const GuardRoute = ({ children }: { children: ReactNode }) => {
  const whiteList: string[] = ['/', '/login'];
  const { pathname } = useLocation();
  const token = useUserToken();
  if (!token) {
    if (whiteList.includes(pathname)) {
      return <Navigate to="/login" replace />;
    }
    return <Navigate to={`/login?redirect=${pathname}`} replace />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
