import { message } from "antd";
import { API } from "../../config/api";
import { DataService } from "../../config/dataService/dataService";
import actions from "./action";

const { getBanner, addBanner, bannerErr, updateBanner, deleteBanner } = actions;

export const getBannerAPI = () => {
  return async (dispatch) => {
    try {
      const resp = await DataService.get(API.banner.get);
      if (resp.data.status) {
        dispatch(getBanner(resp.data));
        // message.success(resp.data.message);
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

export const addBannerAPI = (payload) => {
  return async (dispatch) => {
    try {
      const resp = await DataService.post(API.banner.add, payload);
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

export const updateBannerAPI = (bannerId, payload) => {
  return async (dispatch) => {
    try {
      const resp = await DataService.put(API.banner.update + bannerId, payload);

      if (resp.data.status) {
        message.success(resp.data.message);
        dispatch(updateBanner(resp.data));
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

export const deleteBannerAPI = (bannerId) => {
  return async (dispatch) => {
    try {
      const resp = await DataService.delete(API.banner.delete + bannerId);
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
