import React, {Component} from 'react'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'

import {CHybridInput} from '@frontend-appointment/ui-elements'
import './react-datepicker.scss'
import {ObjectUtils} from "@frontend-appointment/helpers";

class CEnglishDatePicker extends Component {
    subDays = (date, days) => {
        return date.setDate(date.getDate() - days)
    };

    addDays = (date, days) => {
        return date.setDate(date.getDate() + days)
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // let propsSelected = nextProps.selected;
        // let selected = this.props.selected;
        // if (!propsSelected) propsSelected = '';
        // else propsSelected = propsSelected.toLocaleString();
        // if (!selected)
        //     selected = "";
        // else
        //     selected = selected.toLocaleString();
        // return (propsSelected !== selected || nextProps.invalid !== this.props.invalid);
        return (!ObjectUtils.checkObjectEquality(nextProps,this.props));
    }

    render() {
        const {
            allowSameDay,
            ariaLabelledBy, // GIVES THIS PROPERTY
            autoComplete, // AUTOCOMPLETE PROPERTY FOR INPUT FIELD
            autoFocus, // INITIALLY AUTOFOCUS(OPEN)
            calendarClassName,
            children,
            className,
            clearButtonTitle, // GIVES TITLE PROPERTY FOR CLEAR BUTTON WHEN USED
            customInput, //CUSTOMIZING INPUT FIELD EXAMPLE AVAILABLE
            customInputRef,
            dateFormat,
            dateFormatCalendar,
            dayClassName,
            disabled,
            disabledKeyboardNavigation,
            dropdownMode,
            endDate,
            excludeDates,
            excludeTimes,
            filterDate,
            fixedHeight,
            forceShowMonthNavigation,
            formatWeekNumber,
            highlightDates,
            id,
            includeDates,
            includeTimes,
            injectTimes,
            inline,
            invalid,
            isClearable,
            label,
            locale,
            maxDate,
            maxTime,
            minDate,
            minTime,
            monthsShown,
            name,
            onBlur,
            onCalendarClose,
            onCalendarOpen,
            onChange,
            onChangeRaw,
            onClickOutside,
            onFocus,
            onKeyDown,
            onMonthChange,
            onSelect,
            onWeekSelect,
            onYearChange,
            openToDate,
            peekNextMonth,
            placeholderText,
            popperClassName,
            popperContainer,
            popperModifiers,
            popperPlacement,
            readOnly,
            required,
            scrollableYearDropdown,
            selected,
            selectsEnd,
            selectsStart,
            shouldCloseOnSelect,
            showDisabledMonthNavigation,
            showMonthDropdown,
            showTimeSelect,
            showTimeSelectOnly,
            showWeekNumbers,
            showYearDropdown,
            startDate,
            startOpen,
            tabIndex,
            timeClassName,
            timeFormat,
            timeIntervals,
            title,
            todayButton,
            useWeekdaysShort,
            utcOffset,
            value,
            weekLabel,
            withPortal,
            yearDropdownItemNumber
        } = this.props;

        const HybridInput = ({value, onClick}) => (
            <CHybridInput
                id={id}
                className="example-custom-input"
                onClick={onClick}
                value={value}
                placeholder={label}
                onChange={onChange}
                readOnly={true}
                autoComplete="off"
                disabled={disabled}
                isInvalid={invalid}
            />
        );
        return (
            <>
                <DatePicker
                    allowSameDay={allowSameDay}
                    ariaLabelledBy={ariaLabelledBy}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    calendarClassName={calendarClassName}
                    children={children}
                    className={className}
                    clearButtonTitle={clearButtonTitle}
                    customInput={<HybridInput/>}
                    customInputRef={customInputRef}
                    dateFormat={dateFormat}
                    dateFormatCalendar={dateFormatCalendar}
                    dayClassName={dayClassName}
                    disabled={disabled}
                    disabledKeyboardNavigation={disabledKeyboardNavigation}
                    dropdownMode={dropdownMode}
                    endDate={endDate}
                    excludeDates={excludeDates}
                    excludeTimes={excludeTimes}
                    filterDate={filterDate}
                    fixedHeight={fixedHeight}
                    forceShowMonthNavigation={forceShowMonthNavigation}
                    formatWeekNumber={formatWeekNumber}
                    highlightDates={highlightDates}
                    id={id}
                    includeDates={includeDates}
                    includeTimes={includeTimes}
                    injectTimes={injectTimes}
                    inline={inline}
                    isClearable={isClearable}
                    locale={locale}
                    maxDate={this.addDays(new Date(), maxDate)}
                    maxTime={maxTime}
                    minDate={this.subDays(new Date(), minDate)}
                    minTime={minTime}
                    monthsShown={monthsShown}
                    name={name}
                    onBlur={onBlur}
                    onCalendarClose={onCalendarClose}
                    onCalendarOpen={onCalendarOpen}
                    onChange={onChange}
                    onChangeRaw={onChangeRaw}
                    onClickOutside={onClickOutside}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    onMonthChange={onMonthChange}
                    onSelect={onSelect}
                    onWeekSelect={onWeekSelect}
                    onYearChange={onYearChange}
                    openToDate={openToDate}
                    peekNextMonth={peekNextMonth}
                    placeholderText={placeholderText}
                    popperClassName={popperClassName}
                    popperContainer={popperContainer}
                    popperModifiers={popperModifiers}
                    popperPlacement={popperPlacement}
                    readOnly={readOnly}
                    required={required}
                    scrollableYearDropdown={scrollableYearDropdown}
                    selected={selected}
                    selectsEnd={selectsEnd}
                    selectsStart={selectsStart}
                    shouldCloseOnSelect={shouldCloseOnSelect}
                    showDisabledMonthNavigation={showDisabledMonthNavigation}
                    showMonthDropdown={showMonthDropdown}
                    showTimeSelect={showTimeSelect}
                    showTimeSelectOnly={showTimeSelectOnly}
                    showWeekNumbers={showWeekNumbers}
                    showYearDropdown={showYearDropdown}
                    startDate={startDate}
                    startOpen={startOpen}
                    tabIndex={tabIndex}
                    timeClassName={timeClassName}
                    timeFormat={timeFormat}
                    timeIntervals={timeIntervals}
                    title={title}
                    todayButton={todayButton}
                    useWeekdaysShort={useWeekdaysShort}
                    utcOffset={utcOffset}
                    value={value}
                    weekLabel={weekLabel}
                    withPortal={withPortal}
                    yearDropdownItemNumber={yearDropdownItemNumber}
                />
            </>
        )
    }
}

// Reference: https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md
// Examples: https://reactdatepicker.com/#example-custom-time-class-name
CEnglishDatePicker.defaultProps = {
    label: 'Date'
};

CEnglishDatePicker.propTypes = {
    allowSameDay: PropTypes.bool,
    ariaLabelledBy: PropTypes.string, // GIVES THIS PROPERTY
    autoComplete: PropTypes.string, // AUTOCOMPLETE PROPERTY FOR INPUT FIELD
    autoFocus: PropTypes.bool, // INITIALLY AUTOFOCUS(OPEN) either 'ON' or 'OFF'
    calendarClassName: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    clearButtonTitle: PropTypes.string, // GIVES TITLE PROPERTY FOR CLEAR BUTTON WHEN USED
    customInput: PropTypes.element, //CUSTOMIZING INPUT FIELD EXAMPLE AVAILABLE
    customInputRef: PropTypes.string,
    dateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    dateFormatCalendar: PropTypes.string,
    dayClassName: PropTypes.func,
    disabled: PropTypes.bool,
    disabledKeyboardNavigation: PropTypes.bool,
    dropdownMode: PropTypes.oneOf(['scroll', 'select']), // DEFAULT SCROLL(required)
    endDate: PropTypes.instanceOf(Date),
    excludeDates: PropTypes.array,
    excludeTimes: PropTypes.array,
    filterDate: PropTypes.func,
    fixedHeight: PropTypes.bool,
    forceShowMonthNavigation: PropTypes.bool,
    formatWeekNumber: PropTypes.func,
    highlightDates: PropTypes.array,
    id: PropTypes.string,
    includeDates: PropTypes.array,
    includeTimes: PropTypes.array,
    injectTimes: PropTypes.array,
    inline: PropTypes.bool,
    isClearable: PropTypes.bool,
    locale: PropTypes.string,
    maxDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
    maxTime: PropTypes.instanceOf(Date),
    minDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
    minTime: PropTypes.instanceOf(Date),
    monthsShown: PropTypes.number,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onCalendarClose: PropTypes.func,
    onCalendarOpen: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onChangeRaw: PropTypes.func,
    onClickOutside: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onMonthChange: PropTypes.func,
    onSelect: PropTypes.func,
    onWeekSelect: PropTypes.func,
    onYearChange: PropTypes.func,
    openToDate: PropTypes.instanceOf(Date),
    peekNextMonth: PropTypes.bool,
    placeholderText: PropTypes.string,
    popperClassName: PropTypes.string,
    popperContainer: PropTypes.func,
    popperModifiers: PropTypes.object,
    popperPlacement: PropTypes.oneOf(['top-end']), // POPPER PLACEMENT POSITIONS
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    scrollableYearDropdown: PropTypes.bool,
    selected: PropTypes.instanceOf(Date),
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    shouldCloseOnSelect: PropTypes.bool,
    showDisabledMonthNavigation: PropTypes.bool,
    showMonthDropdown: PropTypes.bool,
    showTimeSelect: PropTypes.bool,
    showTimeSelectOnly: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    showYearDropdown: PropTypes.bool,
    startDate: PropTypes.instanceOf(Date),
    startOpen: PropTypes.bool,
    tabIndex: PropTypes.number,
    timeClassName: PropTypes.func,
    timeFormat: PropTypes.string,
    timeIntervals: PropTypes.number,
    title: PropTypes.string,
    todayButton: PropTypes.node,
    useWeekdaysShort: PropTypes.bool,
    utcOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.string,
    weekLabel: PropTypes.string,
    withPortal: PropTypes.bool,
    yearDropdownItemNumber: PropTypes.number
};

export default CEnglishDatePicker
