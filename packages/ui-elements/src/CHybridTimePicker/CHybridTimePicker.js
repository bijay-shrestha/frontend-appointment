import React, {PureComponent, useRef} from 'react'
import {Form} from 'react-bootstrap'
import ReactDOM from 'react-dom'
import './hybrid-time.scss'
class CHybridTimePicker extends PureComponent {
  state = {
    errorMessage: '',
    isValid: ''
  }

  timePickerRef = useRef()
  fieldWrapperRef = useRef()
  fieldPlaceholderRef = useRef()

  // const toggleClassName = (ref, values) => {
  //   values.map(value => ReactDOM.findDOMNode(ref).classList.toggle(value))
  // }

  classAdditionWhenValueIsChanged = value => {
    const a = ReactDOM.findDOMNode(this.fieldWrapperRef).className
    if (!(value === 0 || value)) {
      if (a.includes('hasValue')) {
        const replaceString = a.replace(' hasValue', '')
        ReactDOM.findDOMNode(this.fieldWrapperRef).className = replaceString
      }
    } else {
      if (!a.includes('hasValue')) {
        ReactDOM.findDOMNode(this.fieldWrapperRef).className += ' hasValue'
      }
    }
  }

  setErrorMessagesAndValidity = (error, validity) => {
    this.setState({
      errorMessage: error,
      isValid: validity
    })
  }

  validateFieldAndToggleErrorClass = (patternOfFieldValue, value) => {
    let fieldWrapper = ReactDOM.findDOMNode(this.fieldWrapperRef).classList
    let isValid = patternOfFieldValue.test(value)
    if (!isValid && (value === 0 || value)) {
      fieldWrapper.add('errorInput')
      this.setErrorMessagesAndValidity(this.props.errorMessagePassed, false)
      return false
    } else {
      fieldWrapper.remove('errorInput')
      this.setErrorMessagesAndValidity('', true)
      return true
    }
  }

  handleOnChange = e => {
    let validity = ''
    this.classAdditionWhenValueIsChanged(e.target.value)
    if (this.props.hasValidation) {
      validity = this.validateFieldAndToggleErrorClass(
        this.props.fieldValuePattern,
        this.props.errorMessagePassed,
        e.target.value
      )
    }
    this.onChange(e, validity)
  }

  handleOnFocus = e => {
    const a = ReactDOM.findDOMNode(this.fieldWrapperRef).className
    if (!a.includes('myInput') && !this.state.errorMsg) {
      ReactDOM.findDOMNode(this.fieldWrapperRef).className += ' myInput'
    }
  }

  handleOnBlur = e => {
    const a = ReactDOM.findDOMNode(this.fieldWrapperRef).className
    const replaceString = a.replace('myInput', '')
    ReactDOM.findDOMNode(this.fieldWrapperRef).className = replaceString
  }

  handlePlaceholderClick = () => {
    this.timePickerRef.current.focus()
  }

  makeOptionsThroughDuration = () => {
    const {duration} = this.props
    let timeDuration = duration || 60

    let options = []
    for (let time = 0; time <= 24; time++) {
      let hours = time.toString()
      let minutes = '00'
      let durationInHours = (timeDuration / 60).toFixed(2)
      let splittedHours = durationInHours.split('.')
      hours = Number(hours) + Number(splittedHours[0])
      minutes = Number(minutes) + Number(splittedHours[1])
      hours =
        hours.toString().length < 1 ? '0' + hours.toString() : hours.toString()
      minutes =
        minutes.toString().length < 1
          ? '0' + minutes.toString()
          : minutes.toString()
      options.push(hours + ':' + minutes)
    }
    return options
  }

  componentDidMount () {
    this.makeOptionsThroughDuration()
  }

  render () {
    const {
      id,
      as,
      autoComplete,
      bsPrefix,
      children,
      className,
      defaultValue,
      disabled,
      name,
      onKeyDown,
      pattern,
      readOnly,
      required,
      rows,
      size,
      type,
      value,
      // handleOnChange,
      // duration,
      // errorMessagePassed,
      // hasValidation,
      isValid,
      onClick,
      placeholder,
      errorMsg
    } = this.props
    return (
      <div
        className="field-wrapper hinput"
        id={'fieldWrapper'.concat(id)}
        ref={this.fieldWrapperRef}
        onClick={onClick}
      >
        <Form.Control
          ref={this.timePickerRef}
          as={as}
          autoComplete={autoComplete}
          bsPrefix={bsPrefix}
          children={children}
          className={className}
          defaultValue={defaultValue}
          disabled={disabled}
          id={'fControl_'.concat(id)}
          isInvalid={isValid ? !isValid : isValid}
          isValid={isValid}
          maxLength={5}
          minLength={5}
          name={name}
          onBlur={this.handleOnBlur}
          onChange={this.handleOnChange}
          onFocus={this.handleOnFocus}
          onKeyDown={onKeyDown}
          pattern={pattern}
          readOnly={readOnly}
          required={required}
          rows={rows}
          size={size}
          type={type}
          value={value}
        />
        <div
          className="field-placeholder"
          ref={this.fieldPlaceholderRef}
          onClick={this.handlePlaceholderClick}
        >
          <span>{placeholder ? placeholder : 'Enter Value'}</span>
        </div>
        <Form.Control.Feedback type="invalid" className="err-message">
          {errorMsg ? errorMsg : this.state.errorMessage}
        </Form.Control.Feedback>
      </div>
    )
  }
}
export default CHybridTimePicker
