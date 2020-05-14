import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {
    CButton,
    CCheckbox,
    CForm,
    CHybridInput,
    CHybridSelect,
    CHybridSelectWithImage
} from "@frontend-appointment/ui-elements";
import {CEnglishDatePicker} from "../../index";
import {EnvironmentVariableGetter} from "@frontend-appointment/helpers";

const isAdminModule = EnvironmentVariableGetter.REACT_APP_MODULE_CODE === EnvironmentVariableGetter.ADMIN_MODULE_CODE;

const DoctorInformationForm = ({doctorInformationFormData}) => {
    const {
        doctorInformationData,
        doctorList,
        hospitalList,
        onInputChange,
        onEnterKeyPress,
        specializationList,
        handleAssignNewShiftToDoctor,
        handleShiftSelection,
        isCreatingRosterAvailable,
        handleCheckAvailability,
        shiftErrorMessage
    } = doctorInformationFormData;

    let allowCheckAvailability = doctorInformationData.hospital && doctorInformationData.specialization &&
        doctorInformationData.doctor && doctorInformationData.fromDate && doctorInformationData.toDate
        && !doctorInformationData.dateErrorMessage;

    return <>
        <div className="department-setup">
            <Container className="bg-white add-container " fluid>
                <Col sm="6 p-0">
                    <h5 className="title">Doctor Information</h5>
                </Col>
                <Col sm="12" className="p-0">
                    <CForm
                        id="doctor-info"
                        className="mt-2 add-info"
                    >
                        <Row>
                            {
                                isAdminModule ?
                                    <Col sm={12} md={4} lg={4}>
                                        <CHybridSelect
                                            id="hospital"
                                            label="Client"
                                            name="hospital"
                                            options={hospitalList}
                                            placeholder={hospitalList.length ? "Select Client." : "No Client(s) available."}
                                            isDisabled={!hospitalList.length}
                                            onKeyDown={(event) => onEnterKeyPress(event)}
                                            onChange={(event) => onInputChange(event, '')}
                                            value={doctorInformationData.hospital}
                                        />
                                    </Col>
                                    : ''
                            }
                            <Col sm={12} md={4} lg={4}>
                                <div className="d-flex">
                                    <CEnglishDatePicker
                                        id="from-date"
                                        name="fromDate"
                                        label="From Date"
                                        dateFormat="yyyy-MM-dd"
                                        minDate={0}
                                        showDisabledMonthNavigation={true}
                                        selected={doctorInformationData.fromDate}
                                        peekNextMonth={true}
                                        showMonthDropdown={true}
                                        showYearDropdown={true}
                                        dropdownMode="select"
                                        invalid={doctorInformationData.dateErrorMessage ? true : false}
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(date) => onInputChange(date, "fromDate")}
                                    />
                                    &nbsp;&nbsp;
                                    <CEnglishDatePicker
                                        id="to-date"
                                        name="toDate"
                                        label="To Date"
                                        dateFormat="yyyy-MM-dd"
                                        minDate={0}
                                        showDisabledMonthNavigation={true}
                                        selected={doctorInformationData.toDate}
                                        peekNextMonth={true}
                                        showMonthDropdown={true}
                                        showYearDropdown={true}
                                        dropdownMode="select"
                                        invalid={doctorInformationData.dateErrorMessage ? true : false}
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(date) => onInputChange(date, "toDate")}
                                    />
                                </div>
                                <div>
                                    {doctorInformationData.dateErrorMessage ?
                                        <p className="date-error">
                                            {doctorInformationData.dateErrorMessage}</p> : ''}
                                </div>
                            </Col>

                            <Col sm={12} md={4} lg={4}>
                                <CHybridSelect
                                    id="specialization"
                                    label="Specialization"
                                    name="specialization"
                                    options={specializationList}
                                    isDisabled={isAdminModule ? (!doctorInformationData.hospital || !specializationList.length)
                                        : !specializationList.length}
                                    placeholder={(isAdminModule && !doctorInformationData.hospital)
                                        ? "Select Client first."
                                        : specializationList.length ? "Select Specialization." : "No Specialization(s) available."}
                                    onKeyDown={(event) => onEnterKeyPress(event)}
                                    onChange={(event) => onInputChange(event, '')}
                                    value={doctorInformationData.specialization}
                                />
                            </Col>

                            <Col sm={12} md={4} lg={4}>
                                <CHybridSelectWithImage
                                    id="doctor"
                                    label="Doctor"
                                    name="doctor"
                                    isDisabled={!doctorInformationData.specialization || !doctorList}
                                    placeholder={!doctorInformationData.specialization ? "Select Specialization first."
                                        : doctorList.length ? "Select Doctor." : "No Doctor(s) available."}
                                    options={doctorList}
                                    onKeyDown={(event) => onEnterKeyPress(event)}
                                    onChange={(event) => onInputChange(event, '')}
                                    value={doctorInformationData.doctor}
                                />
                            </Col>

                            {
                                !isCreatingRosterAvailable ?
                                    <Col sm={12} md={4} lg={4}>
                                        <CButton
                                            id="checkAvailability"
                                            variant="primary"
                                            size="sm"
                                            className=" btn-action mr-2"
                                            name="Check Availability"
                                            disabled={!allowCheckAvailability}
                                            onClickHandler={handleCheckAvailability}
                                        />
                                    </Col> : ""
                            }
                        </Row>
                    </CForm>
                </Col>
                {
                    isCreatingRosterAvailable ?
                        <>
                            <Row>
                                <Col>
                                    <h5 className="title">Shift Information</h5>
                                </Col>
                                <Col>
                                    <CButton
                                        id="addNewShift"
                                        variant='outline-secondary'
                                        size='lg'
                                        name=''
                                        className="mb-2  float-right"
                                        // disabled={}
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
                                            <>
                                                <Col sm={2} key={"doctor-shift" + shift.value}>
                                                    <CCheckbox
                                                        id={"doctor-shift" + shift.value}
                                                        key={"doctor-shift" + shift.value}
                                                        name={shift.label}
                                                        label={shift.label}
                                                        className="select-all check-all"
                                                        checked={shift.checked}
                                                        onChange={() => handleShiftSelection(shift, index, false, '')}
                                                    />
                                                </Col>
                                                <Col sm={12} md={4} lg={4}>
                                                    <CHybridInput
                                                        key={"doctor-shift" + shift.value}
                                                        id="duration"
                                                        label="Duration"
                                                        type="number"
                                                        name="rosterGapDuration"
                                                        disabled={!shift.checked}
                                                        placeholder="Enter Duration In Minutes."
                                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                                        onChange={(event) => handleShiftSelection(shift, index, true, event)}
                                                        value={shift.rosterGapDuration}
                                                    />
                                                </Col>
                                            </>
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
                        </>
                        : ''
                }
            </Container>
        </div>
    </>
};

export default DoctorInformationForm;
