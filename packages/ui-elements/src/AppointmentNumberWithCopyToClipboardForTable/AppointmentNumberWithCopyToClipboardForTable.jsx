import React from 'react';
import {CCopyToClipboard} from '../../index'

const AppointmentNumberWithCopyToClipboardForTable = (props) => {
    const {appointmentNumber} = props.node.data;

    return <>
        {appointmentNumber ?
            <CCopyToClipboard
                id={"appointmentNumber"}
                textToCopy={appointmentNumber}
                children={<span>{appointmentNumber}</span>}
            /> :
           "N/A"
        }
    </>
};

export default AppointmentNumberWithCopyToClipboardForTable;
