
import Cookies from "js-cookie";
import {Axios} from "@frontend-appointment/core";

export const logoutUser = (path) => async dispatch => {
  
    // if (Cookies.get('XSRF-TOKEN')) {
        try {
            // await Axios.get(path);
            // Cookies.remove('XSRF-TOKEN', {domain: process.env.REACT_APP_DOMAIN_NAME});
            // localStorage.clear();
            localStorage.clear();
            return true;
        } catch (e) {
          return false
        }
    // } else {
    //     dispatch(LogoutActions.logoutError("Are you sure you're logged in ?"));
    // }

};
