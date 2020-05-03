import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import CompanyProfileModalContent from "../CompanyProfileModalContent/CompanyProfileModalContent";

const CompanyProfilePreviewRoles = props => {
    const {showModal, setShowModal, profileData,rolesJson} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Company Profile Details"
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
