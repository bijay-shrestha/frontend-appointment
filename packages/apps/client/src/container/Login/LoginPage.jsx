import {
  DashboardDetailsMiddleware,
  fetchLoggedInAdminUserInfo,
  fetchUserMenus,
  signinUser,
  fetchLoggedInAdminIP
} from '@frontend-appointment/thunk-middleware'
import {ClientLogin} from '@frontend-appointment/ui-components'
import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {LocalStorageSecurity} from '@frontend-appointment/helpers'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'

const {fetchDashboardFeaturesByAdmin} = DashboardDetailsMiddleware
const {DASHBOARD_FEATURE} = AdminModuleAPIConstants.DashboardApiConstant
const {
  LOGIN_API,
  GET_SIDEBAR_DATA,
  GET_LOGGED_IN_ADMIN_INFO_CLIENT
} = AdminModuleAPIConstants.initialApiConstantsOfAdmin

class LoginPage extends React.PureComponent {
  state = {
    isLoginPending: false
  }

  onSubmitHandler = async user => {
    await this.handleIsLoginPending(true)
    try {
      await this.props.signinUser(LOGIN_API, {...user})

      await this.props.fetchUserMenus(GET_SIDEBAR_DATA, {
        email: user.email
      })

      const userMenus = await this.props.fetchLoggedInAdminUserInfo(
        GET_LOGGED_IN_ADMIN_INFO_CLIENT,
        {
          email: user.email
        }
      )
      if(userMenus){
      LocalStorageSecurity.localStorageEncoder(
        'isOpen',
        userMenus.isSideBarCollapse === 'Y' ||
          userMenus.isSideBarCollapse === null
          ? false
          : true
      )
      }
      const featuresAdmin = await this.props.fetchDashboardFeaturesByAdmin(
        DASHBOARD_FEATURE,
        userMenus.adminId
      )
      LocalStorageSecurity.localStorageEncoder(
        'adminDashRole',
        featuresAdmin.data
      )

      const selectedPath = LocalStorageSecurity.localStorageDecoder('active')

      const pathToRedirect = selectedPath
        ? '' + selectedPath.replace('true', '')
        : '/dashboard'
      await this.props.history.push(pathToRedirect)
      this.handleIsLoginPending(false)
      return null
    } catch (e) {
      // console.log(e)
      const err = e.errorMessage
        ? e.errorMessage
        : 'Sorry Server Could not process data'
      this.handleIsLoginPending(false)
      return err
    }
  }

  handleIsLoginPending = async val => {
    await this.setState({
      isLoginPending: val
    })
  }

  async componentDidMount () {
    // const clientIp = await this.props.fetchLoggedInAdminIP()
    // await LocalStorageSecurity.localStorageEncoder('clientIp', clientIp)
     document.title = 'Cogent-Appointment-Client'
    document.getElementById('favIcon').href=process.env.PUBLIC_URL+"logo-small-blue.png"
  }

  render () {
    return (
      <ClientLogin
        {...this.props}
        onSubmitHandler={this.onSubmitHandler}
        isLoginPending={this.state.isLoginPending}
      />
    )
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
    fetchDashboardFeaturesByAdmin,
    fetchLoggedInAdminIP
  }
)
