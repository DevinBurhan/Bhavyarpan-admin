import { message } from "antd";
import { API } from "../../config/api";
import { DataService } from "../../config/dataService/dataService";
import actions from "./action";
import { paramsToQueryString } from "../../utility/commonFunction";

const { getUplaod, addUplaod, deleteUplaod } = actions;

export const getImageUploadAPI = (params) => {
  return async (dispatch) => {
    try {
      const queryString = paramsToQueryString(params);
      const resp = await DataService.get(API.upload.get + queryString);
      if (resp.data.status) {
        dispatch(getUplaod(resp.data));
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log("file: actionCreator.js:21  return  err", err);
      message.error("Failed to fetch images");
      return false;
    }
  };
};

export const addImageUploadAPI = (payload) => {
  return async (dispatch) => {
    try {
      const resp = await DataService.post(API.upload.add, payload);
      if (resp.data.status) {
        message.success(resp.data.message);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      message.error("Failed to add image");
      return false;
    }
  };
};

export const deleteImageUploadAPI = (params) => {
  return async (dispatch) => {
    try {
      let queryString = paramsToQueryString(params);
      const resp = await DataService.delete(API.upload.delete + queryString);
      if (resp.data.status) {
        message.success(resp.data.message);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      message.error("Failed to delete image");
      return false;
    }
  };
};
