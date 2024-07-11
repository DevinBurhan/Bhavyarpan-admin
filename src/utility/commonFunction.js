import moment from "moment";

export const jsonContentType = "application/json";
export const formContentType = "application/x-www-form-urlencoded; charset=UTF-8";

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
