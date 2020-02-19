import {Axios} from '@frontend-appointment/core';
import {LoginActions} from '@frontend-appointment/action-module';
import {LocalStorageSecurity} from '@frontend-appointment/helpers';
import {EnvironmentVariableGetter} from '@frontend-appointment/helpers';

export const signinUser = (path, data) => async dispatch => {
    dispatch(LoginActions.isLoginPending({}));
    try {
        const response = await Axios.postRaw(path, data);
        dispatch(LoginActions.isLoginSuccess(response.data));
        let jwtToken = response.headers.authorization;
        await LocalStorageSecurity.localStorageEncoder(EnvironmentVariableGetter.AUTH_TOKEN, jwtToken);
        return response;
    } catch (error){
        dispatch(LoginActions.isLoginError(error));
        throw error;
    }
}
