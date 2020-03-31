import React from 'react';
import CompanyProfileModalContent from "../../CommonComponents/CompanyProfileModalContent";
import {CButton, CModal} from "@frontend-appointment/ui-elements";

const ConfirmationModal = props => {
    const {showConfirmModal, setShowConfirmModal, onConfirmClick, profileData, rolesJson, createCompanyProfileLoading} = props;
    return <>
        <CModal show={showConfirmModal}
                modalHeading="Company Profile Details"
                size="lg"
                bodyChildren={
                    <CompanyProfileModalContent
                        profileData={profileData}
                        rolesJson={rolesJson}/>}
                        footerChildren={
                            <CButton
                                variant="primary"
                                disabled={createCompanyProfileLoading}
                                name={createCompanyProfileLoading ? "Confirming" : "Confirm"}
                                size="lg"
                                className="float-right"
                                onClickHandler={onConfirmClick}/>
                }
                onHide={setShowConfirmModal}
                centered={false}
                dialogClassName="preview-modal "
                closeButton={true}
        />
    </>;

};

export default ConfirmationModal;
