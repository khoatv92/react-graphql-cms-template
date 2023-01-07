/* eslint-disable react/no-children-prop */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import en_US from 'antd/es/locale/en_US';
import { message as messageAntd } from 'antd';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
  ApolloProvider
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import Index from 'containers/Index';
import PrivateLayout from 'components/layouts/Private';
import Login from 'containers/Login';
import ForgetPassword from 'containers/ForgetPassword';
import Profile from 'containers/Profile';
import NewPassword from 'containers/NewPassword';
import List from 'containers/List';
import Table from 'containers/Table';
import { AppContextProvider } from 'AppContext';

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

const App = () => {
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
        <AppContextProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="dashboard"
                element={<PrivateLayout children={<Index />} />}
              />
              <Route
                path="profile"
                element={<PrivateLayout children={<Profile />} />}
              />
              <Route
                path="list"
                element={<PrivateLayout children={<List />} />}
              />
              <Route
                path="table"
                element={<PrivateLayout children={<Table />} />}
              />
              <Route path="/" element={<Login />} />
              <Route path="/forget" element={<ForgetPassword />} />
              <Route path="/password" element={<NewPassword />} />
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </ConfigProvider>
    </ApolloProvider>
  );
};

export default App;
