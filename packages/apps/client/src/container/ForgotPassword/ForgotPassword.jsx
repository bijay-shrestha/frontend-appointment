import React, {PureComponent} from 'react'
import {CForgotPassword} from '@frontend-appointment/ui-components'
import {CAlert, CHybridInput} from '@frontend-appointment/ui-elements'
import {ConnectHoc} from '@frontend-appointment/commons'
import {ForgotPasswordMiddleware} from '@frontend-appointment/thunk-middleware'
import * as Material from 'react-icons/md'
import {CommonAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {LocalStorageSecurity} from '@frontend-appointment/helpers'
const {forgotPassword} = ForgotPasswordMiddleware
const {ForgotPasswordAndVerification} = CommonAPIConstants
const {localStorageEncoder} = LocalStorageSecurity
class ForgotPassword extends PureComponent {
  state = {
    username: '',
    hospitalCode: '',
    isValid: false,
    alertMessageInfo: {
      variant: '',
      message: ''
    },
    showAlert: false
  }
  intervalAlertClear

  checkFormValid = (name, value) => {
    const isValidTrue = value.length
    this.setState({
      isValid: isValidTrue || false,
      [name]: value
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

  onSubmitFormHandler = async () => {
    try {
      await this.props.forgotPassword(
        ForgotPasswordAndVerification.FORGOT_PASSWORD,
        {username: this.state.username, hospitalCode: this.state.hospitalCode}
      )
      localStorageEncoder('forgotPasswordUsername', this.state.username)
      localStorageEncoder('hospitalCode', this.state.hospitalCode)
      this.props.history.push('/verifyToken')
    } catch (e) {
      this.setState({
        alertMessageInfo: {
          variant: 'danger',
          message: this.props.ForgotPasswordReducer.message
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
      username,
      isValid,
      alertMessageInfo,
      showAlert,
      hospitalCode
    } = this.state
    const {status} =this.props.ForgotPasswordReducer
    return (
      <>
        <CForgotPassword
          passwordForgotData={{username, hospitalCode}}
          onChangeHandler={this.onChangeHandler}
          isValid={isValid}
          onSubmitFormHandler={this.onSubmitFormHandler}
          forClient={true}
          status={status}
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
export default ConnectHoc(ForgotPassword, ['ForgotPasswordReducer'], {
  forgotPassword
})
