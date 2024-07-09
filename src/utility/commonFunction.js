import moment from "moment";

export const jsonContentType = "application/json";
export const formContentType = "application/x-www-form-urlencoded; charset=UTF-8";

export const getDateFormate = (date) => {
    return moment(date).format("YYYY.MM.DD HH:MM");
};
