import React, { useEffect, useState } from 'react';
import { List, Typography } from 'antd';

const Activity: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const data = [
    '💫 Racing car sprays burning fuel into crowd.',
    '🪴 Japanese princess to wed commoner.',
    '⛹️‍♀️ Australian walks 100km after outback crash.',
    '🏄‍♀️ Man charged over missing wedding girl.',
    '🎮 Los Angeles battles huge wildfires.',
    '💫 Racing car sprays burning fuel into crowd.',
    '🪴 Japanese princess to wed commoner.',
    '⛹️‍♀️ Australian walks 100km after outback crash.',
    '🏄‍♀️ Man charged over missing wedding girl.',
    '🎮 Los Angeles battles huge wildfires.',
    '💫 Racing car sprays burning fuel into crowd.',
    '🪴 Japanese princess to wed commoner.',
    '⛹️‍♀️ Australian walks 100km after outback crash.',
    '🏄‍♀️ Man charged over missing wedding girl.',
    '🎮 Los Angeles battles huge wildfires.'
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <List
      loading={loading}
      bordered
      dataSource={data}
      pagination={{
        pageSize: 10
      }}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text mark>[01/12/2022 15:00]</Typography.Text> {item}
        </List.Item>
      )}
    />
  );
};

export default Activity;
