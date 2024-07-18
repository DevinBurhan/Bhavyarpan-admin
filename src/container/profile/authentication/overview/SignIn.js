import { Button, Form, Input } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Heading from "../../../../components/heading/heading";
import { login } from "../../../../redux/authentication/actionCreator";
import { AuthWrapper } from "./style";

const SignIn = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();

  const handleSubmit = async (value) => {
    // const form_data = new FormData();
    // form_data.append("email", value.email);
    // form_data.append("password", value.password);
    let resp = await dispatch(login(value));
    if (resp) {
      navigate("/admin");
    }
  };
  console.log("sdkfhjksdbfsdb");

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Don&rsquo;t have an account?{" "}
        <NavLink to="/register">Sign up now</NavLink>
      </p>
      <div className="auth-contents">
        <Form
          name="login"
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Heading as="h3">
            Sign in to <span className="color-secondary">Vendor</span>
          </Heading>
          <Form.Item
            name="email"
            rules={[
              {
                message: "Please input your Email!",
                required: true,
              },
            ]}
            initialValue="name@example.com"
            label="Username or Email Address"
          >
            <Input />
          </Form.Item>
          <Form.Item name="password" initialValue="123456" label="Password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <div className="auth-form-action">
            <NavLink className="forgot-pass-link" to="/forgotPassword">
              Forgot password?
            </NavLink>
          </div>
          <Form.Item>
            <Button
              className="btn-signin"
              htmlType="submit"
              type="primary"
              size="large"
            >
              {isLoading ? "Loading..." : "Log In"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
