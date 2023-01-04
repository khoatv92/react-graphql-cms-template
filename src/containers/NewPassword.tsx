import React, { useState } from 'react';
import { LockOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Button, message, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const NewPassword = () => {
  const [loading, setLoading] = useState(false);
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
                  Change password
                </Button>
              );
            }
          }}
          onFinish={async (values) => {
            console.log(values);
            setLoading(true);
            setTimeout(() => {
              message.success('Change password successful');
              navigate('/');
            }, 2000);
          }}
          logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
          title="Github"
          subTitle="You forgot your password? Here you can easily retrieve a new password."
        >
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />
            }}
            placeholder="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          />
          <ProFormText.Password
            name="confirm"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />
            }}
            placeholder="Confirm Password"
            rules={[
              {
                required: true,
                message: 'Please confirm your password!'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                }
              })
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

export default NewPassword;
