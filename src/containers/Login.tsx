import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText
} from '@ant-design/pro-components';
import { Button, Spin } from 'antd';
import { Link } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex-center">
      <Spin spinning={loading} tip="Login...">
        <LoginForm
          submitter={{
            render: () => {
              return (
                <Button size="large" type="primary" block htmlType="submit">
                  Sign In
                </Button>
              );
            }
          }}
          onFinish={async (values) => {
            console.log(values);
            sessionStorage.setItem('signed', 'yes');
            setLoading(true);
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 2000);
          }}
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="Github"
          subTitle="Sign in to start your session"
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />
            }}
            placeholder={'Username'}
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              }
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />
            }}
            placeholder={'Password'}
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          />
          <div
            style={{
              marginBlockEnd: 24
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              Remember Me
            </ProFormCheckbox>
            <Link
              to="/forget"
              style={{
                float: 'right'
              }}
            >
              I forgot my password
            </Link>
          </div>
        </LoginForm>
      </Spin>
    </div>
  );
};

export default Login;
