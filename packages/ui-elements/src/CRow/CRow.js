import React from 'react';
import Row from "react-bootstrap/Row";
import PropTypes from 'prop-types';

const CRow = props => {
    const {
        as,
        bsPrefix,
        children,
        className,
        id,
        noGutters
    } = props;
    return (
        <Row
            as={as}
            bsPrefix={bsPrefix}
            children={children}
            className={className}
            id={"row_".concat(id)}
            noGutters={noGutters}
        />
    )
};

CRow.propTypes = {
    as: PropTypes.elementType,
    bsPrefix: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    noGutters: PropTypes.bool
};

export default CRow;