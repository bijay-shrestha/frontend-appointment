import {dashboardDetailsActionsConstant} from '@frontend-appointment/action-module'
const {
  DASHBOARD_APPOINTMENT_STATISTICS_ERROR,
  DASHBOARD_APPOINTMENT_STATISTICS_START,
  DASHBOARD_APPOINTMENT_STATISTICS_SUCCESS,
  DASHBOARD_REGISTERED_PATIENTS_FETCH_ERROR,
  DASHBOARD_REGISTERED_PATIENTS_FETCH_START,
  DASHBOARD_REGISTERED_PATIENTS_FETCH_SUCCESS,
  DASHBOARD_REVENUE_DAY_FETCH_ERROR,
  DASHBOARD_REVENUE_DAY_FETCH_START,
  DASHBOARD_REVENUE_DAY_FETCH_SUCCESS,
  DASHBOARD_REVENUE_MONTH_FETCH_ERROR,
  DASHBOARD_REVENUE_MONTH_FETCH_START,
  DASHBOARD_REVENUE_MONTH_FETCH_SUCCESS,
  DASHBOARD_REVENUE_STATISTICS_FETCH_ERROR,
  DASHBOARD_REVENUE_STATISTICS_FETCH_START,
  DASHBOARD_REVENUE_STATISTICS_FETCH_SUCCESS,
  DASHBOARD_REVENUE_WEEK_FETCH_ERROR,
  DASHBOARD_REVENUE_WEEK_FETCH_START,
  DASHBOARD_REVENUE_WEEK_FETCH_SUCCESS,
  DASHBOARD_REVENUE_YEAR_FETCH_ERROR,
  DASHBOARD_REVENUE_YEAR_FETCH_START,
  DASHBOARD_REVENUE_YEAR_FETCH_SUCCESS,
  DASHBOARD_APPOINTMENT_QUEUE_FETCH_ERROR,
  DASHBOARD_APPOINTMENT_QUEUE_FETCH_START,
  DASHBOARD_APPOINTMENT_QUEUE_FETCH_SUCCESS,
  DASHBOARD_DOCTOR_REVENUE_FETCH_ERROR,
  DASHBOARD_DOCTOR_REVENUE_FETCH_START,
  DASHBOARD_DOCTOR_REVENUE_FETCH_SUCCESS,
  CLEAR_DASHBOARD_DOCTOR_REVENUE_MESSAGE,
  FETCH_DASHBOARD_FEATURES_BY_ADMIN_ID_ERROR,
  FETCH_DASHBOARD_FEATURES_BY_ADMIN_ID_PENDING,
  FETCH_DASHBOARD_FEATURES_BY_ADMIN_ID_SUCCESS,
  FETCH_DASHBOARD_FEATURES_ERROR,
  FETCH_DASHBOARD_FEATURES_START,
  FETCH_DASHBOARD_FEATURES_SUCCESS
} = dashboardDetailsActionsConstant

const appointmentStatsState = {
  isAppointmentStatsLoading: true,
  appointmentStatsData: null,
  appointmentStatsErrorMessage: ''
}

const registeredPatientsState = {
  isRegisteredPatientLoading: true,
  registeredPatientsData: null,
  registeredPatientsErrorMessage: ''
}

const revenueStatsState = {
  isRevenueStatsLoading: true,
  revenueStatsData: [],
  revenueStatsErrorMessage: ''
}

const revenueGeneratedDay = {
  isRevenueGeneratedDayLoading: true,
  revenueGeneratedDayData: {},
  revenueGeneratedDayErrorMessage: ''
}

const revenueGeneratedByDoctor = {
  isDoctorRevenueGeneratedLoading: true,
  doctorRevenueGenerated: [],
  doctorRevenueGeneratedErrorMessage: '',
  totalItems: 0,
  totalAmount: 0,
  overallAppointment: 0,
  totalFollowUp:0
}

const revenueGeneratedMonth = {
  isRevenueGeneratedMonthLoading: true,
  revenueGeneratedMonthData: {},
  revenueGeneratedMonthErrorMessage: ''
}

const revenueGeneratedYear = {
  isRevenueGeneratedYearLoading: true,
  revenueGeneratedYearData: {},
  revenueGeneratedYearErrorMessage: ''
}

const revenueGeneratedWeek = {
  isRevenueGeneratedWeekLoading: true,
  revenueGeneratedWeekData: {},
  revenueGeneratedWeekErrorMessage: ''
}

const appointmentQueueDaily = {
  isAppointmentQueueLoading: true,
  appointmentQueueData: [],
  appointmentQueueErrorMessage: '',
  totalItems: ''
}

const dashboardFeatures = {
  isDashboardFeatureLoading: true,
  dashboardFeatureData: [],
  dashboardFeatureErrorMessage: ''
}
const dasboardFeatureByAdmin = {
  isDashboardFeatureAdminLoading: true,
  dasboardFeatureByAdminData: [],
  dasboardFeatureByAdminErrorMessage: ''
}

export const DashboardAppointmentQueueReducer = (
  state = {...appointmentQueueDaily},
  action
) => {
  switch (action.type) {
    case DASHBOARD_APPOINTMENT_QUEUE_FETCH_START:
      return {
        ...state,
        isAppointmentQueueLoading: true,
        appointmentQueueData: [],
        appointmentQueueErrorMessage: '',
        totalItems: ''
      }
    case DASHBOARD_APPOINTMENT_QUEUE_FETCH_SUCCESS:
      return {
        ...state,
        isAppointmentQueueLoading: false,
        appointmentQueueData: action.payload.data,
        appointmentQueueErrorMessage: '',
        totalItems: action.payload.data[0].totalItems
      }
    case DASHBOARD_APPOINTMENT_QUEUE_FETCH_ERROR:
      return {
        ...state,
        isAppointmentQueueLoading: false,
        appointmentQueueData: [],
        appointmentQueueErrorMessage: action.payload.data,
        totalItems: ''
      }
    default:
      return {...state}
  }
}

export const DashboardAppointmentStatisticsReducer = (
  state = {...appointmentStatsState},
  action
) => {
  switch (action.type) {
    case DASHBOARD_APPOINTMENT_STATISTICS_START:
      return {
        ...state,
        isAppointmentStatsLoading: true,
        appointmentStatsData: null,
        appointmentStatsErrorMessage: ''
      }
    case DASHBOARD_APPOINTMENT_STATISTICS_SUCCESS:
      return {
        ...state,
        isAppointmentStatsLoading: false,
        appointmentStatsData: action.payload.data,
        appointmentStatsErrorMessage: ''
      }
    case DASHBOARD_APPOINTMENT_STATISTICS_ERROR:
      return {
        ...state,
        isAppointmentStatsLoading: false,
        appointmentStatsData: null,
        appointmentStatsErrorMessage: action.payload.data
      }
    default:
      return {...state}
  }
}

export const DashboardRegisteredPatientReducer = (
  state = {...registeredPatientsState},
  action
) => {
  switch (action.type) {
    case DASHBOARD_REGISTERED_PATIENTS_FETCH_START:
      return {
        ...state,
        isRegisteredPatientLoading: true,
        registeredPatientsData: null,
        registeredPatientsErrorMessage: ''
      }
    case DASHBOARD_REGISTERED_PATIENTS_FETCH_SUCCESS:
      return {
        ...state,
        isRegisteredPatientLoading: false,
        registeredPatientsData: action.payload.data,
        registeredPatientsErrorMessage: ''
      }
    case DASHBOARD_REGISTERED_PATIENTS_FETCH_ERROR:
      return {
        ...state,
        isRegisteredPatientLoading: false,
        registeredPatientsData: null,
        registeredPatientsErrorMessage: action.payload.data
      }
    default:
      return {...state}
  }
}

export const DashboardRevenueStatisticsReducer = (
  state = {...revenueStatsState},
  action
) => {
  switch (action.type) {
    case DASHBOARD_REVENUE_STATISTICS_FETCH_START:
      return {
        ...state,
        isRevenueStatsLoading: true,
        revenueStatsData: [],
        revenueStatsErrorMessage: ''
      }
    case DASHBOARD_REVENUE_STATISTICS_FETCH_SUCCESS:
      return {
        ...state,
        isRevenueStatsLoading: false,
        revenueStatsData: action.payload.data.data,
        revenueStatsErrorMessage: ''
      }
    case DASHBOARD_REVENUE_STATISTICS_FETCH_ERROR:
      return {
        ...state,
        isRevenueStatsLoading: false,
        revenueStatsData: [],
        revenueStatsErrorMessage: action.payload.data
      }
    default:
      return {...state}
  }
}

export const DashboardRevenueGeneratedDayReducer = (
  state = {...revenueGeneratedDay},
  action
) => {
  switch (action.type) {
    case DASHBOARD_REVENUE_DAY_FETCH_START:
      return {
        ...state,
        isRevenueGeneratedDayLoading: true,
        revenueGeneratedDayData: {},
        revenueGeneratedDayErrorMessage: ''
      }
    case DASHBOARD_REVENUE_DAY_FETCH_SUCCESS:
      return {
        ...state,
        isRevenueGeneratedDayLoading: false,
        revenueGeneratedDayData: action.payload.data,
        revenueGeneratedDayErrorMessage: ''
      }
    case DASHBOARD_REVENUE_DAY_FETCH_ERROR:
      return {
        ...state,
        isRevenueGeneratedDayLoading: false,
        revenueGeneratedDayData: {},
        revenueGeneratedDayErrorMessage: action.payload.data
      }
    default:
      return {...state}
  }
}

export const DashboardRevenueGeneratedMonthReducer = (
  state = {...revenueGeneratedMonth},
  action
) => {
  switch (action.type) {
    case DASHBOARD_REVENUE_MONTH_FETCH_START:
      return {
        ...state,
        isRevenueGeneratedMonthLoading: true,
        revenueGeneratedMonthData: {},
        revenueGeneratedMonthErrorMessage: ''
      }
    case DASHBOARD_REVENUE_MONTH_FETCH_SUCCESS:
      return {
        ...state,
        isRevenueGeneratedMonthLoading: false,
        revenueGeneratedMonthData: action.payload.data,
        revenueGeneratedMonthErrorMessage: ''
      }
    case DASHBOARD_REVENUE_MONTH_FETCH_ERROR:
      return {
        ...state,
        isRevenueGeneratedMonthLoading: false,
        revenueGeneratedMonthData: {},
        revenueGeneratedMonthErrorMessage: action.payload.data
      }
    default:
      return {...state}
  }
}

export const DashboardRevenueGeneratedWeekReducer = (
  state = {...revenueGeneratedWeek},
  action
) => {
  switch (action.type) {
    case DASHBOARD_REVENUE_WEEK_FETCH_START:
      return {
        ...state,
        isRevenueGeneratedWeekLoading: true,
        revenueGeneratedWeekData: {},
        revenueGeneratedWeekErrorMessage: ''
      }
    case DASHBOARD_REVENUE_WEEK_FETCH_SUCCESS:
      return {
        ...state,
        isRevenueGeneratedWeekLoading: false,
        revenueGeneratedWeekData: action.payload.data,
        revenueGeneratedWeekErrorMessage: ''
      }
    case DASHBOARD_REVENUE_WEEK_FETCH_ERROR:
      return {
        ...state,
        isRevenueGeneratedWeekLoading: false,
        revenueGeneratedWeekData: {},
        revenueGeneratedWeekErrorMessage: action.payload.data
      }
    default:
      return {...state}
  }
}

export const DashboardRevenueGeneratedYearReducer = (
  state = {...revenueGeneratedYear},
  action
) => {
  switch (action.type) {
    case DASHBOARD_REVENUE_YEAR_FETCH_START:
      return {
        ...state,
        isRevenueGeneratedYearLoading: true,
        revenueGeneratedYearData: {},
        revenueGeneratedYearErrorMessage: ''
      }
    case DASHBOARD_REVENUE_YEAR_FETCH_SUCCESS:
      return {
        ...state,
        isRevenueGeneratedYearLoading: false,
        revenueGeneratedYearData: action.payload.data,
        revenueGeneratedYearErrorMessage: ''
      }
    case DASHBOARD_REVENUE_YEAR_FETCH_ERROR:
      return {
        ...state,
        isRevenueGeneratedYearLoading: false,
        revenueGeneratedYearData: {},
        revenueGeneratedYearErrorMessage: action.payload.data
      }
    default:
      return {...state}
  }
}

export const DashboardRevenueGeneratedByDoctorReducer = (
  state = {...revenueGeneratedByDoctor},
  action
) => {
  switch (action.type) {
    case DASHBOARD_DOCTOR_REVENUE_FETCH_START:
      return {
        ...state
      }
    case DASHBOARD_DOCTOR_REVENUE_FETCH_SUCCESS:
      return {
        ...state,
        isDoctorRevenueGeneratedLoading: false,
        doctorRevenueGenerated:
          action.payload.data.doctorRevenueResponseDTOList,
        doctorRevenueGeneratedErrorMessage: '',
        totalItemsDoctorsRevenue: action.payload.data.totalItems,
        totalRevenueAmount: action.payload.data.totalRevenueAmount,
        overallAppointment: action.payload.data.overallAppointmentCount,
        totalFollowUp:action.payload.data.overallFollowUpCount
      }
    case DASHBOARD_DOCTOR_REVENUE_FETCH_ERROR:
      return {
        ...state,
        isDoctorRevenueGeneratedLoading: false,
        doctorRevenueGenerated: [],
        doctorRevenueGeneratedErrorMessage: action.payload.data,
        totalItemsDoctorsRevenue: 0,
        totalRevenueAmount: 0,
        overallAppointment: 0,
        totalFollowUp:0
      }
    case CLEAR_DASHBOARD_DOCTOR_REVENUE_MESSAGE:
      return {
        ...state,
        isDoctorRevenueGeneratedLoading: true,
        doctorRevenueGenerated: [],
        doctorRevenueGeneratedErrorMessage: '',
        totalItemsDoctorsRevenue: 0,
        totalRevenueAmount: 0,
        overallAppointment: 0,
        totalFollowUp:0
      }
    default:
      return {...state}
  }
}

export const DashboardFeaturesReducer = (
  state = {...dashboardFeatures},
  action
) => {
  switch (action.type) {
    case FETCH_DASHBOARD_FEATURES_START:
      return {
        ...state
      }
    case FETCH_DASHBOARD_FEATURES_SUCCESS:
      return {
        ...state,
        isDashboardFeatureLoading: false,
        dashboardFeatureData: action.payload.data,
        dashboardFeatureErrorMessage: ''
      }
    case FETCH_DASHBOARD_FEATURES_ERROR:
      return {
        ...state,
        isDashboardFeatureLoading: false,
        dashboardFeatureData: [],
        dashboardFeatureErrorMessage: action.payload.message
      }
    default:
      return {...state}
  }
}

export const DashboardFeaturesByAdminReducer = (
  state = {...dasboardFeatureByAdmin},
  action
) => {
  switch (action.type) {
    case FETCH_DASHBOARD_FEATURES_BY_ADMIN_ID_PENDING:
      return {
        ...state
      }
    case FETCH_DASHBOARD_FEATURES_BY_ADMIN_ID_SUCCESS:
      return {
        isDashboardFeatureAdminLoading: false,
        dasboardFeatureByAdminData: action.payload.data,
        dasboardFeatureByAdminErrorMessage: ''
      }
    case FETCH_DASHBOARD_FEATURES_BY_ADMIN_ID_ERROR:
      return {
        isDashboardFeatureAdminLoading: false,
        dasboardFeatureByAdminData: [],
        dasboardFeatureByAdminErrorMessage: action.payload.message
      }
    default:
      return {...state}
  }
}
