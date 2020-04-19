import React from 'react';
import {CButton, CModal} from "@frontend-appointment/ui-elements";
import ProfileUpdateForm from "../ProfileUpdateForm";
import ProfileUpdateMenuAssignment from "../../../CommonComponents/ProfileUpdateMenuAssignment";
import {Container, Row} from "react-bootstrap";

const UpdateProfileModal = ({
                                showEditModal,
                                setShowEditModal,
                                onEnterKeyPress,
                                hospitalList,
                                onInputChange,
                                profileInfoObj,
                                errorMessageForProfileName,
                                errorMessageForProfileDescription,
                                errorMessage,
                                profileMenuAssignmentProps,
                                editApiCall,
                                formValid,
                                isProfileEditLoading
                            }) => {

    let footerChildren = <>
        <Container fluid="true">
            <Row>
                <div className="col-md-6">
                    {errorMessage ?
                        <p className="modal-error"><i class="fa fa-exclamation-triangle"></i> &nbsp;  {errorMessage}
                        </p> : ''}
                </div>
                <div className="col-md-6">
                    <CButton
                        id="submit-update-button"
                        disabled={!formValid}
                        name="Update"
                        size="lg"
                        isLoading={isProfileEditLoading}
                        disabled={isProfileEditLoading}
                        className="btn-action  float-right"
                        onClickHandler={editApiCall}/>
                    <CButton id="cancel-update-profile"
                             variant="light"
                             size="lg"
                             className="btn-action  float-right mr-2"
                             name="Cancel"
                             onClickHandler={setShowEditModal}
                    />

                </div>
            </Row>
        </Container>

    </>;
    let body = <>
        <Container fluid="true" className="profile-edit-modal">
            <Row>
                <ProfileUpdateForm
                    onEnterKeyPress={onEnterKeyPress}
                    hospitalList={hospitalList}
                    onInputChange={onInputChange}
                    profileInfoObj={profileInfoObj}
                    errorMessageForProfileName={errorMessageForProfileName}
                    errorMessageForProfileDescription={errorMessageForProfileDescription}/>
                <ProfileUpdateMenuAssignment
                    userMenus={profileMenuAssignmentProps.userMenus}
                    selectedMenus={profileMenuAssignmentProps.selectedMenus}
                    defaultSelectedMenu={profileMenuAssignmentProps.defaultSelectedMenu}
                    onCheckAllUserMenus={profileMenuAssignmentProps.onCheckAllUserMenus}
                    onTabAndRolesChange={profileMenuAssignmentProps.onTabAndRolesChange}
                    profileData={profileMenuAssignmentProps.profileData}/>
            </Row>
        </Container>
    </>;

    return (
        <>
            <CModal show={showEditModal}
                    modalHeading="Update Client Profile"
                    size="xl"
                    bodyChildren={body}
                    onHide={setShowEditModal}
                    dialogClassName="preview-modal"
                    footerChildren={footerChildren}
            />
        </>
    );

};

export default UpdateProfileModal;
