import React from 'react';
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

const CFControl = props => {
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
        isInvalid,
        isValid,
        max,
        min,
        multiple,
        name,
        onChange,
        pattern,
        placeholder,
        plaintext,
        readOnly,
        required,
        rows,
        size,
        type,
        value,
    } = props;
    return (
        <Form.Control
            _ref={_ref}
            as={as}
            autoComplete={autoComplete}
            bsPrefix={bsPrefix}
            children={children}
            className={className}
            defaultValue={defaultValue}
            disabled={disabled}
            id={"fControl_".concat(id)}
            isInvalid={isInvalid}
            isValid={isValid}
            max={max}
            min={min}
            multiple={multiple}
            name={name}
            onChange={onChange}
            pattern={pattern}
            placeholder={placeholder}
            plaintext={plaintext}
            readOnly={readOnly}
            required={required}
            rows={rows}
            size={size}
            type={type}
            value={value}
        />
    )
};

CFControl.propTypes = {
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

export default CFControl;