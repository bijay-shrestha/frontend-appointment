import {Axios} from '@frontend-appointment/core'
export const logoutUser = () => async() => {
  
    // if (Cookies.get('XSRF-TOKEN')) {
        try {
            await Axios.get('api/v1/logout')
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
