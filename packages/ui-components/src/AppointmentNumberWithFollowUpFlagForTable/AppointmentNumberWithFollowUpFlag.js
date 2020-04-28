import React, {memo} from 'react'
import {Badge} from "react-bootstrap";

const AppointmentNumberWithFollowUpFlag = props => {
    return (
        <>
            <ul className="doctor-column">
                <li>{props.node.data.appointmentNumber}</li>
                {
                    props.node.data.isFollowUp === 'Y' ?
                        <li>
                            <Badge
                                variant="info">
                                FOLLOW UP
                            </Badge>{' '}
                        </li>
                        : ''
                }
            </ul>
        </>
    )
}
export default memo(AppointmentNumberWithFollowUpFlag)
