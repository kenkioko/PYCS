import moment from "moment";

export const findAge = (date) => {
    const today = moment();
    const birthdate = moment(date, 'YYYY-DD-MM');
    let age = today.diff(birthdate, 'years');
    if (today.diff(birthdate, 'months') < 0 || (today.diff(birthdate, 'months') === 0 && today.diff(birthdate, 'days') < 0)) {
        age--;
    }
    return age;
}

export default findAge;