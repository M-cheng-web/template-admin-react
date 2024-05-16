import { type ReactNode, Suspense } from 'react';

import type { LoadableComponent } from '@loadable/component';
import Loading from './Loading';

/**
 * @description 路由懒加载
 * @param {Element} Component 需要访问的组件
 * @returns element
 */
const LazyLoad = (Component: LoadableComponent<{}>): ReactNode => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

export default LazyLoad;
