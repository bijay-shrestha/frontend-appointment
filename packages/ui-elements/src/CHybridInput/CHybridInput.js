import React from 'react'
import ReactDOM from 'react-dom'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'
import './hybrid-input.scss'

class CHybridInput extends React.PureComponent {
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

    toggleClassName = (key, values) => {
        values.map(value =>
            ReactDOM.findDOMNode(this.refs[key]).classList.toggle(value)
        )
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

    checkValidityOfEmail = value => {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        let errValue = '';
        let fieldWrapper = ReactDOM.findDOMNode(
            this.refs['fieldWrapper'.concat(this.props.id)]
        ).classList;
        if (value !== '') {
            if (!value.match(emailPattern)) {
                errValue = 'Email Not Valid';
                fieldWrapper.add('errorInput');
                this.setStateValues(errValue, false)
            } else {
                errValue = '';
                fieldWrapper.remove('errorInput');
                this.setStateValues(errValue, true)
            }
        } else {
            fieldWrapper.remove('errorInput');
            this.setStateValues(errValue, true)
        }
    };

    validateFieldAndToggleErrorClass = (
        patternOfFieldValue,
        errorMessageToDisplay,
        value
    ) => {
        let fieldWrapper = ReactDOM.findDOMNode(
            this.refs['fieldWrapper'.concat(this.props.id)]
        ).classList;
        let isValid = patternOfFieldValue.test(value);
        if (!isValid && value) {
            fieldWrapper.add('errorInput');
            this.setStateValues(errorMessageToDisplay, false);
            return false
        } else {
            fieldWrapper.remove('errorInput');
            this.setStateValues('', true);
            return true
        }
    };

    handleOnChange = e => {
        let validity = '';
        this.classAdditionWhenValueIsChanged(e.target.value);
        if (this.props.type === 'email' && this.state.errorMessage !== '') {
            this.checkValidityOfEmail(e.target.value)
        } else if (this.props.hasValidation) {
            validity = this.validateFieldAndToggleErrorClass(
                this.props.fieldValuePattern,
                this.props.errorMessagePassed,
                e.target.value
            )
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
            as,
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
            plaintext,
            readOnly,
            required,
            rows,
            size,
            type,
            value
        } = this.props;

        return (
            <>
                <div
                    className="field-wrapper hinput"
                    id={'fieldWrapper'.concat(id)}
                    ref={'fieldWrapper'.concat(id)}
                >
                    <Form.Control
                        _ref={_ref}
                        ref={this.inputRef}
                        as={as}
                        autoComplete={autoComplete}
                        bsPrefix={bsPrefix}
                        children={children}
                        className={className}
                        defaultValue={defaultValue}
                        disabled={disabled}
                        id={'fControl_'.concat(id)}
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
                        plaintext={plaintext}
                        readOnly={readOnly}
                        required={required}
                        rows={rows}
                        size={size}
                        type={type}
                        value={value}
                    />
                    <div
                        className="field-placeholder"
                        ref={'fieldPlaceholder'.concat(id)}
                        onClick={this.handlePlaceholderClick}
                    >
                        <span>{placeholder ? placeholder : 'Enter'}</span>
                    </div>
                    <Form.Control.Feedback type="invalid" className="err-message">
                        {this.state.errorMessage}
                    </Form.Control.Feedback>
                </div>

                {/*<span id='error'>{this.state.errorMessage}</span>*/}
            </>
        )
    }
}

CHybridInput.propTypes = {
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
    value: PropTypes.string
};

export default CHybridInput
