import React, {PureComponent} from 'react'
import Select from 'react-select'
import {Form} from 'react-bootstrap'
import './hybrid-time.scss'
import ReactDOM from 'react-dom'
import moment from 'moment'

class CHybridTimePicker extends PureComponent {
    checkAndValidateValue = objValue => {
        let value, label
        if (objValue.value) {
            value = objValue.value
            label = objValue.label
        }
        if (
            value &&
            Object.prototype.toString.call(value) === '[object Date]' &&
            !isNaN(value)
        ) {
            return this.convertDateToString(objValue)
        }
        if (value && typeof value === 'string') {
            return objValue
        }
        if (value && typeof value === 'number') {
            return this.convertDateToString({value: new Date(value), label: label})
        }
        if (
            !value &&
            Object.prototype.toString.call(objValue) === '[object Date]' &&
            !isNaN(objValue)
        ) {
            return this.convertDateToString({value: objValue, label: ''})
        }

        if (!value && !objValue) {
            return null;
        }
    }

    convertDateToString = date => {
        const {value} = date
        let hours = value.getHours()
        let minutes = value.getMinutes()
        hours = hours.toString().length <= 1 ? '0' + hours : hours
        minutes = minutes.toString().length <= 1 ? '0' + minutes : minutes
        return {value: `${hours}:${minutes}`, label: `${hours}:${minutes}`}
    }

    state = {
        errorMessage: '',
        isValid: '',
        options: [],
        pickedTime: this.props.value
            ? this.checkAndValidateValue(new Date(this.props.value))
            : 0,
        inputValue: ''
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

    getDateWithTimeSetToGivenTime = (date, hours, minutes) => {
        let dataToreturn = date.setHours(hours, minutes, 0, 0)
        return new Date(dataToreturn)
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
        let optionForSelect = []
        options.push('00:00')
        optionForSelect.push({value: '00:00', label: '00:00'})
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
            ) {
                options.push(appHours + ':' + appMinutes)
                optionForSelect.push({
                    value: appHours + ':' + appMinutes,
                    label: appHours + ':' + appMinutes
                })
            } else break
        }
        this.setState({options: optionForSelect})
    }

    handleOnBlur = event => {
        ReactDOM.findDOMNode(
            this.refs['select-label'.concat(this.props.id)]
        ).classList.remove('active')
    }

    handleOnFocus = event => {
        ReactDOM.findDOMNode(
            this.refs['select-label'.concat(this.props.id)]
        ).classList.add('active')
    }

    handleMultiOrSingleSelectedValue = event => {
        return {value: event.value, label: event.label}
    }
    handleOnChange = event => {
        let label, value, name
        label = event && event.label
        value = event && event.value
        name = event && event.name

        if (event) {
            let splittedTime = value.split(':')
            let hour = Number(splittedTime[0])
            let min = Number(splittedTime[1])

            let date = this.getDateWithTimeSetToGivenTime(new Date(), hour, min)
            this.setState({
                pickedTime: {value: value, label: label, name: name},
                inputValue: value
            })
            this.props.onChange && this.props.onChange({
                target: {
                    name: this.props.name,
                    value: this.props.dateTimeFormat ? moment(date).format(this.props.dateTimeFormat) : date,
                    label: label
                }
            })
        } else {
            this.setState({
                pickedTime: {value: '', label: '', name: this.props.name}
            })
        }
    }
    checkPickedTime = pickedTime => {
        if (pickedTime) {
            if (Object.keys(pickedTime).includes("value")) return new Date(pickedTime.value)
            else return new Date(pickedTime);
        } else return new Date(pickedTime)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {duration} = this.props
        //const {pickedTime} = this.state
        let pickedTime1, pickedTime2
        pickedTime1 = this.checkPickedTime(this.props.value)
        pickedTime2 = this.checkPickedTime(prevProps.value)

        if (Number(prevProps.duration) !== Number(duration))
            this.makeOptionsThroughDuration()
        if (String(pickedTime1) !== String(pickedTime2)) {
            let timeValue = this.checkAndValidateValue(new Date(this.props.value))
            this.setState({
                pickedTime: timeValue ? {...timeValue} : null
            })
        }
    }

    componentDidMount() {
        this.makeOptionsThroughDuration()
    }

    render() {
        const {
            autoFocus,
            backspaceRemovesValue,
            blurInputOnSelect,
            captureMenuScroll,
            className,
            classNamePrefix,
            closeMenuOnScroll,
            closeMenuOnSelect,
            components,
            // dateTimeFormat, to get value in given format
            defaultInputValue,
            defaultMenuIsOpen,
            defaultValue,
            delimiter,
            escapeClearsValue,
            hideSelectedOptions,
            id,
            inputId,
            inputValue,
            isClearable,
            isDisabled,
            isLoading,
            //isMulti,
            isOptionDisabled,
            isOptionSelected,
            isRtl,
            isSearchable,
            label,
            maxMenuHeight,
            menuIsOpen,
            menuPlacement,
            menuPosition,
            minMenuHeight,
            name,
            noOptionsMessage,
            onInputChange,
            onKeyDown,
            onMenuClose,
            onMenuOpen,
            openMenuOnClick,
            pageSize,
            placeholder,
            styles,
            theme,
            innerRef
        } = this.props;
        return (
            <>
                <div
                    className="field-wrapper select-wrapper "
                    id={'select-wrapper'.concat(id)}
                    ref={'select-wrapper'.concat(id)}
                >
                    <Form.Label ref={'select-label'.concat(id)} className="select-label">
                        {label}
                    </Form.Label>
                    <Select
                        autoFocus={autoFocus}
                        backspaceRemovesValue={backspaceRemovesValue}
                        blurInputOnSelect={blurInputOnSelect}
                        captureMenuScroll={captureMenuScroll}
                        className={className}
                        classNamePrefix={classNamePrefix}
                        closeMenuOnScroll={closeMenuOnScroll}
                        closeMenuOnSelect={closeMenuOnSelect}
                        components={components}
                        defaultInputValue={defaultInputValue}
                        defaultMenuIsOpen={defaultMenuIsOpen}
                        defaultValue={defaultValue}
                        delimiter={delimiter}
                        escapeClearsValue={escapeClearsValue}
                        hideSelectedOptions={hideSelectedOptions}
                        id={'select'.concat(id)}
                        inputId={inputId}
                        inputValue={inputValue}
                        isClearable={isClearable}
                        isDisabled={isDisabled}
                        isLoading={isLoading}
                        isOptionDisabled={isOptionDisabled}
                        isOptionSelected={isOptionSelected}
                        isRtl={isRtl}
                        isSearchable={isSearchable}
                        maxMenuHeight={maxMenuHeight}
                        menuIsOpen={menuIsOpen}
                        menuPlacement={menuPlacement}
                        menuPosition={menuPosition}
                        minMenuHeight={minMenuHeight}
                        name={name}
                        onBlur={this.handleOnBlur}
                        onFocus={this.handleOnFocus}
                        noOptionsMessage={noOptionsMessage}
                        onChange={event => this.handleOnChange(event)}
                        onInputChange={onInputChange}
                        onKeyDown={onKeyDown}
                        onMenuClose={onMenuClose}
                        onMenuOpen={onMenuOpen}
                        openMenuOnClick={openMenuOnClick}
                        options={this.state.options}
                        pageSize={pageSize}
                        placeholder={placeholder}
                        ref={innerRef}
                        styles={styles}
                        theme={theme}
                        value={this.state.pickedTime}
                    />
                </div>
            </>
        )
    }
}

export default CHybridTimePicker
