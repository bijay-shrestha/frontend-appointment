const BASE = '/api/v1';
const SP_BASE = '/specialization';
const HP_BASE = '/hospital';
const DOCTOR_BASE = '/consultant';
const QF_BASE = '/qualification';
const PROFILE_BASE = '/profile';
const QFA_BASE = '/qualificationAlias';
const CNTRY_BASE = '/country';
const UN_BASE = '/university';

export const profileSetupAPIConstants = {
  CREATE_PROFILE: BASE.concat(PROFILE_BASE),
  SEARCH_PROFILE: BASE.concat(PROFILE_BASE.concat('/search')),
  DELETE_PROFILE: BASE.concat(PROFILE_BASE),
  FETCH_PROFILE_DETAILS: BASE.concat(PROFILE_BASE.concat('/detail')),
  EDIT_PROFILE: BASE.concat(PROFILE_BASE),
  FETCH_PROFILE_LIST_BY_SUB_DEPARTMENT_ID: BASE.concat(PROFILE_BASE),
  FETCH_ACTIVE_PROFILE_LIST_FOR_DROPDOWN: BASE.concat(
    PROFILE_BASE.concat('/active/min')
  ),
  FETCH_ALL_PROFILE_LIST_FOR_SEARCH_DROPDOWN: BASE.concat(
    PROFILE_BASE.concat('/active/min')
  )
}

const DEPARTMENT_BASE = '/department'
export const departmentSetupAPIConstants = {
  CREATE_DEPARTMENT: BASE.concat(DEPARTMENT_BASE),
  SEARCH_DEPARTMENT: BASE.concat(DEPARTMENT_BASE.concat('/search')),
  FETCH_DEPARTMENT_DETAILS: BASE.concat(DEPARTMENT_BASE.concat('/detail')),
  EDIT_DEPARTMENT: BASE.concat(DEPARTMENT_BASE),
  DELETE_DEPARTMENT: BASE.concat(DEPARTMENT_BASE),
  EXPORT_DEPARTMENT_EXCEL: BASE.concat(DEPARTMENT_BASE.concat('/excel')),
  FETCH_DEPARTMENTS_FOR_DROPDOWN: BASE.concat(
    DEPARTMENT_BASE.concat('/active/min')
  ),
  FETCH_DEPARTMENTS_FOR_DROPDOWN_BY_HOSPITAL: BASE.concat(DEPARTMENT_BASE)
}

const ADMIN_BASE = '/admin'
const ADMIN_BASE_URL = BASE.concat(ADMIN_BASE)
export const adminSetupAPIConstants = {
  CREATE_ADMIN: ADMIN_BASE_URL,
  EDIT_ADMIN: ADMIN_BASE_URL,
  DELETE_ADMIN: ADMIN_BASE_URL,
  SEARCH_ADMIN: ADMIN_BASE_URL.concat('/search'),
  FETCH_ADMIN_DETAILS: ADMIN_BASE_URL.concat('/details'),
  UPDATE_ADMIN_AVATAR: ADMIN_BASE_URL.concat('/avatar'),
  GET_LOGGED_IN_ADMIN_INFO: ADMIN_BASE_URL.concat('/info'),
  SAVE_ADMIN_PASSWORD: ADMIN_BASE_URL.concat('/password'),
  UPDATE_ADMIN_PASSWORD: ADMIN_BASE_URL.concat('/password'),
  FETCH_ADMIN_SUB_DEPARTMENTS: ADMIN_BASE_URL.concat('/sub-departments'),
  VERIFY_ADMIN: ADMIN_BASE_URL.concat('/verify'),
  FETCH_ADMIN_META_INFO: ADMIN_BASE_URL.concat('/metaInfo'),
  RESET_PASSWORD: ADMIN_BASE_URL.concat('/resetPassword'),
  CHANGE_PASSWORD: ADMIN_BASE_URL.concat('/changePassword')
}

const PASSWORD_BASE = '/password'
const PASSWORD_BASE_URL = BASE.concat(PASSWORD_BASE)
export const passwordAPIConstants = {
  FORGOT_PASSWORD: PASSWORD_BASE_URL.concat('/forgot'),
  VERIFY_PASSWORD: PASSWORD_BASE_URL.concat('/verify')
}

export const specializationSetupAPIConstants = {
  CREATE_SPECIALIZATION: BASE.concat(SP_BASE),
  SEARCH_SPECIALIZATION: BASE.concat(SP_BASE + '/search'),
  FETCH_SPECIALIZATION_DETAILS: BASE.concat(SP_BASE + '/details'),
  EDIT_SPECIALIZATION: BASE.concat(SP_BASE),
  EXPORT_SPECIALIZATION_EXCEL: BASE.concat(SP_BASE + '/excel'),
  DELETE_SPECIALIZATION: BASE.concat(SP_BASE),
  DROPDOWN_SPECIALIZATION: BASE.concat(SP_BASE + '/dropdown'),
  ACTIVE_DROPDOWN_SPECIALIZATION: BASE.concat(SP_BASE + '/dropdown/active'),
  SPECIFIC_DROPDOWN_SPECIALIZATION: BASE.concat(SP_BASE + '/dropdown/active')
}

export const hostpitalSetupApiConstants = {
  CREATE_HOSPITAL: BASE.concat(HP_BASE),
  SEARCH_HOSPITAL: BASE.concat(HP_BASE + '/search'),
  FETCH_HOSPITAL_DETAILS: BASE.concat(HP_BASE + '/detail'),
  EDIT_HOSPITAL: BASE.concat(HP_BASE),
  EXPORT_HOSPITAL_EXCEL: BASE.concat(HP_BASE + '/excel'),
  DELETE_HOSPITAL: BASE.concat(HP_BASE),
  DROPDOWN_HOSPITAL: BASE.concat(HP_BASE + '/dropdown'),
  FETCH_HOSPITALS_FOR_DROPDOWN: BASE.concat(HP_BASE.concat('/active/min')),
  SPECIFIC_DROPDOWN_HOSPITAL: BASE.concat(HP_BASE + '/dropdown/active')
}

export const doctorSetupApiConstants = {
    CREATE_DOCTOR: BASE.concat(DOCTOR_BASE),
    SEARCH_DOCTOR: BASE.concat(DOCTOR_BASE + "/search"),
    FETCH_DOCTOR: BASE.concat(DOCTOR_BASE + "/detail"),
    EDIT_DOCTOR: BASE.concat(DOCTOR_BASE),
    DELETE_DOCTOR: BASE.concat(DOCTOR_BASE),
    FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN: BASE.concat(DOCTOR_BASE + "/active/min"),
    FETCH_DOCTOR_BY_SPECIALIZATION_ID: BASE.concat(DOCTOR_BASE),
    FETCH_DOCTOR_DETAILS_FOR_UPDATE: BASE.concat(DOCTOR_BASE.concat("/updateDetails"))
};

export const qualificationSetupApiConstants = {
  CREATE_QUALIFICATION: BASE.concat(QF_BASE),
  SEARCH_QUALIFICATION: BASE.concat(QF_BASE + '/search'),
  FETCH_QUALIFICATION_DETAIL: BASE.concat(QF_BASE + '/detail'),
  EDIT_QUALIFICATION: BASE.concat(QF_BASE),
  DELETE_QUALIFICATION: BASE.concat(QF_BASE),
  SPECIFIC_DROPDOWN_QUALIFICATION_ACTIVE: BASE.concat(QF_BASE + '/active/min')
}

export const qualificationSetupAliasCode = {
  FETCH_QUALIFICATION_ALIAS_CODE: BASE.concat(QFA_BASE)
}

export const countrySetupAliasCode = {
  FETCH_COUNTRY_CODE: BASE.concat(CNTRY_BASE)
}

export const universitySetupAliasCode = {
  FETCH_UNIVERSITY_CODE: BASE.concat(UN_BASE+'/active/min')
}
