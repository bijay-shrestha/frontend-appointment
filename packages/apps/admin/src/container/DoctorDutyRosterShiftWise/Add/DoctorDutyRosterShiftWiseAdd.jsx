import React from 'react';
import DoctorDutyRosterShiftWiseHOC from "../DoctorDutyRosterShiftWiseHOC";
import {DoctorDutyRosterComponents} from "@frontend-appointment/ui-components";

const DoctorDutyRosterShiftWiseAdd = (props) => {
    const DoctorDutyRosterShiftWiseAdd = DoctorDutyRosterShiftWiseHOC(
        ({doctorInformationFormData, assignNewShiftModalData}) => (
            <>
                <DoctorDutyRosterComponents.DoctorInformationForm
                    doctorInformationFormData={doctorInformationFormData}/>
                {assignNewShiftModalData.showAssignShiftToDoctorModal ?
                    <DoctorDutyRosterComponents.AssignNewShiftToDoctorModal
                        assignNewShiftModalData={assignNewShiftModalData}/>
                    : ''}
            </>), props, "ADD");

    return <DoctorDutyRosterShiftWiseAdd/>
};

export default DoctorDutyRosterShiftWiseAdd;
