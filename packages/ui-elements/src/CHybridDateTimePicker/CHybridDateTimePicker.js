import React, {useState, useRef} from 'React'
import ReactDOM from 'react-dom'
const CHybridDateTimePicker = props => {
  const timePickerRef = useRef()
  const fieldWrapperRef = useRef()
  const fieldPlaceholderRef = userRef()
  const [errorMessage, setErrorMessage] = useState('')
  const [isValid, setValid] = useState('')

  const toggleClassName = (ref, values) => {
    values.map(value => ReactDOM.findDOMNode(ref).classList.toggle(value))
  }

  const classAdditionWhenValueIsChanged = value => {
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

  const setErrorMessagesAndValidity = (error, validity) => {
    setErrorMessage(error)
    setValid(validity)
  }

  validateFieldAndToggleErrorClass = (
    patternOfFieldValue,
    errorMessageToDisplay,
    value
  ) => {
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
    if (this.props.hasValidation) {
      validity = this.validateFieldAndToggleErrorClass(
        props.fieldValuePattern,
        rops.errorMessagePassed,
        e.target.value
      )
    }
    props.onChange(e, validity)
  }

  handleOnFocus = e => {
    const a = ReactDOM.findDOMNode(fieldWrapperRef).className
    if (!a.includes('myInput') && !this.state.errorMsg) {
      ReactDOM.findDOMNode(fieldWrapperRef).className += ' myInput'
    }
  }

  handleOnBlur = e => {
    const a = ReactDOM.findDOMNode(fieldWrapper).className
    const replaceString = a.replace(' myInput', '')
    ReactDOM.findDOMNode(fieldWrapper).className = replaceString
  }

  handlePlaceholderClick = () => {
    timePickerRef.current.focus()
  }

  return (
    <div
      className="field-wrapper hinput"
      id={'fieldWrapper'.concat(id)}
      ref={fieldWrapperRef}
      onClick={onClick}
    >
      <Form.Control
        _ref={_ref}
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
        minLenght={5}
        name={name}
        onBlur={this.handleOnBlur}
        onChange={this.handleOnChange}
        onFocus={this.handleOnFocus}
        // onClick={onClick}
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
        onClick={this.handlePlaceholderClick}
      >
        <span>{placeholder ? placeholder : 'Enter Value'}</span>
      </div>
      <Form.Control.Feedback type="invalid" className="err-message">
        {errorMsg ? errorMsg : errorMessage}
      </Form.Control.Feedback>
    </div>
  )
}
