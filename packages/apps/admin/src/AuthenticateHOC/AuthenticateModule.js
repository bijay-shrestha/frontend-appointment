import React, {memo} from 'react'
import {Route, Switch} from 'react-router-dom'
import {AuthenticateHOC} from '@frontend-appointment/authentication-module'
import {CLayout} from '@frontend-appointment/ui-components'
import {routes} from '../routes'
import LoginPage from '../container/Login'
import {ComponentHoc, LoginHoc} from '@frontend-appointment/commons'
import SetPassword from '../container/SavePassword/SavePassword'
import {
  CFullPageLoading,
  CPageNotFound,
  CLoading
} from '@frontend-appointment/ui-elements'
import loadable from '@loadable/component'
import {
  EnvironmentVariableGetter,
  LocalStorageSecurity
} from '@frontend-appointment/helpers'

const ForgotPassword = loadable(
  () => import('../container/ForgotPassword/ForgotPassword'),
  {fallback: () => <CLoading />}
)

const VerifyToken = loadable(
  () => import('../container/CodeVerification/CodeVerification'),
  {fallback: () => <CLoading />}
)

const ChangePassword = loadable(
  () => import('../container/NewPassword/NewPassword'),
  {fallback: () => <CLoading />}
)
const AuthenticateModule = () => {
  const getTokenFormLocalStorage = async () => {
    let storage = await LocalStorageSecurity.localStorageDecoder(
      EnvironmentVariableGetter.AUTH_TOKEN
    )
    return storage;
  }

  const getUserMenusFromLocalStorage = () => {
    const userMenus = LocalStorageSecurity.localStorageDecoder('userMenus')
    return userMenus ? userMenus : []
  }

  return (
    <>
      <Switch>
        <Route path="/savePassword" component={SetPassword} />
        <Route
          path="/"
          exact
          component={LoginHoc(
            props => (
              <LoginPage {...props} id="login-form" />
            ),
            '/admin/dashboard'
          )}
        />
        <Route path="/forgotPassword" exact component={ForgotPassword} />
        <Route path="/verifyToken" exact component={VerifyToken} />
        <Route path="/changePassword" exact component={ChangePassword} />
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
                        {...props}
                        hasTab={route.hasTab}
                      />
                    )
                  }
                />
              ),
              getTokenFormLocalStorage
            )}
          />
        ))}
        <Route path="/loading" component={CFullPageLoading} />
        <Route key="pageNotFound" exact path="" component={CPageNotFound} />
      </Switch>
    </>
  )
}

export default memo(AuthenticateModule)
