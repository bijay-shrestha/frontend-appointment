import React from 'react';
import {DateTimeFormatterUtils} from "@frontend-appointment/helpers";


const EndTimeDisplayForTable = props => {
    return (
        <>
            <p>{DateTimeFormatterUtils.convertDateToHourMinuteFormat(props.node.data.endTime ? props.node.data.endTime : '')}</p>
        </>
    );
};

export default EndTimeDisplayForTable;
