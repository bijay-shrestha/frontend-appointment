import React, {memo} from 'react';
import {Route, Switch} from 'react-router-dom';
import {AuthenticateHOC} from '@frontend-appointment/authentication-module';
import {CLayout} from '@frontend-appointment/ui-components';
import {routes} from '../routes';
import LoginPage from '../container/Login';
import {ComponentHoc} from '@frontend-appointment/commons';
import SetPassword from '../container/SavePassword/SavePassword';
import {CFullPageLoading, CPageNotFound} from '@frontend-appointment/ui-elements';
import {LocalStorageSecurity} from '@frontend-appointment/helpers';

const AuthenticateModule = () => {
    const getTokenFormLocalStorage = () => {
        let storage = LocalStorageSecurity.localStorageDecoder('auth-token');
        return storage;
    }

    const getUserMenusFromLocalStorage = () => {
        const userMenus = LocalStorageSecurity.localStorageDecoder('userMenus')
        return userMenus ? userMenus : []
    }

    return (
        <>
            <Switch>
                <Route
                    path='/savePassword'
                    component={SetPassword}
                />
                <Route
                    path="/"
                    exact
                    component={props => <LoginPage {...props} id="login-form"/>}
                />
                {routes.map((route, idx) => (
                    <Route
                        key={idx}
                        exact
                        path={route.path}
                        component={AuthenticateHOC(
                            props => (
                                <CLayout
                                    {...props}
                                    dataForBreadCrumb={routes}
                                    userMenus={getUserMenusFromLocalStorage()}
                                    hasTab={route.hasTab}
                                    isOpen={LocalStorageSecurity.localStorageDecoder('isOpen')}
                                    isHover={LocalStorageSecurity.localStorageDecoder('isHover')}
                                    activeStateKey={route.path}
                                    mainViewComponent={
                                        route.hasTab ? (
                                            ComponentHoc(
                                                route.component,
                                                getUserMenusFromLocalStorage(),
                                                route.path,
                                                props
                                            )
                                        ) : (
                                            <route.component
                                                userMenus={getUserMenusFromLocalStorage()}
                                                path={route.path}
                                            />
                                        )
                                    }
                                />
                            ),
                            getTokenFormLocalStorage
                        )}
                    />
                ))}
                <Route path="/loading" component={CFullPageLoading}/>
                <Route key="pageNotFound" exact path="" component={CPageNotFound}/>
            </Switch>
        </>
    )
}

export default memo(AuthenticateModule)
