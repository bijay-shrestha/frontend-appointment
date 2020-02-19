import React, {memo} from 'react'

const DoctorWithSpecialization = (props) => {
    return (
        <>
            <ul className="doctor-column">
                <li>
                    Dr. {props.node.data.doctorName.toUpperCase()}
                </li>
                <li>
                    ({props.node.data.specializationName.toUpperCase()})
                </li>
            </ul>
        </>
    )
};

export default memo(DoctorWithSpecialization)
