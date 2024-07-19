import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Navigate, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import store from "./redux/store";
import Admin from "./routes/admin";
import Auth from "./routes/auth";
import "./static/css/style.css";
import config from "./config/config";
import ProtectedRoute from "./components/utilities/protectedRoute";

const { theme } = config;

const ProviderConfig = () => {
  const { rtl, isLoggedIn, topMenu, darkMode } = useSelector((state) => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  });

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    return () => (unmounted = true);
  }, [setPath]);

  return (
    <ConfigProvider direction={rtl ? "rtl" : "ltr"}>
      <ThemeProvider theme={{ ...theme, rtl, topMenu, darkMode }}>
        <Router basename={process.env.PUBLIC_URL}>
          {!isLoggedIn ? <Auth /> : <Admin />}
          {/* {isLoggedIn &&
            (path === process.env.PUBLIC_URL ||
              path === `${process.env.PUBLIC_URL}/`) && <Navigate to="/" />} */}
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default App;
