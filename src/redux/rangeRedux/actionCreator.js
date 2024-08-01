import { message } from "antd";
import { API } from "../../config/api";
import { DataService } from "../../config/dataService/dataService";
import actions from "./action";
import { paramsToQueryString } from "../../utility/commonFunction";

const { getRange, addRange, updateRange, deleteRange } = actions;

export const getRangeAPI = (params) => {
    return async (dispatch) => {
        try {
            let queryStrng = paramsToQueryString(params);
            const resp = await DataService.get(API.range.get + queryStrng);
            if (resp.data.status) {
                dispatch(getRange(resp.data));
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log("file: actionCreator.js:21  return  err", err);
            message.error("Failed to fetch banners");
            return false;
        }
    };
};

export const addRangeAPI = (payload) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.post(API.range.post, payload);
            if (resp.data.status) {
                message.success(resp.data.message);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            message.error("Failed to add banners");
            return false;
        }
    };
};

export const updateRangeAPI = (bannerId, payload) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.put(API.range.put + bannerId, payload);

            if (resp.data.status) {
                message.success(resp.data.message);
                dispatch(updateRange(resp.data));
                return true;
            } else {
                message.error(resp.data.message);
                return false;
            }
        } catch (error) {
            console.log("file: actionCreator.js:62  return  error", error);
            return false;
        }
    };
};

export const deleteRangeAPI = (bannerId) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.delete(API.range.delete + bannerId);
            if (resp.data.status) {
                message.success(resp.data.message);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            message.error("Failed to delete banners");
            return false;
        }
    };
};
