import React, {memo} from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import './ccheckbox.scss';

const CCheckbox = props => {
    const {
        id,
        label,
        ref,
        checked,
        children,
        className,
        custom,
        disabled,
        feedback,
        inline,
        isInvalid,
        isValid,
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
            _ref={ref}
            checked={checked}
            children={children}
            className={className}
            custom={custom}
            disabled={disabled}
            feedback={feedback}
            inline={inline}
            isInvalid={isInvalid}
            isValid={isValid}
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
    _ref: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current: PropTypes.instanceOf(Element)})
    ]),
    checked:PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    custom: PropTypes.bool,
    disabled: PropTypes.bool,
    feedback: PropTypes.node,
    inline: PropTypes.bool,
    isInvalid: PropTypes.bool,
    isValid: PropTypes.bool,
    title: PropTypes.string,
    bsPrefix: PropTypes.string,
    onChange: PropTypes.func,
    readOnly:PropTypes.bool
};

export default memo(CCheckbox);
