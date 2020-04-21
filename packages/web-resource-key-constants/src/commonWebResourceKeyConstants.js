const BASE = "/api/v1";

const WEEK_DAYS_BASE = '/weekDays';
export const WeekdaysApiConstants = {
    FETCH_WEEKDAYS: BASE.concat(WEEK_DAYS_BASE),
    FETCH_WEEKDAYS_DATA: BASE.concat(WEEK_DAYS_BASE.concat('/prepare-weekdays-data')),
};

const PASSWORD_BASE='/password'
export const ForgotPasswordAndVerification = {
    FORGOT_PASSWORD:BASE.concat(PASSWORD_BASE.concat('/forgot')),
    CODE_VERIFICATION:BASE.concat(PASSWORD_BASE.concat('/verify')),
    FORGOT_CHANGE_PASSWORD:BASE.concat(PASSWORD_BASE)
}

export const ADMIN_FEATURE=BASE.concat("/adminFeature");