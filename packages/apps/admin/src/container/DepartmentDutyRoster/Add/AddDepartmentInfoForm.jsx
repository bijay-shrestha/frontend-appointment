import React from 'react';
import {Col, Form} from "react-bootstrap";
import {
    CButton,
    CCheckbox,
    CFLabel,
    CHybridInput,
    CHybridSelect,
    CRadioButton
} from "@frontend-appointment/ui-elements";
import {CEnglishDatePicker} from "@frontend-appointment/ui-components";

const AddDepartmentInfoForm = ({departmentInfoFormData}) => {
    const {
        hospitalList,
        departmentList,
        roomList,
        departmentInfoData,
        onInputChange,
        onEnterKeyPress,
        departmentDropdownError,
        roomDropdownErrorMessage,
        getExistingRoster,
        dateErrorMessage
    } = departmentInfoFormData;

    return <>
        <Col md={12} lg={4} className="info-container">
            <div className="doctor-info bg-white p-4">
                <h5 className="title mb-4">General Information</h5>
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
                            selected={departmentInfoData.fromDate}
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
                            selected={departmentInfoData.toDate}
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
                        placeholder="Select Client."
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event) => onInputChange(event, '')}
                        value={departmentInfoData.hospital}
                    />

                    <CHybridSelect
                        id="department"
                        label="Department"
                        name="department"
                        isDisabled={!departmentInfoData.hospital || !departmentList.length}
                        options={departmentList}
                        placeholder={!departmentInfoData.hospital ? "Select Client First"
                            : departmentList.length ? "Select Department." : "No Department(s) available."}
                        noOptionsMessage={() => departmentDropdownError}
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event) => onInputChange(event, '')}
                        value={departmentInfoData.department}
                    />

                    <div className="room-check">

                    <CCheckbox
                        id="enable-room"
                        label="Enable Room (optional)"
                        name="isRoomEnabled"
                        className="select-all check-all"
                        checked={departmentInfoData.isRoomEnabled === 'Y'}
                        onChange={(event) => onInputChange(event, '')}
                    >
                    </CCheckbox>

                    {
                        departmentInfoData.isRoomEnabled === 'Y' ?
                            <CHybridSelect
                                id="room"
                                label="Room Number"
                                name="room"
                                isDisabled={!departmentInfoData.department || !roomList.length}
                                placeholder={!departmentInfoData.department ? "Select Department first."
                                    : roomList.length ? "Select Room Number." : "No Room Number(s) available."}
                                options={roomList}
                                noOptionsMessage={() => roomDropdownErrorMessage ? roomDropdownErrorMessage : "No Room Number(s) found."}
                                onKeyDown={(event) => onEnterKeyPress(event)}
                                onChange={(event) => onInputChange(event, '')}
                                value={departmentInfoData.room}
                            /> :
                            ''
                    }

                    </div>

                    <CHybridInput
                        id="duration"
                        label="Duration"
                        type="number"
                        name="rosterGapDuration"
                        placeholder="Enter Duration In Minutes."
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event) => onInputChange(event, '')}
                        value={departmentInfoData.rosterGapDuration}
                    />
                    <CFLabel labelName="Status" id="status"/>
                    <div>
                        <CRadioButton
                            checked={departmentInfoData.status === 'Y'}
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
                    </div>

                </Form>

                <CButton
                    className="mt-2 pl-0"
                    id="show-existing"
                    variant="link"
                    size="lg"
                    onClickHandler={getExistingRoster}
                    name="*Existing Availability"/>
            </div>
        </Col>
    </>
};

export default AddDepartmentInfoForm;
