import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const CForm = props => {
    const {
        _ref,
        as,
        bsPrefix,
        children,
        className,
        id,
        inline,
        noValidate,
        onSubmit,
        validated,
    } = props;
    return (
        <Form
            _ref={_ref}
            as={as}
            bsPrefix={bsPrefix}
            children={children}
            className={className}
            id={"form".concat("_").concat(id)}
            inline={inline}
            noValidate={noValidate}
            onSubmit={onSubmit}
            validated={validated}
        />
    );
};

CForm.defaultProps = {
    onSubmit: () => {
    }
};

CForm.propTypes = {
    _ref: PropTypes.oneOfType([
        PropTypes.func, // for legacy refs
        PropTypes.shape({current: PropTypes.instanceOf(Element)})
    ]),
    as: PropTypes.elementType,
    bsPrefix: PropTypes.string,
    children: PropTypes.node,
    id: PropTypes.string.isRequired,
    inline: PropTypes.bool,
    noValidate: PropTypes.bool,
    onSubmit: PropTypes.func,
    validated: PropTypes.bool,
};

export default CForm;