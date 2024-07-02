import { message } from "antd";
import { API } from "../../config/api";
import { DataService } from "../../config/dataService/dataService";
import actions from "./action";
const { getsubCategory, addsubCategory, subCategoryErr, updatesubCategory, deletesubCategory } = actions;

export const getSubcategoriesAPI = () => {
    return async (dispatch) => {
        try {
            const resp = await DataService.get(API.subCategory.get);
            // console.log("action creator resp", resp);
            if (resp.data.status) {
                dispatch(getsubCategory(resp.data));
                message.success(resp.data.message);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            dispatch(subCategoryErr(err));
            message.error("Failed to fetch subcategories");
            return false;
        }
    };
};

export const addSubcategoryAPI = (payload) => {
    return async (dispatch) => {
        try {
            console.log("resp", API.subCategory.add);
            const resp = await DataService.post(API.subCategory.add, payload);
            console.log("resp", resp);
            if (resp.data.status) {
                dispatch(addsubCategory(resp.data));
                // message.success(resp.data.message);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            dispatch(subCategoryErr(err));
            message.error("Failed to add subcategories");
            return false;
        }
    };
};

export const updateSubcategoryAPI = (subCategoryId, payload) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.put(API.subCategory.update + subCategoryId, payload);

            if (resp.data.status) {
                dispatch(updatesubCategory(resp.data));
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

export const deleteSubcategoryAPI = (subCategoryId) => {
    return async (dispatch) => {
        try {
            console.log("skjdfgjsdgbfhjsfdgjhfsd", subCategoryId);
            const resp = await DataService.delete(API.subCategory.delete + subCategoryId);
            console.log("resp", resp);
            if (resp.data.status) {
                dispatch(deletesubCategory(resp.data));

                message.success(resp.data.message);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            dispatch(subCategoryErr(err));
            message.error("Failed to delete subcategories");
            return false;
        }
    };
};
