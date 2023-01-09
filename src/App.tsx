/* eslint-disable react/no-children-prop */
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ConfigProvider, Skeleton, Result } from 'antd';
import en_US from 'antd/es/locale/en_US';
import { message as messageAntd } from 'antd';
import { useLocation } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
  ApolloProvider
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import PrivateLayout from 'components/layouts/Private';
import { useAppContext } from 'AppContext';

const Index = lazy(() => sleep(1000).then(() => import('containers/Index')));
const Table = lazy(() => sleep(1000).then(() => import('containers/Table')));
const List = lazy(() => sleep(1000).then(() => import('containers/List')));
const Profile = lazy(() =>
  sleep(1000).then(() => import('containers/Profile'))
);
const NewPassword = lazy(() =>
  sleep(1000).then(() => import('containers/NewPassword'))
);
const ForgetPassword = lazy(() =>
  sleep(1000).then(() => import('containers/ForgetPassword'))
);
const Login = lazy(() => sleep(1000).then(() => import('containers/Login')));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      messageAntd.error(
        `Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) messageAntd.error(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({ uri: 'https://flyby-gateway.herokuapp.com' });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink])
});

messageAntd.config({
  maxCount: 1
});

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const App = () => {
  const location = useLocation();
  const appContext = useAppContext();
  const signed = sessionStorage.getItem('signed');

  useEffect(() => {
    if (!signed && location.pathname !== '/') {
      window.location.href = '/';
    }
    if (signed) {
      appContext.setUserInfo(faker.name.fullName());
      if (location.pathname === '/') {
        window.location.href = '/dashboard';
      }
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <ConfigProvider
        locale={en_US}
        theme={{
          token: {
            colorPrimary: '#00b96b'
          }
        }}
      >
        {signed ? (
          <PrivateLayout>
            <Suspense fallback={<Skeleton />}>
              <Routes>
                <Route path="dashboard" element={<Index />} />
                <Route path="profile" element={<Profile />} />
                <Route path="list" element={<List />} />
                <Route path="table" element={<Table />} />
                <Route
                  path="*"
                  element={
                    <Result
                      status="404"
                      title="404"
                      subTitle="Sorry, the page you visited does not exist."
                    />
                  }
                />
              </Routes>
            </Suspense>
          </PrivateLayout>
        ) : (
          <Suspense fallback={<Skeleton />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="forget" element={<ForgetPassword />} />
              <Route path="password" element={<NewPassword />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </Suspense>
        )}
      </ConfigProvider>
    </ApolloProvider>
  );
};

export default App;
