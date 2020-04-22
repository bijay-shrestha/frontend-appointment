import React from 'react';
import {Badge} from "reactstrap";

const IsEditableRenderer = props => {
    return (
        <>
            {
                props.node.data.isEditable === 'Y' ? <Badge variant="success">Yes</Badge>
                    : <Badge variant="danger">No</Badge>
            }

        </>
    );
};

export default IsEditableRenderer;
