import React from 'react';
import {Badge} from 'react-bootstrap';

const DayOffStatusLabel = props => {
    return (
        <>
            {props.node.data.dayOffStatus === 'Y' ? <Badge variant="success">Yes</Badge> :
                <Badge variant="danger">No</Badge>}
        </>
    );
};

export default DayOffStatusLabel;
