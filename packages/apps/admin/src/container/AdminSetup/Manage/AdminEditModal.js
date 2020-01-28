import React from 'react';
import {CButton, CModal} from "@cogent/ui-elements";
import {Container, Row} from "react-bootstrap";
import AdminEditForm from "./AdminEditForm";

const AdminEditModal = ({
                            adminUpdateData,
                            onEnterKeyPress,
                            onInputChange,
                            onMacIdChange,
                            onAddMoreMacId,
                            onRemoveMacId,
                            onModuleChange,
                            onProfileChange,
                            errorMessageForAdminName,
                            errorMessageForAdminMobileNumber,
                            onImageUpload,
                            showModal,
                            showImageUploadModal,
                            setImageShowModal,
                            adminImage,
                            adminCroppedImage,
                            onImageSelect,
                            onImageCrop,
                            setShowModal,
                            errorMessage,
                            editApiCall,
                            viewProfileDetails
                        }) => {

    let footerChildren = <>
        <Container fluid="true">
            <Row>
                <div className="col-md-6">
                    {errorMessage ?
                        <p className="modal-error"><i class="fa fa-exclamation-triangle"/> &nbsp;  {errorMessage}
                        </p> : ''}
                </div>
                <div className="col-md-6">
                    <CButton
                        id="submit-update-button"
                        disabled={!adminUpdateData.formValid}
                        name="Update"
                        size="lg"
                        className="btn-action  float-right"
                        onClickHandler={editApiCall}/>
                    <CButton id="cancel-update-profile"
                             variant="light"
                             size="lg"
                             variant="outline-secondary"
                             className="btn-action  float-right mr-2"
                             name="Cancel"
                             onClickHandler={setShowModal}
                    />
                </div>
            </Row>
        </Container>

    </>;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Update Admin"
                    size="xl"
                    bodyChildren={
                        <AdminEditForm adminInfoObj={adminUpdateData}
                                       onEnterKeyPress={onEnterKeyPress}
                                       onInputChange={onInputChange}
                                       onMacIdChange={onMacIdChange}
                                       onAddMoreMacId={onAddMoreMacId}
                                       onRemoveMacId={onRemoveMacId}
                                       onModuleChange={onModuleChange}
                                       onProfileChange={onProfileChange}
                                       adminCategoryList={adminUpdateData.adminCategoryList}
                                       hospitalList={adminUpdateData.hospitalList}
                                       moduleList={adminUpdateData.moduleList}
                                       errorMessageForAdminName={errorMessageForAdminName}
                                       errorMessageForAdminMobileNumber={errorMessageForAdminMobileNumber}
                                       showModal={showModal}
                                       setShowModal={setShowModal}
                                       showImageUploadModal={showImageUploadModal}
                                       setImageShowModal={setImageShowModal}
                                       onImageUpload={(data) => onImageUpload(data)}
                                       adminImage={adminImage}
                                       adminCroppedImage={adminCroppedImage}
                                       onImageSelect={onImageSelect}
                                       onImageCrop={onImageCrop}
                                       viewProfileDetails={viewProfileDetails}
                        />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    footerChildren={footerChildren}
                    closeButton={true}
            />
        </>
    );
};

export default AdminEditModal;
