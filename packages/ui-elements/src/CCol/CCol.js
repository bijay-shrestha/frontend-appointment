import React from 'react';
import Col from "react-bootstrap/Col";
import PropTypes from 'prop-types';

const CCol = props => {
    const {
        as,
        bsPrefix,
        children,
        className,
        id,
        lg,
        md,
        sm,
        xl,
        xs
    } = props;
    return (
        <Col
            as={as}
            bsPrefix={bsPrefix}
            children={children}
            className={className}
            id={"col_".concat(id)}
            lg={lg}
            md={md}
            sm={sm}
            xl={xl}
            xs={xs}
        />
    )
};
CCol.propTypes = {
    as: PropTypes.elementType,
    bsPrefix: PropTypes.string,
    children: PropTypes.node,
    id: PropTypes.string.isRequired,
    lg: PropTypes.any,
    md: PropTypes.any,
    sm: PropTypes.any,
    xl: PropTypes.any,
    xs: PropTypes.any
};

export default CCol;