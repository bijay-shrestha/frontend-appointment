import React from 'react';
import CompanyProfileSetupHOC from "../CompanyProfileSetupHOC";
import {Col, Container, Row} from "react-bootstrap";
import {CButton} from "@frontend-appointment/ui-elements";
import ConfirmationModal from "../../CompanyProfileSetup/Add/ConfirmationModal";
import {menuRoles} from "@frontend-appointment/helpers";
import CompanyProfileInfoForm from "./CompanyProfileInfoForm";
import CompanyProfileMenuAssignment from "./CompanyProfileMenuAssignment";

const CompanyProfileSetupAdd = props => {
    const CompanyProfileSetupAdd = CompanyProfileSetupHOC(
        ({
             profileInfoFormData,
             profileMenuAssignmentData,
             addFormData,
             commonData
         }) => <>
            <div className=" ">
                <Container className="bg-white add-container " fluid>

                    <Row>
                        <CompanyProfileInfoForm
                            profileInfoFormData={profileInfoFormData}/>
                        {profileMenuAssignmentData.profileData.company &&
                        <CompanyProfileMenuAssignment
                            profileMenuAssignmentData={profileMenuAssignmentData}/>
                        }
                    </Row>
                    <Row className="mt-4">
                        <Col sm={12} md={{span: 3, offset: 9}}>
                            <CButton
                                id="save-profile-add"
                                variant="primary "
                                className="float-right btn-action"
                                name={addFormData.showConfirmModal ? "Saving" : "Save"}
                                disabled={!commonData.formValid || addFormData.showConfirmModal}
                                onClickHandler={addFormData.setShowConfirmModal}>

                            </CButton>
                            <ConfirmationModal
                                showConfirmModal={addFormData.showConfirmModal}
                                setShowConfirmModal={addFormData.setShowConfirmModal}
                                onConfirmClick={() => addFormData.handleConfirmClick()}
                                profileData={profileMenuAssignmentData.profileData}
                                rolesJson={menuRoles}
                                createCompanyProfileLoading={addFormData.createCompanyProfileLoading}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>,
        props,
        'ADD'
    );

    return <CompanyProfileSetupAdd/>
};

export default CompanyProfileSetupAdd;
