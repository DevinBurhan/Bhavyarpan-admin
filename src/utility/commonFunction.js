import moment from "moment";

export const jsonContentType = "application/json";
export const formContentType =
  "application/x-www-form-urlencoded; charset=UTF-8";

export const getDateFormate = (date) => {
  return moment(date).format("YYYY.MM.DD HH:MM");
};

export const paramsToQueryString = (params) => {
  if (params) {
    let queryString = "?";
    Object.keys(params).map((value) => {
      return (queryString += value + "=" + params[value] + "&");
    });
    queryString = queryString.slice(0, -1);
    return queryString;
  }
  return "";
};

export const reArrangeSequence = (indexToRemove, array) => {
  // Check if the index to remove is within the bounds of the array
  if (indexToRemove >= 0 && indexToRemove < array.length) {
    array.splice(indexToRemove, 1); // Remove the element at the specified index

    // Update indices for subsequent elements
    for (let i = indexToRemove; i < array.length; i++) {
      array[i].index = i; // This line is optional if you don't need to maintain an index property
    }
  }

  return array;
};
