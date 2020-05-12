import {Axios} from '@frontend-appointment/core'
import {LogoutActions} from "@frontend-appointment/action-module"
export const logoutUser = () => async() => {
  
    // if (Cookies.get('XSRF-TOKEN')) {
        try {
            await Axios.get('api/v1/logout')
            dispatchEvent(LogoutActions.logoutSuccess())
            localStorage.clear();
            return true;
        } catch (e) {
          return false
        }finally{
          
        }
    // } else {
    //     dispatch(LogoutActions.logoutError("Are you sure you're logged in ?"));
    // }

};
