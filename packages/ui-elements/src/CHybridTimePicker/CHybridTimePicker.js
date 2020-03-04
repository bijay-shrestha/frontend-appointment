import React, {PureComponent} from 'react'
import {Form} from 'react-bootstrap'
import ReactDOM, {render} from 'react-dom'
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
    const a = ReactDOM.findDOMNode(fieldWrapperRef).className
    if (!(value === 0 || value)) {
      if (a.includes('hasValue')) {
        const replaceString = a.replace(' hasValue', '')
        ReactDOM.findDOMNode(fieldWrapperRef).className = replaceString
      }
    } else {
      if (!a.includes('hasValue')) {
        ReactDOM.findDOMNode(fieldWrapperRef).className += ' hasValue'
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
    let fieldWrapper = ReactDOM.findDOMNode(fieldWrapperRef).classList
    let isValid = patternOfFieldValue.test(value)
    if (!isValid && (value === 0 || value)) {
      fieldWrapper.add('errorInput')
      setErrorMessagesAndValidity(props.errorMessagePassed, false)
      return false
    } else {
      fieldWrapper.remove('errorInput')
      setErrorMessagesAndValidity('', true)
      return true
    }
  }

  handleOnChange = e => {
    let validity = ''
    classAdditionWhenValueIsChanged(e.target.value)
    if (hasValidation) {
      validity = validateFieldAndToggleErrorClass(
        fieldValuePattern,
        errorMessagePassed,
        e.target.value
      )
    }
    onChange(e, validity)
  }

  handleOnFocus = e => {
    const a = ReactDOM.findDOMNode(fieldWrapperRef).className
    if (!a.includes('myInput') && !this.state.errorMsg) {
      ReactDOM.findDOMNode(fieldWrapperRef).className += ' myInput'
    }
  }

  handleOnBlur = e => {
    const a = ReactDOM.findDOMNode(fieldWrapperRef).className
    const replaceString = a.replace('myInput', '')
    ReactDOM.findDOMNode(fieldWrapperRef).className = replaceString
  }

  handlePlaceholderClick = () => {
    timePickerRef.current.focus()
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
      onChange,
      duration,
      fieldValuePattern,
      errorMessagePassed,
      hasValidation,
      onClick,
      placeholder,
      errorMsg
    } = props
    return (
      <div
        className="field-wrapper hinput"
        id={'fieldWrapper'.concat(id)}
        ref={fieldWrapperRef}
        onClick={onClick}
      >
        <Form.Control
          ref={timePickerRef}
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
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
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
          ref={fieldPlaceholderRef}
          onClick={handlePlaceholderClick}
        >
          <span>{placeholder ? placeholder : 'Enter Value'}</span>
        </div>
        <Form.Control.Feedback type="invalid" className="err-message">
          {errorMsg ? errorMsg : errorMessage}
        </Form.Control.Feedback>
      </div>
    )
  }
}
export default CHybridTimePicker
