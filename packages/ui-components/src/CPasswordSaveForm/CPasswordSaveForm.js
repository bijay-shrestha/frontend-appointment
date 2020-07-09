
import React, {PureComponent} from 'react'
import {Button} from 'react-bootstrap'
import {CHybridPassword, CHybridTextArea} from "@frontend-appointment/ui-elements";

class CPasswordSaveForm extends PureComponent {
    state = {
        userPassword: {password: '', confirmPassword: '', remarks: ''},
        errorMsg: {
            password: '',
            confirmPassword: '',
            passwordValid: true,
            confirmPasswordValid: true,
            remarks: '',
            remarksValid: true
        },
        formValid: true,
        submitErrorMsg: ''
    };

    setTheState = (name, value) => {
        let other = true;
        let userPassword = {...this.state.userPassword};
        if (Object.keys(userPassword).includes(name)) {
            userPassword[name] = value;
            other = false
        }
        !other
            ? this.setState(prevState => ({
                userPassword
            }))
            : this.setState(prevState => ({
                [name]: value
            }))
    };

    onChangeHandler = e => {
        const {name, value} = e.target;
        this.setTheState(name, value);
        let errorMsg = {
            password: '',
            confirmPassword: '',
            passwordValid: true,
            confirmPasswordValid: true,
            remarks: '',
            remarksValid: true
        };
        if (name === 'confirmPassword' && !value.match(this.state.userPassword.password)) {
            errorMsg[name] = `PASSWORD doesn't match!`;
            errorMsg[name.concat('Valid')] = false;
        }
        this.setTheState('errorMsg', errorMsg);
    };

    checkFormSubmitIsValid = () => {
        let errorMsg = {password: '', confirmPassword: '', passwordValid: true, confirmPasswordValid: true,};
        let formValid = true;
        Object.keys(this.state['userPassword']).map((field, i) => {
            if (!Object.values(this.state['userPassword'])[i]) {
                // IF FIELD VALUE IS EMPTY
                if (field !== 'remarks' || (field === 'remarks' && this.props.showRemarksField)) {
                    errorMsg[field] = `${field.toUpperCase()} should not be empty`;
                    errorMsg[field.concat('Valid')] = false;
                    formValid = false;
                }
            } else {
                //const patt = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                const value = Object.values(this.state['userPassword'])[i];
                if (field === 'password' && value.length <= 4) {
                    errorMsg[field] = `${field.toUpperCase()} length should be equal or greater than 6`;
                    errorMsg[field.concat('Valid')] = false;
                    formValid = false;

                } else if (field === 'confirmPassword' && !value.match(this.state.userPassword.password)) {
                    errorMsg[field] = `PASSWORD doesn't match!`;
                    errorMsg[field.concat('Valid')] = false;
                    formValid = false;
                }
            }
            return ''
        });
        this.setTheState('errorMsg', errorMsg);
        return formValid;
    };

    setErrorMessage = submitErrorMsg => {
        submitErrorMsg && this.setState({submitErrorMsg})
    };

    onSubmitFormHandler = async e => {
        e.preventDefault();
        this.setState({submitErrorMsg: ''});
        let isFormValid = this.checkFormSubmitIsValid();
        let submitErrorMsg = '';
        if (isFormValid) {
            submitErrorMsg = await this.props.onSubmitHandler(this.state.userPassword);
            if (submitErrorMsg)
                this.setErrorMessage(submitErrorMsg);
        }
    };

    render() {
        const {userPassword, errorMsg, submitErrorMsg} = this.state;

        return (
            <>
                <p className="login-page-title">Create New Password</p>
                <CHybridPassword
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={userPassword.password}
                    isInvalid={!errorMsg.passwordValid}
                    errorMsg={errorMsg.password}
                    onChange={this.onChangeHandler}
                    avoidDefaultValidation={false}
                />

                <CHybridPassword
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={userPassword.confirmPassword}
                    isInvalid={!errorMsg.confirmPasswordValid}
                    onChange={this.onChangeHandler}
                    errorMsg={errorMsg.confirmPassword}
                    avoidDefaultValidation={true}
                />

                {this.props.showRemarksField ?
                    <CHybridTextArea
                        id="remarks"
                        name="remarks"
                        onChange={this.onChangeHandler}
                        placeholder="Remarks"
                        value={userPassword.remarks}
                        max={200}
                        required={true}
                        isInvalid={!errorMsg.remarksValid}
                        errorMsg={errorMsg.remarks}
                    /> : ''
                }

                <p className="error">{submitErrorMsg ? submitErrorMsg : this.props.errorMessage}</p>
                <div className="password-requirement">
                    <p>Password Requirements</p>
                    <ul>
                        <li>Must be a minimum of 5 characters</li>
                        <li>Password must match</li>
                    </ul>
                </div>

                <Button
                    variant="primary"
                    className="btn-action float-right"
                    type="submit"
                    disabled={this.props.isLoading}
                    onClick={this.onSubmitFormHandler}>
                    {this.props.isLoading ?
                        <span className="saving">Saving Password<img
                            alt="three-dots" src={require("../img/three-dots.svg")}/></span> :
                        "Save Password"
                    }
                </Button>
            </>
        )
    }
}

export default CPasswordSaveForm;
