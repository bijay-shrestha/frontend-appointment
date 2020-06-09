import React from 'react'
import {CButton, CHybridTextArea, CModal} from '@frontend-appointment/ui-elements'

const CRemarksModal = ({
                           actionDisabled,
                           confirmationMessage,
                           errorMessage,
                           modalHeader,
                           onCancel,
                           onPrimaryAction,
                           onRemarksChangeHandler,
                           primaryActionName,
                           primaryActionLoading,
                           remarks,
                           showModal,
                       }) => {
    // let footerChildren = <CButton id="testModule-button" name="Footer Test button"/>;
    let body = (
        <>
            <div>
                {/*<h5> Are you sure you want to delete the Profile?If yes please provide remarks.</h5>*/}
                <h6> {confirmationMessage}</h6>
                <CHybridTextArea
                    onChange={onRemarksChangeHandler}
                    id="remarks"
                    name="remarks"
                    placeholder="Remarks"
                    value={remarks}
                />

                <CButton
                    variant='primary '
                    size='lg'
                    className="float-right  btn-action ml-2"
                    disabled={actionDisabled}
                    name={primaryActionName}
                    isLoading={primaryActionLoading}
                    onClickHandler={onPrimaryAction}
                />

                <CButton
                    variant='light '
                    size='lg'
                    className="float-right btn-action "
                    name='Cancel'
                    disabled={actionDisabled}
                    onClickHandler={onCancel}
                />

            </div>
            <div>
                {errorMessage ? <p className="error-message">
                    <i className="fa fa-exclamation-triangle"/>&nbsp;{errorMessage}</p> : ''}
            </div>
        </>
    );

    return (
        <>
            <CModal
                show={showModal}
                modalHeading={modalHeader}
                size="lg"
                bodyChildren={body}
                onHide={onCancel}
                dialogClassName="cogent-modal"
            />
        </>
    )
};

export default CRemarksModal;
