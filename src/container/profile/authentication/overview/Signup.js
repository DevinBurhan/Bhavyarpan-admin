import React, { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Form, Input, Button } from 'antd';
import { AuthWrapper } from './style';
import Heading from '../../../../components/heading/heading';

const SignUp = () => {
  const [state, setState] = useState({
    values: null,
    checked: null,
  });
  const handleSubmit = values => {
    setState({ ...state, values });
  };
  return (
    <AuthWrapper>
      <p className="auth-notice">
        Already have an account? <NavLink to="/">Sign In</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="register" onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Sign Up to <span className="color-secondary">Vendor</span>
          </Heading>
          <Form.Item label="First Name" name="first_name" rules={[{ required: true, message: 'Please input your First name!' }]}>
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: 'Please input your Last name!' }]}>
            <Input placeholder="Last Name" />
          </Form.Item>
          {/* <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item> */}
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button className="btn-create" htmlType="submit" type="primary" size="large">
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
