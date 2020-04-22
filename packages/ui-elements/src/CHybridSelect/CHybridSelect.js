import React, {PureComponent} from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap';
import './hybrid-select.scss';
import ReactDOM from 'react-dom';

class CHybridSelect extends PureComponent {
    handleOnBlur = event => {
        ReactDOM.findDOMNode(
            this.refs['select-label'.concat(this.props.id)]
        ).classList.remove('active');
    };

    handleOnFocus = event => {
        ReactDOM.findDOMNode(
            this.refs['select-label'.concat(this.props.id)]
        ).classList.add('active');
    };

    handleMultiOrSingleSelectedValue = event => {
        const {isMulti, name} = this.props;
        return isMulti ? {values: [...event]} : {value: event.value, label: event.label};
    };
    handleOnChange = event => {
        event
            ? this.props.onChange({
                target: {
                    name: this.props.name,
                    ...this.handleMultiOrSingleSelectedValue(event)
                }
            })
            : this.props.onChange({
                target: {name: this.props.name, value: '', label: ''}
            });
    };

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
            isMulti,
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
            onChange,
            onInputChange,
            onKeyDown,
            onMenuClose,
            onMenuOpen,
            openMenuOnClick,
            options,
            pageSize,
            placeholder,
            styles,
            theme,
            value
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
                        isMulti={isMulti}
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
                        options={options}
                        pageSize={pageSize}
                        placeholder={placeholder}
                        styles={styles}
                        theme={theme}
                        value={value}
                    />
                </div>
            </>
        );
    }
}

CHybridSelect.defaultProps = {
    backspaceRemovesValue: true, // wont work if isClearable set to false
    closeMenuOnSelect: true,
    isClearable: true,
    isSearchable: true,
    isMulti: false,
    onChange: () => {
    },
    openMenuOnClick: true,
    options: [],
    placeholder: 'Select ...'
};

CHybridSelect.propTypes = {
    autoFocus: PropTypes.bool,
    backspaceRemovesValue: PropTypes.bool,
    blurInputOnSelect: PropTypes.bool,
    captureMenuScroll: PropTypes.bool,
    className: PropTypes.string,
    classNamePrefix: PropTypes.string,
    closeMenuOnScroll: PropTypes.bool || PropTypes.func,
    closeMenuOnSelect: PropTypes.bool,
    components: PropTypes.object,
    defaultInputValue: PropTypes.string,
    defaultMenuIsOpen: PropTypes.bool,
    defaultValue: PropTypes.object || PropTypes.arrayOf(PropTypes.object),
    delimiter: PropTypes.string,
    escapeClearsValue: PropTypes.bool,
    hideSelectedOptions: PropTypes.bool,
    inputId: PropTypes.string,
    inputValue: PropTypes.string,
    id: PropTypes.string,
    isClearable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    isMulti: PropTypes.bool,
    isOptionDisabled: PropTypes.bool,
    isOptionSelected: PropTypes.bool,
    isRtl: PropTypes.bool,
    isSearchable: PropTypes.bool,
    maxMenuHeight: PropTypes.number,
    menuIsOpen: PropTypes.bool,
    menuPlacement: PropTypes.string, //auto,bottom,top
    menuPosition: PropTypes.string, //absolute fixed
    minMenuHeight: PropTypes.number,
    name: PropTypes.string,
    noOptionsMessage: PropTypes.func,// function returning string
    onChange: PropTypes.func.isRequired,
    onInputChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onMenuClose: PropTypes.func,
    onMenuOpen: PropTypes.func,
    openMenuOnClick: PropTypes.bool,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.any.isRequired,
            label: PropTypes.string.isRequired
        }).isRequired
    ),
    pageSize: PropTypes.number,
    placeholder: PropTypes.string,
    styles: PropTypes.object,
    theme: PropTypes.object,
    value: PropTypes.any
};

export default CHybridSelect;
