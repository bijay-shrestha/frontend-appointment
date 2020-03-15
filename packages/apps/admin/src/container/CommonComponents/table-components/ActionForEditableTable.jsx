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
                        onClickHandler={(e) => props.saveAlias(e, props.node.data, 'S')}/>
                    <CButton
                        id="cancel"
                        name="Cancel"
                        onClickHandler={(e) => props.cancelAlias(e, props.node.data, 'C')}/>
                </>
                :
                <>
                    <CButton
                        id="edit"
                        name="Edit"
                        onClickHandler={(e) => props.editAlias(e, props.node.data, 'S')}/>
                    <CButton
                        id="delete"
                        name="Delete"
                        onClickHandler={(e) => props.deleteAlias(e, props.node.data, 'C')}/>
                </>

            }

        </>
    );
};

export default ActionForEditableTable;
