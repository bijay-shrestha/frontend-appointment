import React, {memo} from 'react'

const AppointmentNumberWithFollowUpFlag = props => {
    return (
        <>
            <ul className="patient-column">
                <li>{props.node.data.appointmentNumber || props.node.data.apptNumber}</li>
                {
                    props.node.data.followUp === 'Y' || props.node.data.isFollowUp === 'Y' ?
                        <li>
                            <i className="fa fa-tag"></i>&nbsp;Followup
                            {' '}
                        </li>
                        : ''
                }
            </ul>
        </>
    )
}
export default memo(AppointmentNumberWithFollowUpFlag)
