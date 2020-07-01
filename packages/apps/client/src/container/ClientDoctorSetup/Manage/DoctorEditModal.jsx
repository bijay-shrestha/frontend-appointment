import React, {memo} from 'react'
import {
    CButton,
    CFLabel,
    CForm,
    CHybridInput,
    CHybridSelect,
    CHybridTextArea,
    CModal,
    CRadioButton
} from '@frontend-appointment/ui-elements'
import {CommonUtils} from '@frontend-appointment/helpers'
import {Col, Container, Row} from 'react-bootstrap'
import {CImageUploadAndCropModal} from '@frontend-appointment/ui-components'
import DefaulHospitalImage from '../img/picture.png'

const DoctorEditModal = ({
                             showModal,
                             setShowModal,
                             onEnterKeyPress,
                             onInputChange,
                             doctorData,
                             errorMessageForAppointmentCharge,
                             errorMessageForDoctorContact,
                             errorMessageForDoctorName,
                             errorMessage,
                             editApiCall,
                             formValid,
                             doctorImage,
                             doctorImageCroppedUrl,
                             showImageUploadModal,
                             onImageSelect,
                             handleCropImage,
                             handleImageUpload,
                             setImageShow,
                             activeSpecializationList,
                             qualificationDropdown,
                             isConsultantEditLoading,
                             salutationList,
                             isImageUploading
                         }) => {

    const checkIfSpecializationIdAndHospitalIdMatch = (
        currSpec,
        editSpec
    ) => {
        let newArray = [...currSpec];
        editSpec.map(editSp => {
            let flag = false;
            currSpec && currSpec.map(currSpec => {
                if (currSpec.doctorSpecializationId === editSp.doctorSpecializationId)
                    flag = true
                return currSpec
            });
            !flag && editSpec.length !== currSpec.length && CommonUtils.checkIfTwoArrayEquals(currSpec, editSpec, 'doctorSpecializationId') && newArray.push(editSp)
            return editSp;
        });
        return newArray;
    };

    const bodyContent = (
        <>
            {/* <h5 className="title">Edit Hospital Setup</h5> */}
            <CForm id="admin-info" className="mt-2 add-info">
                <Row>
                    <Col sm={12} md={12} lg={3} className="order-lg-last order-md-first">
                        <div className="image-upload-container">
                            <div className="image-box">
                                <img
                                    alt="doctor"
                                    src={
                                        doctorData.doctorAvatarUrlNew
                                            ? doctorData.doctorAvatarUrlNew :
                                            (doctorData.doctorAvatarUrl
                                                ? doctorData.doctorAvatarUrl
                                                : DefaulHospitalImage)
                                    }
                                />
                                <CButton
                                    id="uploadAdminImage"
                                    name=""
                                    size="lg"
                                    className="upload-button my-1"
                                    onClickHandler={setImageShow}
                                ><i className="fa fa-upload"></i>&nbsp;Upload</CButton>
                                <CImageUploadAndCropModal
                                    showModal={showImageUploadModal}
                                    ruleOfThirds={true}
                                    setShowModal={setImageShow}
                                    handleImageUpload={data => handleImageUpload(data, 'E')}
                                    imageSrc={doctorImage}
                                    croppedImageSrc={doctorImageCroppedUrl}
                                    onImageSelect={e => onImageSelect(e)}
                                    onImageCrop={data => handleCropImage(data)}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={9}>
                        <Row>
                            <Col sm={12} md={12} lg={6}>
                                <CHybridInput
                                    id="doctor-name"
                                    name="name"
                                    type="text"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) =>
                                        onInputChange(event, validity, 'E')
                                    }
                                    placeholder="Doctor Name"
                                    value={doctorData.name}
                                    required={true}
                                    hasValidation={true}
                                    fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                    errorMessagePassed={errorMessageForDoctorName}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridSelect
                                    id="salutation"
                                    name="salutations"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) => onInputChange(event, validity)}
                                    label="Salutation (optional)"
                                    options={salutationList}
                                    value={doctorData.salutations}
                                    required={true}
                                    placeholder={salutationList.length ? "Select Salutation." : "No Salutation(s) available."}
                                    isDisabled={!salutationList.length}
                                    isMulti={true}
                                    className="multiple-select"
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="nmc-number"
                                    name="nmcNumber"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) => onInputChange(event, '', 'E')}
                                    placeholder="Doctor NMC Number"
                                    value={doctorData.nmcNumber}
                                    required={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridSelect
                                    id="specializationIds"
                                    name="specializationIds"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) =>
                                        onInputChange(event, validity, 'E')
                                    }
                                    label="Select Specialization"
                                    options={activeSpecializationList}
                                    isDisabled={!activeSpecializationList.length ? true : false}
                                    value={checkIfSpecializationIdAndHospitalIdMatch(
                                        doctorData.specializationIds,
                                        doctorData.selectedSpecializations
                                    )}
                                    required={true}
                                    isMulti={true}
                                />
                            </Col>


                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="doctor-email"
                                    name="email"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) =>
                                        onInputChange(event, validity, 'E')
                                    }
                                    placeholder="Doctor Email"
                                    value={doctorData.email}
                                    type="email"
                                    required={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridSelect
                                    id="qualificationIds"
                                    name="qualificationIds"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) =>
                                        onInputChange(event, validity, 'E')
                                    }
                                    label="Select Qualifications"
                                    options={qualificationDropdown}
                                    value={doctorData.qualificationIds}
                                    required={true}
                                    isMulti={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="doctor-number"
                                    name="contactNumber"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) =>
                                        onInputChange(event, validity, 'E')
                                    }
                                    placeholder="Doctor Phone Number"
                                    value={doctorData.contactNumber}
                                    required={true}
                                    hasValidation={true}
                                    fieldValuePattern={/^\d{10}$/}
                                    errorMessagePassed={errorMessageForDoctorContact}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="appointment-charge"
                                    name="appointmentCharge"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) =>
                                        onInputChange(event, validity, 'E')
                                    }
                                    placeholder="Doctor Appointment Charge"
                                    value={doctorData.appointmentCharge}
                                    required={true}
                                    hasValidation={true}
                                    fieldValuePattern={
                                        new RegExp('^\\d*(?:\\.\\d{1,' + 2 + '})?$')
                                    }
                                    errorMessagePassed={errorMessageForAppointmentCharge}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="appointment-follow-up-charge"
                                    name="appointmentFollowUpCharge"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) =>
                                        onInputChange(event, validity, 'E')
                                    }
                                    placeholder="Doctor Appointment Follow Up Charge"
                                    value={doctorData.appointmentFollowUpCharge}
                                    required={true}
                                    hasValidation={true}
                                    fieldValuePattern={
                                        new RegExp('^\\d*(?:\\.\\d{1,' + 2 + '})?$')
                                    }
                                    errorMessagePassed={errorMessageForAppointmentCharge}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CFLabel labelName="Gender" id="gender"/>
                                <div>
                                    <CRadioButton
                                        checked={doctorData.genderCode === 'M'}
                                        onKeyDown={event => onEnterKeyPress(event)}
                                        onChange={event => onInputChange(event, '', 'E')}
                                        name="genderCode"
                                        id="radio1"
                                        label="Male"
                                        type="radio"
                                        value="M"
                                    />
                                    <CRadioButton
                                        checked={doctorData.genderCode === 'F'}
                                        onKeyDown={event => onEnterKeyPress(event)}
                                        onChange={event => onInputChange(event, '', 'E')}
                                        name="genderCode"
                                        id="radio2"
                                        label="Female"
                                        type="radio"
                                        value="F"
                                    />
                                    <CRadioButton
                                        checked={doctorData.genderCode === 'O'}
                                        onKeyDown={event => onEnterKeyPress(event)}
                                        onChange={event => onInputChange(event, '', 'E')}
                                        name="genderCode"
                                        id="radio3"
                                        label="Other"
                                        type="radio"
                                        value="O"
                                    />
                                </div>
                            </Col>

                            <Col sm={12} md={12} lg={6}>
                                <CFLabel labelName="Status" id="status"/>
                                <CRadioButton
                                    checked={doctorData.status === 'Y'}
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    id="radio1"
                                    label="Active"
                                    type="radio"
                                    name="status"
                                    value="Y"
                                    onChange={event => onInputChange(event, '', 'E')}
                                />
                                <CRadioButton
                                    checked={doctorData.status === 'N'}
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    id="radio2"
                                    label="Inactive"
                                    type="radio"
                                    name="status"
                                    value="N"
                                    onChange={event => onInputChange(event, '', 'E')}
                                />
                            </Col>

                            <Col sm={12} md={12} lg={6} className="mt-3">
                                <CHybridTextArea
                                    id="remarks"
                                    name="remarks"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) =>
                                        onInputChange(event, validity, 'E')
                                    }
                                    placeholder="Remarks"
                                    value={doctorData.remarks}
                                    max={200}
                                    required={true}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CForm>
        </>
    );
    let footerChildren = (
        <>
            <Container fluid>
                <Row>
                    <div className="col-md-6">
                        {errorMessage ? (
                            <p className="modal-error">
                                <i class="fa fa-exclamation-triangle"/> &nbsp; {errorMessage}
                            </p>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="col-md-6">
                        <CButton
                            id="submit-update-button"
                            disabled={!formValid || isConsultantEditLoading || isImageUploading}
                            name={"Update"}
                            isLoading={isConsultantEditLoading || isImageUploading}
                            variant="primary"
                            size="lg"
                            className="btn-action  float-right"
                            onClickHandler={editApiCall}
                        />
                        <CButton
                            id="cancel-update-profile"
                            variant="light"
                            size="lg"
                            className="btn-action  float-right mr-2"
                            name="Cancel"
                            disabled={isConsultantEditLoading || isImageUploading}
                            onClickHandler={setShowModal}
                        />
                    </div>
                </Row>
            </Container>
        </>
    );
    return (
        <>
            <CModal
                show={showModal}
                modalHeading="Doctor Details"
                size="xl"
                backdrop={true}
                bodyChildren={bodyContent}
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-modal"
                footerChildren={footerChildren}
                closeButton={true}
            />
        </>
    )
};

export default memo(DoctorEditModal)
