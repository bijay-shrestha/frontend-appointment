import React from 'react';
import {Badge} from 'react-bootstrap';

const RoomEnableBadge = (props) => {

    return (
        <>
            {props.node.data.isRoomEnabled === 'Y' ? <Badge variant="success">Yes</Badge> :
                <Badge variant="danger">No</Badge>}

        </>
    );
};

export default RoomEnableBadge;
