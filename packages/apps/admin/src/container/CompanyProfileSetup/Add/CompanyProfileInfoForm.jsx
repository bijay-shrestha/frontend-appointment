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

const CompanyProfileInfoForm = ({profileInfoFormData}) => {
    const {
        handleEnter,
        companyListForDropdown,
        handleInputChange,
        profileInfoObj,
        errorMessageForProfileName,
        errorMessageForProfileDescription
    } = profileInfoFormData;
    return (
        <Col sm={12} md={12} lg={4}>
            <h5 className="title">Profile Info</h5>
            <CForm
                id="profile-info"
                className="mt-2 profile-info">
                <CHybridInput
                    id="profile-name"
                    name="profileName"
                    onKeyDown={(event) => handleEnter(event)}
                    onChange={(event, validity) => handleInputChange(event, validity)}
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
                    onKeyDown={(event) => handleEnter(event)}
                    onChange={(event, validity) => handleInputChange(event, validity)}
                    placeholder="Profile Description"
                    value={profileInfoObj.profileDescription}
                    required={true}
                    hasValidation={true}
                    maxLength={200}
                    errorMessagePassed={errorMessageForProfileDescription}
                />

                <CHybridSelect
                    id="company"
                    onKeyDown={(event) => handleEnter(event)}
                    label="Company"
                    name="company"
                    onChange={(event) => handleInputChange(event)}
                    options={companyListForDropdown}
                    value={profileInfoObj.company}
                    placeholder={'Select Hospital.'}
                />

                <CFLabel labelName="Status" id="status"/>
                <div>
                    <CRadioButton
                        checked={Boolean(profileInfoObj.status)}
                        disabled={true}
                        id="radio1"
                        label="Active"
                        type="radio"
                        readOnly
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

export default CompanyProfileInfoForm;
