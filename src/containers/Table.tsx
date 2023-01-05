import React, { useState } from 'react';
import { ProColumns, ProDescriptions } from '@ant-design/pro-components';
import {
  ExclamationCircleFilled,
  InfoCircleFilled,
  WarningFilled,
  CodeFilled,
  EyeOutlined
} from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Space } from 'antd';

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
  Error: '#c01',
  Info: '#1677ff',
  Debug: '#ff4d4f',
  Warn: '#faad14'
};

export type TableListItem = {
  key: number;
  level: string;
  time: number;
  env: string;
  message: string;
};
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 100; i += 1) {
  tableListDataSource.push({
    key: i,
    level: valueEnum[Math.floor(Math.random() * 10) % 4],
    time: Date.now() - Math.floor(Math.random() * 100000),
    env: 'local',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius est, nesciunt minima deleniti labore harum aliquid amet accusamus.'
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
      valueType: 'date'
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
        onSubmit={(values) => console.log('values :>> ', values)}
        toolbar={{
          search: {
            onSearch: (value) => {
              console.log('object :>> ', value);
            }
          },
          settings: []
        }}
      />
      <Drawer
        width="50%"
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
            <pre>
              {JSON.stringify(
                { type: 'Fiat', model: '500', color: 'white' },
                null,
                2
              )}
            </pre>
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Response">
            <pre>{res}</pre>
          </ProDescriptions.Item>
        </ProDescriptions>
      </Drawer>
    </>
  );
};

export default Table;
