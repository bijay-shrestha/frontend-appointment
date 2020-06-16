import React from 'react'
import * as Material from 'react-icons/md'
import DoctorForm from './DoctorForm'
import DoctorConfirmationModal from '././DoctorConfirmationModal';
import {Container, Row, Col} from 'react-bootstrap'
import {CAlert, CButton} from '@frontend-appointment/ui-elements'
import DoctorHoc from '../DoctorHoc'

function DoctorAdd(props) {
    const DoctorAddSetup = DoctorHoc(
        ({
             doctorData,
             handleEnter,
             formValid,
             resetStateAddValues,
             errorMessageForDoctorContact,
             errorMessageForDoctorName,
             handleInputChange,
             setShowConfirmModal,
             showConfirmModal,
             submitAddChanges,
             alertMessageInfo,
             showAlert,
             closeAlert,
             contactLength,
             doctorImage,
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
             appointmentChargeValid,
             errorMessageForAppointmentCharge,
             emailValid,
             createConsultantLoading,
             salutationList
         }) => (
            <div className="">
                <Container className="bg-white add-container " fluid>
                    <CButton
                        id="resetProfileForm"
                        variant="outline-secondary"
                        size="sm"
                        name=""
                        className="mb-2  float-right"
                        onClickHandler={resetStateAddValues}
                    >
                        <>
                            <i className="fa fa-refresh"/> &nbsp;Reset
                        </>
                    </CButton>
                    <DoctorForm
                        doctorInfoObj={doctorData}
                        errorMessageForDoctorContact={errorMessageForDoctorContact}
                        errorMessageForDoctorName={errorMessageForDoctorName}
                        onEnterKeyPress={handleEnter}
                        onInputChange={handleInputChange}
                        contactLength={contactLength}
                        doctorImage={doctorImage}
                        doctorImageCroppedUrl={doctorImageCroppedUrl}
                        doctorFileCropped={doctorFileCropped}
                        showImageUploadModal={showImageUploadModal}
                        onImageSelect={onImageSelect}
                        handleCropImage={handleCropImage}
                        handleImageUpload={handleImageUpload}
                        setImageShow={setImageShow}
                        qualificationDropdown={qualificationDropdown}
                        hospitalsForDropdown={hospitalsForDropdown}
                        activeSpecializationList={activeSpecializationList}
                        appointmentChargeValid={appointmentChargeValid}
                        errorMessageForAppointmentCharge={errorMessageForAppointmentCharge}
                        emailValid={emailValid}
                        salutationList={salutationList}
                    />

                    <Row className="mt-4">
                        <Col sm={12} md={{span: 3, offset: 9}}>
                            <CButton
                                id="save-profile-add"
                                variant="primary "
                                className="float-right btn-action"
                                disabled={!formValid || showConfirmModal}
                                name={showConfirmModal ? <span className="saving">Saving <img
                                   alt="three-dots" src={require("../../../images/three-dots.svg")}/></span> : "Save"}
                                onClickHandler={setShowConfirmModal}
                            />
                            <DoctorConfirmationModal
                                salutationList={salutationList}
                                showModal={showConfirmModal}
                                setShowModal={setShowConfirmModal}
                                onConfirmClick={submitAddChanges}
                                doctorData={doctorData}
                                type="A"
                                doctorImageCroppedUrl={doctorImageCroppedUrl}
                                createConsultantLoading={createConsultantLoading}
                            />
                        </Col>
                    </Row>
                    <CAlert
                        id="profile-manage"
                        variant={alertMessageInfo.variant}
                        show={showAlert}
                        onClose={closeAlert}
                        alertType={
                            alertMessageInfo.variant === 'success' ? (
                                <>
                                    <Material.MdDone/>
                                </>
                            ) : (
                                <>
                                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                                </>
                            )
                        }
                        message={alertMessageInfo.message}
                    />
                </Container>
            </div>
        ),
        props
    )
    return <DoctorAddSetup/>
}

// return <SpecializationAdd></SpecializationAdd>

export default DoctorAdd
