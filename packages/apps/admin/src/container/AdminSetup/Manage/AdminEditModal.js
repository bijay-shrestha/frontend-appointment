import React from 'react';
import {CButton, CModal} from "@frontend-appointment/ui-elements";
import {Container, Row} from "react-bootstrap";
import AdminEditForm from "./AdminEditForm";

const AdminEditModal = ({
                            adminUpdateData,
                            onEnterKeyPress,
                            onInputChange,
                            onMacIdChange,
                            onAddMoreMacId,
                            onRemoveMacId,
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
                            viewProfileDetails,
                            isAdminEditLoading,
                            onChangeDashBoardRole
                        }) => {

    let footerChildren = <>
        <Container fluid="true">
            <Row>
                <div className="col-sm-12  col-md-6">
                    {errorMessage ?
                        <p className="modal-error"><i class="fa fa-exclamation-triangle"/> &nbsp;  {errorMessage}
                        </p> : ''}
                </div>
                <div className="col-sm-12 col-md-6">
                    <CButton
                        id="submit-update-button"
                        disabled={!adminUpdateData.formValid||isAdminEditLoading}
                        isAdminEditLoading={isAdminEditLoading}
                        name="Update"
                        size="lg"
                        className="btn-action  float-right"
                        onClickHandler={editApiCall}/>
                    <CButton id="cancel-update-profile"
                             variant="light"
                             size="lg"
                             variant="light"
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
                    modalHeading="Update Client Admin"
                    size="xl"
                    bodyChildren={
                        <AdminEditForm adminInfoObj={adminUpdateData}
                                       onEnterKeyPress={onEnterKeyPress}
                                       onInputChange={onInputChange}
                                       onMacIdChange={onMacIdChange}
                                       onAddMoreMacId={onAddMoreMacId}
                                       onRemoveMacId={onRemoveMacId}
                                       hospitalList={adminUpdateData.hospitalList}
                                       departmentList={adminUpdateData.departmentList}
                                       profileList={adminUpdateData.profileList}
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
                                       isAdminEditLoading={isAdminEditLoading}
                                       onChangeDashBoardRole={onChangeDashBoardRole}
                        />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    footerChildren={isAdminEditLoading ? '' : footerChildren}
                    closeButton={true}
            />
        </>
    );
};

export default AdminEditModal;
