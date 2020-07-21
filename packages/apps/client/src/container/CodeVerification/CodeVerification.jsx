import React, {PureComponent} from 'react'
import {CCodeVerification} from '@frontend-appointment/ui-components'
import {CAlert} from '@frontend-appointment/ui-elements'
import {ConnectHoc} from '@frontend-appointment/commons'
import {ForgotPasswordMiddleware} from '@frontend-appointment/thunk-middleware'
import {CommonAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {LocalStorageSecurity} from '@frontend-appointment/helpers'
import{MdDone} from 'react-icons/md';

const {codeVerification} = ForgotPasswordMiddleware
const {ForgotPasswordAndVerification} = CommonAPIConstants
const {localStorageEncoder} = LocalStorageSecurity

class CodeVerification extends PureComponent {
    state = {
        code: '',
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
            await this.props.codeVerification(ForgotPasswordAndVerification.CODE_VERIFICATION, {
                resetCode: this.state.code
            })
            localStorageEncoder("verificationToken", this.state.code);
            this.props.history.push("/changePassword");
        } catch (e) {
            this.setState({
                alertMessageInfo: {
                    variant: 'danger',
                    message: this.props.VerificationCodeReducer.message
                },
                showAlert: true
            })
            this.closeAlertAfterCertainInterval()
        }
    }

    componentWillUnmount() {
        this.intervalAlertClear && clearTimeout(this.intervalAlertClear)
    }

    render() {
        const {code, isValid, alertMessageInfo, showAlert} = this.state
        const {status} = this.props.VerificationCodeReducer
        return (
            <>
                <CCodeVerification
                    codeVerificationData={{code}}
                    onChangeHandler={this.onChangeHandler}
                    isValid={isValid}
                    onSubmitFormHandler={this.onSubmitFormHandler}
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
                                <MdDone/>
                            </>
                        ) : (
                            <>
                                <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                            </>
                        )
                    }
                    message={alertMessageInfo.message}
                />
            </>
        )
    }
}

export default ConnectHoc(CodeVerification, ['VerificationCodeReducer'], {
    codeVerification
})
