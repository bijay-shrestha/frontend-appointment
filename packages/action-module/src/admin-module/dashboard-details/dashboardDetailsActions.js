import {dashboardDetailsActionsConstant} from './dashboardDetailsActionConstant'

const {
  DASHBOARD_REVENUE_DAY_FETCH_ERROR,
  DASHBOARD_REVENUE_DAY_FETCH_START,
  DASHBOARD_REVENUE_DAY_FETCH_SUCCESS,
  DASHBOARD_REVENUE_MONTH_FETCH_ERROR,
  DASHBOARD_REVENUE_MONTH_FETCH_START,
  DASHBOARD_REVENUE_MONTH_FETCH_SUCCESS,
  DASHBOARD_REVENUE_WEEK_FETCH_ERROR,
  DASHBOARD_REVENUE_WEEK_FETCH_START,
  DASHBOARD_REVENUE_WEEK_FETCH_SUCCESS,
  DASHBOARD_REVENUE_YEAR_FETCH_ERROR,
  DASHBOARD_REVENUE_YEAR_FETCH_START,
  DASHBOARD_REVENUE_YEAR_FETCH_SUCCESS,
  DASHBOARD_REGISTERED_PATIENTS_FETCH_ERROR,
  DASHBOARD_REGISTERED_PATIENTS_FETCH_START,
  DASHBOARD_REGISTERED_PATIENTS_FETCH_SUCCESS,
  DASHBOARD_REVENUE_STATISTICS_FETCH_ERROR,
  DASHBOARD_REVENUE_STATISTICS_FETCH_START,
  DASHBOARD_REVENUE_STATISTICS_FETCH_SUCCESS,
  DASHBOARD_APPOINTMENT_STATISTICS_ERROR,
  DASHBOARD_APPOINTMENT_STATISTICS_START,
  DASHBOARD_APPOINTMENT_STATISTICS_SUCCESS,
  DASHBOARD_APPOINTMENT_QUEUE_FETCH_ERROR,
  DASHBOARD_APPOINTMENT_QUEUE_FETCH_START,
  DASHBOARD_APPOINTMENT_QUEUE_FETCH_SUCCESS
} = dashboardDetailsActionsConstant

export const dashboardDayRevenueFetchingStart = () => {
  return {
    type: DASHBOARD_REVENUE_DAY_FETCH_START
  }
}

export const dashboardDayRevenueFetchingSuccess = data => {
  return {
    type: DASHBOARD_REVENUE_DAY_FETCH_SUCCESS,
    payload: {data}
  }
}

export const dashboardDayRevenueFetchingError = message => {
  return {
    type: DASHBOARD_REVENUE_DAY_FETCH_ERROR,
    payload: {
      data: message
    }
  }
}

export const dashboardMonthRevenueFetchingStart = () => {
  return {
    type: DASHBOARD_REVENUE_MONTH_FETCH_START
  }
}

export const dashboardMonthRevenueFetchingSuccess = data => {
  return {
    type: DASHBOARD_REVENUE_MONTH_FETCH_SUCCESS,
    payload: {data}
  }
}

export const dashboardMonthRevenueFetchingError = message => {
  return {
    type: DASHBOARD_REVENUE_MONTH_FETCH_ERROR,
    payload: {
      data: message
    }
  }
}

export const dashboardWeekRevenueFetchingStart = () => {
  return {
    type: DASHBOARD_REVENUE_WEEK_FETCH_START
  }
}

export const dashboardWeekRevenueFetchingSuccess = data => {
  return {
    type: DASHBOARD_REVENUE_WEEK_FETCH_SUCCESS,
    payload: {data}
  }
}

export const dashboardWeekRevenueFetchingError = message => {
  return {
    type: DASHBOARD_REVENUE_WEEK_FETCH_ERROR,
    payload: {
      data: message
    }
  }
}

export const dashboardYearRevenueFetchingStart = () => {
  return {
    type: DASHBOARD_REVENUE_YEAR_FETCH_START
  }
}

export const dashboardYearRevenueFetchingSuccess = data => {
  return {
    type: DASHBOARD_REVENUE_YEAR_FETCH_SUCCESS,
    payload: {data}
  }
}

export const dashboardYearRevenueFetchingError = message => {
  return {
    type: DASHBOARD_REVENUE_YEAR_FETCH_ERROR,
    payload: {
      data: message
    }
  }
}

export const dashboardRegisteredPatientsFetchingStart = () => {
  return {
    type: DASHBOARD_REGISTERED_PATIENTS_FETCH_START
  }
}

export const dashboardRegisteredPatientsFetchingSuccess = data => {
  return {
    type: DASHBOARD_REGISTERED_PATIENTS_FETCH_SUCCESS,
    payload: {data}
  }
}

export const dashboardRegisteredPatientsFetchingError = message => {
  return {
    type: DASHBOARD_REGISTERED_PATIENTS_FETCH_ERROR,
    payload: {
      data: message
    }
  }
}

export const dashboardRevenueStatisticsFetchingStart = () => {
  return {
    type: DASHBOARD_REVENUE_STATISTICS_FETCH_START
  }
}

export const dashboardRevenueStatisticsFetchingSuccess = data => {
  return {
    type: DASHBOARD_REVENUE_STATISTICS_FETCH_SUCCESS,
    payload: {data}
  }
}

export const dashboardRevenueStatisticsFetchingError = message => {
  return {
    type: DASHBOARD_REVENUE_STATISTICS_FETCH_ERROR,
    payload: {
      data: message
    }
  }
}

export const dashboardAppointmentStatisticsFetchingStart = () => {
  return {
    type: DASHBOARD_APPOINTMENT_STATISTICS_START
  }
}

export const dashboardAppointmentStatisticsFetchingSuccess = data => {
  return {
    type: DASHBOARD_APPOINTMENT_STATISTICS_SUCCESS,
    payload: {data}
  }
}

export const dashboardAppointmentStatisticsFetchingError = message => {
  return {
    type: DASHBOARD_APPOINTMENT_STATISTICS_ERROR,
    payload: {
      data: message
    }
  }
}

export const dashboardAppointmentQueueFetchingStart = () => {
  return {
    type: DASHBOARD_APPOINTMENT_QUEUE_FETCH_START
  }
}

export const dashboardAppointmentQueueFetchingSuccess = data => {
  return {
    type: DASHBOARD_APPOINTMENT_QUEUE_FETCH_SUCCESS,
    payload: {data}
  }
}

export const dashboardAppointmentQueueFetchingError = message => {
  return {
    type: DASHBOARD_APPOINTMENT_QUEUE_FETCH_ERROR,
    payload: {
      data: message
    }
  }
}
