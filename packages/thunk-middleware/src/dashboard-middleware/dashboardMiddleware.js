import {DashboardDetailsActions, dashboardDetailsActionsConstant} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'
import {MinioMiddleware} from '../../index'

const {CLEAR_DASHBOARD_DEPARTMENT_REVENUE_MESSAGE, CLEAR_DASHBOARD_DOCTOR_REVENUE_MESSAGE} = dashboardDetailsActionsConstant
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
            : 'Sorry Error Occured!!'
        dispatch(
            DashboardDetailsActions.dashboardAppointmentStatisticsFetchingError(
                errorMessage
            )
        )
        throw e
    }
}

export const fetchAppointmentQueueList = (path, paginationData, queueSearchData) => async dispatch => {
    dispatch(
        DashboardDetailsActions.dashboardAppointmentQueueFetchingStart()
    )
    try {
        const response = await Axios.putWithPagination(path, paginationData, queueSearchData)
        // const dataWithPresignedUrl = await MinioMiddleware.getDataListWithPresignedFileUri(
        //     response.data.doctorRevenueInfo, "fileUri");
        dispatch(
            DashboardDetailsActions.dashboardAppointmentQueueFetchingSuccess(
                response.data
            )
        )
        return response
    } catch (e) {
        const errorMessage = e.errorMessage
            ? e.errorMessage
            : 'Sorry  Error Occured!!'
        dispatch(
            DashboardDetailsActions.dashboardAppointmentQueueFetchingError(
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
            : 'Sorry  Error Occured!!'
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
            : 'Sorry  Error Occured!!';
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
            : 'Sorry  Error Occured!!'
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
            : 'Sorry  Error Occured!!'
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
            : 'Sorry  Error Occured!!'
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
            : 'Sorry  Error Occured!!'
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
            : 'Sorry  Error Occured!!'
        dispatch(
            DashboardDetailsActions.dashboardAppointmentQueueFetchingError(errorMessage)
        )
        throw e;
    }
}

export const fetchDashboardDoctorRevenue = (path, data) => async dispatch => {
    dispatch(DashboardDetailsActions.dashboardDoctorRevenueFetchingStart())
    try {
        const response = await Axios.getWithRequestParams(path, data)
        // doctorRevenueInfo
        const dataWithPresignedUrl = await MinioMiddleware.getDataListWithPresignedFileUri(
            response.data.doctorRevenueInfo, "fileUri");
        dispatch(
            DashboardDetailsActions.dashboardDoctorRevenueFetchingSuccess({
                ...response.data,
                doctorRevenueInfo: dataWithPresignedUrl
            })
        )
        return response
    } catch (e) {
        const errorMessage = e.errorMessage
            ? e.errorMessage
            : 'Sorry  Error Occured!!'
        dispatch(
            DashboardDetailsActions.dashboardDoctorRevenueFetchingError(errorMessage)
        )
        throw e;
    }
}

export const clearDashboardDoctorRevenue = () => dispatch => {
    dispatch({type: CLEAR_DASHBOARD_DOCTOR_REVENUE_MESSAGE})
}

export const fetchDashboardDepartmentRevenue = (path, data) => async dispatch => {
    dispatch(DashboardDetailsActions.dashboardDepartmentRevenueFetchingStart())
    try {
        const response = await Axios.getWithRequestParams(path, data)
        dispatch(
            DashboardDetailsActions.dashboardDepartmentRevenueFetchingSuccess(response.data)
        )
        return response
    } catch (e) {
        const errorMessage = e.errorMessage
            ? e.errorMessage
            : 'Sorry  Error Occured!!'
        dispatch(
            DashboardDetailsActions.dashboardDepartmentRevenueFetchingError(errorMessage)
        )
        throw e;
    }
}


export const clearDashboardDepartmentRevenue = () => dispatch => {
    dispatch({type: CLEAR_DASHBOARD_DEPARTMENT_REVENUE_MESSAGE})
}

export const fetchDashboardFeatures = (path) => async dispatch => {
    dispatch(DashboardDetailsActions.fetchDashboardFeatureStart())
    try {
        const response = await Axios.get(path)
        dispatch(
            DashboardDetailsActions.fetchDashboardFeatureSuccess(response.data)
        )
        return response
    } catch (e) {
        const errorMessage = e.errorMessage
            ? e.errorMessage
            : 'Sorry  Error Occured!!'
        dispatch(
            DashboardDetailsActions.fetchDashboardFeatureError(errorMessage)
        )
        return '';
    }
}

export const fetchDashboardFeaturesByAdmin = (path, id) => async dispatch => {
    dispatch(DashboardDetailsActions.fetchDashboardFeatureByAdminStart())
    try {
        const response = await Axios.putWithPathVariables(path, id)
        dispatch(
            DashboardDetailsActions.fetchDashboardFeatureByAdminSuccess(response.data)
        )
        return response
    } catch (e) {
        const errorMessage = e.errorMessage
            ? e.errorMessage
            : 'Sorry  Error Occured!!'
        dispatch(
            DashboardDetailsActions.fetchDashboardFeatureByAdminError(errorMessage)
        )
        return '';
    }
}
