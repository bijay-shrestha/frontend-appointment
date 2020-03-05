import React, {PureComponent} from 'react'
import {CForgotPassword} from '@frontend-appointment/ui-components'
class ForgotPassword extends PureComponent {
  state = {
    username: '',
    isValid: false
  }

  checkFormValid = (name, value) => {
    const {username} = this.state
    const isValidTrue = username.length
    this.setState({
      isValid: isValidTrue || false,
      [name]: value
    })
  }

  onChangeHandler = event => {
    const {name, value} = event.target
    this.checkFormValid(name, value)
  }

  onSubmitFormHandler = event => {
      try{

      }catch(e){
          console.log(e);
      }
  }

  render () {
    const {username, isValid} = this.state
    return (
      <>
        <CForgotPassword
          passwordForgotData={{username}}
          onChangeHandler={this.onChangeHandler}
          isValid={isValid}
          onSubmitFormHandler={this.onSubmitFormHandler}
        />
      </>
    )
  }
}
export default ForgotPassword
