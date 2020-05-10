import React from 'react';
import {CompanyProfileModalContent} from "@frontend-appointment/ui-components";
import {CButton, CModal} from "@frontend-appointment/ui-elements";

const ConfirmationModal = props => {
    const {showConfirmModal, setShowConfirmModal, onConfirmClick, profileData, rolesJson, createCompanyProfileLoading,isCloneAndAdd,cloneAndAdd} = props;
    return <>
        <CModal show={showConfirmModal}
                modalHeading="Company Profile Details"
                size="lg"
                bodyChildren={
                    <CompanyProfileModalContent
                        profileData={profileData}
                        rolesJson={rolesJson}/>}
                footerChildren={
                    <>
                    <CButton
                        variant="primary"
                        disabled={createCompanyProfileLoading}
                        name={!isCloneAndAdd && createCompanyProfileLoading ?
                            <span className="saving">Confirming <img
                            alt="three-dots" src={require("../../../images/three-dots.svg")}/></span> : "Confirm"}
                        size="lg"
                        className="float-right"
                        onClickHandler={onConfirmClick}/>
                        <CButton
                        variant="primary"
                        disabled={createCompanyProfileLoading}
                        name={isCloneAndAdd && createCompanyProfileLoading ?
                            <span className="saving">Cloning And Adding <img
                            alt="three-dots" src={require("../../../images/three-dots.svg")}/></span> : "Clone And Add"}
                        size="lg"
                        className="float-right"
                        onClickHandler={cloneAndAdd}/> 
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
