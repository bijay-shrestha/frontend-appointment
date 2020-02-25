import React from 'react'
import {Redirect} from 'react-router-dom'
import {EnvironmentVariableGetter, LocalStorageSecurity} from '@frontend-appointment/helpers'

const LoginHoc = (ComposedComponent, dashboardPath) => {
    const CheckAuthentication = props => {
        let path = dashboardPath;
        let isLoggedIn = false;
        let authToken = LocalStorageSecurity.localStorageDecoder(EnvironmentVariableGetter.AUTH_TOKEN.toString());
        const checkIfUserIsLoggedInAlready = () => {
            if (authToken) {
                isLoggedIn = true;
                const pathInLocalStorage = LocalStorageSecurity.localStorageDecoder(
                    'active'
                );
                if (pathInLocalStorage)
                    path =
                        EnvironmentVariableGetter.REACT_APP_BASE_PATH_CODE +
                        pathInLocalStorage.replace('true', '')
            }
            return isLoggedIn
        };

        return !checkIfUserIsLoggedInAlready() ? (
            <ComposedComponent {...props} history={props.history}/>
        ) : (
            <Redirect to={path}/>
        )
    };
    return CheckAuthentication
};
export default LoginHoc
