import React, { useEffect, useState } from 'react';
import { ProList, ProSkeleton } from '@ant-design/pro-components';
import { faker } from '@faker-js/faker';

export type ListItem = {
  name: string;
  icon: string;
  time: number;
};
const listDataSource: ListItem[] = [];

for (let i = 0; i < 100; i += 1) {
  listDataSource.push({
    name: faker.lorem.lines(),
    time: Date.now() - Math.floor(Math.random() * 100000),
    icon: faker.internet.emoji()
  });
}

const Activity = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <ProSkeleton
        toolbar={false}
        pageHeader={false}
        actionButton={false}
        statistic={false}
        type="list"
      />
    );
  }

  return (
    <>
      <ProList<ListItem>
        ghost
        rowKey="name"
        dataSource={listDataSource}
        search={{
          filterType: 'light'
        }}
        pagination={{
          defaultPageSize: 10
        }}
        onSubmit={(values) => console.log('values :>> ', values)}
        metas={{
          title: {
            dataIndex: 'name',
            search: false
          },
          avatar: {
            dataIndex: 'icon',
            valueType: 'text',
            title: 'ss',
            search: false
          },
          description: {
            title: 'description',
            dataIndex: 'time',
            valueType: 'dateTime',
            search: false
          },
          subTitle: {
            render: () => <span></span>,
            title: 'Time',
            dataIndex: 'time',
            valueType: 'dateWeek'
          }
        }}
      />
    </>
  );
};

export default Activity;
