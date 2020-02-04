import React from 'react';
import {DateTimeFormatterUtils} from "@frontend-appointment/helpers";


const StartTimeDisplayForTable = props => {
    console.log(props.node.data);
    return (
        <>
            <p>{DateTimeFormatterUtils.convertDateToHourMinuteFormat(props.node.data.startTime ? props.node.data.startTime : '')}</p>
        </>
    );
};

export default StartTimeDisplayForTable;
