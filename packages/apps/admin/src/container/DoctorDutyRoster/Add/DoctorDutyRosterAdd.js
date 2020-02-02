import React from 'react';
import {Container, Row} from "react-bootstrap";
import DoctorDutyRosterHOC from '../DoctorDutyRosterHOC';
import {CModal} from "@frontend-appointment/ui-elements";

import ExistingRooster from './ExistingRoster';
import AddDoctorInfoForm from "./AddDoctorInfoForm";
import DoctorAvailabilityForm from "../common/DoctorAvailabilityForm";
import DoctorAvailabilityOverrides from "../common/DoctorAvailabiltyOverrides";

import "./../doctor-duty-roster.scss";

const DoctorDutyRoosterAdd = props => {
    const DoctorDutyRoosterAdd =
        DoctorDutyRosterHOC(
            ({
                 showExistingRosterModal,
                 doctorInfoData,
                 hospitalList,
                 specializationList,
                 doctorList,
                 doctorDropdownErrorMessage,
                 specializationDropdownError,
                 handleInputChange,
                 handleDateChange,
                 handleEnter,
                 handleShowExistingRoster,

             }) =>
                <>
                    <Container className="p-0" fluid>
                        <Row className="mb-2">
                            <AddDoctorInfoForm
                                doctorInfoData={doctorInfoData}
                                hospitalList={hospitalList}
                                specializationList={specializationList}
                                specializationDropdownError={specializationDropdownError}
                                doctorList={doctorList}
                                doctorDropdownErrorMessage={doctorDropdownErrorMessage}
                                onEnterKeyPress={handleEnter}
                                onInputChange={handleInputChange}
                                onDateChange={handleDateChange}
                            />
                            <DoctorAvailabilityForm
                                doctorInfoData={doctorInfoData}
                                onTimeChange={handleDateChange}/>
                        </Row>
                        <Row>
                            <DoctorAvailabilityOverrides/>
                        </Row>
                    </Container>
                    <CModal
                        show={showExistingRosterModal}
                        modalHeading="Existing Doctor Roster"
                        size="lg"
                        bodyChildren={<ExistingRooster/>}
                        onHide={handleShowExistingRoster}
                        centered={false}
                        dialogClassName="preview-modal"
                        closeButton={true}/>
                </>,
            props);
    return <DoctorDutyRoosterAdd/>
};

export default DoctorDutyRoosterAdd;
