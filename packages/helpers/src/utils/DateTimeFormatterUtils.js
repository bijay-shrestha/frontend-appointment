export const convertDateToYearMonthDateFormat = (date) => {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
};

export const convertDateToHourMinuteFormat = date => {
    return date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
};

export const getDateWithTimeSetToGivenTime = (date, hours, minutes, seconds) => {
    return date.setHours(hours, minutes, seconds, 0);
};
