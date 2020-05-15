import React from 'react';
import DoctorDutyRosterShiftWiseHOC from "../DoctorDutyRosterShiftWiseHOC";
import {DoctorDutyRosterComponents} from "@frontend-appointment/ui-components";

import '../doctor-duty-roster-shift-wise.scss';

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
                    doctorInformationFormData.isCreatingRosterAvailable && weekdaysRosterFormData.shiftDetails.length ?
                        <DoctorDutyRosterComponents.WeekdaysRosterForm
                            type={"ADD"}
                            weekdaysRosterFormData={weekdaysRosterFormData}/>
                        : ''
                }
            </>), props, "ADD");

    return <DoctorDutyRosterShiftWiseAdd/>
};

export default DoctorDutyRosterShiftWiseAdd;
