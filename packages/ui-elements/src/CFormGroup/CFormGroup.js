import React from 'react';
import {Form} from "react-bootstrap";
import PropTypes from 'prop-types';

const CFormGroup = props => {
    const {
        _ref,
        as,
        bsPrefix,
        children,
        className,
        controlId,
        id
    } = props;
    return (
        <Form.Group
            _ref={_ref}
            as={as}
            bsPrefix={bsPrefix}
            children={children}
            className={className}
            controlId={controlId}
            id={"group".concat("_").concat(id)}
        />)
};

CFormGroup.propTypes = {
    _ref: PropTypes.oneOfType([
        PropTypes.func, // for legacy refs
        PropTypes.shape({current: PropTypes.instanceOf(Element)})
    ]),
    as: PropTypes.elementType,
    bsPrefix: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    controlId: PropTypes.string,
    id: PropTypes.string
};

export default CFormGroup;