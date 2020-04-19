import React, {memo} from 'react';
import {Badge} from 'react-bootstrap';


const DoctorWithSpecialization = (props) => {
    return (
        <>
            <ul className="doctor-column">
                <li>
                    {props.node.data.doctorName}
                </li>
                <li>
                    <span className="spec">
                    <i className="fa fa-bookmark"></i>&nbsp;
                    {props.node.data.specializationName}
                    </span>
                </li>
            </ul>
        </>
    )
};

export default memo(DoctorWithSpecialization)
