import React from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import {
    CButton,
    CCheckbox,
    CFLabel,
    CForm,
    CHybridInput,
    CHybridSelect,
    CHybridSelectWithImage,
    CRadioButton
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
        specializationList
    } = doctorInformationFormData;

    return <>
        <div className="department-setup">
            <Container className="bg-white add-container " fluid>
                <CButton
                    className="mt-2 pl-0 mb-2  float-right"
                    id="show-existing"
                    variant="link"
                    size="lg"
                    // onClickHandler={(getExistingRoster)}
                    name="*Existing Availability"/>
                <Col sm="6 p-0">
                    <h5 className="title">Doctor Information</h5>
                </Col>
                <Col sm="12" className="p-0">
                    <CForm
                        id="profile-info"
                        className="mt-2 add-info">
                        <Row>
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
                                    // noOptionsMessage={() => doctorDropdownErrorMessage ? doctorDropdownErrorMessage : "No Doctor(s) found."}
                                    onKeyDown={(event) => onEnterKeyPress(event)}
                                    onChange={(event) => onInputChange(event, '')}
                                    value={doctorInformationData.doctor}
                                />
                            </Col>

                            <Col sm={12} md={4} lg={4}>
                                <CHybridInput
                                    id="duration"
                                    label="Duration"
                                    type="number"
                                    name="rosterGapDuration"
                                    placeholder="Enter Duration In Minutes."
                                    onKeyDown={(event) => onEnterKeyPress(event)}
                                    onChange={(event) => onInputChange(event, '')}
                                    value={doctorInformationData.rosterGapDuration}
                                />
                            </Col>

                            <Col sm={12} md={4} lg={4}>
                                <CFLabel labelName="Status" id="status"/>
                                <div>
                                    <CRadioButton
                                        checked={doctorInformationData.status === 'Y'}
                                        id="radio1"
                                        label="Active"
                                        type="radio"
                                        name="status"
                                        value="Y"
                                        disabled={true}
                                        onKeyDown={event => onEnterKeyPress(event)}
                                        onChange={event => onInputChange(event)}
                                        readOnly={true}
                                    />
                                    {/*{*/}
                                    {/*    <CRadioButton*/}
                                    {/*        checked={adminInfoObj.status === 'N'}*/}
                                    {/*        id="radio2"*/}
                                    {/*        label="Inactive"*/}
                                    {/*        type="radio"*/}
                                    {/*        name="status"*/}
                                    {/*        value="N"*/}
                                    {/*        onKeyDown={event => onEnterKeyPress(event)}*/}
                                    {/*        onChange={event => onInputChange(event)}*/}
                                    {/*        className="sr-only"*/}
                                    {/*        disabled={true}*/}
                                    {/*        readOnly={true}*/}
                                    {/*    />*/}
                                    {/*}*/}
                                </div>
                            </Col>
                            <Col sm={12} md={4} lg={4}>
                            </Col>
                        </Row>
                    </CForm>
                </Col>
                {
                    doctorInformationData.doctor ?
                        <>
                            <Col sm="6 p-0">
                                <h5 className="title">Shift Information</h5>
                            </Col>
                            <CButton
                                id="addNewShift"
                                variant='outline-secondary'
                                size='lg'
                                name=''
                                className="mb-2  float-right"
                                // disabled={hasOverrideDutyRoster === 'N'}
                                // onClickHandler={setShowAddOverrideModal}
                            >
                                <><i className='fa fa-plus'/> New Shift</>
                            </CButton>

                            <Col sm="12" className="p-0">
                                {doctorInformationData.doctorShifts.map(shift => (
                                    <CCheckbox
                                        id={"doctor-shift" + shift.value}
                                        label={shift.label}
                                        checked={shift.isChecked}
                                        onChange={onInputChange}
                                    />
                                ))}
                            </Col>
                        </>
                        : ''
                }
            </Container>
        </div>
    </>
};

export default DoctorInformationForm;
