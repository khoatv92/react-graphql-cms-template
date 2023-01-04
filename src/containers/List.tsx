import React from 'react';
import { ProList, ProSkeleton } from '@ant-design/pro-components';
import { Avatar } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_LOCATIONS } from 'graphql/location';

const List = () => {
  const { loading, data } = useQuery(GET_LOCATIONS);

  if (loading) {
    return (
      <ProSkeleton
        list={10}
        pageHeader={false}
        actionButton={false}
        statistic={false}
        toolbar={false}
        type="list"
      />
    );
  }

  type DataItem = typeof data.locations[string];

  return (
    <ProList<DataItem>
      ghost
      rowKey="id"
      headerTitle="Location"
      tooltip="List Location"
      loading={loading}
      dataSource={data.locations}
      pagination={{
        pageSize: 3
      }}
      metas={{
        title: {
          dataIndex: 'name'
        },
        avatar: {
          dataIndex: 'photo',
          render: (_, row) => (
            <Avatar size={128} shape="square" src={row.photo} />
          )
        },
        description: {
          dataIndex: 'description'
        }
      }}
    />
  );
};

export default List;
