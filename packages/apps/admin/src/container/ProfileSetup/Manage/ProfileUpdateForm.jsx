import React from 'react';
import {CFLabel, CForm, CHybridInput, CHybridSelect, CHybridTextArea, CRadioButton} from "@frontend-appointment/ui-elements";
import {Col} from "react-bootstrap";

const ProfileUpdateForm = ({
                               onEnterKeyPress,
                               departmentList,
                               onInputChange,
                               profileInfoObj,
                               errorMessageForProfileName,
                               errorMessageForProfileDescription
                           }) => {
    return <>
        <Col sm={12} md={12} lg={4}>
            <h5>Profile Info</h5>
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
                    id="department"
                    label="Department"
                    name="selectedDepartment"
                    onKeyDown={(event) => onEnterKeyPress(event)}
                    onChange={(event) => onInputChange(event)}
                    options={departmentList}
                    value={profileInfoObj.departmentValue}
                    placeholder="Select department"
                />

                <CHybridSelect
                    id="sub-department"
                    isDisabled={!profileInfoObj.departmentValue}
                    onKeyDown={(event) => onEnterKeyPress(event)}
                    label="Sub Department"
                    name="selectedSubDepartment"
                    onChange={(event) => onInputChange(event)}
                    options={profileInfoObj.subDepartmentList}
                    value={profileInfoObj.subDepartmentValue}
                    placeholder={!profileInfoObj.departmentValue ? 'Select department first.' : 'Select Sub Department'}
                />

                <CFLabel labelName="Status" id="status"></CFLabel>
                <CRadioButton
                    checked={profileInfoObj.status === "Y"}
                    id="radio1"
                    label="Active"
                    type="radio"
                    name="status"
                    value="Y"
                    onChange={(event) => onInputChange(event)}
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
                />
            </CForm>
        </Col>
    </>;
};

export default ProfileUpdateForm;
