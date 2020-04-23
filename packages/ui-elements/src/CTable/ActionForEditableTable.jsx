import React from 'react';
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";

const ActionForEditableTable = ({isEditing, onClick, node, rowNumber, onUpdate, onDelete}) => {

    const actionDisabled = Object.keys(node.data).includes("isRowEditable")
        ? (isEditing && rowNumber !== node.rowIndex) || !node.data.isRowEditable
        : isEditing && rowNumber !== node.rowIndex;
    return (
        <div className="table-action">
            {isEditing && rowNumber === node.rowIndex ?
                <>
                    <div className="action-box">
                        <div className="tip add">Save</div>
                        <Button
                            id="save"
                            variant="outline-success"
                            // disabled={!rowValid}
                            onClick={(e) => onClick(e, node, 'ADD')}>
                            <i className="fa fa-save"/>
                            {/* Save */}
                        </Button>
                    </div>

                    &nbsp;
                    <div className="action-box">
                        <div className="tip cancel">Cancel</div>
                        <Button
                            id="cancel"
                            variant="outline-danger"
                            onClick={(e) => onClick(e, node, 'CANCEL')}>
                            <i className="fa fa-times"/>
                            {/* Cancel */}
                        </Button>
                    </div>
                </>
                :
                <>
                    {
                        onUpdate ?
                            <div className="action-box">
                                <div className="tip edit">Edit</div>
                                <Button
                                    id="edit"
                                    variant="outline-primary"
                                    disabled={actionDisabled}
                                    onClick={(e) => onClick(e, node, 'EDIT')}>
                                    <i className="fa fa-edit"/>
                                    {/* Edit */}
                                </Button>
                            </div>
                            : ''
                    }
                    &nbsp;
                    {
                        onDelete ?
                            <div className="action-box">
                                <div className="tip delete">delete</div>
                                <Button
                                    id="delete"
                                    variant="outline-danger"
                                    disabled={actionDisabled}
                                    onClick={(e) => onClick(e, node, 'DELETE')}>
                                    <i className="fa fa-trash-o"/>
                                    {/* Delete */}
                                </Button>
                            </div>

                            : ''
                    }
                    {/*&nbsp;*/}
                    {/*{*/}
                    {/*    onPreview ?*/}
                    {/*        <Button*/}
                    {/*            id="delete"*/}
                    {/*            disabled={isEditing && rowNumber !== node.rowIndex}*/}
                    {/*            onClick={(e) => onClick(e, node, 'PREVIEW')}>*/}
                    {/*            <i className="fa fa-eye"/>*/}
                    {/*            /!* Preview *!/*/}
                    {/*        </Button>*/}
                    {/*        : ''*/}
                    {/*}*/}

                </>

            }

        </div>
    );
};

export default ActionForEditableTable;
