/**
 *
 * @param {Date} _currentDate
 * GET DATE IN LOCALE DATE FORMAT FOR EG: "08/05/2018"  i.e 'mm/dd/yyyy'
 */
export const _getDateInLocalString = _currentDate => _currentDate.toLocaleDateString();

/**
 *
 * @param {String} filterType
 * @param {String} date
 * filterType value={D-> Day, M-> Month ,Y-> Year,ALL-> {(Day,Month,Year)}
 * date IN LOCALE DATE FORMAT FOR EG: "08/05/2018"  i.e 'mm/dd/yyyy
 */
export const _splitDayMonthYearByFilterType = (filterType, date) => {
    let splittedData = date.split('/');
    switch (filterType) {
        case 'D':
            return splittedData[1];

        case 'M':
            return splittedData[0];

        case 'Y':
            return splittedData[2];

        case 'ALL':
            return splittedData;

        default:
            console.log('Not Suitable Type');
    }

}

/**
 *
 * @param {Date} currentYear
 * @param {String} dateType
 * {dateType={Y->Year,M->Month,D->Day}}
 * GET THE CONSECUTIVE PREVIOUS YEAR
 */
export const _getPreviousYearMonthAndWeekByFilterType = (currentDate, dateType) => {
    let previousDate;
    let dateString = _getDateInLocalString(currentDate);
    let month = _splitDayMonthYearByFilterType('M', dateString);
    let year = _splitDayMonthYearByFilterType('Y', dateString);
    let day = _splitDayMonthYearByFilterType('D', dateString);
    previousDate = calculatePreviousDate(day, month, year, dateType);
    return previousDate;
}

/**
 *
 * @param {Number} year
 * @param {Number} month
 * GET THE LAST DAY OF MONTH
 *
 */
export const _getLastDayOfMonth = (year, month) => new Date(year, month, 0).getDate();

/**
 *
 * @param {Number} dateValue
 * Append the value 0 to the day and month if value is 1 to 9
 *
 */
export const dayAndMonthParser = (dateValue) => {
    let appendedDateValue = dateValue;
    if (dateValue < 10) {
        appendedDateValue = "0" + dateValue.toString();
    }
    return appendedDateValue;

}

/**
 *
 * @param {String} month
 */
export const checkFirstMonth = month => {
    let isFirstMonth = false;
    if (parseInt(month, 10) === 1) {
        isFirstMonth = true;
    }
    return isFirstMonth;

}

/**
 *
 * @param {String} month
 */
export const checkLastMonth = month => {
    let isLastMonth = false;
    if (parseInt(month, 10) === 12) {
        isLastMonth = true;
    }
    return isLastMonth;

}

/**
 *
 * @param {String} day
 */
export const checkFirstWeek = day => {
    let isFirstWeek = false;
    if (parseInt(day, 10) < 7) {
        isFirstWeek = true;
    }
    return isFirstWeek;
}
/**
 *
 * @param {String} day
 */
export const isExactlyFirstWeek = day => {
    let isExactlyFirsWeek = false;
    if (parseInt(day, 10) === 7) {
        isExactlyFirsWeek = true;
    }
    return isExactlyFirsWeek;
}

/**
 *
 * @param {String} day
 */
export const checkFirstDayOfMonth = day => {
    let isFirstDayOfMonth = false;
    if (parseInt(day, 10) === 1) {
        isFirstDayOfMonth = true;
    }
    return isFirstDayOfMonth
}

/**
 *
 * @param {String} day
 * @param {String} month
 * @param {String} year
 * @param {String} filterType
 * {filterType=>{D->Day,M->Month,Y->Year,W->Week}}
 *
 */
export const calculatePreviousDate = (day, month, year, filterType) => {
    let previousDate;

    //Copying the value of day,month and year without copying reference itself
    let currentDay = day.slice(0, day.length);
    let currentMonth = month.slice(0, month.length);
    let currentYear = year.slice(0, year.length);

    //Gets The Current Month's Last Day
    let currentMonthLastDay = _getLastDayOfMonth(parseInt(year, 10), parseInt(month, 10))

    //Manipulate The Data According to the filter type
    if (filterType === 'Y') {
        // if (parseInt(day, 10) === _getLastDayOfMonth(currentYear, month)) {
        // currentDay = 1; } else {     currentDay++; } if (!checkLastMonth(month)) {
        // currentYear--;     currentMonth++; } else {     currentMonth = 1; }
        currentYear--;

    } else {
        switch (filterType) {
            case 'M':

                if (!checkFirstMonth(month)) {
                    currentMonth--;
                } else {
                    currentYear--;
                    currentMonth = 12;

                }
                if (parseInt(day, 10) === _getLastDayOfMonth(currentYear, month)) {
                    if (checkLastMonth(currentMonth)) {
                        currentYear++;
                        currentMonth = 1;

                    } else {
                        currentMonth++;
                    }
                    currentDay = 1;
                } else {
                    currentDay++;
                }
                break;
            case 'W':
                if (checkFirstWeek(day)) {
                    if (!checkFirstMonth(month)) {
                        currentMonth--;
                    } else {
                        currentYear--;
                        currentMonth = 12;

                    }

                    let tempDayDifference = 6 - parseInt(day, 10);
                    currentDay = _getLastDayOfMonth(currentYear, currentMonth) - tempDayDifference;
                } else if (isExactlyFirstWeek(day)) {
                    currentDay = 1;
                } else {
                    currentDay = parseInt(currentDay, 10) - 6
                }
                break;
            case 'D':
                if (checkFirstDayOfMonth(day)) {
                    if (!checkFirstMonth(month)) {
                        currentMonth--;
                    } else {
                        currentYear--;
                        currentMonth = 12;

                    }
                    currentDay = _getLastDayOfMonth(currentYear, currentMonth)
                } else {
                    currentDay = parseInt(currentDay, 10) - 1;
                }
                break;
            default:
                console.log('Not suitable type');

        }

    }

    // currentDay = checkLeapYear(currentYear,
    // currentMonth.toString(),currentDay.toString(), currentMonthLastDay);
    previousDate = getPreviousDate(currentDay, currentMonth, currentYear, currentMonthLastDay);
    return previousDate;
}

/**
 *
 * @param {String} day
 * @param {String} month
 * @param {String} year
 * @param {Number} currentMonthLastDay
 * Checks the last day of the month of the current and previous month and
 * return the previous month
 */

export const getPreviousDate = (day, month, year, currentMonthLastDay) => {
    let previousDate;
    let prevMonthLastDay = _getLastDayOfMonth(parseInt(year, 10), parseInt(month, 10));
    let flag = 0;

    if (parseInt(day, 10) === currentMonthLastDay) {
        previousDate = parseInt(year, 10).toString() + "-" + dayAndMonthParser(parseInt(month, 10)) + "-" + prevMonthLastDay;
        flag = 1;
    }

    if (currentMonthLastDay === prevMonthLastDay) {
        if (parseInt(day, 10) !== currentMonthLastDay) {
            previousDate = parseInt(year, 10).toString() + "-" + dayAndMonthParser(parseInt(month, 10)) + "-" + dayAndMonthParser(parseInt(day, 10));

        }
    } else {
        if (parseInt(day, 10) >= prevMonthLastDay && flag === 0) {
            previousDate = parseInt(year, 10).toString() + "-" + dayAndMonthParser(parseInt(month, 10)) + "-" + prevMonthLastDay;

        }

        if (parseInt(day, 10) < prevMonthLastDay && flag === 0) {
            previousDate = parseInt(year, 10).toString() + "-" + dayAndMonthParser(parseInt(month, 10)) + "-" + dayAndMonthParser(parseInt(day, 10));

        }
    }

    return previousDate;

}
/**
 *
 * @param {String} year
 * @param {String} month
 * @param {Number} currentMonthLastDay
 * Checks the leap year and return the incremented month for february since in leap year february month has 29 day
 */
export const checkLeapYear = (year, month, day, currentMonthLastDay) => {
    let currentDay = month.slice(0, day.length);

    if (parseInt(year, 10) % 4 === 0 && ((year % 100 !== 0) || (year % 400 === 0))) {
        if (parseInt(month, 10) === 2 && parseInt(day, 10) === currentMonthLastDay) {
            currentDay++;
        }
    }
    return currentDay;
}

//TODO: Refactor

/**
 *
 * @param {String} _date
 * @param {String} _format
 * @param {String} _delimiter
 */
export const parseStringToDate = (_date, _format, _delimiter) => {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex], 10);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;

}

//TODO: Refactor
/**
 *
 * @param {String} date
 */
export const convertLocalDateStringToCustomDateString = date => {
    let splitDate = date.split("/");
    return (parseInt(splitDate[2], 10) + "-" + dayAndMonthParser(parseInt(splitDate[0], 10)) + "-" + dayAndMonthParser(parseInt(splitDate[1], 10)))
}

export const getPreviousWeekFromDate = (currentFromDate, currentToDate, prevFromDate) => {
    let splitCurrentFromDate = currentFromDate.split("-");
    let splitCurrentToDate = currentToDate.split("-");
    let splitprevFromDate = prevFromDate.split("-")
    let differenceDate;

    differenceDate = parseInt(splitCurrentToDate[2], 10) - parseInt(splitCurrentFromDate[2], 10);
    let previousWeekFromDay;
    if (parseInt(splitprevFromDate[2], 10) > differenceDate) 
        previousWeekFromDay = splitprevFromDate[2] - differenceDate;
    else 
        previousWeekFromDay = differenceDate - splitprevFromDate[2];
    
    return (splitprevFromDate[0] + "-" + splitprevFromDate[1] + "-" + dayAndMonthParser(parseInt(previousWeekFromDay, 10)));

}
