import React, {memo} from 'react'
import {Badge} from "react-bootstrap";

const AppointmentNumberWithFollowUpFlag = props => {
    return (
        <>
            <ul className="patient-column">
                <li>{props.node.data.appointmentNumber}</li>
                {
                    props.node.data.isFollowUp === 'Y' ?
                        <li>
                            <i className="fa fa-tag"></i>Followup
                            {' '}
                        </li>
                        : ''
                }
            </ul>
        </>
    )
}
export default memo(AppointmentNumberWithFollowUpFlag)
