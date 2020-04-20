import React from 'react';
import {CButton, CFLabel, CHybridTextArea, CToggle} from "@frontend-appointment/ui-elements";

const AppointmentModeConfirmationModalContent = ({
                                                     confirmationMessage,
                                                     onChangeHandler,
                                                     onCancel,
                                                     actionDisabled,
                                                     primaryActionName,
                                                     onPrimaryAction,
                                                     errorMessage,
                                                     modalActionType,
                                                     modalData,
                                                     isPrimaryActionLoading
                                                 }) => {
    return <>
        <div>
            <h6> {confirmationMessage}</h6>
            <CHybridTextArea
                onChange={onChangeHandler}
                id="description"
                name="description"
                placeholder="Description"
                value={modalData.description}
            />

            {modalActionType === "SAVE" ?
                <>
                    <CFLabel id={"isEditable"} labelName={"Is Appointment Mode Editable?"}/>
                    <CToggle
                        id="isEditable"
                        name="isEditable"
                        type="text"
                        onLabel={"Yes"}
                        offLabel={"No"}
                        checked={modalData.isEditable === 'Y'}

                    />
                </>
                : ''
            }

            {modalActionType === "EDIT" ?
                <CHybridTextArea
                    onChange={onChangeHandler}
                    id="remarks"
                    name="remarks"
                    placeholder="Remarks"
                    value={modalData.remarks}
                /> : ''
            }
            <CButton
                variant='primary '
                size='lg'
                className="float-right  btn-action ml-2"
                disabled={actionDisabled}
                name={primaryActionName}
                isLoading={isPrimaryActionLoading}
                onClickHandler={onPrimaryAction}
            />

            <CButton
                variant='light '
                size='lg'
                className="float-right btn-action "
                name='Cancel'
                onClickHandler={onCancel}
            />

        </div>
        <div>
            {errorMessage ? <p className="error-message">
                <i className="fa fa-exclamation-triangle"/>&nbsp;{errorMessage}</p> : ''}
        </div>
    </>;
};

export default AppointmentModeConfirmationModalContent;
