import { message } from "antd";
import { API } from "../../config/api";
import { DataService } from "../../config/dataService/dataService";
import actions from "./action";

const { getAdvertisment, addAdvertisment, advertismentErr, updateAdvertisment, deleteAdvertisment } = actions;

export const getAdvertismentAPI = () => {
    return async (dispatch) => {
        try {
            const resp = await DataService.get(API.advertisment.get, {
                pagination: true,
            });
            if (resp.data.message) {
                dispatch(getAdvertisment(resp.data));

                return true;
            } else {
                return false;
            }
        } catch (err) {
            dispatch(advertismentErr(err));
            message.error("Failed to fetch advertisment");
            return false;
        }
    };
};

export const addAdvertismentAPI = (payload) => {
    return async (dispatch) => {
        try {
            // console.log("payload-------------", payload);
            const resp = await DataService.post(API.advertisment.add, payload);
            if (resp.data.status) {
                dispatch(addAdvertisment(resp.data));
                message.success(resp.data.message);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            dispatch(advertismentErr(err));
            message.error("Failed to add Advertisment");
            return false;
        }
    };
};

export const updateAdvertismentAPI = (advertismentId, payload) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.put(API.advertisment.update + advertismentId, payload);

            if (resp.data.status) {
                dispatch(updateAdvertisment(resp.data));
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

export const deleteAdvertismentAPI = (advertismentId) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.delete(API.advertisment.delete + advertismentId);
            if (resp.data.status) {
                // dispatch(deleteCategory(resp.data));
                message.success(resp.data.message);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            dispatch(advertismentErr(err));
            message.error("Failed to delete advertisment");
            return false;
        }
    };
};

export const isActiveAdvertismentAPI = (id, payload) => {
    return async (dispatch) => {
        try {
            const resp = await DataService.put(API.advertisment.isActive + id, payload);
            if (resp.data.status) {
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
