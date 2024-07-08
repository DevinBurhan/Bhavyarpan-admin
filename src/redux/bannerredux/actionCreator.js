import { Pagination, message } from "antd";
import { API } from "../../config/api";
import { DataService } from "../../config/dataService/dataService";
import actions from "./action";

const { getbanner, addbanner, updatebanner } = actions;

export const getBannerAPI = () => {
    return async (dispatch) => {
        try {
            const resp = await DataService.get(API.banner.get);
            console.log("respresp", resp.data);
            if (resp.data.status) {
                console.log("respresp", resp.data);
                dispatch(getbanner(resp.data));
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

export const addBannerAPI = (payload) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.post(API.banner.add, payload);
            if (resp.data.status) {
                dispatch(addbanner(resp.data));
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

export const updateBannerAPI = (categoryId, payload) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.put(API.banner.update + categoryId, payload);

            if (resp.data.status) {
                dispatch(updatebanner(resp.data));
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

export const deleteBannerAPI = (Id) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.delete(API.banner.delete + Id);
            console.log("resp", resp);
            if (resp.data.status) {
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
