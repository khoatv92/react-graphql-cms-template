import React from 'react';
import {
  CrownFilled,
  TabletFilled,
  LoginOutlined,
  AppstoreOutlined,
  UserOutlined
} from '@ant-design/icons';

const AppMenu = {
  route: {
    path: '/',
    routes: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        icon: <AppstoreOutlined />
      },
      {
        name: 'Components',
        icon: <TabletFilled />,
        routes: [
          {
            path: '/list',
            name: 'List',
            icon: <CrownFilled />
          },
          {
            path: '/profile',
            name: 'Profile',
            icon: <UserOutlined />
          }
        ]
      },
      {
        path: '/',
        name: 'Login',
        icon: <LoginOutlined />
      }
    ]
  }
};

export default AppMenu;
