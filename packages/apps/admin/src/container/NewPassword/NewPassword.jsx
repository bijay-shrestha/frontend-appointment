import React, {PureComponent} from 'react'
import {CChangePasswordInForget} from '@frontend-appointment/ui-components'
import {CAlert} from '@frontend-appointment/ui-elements'
import {ConnectHoc} from '@frontend-appointment/commons'
import {ForgotPasswordMiddleware} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {LocalStorageSecurity} from '@frontend-appointment/helpers'
import * as Material from 'react-icons/md'

const {adminSetupAPIConstants} = AdminModuleAPIConstants
const {localStorageDecoder, localStorageRemover} = LocalStorageSecurity
const {changePasswordVerification} = ForgotPasswordMiddleware
class NewPassword extends PureComponent {
  state = {
    password: '',
    verificationToken: localStorageDecoder('verificationToken'),
    username: localStorageDecoder('forgotPasswordUsername') || '',
    isValid: false,
    alertMessageInfo: {
      variant: '',
      message: ''
    },
    showAlert: false
  }
  intervalAlertClear

  checkFormValid = async (name, value) => {
    await this.setState({
      [name]: value
    })
    const {username, password, verificationToken} = this.state
    const isValidTrue =
      username.length && password.length && verificationToken.length
    this.setState({
      isValid: isValidTrue || false
    })
  }

  closeAlert = () => {
    this.setState({
      showAlert: false
    })
  }

  onChangeHandler = event => {
    const {name, value} = event.target
    this.checkFormValid(name, value)
  }

  closeAlertAfterCertainInterval = () => {
    this.intervalAlertClear = setTimeout(this.closeAlert, 4000)
  }

  onSubmitFormHandler = async event => {
    const {username, password, verificationToken} = this.state
    try {
      await this.props.changePassword(adminSetupAPIConstants.CHANGE_PASSWORD, {
        username,
        password,
        verificationToken
      })
      localStorageRemover()
      this.props.history.push('/login')
    } catch (e) {
      this.setState({
        alertMessageInfo: {
          variant: 'danger',
          message: e.errorMessage
        },
        showAlert: true
      })
      this.closeAlertAfterCertainInterval()
    }
  }

  componentWillUnmount () {
    this.intervalAlertClear && clearTimeout(this.intervalAlertClear)
  }

  render () {
    const {
      password,
      username,
      isValid,
      alertMessageInfo,
      showAlert
    } = this.state
    return (
      <>
        <CChangePasswordInForget
          passwordChangeData={{password, username}}
          onChangeHandler={this.onChangeHandler}
          isValid={isValid}
          onSubmitFormHandler={this.onSubmitFormHandler}
        />
        <CAlert
          id="profile-manage"
          variant={alertMessageInfo.variant}
          show={showAlert}
          onClose={this.closeAlert}
          alertType={
            alertMessageInfo.variant === 'success' ? (
              <>
                <Material.MdDone />
              </>
            ) : (
              <>
                <i className="fa fa-exclamation-triangle" aria-hidden="true" />
              </>
            )
          }
          message={alertMessageInfo.message}
        />
      </>
    )
  }
}
export default ConnectHoc(NewPassword, [], {
  changePasswordVerification
})
