import React from 'react';
import {CButton, CModal} from "@frontend-appointment/ui-elements";
import {Container, Row} from "react-bootstrap";
import CompanyProfileInfoForm from "../Common/CompanyProfileInfoForm";
import ProfileUpdateMenuAssignment from "../../CommonComponents/ProfileUpdateMenuAssignment";

const CompanyProfileSetupEditModal = ({
                                          updateData,
                                          commonData,
                                          profileInfoFormData,
                                          errorMessage,
                                          profileMenuAssignmentData,
                                      }) => {

    const {showEditModal, closeModal, editApiCall, editCompanyProfileLoading} = updateData;

    const {userMenus, selectedMenus, defaultSelectedMenu, onCheckAllUserMenus, onTabAndRolesChange, profileData} = profileMenuAssignmentData;

    let footerChildren = <>
        <Container fluid>
            <Row>
                <div className="col-md-6">
                    {errorMessage ?
                        <p className="modal-error"><i class="fa fa-exclamation-triangle"/> &nbsp;  {errorMessage}
                        </p> : ''}
                </div>
                <div className="col-md-6">
                    <CButton
                        id="submit-update-button"
                        disabled={!commonData.formValid || editCompanyProfileLoading}
                        name={editCompanyProfileLoading ? <span className="saving">Updating <img
                           alt="three-dots" src={require("../../../images/three-dots.svg")}/></span> : "Update"}
                        size="lg"
                        className="btn-action  float-right"
                        onClickHandler={editApiCall}/>
                    <CButton id="cancel-update-profile"
                             variant="light"
                             size="lg"
                             className="btn-action  float-right mr-2"
                             name="Cancel"
                             onClickHandler={closeModal}
                    />

                </div>
            </Row>
        </Container>

    </>;

    let body = <>
        <Container fluid>
            <Row>
                <CompanyProfileInfoForm
                    profileInfoFormData={profileInfoFormData} type="MANAGE"/>
                <ProfileUpdateMenuAssignment
                    userMenus={userMenus}
                    selectedMenus={selectedMenus}
                    defaultSelectedMenu={defaultSelectedMenu}
                    onCheckAllUserMenus={onCheckAllUserMenus}
                    onTabAndRolesChange={onTabAndRolesChange}
                    profileData={profileData}/>
            </Row>
        </Container>
    </>;

    return (
        <>
            <CModal show={showEditModal}
                    modalHeading="Update Company Profile"
                    size="xl"
                    bodyChildren={body}
                    onHide={closeModal}
                    dialogClassName="preview-modal"
                    footerChildren={footerChildren}
            />
        </>
    );

};

export default CompanyProfileSetupEditModal;
