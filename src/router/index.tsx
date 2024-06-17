import { t } from 'i18next';
import { createHashRouter, Navigate, redirect, useRoutes } from 'react-router-dom';

import { getToken } from '@/utils/auth';

import { ExceptionEnum } from '@/enums/exceptionEnum';
import PageException from '@/views/exception';
import LoginPage from '@/views/login';

import { genFullPath } from './helpers';

import type { RouteObject } from './types';

import { useAxiosNavigation } from '@/utils/http/http_interceptor';

const AxiosNavigation = ({ children }: any) => {
  useAxiosNavigation();
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

const metaRoutes = import.meta.glob('./routes/*.tsx', { eager: true }) as Recordable;

const routeList: RouteObject[] = [];

Object.keys(metaRoutes).forEach((key) => {
  const module = metaRoutes[key].default || {};
  const moduleList = Array.isArray(module) ? [...module] : [module];
  genFullPath(moduleList);
  routeList.push(...moduleList);
});

const rootRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/login',
    element: (
      <AxiosNavigation>
        <LoginPage />
      </AxiosNavigation>
    ),
    meta: {
      title: t('login-title'),
      key: 'login',
    },
    loader: () => {
      if (getToken()) {
        return redirect('/');
      }
      return null;
    },
  },
  ...routeList,
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
  {
    path: '/403',
    element: <PageException />,
    loader: () => ({ status: ExceptionEnum.PAGE_NOT_ACCESS, withCard: false }),
  },
  {
    path: '/404',
    element: <PageException />,
    loader: () => ({ status: ExceptionEnum.PAGE_NOT_FOUND, withCard: false }),
  },
];

export { routeList as basicRoutes };

export const Router = () => {
  const routes = useRoutes(rootRoutes);
  return routes;
};

export default createHashRouter(rootRoutes);
