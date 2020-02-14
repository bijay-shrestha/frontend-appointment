import {LogoutActions} from "@frontend-appointment//action-module";
import Cookies from "js-cookie";
import {Axios} from "@frontend-appointment/core";

export const logoutUser = (path) => async dispatch => {
    dispatch(LogoutActions.logoutPending({}));
    // if (Cookies.get('XSRF-TOKEN')) {
        try {
            // await Axios.get(path);
            // Cookies.remove('XSRF-TOKEN', {domain: process.env.REACT_APP_DOMAIN_NAME});
            // localStorage.clear();
            localStorage.clear();
            dispatch(LogoutActions.logoutSuccess());
            return true;
        } catch (e) {
            dispatch(LogoutActions.logoutError(e.errorMessage ? e.errorMessage
                : 'Something wrong in server. Could not logout.'));
        }
    // } else {
    //     dispatch(LogoutActions.logoutError("Are you sure you're logged in ?"));
    // }

};
