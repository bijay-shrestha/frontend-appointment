import {AdminLoggingSetupActions} from '@frontend-appointment/action-module'
export const fetchAdminLog = (path, queryParams, searchData) => async dispatch => {
    dispatch(AdminLoggingSetupActions.logFetchStart());
    try {
        const response = await Axios.putWithRequestParam(path, queryParams, searchData);
        dispatch(AdminLoggingSetupActions.logFetchSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(AdminLoggingSetupActions.logFetchError(e.errorMessage));
    }
};

export const fetchAdminLogStatistics = (path, searchData) => async dispatch => {
    dispatch(AdminLoggingSetupActions.logStatsFetchStart());
    try {
        const response = await Axios.put(path, searchData);
        dispatch(AdminLoggingSetupActions.logStatsFetchSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(AdminLoggingSetupActions.logStatsFetchError(e.errorMessage));
    }
};