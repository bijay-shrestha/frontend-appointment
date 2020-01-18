import React, {memo} from 'react'
import {Route, Switch} from 'react-router-dom'
import {AuthenticateHOC} from '@frontend-appointment/authentication-module'
import {
  CFullPageLoading,
  CLayout,
  CPageNotFound
} from '@frontend-appointment/ui-components'
import {routes} from '../routes'
import Cookies from 'js-cookie'
import LoginPage from '../container/Login'
import {LoginHoc, ComponentHoc} from '@frontend-appointment/commons'

const AuthenticateModule = () => {
  const getTokenFormLocalStorage = () => {
    let cookie = Cookies.get('XSRF-TOKEN')
    return Cookies.get('XSRF-TOKEN', {
      domain: process.env.REACT_APP_DOMAIN_NAME
    })
      ? true
      : false
    // return true;
  }

  const getUserMenusFromLocalStorage = () => {
    const userMenus = localStorage.getItem('userMenus')
    return userMenus ? userMenus : []
  }

  return (
    <>
      <Switch>
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
        <Route
          path="/"
          exact
          component={props => <LoginPage {...props} id="login-form" />}
        />
        <Route path="/loading" component={CFullPageLoading} />
        <Route key="pageNotFound" exact path="" component={CPageNotFound} />
      </Switch>
    </>
  )
}

export default memo(AuthenticateModule)
