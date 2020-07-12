import React from 'react';

const RoomNumberForTable = (props) => {

    return (
        <>
            {props.node.data.roomNumber || 'N/A'}

        </>
    );
};

export default RoomNumberForTable;
