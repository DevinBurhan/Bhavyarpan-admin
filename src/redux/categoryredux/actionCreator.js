import { message } from "antd";
import { API } from "../../config/api";
import { DataService } from "../../config/dataService/dataService";
import actions from "./action";
import { paramsToQueryString } from "../../utility/commonFunction";

const { getCategory, addCategory, updateCategory, deleteCategory } = actions;

export const getCategoiryAPI = (params) => {
    return async (dispatch) => {
        try {
            let queryString = paramsToQueryString(params);
            const resp = await DataService.get(API.category.get + queryString);
            if (resp.data.message) {
                dispatch(getCategory(resp.data));

                return true;
            } else {
                return false;
            }
        } catch (err) {
            message.error("Failed to fetch categories");
            return false;
        }
    };
};

export const addCategoiryAPI = (payload) => {
    return async (dispatch) => {
        try {
            console.log("resp", API.category.add);
            const resp = await DataService.post(API.category.add, payload);
            // console.log("resp", resp);
            if (resp.data.status) {
                dispatch(addCategory(resp.data));
                message.success(resp.data.message);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            message.error("Failed to add categories");
            return false;
        }
    };
};

export const updateCategoiryAPI = (categoryId, payload) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.put(API.category.update + categoryId, payload);

            if (resp.data.status) {
                dispatch(updateCategory(resp.data));
                message.success(resp.data.message);
                return true;
            } else {
                message.error(resp.data.message);
                return false;
            }
        } catch (error) {
            return false;
        }
    };
};

export const deleteCategoiryAPI = (categoryId) => {
    return async (dispatch) => {
        try {
            console.log("skjdfgjsdgbfhjsfdgjhfsd", categoryId);
            const resp = await DataService.delete(API.category.delete + categoryId);
            console.log("resp", resp);
            if (resp.data.status) {
                // dispatch(deleteCategory(resp.data));
                message.success(resp.data.message);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            message.error("Failed to delete categories");
            return false;
        }
    };
};
