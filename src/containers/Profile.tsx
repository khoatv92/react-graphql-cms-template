import React, { useEffect, useState } from 'react';
import { Card, Avatar, Tabs, Row, Col } from 'antd';
import { ProDescriptions, ProSkeleton } from '@ant-design/pro-components';

import Settings from 'components/UserInfo/Settings';
import Activity from 'components/UserInfo/Activity';
import Sessions from 'components/UserInfo/Sessions';

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const itemsTab = [
    {
      label: 'Sessions',
      key: 'item-3',
      children: <Sessions loading={loading} />
    },
    {
      label: 'Activity',
      key: 'item-1',
      children: <Activity />
    },
    { label: 'Settings', key: 'item-2', children: <Settings /> }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} xl={8}>
        {loading ? (
          <div className="proSkeleton">
            <ProSkeleton pageHeader={false} type="result" />
          </div>
        ) : (
          <Card>
            <div className="text-center">
              <Avatar size={64} src="https://i.pravatar.cc/300" />
              <h4>John</h4>
            </div>
            <ProDescriptions column={1} bordered>
              <ProDescriptions.Item label="Email">
                johncaster@mail.com
              </ProDescriptions.Item>
              <ProDescriptions.Item label="Created at" valueType="dateTime">
                2022-10-13 02:22:48.824+00
              </ProDescriptions.Item>
              <ProDescriptions.Item
                label="Status"
                valueEnum={{
                  all: { text: 'Default', status: 'Default' },
                  open: {
                    text: 'Error',
                    status: 'Error'
                  },
                  closed: {
                    text: 'Success',
                    status: 'Success'
                  },
                  processing: {
                    text: 'Processing',
                    status: 'Processing'
                  }
                }}
              >
                processing
              </ProDescriptions.Item>
              <ProDescriptions.Item
                label="Active"
                request={async () => [
                  { label: 'All', value: 'all' },
                  { label: 'open', value: 'open' },
                  { label: 'closed', value: 'closed' },
                  { label: 'processing', value: 'processing' }
                ]}
              >
                closed
              </ProDescriptions.Item>
              <ProDescriptions.Item label="Percent" valueType="progress">
                40
              </ProDescriptions.Item>
            </ProDescriptions>
          </Card>
        )}
      </Col>
      <Col xs={24} xl={16}>
        <Card>
          <Tabs items={itemsTab} />
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
