import React, {PureComponent} from 'react'
import {Form} from 'react-bootstrap'
import ReactDOM from 'react-dom'
import './hybrid-time.scss'
class CHybridTimePicker extends PureComponent {
  state = {
    errorMessage: '',
    isValid: '',
    options: []
  }

  timePickerRef = React.createRef()
  fieldWrapperRef = React.createRef()
  fieldPlaceholderRef = React.createRef()

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
    const a = ReactDOM.findDOMNode(this.fieldWrapperRef.current)
    console.log('hello',a)
     a= a.className

    if (!a.includes('myInput') && !this.state.errorMsg) {
      ReactDOM.findDOMNode(this.fieldWrapperRef.current).className += ' myInput'
    }
  }

  handleOnBlur = e => {
    const a = ReactDOM.findDOMNode(this.fieldWrapperRef).className
    const replaceString = a.replace('myInput', '')
    ReactDOM.findDOMNode(this.fieldWrapperRef).className = replaceString
  }

  handlePlaceholderClick = () => {
    console.log('+++++++this.timePickerRef.current',this.timePickerRef)
    // this.timePickerRef.current.focus()
  }

  checkDurationIsGreaterThan1hours = (duration, hour) => {
    let hours = hour
    let minutes = duration
    let newLoopTime = minutes
    while (newLoopTime >= 59) {
      if (newLoopTime >= 59) {
        hours = hours + 1
        newLoopTime = newLoopTime - 60
      }
      if (newLoopTime < 60) {
        minutes = newLoopTime
        break
      }
    }
    return {
      hours: hours,
      minutes: minutes
    }
  }
  makeOptionsThroughDuration = () => {
    const {duration} = this.props
    let timeDuration = duration || 1
    let hours = 0
    let minutes = duration
    let modHours = this.checkDurationIsGreaterThan1hours(timeDuration, hours)
    hours = modHours.hours
    minutes = modHours.minutes
    let options = []
    options.push('00:00')
    for (let time = 0; time <= 3600; time++) {
      let splittedOption = options[time].split(':')
      let appHours = splittedOption[0]
      let appMinutes = splittedOption[1]
      appHours = Number(appHours) + Number(hours)
      appMinutes = Number(appMinutes) + Number(minutes)
      let newModTime = this.checkDurationIsGreaterThan1hours(
        appMinutes,
        appHours
      )
      appHours = newModTime.hours
      appMinutes = newModTime.minutes
      appHours =
        appHours.toString().length <= 1
          ? '0' + appHours.toString()
          : appHours.toString()
      appMinutes =
        appMinutes.toString().length <= 1
          ? '0' + appMinutes.toString()
          : appMinutes.toString()
      if (
        (Number(appHours) <= 23 && Number(appMinutes) <= 59) ||
        (appHours === '24' && appMinutes === '00')
      )
        options.push(appHours + ':' + appMinutes)
      else break
    }
    this.setState({options: options})
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
          // onBlur={this.handleOnBlur}
          // onChange={this.handleOnChange}
          // onFocus={this.handleOnFocus}
          // onKeyDown={onKeyDown}
          autocomplete={'off'}
          pattern={pattern}
          readOnly={readOnly}
          required={required}
          rows={rows}
          size={size}
          type={type}
          value={value}
          list={'list' + id}
        />
        <>
          <datalist id={'list' + id}>
            {this.state.options.map((opt, i) => {
            return <option value={opt} label={opt}>{opt.replace(":",'')}</option>
            })}
          </datalist>
        </>
        <>
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
        </>
      </div>
    )
  }
}
export default CHybridTimePicker
