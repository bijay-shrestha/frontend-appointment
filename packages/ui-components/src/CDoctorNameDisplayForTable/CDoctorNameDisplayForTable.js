import React, {memo} from 'react';


const CDoctorNameDisplayForTable = (props) => {
    const {doctorSalutation,doctorName}=props.node.data;
    return (
        <>
        {doctorSalutation ? doctorSalutation.concat(" ") :'Dr. '}{doctorName}

        </>
    )
};

export default memo(CDoctorNameDisplayForTable)
