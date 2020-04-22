import React, {PureComponent} from 'react';
import {Badge} from "react-bootstrap";

class StatusRenderer extends PureComponent {
    render() {
        return (
            <>
                {
                    this.props.node.data.status === 'Y' ? <Badge variant="success">Active</Badge>
                        : <Badge variant="danger">Inactive</Badge>
                }

            </>
        );
    };
}

export default StatusRenderer;
