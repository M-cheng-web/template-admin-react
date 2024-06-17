// import { GButton } from 'gbeata';
import { t } from 'i18next';

const GbeataForm = () => {
  const fields: Array<any> = [
    {
      title: t('中文名'),
      key: 'cn',
    },
    {
      title: t('年龄'),
      type: 'slider',
      key: 'sex',
    },
  ];

  const handleConfirm = (form: any) => {
    console.log(form);
    alert(JSON.stringify(form));
  };

  return (
    <button style={{ marginLeft: 120 }} type="primary" htmlType="submit">
      {t('提交')}
    </button>
    // <GButton style={{ marginLeft: 120 }} type='primary' htmlType='submit'>
    //   {t('提交')}
    // </GButton>
  );
};

export default GbeataForm;
