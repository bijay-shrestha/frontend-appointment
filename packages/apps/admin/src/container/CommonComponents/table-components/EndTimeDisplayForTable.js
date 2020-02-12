import React from 'react';
import {DateTimeFormatterUtils} from "@frontend-appointment/helpers";


const EndTimeDisplayForTable = props => {
    return (
        <>
            {DateTimeFormatterUtils.convertDateToHourMinuteFormat(props.node.data.endTime ? new Date(props.node.data.endTime) : '')}
        </>
    );
};

export default EndTimeDisplayForTable;
