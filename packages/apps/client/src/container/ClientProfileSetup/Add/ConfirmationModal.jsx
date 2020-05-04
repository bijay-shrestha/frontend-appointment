import React from 'react';
import {CButton, CModal} from "@frontend-appointment/ui-elements";
import {PreviewClientProfileModalContent} from "@frontend-appointment/ui-components";

const ConfirmationModal = props => {
    const {showConfirmModal, setShowConfirmModal, onConfirmClick, profileData, rolesJson, isAddLoading} = props;
    return <>
        <CModal show={showConfirmModal}
                modalHeading="Profile Details"
                size="lg"
                bodyChildren={
                    <PreviewClientProfileModalContent
                        profileData={profileData}
                        rolesJson={rolesJson}/>}
                footerChildren={<CButton
                    variant="primary"
                    size="lg"
                    className="float-right"
                    name={"Confirm"}
                    isLoading={isAddLoading}
                    disabled={isAddLoading}
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
