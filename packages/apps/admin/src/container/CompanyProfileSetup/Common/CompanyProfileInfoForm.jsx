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

const CompanyProfileInfoForm = ({profileInfoFormData, type}) => {
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
                        checked={profileInfoObj.status === 'Y'}
                        disabled={type === 'ADD'}
                        id="radio1"
                        label="Active"
                        type="radio"
                        name="status"
                        readOnly={type === 'ADD'}
                        value="Y"
                        onChange={(event) => handleInputChange(event)}
                        onKeyDown={(event) => handleEnter(event)}
                    />
                    <CRadioButton
                        checked={profileInfoObj.status === 'N'}
                        disabled={type === 'ADD'}
                        id="radio2"
                        label="Inactive"
                        type="radio"
                        name="status"
                        readOnly={type === 'ADD'}
                        className={type === 'ADD' ? "sr-only" : ''}
                        value="N"
                        onChange={(event) => handleInputChange(event)}
                        onKeyDown={(event) => handleEnter(event)}
                    />
                </div>

                {
                    type === 'MANAGE' ?
                        <CHybridTextArea
                            id="remarks"
                            name="remarks"
                            onChange={handleInputChange}
                            onKeyDown={(event) => handleEnter(event)}
                            placeholder="Remarks"
                            value={profileInfoObj.remarks}
                            max={200}
                            required={true}
                        />
                        : ''
                }
            </CForm>
        </Col>
    );
};

export default CompanyProfileInfoForm;
