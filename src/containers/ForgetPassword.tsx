import React, { useState } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Button, Spin, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex-center">
      <Spin spinning={loading} tip="Request new password...">
        <LoginForm
          className="asss"
          submitter={{
            render: () => {
              return (
                <Button size="large" type="primary" block htmlType="submit">
                  Request new password
                </Button>
              );
            }
          }}
          onFinish={async (values) => {
            console.log(values);
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setInfo(true);
            }, 2000);
            setTimeout(() => {
              navigate('/password');
            }, 3000);
          }}
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="Github"
          subTitle="You forgot your password? Here you can easily retrieve a new password."
        >
          {info && (
            <Alert message="Check email reset password" type="info" showIcon />
          )}
          <br />
          <ProFormText
            name="email"
            fieldProps={{
              size: 'large',
              prefix: <MailOutlined className={'prefixIcon'} />
            }}
            placeholder="Email"
            rules={[
              {
                required: true,
                message: 'Please input your email!'
              }
            ]}
          />
          <div>
            <Link
              to="/"
              style={{
                float: 'right',
                paddingBottom: 12
              }}
            >
              Back to Login
            </Link>
          </div>
        </LoginForm>
      </Spin>
    </div>
  );
};

export default ForgetPassword;
