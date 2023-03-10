import moment from "moment";

export const findAge = (date, format) => {
    const today = moment();
    const birthdate = moment(date, format);
    
    const age_y = today.diff(birthdate, 'years');
    const age_m = today.diff(birthdate, 'months');
    const age_d = today.diff(birthdate, 'days');
    
    if (age_m < 0 || (age_m === 0 && age_d < 0)) {
        age_y--;
    }

    return age_y;
}

export const formatDate = (date, formatFrom, formatTo) => {
    date = moment(date, formatFrom);
    return date.format(formatTo); 
}

export default findAge;