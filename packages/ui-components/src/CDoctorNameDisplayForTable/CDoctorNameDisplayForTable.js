import React, {memo} from 'react';


const CDoctorNameDisplayForTable = (props) => {
    return (
        <>
        Dr. {props.node.data.doctorName}
              
        </>
    )
};

export default memo(CDoctorNameDisplayForTable)
