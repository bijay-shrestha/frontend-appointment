import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Button, Form} from "react-bootstrap";
import './hybrid-password.scss';

class CHybridPassword extends React.PureComponent {
    state = {
        errorMessage: '',
        valid: true,
        showPassword: true
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

    checkValidLength = value => {
        let errorMsg = 'Password must be greater than 5';
       // let valueToBeReturned = false;

        // if (value.length >= 5) valueToBeReturned = true;
        // else if (value.length === 0) errorMsg = '';
        // else errorMsg = 'Sorry the length Of password must be greater than 5';
        // this.setStateValues(errorMsg,valueToBeReturned);
        // return valueToBeReturned;

        let isValid = value.length >= 5;
        let fieldWrapper = ReactDOM.findDOMNode(
            this.refs['fieldWrapper'.concat(this.props.id)]
        ).classList;
        if (!isValid && value) {
            fieldWrapper.add('errorInput');
            this.setStateValues(errorMsg, false);
            return false
        } else {
            fieldWrapper.remove('errorInput');
            this.setStateValues('', true);
            return true
        }
    };

    checkPasswordPolicy = (value, check) => {
        let errorValueToBeSet = '';
        if (check) {
            const weakPasswordPolicy = /^[a-zA-Z]+$/;
            const strongPasswordPolicy = new RegExp(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
            );

            errorValueToBeSet = value.match(weakPasswordPolicy)
                ? 'WEAK'
                : value.match(strongPasswordPolicy)
                    ? 'STRONG'
                    : 'MEDIUM'
        }
        if (errorValueToBeSet) this.setStateValues(errorValueToBeSet, true);
        else this.setStateValues('', true);
    };

    handleOnChange = e => {
        let validity = '';
        let shouldCall;
        if (!this.props.avoidDefaultValidation) {
            const {value} = e.target;
            shouldCall = this.checkValidLength(value);
            shouldCall && this.checkPasswordPolicy(value, shouldCall);
        }
        this.classAdditionWhenValueIsChanged(e.target.value);
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

    onSeePassword = e => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }))
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
        let fieldWrapper = ReactDOM.findDOMNode(
            this.refs['fieldWrapper'.concat(this.props.id)]
        ).classList;
        if (this.props.errorMsg !== undefined && this.props.errorMsg !== prevProps.errorMsg) {
            if (this.props.isInvalid) {
                fieldWrapper.add('errorInput');
            } else {
                fieldWrapper.remove('errorInput')
            }
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
            errorMsg,
            id,
            isValid,
            isInvalid,
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
            value
        } = this.props;

        return (
            <>
                <div
                    className="field-wrapper hinput"
                    id={'fieldWrapper'.concat(id)}
                    ref={'fieldWrapper'.concat(id)}
                >
                    {/*<InputGroup>*/}
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
                        isInvalid={isInvalid ? isInvalid : !this.state.valid}
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
                        type={this.state.showPassword ? 'password' : 'text'}
                        value={value}
                    />
                    {/*<InputGroup.Append>*/}
                    <Button
                        onClick={this.onSeePassword}
                        variant="outline-secondary"
                        className="show-btn-pwd">
                        {/* <i className={!this.state.showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}/> */}
                        {!this.state.showPassword ? 'Hide' : 'Show'}
                    </Button>
                    {/*</InputGroup.Append>*/}
                    {/*</InputGroup>*/}
                    <div
                        className="field-placeholder"
                        ref={'fieldPlaceholder'.concat(id)}
                        onClick={this.handlePlaceholderClick}>
                        <span>{placeholder ? placeholder : 'Enter'}</span>
                    </div>

                    <Form.Control.Feedback
                        type={this.state.errorMessage ? (this.state.errorMessage === 'STRONG' ? 'valid' : 'invalid') : 'invalid'}
                        className="err-message">
                        {errorMsg ? errorMsg : this.state.errorMessage}
                    </Form.Control.Feedback>
                </div>

            </>
        )
    }
}

CHybridPassword.propTypes = {
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

export default CHybridPassword
