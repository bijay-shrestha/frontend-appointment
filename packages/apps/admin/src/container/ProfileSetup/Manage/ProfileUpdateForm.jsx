import React from 'react';
import {CFLabel, CForm, CHybridInput, CHybridSelect, CHybridTextArea, CRadioButton} from "@frontend-appointment/ui-elements";
import {Col} from "react-bootstrap";

const ProfileUpdateForm = ({
                               onEnterKeyPress,
                               hospitalList,
                               onInputChange,
                               profileInfoObj,
                               errorMessageForProfileName,
                               errorMessageForProfileDescription
                           }) => {
    return <>
        <Col sm={12} md={12} lg={4}>
            <h5>Client Profile Information</h5>
            <CForm
                id="profile-info"
                className="mt-2 profile-info">
                <CHybridInput
                    id="profile-name"
                    name="profileName"
                    onKeyDown={(event) => onEnterKeyPress(event)}
                    onChange={(event, validity) => onInputChange(event, validity)}
                    placeholder="Profile Name"
                    value={profileInfoObj.profileName}
                    required={true}
                    hasValidation={true}
                    fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                    errorMessagePassed={errorMessageForProfileName}
                />

                <CHybridTextArea
                    id="profile-description"
                    name="profileDescription"
                    onKeyDown={(event) => onEnterKeyPress(event)}
                    onChange={(event, validity) => onInputChange(event, validity)}
                    placeholder="Profile Description"
                    value={profileInfoObj.profileDescription}
                    required={true}
                    hasValidation={true}
                    maxLength={200}
                    errorMessagePassed={errorMessageForProfileDescription}
                />

                <CHybridSelect
                    id="hospital"
                    onKeyDown={(event) => onEnterKeyPress(event)}
                    label="Client"
                    name="selectedHospital"
                    onChange={(event) => onInputChange(event)}
                    options={hospitalList}
                    value={profileInfoObj.hospitalValue}
                    placeholder={'Select client.'}
                />

                <CHybridSelect
                    id="department"
                    label="Unit"
                    name="selectedDepartment"
                    onKeyDown={(event) => onEnterKeyPress(event)}
                    onChange={(event) => onInputChange(event)}
                    options={profileInfoObj.departmentList}
                    value={profileInfoObj.departmentValue}
                    placeholder={!profileInfoObj.hospitalValue ? 'Select Client first.' : 'Select Unit.'}
                />
                <div className="status-box">
                <CFLabel labelName="Status" id="status"></CFLabel>
                <CRadioButton
                    checked={profileInfoObj.status === "Y"}
                    id="radio1"
                    label="Active"
                    type="radio"
                    name="status"
                    value="Y"
                    onChange={(event) => onInputChange(event)}
                    onKeyDown={(event) => onEnterKeyPress(event)}
                    // bsPrefix="form-radio"
                />
                <CRadioButton
                    checked={profileInfoObj.status === "N"}
                    id="radio2"
                    label="Inactive"
                    type="radio"
                    name="status"
                    value="N"
                    onChange={(event) => onInputChange(event)}
                    onKeyDown={(event) => onEnterKeyPress(event)}
                />
                </div>

                <CHybridTextArea
                className="mt-3"
                    id="remarks"
                    name="remarks"
                    onChange={onInputChange}
                    // onKeyDown={(event) => onEnterKeyPress(event)}
                    placeholder="Remarks"
                    value={profileInfoObj.remarks}
                    max={200}
                    required={true}
                />
            </CForm>
        </Col>
    </>;
};

export default ProfileUpdateForm;
