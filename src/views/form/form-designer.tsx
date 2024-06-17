import { Card } from 'antd';

import type { FC } from 'react';
import { PageWrapper } from '@/components/Page';

import { FORM_CREATE_DESIGNER } from '@/settings/websiteSetting';

const FormCreate: FC = () => (
  <PageWrapper plugin={FORM_CREATE_DESIGNER}>
    <Card bordered={false} />
  </PageWrapper>
);

export default FormCreate;
