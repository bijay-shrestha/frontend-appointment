import React from 'react';
import ModalContent from "../../CommonComponents/ModalContent";
import {CButton, CModal} from "@frontend-appointment/ui-elements";

const ConfirmationModal = props => {
    const {showConfirmModal, setShowConfirmModal, onConfirmClick, profileData, rolesJson} = props;
    return <>
        <CModal show={showConfirmModal}
                modalHeading="Profile Details"
                size="lg"
                bodyChildren={
                    <ModalContent
                        profileData={profileData}
                        rolesJson={rolesJson}/>}
                footerChildren={<CButton
                    variant="primary"
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
