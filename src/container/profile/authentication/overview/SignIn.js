import React, { useCallback } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AuthWrapper } from "./style";
import { login } from "../../../../redux/authentication/actionCreator";
import Heading from "../../../../components/heading/heading";
import { Checkbox } from "../../../../components/checkbox/checkbox";

const SignIn = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.auth.loading);
    const [form] = Form.useForm();

    const handleSubmit = async (value) => {
        let resp = await dispatch(login(value));
        if (resp) {
            history.push("/admin");
        }
    };

    return (
        <AuthWrapper>
            <p className="auth-notice">
                Don&rsquo;t have an account? <NavLink to="/register">Sign up now</NavLink>
            </p>
            <div className="auth-contents">
                <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
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
                        <Button className="btn-signin" htmlType="submit" type="primary" size="large">
                            {isLoading ? "Loading..." : "Log In"}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </AuthWrapper>
    );
};

export default SignIn;
