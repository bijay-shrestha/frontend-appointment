import React from 'react';
import {CButton, CModal} from "@frontend-appointment/ui-elements";
import {PreviewClientProfileModalContent} from "@frontend-appointment/ui-components";

const ConfirmationModal = props => {
    const {showConfirmModal, setShowConfirmModal, onConfirmClick, profileData, rolesJson, isAddLoading,isCloneAndAdd,cloneAndAdd} = props;
    return <>
        <CModal show={showConfirmModal}
                modalHeading="Profile Details"
                size="lg"
                bodyChildren={
                    <PreviewClientProfileModalContent
                        profileData={profileData}
                        rolesJson={rolesJson}/>}
                footerChildren={<>
                   
                    <CButton
                    variant="light"
                    size="lg"
                    className="btn-action float-right"
                    name={"Clone And Add"}
                    isLoading={isCloneAndAdd && isAddLoading}
                    disabled={isAddLoading}
                    onClickHandler={cloneAndAdd}/>
                     <CButton
                    variant="primary"
                    size="lg"
                    className="btn-action float-right"
                    name={"Confirm"}
                    isLoading={!isCloneAndAdd && isAddLoading}
                    disabled={isAddLoading}
                    onClickHandler={onConfirmClick}/>
                    </>
                }
                onHide={setShowConfirmModal}
                centered={false}
                dialogClassName="preview-modal "
                closeButton={true}
        />
    </>;

};

export default ConfirmationModal;
