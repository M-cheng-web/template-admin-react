import {
  Button,
  Card,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Slider,
  Switch,
  TimePicker,
  TreeSelect,
} from 'antd';
import { t } from 'i18next';
import { type FC, useState, useEffect } from 'react';

import type { CascaderProps, TreeSelectProps } from 'antd';
import type { Rule } from 'antd/es/form';
import { PageWrapper } from '@/components/Page';

import { FORM_COMPO } from '@/settings/websiteSetting';

import { cascaderData, checkboxData, cityData, provinceData, radioData, treeData } from './data';

const BasicForm: FC = () => {
  const [form] = Form.useForm();

  const province = provinceData[0];
  const [formState, setFormState] = useState({
    inputLimit: '',
    inputNum: '',
    password: '',
    selectProvince: province,
    selectCity: cityData[province][0],
    dateVal: '',
    timeVal: '',
    switchVal: true,
    sliderVal: 32,
    cascaderVal: [],
    cascaderLazy: [],
    treeVal: ['0-0-1'],
    treeLazy: '1',
    radioVal: 'offline',
    checkboxVal: ['read'],
    textareaVal: '',
  });

  const formRules: Record<string, Rule[]> = {
    inputLimit: [{ required: true, message: t('内容不能为空') }],

    inputNum: [
      { required: true, message: t('内容不能为空') },
      { type: 'number', message: t('内容必须为数字值') },
    ],

    password: [
      { required: true, message: t('内容不能为空') },
      { min: 6, max: 16, message: t('密码长度在 6 到 16 个字符') },
      { pattern: /^[a-zA-Z0-9_-]{6,16}$/, message: t('密码只支持字母、数字和下划线') },
    ],
  };

  const switchVal = Form.useWatch('switchVal', form);

  const [cascaderLazyData, setCascaderLazyData] = useState<CascaderProps['options']>([
    { value: 1, label: t('选项1'), isLeaf: false },
  ]);

  const [treeLazyData, setTreeLazyData] = useState<TreeSelectProps['treeData']>([
    {
      id: 1,
      pId: 0,
      value: '1',
      title: 'Expand to load',
    },
    {
      id: 2,
      pId: 0,
      value: '2',
      title: 'Expand to load',
    },
    {
      id: 3,
      pId: 0,
      value: '3',
      title: 'Tree Node',
      isLeaf: true,
    },
  ]);

  const handleProvinceChange = (value: any) => {
    form.setFieldsValue({ selectCity: cityData[value][0] });
  };

  const loadCascaderLazy = (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    setTimeout(() => {
      targetOption.loading = false;
      let id = selectedOptions.length;
      const level = selectedOptions.length;
      targetOption.children = Array.from({ length: level + 1 }).map(() => ({
        value: ++id,
        label: t('选项{{id}}', { id }),
        isLeaf: level >= 2,
      }));
      setCascaderLazyData([...cascaderLazyData!]);
    }, 1000);
  };

  const loadTreeLazy: TreeSelectProps['loadData'] = ({ id }) => {
    const genTreeNode = (parentId: number, isLeaf = false) => {
      const random = Math.random().toString(36).substring(2, 6);
      return {
        id: random,
        pId: parentId,
        value: random,
        title: isLeaf ? 'Tree Node' : 'Expand to load',
        isLeaf,
      };
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        setTreeLazyData(
          treeLazyData?.concat([
            genTreeNode(id, false),
            genTreeNode(id, true),
            genTreeNode(id, true),
          ]),
        );
        resolve(undefined);
      }, 500);
    });
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <PageWrapper plugin={FORM_COMPO()}>
      <Card bordered={false}>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ ...formState }}
          style={{ width: '40%', margin: '0 auto' }}
          onFinish={onFinish}
        >
          <Form.Item label={t('输入框(长度限制):')} name="inputLimit" rules={formRules.inputLimit}>
            <Input showCount maxLength={20} placeholder={t('请输入内容')} />
          </Form.Item>
          <Form.Item label={t('输入框(纯数字):')} name="inputNum" rules={formRules.inputNum}>
            <InputNumber style={{ width: '100%' }} placeholder={t('请输入数字')} />
          </Form.Item>
          <Form.Item label={t('输入框(密码隐藏):')} name="password" rules={formRules.password}>
            <Input.Password maxLength={16} autoComplete="off" placeholder={t('请输入密码')} />
          </Form.Item>
          <Form.Item label={t('select选择器(联动):')}>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item name="selectProvince">
                  <Select
                    options={provinceData.map((pro: any) => ({ value: pro }))}
                    onChange={handleProvinceChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="selectCity">
                  <Select
                    options={cityData[formState.selectProvince].map((city: any) => ({
                      value: city,
                    }))}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label={t('日期和时间选择器:')} name="dateVal">
            <Row gutter={12}>
              <Col span={12}>
                <DatePicker placeholder={t('选择日期')} style={{ width: '100%' }} />
              </Col>
              <Col span={12}>
                <Form.Item name="timeVal">
                  <TimePicker placeholder={t('选择时间')} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label={t('switch开关(显示隐藏):')} name="switchVal" valuePropName="checked">
            <Switch />
          </Form.Item>
          {!switchVal ? null : (
            <>
              <Form.Item label={t('滑块条(初始值):')} name="sliderVal">
                <Slider />
              </Form.Item>
              <Form.Item label={t('级联选择器:')}>
                <Row gutter={12}>
                  <Col span={12}>
                    <Form.Item name="cascaderVal">
                      <Cascader options={cascaderData} placeholder={t('请选择')} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="cascaderLazy">
                      <Cascader
                        options={cascaderLazyData}
                        loadData={loadCascaderLazy}
                        changeOnSelect
                        placeholder={t('请输入')}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label={t('树选择器(可勾选):')} name="treeVal">
                <Row gutter={12}>
                  <Col span={12}>
                    <TreeSelect
                      treeData={treeData}
                      treeCheckable
                      allowClear
                      showCheckedStrategy={TreeSelect.SHOW_PARENT}
                      placeholder={t('请选择')}
                    />
                  </Col>
                  <Col span={12}>
                    <Form.Item name="treeLazy">
                      <TreeSelect
                        treeDataSimpleMode
                        treeData={treeLazyData}
                        loadData={loadTreeLazy}
                        placeholder={t('请选择')}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label={t('单选框(带禁止):')} name="radioVal">
                <Radio.Group options={radioData} />
              </Form.Item>
              <Form.Item label={t('多选框(带禁止):')} name="checkboxVal">
                <Checkbox.Group options={checkboxData} />
              </Form.Item>
              <Form.Item label={t('文本域(长度限制):')} name="textareaVal">
                <Input.TextArea maxLength={50} rows={3} placeholder={t('请输入内容')} />
              </Form.Item>
            </>
          )}

          <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
            <Button type="primary" htmlType="submit">
              {t('提交')}
            </Button>
            <Button style={{ marginLeft: '12px' }} onClick={resetForm}>
              {t('重置')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageWrapper>
  );
};

export default BasicForm;
