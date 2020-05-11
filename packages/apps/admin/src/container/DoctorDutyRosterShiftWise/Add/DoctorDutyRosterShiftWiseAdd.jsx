import React from 'react';
import DoctorDutyRosterShiftWiseHOC from "../DoctorDutyRosterShiftWiseHOC";
import {DoctorDutyRosterComponents} from "@frontend-appointment/ui-components";

const DoctorDutyRosterShiftWiseAdd = (props) => {
    const DoctorDutyRosterShiftWiseAdd = DoctorDutyRosterShiftWiseHOC(
        ({
             doctorInformationFormData,
             assignNewShiftModalData,
             weekdaysRosterFormData
         }) => (
            <>
                <DoctorDutyRosterComponents.DoctorInformationForm
                    doctorInformationFormData={doctorInformationFormData}/>
                {assignNewShiftModalData.showAssignShiftToDoctorModal ?
                    <DoctorDutyRosterComponents.AssignNewShiftToDoctorModal
                        assignNewShiftModalData={assignNewShiftModalData}/>
                    : ''}
                {
                    doctorInformationFormData.isCreatingRosterAvailable ?
                        <DoctorDutyRosterComponents.WeekdaysRosterForm weekdaysRosterFormData={weekdaysRosterFormData}/>
                        : ''
                }
            </>), props, "ADD");

    return <DoctorDutyRosterShiftWiseAdd/>
};

export default DoctorDutyRosterShiftWiseAdd;
