import {
  fetchLoggedInAdminUserInfo,
  fetchUserMenus,
  signinUser,
  DashboardDetailsMiddleware
} from '@frontend-appointment/thunk-middleware'
import {Login} from '@frontend-appointment/ui-components'
import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {LocalStorageSecurity} from '@frontend-appointment/helpers'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
const {fetchDashboardFeaturesByAdmin} = DashboardDetailsMiddleware
const {DASHBOARD_FEATURE} = AdminModuleAPIConstants.DashboardApiConstant
class LoginPage extends React.PureComponent {
  onSubmitHandler = async user => {
    try {
      await this.props.signinUser('/api/v1/login', {...user})
      await this.props.fetchUserMenus('/api/v1/sidebar', {
        username: user.username
      })
      const userMenus = await this.props.fetchLoggedInAdminUserInfo(
        '/api/v1/admin/info',
        {
          username: user.username,
          subDepartmentCode: process.env.REACT_APP_SUB_DEPARTMENT_CODE
        }
      )
      // const featuresAdmin = await this.props.fetchDashboardFeaturesByAdmin(
      //   DASHBOARD_FEATURE,
      //   userMenus.adminId
      // )
      // LocalStorageSecurity.localStorageEncoder('adminDashRole', featuresAdmin)
      const selectedPath = LocalStorageSecurity.localStorageDecoder('active')
      const pathToRedirect = selectedPath
        ? '/admin' + selectedPath.replace('true', '')
        : '/admin/dashboard'
      await this.props.history.push(pathToRedirect)
      return null
    } catch (e) {
      console.log(e)
      const err = e.errorMessage
        ? e.errorMessage
        : 'Sorry Server Could not process data'
      return err
    }
  }
  componentDidMount () {
    document.title = 'Cogent-Appointment-Admin'
  }
  render () {
    return <Login {...this.props} onSubmitHandler={this.onSubmitHandler} />
  }
}

//Mapping the thunkActions to Dispatcher to props
export default ConnectHoc(
  LoginPage,
  ['loginReducers', 'userMenuReducers', 'DashboardFeaturesByAdminReducer'],
  {
    fetchUserMenus,
    signinUser,
    fetchLoggedInAdminUserInfo,
    fetchDashboardFeaturesByAdmin
  }
)
