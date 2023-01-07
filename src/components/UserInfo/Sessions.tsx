import React from 'react';
import { ProList, ProSkeleton } from '@ant-design/pro-components';
import { Avatar, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

interface Props {
  loading: boolean;
}

const dataSource = [
  {
    name: 'Mac OS',
    image: 'https://cdn-icons-png.flaticon.com/128/2344/2344269.png',
    desc: '2022-10-13 02:22:48.824+00',
    localtion: 'Hanoi, VietNam'
  },
  {
    name: 'IPhone 14 ProMax',
    image: 'https://cdn-icons-png.flaticon.com/128/545/545245.png',
    desc: '2022-10-13 02:22:48.824+00',
    localtion: 'Hanoi, VietNam'
  },
  {
    name: 'S22 Ultra',
    image: 'https://cdn-icons-png.flaticon.com/128/545/545245.png',
    desc: '2022-10-13 02:22:48.824+00',
    localtion: 'Hanoi, VietNam'
  },
  {
    name: 'Mac OS',
    image: 'https://cdn-icons-png.flaticon.com/128/2344/2344269.png',
    desc: '2022-10-13 02:22:48.824+00',
    localtion: 'Hanoi, VietNam'
  },
  {
    name: 'IPhone 14 ProMax',
    image: 'https://cdn-icons-png.flaticon.com/128/545/545245.png',
    desc: '2022-10-13 02:22:48.824+00',
    localtion: 'Hanoi, VietNam'
  },
  {
    name: 'S22 Ultra',
    image: 'https://cdn-icons-png.flaticon.com/128/545/545245.png',
    desc: '2022-10-13 02:22:48.824+00',
    localtion: 'Hanoi, VietNam'
  },
  {
    name: 'Mac OS',
    image: 'https://cdn-icons-png.flaticon.com/128/2344/2344269.png',
    desc: '2022-10-13 02:22:48.824+00',
    localtion: 'Hanoi, VietNam'
  },
  {
    name: 'IPhone 14 ProMax',
    image: 'https://cdn-icons-png.flaticon.com/128/545/545245.png',
    desc: '2022-10-13 02:22:48.824+00',
    localtion: 'Hanoi, VietNam'
  },
  {
    name: 'S22 Ultra',
    image: 'https://cdn-icons-png.flaticon.com/128/545/545245.png',
    desc: '2022-10-13 02:22:48.824+00',
    localtion: 'Hanoi, VietNam'
  },
  {
    name: 'Mac OS',
    image: 'https://cdn-icons-png.flaticon.com/128/2344/2344269.png',
    desc: '2022-10-13 02:22:48.824+00',
    localtion: 'Hanoi, VietNam'
  },
  {
    name: 'IPhone 14 ProMax',
    image: 'https://cdn-icons-png.flaticon.com/128/545/545245.png',
    desc: '2022-10-13 02:22:48.824+00',
    localtion: 'Hanoi, VietNam'
  },
  {
    name: 'S22 Ultra',
    image: 'https://cdn-icons-png.flaticon.com/128/545/545245.png',
    desc: '2022-10-13 02:22:48.824+00',
    localtion: 'Hanoi, VietNam'
  }
];

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
          dataIndex: 'name'
        },
        subTitle: {
          dataIndex: 'localtion'
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
