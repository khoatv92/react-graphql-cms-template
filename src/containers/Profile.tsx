import React, { useEffect, useState } from 'react';
import { Card, Avatar, Tabs, Row, Col } from 'antd';
import { ProDescriptions } from '@ant-design/pro-components';

import Settings from 'components/UserInfo/Settings';
import Activity from 'components/UserInfo/Activity';
import Sessions from 'components/UserInfo/Sessions';

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const itemsTab = [
    { label: 'Sessions', key: 'item-3', children: <Sessions /> },
    {
      label: 'Activity',
      key: 'item-1',
      children: <Activity loading={loading} />
    },
    { label: 'Settings', key: 'item-2', children: <Settings /> }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} xl={8}>
        <Card>
          <div className="text-center">
            <Avatar size={64} src="https://i.pravatar.cc/300" />
            <h4>John</h4>
          </div>
          <ProDescriptions column={2} loading={loading}>
            <ProDescriptions.Item
              label="金额"
              tooltip="仅供参考，以实际为准"
              valueType="money"
            >
              100
            </ProDescriptions.Item>
            <ProDescriptions.Item label="百分比" valueType="percent">
              100
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label="选择框"
              valueEnum={{
                all: { text: '全部', status: 'Default' },
                open: {
                  text: '未解决',
                  status: 'Error'
                },
                closed: {
                  text: '已解决',
                  status: 'Success'
                },
                processing: {
                  text: '解决中',
                  status: 'Processing'
                }
              }}
            >
              open
            </ProDescriptions.Item>
            <ProDescriptions.Item
              label="远程选择框"
              request={async () => [
                { label: '全部', value: 'all' },
                { label: '未解决', value: 'open' },
                { label: '已解决', value: 'closed' },
                { label: '解决中', value: 'processing' }
              ]}
            >
              closed
            </ProDescriptions.Item>
            <ProDescriptions.Item label="进度条" valueType="progress">
              40
            </ProDescriptions.Item>
          </ProDescriptions>
        </Card>
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
