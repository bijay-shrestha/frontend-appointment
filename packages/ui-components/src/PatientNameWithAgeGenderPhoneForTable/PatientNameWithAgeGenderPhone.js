import React, {memo} from 'react'
import {Badge} from "react-bootstrap";

const PatientNameWithAgeGenderPhone = props => {
    return (
        <>
            <ul className="doctor-column">
                <li>{props.node.data.patientName} , {props.node.data.age}/{props.node.data.gender}</li>
                <li><i className="fa fa-phone"></i>&nbsp;{props.node.data.mobileNumber}&nbsp;
                    <Badge
                        variant={props.node.data.isRegistered === 'Y' ? "success" : "primary"}>
                        {props.node.data.isRegistered === 'Y' ? "REG" : "NEW"}
                    </Badge>
                </li>

            </ul>
        </>
    )
}
export default memo(PatientNameWithAgeGenderPhone)
