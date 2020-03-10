import React, {PureComponent} from 'react'
import {CCodeVerification} from '@frontend-appointment/ui-components'
import {CAlert} from '@frontend-appointment/ui-elements'
import {ConnectHoc} from '@frontend-appointment/commons'
import {changePassword} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import * as Material from 'react-icons/md';

const {adminSetupAPIConstants} = AdminModuleAPIConstants
class NewPassword extends PureComponent {
  state = {
    password: '',
    confirmPassword:'',
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

  onSubmitFormHandler = async event => {
    try {
      await this.props.changePassword(ForgotPasswordAndVerification.code, {
        code: this.state.code
      })
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
    const {code, isValid, alertMessageInfo,showAlert} = this.state
    return (
      <>
        <CCodeVerification
          codeVerificationData={{code}}
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
    changePassword
})
