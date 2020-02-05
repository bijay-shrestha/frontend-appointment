import React from 'react';
import {DateTimeFormatterUtils} from "@frontend-appointment/helpers";


const ToDateDisplayForTable = props => {
    console.log(props.node.data);
    return (
        <>
            {DateTimeFormatterUtils.convertDateToYearMonthDateFormat(props.node.data.toDate ? new Date(props.node.data.toDate) : '')}
        </>
    );
};

export default ToDateDisplayForTable;
