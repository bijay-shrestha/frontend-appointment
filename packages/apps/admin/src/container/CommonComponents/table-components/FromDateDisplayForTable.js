import React from 'react';
import {DateTimeFormatterUtils} from "@frontend-appointment/helpers";


const FromDateDisplayForTable = props => {
    return (
        <>
            {DateTimeFormatterUtils.convertDateToYearMonthDateFormat(props.node.data.fromDate ? new Date(props.node.data.fromDate) : '')}
        </>
    );
};

export default FromDateDisplayForTable;
