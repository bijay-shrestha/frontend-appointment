import React from 'react'
import {CButton, CHybridTextArea, CModal} from '@frontend-appointment/ui-elements'

const ConfirmDelete = props => {
    // let footerChildren = <CButton id="testModule-button" name="Footer Test button"/>;
    let body = (
        <>
            <div>
                {/*<h5> Are you sure you want to delete the Profile?If yes please provide remarks.</h5>*/}
                <h6> {props.confirmationMessage}</h6>
                <CHybridTextArea
                    onChange={props.onDeleteRemarksChangeHandler}
                    id="remarks"
                    name="remarks"
                    placeholder="Remarks"
                    value={props.remarks}
                />

                <CButton
                    variant='danger '
                    size='lg'
                    className="float-right  btn-action ml-2"
                    name='Delete'
                    onClickHandler={props.onSubmitDelete}
                />

                <CButton
                    variant='light '
                    size='lg'
                    className="float-right btn-action "
                    name='Cancel'
                    onClickHandler={props.showModal}
                />

            </div>
            <div>
                {props.deleteErrorMessage ? <p className="error-message">
                    <i className="fa fa-exclamation-triangle"/>&nbsp;{props.deleteErrorMessage}</p> : ''}
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
                onHide={props.setShowModal}
                dialogClassName="cogent-modal"
            />
        </>
    )
};

export default ConfirmDelete
