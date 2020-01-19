import {Axios} from '@frontend-appointment/core';
import {LoginActions} from '@frontend-appointment/action-module';

export const signinUser = (path, data) => async dispatch => {
    dispatch(LoginActions.isLoginPending({}));
    try {
        const response = await Axios.postRaw(path, data);
        dispatch(LoginActions.isLoginSuccess(response.data));
        let jwtToken = response.data
        localStorage.setItem('auth-token', jwtToken)
        return response
    } catch (error){
        dispatch(LoginActions.isLoginError(error));
        throw error;
    }
}
