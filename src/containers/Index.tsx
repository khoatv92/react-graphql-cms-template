import React, { useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Statistic, Divider, Row, Card } from 'antd';
import RcResizeObserver from 'rc-resize-observer';
import ChartDashboard from 'components/Chart/Dashboard';

const chart = [
  { title: '$424,652', subtitle: 'Sales' },
  { title: '$235,312', subtitle: 'Expenses' },
  { title: '$135,965', subtitle: 'Profits' }
];

const Index = () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard.Group
          bordered
          title="Overview"
          direction={responsive ? 'column' : 'row'}
        >
          <ProCard>
            <Statistic title="今日UV" value={79.0} precision={2} />
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard>
            <Statistic title="冻结金额" value={112893.0} precision={2} />
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard>
            <Statistic title="信息完整度" value={93} suffix="/ 100" />
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard>
            <Statistic title="冻结金额" value={112893.0} />
          </ProCard>
        </ProCard.Group>
      </RcResizeObserver>
      <br />
      <Card bordered title="Chart">
        <Row gutter={[24, 24]}>
          {chart.map((item) => (
            <ChartDashboard
              key={item.title}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))}
        </Row>
      </Card>
    </>
  );
};

export default Index;
