import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import ModalContent from "./ModalContent";
import CompanyProfileModalContent from "./CompanyProfileModalContent";

const CompanyProfilePreviewRoles = props => {
    const {showModal, setShowModal, profileData,rolesJson} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Profile Details"
                    size="xl"
                    bodyChildren={<CompanyProfileModalContent profileData={profileData} rolesJson={rolesJson}/>}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default CompanyProfilePreviewRoles;
