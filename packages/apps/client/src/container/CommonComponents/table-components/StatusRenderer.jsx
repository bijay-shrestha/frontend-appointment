import React, {PureComponent} from 'react';

class StatusRenderer extends PureComponent {
    render() {
        return (
            <>
                {
                    this.props.node.data.status === 'Y' ? 'Active' : 'Inactive'
                }

            </>
        );
    };
}

export default StatusRenderer;
