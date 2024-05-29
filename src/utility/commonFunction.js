import moment from "moment";


export const getDateFormate = (date) => {
    return moment(date).format('YYYY.MM.DD HH:MM')
}