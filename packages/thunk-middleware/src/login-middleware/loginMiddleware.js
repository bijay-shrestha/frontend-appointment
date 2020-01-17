import {Axios} from '@frontend-appointment/core';
import {LoginActions} from '@frontend-appointment/action-module';
import Cookies from 'js-cookie';

export const signinUser = (path, data) => async dispatch => {
    dispatch(LoginActions.isLoginPending({}));
    try {
        const response = await Axios.postRaw(path, data);
        const {cookie} = response.data;
        Cookies.set('XSRF-TOKEN',cookie.value);
        dispatch(LoginActions.isLoginSuccess(response));
        return response;
    } catch (error){
        dispatch(LoginActions.isLoginError(error));
        throw error;
    }
}
