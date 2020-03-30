import React from 'react';
import {Button} from "react-bootstrap";

const ActionForEditableTable = ({isEditing, onClick, node, rowNumber, rowValid, onUpdate, onDelete, onPreview}) => {

    return (
        <>
            {isEditing && rowNumber === node.rowIndex ?
                <>
                    <Button
                        id="save"
                        // disabled={!rowValid}
                        onClick={(e) => onClick(e, node, 'ADD')}>
                        Save
                    </Button>
                    <Button
                        id="cancel"
                        onClick={(e) => onClick(e, node, 'CANCEL')}>
                        Cancel
                    </Button>
                </>
                :
                <>
                    {
                        onUpdate ? <Button
                            id="edit"
                            disabled={isEditing && rowNumber !== node.rowIndex}
                            onClick={(e) => onClick(e, node, 'EDIT')}>
                            Edit
                        </Button> : ''
                    }
                    {
                        onDelete ?
                            <Button
                                id="delete"
                                disabled={isEditing && rowNumber !== node.rowIndex}
                                onClick={(e) => onClick(e, node, 'DELETE')}>
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

        </>
    );
};

export default ActionForEditableTable;
