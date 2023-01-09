import React, { useState } from 'react';
import { ProColumns, ProDescriptions } from '@ant-design/pro-components';
import { CopyBlock, googlecode } from 'react-code-blocks';
import { faker } from '@faker-js/faker';
import {
  ExclamationCircleFilled,
  InfoCircleFilled,
  WarningFilled,
  CodeFilled,
  EyeOutlined
} from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Space, Tag } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const valueEnum: any = {
  0: 'Error',
  1: 'Info',
  2: 'Debug',
  3: 'Warn'
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const valueLevel: any = {
  Error: <ExclamationCircleFilled />,
  Info: <InfoCircleFilled />,
  Debug: <CodeFilled />,
  Warn: <WarningFilled />
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const colorLevel: any = {
  Error: '#ff4d4f',
  Info: '#1677ff',
  Debug: '#d4380d',
  Warn: '#faad14'
};

export type TableListItem = {
  key: number;
  level: string;
  time: Date;
  env: string;
  message: string;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 100; i += 1) {
  tableListDataSource.push({
    key: i,
    level: valueEnum[Math.floor(Math.random() * 10) % 4],
    time: faker.datatype.datetime(),
    env: 'local',
    message: faker.lorem.text()
  });
}

const Table = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Level',
      dataIndex: 'level',
      search: false,
      render: (_, record) => (
        <Space style={{ color: colorLevel[record.level] }}>
          {valueLevel[record.level]} {record.level}
        </Space>
      )
    },
    {
      title: 'Time',
      dataIndex: 'time',
      valueType: 'date',
      initialValue: new Date()
    },
    {
      title: 'Env',
      dataIndex: 'env',
      search: false
    },
    {
      title: 'Message',
      dataIndex: 'message',
      search: false
    },
    {
      search: false,
      render: () => {
        return [
          <Button
            size="small"
            onClick={showDrawer}
            key="view"
            type="primary"
            shape="circle"
            icon={<EyeOutlined />}
          />
        ];
      }
    }
  ];

  const res = `Error("myError")@:0
  trace()@file:///C:/example.html:9
  b(3,4,(void 0),[object Object])@file:///C:/example.html:16
  a("first call, firstarg")@file:///C:/example.html:19
  @file:///C:/example.html:21`;

  return (
    <>
      <ProTable<TableListItem>
        dataSource={tableListDataSource}
        rowKey="key"
        columns={columns}
        search={{
          filterType: 'light'
        }}
        scroll={{
          x: 'auto'
        }}
        onSubmit={(values) => console.log('values :>> ', values)}
        toolbar={{
          search: {
            onSearch: (value) => {
              console.log('object :>> ', value);
            }
          },
          settings: [
            <Tag key="debug" icon={<CodeFilled />} color="volcano">
              Debug: 2048
            </Tag>,
            <Tag key="info" icon={<InfoCircleFilled />} color="processing">
              Info: 1024
            </Tag>,
            <Tag key="warning" icon={<WarningFilled />} color="warning">
              Warning: 256
            </Tag>,
            <Tag key="error" icon={<ExclamationCircleFilled />} color="error">
              Error: 512
            </Tag>
          ]
        }}
      />
      <Drawer
        width="auto"
        placement="right"
        title="Detail"
        onClose={onClose}
        open={open}
      >
        <ProDescriptions column={1} bordered>
          <ProDescriptions.Item label="Time" valueType="dateTime">
            {Date.now()}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Request">
            <CopyBlock
              text={JSON.stringify(
                { type: 'Fiat', model: '500', color: 'white' },
                null,
                2
              )}
              language="javascript"
              theme={googlecode}
            />
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Response">
            <CopyBlock text={res} language="javascript" theme={googlecode} />
          </ProDescriptions.Item>
        </ProDescriptions>
      </Drawer>
    </>
  );
};

export default Table;
