import React, { PureComponent } from 'react';
import { Badge } from 'react-bootstrap';

class TableAction extends PureComponent {
    render() {
         // console.log('node status',this.props.node);
        return (
            <>
                {this.props.node.data.status ==='Y'?<Badge variant="success">Active</Badge>:<Badge variant="danger">Inactive</Badge>}

            </>
        );
    };
};

export default TableAction;
