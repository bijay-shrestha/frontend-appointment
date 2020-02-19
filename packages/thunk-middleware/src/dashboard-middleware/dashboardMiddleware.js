import {DashboardDetailsActions} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'

export const fetchDashboardAppointmentStatisticsList = (
    path,
    data
) => async dispatch => {
    dispatch(
        DashboardDetailsActions.dashboardAppointmentStatisticsFetchingStart()
    )
    try {
        const response = await Axios.put(path, data)
        dispatch(
            DashboardDetailsActions.dashboardAppointmentStatisticsFetchingSuccess(
                response.data
            )
        )
        return response
    } catch (e) {
        const errorMessage = e.errorMessage
            ? e.errorMessage
            : 'Sorry Something Error Occured!!'
        dispatch(
            DashboardDetailsActions.dashboardAppointmentStatisticsFetchingError(
                errorMessage
            )
        )
        throw e
    }
}

export const fetchDashboardRegisteredPatientList = (
    path,
    hospitalId
) => async dispatch => {
    dispatch(DashboardDetailsActions.dashboardRegisteredPatientsFetchingStart())
    try {
        const response = await Axios.getWithPathVariables(path, hospitalId)
        dispatch(
            DashboardDetailsActions.dashboardRegisteredPatientsFetchingSuccess(
                response.data
            )
        )
        return response
    } catch (e) {
        const errorMessage = e.errorMessage
            ? e.errorMessage
            : 'Sorry Something Error Occured!!'
        dispatch(
            DashboardDetailsActions.dashboardRegisteredPatientsFetchingError(
                errorMessage
            )
        )
        throw e
    }
}

export const fetchDashboardRegisteredPatientListForClient = (
    path
) => async dispatch => {
    dispatch(DashboardDetailsActions.dashboardRegisteredPatientsFetchingStart());
    try {
        const response = await Axios.get(path);
        dispatch(
            DashboardDetailsActions.dashboardRegisteredPatientsFetchingSuccess(
                response.data
            )
        );
        return response
    } catch (e) {
        const errorMessage = e.errorMessage
            ? e.errorMessage
            : 'Sorry Something Error Occured!!';
        dispatch(
            DashboardDetailsActions.dashboardRegisteredPatientsFetchingError(
                errorMessage
            )
        );
        throw e
    }
};

export const fetchDashboardRevenueRefundList = (
    path,
    data
) => async dispatch => {
    dispatch(DashboardDetailsActions.dashboardRevenueStatisticsFetchingStart())
    try {
        const response = await Axios.put(path, data)
        dispatch(
            DashboardDetailsActions.dashboardRevenueStatisticsFetchingSuccess(
                response.data
            )
        )
        return response
    } catch (e) {
        const errorMessage = e.errorMessage
            ? e.errorMessage
            : 'Sorry Something Error Occured!!'
        dispatch(
            DashboardDetailsActions.dashboardRevenueStatisticsFetchingError(
                errorMessage
            )
        )
        throw e
    }
}

export const fetchDashboardRevenueDayList = (path, data) => async dispatch => {
    dispatch(DashboardDetailsActions.dashboardDayRevenueFetchingStart())
    try {
        const response = await Axios.put(path, data)
        dispatch(
            DashboardDetailsActions.dashboardDayRevenueFetchingSuccess(response.data)
        )
        return response
    } catch (e) {
        const errorMessage = e.errorMessage
            ? e.errorMessage
            : 'Sorry Something Error Occured!!'
        dispatch(
            DashboardDetailsActions.dashboardDayRevenueFetchingError(errorMessage)
        )
        throw e
    }
}

export const fetchDashboardRevenueMonthList = (
    path,
    data
) => async dispatch => {
    dispatch(DashboardDetailsActions.dashboardMonthRevenueFetchingStart())
    try {
        const response = await Axios.put(path, data)
        dispatch(
            DashboardDetailsActions.dashboardMonthRevenueFetchingSuccess(
                response.data
            )
        )
        return response
    } catch (e) {
        const errorMessage = e.errorMessage
            ? e.errorMessage
            : 'Sorry Something Error Occured!!'
        dispatch(
            DashboardDetailsActions.dashboardMonthRevenueFetchingError(errorMessage)
        )
        throw e
    }
}

export const fetchDashboardRevenueWeekList = (path, data) => async dispatch => {
    dispatch(DashboardDetailsActions.dashboardWeekRevenueFetchingStart())
    try {
        const response = await Axios.put(path, data)
        dispatch(
            DashboardDetailsActions.dashboardWeekRevenueFetchingSuccess(response.data)
        )
        return response
    } catch (e) {
        const errorMessage = e.errorMessage
            ? e.errorMessage
            : 'Sorry Something Error Occured!!'
        dispatch(
            DashboardDetailsActions.dashboardWeekRevenueFetchingError(errorMessage)
        )
        throw e
    }
}

export const fetchDashboardRevenueYearList = (path, data) => async dispatch => {
    dispatch(DashboardDetailsActions.dashboardYearRevenueFetchingStart())
    try {
        const response = await Axios.put(path, data)
        dispatch(
            DashboardDetailsActions.dashboardYearRevenueFetchingSuccess(response.data)
        )
        return response
    } catch (e) {
        const errorMessage = e.errorMessage
            ? e.errorMessage
            : 'Sorry Something Error Occured!!'
        dispatch(
            DashboardDetailsActions.dashboardYearRevenueFetchingError(errorMessage)
        )
        throw e
    }
}
