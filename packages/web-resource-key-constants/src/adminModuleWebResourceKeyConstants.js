const BASE = "/api/v1";
const SP_BASE = "/specialization";
const HP_BASE = "/hospital";
const CN_BASE = "/consultant";

const PROFILE_BASE = "/profiles";
export const profileSetupAPIConstants = {
    CREATE_PROFILE: BASE.concat(PROFILE_BASE),
    FETCH_DEPARTMENTS_FOR_DROPDOWN: BASE.concat("/departments/dropdown/active"),
    FETCH_SUB_DEPARTMENT_BY_DEPARTMENT_ID: BASE.concat("/sub-departments/dropdown/active"),
    SEARCH_PROFILE: BASE.concat(PROFILE_BASE.concat("/search")),
    DELETE_PROFILE: BASE.concat(PROFILE_BASE),
    FETCH_PROFILE_DETAILS: BASE.concat(PROFILE_BASE.concat("/details")),
    EDIT_PROFILE: BASE.concat(PROFILE_BASE),
    FETCH_PROFILE_LIST_BY_SUB_DEPARTMENT_ID: BASE.concat(PROFILE_BASE),
    FETCH_ACTIVE_PROFILE_LIST_FOR_DROPDOWN: BASE.concat(PROFILE_BASE.concat("/dropdown/active"))
};

const DEPARTMENT_BASE = "/departments";
export const departmentSetupAPIConstants = {
    CREATE_DEPARTMENT: BASE.concat(DEPARTMENT_BASE),
    SEARCH_DEPARTMENT: BASE.concat(DEPARTMENT_BASE.concat("/search")),
    FETCH_DEPARTMENT_DETAILS: BASE.concat(DEPARTMENT_BASE.concat("/details")),
    EDIT_DEPARTMENT: BASE.concat(DEPARTMENT_BASE),
    DELETE_DEPARTMENT: BASE.concat(DEPARTMENT_BASE),
    EXPORT_DEPARTMENT_EXCEL: BASE.concat(DEPARTMENT_BASE.concat("/excel")),
    FETCH_DEPARTMENTS_FOR_DROPDOWN: BASE.concat(DEPARTMENT_BASE.concat("/dropdown/active")),
};

const ADMIN_BASE = "/admin";
const ADMIN_BASE_URL = BASE.concat(ADMIN_BASE);
export const adminSetupAPIConstants = {
    CREATE_ADMIN: ADMIN_BASE_URL,
    EDIT_ADMIN: ADMIN_BASE_URL,
    DELETE_ADMIN: ADMIN_BASE_URL,
    SEARCH_ADMIN: ADMIN_BASE_URL.concat("/search"),
    FETCH_ADMIN_DETAILS: ADMIN_BASE_URL.concat("/details"),
    UPDATE_ADMIN_AVATAR: ADMIN_BASE_URL.concat('/avatar'),
    GET_LOGGED_IN_ADMIN_INFO: ADMIN_BASE_URL.concat('/info'),
    SAVE_ADMIN_PASSWORD: ADMIN_BASE_URL.concat('/password'),
    UPDATE_ADMIN_PASSWORD: ADMIN_BASE_URL.concat('/password'),
    FETCH_ADMIN_SUB_DEPARTMENTS: ADMIN_BASE_URL.concat('/sub-departments'),
    VERIFY_ADMIN: ADMIN_BASE_URL.concat('/verify'),
    FETCH_ADMIN_META_INFO: ADMIN_BASE_URL.concat('/metaInfo'),
    RESET_PASSWORD: ADMIN_BASE_URL.concat('/resetPassword'),
    CHANGE_PASSWORD: ADMIN_BASE_URL.concat('/changePassword')
};

const PASSWORD_BASE = "/password";
const PASSWORD_BASE_URL = BASE.concat(PASSWORD_BASE);
export const passwordAPIConstants = {
    FORGOT_PASSWORD: PASSWORD_BASE_URL.concat('/forgot'),
    VERIFY_PASSWORD: PASSWORD_BASE_URL.concat('/verify')
};

export const specializationSetupAPIConstants = {
    CREATE_SPECIALIZATION: BASE.concat(SP_BASE),
    SEARCH_SPECIALIZATION: BASE.concat(SP_BASE + "/search"),
    FETCH_SPECIALIZATION_DETAILS: BASE.concat(SP_BASE + "/details"),
    EDIT_SPECIALIZATION: BASE.concat(SP_BASE),
    EXPORT_SPECIALIZATION_EXCEL: BASE.concat(SP_BASE + "/excel"),
    DELETE_SPECIALIZATION: BASE.concat(SP_BASE),
    DROPDOWN_SPECIALIZATION: BASE.concat(SP_BASE + "/dropdown"),
    ACTIVE_DROPDOWN_SPECIALIZATION: BASE.concat(SP_BASE + "/dropdown/active"),
    SPECIFIC_DROPDOWN_SPECIALIZATION: BASE.concat(SP_BASE + "/dropdown/active")
};

export const hostpitalSetupApiConstants = {
    CREATE_HOSPITAL: BASE.concat(HP_BASE),
    SEARCH_HOSPITAL: BASE.concat(HP_BASE + "/search"),
    FETCH_HOSPITAL_DETAILS: BASE.concat(HP_BASE + "/detail"),
    EDIT_HOSPITAL: BASE.concat(HP_BASE),
    EXPORT_HOSPITAL_EXCEL: BASE.concat(HP_BASE + "/excel"),
    DELETE_HOSPITAL: BASE.concat(HP_BASE),
    DROPDOWN_HOSPITAL: BASE.concat(HP_BASE + "/dropdown"),
    FETCH_HOSPITALS_FOR_DROPDOWN: BASE.concat(HP_BASE.concat("/dropdown/active")),
    SPECIFIC_DROPDOWN_HOSPITAL: BASE.concat(HP_BASE + "/active/min")
};

export const consultantSetupApiConstants = {
    CREATE_CONSULTANT: BASE.concat(CN_BASE),
    SEARCH_CONSULTANT: BASE.concat(CN_BASE + "/search"),
    FETCH_CONSULTANT: BASE.concat(CN_BASE + "/detail"),
    EDIT_CONSULTANT: BASE.concat(CN_BASE),
    EXPORT_CONSULTANT: BASE.concat(CN_BASE + "/excel"),
    DELETE_CONSULTANT: BASE.concat(CN_BASE),
    DROPDOWN_CONSULTANT: BASE.concat(CN_BASE + "/dropdown"),
    ACTIVE_DROPDOWN_CONSULTANT: BASE.concat(CN_BASE + "/dropdown/active"),
    SPECIFIC_DROPDOWN_CONSULTANT: BASE.concat(CN_BASE + "/dropdown/active")
};
