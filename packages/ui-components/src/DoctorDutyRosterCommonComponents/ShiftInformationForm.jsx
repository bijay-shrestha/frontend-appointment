import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {CButton, CCheckbox, CHybridInput} from "@frontend-appointment/ui-elements";

const ShiftInformation = ({doctorInformationFormData, overrideRosterProps}) => {
    const {
        handleAssignNewShiftToDoctor,
        handleShiftSelection,
        shiftErrorMessage,
        isCreatingRosterAvailable,
        doctorInformationData,
        onEnterKeyPress,
    } = doctorInformationFormData;

    const {hasOverride} = overrideRosterProps;

    return <>
        {
            isCreatingRosterAvailable ?
                <div className="department-setup">
                    <Container className="bg-white add-container " fluid>
                        <Row>
                            <Col sm="6 p-0">
                                <h5 className="title">Shift Information</h5>
                            </Col>
                            <Col>
                                <CButton
                                    id="addNewShift"
                                    variant='outline-secondary'
                                    size='lg'
                                    name=''
                                    className="mb-2  float-right"
                                    disabled={hasOverride === "Y"}
                                    onClickHandler={handleAssignNewShiftToDoctor}
                                >
                                    <><i className='fa fa-plus'/> New Shift</>
                                </CButton>
                            </Col>
                        </Row>


                        {
                            doctorInformationData.doctorShifts.length ?
                                <Row>
                                    {doctorInformationData.doctorShifts.map((shift, index) => (
                                        <React.Fragment key={shift.value}>
                                            <Col sm={2} key={"doctor-shift-" + shift.value}>
                                                <CCheckbox
                                                    id={"shift-" + shift.value}
                                                    key={"doctor-shift" + shift.value}
                                                    name={shift.label}
                                                    label={shift.label}
                                                    className="select-all check-all"
                                                    checked={shift.checked}
                                                    onChange={() => handleShiftSelection(shift, index, false, '')}
                                                    disabled={hasOverride === 'Y'}
                                                    readOnly={hasOverride === 'Y'}
                                                />
                                            </Col>
                                            <Col sm={12} md={4} lg={4}
                                                 key={"doctor-shift-roster-gap-duration" + shift.value}>
                                                <CHybridInput
                                                    key={"roster-gap-duration" + shift.value}
                                                    id="duration"
                                                    label="Duration"
                                                    type="number"
                                                    name="rosterGapDuration"
                                                    disabled={!shift.checked || hasOverride === 'Y'}
                                                    placeholder="Enter Duration In Minutes."
                                                    onKeyDown={(event) => onEnterKeyPress(event)}
                                                    onChange={(event) => handleShiftSelection(shift, index, true, event)}
                                                    value={shift.rosterGapDuration}
                                                />
                                            </Col>
                                        </React.Fragment>
                                    ))}
                                </Row>
                                :
                                <div className="filter-message">
                                    <div className="no-data">
                                        <i className="fa fa-file-text-o"/>
                                    </div>
                                    <div className="message"> {shiftErrorMessage}</div>
                                </div>
                        }

                    </Container>
                </div>
                : ''
        }
    </>;
};
export default ShiftInformation;
