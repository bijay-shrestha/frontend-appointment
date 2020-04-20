import React from 'react';
import {Button} from "react-bootstrap";

const ActionForEditableTable = ({isEditing, onClick, node, rowNumber, rowValid, onUpdate, onDelete, onPreview}) => {

    const actionDisabled = Object.keys(node.data).includes("isRowEditable")
        ? (isEditing && rowNumber !== node.rowIndex ) || !node.data.isRowEditable
        : isEditing && rowNumber !== node.rowIndex;
    return (
        <div className="table-action">
            {isEditing && rowNumber === node.rowIndex ?
                <>
                    <Button
                        id="save"
                        variant="success"
                        // disabled={!rowValid}
                        onClick={(e) => onClick(e, node, 'ADD')}>
                        <i className="fa fa-save"/>
                        {/* Save */}
                    </Button>
                    &nbsp;
                    <Button
                        id="cancel"
                        variant="outline-secondary"
                        onClick={(e) => onClick(e, node, 'CANCEL')}>
                        <i className="fa fa-times"/>
                        {/* Cancel */}
                    </Button>
                </>
                :
                <>
                    {
                        onUpdate ? <Button
                            id="edit"
                            variant="secondary"
                            disabled={actionDisabled}
                            onClick={(e) => onClick(e, node, 'EDIT')}>
                            <i className="fa fa-edit"/>
                            {/* Edit */}
                        </Button> : ''
                    }
                    &nbsp;
                    {
                        onDelete ?
                            <Button
                                id="delete"
                                variant="outline-danger"
                                disabled={actionDisabled}
                                onClick={(e) => onClick(e, node, 'DELETE')}>
                                <i className="fa fa-trash-o"/>
                                {/* Delete */}
                            </Button> : ''
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
