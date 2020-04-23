import React, {memo} from 'react'
import {Col, Row} from 'react-bootstrap'
import {CButton, CFLabel, CForm, CHybridInput, CHybridSelect, CRadioButton} from '@frontend-appointment/ui-elements'
import * as DefaultLogo from '../img/picture.png'
import {CImageUploadAndCropModal} from '@frontend-appointment/ui-components'

const DoctorForm = ({
                        doctorInfoObj,
                        errorMessageForDoctorContact,
                        errorMessageForDoctorName,
                        onEnterKeyPress,
                        onInputChange,
                        doctorImageCroppedUrl,
                        doctorFileCropped,
                        showImageUploadModal,
                        onImageSelect,
                        handleCropImage,
                        handleImageUpload,
                        setImageShow,
                        qualificationDropdown,
                        hospitalsForDropdown,
                        activeSpecializationList,
                        doctorImage,
                        appointmentChargeValid,
                        errorMessageForAppointmentCharge,
                        emailValid
                    }) => {
    return (
        <>
            <Container-fluid>
                <Row sm="12 p-0">
                    <h5 className="title">Doctor Info</h5>
                </Row>
                <CForm id="doctor-info" className="mt-2 profile-info">
                    <Container-fluid>
                        <Row>
                            <Col lg={3} className=" order-md-first order-lg-last">
                                <Row>
                                    <Col sm={12} md={12} lg={12}>
                                        <div className="image-upload-container">
                                            {/* <CFLabel id="DoctorPicture" labelName="Doctor Picture"></CFLabel> */}
                                            <div className="image-box">
                                                <img
                                                    alt="Doctor Image"
                                                    src={
                                                        doctorInfoObj.doctorAvatar
                                                            ? doctorInfoObj.doctorAvatarUrl
                                                            : DefaultLogo
                                                    }
                                                />
                                                <CButton
                                                    id="uploadAdminImage"
                                                    name=""
                                                    size="lg"
                                                    variant="primary"
                                                    className=" mt-1 mb-4  upload-button"
                                                    onClickHandler={setImageShow}
                                                ><i className="fa fa-upload"></i>&nbsp;Upload
                                                </CButton>
                                                <CImageUploadAndCropModal
                                                    showModal={showImageUploadModal}
                                                    setShowModal={setImageShow}
                                                    ruleOfThirds={true}
                                                    handleImageUpload={handleImageUpload}
                                                    imageSrc={doctorImage}
                                                    croppedImageSrc={doctorImageCroppedUrl}
                                                    circularCrop={false}
                                                    onImageSelect={onImageSelect}
                                                    onImageCrop={data => handleCropImage(data)}
                                                />
                                            </div>
                                        </div>
                                    </Col>

                                    <Col sm={12} md={12} lg={6} className=" order-md-first"></Col>
                                </Row>
                            </Col>

                            <Col lg={9}>
                                <Row>
                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="doctor-name"
                                            name="name"
                                            onKeyDown={event => onEnterKeyPress(event)}
                                            onChange={(event, validity) =>
                                                onInputChange(event, validity)
                                            }
                                            placeholder="Doctor Name"
                                            value={doctorInfoObj.name}
                                            required={true}
                                            hasValidation={true}
                                            fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                            errorMessagePassed={errorMessageForDoctorName}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="nmc-number"
                                            name="nmcNumber"
                                            onKeyDown={event => onEnterKeyPress(event)}
                                            onChange={(event, validity) =>
                                                onInputChange(event, validity)
                                            }
                                            placeholder="Doctor NMC Number"
                                            value={doctorInfoObj.nmcNumber}
                                            required={true}
                                        />
                                    </Col>
                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridSelect
                                            id="specializationIds"
                                            name="specializationIds"
                                            onKeyDown={event => onEnterKeyPress(event)}
                                            onChange={(event, validity) =>
                                                onInputChange(event, validity)
                                            }
                                            label="Select Specialization"
                                            options={activeSpecializationList}
                                            // isDisabled={!activeSpecializationList.length ?true:false}
                                            value={doctorInfoObj.specializationIds}
                                            required={true}
                                            isMulti={true}
                                        />
                                    </Col>


                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridSelect
                                            id="qualificationIds"
                                            name="qualificationIds"
                                            onKeyDown={event => onEnterKeyPress(event)}
                                            onChange={(event, validity) =>
                                                onInputChange(event, validity)
                                            }
                                            label="Select Qualifications"
                                            options={qualificationDropdown}
                                            value={doctorInfoObj.qualificationIds}
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
                                                onInputChange(event, validity)
                                            }
                                            placeholder="Doctor Email"
                                            value={doctorInfoObj.email}
                                            type="email"
                                            required={true}
                                        />
                                    </Col>


                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="doctor-number"
                                            name="contactNumber"
                                            onKeyDown={event => onEnterKeyPress(event)}
                                            onChange={(event, validity) =>
                                                onInputChange(event, validity)
                                            }
                                            placeholder="Doctor Phone Number"
                                            value={doctorInfoObj.contactNumber}
                                            required={true}
                                            hasValidation={true}
                                            fieldValuePattern={/^\d{10}$/}
                                            errorMessagePassed={errorMessageForDoctorContact}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6} className="">
                                        <CHybridInput
                                            id="appointment-charge"
                                            name="appointmentCharge"
                                            onKeyDown={event => onEnterKeyPress(event)}
                                            onChange={(event, validity) =>
                                                onInputChange(event, validity)
                                            }
                                            placeholder="Doctor Appointment Charge"
                                            value={doctorInfoObj.appointmentCharge}
                                            required={true}
                                            hasValidation={true}
                                            fieldValuePattern={new RegExp("^\\d*(?:\\.\\d{1," + 2 + "})?$")}
                                            errorMessagePassed={errorMessageForAppointmentCharge}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6} className="">
                                        <CHybridInput
                                            id="appointment-follow-up-charge"
                                            name="appointmentFollowUpCharge"
                                            onKeyDown={event => onEnterKeyPress(event)}
                                            onChange={(event, validity) =>
                                                onInputChange(event, validity)
                                            }
                                            placeholder="Doctor Appointment Follow Up Charge"
                                            value={doctorInfoObj.appointmentFollowUpCharge}
                                            required={true}
                                            hasValidation={true}
                                            fieldValuePattern={new RegExp("^\\d*(?:\\.\\d{1," + 2 + "})?$")}
                                            errorMessagePassed={errorMessageForAppointmentCharge}
                                        />
                                    </Col>
                                    <Col sm={12} md={6} lg={6}>
                                        <CFLabel labelName="Gender" id="gender"></CFLabel>
                                        <div>
                                            <CRadioButton
                                                checked={doctorInfoObj.genderCode === "M"}
                                                onKeyDown={event => onEnterKeyPress(event)}
                                                onChange={event => onInputChange(event)}
                                                name="genderCode"
                                                id="radio1"
                                                label="Male"
                                                type="radio"
                                                value="M"
                                            />
                                            <CRadioButton
                                                checked={doctorInfoObj.genderCode === "F"}
                                                onKeyDown={event => onEnterKeyPress(event)}
                                                onChange={event => onInputChange(event)}
                                                name="genderCode"
                                                id="radio2"
                                                label="Female"
                                                type="radio"
                                                value="F"
                                            />
                                            <CRadioButton
                                                checked={doctorInfoObj.genderCode === "O"}
                                                onKeyDown={event => onEnterKeyPress(event)}
                                                onChange={event => onInputChange(event)}
                                                name="genderCode"
                                                id="radio3"
                                                label="Other"
                                                type="radio"
                                                value="O"
                                            /></div>
                                    </Col>

                                    <Col sm={12} md={4} lg={4}>
                                        <CFLabel labelName="Status" id="status"></CFLabel>
                                        <div>
                                            <CRadioButton
                                                checked={Boolean(doctorInfoObj.status)}
                                                disabled={true}
                                                id="radio1"
                                                label="Active"
                                                type="radio"
                                                readOnly
                                            />
                                        </div>
                                    </Col>


                                </Row>
                            </Col>
                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
}

export default memo(DoctorForm)
