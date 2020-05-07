import React from 'react';
import DoctorDutyRosterShiftWiseHOC from "../DoctorDutyRosterShiftWiseHOC";
import {DoctorInformationForm} from "@frontend-appointment/ui-components";

const DoctorDutyRosterShiftWiseAdd = (props) => {
    const DoctorDutyRosterShiftWiseAdd = DoctorDutyRosterShiftWiseHOC(
        ({doctorInformationFormData}) => (
            <>
                <DoctorInformationForm doctorInformationFormData={doctorInformationFormData}/>
            </>), props, "ADD");

    return <DoctorDutyRosterShiftWiseAdd/>
};

export default DoctorDutyRosterShiftWiseAdd;
