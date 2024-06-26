import { lazy } from '@loadable/component';
import { t } from 'i18next';

import LazyLoad from '@/components/LazyLoad';

import { LayoutGuard } from '../guard';

import type { RouteObject } from '../types';

// user module page
const UserRoute: RouteObject = {
  path: '/user',
  element: <LayoutGuard />,
  meta: {
    title: t('用户管理'),
    icon: 'ic_user',
    orderNo: 2,
    iconSize: 20,
  },
  children: [
    {
      path: 'profile',
      element: LazyLoad(lazy(() => import('@/views/user/profile'))),
      meta: {
        title: t('个人中心'),
        key: 'profile',
      },
    },
    {
      path: 'user-list',
      element: LazyLoad(lazy(() => import('@/views/user/list'))),
      meta: {
        title: t('用户列表'),
        key: 'userList',
      },
    },
    {
      path: 'add-user',
      element: LazyLoad(lazy(() => import('@/views/user/addUser'))),
      meta: {
        title: t('添加用户'),
        key: 'addUser',
      },
    },
  ],
};
export default UserRoute;
