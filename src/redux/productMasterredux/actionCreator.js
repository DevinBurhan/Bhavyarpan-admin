import { message } from "antd";
import { API } from "../../config/api";
import { DataService } from "../../config/dataService/dataService";
import actions from "./action";
const { getproductMaster, addproductMaster, subproductMasterErr, updateproductMaster, deleteproductMaster } = actions;

export const getproductMasterAPI = () => {
    return async (dispatch) => {
        try {
            const resp = await DataService.get(API.productMaster.get);
            if (resp.data.status) {
                dispatch(getproductMaster(resp.data));
                message.success(resp.data.message);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            dispatch(subproductMasterErr(err));
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
            dispatch(subproductMasterErr(err));
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
            dispatch(subproductMasterErr(err));
            message.error("Failed to update productMaster");
            return false;
        }
    };
};

export const deleteproductMasterAPI = (productMasterId) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.delete(API.productMaster.delete + productMasterId);
            if (resp.data && resp.data.status) {
                dispatch(deleteproductMaster(resp.data));
                message.success(resp.data.message);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            dispatch(subproductMasterErr(err));
            message.error("Failed to delete productMaster");
            return false;
        }
    };
};
