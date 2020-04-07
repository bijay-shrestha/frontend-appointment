import React from 'react';
import {Button} from "react-bootstrap";

const ActionForEditableTable = ({isEditing, onClick, node, rowNumber, rowValid, onUpdate, onDelete, onPreview}) => {

    return (
        <div className="table-action">
            {isEditing && rowNumber === node.rowIndex ?
                <>
                    <Button
                        id="save"
                        variant="success"
                        // disabled={!rowValid}
                        onClick={(e) => onClick(e, node, 'ADD')}>
                               <i className="fa fa-save" />&nbsp;
                        Save
                    </Button>
                    &nbsp;
                    <Button
                        id="cancel"
                        variant="outline-secondary"
                        onClick={(e) => onClick(e, node, 'CANCEL')}>
                                 <i className="fa fa-times" />&nbsp;
                        Cancel
                    </Button>
                </>
                :
                <>
                    {
                        onUpdate ? <Button
                            id="edit"
                            variant="secondary"
                            disabled={isEditing && rowNumber !== node.rowIndex}
                            onClick={(e) => onClick(e, node, 'EDIT')}>
                                     <i className="fa fa-edit" />&nbsp;
                            Edit
                        </Button> : ''
                    }
                       &nbsp;
                    {
                        onDelete ?
                            <Button
                                id="delete"
                                variant="outline-danger"
                                disabled={isEditing && rowNumber !== node.rowIndex}
                                onClick={(e) => onClick(e, node, 'DELETE')}>
                                         <i className="fa fa-trash-o" />&nbsp;
                                Delete
                            </Button> : ''
                    }
                    {
                        onPreview ?
                            <Button
                                id="delete"
                                disabled={isEditing && rowNumber !== node.rowIndex}
                                onClick={(e) => onClick(e, node, 'PREVIEW')}>
                                Preview
                            </Button>
                            : ''
                    }

                </>

            }

        </div>
    );
};

export default ActionForEditableTable;