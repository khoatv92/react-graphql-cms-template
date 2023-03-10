import React from 'react';
import { TabletFilled, AppstoreOutlined } from '@ant-design/icons';

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
            name: 'List'
          },
          {
            path: '/profile',
            name: 'Profile'
          },
          {
            path: '/table',
            name: 'Table'
          }
        ]
      }
    ]
  }
};

export default AppMenu;
