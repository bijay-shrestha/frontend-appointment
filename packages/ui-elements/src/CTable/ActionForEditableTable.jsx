import React from 'react';
import {Button} from "react-bootstrap";

const ActionForEditableTable = ({isEditing, onClick, node, rowNumber}) => {

    return (
        <>
            {isEditing && rowNumber === node.rowIndex ?
                <>
                    <Button
                        id="save"
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
                    <Button
                        id="edit"
                        disabled={isEditing && rowNumber !== node.rowIndex}
                        onClick={(e) => onClick(e, node, 'EDIT')}>
                        Edit
                    </Button>
                    <Button
                        id="delete"
                        disabled={isEditing && rowNumber !== node.rowIndex}
                        onClick={(e) => onClick(e, node, 'DELETE')}>
                        Delete
                    </Button>
                </>

            }

        </>
    );
};

export default ActionForEditableTable;
