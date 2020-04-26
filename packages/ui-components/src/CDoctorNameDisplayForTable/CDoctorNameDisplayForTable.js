import React, {memo} from 'react';


const CDoctorNameDisplayForTable = (props) => {
    return (
        <>
            <ul className="doctor-column">
                <li>
                        Dr. {props.node.data.doctorName}
                </li>
            </ul>
        </>
    )
};

export default memo(CDoctorNameDisplayForTable)
