import Cookies from "js-cookie";
import actions from "./actions";
import { message } from "antd";
import { removeItem, setItem } from "../../utility/localStorageControl";
const { DataService } = require("../../config/dataService/dataService");
const { API } = require("../../config/api/index");

const {
  loginBegin,
  loginSuccess,
  loginErr,
  logoutBegin,
  logoutSuccess,
  logoutErr,
} = actions;

const login = (payload) => {
  return async (dispatch) => {
    try {
      const resp = await DataService.post(API.auth.login, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (resp?.data?.status) {
        dispatch(loginBegin());
        setTimeout(() => {
          setItem("access_token", resp.data.data.token);
          Cookies.set("logedIn", true);
          message.success(resp.data.message);
          return dispatch(loginSuccess(true));
        }, 1000);
        return true;
      } else {
        message.error("Email and password are incorrect");
        return false;
      }
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const changePassword = (payloads) => {
  return async (dispatch) => {
    const resp = await DataService.post(API.auth.changePassword, payloads);
    if (!resp.data.error) {
      return resp.data.data;
    } else {
      message.error(resp.data.message);
      return false;
    }
  };
};

const logOut = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutBegin());
      removeItem("access_token");
      localStorage.clear();
      Cookies.remove("logedIn");
      dispatch(logoutSuccess(null));
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut, changePassword };
