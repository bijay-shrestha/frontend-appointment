import React from 'react'
import * as Material from 'react-icons/md'
import HospitalForm from './HospitalForm'
import HospitalConfirmationModal from './HospitalConfirmModal'
import {Container, Row, Col} from 'react-bootstrap'
import {CAlert, CButton} from '@frontend-appointment/ui-elements'
import HospitalHoc from '../HospitalHoc'

function HospitalAdd(props) {
    const HospitalAddSetup = HospitalHoc(
        ({
             hospitalData,
             handleEnter,
             formValid,
             resetStateAddValues,
             errorMessageForHospitalCode,
             errorMessageForHospitalName,
             handleInputChange,
             setShowConfirmModal,
             showConfirmModal,
             submitAddChanges,
             alertMessageInfo,
             showAlert,
             closeAlert,
             addContactNumber,
             removeContactNumber,
             editContactNumber,
             contactLength,
             hospitalImage,
             hospitalImageCroppedUrl,
             hospitalFileCropped,
             showImageUploadModal,
             onImageSelect,
             handleCropImage,
             handleImageUpload,
             setImageShow,
             hospitalBannerImage,
             onBannerImageSelect,
             hospitalBannerImageCroppedUrl,
             hospitalBannerFileCropped,
             showBannerUploadModal,
             handleCropBannerImage,
             handleBannerImageUpload,
             setShowBannerUploadModal,
             createHospitalLoading,
             activeBillingModeForDropdown,
             activeAppointmentServiceTypeForDropdown,
             appointmentServiceTypeListForPrimary,
             isImageUploading
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
                    <HospitalForm
                        hospitalInfoObj={hospitalData}
                        errorMessageForHospitalName={errorMessageForHospitalName}
                        errorMessageForHospitalCode={errorMessageForHospitalCode}
                        onEnterKeyPress={handleEnter}
                        onInputChange={handleInputChange}
                        addContactNumber={addContactNumber}
                        removeContactNumber={removeContactNumber}
                        editContactNumber={editContactNumber}
                        contactLength={contactLength}
                        hospitalImage={hospitalImage}
                        hospitalImageCroppedUrl={hospitalImageCroppedUrl}
                        hospitalFileCropped={hospitalFileCropped}
                        showImageUploadModal={showImageUploadModal}
                        onImageSelect={onImageSelect}
                        handleCropImage={handleCropImage}
                        handleImageUpload={handleImageUpload}
                        setImageShow={setImageShow}
                        hospitalBannerImage={hospitalBannerImage}
                        hospitalBannerImageCroppedUrl={hospitalBannerImageCroppedUrl}
                        hospitalBannerFileCropped={hospitalBannerFileCropped}
                        showBannerUploadModal={showBannerUploadModal}
                        onBannerImageSelect={onBannerImageSelect}
                        handleCropBannerImage={handleCropBannerImage}
                        handleBannerImageUpload={handleBannerImageUpload}
                        setShowBannerUploadModal={setShowBannerUploadModal}
                        activeBillingModeForDropdown={activeBillingModeForDropdown}
                        activeAppointmentServiceTypeForDropdown={activeAppointmentServiceTypeForDropdown}
                        appointmentServiceTypeListForPrimary={appointmentServiceTypeListForPrimary}
                    />

                    <Row className="mt-4">
                        <Col sm={12} md={{span: 3, offset: 9}}>
                            <CButton
                                id="save-profile-add"
                                variant="primary "
                                className="float-right btn-action"
                                name={"Save"}
                                isLoading={showConfirmModal}
                                disabled={!formValid || showConfirmModal}
                                onClickHandler={setShowConfirmModal}
                            />
                            <HospitalConfirmationModal
                                showModal={showConfirmModal}
                                setShowModal={setShowConfirmModal}
                                onConfirmClick={submitAddChanges}
                                hospitalData={hospitalData}
                                activeBillingModeForDropdown={activeBillingModeForDropdown}
                                activeAppointmentServiceTypeForDropdown={activeAppointmentServiceTypeForDropdown}
                                appointmentServiceTypeListForPrimary={appointmentServiceTypeListForPrimary}
                                type="A"
                                hospitalImageCroppedUrl={hospitalImageCroppedUrl}
                                hospitalBannerImageCroppedUrl={hospitalBannerImageCroppedUrl}
                                createHospitalLoading={createHospitalLoading}
                                isImageUploading={isImageUploading}
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
    );
    return <HospitalAddSetup/>
}

export default HospitalAdd;
