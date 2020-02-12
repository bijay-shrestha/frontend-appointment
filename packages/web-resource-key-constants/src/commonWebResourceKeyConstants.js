const BASE = "/api/v1";

const WEEK_DAYS_BASE = '/weekDays';
export const WeekdaysApiConstants = {
    FETCH_WEEKDAYS: BASE.concat(WEEK_DAYS_BASE),
    FETCH_WEEKDAYS_DATA: BASE.concat(WEEK_DAYS_BASE.concat('/prepare-weekdays-data')),
};
