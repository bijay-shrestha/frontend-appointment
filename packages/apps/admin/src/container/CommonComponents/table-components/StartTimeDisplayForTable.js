import React from 'react';
import {DateTimeFormatterUtils} from "@frontend-appointment/helpers";


const StartTimeDisplayForTable = props => {
    console.log(props.node.data);
    return (
        <>
            {DateTimeFormatterUtils.convertDateToHourMinuteFormat(props.node.data.startTime ? new Date(props.node.data.startTime) : '')}
        </>
    );
};

export default StartTimeDisplayForTable;
