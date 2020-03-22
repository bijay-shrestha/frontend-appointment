export const convertDateToYearMonthDateFormat = (date) => {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
};

export const convertDateToHourMinuteFormat = date => {
    return date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
};

export const getDateWithTimeSetToGivenTime = (date, hours, minutes, seconds) => {
    return new Date(date.setHours(hours, minutes, seconds, 0));
};

export const getFormattedDate = date =>  {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
}

export const subtractDate = (date, daysToSubtract) => {
    date = date.setDate(date.getDate() - daysToSubtract);
    return new Date(date);
};

export const addDate = (date, daysToAdd) => {
    date = date.setDate(date.getDate() + daysToAdd);
    return new Date(date);
};

export const isFirstDateGreaterThanSecondDate = (date1, date2) => {
    return date1 > date2;
};

export const isFirstTimeGreaterThanSecond = (time1, time2) => {
    return time1 > time2;
};

export const getDaysInGivenDateRange = (fromDate, toDate, weekDaysData) => {
    let dateValue = new Date(fromDate);
    let daysIncluded = new Set();
    while (dateValue <= toDate) {
        let day = getDayOfWeek(dateValue);
        let weekDayData = weekDaysData.find(weekDay => (weekDay.weekDaysName).toLowerCase() === day.toLowerCase());
        weekDayData.weekDaysName = day;
        daysIncluded.add(weekDayData);
        dateValue = addDate(dateValue, 1);
    }
    return Array.from(daysIncluded).sort((first, second) => first.weekDaysId - second.weekDaysId);
};

export const getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
};

export const getNoOfDaysBetweenGivenDatesInclusive = (fromDate, toDate) => {
    let differenceInTime = toDate.getTime() - fromDate.getTime();
    let milliSecondsInADay = (1000 * 3600 * 24);
    return (Math.round(differenceInTime / milliSecondsInADay)) + 1;
};

export const getOnlyDateFromDateAndTime = oldDate => {
    const newDate =  new Date(oldDate).toLocaleDateString();
    return newDate;
}

