import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { Icon } from '@iconify/react';
import { Button, Dropdown } from 'antd';

import type { MenuProps } from 'antd';

const Selectlangulage = () => {
  const { i18n } = useTranslation();
  const languages: MenuProps['items'] = [
    {
      key: 'zh',
      label: '中文',
    },
    {
      key: 'en',
      label: 'English',
    },
  ];

  return (
    <Dropdown
      menu={{ items: languages, onClick: ({ key }) => i18n.changeLanguage(key) }}
      trigger={['click']}
    >
      <Button
        shape="circle"
        size="small"
        icon={
          <span className="anticon">
            <Icon icon="ant-design:global-outlined" />
          </span>
        }
      />
    </Dropdown>
  );
};

export default Selectlangulage;
