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
  DASHBOARD_REVENUE_YEAR_FETCH_SUCCESS
} = dashboardDetailsActionsConstant

const appointmentStatsState = {
  isAppointmentStatsLoading: true,
  appointmentStatsData: [],
  appointmentStatsErrorMessage: ''
}

const registeredPatientsState = {
  isRegisteredPatientLoading: true,
  registeredPatientsData: {},
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

export const DashboardAppointmentStatisticsReducer = (
  state = {...appointmentStatsState},
  action
) => {
  switch (action.type) {
    case DASHBOARD_APPOINTMENT_STATISTICS_START:
      return {
        ...state,
        isRevenueStatsLoading: true,
        revenueStatsData: [],
        revenueStatsErrorMessage: ''
      }
    case DASHBOARD_APPOINTMENT_STATISTICS_SUCCESS:
      return {
        ...state,
        isRevenueStatsLoading: true,
        revenueStatsData:action.payload.data,
        revenueStatsErrorMessage: ''
      }
    case DASHBOARD_APPOINTMENT_STATISTICS_ERROR:
      return {
        ...state,
        isRevenueStatsLoading: true,
        revenueStatsData: [],
        revenueStatsErrorMessage: action.payload.data
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
        isRegisteredPatientLoading: false,
        registeredPatientsData: {},
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
        registeredPatientsData: {},
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
