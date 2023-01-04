import React, { useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Statistic, Divider } from 'antd';
import RcResizeObserver from 'rc-resize-observer';

const Index = () => {
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard.Group title="核心指标" direction={responsive ? 'column' : 'row'}>
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
  );
};

export default Index;
