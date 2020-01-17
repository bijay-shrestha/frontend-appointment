import React from 'react';
import {FormControl} from "react-bootstrap";
import Proptypes from 'prop-types';

const CFeedback = props => {
    const {
        as,
        className,
        message,
        id,
        type
    } = props;
    return (
        <FormControl.Feedback
            as={as}
            className={className}
            id={"feedback_".concat(id)}
            type={type}
        >
            {message}
        </FormControl.Feedback>
    )
};

CFeedback.propTypes = {
    as: Proptypes.elementType,
    id: Proptypes.string.isRequired,
    message: Proptypes.string.isRequired,
    type: Proptypes.string
};
export default CFeedback;