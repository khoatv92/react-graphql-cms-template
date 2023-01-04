/* eslint-disable react/prop-types */
import React, { ReactNode, useState } from 'react';
import {
  GithubFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import {
  ProCard,
  PageContainer,
  ProConfigProvider,
  ProLayout,
  SettingDrawer
} from '@ant-design/pro-components';
import { useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';

import defaultProps from 'routers';

interface IProps {
  children: ReactNode;
}

const PrivateLayout = ({ children }: IProps) => {
  const navigate = useNavigate();
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: false
  });

  const [pathname] = useState('/dashboard');

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Profile',
      icon: <UserOutlined />
    },
    {
      key: '2',
      label: <a>Sign out</a>,
      danger: true,
      icon: <LogoutOutlined />
    }
  ];

  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh'
      }}
    >
      <ProConfigProvider hashed={false}>
        <ProLayout
          {...defaultProps}
          menu={{
            collapsedShowGroupTitle: true
          }}
          title="Remax"
          logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
          actionsRender={() => {
            return [
              <InfoCircleFilled key="InfoCircleFilled" />,
              <QuestionCircleFilled key="QuestionCircleFilled" />,
              <GithubFilled key="GithubFilled" />,
              <Dropdown key="dd" menu={{ items }} trigger={['click']}>
                <Space style={{ height: 50 }}>
                  <Avatar src="https://i.pravatar.cc/300" />
                  John Caster
                </Space>
              </Dropdown>
            ];
          }}
          headerTitleRender={(logo, title, _) => {
            const defaultDom = (
              <a>
                {logo}
                {title}
              </a>
            );
            if (document.body.clientWidth < 1400) {
              return defaultDom;
            }
            if (_.isMobile) return defaultDom;
            return <>{defaultDom}</>;
          }}
          menuFooterRender={(props) => {
            if (props?.collapsed) return undefined;
            return (
              <div
                style={{
                  textAlign: 'center',
                  paddingBlockStart: 12
                }}
              >
                <div>© 2021 Made with love</div>
                <div>by Ant Design</div>
              </div>
            );
          }}
          onMenuHeaderClick={(e) => console.log(e)}
          menuItemRender={(item, dom) => (
            <div
              onClick={() => {
                console.log('object :>> ', item);
                navigate(item.path as string);
              }}
            >
              {dom}
            </div>
          )}
          {...settings}
        >
          <PageContainer>
            <ProCard>{children}</ProCard>
          </PageContainer>
          <SettingDrawer
            pathname={pathname}
            enableDarkTheme
            getContainer={() => document.getElementById('test-pro-layout')}
            settings={settings}
            onSettingChange={(changeSetting) => {
              setSetting(changeSetting);
            }}
            disableUrlParams={false}
          />
        </ProLayout>
      </ProConfigProvider>
    </div>
  );
};

export default PrivateLayout;
