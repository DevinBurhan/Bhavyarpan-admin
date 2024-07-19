import { Pagination, message } from "antd";
import { API } from "../../config/api";
import { DataService } from "../../config/dataService/dataService";
import actions from "./action";
import { paramsToQueryString } from "../../utility/commonFunction";

const { getSubcategory, addSubcategory, updateSubcategory } = actions;

export const getSubcategoriesAPI = (params) => {
  return async (dispatch) => {
    try {
      let queryString = paramsToQueryString(params);
      const resp = await DataService.get(API.subCategory.get + queryString);
      if (resp.data.status) {
        dispatch(getSubcategory(resp.data));
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
export const addSubcategoryAPI = (payload) => {
  return async (dispatch) => {
    try {
      const resp = await DataService.post(API.subCategory.add, payload);
      if (resp.data.status) {
        dispatch(addSubcategory(resp.data));
        message.success(resp.data.message);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      message.error("Failed to add subcategories");
      return false;
    }
  };
};

export const updateSubcategoryAPI = (categoryId, payload) => {
  return async (dispatch) => {
    try {
      const resp = await DataService.put(
        API.subCategory.update + categoryId,
        payload
      );

      if (resp.data.status) {
        dispatch(updateSubcategory(resp.data));
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

export const deleteSubcategoryAPI = (Id) => {
  return async (dispatch) => {
    try {
      const resp = await DataService.delete(API.subCategory.delete + Id);
      if (resp.data.status) {
        message.success(resp.data.message);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      message.error("Failed to delete subcategories");
      return false;
    }
  };
};
