import { Button, Card, Result } from 'antd';
import { t } from 'i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';

import type { FC, ReactNode } from 'react';
import SvgIcon from '@/components/SvgIcon';

const subTitleMap = new Map([
  [403, t('对不起，您没有权限访问此页面。')],
  [404, t('common-404')],
  [500, t('对不起，服务器发生错误。')],
]);

const PageException: FC = () => {
  const navigate = useNavigate();

  const { status, withCard } = useLoaderData() as { status: any; withCard: boolean };

  const goHome = () => {
    navigate('/mine');
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const WithCard = ({ children }: { children: ReactNode }) => {
    if (withCard) {
      return <Card bordered={false}>{children}</Card>;
    }
    return (
      <div className="flex-center" style={{ height: '100vh' }}>
        {children}
      </div>
    );
  };

  return (
    <WithCard>
      <Result
        // status={status}
        title={status}
        icon={<SvgIcon size={380} name={status} />}
        subTitle={t('common-404')}
        // subTitle={subTitleMap.get(status)}
        extra={
          <Button type="primary" onClick={goHome}>
            {t('404-goHome')}
          </Button>
        }
      />
    </WithCard>
  );
};

export default PageException;
