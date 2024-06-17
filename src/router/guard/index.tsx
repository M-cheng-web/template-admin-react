import { BasicLayout } from '@/layout';

import { GuardRoute } from './guardRoute';
import { useAxiosNavigation } from '@/utils/http/http_interceptor';

const AxiosNavigation = ({ children }: any) => {
  useAxiosNavigation();
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export const LayoutGuard = () => (
  <GuardRoute>
    <AxiosNavigation>
      <BasicLayout />
    </AxiosNavigation>
  </GuardRoute>
);
