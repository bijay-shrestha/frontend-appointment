import React, {PureComponent} from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  ComponentHoc,
  SingleTabComponentHOC,
  NoRoleTabComponentHOC
} from '@frontend-appointment/commons'
import {
  LocalStorageSecurity,
  CommonUtils,
  EnvironmentVariableGetter
} from '@frontend-appointment/helpers'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  DashboardDetailsMiddleware,
  fetchLoggedInAdminUserInfo,
  fetchUserMenusNew,
  signinUser
} from '@frontend-appointment/thunk-middleware'
import {CLoading, CUnauthorized} from '@frontend-appointment/ui-elements'
import localStorageSecurity from '@frontend-appointment/helpers/src/utils/localStorageUtils'
const {fetchDashboardFeaturesByAdmin} = DashboardDetailsMiddleware
const {DASHBOARD_FEATURE} = AdminModuleAPIConstants.DashboardApiConstant
const {
  GET_LOGGED_IN_ADMIN_INFO,
  GET_SIDEBAR_DATA
} = AdminModuleAPIConstants.initialApiConstantsOfAdmin

class StartupApiHoc extends PureComponent {
  state = {
    fetch: false,
    loading: true
  }
  startUpApiCall = async () => {
    const auth_token = EnvironmentVariableGetter.AUTH_TOKEN
    try {
      const user = await CommonUtils.getUserNameHospitalIdAndAdminId(
        LocalStorageSecurity.localStorageDecoder(auth_token)
      )
      if (!localStorageSecurity.localStorageDecoder('userMenus')) {
        await this.props.fetchUserMenusNew(GET_SIDEBAR_DATA, {
          username: user.username,
          hospitalCode: user.hospitalCode
        })
        this.setState({fetch: true, loading: false})
      }
      if (!localStorageSecurity.localStorageDecoder('adminInfo')) {
        await this.props.fetchLoggedInAdminUserInfo(GET_LOGGED_IN_ADMIN_INFO, {
          username: user.username,
          hospitalCode: user.hospitalCode
        })
      }
      if (!localStorageSecurity.localStorageDecoder('adminDashRole')) {
        const featuresAdmin = await this.props.fetchDashboardFeaturesByAdmin(
          DASHBOARD_FEATURE,
          user.id
        )
        LocalStorageSecurity.localStorageEncoder(
          'adminDashRole',
          featuresAdmin.data
        )
      }
    } catch (e) {
      if (!this.getUserMenusFromLocalStorage().length)
        this.setState({fetch: false, loading: false})
    }
  }

  getUserMenusFromLocalStorage = () => {
    const userMenus = LocalStorageSecurity.localStorageDecoder('userMenus')
    return userMenus ? userMenus : []
  }

  async componentDidMount () {
    await this.startUpApiCall()
  }
  render () {
    const {fetch, loading} = this.state
    const {ComposedComponent, otherProps, layoutProps} = this.props
    const {component, activeStateKey, hasTab, isSingleTab} = otherProps
    let userMenus = this.getUserMenusFromLocalStorage()
    return userMenus.length ? (
      <ComposedComponent
        {...otherProps}
        {...layoutProps}
        userMenus={userMenus}
        MainViewComponent={
          hasTab
            ? ComponentHoc(component, userMenus, activeStateKey, {
                ...layoutProps
              })
            : isSingleTab
            ? SingleTabComponentHOC(component, userMenus, activeStateKey, {
                ...layoutProps
              })
            : NoRoleTabComponentHOC(component, userMenus, activeStateKey, {
                ...layoutProps
              })
        }
      />
    ) : !loading && !fetch ? (
      <ComposedComponent
        {...otherProps}
        {...layoutProps}
        userMenus={userMenus}
        MainViewComponent={CUnauthorized}
      />
    ) : (
      <ComposedComponent
        {...otherProps}
        {...layoutProps}
        userMenus={userMenus}
        MainViewComponent={CLoading}
      />
    )
  }
}
export default ConnectHoc(StartupApiHoc, [], {
  fetchUserMenusNew,
  signinUser,
  fetchLoggedInAdminUserInfo,
  fetchDashboardFeaturesByAdmin
})
