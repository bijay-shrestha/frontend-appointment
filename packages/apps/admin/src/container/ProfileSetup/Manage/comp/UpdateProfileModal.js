import React from 'react';
import {CButton, CModal} from "@frontend-appointment/ui-elements";
import ProfileUpdateForm from "../ProfileUpdateForm";
import ProfileUpdateMenuAssignment from "../ProfileUpdateMenuAssignment";
import {Container, Row} from "react-bootstrap";

const UpdateProfileModal = ({
                                showEditModal,
                                setShowEditModal,
                                onEnterKeyPress,
                                departments,
                                onInputChange,
                                profileInfoObj,
                                errorMessageForProfileName,
                                errorMessageForProfileDescription,
                                errorMessage,
                                profileMenuAssignmentProps,
                                editApiCall,
                                formValid
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
                        name="Update Profile"
                        size="lg"
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
        <Container fluid="true">
            <Row>
                <ProfileUpdateForm
                    onEnterKeyPress={onEnterKeyPress}
                    departmentList={departments}
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
                    modalHeading="Update Profile"
                    size="xl"
                    bodyChildren={body}
                    onHide={setShowEditModal}
                    dialogClassName="preview-roles-modal"
                    footerChildren={footerChildren}
            />
        </>
    );

};

export default UpdateProfileModal;
