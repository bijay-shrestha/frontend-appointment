import React, {memo} from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const CRadioButton = props => {
    const {
        id,
        label,
        reference,
        children,
        checked,
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
        readOnly,
        defaultChecked,
        name,
        value
    } = props;

    const newClassName = className || "" ;

    return (
        <>
            <Form.Check
                test-id="c-radio"
                id={label.concat('_').concat(id)}
                label={label}
                type="radio"
                // ref={reference}
                checked={checked}
                children={children}
                className={"c-radio " + newClassName  }
                custom={custom}
                disabled={disabled}
                feedback={feedback}
                inline={inline}
                isInvalid={isInvalid}
                isValid={isValid}
                title={title}
                bsPrefix={bsPrefix}
                // onChange={onChange}
            >
                <Form.Check.Input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    readOnly={readOnly}
                    ref={reference}
                    defaultChecked={defaultChecked}
                    onChange={onChange}
                >
                </Form.Check.Input>
                <Form.Check.Label bsPrefix="radio">
                    {label}
                </Form.Check.Label>
            </Form.Check>
        </>
    );
};

CRadioButton.defaultProps = {
    type: 'radio',
    onChange: () => {
    }
};

CRadioButton.propTypes = {
    id: PropTypes.string.isRequired, // must be unique
    label: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.node
    ]),
    _ref: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current: PropTypes.instanceOf(Element)})
    ]),
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
    readOnly: PropTypes.bool,
    defaultChecked: PropTypes.bool
};

export default memo(CRadioButton);
