import React, {memo} from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import './ccheckbox.scss';

const CCheckbox = props => {
    const {
        id,
        label,
        reference,
        checked,
        children,
        className,
        custom,
        defaultChecked,
        disabled,
        feedback,
        inline,
        isInvalid,
        isValid,
        name,
        title,
        bsPrefix,
        onChange,
        readOnly
    } = props;

    return (
        <Form.Check
            test-id="c-checkbox"
            id={'checkbox'.concat('_').concat(id)}
            label={label}
            type="checkbox"
            ref={reference}
            checked={checked}
            children={children}
            className={className}
            custom={custom}
            defaultChecked={defaultChecked}
            disabled={disabled}
            feedback={feedback}
            inline={inline}
            isInvalid={isInvalid}
            isValid={isValid}
            name={name}
            title={title}
            bsPrefix={bsPrefix}
            onChange={onChange}
            readOnly={readOnly}
        />
    );
};

CCheckbox.defaultProps = {
    type: 'checkbox',
    onChange: () => {
    }
};

CCheckbox.propTypes = {
    id: PropTypes.any.isRequired, // must be unique
    label: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.node
    ]),
    ref: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current: PropTypes.instanceOf(Element)})
    ]),
    checked:PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    custom: PropTypes.bool,
    defaultChecked:PropTypes.bool,
    disabled: PropTypes.bool,
    feedback: PropTypes.node,
    inline: PropTypes.bool,
    isInvalid: PropTypes.bool,
    isValid: PropTypes.bool,
    name:PropTypes.string,
    title: PropTypes.string,
    bsPrefix: PropTypes.string,
    onChange: PropTypes.func,
    readOnly:PropTypes.bool
};

export default memo(CCheckbox);
