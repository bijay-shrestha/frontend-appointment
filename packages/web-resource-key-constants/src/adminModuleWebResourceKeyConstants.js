const BASE = '/api/v1'
const SP_BASE = '/specialization'
const HP_BASE = '/hospital'
const DOCTOR_BASE = '/doctor'
const QF_BASE = '/qualification'
const PROFILE_BASE = '/profile'
const QFA_BASE = '/qualificationAlias'
const CNTRY_BASE = '/country'
const UN_BASE = '/university'
const PATIENT_BASE = '/patient'
const APPOINTMENT_BASE = '/appointment'
const DASHBOARD_BASE = '/dashboard'
const COMPANY_BASE = '/company'
const COMPANY_ADMIN_BASE = '/CompanyAdmin'
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
  ),
  FETCH_ACTIVE_PROFILES_BY_DEPARTMENT_ID: BASE.concat(PROFILE_BASE)
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
  FETCH_ADMIN_DETAILS: ADMIN_BASE_URL.concat('/detail'),
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
  FETCH_SPECIALIZATION_DETAILS: BASE.concat(SP_BASE + '/detail'),
  EDIT_SPECIALIZATION: BASE.concat(SP_BASE),
  EXPORT_SPECIALIZATION_EXCEL: BASE.concat(SP_BASE + '/excel'),
  DELETE_SPECIALIZATION: BASE.concat(SP_BASE),
  DROPDOWN_SPECIALIZATION: BASE.concat(SP_BASE + '/dropdown'),
  ACTIVE_DROPDOWN_SPECIALIZATION: BASE.concat(SP_BASE + '/active/min'),
  SPECIALIZATION_BY_HOSPITAL: BASE.concat(SP_BASE.concat('/hospital-wise')),
  SPECIALIZATION_BY_DOCTOR: BASE.concat(SP_BASE.concat('/doctor-wise')),
  SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL: BASE.concat(
    SP_BASE + '/hospital-wise'
  )
}

export const hospitalSetupApiConstants = {
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
  SEARCH_DOCTOR: BASE.concat(DOCTOR_BASE + '/search'),
  FETCH_DOCTOR: BASE.concat(DOCTOR_BASE + '/detail'),
  EDIT_DOCTOR: BASE.concat(DOCTOR_BASE),
  DELETE_DOCTOR: BASE.concat(DOCTOR_BASE),
  FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN: BASE.concat(DOCTOR_BASE + '/active/min'),
  FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN: BASE.concat(
    DOCTOR_BASE + '/hospital-wise'
  ),
  FETCH_DOCTOR_BY_SPECIALIZATION_ID: BASE.concat(
    DOCTOR_BASE.concat('/specialization-wise')
  ),
  FETCH_DOCTOR_DETAILS_FOR_UPDATE: BASE.concat(
    DOCTOR_BASE.concat('/updateDetails')
  )
}

export const qualificationSetupApiConstants = {
  CREATE_QUALIFICATION: BASE.concat(QF_BASE),
  SEARCH_QUALIFICATION: BASE.concat(QF_BASE + '/search'),
  FETCH_QUALIFICATION_DETAIL: BASE.concat(QF_BASE + '/detail'),
  EDIT_QUALIFICATION: BASE.concat(QF_BASE),
  DELETE_QUALIFICATION: BASE.concat(QF_BASE),
  SPECIFIC_DROPDOWN_QUALIFICATION_ACTIVE: BASE.concat(QF_BASE + '/min')
}

export const qualificationSetupAliasCode = {
  FETCH_QUALIFICATION_ALIAS_CODE: BASE.concat(QFA_BASE),
  SAVE_QUALIFICATION_ALIAS: BASE.concat(QFA_BASE),
  EDIT_QUALIFICATION_ALIAS: BASE.concat(QFA_BASE),
  DELETE_QUALIFICATION_ALIAS: BASE.concat(QFA_BASE),
  SEARCH_QUALIFICATION_ALIAS: BASE.concat(QFA_BASE.concat('/search'))
}

const DOCTOR_DUTY_ROSTER_BASE = '/doctorDutyRoster'
export const doctorDutyRosterApiConstants = {
  CREATE_DOCTOR_DUTY_ROSTER: BASE.concat(DOCTOR_DUTY_ROSTER_BASE),
  UPDATE_DOCTOR_DUTY_ROSTER: BASE.concat(DOCTOR_DUTY_ROSTER_BASE),
  DELETE_DOCTOR_DUTY_ROSTER: BASE.concat(DOCTOR_DUTY_ROSTER_BASE),
  SEARCH_DOCTOR_DUTY_ROSTER: BASE.concat(
    DOCTOR_DUTY_ROSTER_BASE.concat('/search')
  ),
  FETCH_DOCTOR_DUTY_ROSTER_DETAIL_BY_ID: BASE.concat(
    DOCTOR_DUTY_ROSTER_BASE.concat('/detail')
  ),
  FETCH_EXISTING_DOCTOR_DUTY_ROSTER: BASE.concat(
    DOCTOR_DUTY_ROSTER_BASE.concat('/existing')
  ),
  FETCH_EXISTING_DOCTOR_DUTY_ROSTER_DETAIL_BY_ID: BASE.concat(
    DOCTOR_DUTY_ROSTER_BASE.concat('/existing/detail')
  ),
  UPDATE_DOCTOR_DUTY_ROSTER_OVERRIDE: BASE.concat(
    DOCTOR_DUTY_ROSTER_BASE.concat('/doctorDutyRosterOverride')
  ),
  DELETE_DOCTOR_DUTY_ROSTER_OVERRIDE: BASE.concat(
    DOCTOR_DUTY_ROSTER_BASE.concat('/doctorDutyRosterOverride')
  ),
  REVERT_DOCTOR_DUTY_ROSTER_OVERRIDE_UPDATE: BASE.concat(
    DOCTOR_DUTY_ROSTER_BASE.concat('/doctorDutyRosterOverride/revert')
  )
}

export const countrySetupAliasCode = {
  FETCH_COUNTRY_CODE: BASE.concat(CNTRY_BASE)
}

export const universitySetupAliasCode = {
  FETCH_UNIVERSITY_CODE: BASE.concat(UN_BASE + '/active/min')
}

export const patientSetupApiConstant = {
  ACTIVE_PATIENT_META_INFO_DETAILS: BASE.concat(
    PATIENT_BASE + '/metaInfo/active/min'
  ),
  ALL_PATIENT_META_INFO_HOSPITAL_ID: BASE.concat(
    PATIENT_BASE + '/metaInfo/min'
  ),
  SEARCH_PATIENT_INFO: BASE.concat(PATIENT_BASE + '/search'),
  PREVIEW_PATIENT_DETAIL_BY_ID: BASE.concat(PATIENT_BASE + '/detail'),
  UPDATE_PATIENT_DETAIL_BY_ID: BASE.concat(PATIENT_BASE),
  FETCH_PATIENT_DETAIL_BY_APPOINTMENT_ID: BASE.concat(
    PATIENT_BASE.concat('/min/detail')
  )
}

export const appointmentSetupApiConstant = {
  APPOINTMENT_REFUND_LIST: BASE.concat(APPOINTMENT_BASE + '/refund'),
  APPOINTMENT_REFUND_BY_ID: BASE.concat(APPOINTMENT_BASE + '/refund/approve'),
  APPOINTMENT_REJECT_REFUND: BASE.concat(APPOINTMENT_BASE + '/refund/reject'),
  APPOINTMENT_LOG_LIST: BASE.concat(APPOINTMENT_BASE + '/log'),
  APPOINTMENT_STATUS_LIST: BASE.concat(APPOINTMENT_BASE + '/status'),
  APPOINTMENT_APPROVAL_LIST: BASE.concat(
    APPOINTMENT_BASE + '/pending-approval'
  ),
  APPOINTMENT_APPROVE: BASE.concat(APPOINTMENT_BASE + '/approve'),
  APPOINTMENT_REJECT: BASE.concat(APPOINTMENT_BASE + '/reject'),
  SEARCH_APPOINTMENT_RESCHEDULE: BASE.concat(
    APPOINTMENT_BASE.concat('/reschedule-log')
  )
}

export const DashboardApiConstant = {
  OVERALL_APPOINTMENTS: BASE.concat(DASHBOARD_BASE + '/overAllAppointments'),
  REGISTERED_PATIENTS: BASE.concat(
    DASHBOARD_BASE + '/registeredPatients/count'
  ),
  REVENUE_GENERATED: BASE.concat(DASHBOARD_BASE + '/revenueGenerated'),
  REVENUE_STATISTICS: BASE.concat(DASHBOARD_BASE + '/revenueStatistics'),
  APPOINTMENT_QUERY: BASE.concat(DASHBOARD_BASE + '/today-appointment'),
  DOCTOR_REVENUE: BASE.concat(DASHBOARD_BASE + '/doctorRevenue')
}

const COMPANY_PROFILE_SETUP_BASE = '/company-profile'
export const companyProfileSetupApiConstants = {
  CREATE_COMPANY_PROFILE: BASE.concat(COMPANY_PROFILE_SETUP_BASE),
  EDIT_COMPANY_PROFILE: BASE.concat(COMPANY_PROFILE_SETUP_BASE),
  DELETE_COMPANY_PROFILE: BASE.concat(COMPANY_PROFILE_SETUP_BASE),
  SEARCH_COMPANY_PROFILE: BASE.concat(
    COMPANY_PROFILE_SETUP_BASE.concat('/search')
  ),
  PREVIEW_COMPANY_PROFILE: BASE.concat(
    COMPANY_PROFILE_SETUP_BASE.concat('/detail')
  ),
  FETCH_COMPANY_PROFILE_FOR_DROPDOWN: BASE.concat(
    COMPANY_PROFILE_SETUP_BASE.concat('/active/min')
  ),
  FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN: BASE.concat(
    COMPANY_PROFILE_SETUP_BASE.concat('/active/min')
  )
}

export const CompanyApiConstant = {
  SAVE_COMPANY: BASE.concat(COMPANY_BASE),
  UPDATE_COMPANY: BASE.concat(COMPANY_BASE),
  DROPDOWN_COMPANY: BASE.concat(COMPANY_BASE + '/active/min'),
  PREVIEW_COMPANY: BASE.concat(COMPANY_BASE + '/detail'),
  SEARCH_COMPANY: BASE.concat(COMPANY_BASE + '/search'),
  DELETE_COMPANY: BASE.concat(COMPANY_BASE)
}
export const companyAdminSetupApiConstants = {
  CREATE_COMPANY_ADMIN: BASE.concat(COMPANY_ADMIN_BASE),
  EDIT_COMPANY_ADMIN: BASE.concat(COMPANY_ADMIN_BASE),
  DELETE_COMPANY_ADMIN: BASE.concat(COMPANY_ADMIN_BASE),
  SEARCH_COMPANY_ADMIN: BASE.concat(COMPANY_ADMIN_BASE.concat('/search')),
  PREVIEW_COMPANY_ADMIN: BASE.concat(COMPANY_ADMIN_BASE.concat('/detail')),
  FETCH_COMPANY_ADMIN_FOR_DROPDOWN: BASE.concat(
    COMPANY_ADMIN_BASE.concat('/active/min')
  ),
  UPDATE_COMPANY_ADMIN_AVATAR: BASE.concat(COMPANY_ADMIN_BASE + '/avatar'),
  GET_LOGGED_IN_COMPANY_ADMIN_INFO: BASE.concat(COMPANY_ADMIN_BASE + '/info'),
  SAVE_COMPANY_ADMIN_PASSWORD: BASE.concat(COMPANY_ADMIN_BASE + '/password'),
  UPDATE_COMPANY_ADMIN_PASSWORD: BASE.concat(COMPANY_ADMIN_BASE + '/password'),
  VERIFY_COMPANY_ADMIN: BASE.concat(COMPANY_ADMIN_BASE + '/verify'),
  FETCH_COMPANY_ADMIN_META_INFO: BASE.concat(COMPANY_ADMIN_BASE + '/metaInfo'),
  RESET_PASSWORD: BASE.concat(COMPANY_ADMIN_BASE + '/resetPassword'),
  CHANGE_PASSWORD: BASE.concat(COMPANY_ADMIN_BASE + '/changePassword')
}
