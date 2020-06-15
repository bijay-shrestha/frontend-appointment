import React from 'react';
import {CCopyToClipboard} from '../../index'

const AppointmentNumberWithCopyToClipboardForTable = (props) => {
    const {appointmentNumber} = props.node.data;

    return <>
        <div className="di-column">
            {appointmentNumber ?
                <CCopyToClipboard
                    id={"appointmentNumber"}
                    textToCopy={appointmentNumber}
                    children={<span>{appointmentNumber}</span>}
                /> :
                "N/A"
            }
        </div>
    </>
};

export default AppointmentNumberWithCopyToClipboardForTable;
