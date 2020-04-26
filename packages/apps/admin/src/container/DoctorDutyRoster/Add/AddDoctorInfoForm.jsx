import React from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {CButton, CFLabel, CHybridInput, CHybridSelect, CRadioButton} from "@frontend-appointment/ui-elements";
import {CEnglishDatePicker} from "@frontend-appointment/ui-components";

const AddDoctorInfoForm = ({
                               hospitalList,
                               specializationList,
                               doctorList,
                               doctorInfoData,
                               onInputChange,
                               onEnterKeyPress,
                               specializationDropdownError,
                               doctorDropdownErrorMessage,
                               getExistingRoster,
                               dateErrorMessage
                           }) => {
    return <>
        <Col md={12} lg={5} className="info-container">
            <div className="doctor-info bg-white p-4">
                <h5 className="title mb-4">Doctor Info</h5>
                <Form>
                    {/*<Form.Label>Date</Form.Label>*/}
                    <div className="d-flex">
                        <CEnglishDatePicker
                            id="from-date"
                            name="fromDate"
                            label="From Date"
                            dateFormat="yyyy-MM-dd"
                            minDate={0}
                            showDisabledMonthNavigation={true}
                            selected={doctorInfoData.fromDate}
                            peekNextMonth={true}
                            showMonthDropdown={true}
                            showYearDropdown={true}
                            dropdownMode="select"
                            invalid={dateErrorMessage ? true : false}
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
                            selected={doctorInfoData.toDate}
                            peekNextMonth={true}
                            showMonthDropdown={true}
                            showYearDropdown={true}
                            dropdownMode="select"
                            invalid={dateErrorMessage ? true : false}
                            onKeyDown={(event) => onEnterKeyPress(event)}
                            onChange={(date) => onInputChange(date, "toDate")}
                        />

                    </div>
                    <div>
                        {dateErrorMessage ?
                            <p className="date-error">
                                {dateErrorMessage}</p> : ''}
                    </div>

                    <CHybridSelect
                        id="hospital"
                        label="Client"
                        name="hospital"
                        options={hospitalList}
                        placeholder="Select client."
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event) => onInputChange(event, '')}
                        value={doctorInfoData.hospital}
                    />

                    <CHybridSelect
                        id="specialization"
                        label="Specialization"
                        name="specialization"
                        isDisabled={!doctorInfoData.hospital}
                        options={specializationList}
                        placeholder={!doctorInfoData.hospital ? "Select Client First" : "Select specialization."}
                        noOptionsMessage={() => specializationDropdownError}
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event) => onInputChange(event, '')}
                        value={doctorInfoData.specialization}
                    />
                    <CHybridSelect
                        id="doctor"
                        label="Doctor"
                        name="doctor"
                        isDisabled={!doctorInfoData.specialization}
                        placeholder={!doctorInfoData.specialization ? "Select Specialization first" : "Select doctor."}
                        options={doctorList}
                        noOptionsMessage={() => doctorDropdownErrorMessage}
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event) => onInputChange(event, '')}
                        value={doctorInfoData.doctor}
                    />

                    <CHybridInput
                        id="duration"
                        label="Duration"
                        type="number"
                        name="rosterGapDuration"
                        placeholder="Enter Duration In Minutes."
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event) => onInputChange(event, '')}
                        value={doctorInfoData.rosterGapDuration}
                    />
                    <CFLabel labelName="Status" id="status"/>
                    <div>
                        <CRadioButton
                            checked={doctorInfoData.status === 'Y'}
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

                </Form>

                <CButton
                    id="show-existing"
                    variant="link"
                    size="lg"
                    onClickHandler={getExistingRoster}
                    name="*Existing Availability"/>
            </div>
        </Col>
    </>
};

export default AddDoctorInfoForm;
