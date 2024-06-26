import { Card, Col, Row, Table, Transfer, Tree } from 'antd';
import { t } from 'i18next';
import React, { useState } from 'react';

import type { DataNode } from 'antd/es/tree';
import { PageWrapper } from '@/components/Page';

import { TRANSFER_COMPO } from '@/settings/websiteSetting';

import { mockData, transferDataSource, treeData } from './data';

const TransferPage: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState(['1', '5']);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['2', '6']);
  const [treeTargetKeys, setTreeTargetKeys] = useState<string[]>([]);

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const isChecked = (_selectedKeys: (string | number)[], eventKey: string | number) =>
    _selectedKeys.includes(eventKey);

  const generateTree = (treeNodes: DataNode[] = [], checkedKeys: string[] = []): DataNode[] =>
    treeNodes.map(({ children, ...props }) => ({
      ...props,
      disabled: checkedKeys.includes(props.key as string),
      children: generateTree(children, checkedKeys),
    }));

  const handleChange = (nextTargetKeys: string[]) => {
    setTreeTargetKeys(nextTargetKeys);
  };

  const getRowSelection = ({
    _selectedKeys,
    onItemSelectAll,
    onItemSelect,
  }: Record<string, any>) => ({
    onSelectAll(selected: boolean, selectedRows: Record<string, string | boolean>[]) {
      const treeSelectedKeys = selectedRows.filter((item) => !item.disabled).map(({ key }) => key);
      onItemSelectAll(treeSelectedKeys, selected);
    },
    onSelect({ key }: Record<string, string>, selected: boolean) {
      onItemSelect(key, selected);
    },
    selectedRowKeys: _selectedKeys,
  });

  return (
    <PageWrapper plugin={TRANSFER_COMPO}>
      <Row gutter={12}>
        <Col span={8}>
          <Card title={t('基础用法')} bordered={false} bodyStyle={{ height: '420px' }}>
            <Transfer
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              dataSource={mockData}
              render={(item) => item.title}
              listStyle={{ width: '230px', height: '360px' }}
              locale={{ itemsUnit: t('项') }}
              onChange={onChange}
              onSelectChange={onSelectChange}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title={t('树穿梭框')} bordered={false} bodyStyle={{ height: '420px' }}>
            <Transfer
              targetKeys={treeTargetKeys}
              dataSource={transferDataSource}
              render={(item) => item.title}
              showSelectAll={false}
              listStyle={{ width: '230px', height: '360px' }}
              onChange={handleChange}
            >
              {({ direction, selectedKeys: selectedKeys2, onItemSelect }) => {
                if (direction === 'left') {
                  const treeCheckedKeys = [...selectedKeys2, ...treeTargetKeys];
                  return (
                    <Tree
                      blockNode
                      checkable
                      checkStrictly
                      defaultExpandAll
                      checkedKeys={treeCheckedKeys}
                      treeData={generateTree(treeData, treeTargetKeys)}
                      onCheck={(_, { node: { key } }) => {
                        onItemSelect(key as string, !isChecked(treeCheckedKeys, key as string));
                      }}
                      onSelect={(_, { node: { key } }) => {
                        onItemSelect(key as string, !isChecked(treeCheckedKeys, key as string));
                      }}
                    />
                  );
                }
              }}
            </Transfer>
          </Card>
        </Col>
        <Col span={8}>
          <Card title={t('表格穿梭框')} bordered={false} bodyStyle={{ height: '420px' }}>
            <Transfer
              targetKeys={targetKeys}
              dataSource={mockData}
              listStyle={{ width: '230px', height: '360px' }}
              locale={{ itemsUnit: t('项') }}
              onChange={onChange}
            >
              {({ filteredItems, selectedKeys: selectedKeys2, onItemSelectAll, onItemSelect }) => (
                <Table
                  rowSelection={getRowSelection({ selectedKeys2, onItemSelectAll, onItemSelect })}
                  columns={[{ dataIndex: 'title', title: 'Name' }]}
                  dataSource={filteredItems}
                  size="small"
                  pagination={false}
                  onRow={({ key }) => ({
                    onClick: () => {
                      onItemSelect(key, !selectedKeys2.includes(key));
                    },
                  })}
                />
              )}
            </Transfer>
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  );
};

export default TransferPage;
