import {Axios} from "@frontend-appointment/core";
import {LoggedInAdminInfoActions} from "@frontend-appointment/action-module";
import {AdminInfoUtils} from "@frontend-appointment/helpers";

export const fetchLoggedInAdminUserInfo = (path, data) => async dispatch => {
    dispatch(LoggedInAdminInfoActions.loggedInAdminInfoFetchPending());
    try {
        let adminInfoResponse = await Axios.put(path, data);
        let adminAssignedSubDepartments = await Axios.getWithPathVariables('/admin/api/v1/admin/assignedSubDepartments', data.username);
        AdminInfoUtils.saveLoggedInAdminInfo(adminInfoResponse.data,adminAssignedSubDepartments.data);
        dispatch(LoggedInAdminInfoActions.loggedInAdminInfoFetchSuccess(adminInfoResponse.data));
    } catch (e) {
        dispatch(LoggedInAdminInfoActions.loggedInAdminInfoFetchError(e));
    }
};
