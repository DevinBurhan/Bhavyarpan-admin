import Cookies from "js-cookie";
import actions from "./actions";
import { message } from "antd";
import { removeItem } from "../../utility/localStorageControl";
const { DataService } = require("../../config/dataService/dataService");
const { API } = require("../../config/api/index");

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const login = () => {
    return async (dispatch) => {
        try {
            dispatch(loginBegin());
            setTimeout(() => {
                Cookies.set("logedIn", true);
                return dispatch(loginSuccess(true));
            }, 1000);
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
            Cookies.remove("logedIn");
            dispatch(logoutSuccess(null));
        } catch (err) {
            dispatch(logoutErr(err));
        }
    };
};

export { login, logOut, changePassword };
