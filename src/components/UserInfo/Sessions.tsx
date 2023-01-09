import React from 'react';
import { ProList, ProSkeleton } from '@ant-design/pro-components';
import { Avatar, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { faker } from '@faker-js/faker';
import parser, { IResult } from 'ua-parser-js';

interface Props {
  loading: boolean;
}

export type TableListItem = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  device: IResult;
  ip: string;
  id: string;
  image: string;
  desc: Date;
  localtion: string;
};
const dataSource: TableListItem[] = [];

for (let i = 0; i < 100; i += 1) {
  dataSource.push({
    ip: faker.internet.ip(),
    id: faker.datatype.uuid(),
    device: parser(faker.internet.userAgent()),
    image: 'https://cdn-icons-png.flaticon.com/128/2344/2344269.png',
    desc: faker.datatype.datetime(),
    localtion: `${faker.address.cityName()} - ${faker.address.country()}`
  });
}

type DataItem = typeof dataSource[number];

const Sessions = ({ loading }: Props) => {
  if (loading) {
    return (
      <ProSkeleton
        pageHeader={false}
        actionButton={false}
        statistic={false}
        type="list"
      />
    );
  }

  return (
    <ProList<DataItem>
      style={{ maxHeight: 345, overflow: 'auto' }}
      toolBarRender={() => {
        return [
          <Button key="add" type="primary" danger icon={<LogoutOutlined />}>
            Delete All
          </Button>
        ];
      }}
      cardBordered
      rowKey="name"
      headerTitle="You Device"
      tooltip="Where you’re signed in"
      dataSource={dataSource}
      pagination={false}
      metas={{
        title: {
          dataIndex: 'device',
          render: (_, row) => (
            <>
              {row.device.os.name} ({row.device.browser.name})
            </>
          )
        },
        subTitle: {
          dataIndex: 'ip'
        },
        avatar: {
          dataIndex: 'image',
          render: (_, row) => <Avatar shape="square" src={row.image} />
        },
        description: {
          dataIndex: 'desc',
          valueType: 'dateTime'
        },
        content: {
          dataIndex: 'localtion'
        },
        actions: {
          render: () => [
            <Button
              danger
              size="small"
              key="delete"
              type="primary"
              icon={<LogoutOutlined />}
            />
          ]
        }
      }}
    />
  );
};

export default Sessions;
