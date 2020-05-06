import React from 'react'
import * as Material from 'react-icons/md'
import CompanyForm from './CompanyForm'
import CompanyConfirmationModal from './CompanyConfirmModal'
import {Container, Row, Col} from 'react-bootstrap'
import {CAlert, CButton} from '@frontend-appointment/ui-elements'
import CompanyHOC from '../CompanyHoc'

function CompanyAdd(props) {
    const CompanyAddSetup = CompanyHOC(
        ({
             companyData,
             handleEnter,
             formValid,
             resetStateAddValues,
             errorMessageForCompanyCode,
             errorMessageForCompanyName,
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
             companyImage,
             companyImageCroppedUrl,
             companyFileCropped,
             showImageUploadModal,
             onImageSelect,
             handleCropImage,
             handleImageUpload,
             setImageShow
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
                    <CompanyForm
                        companyInfoObj={companyData}
                        errorMessageForCompanyName={errorMessageForCompanyName}
                        errorMessageForCompanyCode={errorMessageForCompanyCode}
                        onEnterKeyPress={handleEnter}
                        onInputChange={handleInputChange}
                        addContactNumber={addContactNumber}
                        removeContactNumber={removeContactNumber}
                        editContactNumber={editContactNumber}
                        contactLength={contactLength}
                        companyImage={companyImage}
                        companyImageCroppedUrl={companyImageCroppedUrl}
                        companyFileCropped={companyFileCropped}
                        showImageUploadModal={showImageUploadModal}
                        onImageSelect={onImageSelect}
                        handleCropImage={handleCropImage}
                        handleImageUpload={handleImageUpload}
                        setImageShow={setImageShow}
                    />

                    <Row className="mt-4">
                        <Col sm={12} md={{span: 3, offset: 9}}>
                            <CButton
                                id="save-profile-add"
                                variant="primary "
                                className="float-right btn-action"
                                name="Save"
                                disabled={!formValid}
                                onClickHandler={setShowConfirmModal}
                            />
                            <CompanyConfirmationModal
                                showModal={showConfirmModal}
                                setShowModal={setShowConfirmModal}
                                onConfirmClick={submitAddChanges}
                                companyData={companyData}
                                type="A"
                                companyImageCroppedUrl={companyImageCroppedUrl}
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
    return <CompanyAddSetup/>
}

export default CompanyAdd;
