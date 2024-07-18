import { Spin } from "antd";
import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../container/profile/authentication/Index";

const Login = lazy(() =>
  import("../container/profile/authentication/overview/SignIn")
);
const SignUp = lazy(() =>
  import("../container/profile/authentication/overview/Signup")
);
const ForgotPass = lazy(() =>
  import("../container/profile/authentication/overview/ForgotPassword")
);

const NotFound = () => {
  return <Navigate to="/" />;
};

const FrontendRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/forgotPassword" element={<ForgotPass />} />
        <Route exact path="/register" element={<SignUp />} />

        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AuthLayout(FrontendRoutes);
