import React from 'react';
import {ActionFilterUtils} from "@frontend-appointment/helpers";
import {CButton} from "@frontend-appointment/ui-elements";

const {checkIfRoleExists} = ActionFilterUtils;

const ActionForEditableTable = props => {

    return (
        <>
            {props.node.data.isNew ?
                <>
                    <CButton
                        id="save"
                        name="Add"
                        onClickHandler={(e) => props.onClick(e, props.node.data, 'ADD')}/>
                    <CButton
                        id="cancel"
                        name="Cancel"
                        onClickHandler={(e) => props.onClick(e, props.node.data, 'CANCEL')}/>
                </>
                :
                <>
                    <CButton
                        id="edit"
                        name="Edit"
                        onClickHandler={(e) => props.onClick(e, props.node.data, 'EDIT')}/>
                    <CButton
                        id="delete"
                        name="Delete"
                        onClickHandler={(e) => props.onClick(e, props.node.data, 'DELETE')}/>
                </>

            }

        </>
    );
};

export default ActionForEditableTable;
