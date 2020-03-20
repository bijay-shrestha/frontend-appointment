import React, {PureComponent} from 'react'
import {CChangePasswordInForget} from '@frontend-appointment/ui-components'
import {CAlert} from '@frontend-appointment/ui-elements'
import {ConnectHoc} from '@frontend-appointment/commons'
import {ForgotPasswordMiddleware} from '@frontend-appointment/thunk-middleware'
import {CommonAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {LocalStorageSecurity} from '@frontend-appointment/helpers'
import * as Material from 'react-icons/md'

const {ForgotPasswordAndVerification} = CommonAPIConstants
const {localStorageDecoder, localStorageRemover} = LocalStorageSecurity
const {changePasswordVerification} = ForgotPasswordMiddleware
class NewPassword extends PureComponent {
  state = {
    password: '',
    confirmPassword:'',
    verificationToken: localStorageDecoder('verificationToken'),
    username: localStorageDecoder('forgotPasswordUsername') || '',
    isValid: false,
    alertMessageInfo: {
      variant: '',
      message: ''
    },
    errorMessage:'',
    showAlert: false
  }
  intervalAlertClear

  checkFormValid = async (name, value) => {
    await this.setState({
      [name]: value
    })
    const {username, password, verificationToken,confirmPassword} = this.state
    const isValidTrue =
      username.length && password.length && verificationToken.length && confirmPassword.length
    let errorMessage= '';
    if(password!==confirmPassword)
      errorMessage='Password Donot Match'
      this.setState({
      isValid: isValidTrue || false,
      errorMessage:errorMessage
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
      await this.props.changePasswordVerification(ForgotPasswordAndVerification.FORGOT_CHANGE_PASSWORD, {
        username,
        password,
        verificationToken
      })
      localStorageRemover()
      this.props.history.push('/')
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
      confirmPassword,
      isValid,
      alertMessageInfo,
      showAlert,
      errorMessage
    } = this.state
    return (
      <>
        <CChangePasswordInForget
          passwordChangeData={{password, username,confirmPassword}}
          onChangeHandler={this.onChangeHandler}
          isValid={isValid}
          onSubmitFormHandler={this.onSubmitFormHandler}
          errorMessage={errorMessage}
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
