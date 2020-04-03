import React from 'react'
import {CButton, CHybridTextArea, CModal} from '@frontend-appointment/ui-elements'

const CRemarksModal = props => {
    // let footerChildren = <CButton id="testModule-button" name="Footer Test button"/>;
    let body = (
        <>
            <div>
                {/*<h5> Are you sure you want to delete the Profile?If yes please provide remarks.</h5>*/}
                <h6> {props.confirmationMessage}</h6>
                <CHybridTextArea
                    onChange={props.onRemarksChangeHandler}
                    id="remarks"
                    name="remarks"
                    placeholder="Remarks"
                    value={props.remarks}
                />

                <CButton
                    variant='primary '
                    size='lg'
                    className="float-right  btn-action ml-2"
                    name={props.primaryActionName}
                    onClickHandler={props.onPrimaryAction}
                />

                <CButton
                    variant='light '
                    size='lg'
                    className="float-right btn-action "
                    name='Cancel'
                    onClickHandler={props.onCancel}
                />

            </div>
            <div>
                {props.errorMessage ? <p className="error-message">
                    <i className="fa fa-exclamation-triangle"/>&nbsp;{props.errorMessage}</p> : ''}
            </div>
        </>
    );

    return (
        <>
            <CModal
                show={props.showModal}
                modalHeading={props.modalHeader}
                size="lg"
                bodyChildren={body}
                onHide={props.onCancel}
                dialogClassName="cogent-modal"
            />
        </>
    )
};

export default CRemarksModal;
