import { message } from "antd";
import { API } from "../../config/api";
import { DataService } from "../../config/dataService/dataService";
import actions from "./action";
import { paramsToQueryString } from "../../utility/commonFunction";
const { getproductMaster, addproductMaster, subproductMasterErr, updateproductMaster, deleteproductMaster } = actions;

export const getproductMasterAPI = (params) => {
    return async (dispatch) => {
        try {
            let queryStirng = paramsToQueryString(params);
            const resp = await DataService.get(API.productMaster.get + queryStirng);
            if (resp.data.status) {
                dispatch(getproductMaster(resp.data));
                message.success(resp.data.message);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            message.error("Failed to fetch productMaster");
            return false;
        }
    };
};

export const getproductMasterDetailAPI = (id) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.get(API.productMaster.detail + id);
            if (resp.data.status) {
                message.success(resp.data.message);
                return resp.data;
            } else {
                return false;
            }
        } catch (err) {
            message.error("Failed to fetch productMaster");
            return false;
        }
    };
};

export const addproductMasterAPI = (payload) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.post(API.productMaster.add, payload);
            if (resp.data && resp.data.status) {
                dispatch(addproductMaster(resp.data));
                message.success(resp.data.message);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            message.error("Failed to add productMaster");
            return false;
        }
    };
};

export const updateproductMasterAPI = (productMasterId, payload) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.put(API.productMaster.update + productMasterId, payload);
            if (resp.data && resp.data.status) {
                dispatch(updateproductMaster(resp.data));
                message.success(resp.data.message);
                return true;
            } else {
                message.error(resp.data ? resp.data.message : "Update failed");
                return false;
            }
        } catch (err) {
            message.error("Failed to update productMaster");
            return false;
        }
    };
};

export const deleteproductMasterAPI = (productMasterId) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.delete(API.productMaster.delete + productMasterId);
            console.log("file: actionCreator.js:85  return  resp", resp);
            if (resp.data && resp.data.status) {
                dispatch(deleteproductMaster(resp.data));
                message.success(resp.data.message);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            message.error("Failed to delete productMaster");
            return false;
        }
    };
};
