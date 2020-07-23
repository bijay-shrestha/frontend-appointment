const BASE = '/api/v1'
const SP_BASE = '/specialization'
const HP_BASE = '/hospital'
const DOCTOR_BASE = '/doctor'
const QF_BASE = '/qualification'
const PROFILE_BASE = '/profile'
const QFA_BASE = '/qualificationAlias'
const CNTRY_BASE = '/country'
//const UN_BASE = '/university'
const PATIENT_BASE = '/patient'
const APPOINTMENT_BASE = '/appointment'
const DASHBOARD_BASE = '/dashboard'
const COMPANY_BASE = '/company'
const COMPANY_ADMIN_BASE = '/companyAdmin'
const ADMIN_LOGGING = '/admin-log'
const CLIENT_LOGGING = '/client-log'
const APPOINTMENT_TRANSFER = '/appointmentTransfer'
const HOSPITAL_API_INTEGRATION = '/client-integration'
const INTEGRATION = '/integration'
const REQUEST_BODY_INTEGRATION = '/integration-request-body-attribute'
const ADMIN_API_INTEGRATION = '/admin-mode-integration'
const HOSPITAL_DEPARTMENT_SETUP_BASE = '/hospitalDepartment'

export const hmacApiConstants = {
    FETCH_HMAC_CODE_BY_APPOINTMENT_ID: BASE.concat('/hmac')
}

export const initialApiConstantsOfAdmin = {
    LOGIN_API: BASE.concat('/login'),
    GET_SIDEBAR_DATA: BASE.concat('/sidebar'),
    GET_LOGGED_IN_ADMIN_INFO: BASE.concat('/companyAdmin/info'),
    GET_LOGGED_IN_ADMIN_INFO_CLIENT: BASE.concat('/admin/info')
}

export const profileSetupAPIConstants = {
    CREATE_PROFILE: BASE.concat(PROFILE_BASE),
    SEARCH_PROFILE: BASE.concat(PROFILE_BASE.concat('/search')),
    DELETE_PROFILE: BASE.concat(PROFILE_BASE),
    FETCH_PROFILE_DETAILS: BASE.concat(PROFILE_BASE.concat('/detail')),
    EDIT_PROFILE: BASE.concat(PROFILE_BASE),
    FETCH_PROFILE_LIST_BY_SUB_UNIT_ID: BASE.concat(PROFILE_BASE),
    FETCH_ACTIVE_PROFILE_LIST_FOR_DROPDOWN: BASE.concat(
        PROFILE_BASE.concat('/active/min')
    ),
    FETCH_ALL_PROFILE_LIST_FOR_SEARCH_DROPDOWN: BASE.concat(
        PROFILE_BASE.concat('/active/min')
    ),
    FETCH_ACTIVE_PROFILES_BY_UNIT_ID: BASE.concat(PROFILE_BASE)
}

const UNIT_BASE = '/department'
export const departmentSetupAPIConstants = {
    CREATE_UNIT: BASE.concat(UNIT_BASE),
    SEARCH_UNIT: BASE.concat(UNIT_BASE.concat('/search')),
    FETCH_UNIT_DETAILS: BASE.concat(UNIT_BASE.concat('/detail')),
    EDIT_UNIT: BASE.concat(UNIT_BASE),
    DELETE_UNIT: BASE.concat(UNIT_BASE),
    EXPORT_UNIT_EXCEL: BASE.concat(UNIT_BASE.concat('/excel')),
    FETCH_UNIT_FOR_DROPDOWN: BASE.concat(UNIT_BASE.concat('/active/min')),
    FETCH_UNITS_FOR_DROPDOWN_BY_HOSPITAL: BASE.concat(UNIT_BASE + '/active/min')
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
    CHANGE_PASSWORD: ADMIN_BASE_URL.concat('/changePassword'),
    FETCH_ADMIN_META_INFO_BY_HOSPITAL_ID: ADMIN_BASE_URL.concat(
        '/client/metaInfo'
    ),
    VERIFY_ADMIN_EMAIL: ADMIN_BASE_URL.concat('/verify/email')
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
    FETCH_ALL_HOSPITALS_FOR_DROPDOWN: BASE.concat(HP_BASE.concat('/min')),
    SPECIFIC_DROPDOWN_HOSPITAL: BASE.concat(HP_BASE + '/dropdown/active'),
    HOSPITAL_API_SERVICE_TYPE: BASE.concat(HP_BASE + '/appointmentServiceType')
}

export const doctorSetupApiConstants = {
    CREATE_DOCTOR: BASE.concat(DOCTOR_BASE),
    SEARCH_DOCTOR: BASE.concat(DOCTOR_BASE + '/search'),
    FETCH_DOCTOR: BASE.concat(DOCTOR_BASE + '/detail'),
    EDIT_DOCTOR: BASE.concat(DOCTOR_BASE),
    DELETE_DOCTOR: BASE.concat(DOCTOR_BASE),
    FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN: BASE.concat(DOCTOR_BASE + '/active/min'),
    FETCH_ALL_DOCTORS_FOR_DROPDOWN: BASE.concat(DOCTOR_BASE + '/min'),
    FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN: BASE.concat(
        DOCTOR_BASE + '/hospital-wise'
    ),
    FETCH_ALL_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN: BASE.concat(
        DOCTOR_BASE + '/hospital-wise'
    ),
    FETCH_DOCTOR_BY_SPECIALIZATION_ID: BASE.concat(
        DOCTOR_BASE.concat('/specialization-wise')
    ),
    FETCH_DOCTOR_DETAILS_FOR_UPDATE: BASE.concat(
        DOCTOR_BASE.concat('/updateDetails')
    ),
    FETCH_ACTIVE_DOCTORS_BY_DEPARTMENT: BASE.concat(
        HOSPITAL_DEPARTMENT_SETUP_BASE.concat('/doctor')
    )
}

export const qualificationSetupApiConstants = {
    CREATE_QUALIFICATION: BASE.concat(QF_BASE),
    SEARCH_QUALIFICATION: BASE.concat(QF_BASE + '/search'),
    FETCH_QUALIFICATION_DETAIL: BASE.concat(QF_BASE + '/detail'),
    EDIT_QUALIFICATION: BASE.concat(QF_BASE),
    DELETE_QUALIFICATION: BASE.concat(QF_BASE),
    SPECIFIC_DROPDOWN_QUALIFICATION_ACTIVE: BASE.concat(QF_BASE + '/min'),
    FETCH_ACTIVE_QUALIFICATIONS_FOR_DROPDOWN: BASE.concat(QF_BASE + '/active/min')
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
    ),
    FETCH_PATIENT_ESEWA_ID_FOR_DROPDOWN: BASE.concat(
        PATIENT_BASE.concat('/eSewaId')
    )
}

const HOSPITAL_DEPARTMENT = '/hospitalDepartment'
const REFUND_STATUS = '/refundStatus'
export const appointmentSetupApiConstant = {
    APPOINTMENT_REFUND_LIST: BASE.concat(APPOINTMENT_BASE + '/refund'),
    APPOINTMENT_REFUND_BY_ID: BASE.concat(APPOINTMENT_BASE + '/refund/approve'),
    APPOINTMENT_REJECT_REFUND: BASE.concat(APPOINTMENT_BASE + '/refund/reject'),
    APPOINTMENT_LOG_LIST: BASE.concat(APPOINTMENT_BASE + '/log'),
    APPOINTMENT_STATUS_LIST: BASE.concat(APPOINTMENT_BASE + '/status'),
    APPOINTMENT_HOSPITAL_DEPARTMENT_LIST: BASE.concat(
        APPOINTMENT_BASE + '/hospitalDepartment/status'
    ),
    APPOINTMENT_HOSPITAL_DEPARTMENT_ROOM_LIST: BASE.concat(
        APPOINTMENT_BASE + '/hospitalDepartment/room/status'
    ),
    APPOINTMENT_APPROVAL_LIST: BASE.concat(
        APPOINTMENT_BASE + '/pending-approval'
    ),
    APPOINTMENT_APPROVE: BASE.concat(APPOINTMENT_BASE + '/approve'),
    APPOINTMENT_REJECT: BASE.concat(APPOINTMENT_BASE + '/reject'),
    SEARCH_APPOINTMENT_RESCHEDULE: BASE.concat(
        APPOINTMENT_BASE.concat('/reschedule-log')
    ),
    APPOINTMENT_APPROVAL_DETAIL: BASE.concat(
        APPOINTMENT_BASE.concat('/pending-approval')
    ),
    APPOINTMENT_REFUND_DETAIL: BASE.concat(
        APPOINTMENT_BASE.concat('/refund/detail')
    ),
    TRANSACTION_LOG_LIST: BASE.concat(APPOINTMENT_BASE + '/transaction-log'),
    APPOINTMENT_APPROVE_INTEGRATION: BASE.concat(
        APPOINTMENT_BASE + INTEGRATION + '/approve'
    ),
    APPOINTMENT_APPROVAL_SEARCH_DEPARTMENT: BASE.concat(
        APPOINTMENT_BASE + HOSPITAL_DEPARTMENT + '/pending-approval'
    ),
    APPOINTMENT_APPROVAL_DEPARTMENT: BASE.concat(
        APPOINTMENT_BASE + HOSPITAL_DEPARTMENT + '/approve'
    ),
    APPOINTMENT_APPROVAL_PREVIEW_DEPARTMENT: BASE.concat(
        APPOINTMENT_BASE + HOSPITAL_DEPARTMENT + '/pending-approval/detail'
    ),
    FETCH_DEPARTMENT_APPOINTMENT_STATUS_COUNT: BASE.concat(
        APPOINTMENT_BASE + HOSPITAL_DEPARTMENT + '/status/count'
    ),
    APPOINTMENT_DEPARTMENT_REFUND_LIST: BASE.concat(
        APPOINTMENT_BASE + '/hospitalDepartment/refund'
    ),
    APPOINTMENT_DEPARTMENT_REFUND_BY_ID: BASE.concat(
        APPOINTMENT_BASE + '/hospitalDepartment/refund/approve'
    ),
    APPOINTMENT_DEPARTMENT_REJECT_REFUND: BASE.concat(
        APPOINTMENT_BASE + '/hospitalDepartment/refund/reject'
    ),
    APPOINTMENT_DEPARTMENT_REFUND_DETAIL: BASE.concat(
        APPOINTMENT_BASE.concat('/hospitalDepartment/refund/detail')
    ),
    SEARCH_APPOINTMENT_REFUND_STATUS: BASE.concat(
        APPOINTMENT_BASE.concat(REFUND_STATUS + '/search')
    ),
    DETAIL_APPOINTMENT_REFUND_STATUS: BASE.concat(
        APPOINTMENT_BASE.concat(REFUND_STATUS + '/detail')
    ),
    CHECK_APPOINTMENT_REFUND_STATUS: BASE.concat(
        APPOINTMENT_BASE.concat(REFUND_STATUS + '/check')
    ),
    SEARCH_APPOINTMENT_REFUND_STATUS_DEPARTMENT: BASE.concat(
        APPOINTMENT_BASE.concat(REFUND_STATUS + '/hospitalDepartmentWise/search')
    ),
    DETAIL_APPOINTMENT_REFUND_STATUS_DEPARTMENT: BASE.concat(
        APPOINTMENT_BASE.concat(REFUND_STATUS + '/hospitalDepartmentWise/detail')
    ),
    CHECK_APPOINTMENT_REFUND_STATUS_DEPARTMENT: BASE.concat(
        APPOINTMENT_BASE.concat(REFUND_STATUS + '/hospitalDepartmentWise/check')
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
    DOCTOR_REVENUE: BASE.concat(DASHBOARD_BASE + '/doctorRevenue'),
    DASHBOARD_FEATURE: BASE.concat(DASHBOARD_BASE + '/features'),
    DEPARTMENT_REVENUE: BASE.concat(DASHBOARD_BASE + '/hospitalDepartmentRevenue')
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
    FETCH_ADMIN_META_INFO_BY_COMPANY_ID: ADMIN_BASE_URL.concat(
        '/company/metaInfo'
    ),
    CHANGE_COMPANY_ADMIN_PASSWORD: BASE.concat(
        COMPANY_ADMIN_BASE + '/changePassword'
    ),
    VERIFY_COMPANY_ADMIN_EMAIL: BASE.concat(COMPANY_ADMIN_BASE + '/verify/email')
}

//const LOG_BASE = '/logging';

export const adminLoggingConstant = {
    FETCH_ADMIN_LOG: BASE.concat(ADMIN_LOGGING + '/search'),
    FETCH_ADMIN_LOG_STATS: BASE.concat(ADMIN_LOGGING + '/log-statics'),
    FETCH_ADMIN_CHART: BASE.concat(ADMIN_LOGGING + '/log-diagram'),
    FETCH_CLIENT_LOG: BASE.concat(ADMIN_LOGGING + '/client/search'),
    FETCH_CLIENT_LOG_STATS: BASE.concat(ADMIN_LOGGING + '/client/log-statics'),
    FETCH_CLIENT_CHART: BASE.concat(ADMIN_LOGGING + '/client/log-diagram')
}
export const clientLoggingConstant = {
    FETCH_CLIENT_LOG: BASE.concat(CLIENT_LOGGING + '/search'),
    FETCH_CLIENT_LOG_STATS: BASE.concat(CLIENT_LOGGING + '/log-statics'),
    FETCH_CLIENT_CHART: BASE.concat(CLIENT_LOGGING + '/log-diagram')
}

const UNIVERSITY_BASE = '/university'
export const universitySetupApiConstants = {
    SAVE_UNIVERSITY: BASE.concat(UNIVERSITY_BASE),
    EDIT_UNIVERSITY: BASE.concat(UNIVERSITY_BASE),
    DELETE_UNIVERSITY: BASE.concat(UNIVERSITY_BASE),
    FETCH_UNIVERSITY_FOR_DROPDOWN: BASE.concat(
        UNIVERSITY_BASE.concat('/active/min')
    ),
    FETCH_UNIVERSITY_DETAILS_BY_ID: BASE.concat(
        UNIVERSITY_BASE.concat('/detail')
    ),
    SEARCH_UNIVERSITY: BASE.concat(UNIVERSITY_BASE.concat('/search'))
}

export const countryApiConstants = {
    FETCH_COUNTRY_FOR_DROPDOWN: BASE.concat('/country')
}

const APPOINTMENT_MODE_BASE = '/appointmentMode'
export const appointmentModeApiConstants = {
    SAVE_APPOINTMENT_MODE: BASE.concat(APPOINTMENT_MODE_BASE),
    EDIT_APPOINTMENT_MODE: BASE.concat(APPOINTMENT_MODE_BASE),
    DELETE_APPOINTMENT_MODE: BASE.concat(APPOINTMENT_MODE_BASE),
    FETCH_APPOINTMENT_MODE_FOR_DROPDOWN: BASE.concat(
        APPOINTMENT_MODE_BASE.concat('/active/min')
    ),
    FETCH_APPOINTMENT_MODE_DETAILS_BY_ID: BASE.concat(
        APPOINTMENT_MODE_BASE.concat('/detail')
    ),
    SEARCH_APPOINTMENT_MODE: BASE.concat(APPOINTMENT_MODE_BASE.concat('/search'))
}

export const appointmentTransferApiConstants = {
    APPOINTMENT_TRANSFER: BASE.concat(APPOINTMENT_TRANSFER),
    APPOINTMENT_TRANSFER_PREVIEW: BASE.concat(APPOINTMENT_TRANSFER + '/detail'),
    APPOINTMENT_TRANSFER_CHARGE: BASE.concat(APPOINTMENT_TRANSFER + '/charge'),
    APPOINTMENT_TRANSFER_DATE: BASE.concat(APPOINTMENT_TRANSFER.concat('/date')),
    APPOINTMENT_TRANSFER_TIME: BASE.concat(APPOINTMENT_TRANSFER.concat('/time')),
    APPOINTMENT_TRANSFER_SEARCH: BASE.concat(
        APPOINTMENT_TRANSFER.concat('/search')
    )
}

const ROOM_SETUP_BASE = '/room'
export const roomSetupApiConstants = {
    SAVE_ROOM_NUMBER: BASE.concat(ROOM_SETUP_BASE),
    EDIT_ROOM_NUMBER: BASE.concat(ROOM_SETUP_BASE),
    DELETE_ROOM_NUMBER: BASE.concat(ROOM_SETUP_BASE),
    SEARCH_ROOM_NUMBER: BASE.concat(ROOM_SETUP_BASE.concat('/search')),
    FETCH_ACTIVE_ROOM_NUMBER_FOR_DROPDOWN: BASE.concat(
        ROOM_SETUP_BASE.concat('/active/min')
    ),
    FETCH_ALL_ROOM_NUMBER_FOR_DROPDOWN: BASE.concat(
        ROOM_SETUP_BASE.concat('/min')
    ),
    FETCH_ACTIVE_ROOM_NUMBER_BY_DEPARTMENT_FOR_DROPDOWN: BASE.concat(
        ROOM_SETUP_BASE.concat('/hospitalDepartmentWise/active/min')
    ),
    FETCH_ALL_ROOM_NUMBER_BY_DEPARTMENT_FOR_DROPDOWN: BASE.concat(
        ROOM_SETUP_BASE.concat('/hospitalDepartmentWise/min')
    )
}

export const hospitalDepartmentSetupApiConstants = {
    SAVE_HOSPITAL_DEPARTMENT: BASE.concat(HOSPITAL_DEPARTMENT_SETUP_BASE),
    EDIT_HOSPITAL_DEPARTMENT: BASE.concat(HOSPITAL_DEPARTMENT_SETUP_BASE),
    DELETE_HOSPITAL_DEPARTMENT: BASE.concat(HOSPITAL_DEPARTMENT_SETUP_BASE),
    SEARCH_HOSPITAL_DEPARTMENT: BASE.concat(
        HOSPITAL_DEPARTMENT_SETUP_BASE.concat('/search')
    ),
    FETCH_HOSPITAL_DEPARTMENT_DETAILS_BY_ID: BASE.concat(
        HOSPITAL_DEPARTMENT_SETUP_BASE.concat('/detail')
    ),
    FETCH_ACTIVE_HOSPITAL_DEPARTMENT_FOR_DROPDOWN: BASE.concat(
        HOSPITAL_DEPARTMENT_SETUP_BASE.concat('/active/min')
    ),
    FETCH_ALL_HOSPITAL_DEPARTMENT_FOR_DROPDOWN: BASE.concat(
        HOSPITAL_DEPARTMENT_SETUP_BASE.concat('/min')
    ),
    FETCH_AVAILABLE_ROOMS_FOR_DROPDOWN: BASE.concat(
        HOSPITAL_DEPARTMENT_SETUP_BASE.concat('/available/room')
    )
}

const DEPARTMENT_DUTY_ROSTER_BASE = '/hospitalDepartmentDutyRoster'
export const departmentDutyRosterApiConstants = {
    CREATE_DEPARTMENT_DUTY_ROSTER: BASE.concat(DEPARTMENT_DUTY_ROSTER_BASE),
    UPDATE_DEPARTMENT_DUTY_ROSTER: BASE.concat(DEPARTMENT_DUTY_ROSTER_BASE),
    DELETE_DEPARTMENT_DUTY_ROSTER: BASE.concat(DEPARTMENT_DUTY_ROSTER_BASE),
    SEARCH_DEPARTMENT_DUTY_ROSTER: BASE.concat(
        DEPARTMENT_DUTY_ROSTER_BASE.concat('/search')
    ),
    FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID: BASE.concat(
        DEPARTMENT_DUTY_ROSTER_BASE.concat('/detail')
    ),
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER: BASE.concat(
        DEPARTMENT_DUTY_ROSTER_BASE.concat('/existing')
    ),
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID: BASE.concat(
        DEPARTMENT_DUTY_ROSTER_BASE.concat('/existing/detail')
    ),
    UPDATE_DEPARTMENT_DUTY_ROSTER_OVERRIDE: BASE.concat(
        DEPARTMENT_DUTY_ROSTER_BASE.concat('/override')
    ),
    DELETE_DEPARTMENT_DUTY_ROSTER_OVERRIDE: BASE.concat(
        DEPARTMENT_DUTY_ROSTER_BASE.concat('/override')
    ),
    REVERT_DEPARTMENT_DUTY_ROSTER_OVERRIDE_UPDATE: BASE.concat(
        DEPARTMENT_DUTY_ROSTER_BASE.concat('/override/revert')
    )
}

export const hospitalIntegrationConstants = {
    HOSPITAL_API_INTEGRATION_SAVE: BASE.concat(HOSPITAL_API_INTEGRATION),
    HOSPITAL_FEATURE_TYPE_DROPDOWN: BASE.concat(
        INTEGRATION + '/features/active/min'
    ),
    HOSPITAL_REQUEST_METHOD_DROPDOWN: BASE.concat(
        INTEGRATION + '/request-methods/active/min'
    ),
    HOSPITAL_API_INTEGRATION_SEARCH: BASE.concat(
        HOSPITAL_API_INTEGRATION + '/client-api-integration'
    ),
    HOSPITAL_API_INTEGRATION_EDIT: BASE.concat(HOSPITAL_API_INTEGRATION),
    HOSPITAL_API_INTEGRATION_PREVIEW: BASE.concat(HOSPITAL_API_INTEGRATION),
    HOSPITAL_API_INTEGRATION_DELETE: BASE.concat(HOSPITAL_API_INTEGRATION),
    HOSPITAL_API_INTEGRATION_UPDATE_PREVIEW: BASE.concat(
        HOSPITAL_API_INTEGRATION + '/update-details'
    ),
    HOSPITAL_API_INTEGRATION_CHANNEL_DROPDOWN: BASE.concat(
        INTEGRATION + '/integration-channel/active/min'
    ),
    HOSPITAL_API_INTEGRATION_TYPE_DROPDOWN: BASE.concat(
        INTEGRATION + '/api-integration-type/active/min'
    ),
    HOSPITAL_FEATURE_TYPE_DROPDOWN_BY_INTEGRATION_TYPE: BASE.concat(
        INTEGRATION + '/features'
    )
}

export const adminApiIntegrationConstants = {
    ADMIN_API_INTEGRATION_SAVE: BASE.concat(ADMIN_API_INTEGRATION),
    ADMIN_API_INTEGRATION_SEARCH: BASE.concat(
        ADMIN_API_INTEGRATION + '/admin-mode-api-integration'
    ),
    ADMIN_API_INTEGRATION_EDIT: BASE.concat(ADMIN_API_INTEGRATION),
    ADMIN_API_INTEGRATION_PREVIEW: BASE.concat(ADMIN_API_INTEGRATION),
    ADMIN_API_INTEGRATION_DELETE: BASE.concat(ADMIN_API_INTEGRATION),
    ADMIN_API_INTEGRATION_UPDATE_PREVIEW: BASE.concat(
        ADMIN_API_INTEGRATION + '/update-details'
    )
}

// export const hospital

export const requestbodyIntegrationConstants = {
    REQUEST_BODY_API_INTEGRATION_SAVE: BASE.concat(REQUEST_BODY_INTEGRATION),
    REQUEST_BODY_INTEGRATION_DROPDOWN: BASE.concat(
        INTEGRATION + '/request-body-parameters/active/min'
    ),
    REQUEST_BODY_API_INTEGRATION_SEARCH: BASE.concat(
        REQUEST_BODY_INTEGRATION + '/request-body-attributes'
    ),
    REQUEST_BODY_API_INTEGRATION_EDIT: BASE.concat(REQUEST_BODY_INTEGRATION),
    REQUEST_BODY_API_INTEGRATION_EDIT_PREVIEW: BASE.concat(
        REQUEST_BODY_INTEGRATION
    ),
    REQUEST_BODY_API_INTEGRATION_DELETE: BASE.concat(REQUEST_BODY_INTEGRATION),
    REQUEST_BODY_API_INTEGRATION_BY_FEATURE_TYPE: BASE.concat(
        REQUEST_BODY_INTEGRATION
    ),
    REQUEST_BODY_API_INTEGRATION_PREVIEW: BASE.concat(
        REQUEST_BODY_INTEGRATION + '/detail'
    )
    //HOSPITAL_API_INTEGRATION_UPDATE_PREVIEW:BASE.concat(HOSPITAL_API_INTEGRATION+"/update-details")
}

const BILLING_MODE_BASE = '/billingMode'
export const billingModeApiConstants = {
    SAVE_BILLING_MODE: BASE.concat(BILLING_MODE_BASE),
    EDIT_BILLING_MODE: BASE.concat(BILLING_MODE_BASE),
    DELETE_BILLING_MODE: BASE.concat(BILLING_MODE_BASE),
    PREVIEW_BILLING_MODE: BASE.concat(BILLING_MODE_BASE.concat('/detail')),
    SEARCH_BILLING_MODE: BASE.concat(BILLING_MODE_BASE.concat('/search')),
    FETCH_ACTIVE_BILLING_MODE_FOR_DROPDOWN: BASE.concat(
        BILLING_MODE_BASE.concat('/active/min')
    ),
    FETCH_ALL_BILLING_MODE_FOR_DROPDOWN: BASE.concat(
        BILLING_MODE_BASE.concat('/min')
    ),
    FETCH_ACTIVE_BILLING_MODE_BY_HOSPITAL_FOR_DROPDOWN: BASE.concat(
        BILLING_MODE_BASE.concat('/hospital-wise/active/min')
    ),
    FETCH_ALL_BILLING_MODE_BY_HOSPITAL_FOR_DROPDOWN: BASE.concat(
        BILLING_MODE_BASE.concat('/hospital-wise/min')
    )
}

const APPOINTMENT_SERVICE_TYPE_BASE = '/appointmentServiceType'
export const appointmentServiceTypeApiConstants = {
    FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE: BASE.concat(
        APPOINTMENT_SERVICE_TYPE_BASE.concat('/active/min')
    ),
    FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_WITH_CODE: BASE.concat(
        APPOINTMENT_SERVICE_TYPE_BASE.concat('/name/code')
    )
}

const FAVOURITES_BASE = '/adminFavourite'
export const favouritesApiConstants = {
    SAVE_FAVOURITES: BASE.concat(FAVOURITES_BASE),
    UPDATE_FAVOURITES: BASE.concat(FAVOURITES_BASE),
    FETCH_FAVOURITES_FOR_DROPDOWN: BASE.concat(FAVOURITES_BASE)
}

export const excelApiConstants = {
    APPOINTMENT_LOG_EXCEL: BASE.concat('/excel-report/appointment-log'),
    RESCHEDULE_LOG_EXCEL: BASE.concat('/excel-report/reschedule-log'),
    TRANSACTION_LOG_EXCEL: BASE.concat('/excel-report/transaction-log'),
    TRANSFER_LOG_EXCEL: BASE.concat('/excel-report/transfer-log'),
    PATIENT_LOG_EXCEL: BASE.concat('/excel-report/patientDetails')
}

