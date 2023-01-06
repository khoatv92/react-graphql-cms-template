/* eslint-disable react/prop-types */
import React, { ReactNode } from 'react';
import {
  GithubFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import {
  ProCard,
  PageContainer,
  ProConfigProvider,
  ProLayout
} from '@ant-design/pro-components';
import { useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Space, Switch } from 'antd';
import type { MenuProps } from 'antd';

import defaultProps from 'routers';

interface IProps {
  children: ReactNode;
}

const PrivateLayout = ({ children }: IProps) => {
  const navigate = useNavigate();

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

  const themes = localStorage.getItem('themes') || 'light';
  const checked = themes == 'light' ? false : true;

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
          layout="mix"
          menu={{
            collapsedShowGroupTitle: true
          }}
          title="Remax"
          logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
          actionsRender={() => {
            return [
              <Switch
                key="themes"
                checkedChildren="Dark"
                unCheckedChildren="Light"
                onChange={(value) => {
                  localStorage.setItem('themes', value ? 'dark' : 'light');
                  window.location.reload();
                }}
                defaultChecked={checked}
              />,
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
                navigate(item.path as string);
              }}
            >
              {dom}
            </div>
          )}
        >
          <PageContainer>
            <ProCard>{children}</ProCard>
          </PageContainer>
          {/* <SettingDrawer
            pathname={pathname}
            enableDarkTheme
            getContainer={() => document.getElementById('test-pro-layout')}
            settings={settings}
            onSettingChange={(changeSetting) => {
              setSetting(changeSetting);
            }}
            disableUrlParams={false}
          /> */}
        </ProLayout>
      </ProConfigProvider>
    </div>
  );
};

export default PrivateLayout;
