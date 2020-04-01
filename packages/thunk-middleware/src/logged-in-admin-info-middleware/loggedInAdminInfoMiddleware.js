import {Axios} from "@frontend-appointment/core";
import {LoggedInAdminInfoActions} from "@frontend-appointment/action-module";
import {AdminInfoUtils} from "@frontend-appointment/helpers";

export const fetchLoggedInAdminUserInfo = (path, data) => async dispatch => {
    dispatch(LoggedInAdminInfoActions.loggedInAdminInfoFetchPending());
    try {
        let adminInfoResponse = await Axios.put(path, data);
        await AdminInfoUtils.saveLoggedInAdminInfo(adminInfoResponse.data);
        dispatch(LoggedInAdminInfoActions.loggedInAdminInfoFetchSuccess(adminInfoResponse.data));
    } catch (e) {
        dispatch(LoggedInAdminInfoActions.loggedInAdminInfoFetchError(e));
    }
};
