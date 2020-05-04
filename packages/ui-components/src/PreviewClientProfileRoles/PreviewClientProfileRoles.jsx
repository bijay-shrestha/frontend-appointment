import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import PreviewClientProfileModalContent from "../PreviewClientProfileModalContent/PreviewClientProfileModalContent";

const PreviewClientProfileRoles = props => {
    const {showModal, setShowModal, profileData,rolesJson} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Client Profile Details"
                    size="xl"
                    bodyChildren={<PreviewClientProfileModalContent profileData={profileData} rolesJson={rolesJson}/>}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default PreviewClientProfileRoles;
