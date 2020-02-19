import React from 'react';
import {Col} from "react-bootstrap";
import {
    CFLabel,
    CForm,
    CHybridInput,
    CHybridSelect,
    CHybridTextArea,
    CRadioButton
} from "@frontend-appointment/ui-elements";

const ProfileInfoForm = ({
                             onEnterKeyPress,
                             departmentList,
                             hospitalList,
                             onInputChange,
                             profileInfoObj,
                             errorMessageForProfileName,
                             errorMessageForProfileDescription
                         }) => {
    return (
        <Col sm={12} md={12} lg={4}>
            <h5 className="title">Profile Info</h5>
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
                    label="Hospital"
                    name="selectedHospital"
                    onChange={(event) => onInputChange(event)}
                    options={hospitalList}
                    value={profileInfoObj.hospitalValue}
                    placeholder={'Select Hospital.'}
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
                    isDisabled={!profileInfoObj.hospitalValue}
                />

                <CFLabel labelName="Status" id="status"></CFLabel>
                <div>
                <CRadioButton
                    checked={Boolean(profileInfoObj.status)}
                    disabled={true}
                    id="radio1"
                    label="Active"
                    type="radio"
                    readOnly
                    // bsPrefix="form-radio"
                />
                <CRadioButton
                    checked={Boolean(!profileInfoObj.status)}
                    disabled={true}
                    id="radio2"
                    label="Inactive"
                    type="radio"
                    className="sr-only"
                />
                </div>
            </CForm>
        </Col>
    );
};

export default ProfileInfoForm;