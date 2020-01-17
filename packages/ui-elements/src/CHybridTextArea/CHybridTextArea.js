import React from 'react';
import ReactDOM from 'react-dom';
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import './hybrid-text-area.scss';

class CHybridTextArea extends React.PureComponent {
    state = {
        errorMessage: '',
        valid: true
    };

    inputRef = React.createRef();

    setStateValues = (error, valid) => {
        this.setState({
            errorMessage: error,
            valid: valid
        })
    };

    classAdditionWhenValueIsChanged = value => {
        const a = ReactDOM.findDOMNode(this.refs['fieldWrapper' + this.props.id])
            .className;
        if (!value) {
            if (a.includes('hasValue')) {
                const replaceString = a.replace(' hasValue', '');
                ReactDOM.findDOMNode(
                    this.refs['fieldWrapper' + this.props.id]
                ).className = replaceString
            }
        } else {
            if (!a.includes('hasValue')) {
                ReactDOM.findDOMNode(
                    this.refs['fieldWrapper' + this.props.id]
                ).className += ' hasValue'
            }
        }
    };

    validateFieldAndToggleErrorClass = (maxLength, minLength, errorMessageToDisplay, value) => {
        let fieldWrapper = ReactDOM.findDOMNode(this.refs['fieldWrapper'.concat(this.props.id)]).classList;

        let isValid = maxLength ? (minLength ? minLength <= value.length <= maxLength : value.length <= maxLength)
            : (minLength ? minLength <= value.length : true);
        // let    isValid = value.length <= maxLength;
        if (!isValid && value) {
            fieldWrapper.add('errorInput');
            this.setStateValues(errorMessageToDisplay, false);
            return false;
        } else {
            fieldWrapper.remove('errorInput');
            this.setStateValues('', true);
            return true;
        }
    };

    handleOnChange = e => {
        let validity = '';
        this.props.onChange(e, validity);
        this.classAdditionWhenValueIsChanged(e.target.value);
        if (this.props.hasValidation) {
            validity = this.validateFieldAndToggleErrorClass(
                this.props.maxLength,
                this.props.minLength,
                this.props.errorMessagePassed,
                e.target.value);
        }
        this.props.onChange(e, validity)
    };

    handleOnFocus = e => {
        const a = ReactDOM.findDOMNode(this.refs['fieldWrapper' + this.props.id])
            .className;
        if (!a.includes('myInput') && !this.state.errorMsg) {
            ReactDOM.findDOMNode(
                this.refs['fieldWrapper' + this.props.id]
            ).className += ' myInput'
        }
    };

    handleOnBlur = e => {
        const a = ReactDOM.findDOMNode(this.refs['fieldWrapper' + this.props.id])
            .className;
        const replaceString = a.replace(' myInput', '');
        ReactDOM.findDOMNode(
            this.refs['fieldWrapper' + this.props.id]
        ).className = replaceString
    };

    handlePlaceholderClick = () => {
        this.inputRef.current.focus()
    };

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.value) {
            const a = ReactDOM.findDOMNode(this.refs['fieldWrapper' + this.props.id])
                .className;
            const replaceString = a.replace(' hasValue', '');
            ReactDOM.findDOMNode(
                this.refs['fieldWrapper' + this.props.id]
            ).className = replaceString;
            return true
        }
        return false
    }

    componentDidMount() {
        if (this.props.value) {
            ReactDOM.findDOMNode(
                this.refs['fieldWrapper' + this.props.id]
            ).className += ' hasValue'
        }
    }

    render() {
        const {
            _ref,
            autoComplete,
            bsPrefix,
            children,
            className,
            defaultValue,
            disabled,
            id,
            isValid,
            max,
            min,
            multiple,
            name,
            onKeyDown,
            pattern,
            placeholder,
            readOnly,
            required,
            rows,
            size,
            value,
        } = this.props;
        return (
            <>
                <div
                    className='field-wrapper'
                    id={'fieldWrapper'.concat(id)}
                    ref={'fieldWrapper'.concat(id)}
                >
                    <Form.Control
                        _ref={_ref}
                        ref={this.inputRef}
                        as="textarea"
                        autoComplete={autoComplete}
                        bsPrefix={bsPrefix}
                        children={children}
                        className={className}
                        defaultValue={defaultValue}
                        disabled={disabled}
                        id={"fControl_".concat(id)}
                        isInvalid={!this.state.valid}
                        isValid={isValid}
                        max={max}
                        min={min}
                        multiple={multiple}
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
                        value={value}
                    />
                    <div
                        className='field-placeholder'
                        ref={'fieldPlaceholder'.concat(id)}
                        onClick={this.handlePlaceholderClick}
                    >
                        <span>{placeholder ? placeholder : 'Enter'}</span>
                    </div>
                    <Form.Control.Feedback type="invalid" className="err-message">
                    {this.state.errorMessage}
                </Form.Control.Feedback>
                </div>

            </>
        )
    }
}

CHybridTextArea.propTypes = {
    _ref: PropTypes.oneOfType([
        PropTypes.func, // for legacy refs
        PropTypes.shape({current: PropTypes.instanceOf(Element)})
    ]),
    as: PropTypes.elementType,
    autoComplete: PropTypes.string,
    bsPrefix: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    isInvalid: PropTypes.bool,
    isValid: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    plaintext: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    rows: PropTypes.string,
    size: PropTypes.string, // 'sm','lg
    type: PropTypes.string,
    value: PropTypes.string,
};

export default CHybridTextArea;
